'use client';

import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { useEffect } from 'react';
interface IProps {
  content?: string;
  className?: string;
  onChange?: (content: string, text?: string) => void;
  config?: IPropsConfig;
  showCount?: boolean;
}

interface IPropsConfig {
  limit?: number;
  placeholder?: string;
}

const TiptapEditor = ({
  content,
  className,
  onChange,
  config = {
    limit: 3000,
    placeholder: 'Hãy viết gì đó',
  },
  showCount,
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
    editor?.commands.setContent(content ?? '');
  }, [editor, content]);

  return (
    <EditorContent
      editor={editor}
      className={clsx(
        'focus:outline-none [&_p]:mb-[2px] [&_.ProseMirror-focused]:outline-none w-full max-w-full relative',
        className,
      )}
      onInput={(e) => {
        const content = editor?.getHTML() || '';
        const text = editor?.getText();
        onChange && onChange(content, text);
      }}
    >
      {showCount && (
        <div className="absolute right-1 bottom-1 text-sm opacity-75">
          {editor?.storage.characterCount.characters()} / {config.limit}
        </div>
      )}
    </EditorContent>
  );
};

export default TiptapEditor;
