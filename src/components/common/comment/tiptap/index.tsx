'use client';

import { Editor } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import TipTapLink from '@tiptap/extension-link';
import Mention, { MentionOptions } from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCss } from 'react-use';
import { AddEmojiCharacterExtension, AddSingleCharacterExtension } from './custom-extension';
import SuggestionPortalForCommentInput, { SuggestionItemType } from './suggestion';
import { flagRegex } from './tiptap-helpers';

export type TiptapForCommentProps = {
  defaultContent?: string;
  className?: string;
  showCount?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  canShowSuggestions?: boolean;
  onChange?: (content: string, text?: string) => void;
  onReady?: (editor: Editor) => void;
  onImagePaste?: (image: File) => void;
};

const TiptapEditorForCommentInput: React.FC<TiptapForCommentProps> = ({
  defaultContent,
  disabled,
  className,
  showCount,
  autoFocus,
  canShowSuggestions,
  onReady,
  onChange,
  onImagePaste,
}) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }>();
  const querySuggestionsRef = useRef<string>('');
  const handleKeyDown = useCallback(
    (view: any, event: KeyboardEvent) => {
      if (showSuggestions && event.key === 'Enter') {
        event.preventDefault();
        return true;
      }
      return false;
    },
    [showSuggestions],
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        code: false,
      }),
      CharacterCount.configure({
        limit: 3000,
      }),
      Placeholder.configure({
        placeholder: 'Nhập bình luận',
        emptyEditorClass: 'is-editor-empty',
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention text-link_text_l dark:text-link_text_d',
        },
        suggestion: {
          items: async ({ query, editor }) => {
            querySuggestionsRef.current = query;
            return [];
          },
          render: () => {
            return {
              onStart: (props) => {
                if (!canShowSuggestions) return;
                const editor = props.editor;
                const editorElement = editor?.view.dom as HTMLElement;
                if (editorElement) {
                  const { from } = editor.view.state.selection;
                  const coords = editor?.view.coordsAtPos(from);
                  setPosition({
                    top: coords?.top,
                    left: coords?.left,
                  });
                }
                setShowSuggestions(true);
              },

              onExit: () => {
                setShowSuggestions(false);
              },
            };
          },
          char: '@',
          startOfLine: false,
          allowSpaces: true,
        },
      } as Partial<MentionOptions>),
      TipTapLink.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
      }),
      AddSingleCharacterExtension,
      AddEmojiCharacterExtension,
    ],
    content: defaultContent || '',
    immediatelyRender: false,
    editorProps: {
      handlePaste: (view, event) => {
        const clipboardData = event.clipboardData;
        const text = clipboardData?.getData('text/plain') || '';
        const html = clipboardData?.getData('text/html') || '';
        const image = clipboardData?.items[0]?.getAsFile();
        // Kiểm tra nếu là URL đơn giản
        const isPlainURL = text.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
        if (isPlainURL) return false;

        // Kiểm tra nếu dán nội dung HTML có chứa thẻ <a>
        if (html.includes('<a')) {
          event.preventDefault();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const cleanedHTML = Array.from(doc.body.childNodes)
            .map((node) => {
              if (node.nodeName.toLowerCase() === 'a') {
                return (node as HTMLElement).textContent || '';
              }
              return node.textContent || '';
            })
            .join('');

          view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.text(cleanedHTML)));
          return true;
        }

        // Kiểm tra nếu dán ảnh
        if (image) {
          const items = event.clipboardData?.items;
          if (items && items[0] && items[0].kind === 'file' && items[0].getAsFile()) {
            const blob = items[0].getAsFile();
            if (blob) onImagePaste?.(blob);
          } else {
            event.preventDefault();
          }
          return true;
        }
        return false;
      },
      handleKeyDown,
    },
    onUpdate: ({ editor }) => {
      const { state, view } = editor;
      const { tr } = state;
      let hasChanged = false;

      state.doc.descendants((node, pos) => {
        if (node.isText && node.text) {
          let match;
          while ((match = flagRegex.exec(node.text)) !== null) {
            const from = pos + match.index;
            const to = from + match[0].length;

            // Kiểm tra nếu đã là node emoji thì bỏ qua
            const isAlreadyEmoji = state.doc.nodeAt(from)?.type.name === 'emoji';
            if (isAlreadyEmoji) continue;

            // Thay thế bằng node emoji
            hasChanged = true;
            tr.replaceWith(
              from,
              to,
              state.schema.nodes.emoji?.create({
                char: match[0],
                class: 'emoji-font',
              }),
            );
          }
        }
      });

      if (hasChanged) view.dispatch(tr);
      if (onChange) {
        const html = editor.getHTML();
        const text = editor.getText();
        onChange(html, text);
      }
    },
  });
  useEffect(() => {
    if (!defaultContent) editor?.commands.clearContent();
    if (autoFocus) {
      editor?.commands.focus('end');
    }
    editor?.on('create', () => {
      onReady?.(editor);
    });
    return () => {
      editor?.off('create');
    };
  }, [editor, defaultContent, autoFocus, onReady]);

  // useEffect(() => {
  //   editor?.on('update', (e) => {
  //     const content = editor?.getHTML() || '';
  //     const text = editor?.getText();
  //     onChange?.(content, text);
  //   });
  //   return () => {
  //     editor?.off('update');
  //   };
  // }, [editor, onChange]);

  const handleMentionClick = (item: SuggestionItemType) => {
    if (editor) {
      const { state } = editor;
      const { selection } = state;
      const { from, to } = selection;
      if (item) {
        const count = querySuggestionsRef.current.length || 0;
        editor
          .chain()
          .deleteRange({
            from: from - (count == 0 ? 1 : count + 1),
            to,
          })
          .insertContent({ type: 'mention', attrs: { id: item.id, label: item.label } })
          .insertContent({ type: 'text', text: ' ' })
          .focus()
          .run();
      }
      setShowSuggestions(false);
    }
  };
  const classNameCustom = useCss({
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  });
  return (
    <>
      <EditorContent
        editor={editor}
        className={clsx(
          'focus:outline-none [&_p]:mb-[2px] [&_.ProseMirror-focused]:outline-none w-full max-w-full relative ',
          classNameCustom,
          className,
        )}
        disabled={disabled}

        // onClick={() => {
        //   if (suggestions.length > 0 && !showSuggestions) setShowSuggestions(true);
        // }}
      >
        {showCount && (
          <div className="absolute right-1 bottom-1 text-sm opacity-75 editor-count">
            {editor?.storage.characterCount.characters()} / {3000}
          </div>
        )}
      </EditorContent>
      {/* Danh sách gợi ý */}
      {showSuggestions && (
        <SuggestionPortalForCommentInput
          query={querySuggestionsRef.current}
          position={position}
          onSelect={handleMentionClick}
        />
      )}
    </>
  );
};

export { TiptapEditorForCommentInput };
