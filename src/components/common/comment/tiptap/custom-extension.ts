import { Node, mergeAttributes } from '@tiptap/core';

export const AddEmojiCharacterExtension = Node.create({
  name: 'emoji', // Tên node
  group: 'inline', // Thuộc tính nhóm
  inline: true, // Là node inline
  atom: true, // Không có con

  addAttributes() {
    return {
      class: {
        default: 'emoji-font',
      },
      char: {
        default: '-1',
      },
    };
  },

  // Parse HTML sang định dạng node
  parseHTML() {
    return [
      {
        tag: 'span[emoji-font]',
      },
    ];
  },

  // Render HTML từ node
  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return ['span', mergeAttributes(HTMLAttributes), HTMLAttributes.char || ''];
  },
});

export const AddSingleCharacterExtension = Node.create({
  name: 'span', // Tên node
  group: 'inline', // Thuộc tính nhóm
  inline: true, // Là node inline
  atom: true, // Không có con

  addAttributes() {
    return {
      class: {
        default: '',
      },
      char: {
        default: '-1',
      },
    };
  },

  // Parse HTML sang định dạng node
  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ];
  },

  // Render HTML từ node
  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return ['span', mergeAttributes(HTMLAttributes), HTMLAttributes.char || ''];
  },
});
