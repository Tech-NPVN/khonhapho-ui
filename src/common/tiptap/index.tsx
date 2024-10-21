'use client';

import { removeVietnameseAccent } from '@/utilities/func.text';
import { Editor } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import TipTapLink from '@tiptap/extension-link';
import Mention, { MentionOptions } from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useClickAway } from 'react-use';
interface IProps {
  content?: string;
  className?: string;
  config?: IPropsConfig;
  showCount?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  canShowSuggestions?: boolean;
  onChange?: (content: string, text?: string) => void;
  onReady?: (editor: Editor) => void;
  onImagePaste?: (image: File) => void;
}

interface IPropsConfig {
  limit?: number;
  placeholder?: string;
}

interface SuggestionItem {
  id: number;
  label: string;
}

const TiptapEditor = ({
  content,
  className,
  config = {
    limit: 3000,
    placeholder: 'Hãy viết gì đó',
  },

  showCount,
  autoFocus,
  disabled,
  canShowSuggestions,
  onChange,
  onReady,
  onImagePaste,
}: IProps) => {
  // @nhắc đến
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [position, setPosition] = useState<{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }>();
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const querySuggestionsRef = useRef<string>('');
  // TODO: để fix lỗi exit có setTimeout 10 để đóng gợi ý
  const exitTimeIdRef = useRef<number | NodeJS.Timeout | null>(null);
  useClickAway(suggestionsRef, () => {
    setShowSuggestions(false);
  });
  //
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        code: false,
      }),
      CharacterCount.configure({
        limit: config.limit,
      }),
      Placeholder.configure({
        placeholder: config.placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention text-link_text_l dark:text-link_text_d',
        },

        suggestion: {
          items: ({ query }: { query: string }) => {
            const items: SuggestionItem[] = [
              { id: 1, label: 'Đầu chủ' },
              { id: 2, label: 'Đầu khách' },
              { id: 3, label: 'Nguyễn Văn A' },
              { id: 4, label: 'Trần Thị B' },
              { id: 5, label: 'Lê Văn C' },
            ];
            // Lọc danh sách gợi ý theo từ khóa nhập vào
            querySuggestionsRef.current = query;
            console.log('query: ', query);

            if (canShowSuggestions)
              return items.filter((item) =>
                removeVietnameseAccent(item.label.toLowerCase()).includes(
                  removeVietnameseAccent(query.toLowerCase()),
                ),
              );
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
                setSuggestions(props.items as SuggestionItem[]);
                setFocusIndex(0);
                if (exitTimeIdRef.current) clearTimeout(exitTimeIdRef.current);
                setShowSuggestions(true);
              },
              onUpdate: (props) => {
                console.log('Update: ', props);
                setSuggestions(props.items as SuggestionItem[]);
                setFocusIndex(0);
                setShowSuggestions(true);
                querySuggestionsRef.current = props.query;
              },
              onExit: (props) => {
                console.log('Exit: ', props);
                exitTimeIdRef.current = setTimeout(() => {
                  setShowSuggestions(false);
                }, 10);
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
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      handlePaste: (view, event, slice) => {
        const clipboardData = event.clipboardData;
        const text = clipboardData?.getData('text/plain') || '';
        const html = clipboardData?.getData('text/html') || '';

        // Trường hợp 1: Dán một URL dạng plain text
        const isPlainURL = text.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
        if (isPlainURL) {
          // Giữ nguyên hành vi dán và cho phép Tiptap tự xử lý
          return false;
        }

        // Trường hợp 2: Dán một văn bản HTML có chứa thẻ <a>
        if (html.includes('<a')) {
          event.preventDefault();

          // Tạo một DOMParser để chuyển đổi HTML thành document fragment
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const fragment = document.createDocumentFragment();

          // Duyệt qua tất cả các node con trong document và loại bỏ thẻ <a>
          Array.from(doc.body.childNodes).forEach((node) => {
            if (node.nodeName.toLowerCase() === 'a') {
              // Nếu là thẻ <a>, chỉ giữ lại text content
              const span = document.createElement('span');
              span.textContent = (node as HTMLElement).textContent || '';
              fragment.appendChild(span);
            } else {
              fragment.appendChild(node);
            }
          });

          // Thêm nội dung đã lọc vào editor
          view.dispatch(
            view.state.tr.replaceSelectionWith(view.state.schema.text(fragment.textContent || '')),
          );
          return true;
        }

        // Cho phép Tiptap xử lý các trường hợp khác
        return false;
      },
    },
  });
  useEffect(() => {
    if (!content) editor?.commands.clearContent();
    if (autoFocus) {
      editor?.commands.focus('end');
    }
    editor?.on('create', () => {
      onReady?.(editor);
    });
    return () => {
      editor?.off('create');
    };
  }, [editor, content, autoFocus, onReady]);

  useEffect(() => {
    editor?.on('update', () => {
      const content = editor?.getHTML() || '';
      const text = editor?.getText();
      onChange && onChange(content, text);
    });
    return () => {
      editor?.off('update');
    };
  }, [editor, onChange]);
  // Hàm chèn mention vào vị trí con trỏ hiện tại

  const handleMentionClick = (item: SuggestionItem) => {
    if (editor) {
      const { state } = editor;
      const { selection } = state;
      const { from, to } = selection;
      if (item)
        editor
          .chain()
          .deleteRange({ from: from - (querySuggestionsRef.current.length + 1), to })
          .insertContent({ type: 'mention', attrs: { id: item.id, label: item.label } })
          .insertContent({ type: 'text', text: ' ' })
          .focus()
          .run();
      setShowSuggestions(false);
      setSuggestions([]);
      setFocusIndex(0);
    }
  };

  return (
    <>
      <EditorContent
        editor={editor}
        className={clsx(
          'focus:outline-none [&_p]:mb-[2px] [&_.ProseMirror-focused]:outline-none w-full max-w-full relative ',
          className,
        )}
        disabled={disabled}
        onPaste={(e) => {
          const items = e.clipboardData.items;
          if (items && items[0] && items[0].kind === 'file' && items[0].getAsFile()) {
            const blob = items[0].getAsFile();
            if (blob) onImagePaste?.(blob);
          } else {
            e.preventDefault();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowUp' && showSuggestions) {
            event.preventDefault();
            if (focusIndex > 0) setFocusIndex(focusIndex - 1);
          }
          if (event.key === 'ArrowDown' && showSuggestions) {
            event.preventDefault();
            if (focusIndex < suggestions.length - 1) setFocusIndex(focusIndex + 1);
          }
          if (event.key === 'Enter' && showSuggestions) {
            if (editor && suggestions.length > 0) {
              const { state } = editor;
              const { selection } = state;
              const { from, to } = selection;
              editor
                .chain()
                .deleteRange({
                  from:
                    from -
                    (querySuggestionsRef.current.length == 0
                      ? 1
                      : querySuggestionsRef.current.length),
                  to,
                })
                .focus()
                .run();
              handleMentionClick(suggestions[focusIndex]);
            }
          }
        }}
        onClick={() => {
          if (suggestions.length > 0 && !showSuggestions) setShowSuggestions(true);
        }}
      >
        {showCount && (
          <div className="absolute right-1 bottom-1 text-sm opacity-75 editor-count">
            {editor?.storage.characterCount.characters()} / {config.limit}
          </div>
        )}
      </EditorContent>
      {/* Danh sách gợi ý */}
      {showSuggestions && (
        <SuggestionPortal
          position={position}
          suggestionsRef={suggestionsRef}
          suggestions={suggestions}
          focusIndex={focusIndex}
          setFocusIndex={setFocusIndex}
          handleMentionClick={handleMentionClick}
        />
      )}
    </>
  );
};

interface SuggestionPortalProps {
  position?: { top?: number; left?: number; right?: number; bottom?: number };
  suggestionsRef?: React.RefObject<HTMLDivElement>;
  suggestions?: SuggestionItem[];
  focusIndex?: number;
  setFocusIndex?: (index: number) => void;
  handleMentionClick?: (item: SuggestionItem) => void;
}
const SuggestionPortal: React.FC<SuggestionPortalProps> = ({
  position,
  suggestionsRef,
  suggestions,
  focusIndex,
  setFocusIndex,
  handleMentionClick,
}) => {
  return ReactDOM.createPortal(
    <>
      <div
        ref={suggestionsRef}
        style={{
          top: position?.top,
          left: position?.left,
        }}
        className="fixed z-[9999]"
      >
        <div className="relative">
          <div className="absolute bottom-1 left-0 bg-white dark:bg-background_d dark:shadow-white/10 border rounded-lg shadow min-w-48">
            {suggestions?.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  'flex gap-2 cursor-pointer p-2 items-center border border-solid border-transparent rounded-lg',
                  index === focusIndex && 'border-link_text_l dark:border-link_text_d',
                )}
                onMouseEnter={() => setFocusIndex?.(index)}
                onClick={() => handleMentionClick?.(item)}
              >
                <div>
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={'/images/user-default.jpg'}
                    alt="..."
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div>{item.label}</div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
export default TiptapEditor;
export { TiptapEditor };
