'use client';

import { Editor } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { useEffect } from 'react';
interface IProps {
  content?: string;
  className?: string;
  config?: IPropsConfig;
  showCount?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (content: string, text?: string) => void;
  onReady?: (editor: Editor) => void;
}

interface IPropsConfig {
  limit?: number;
  placeholder?: string;
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
  onChange,
  onReady,
}: IProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: config.limit,
      }),
      Placeholder.configure({
        placeholder: config.placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content,
    immediatelyRender: false,
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
  return (
    <EditorContent
      editor={editor}
      className={clsx(
        'focus:outline-none [&_p]:mb-[2px] [&_.ProseMirror-focused]:outline-none w-full max-w-full relative',
        className,
      )}
      disabled={disabled}
    >
      {showCount && (
        <div className="absolute right-1 bottom-1 text-sm opacity-75 editor-count">
          {editor?.storage.characterCount.characters()} / {config.limit}
        </div>
      )}
    </EditorContent>
  );
};

export default TiptapEditor;
