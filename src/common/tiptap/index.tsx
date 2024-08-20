'use client';

import CharacterCount from '@tiptap/extension-character-count';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { useEffect } from 'react';
interface IProps {
  content?: string;
  className?: string;
  onChange?: (content: string, text?: string) => void;
}

const limit = 3000;
const TiptapEditor = ({ content, className, onChange }: IProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: content || '',
    immediatelyRender: false,
  });
  useEffect(() => {
    editor?.commands.setContent(content || '');
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
      placeholder="Viết bình luận"
    >
      {editor?.storage.characterCount.characters() >= 500 && (
        <div className="absolute -right-16 bottom-0">
          {editor?.storage.characterCount.characters()} / {limit}
        </div>
      )}
    </EditorContent>
  );
};

export default TiptapEditor;
