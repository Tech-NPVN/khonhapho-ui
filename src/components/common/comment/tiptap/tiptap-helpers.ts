import { Editor } from '@tiptap/core';
import { SuggestionItemType } from './suggestion';

export const insertMentionsToTipTap = (editor: Editor, item: SuggestionItemType) => {
  editor
    .chain()
    .insertContent({ type: 'mention', attrs: { ...item } })
    .insertContent({ type: 'text', text: ' ' })
    .focus()
    .run();
};

export const insertHTMLToTipTap = (editor: Editor, text?: string, from?: number, to?: number) => {
  editor.chain().insertContent({ type: 'text', text: ' ' }).run();
};

/**
 * Regex chính xác để bắt các flag icon Unicode.
 */
export const flagRegex = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/g;

/**
 * Thêm <span> cho các flag icon chưa được bao bọc.
 * @param text - Đoạn text đầu vào.
 * @returns Đoạn text đã thêm <span>.
 */
export const addFlagSpan = (text: string): string => {
  return text.replace(
    flagRegex,
    (flag) => `<span class="emoji-font" char="${flag}">${flag}</span>`,
  );
};

/**
 * Xóa <span> bao bọc quanh các flag icon.
 * @param text - Đoạn text đầu vào.
 * @returns Đoạn text đã xóa <span>.
 */
export const removeFlagSpan = (text: string): string => {
  const spanRegex =
    /<span[^>]*class="emoji-font"[^>]*char=".*?"[^>]*>(\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF])<\/span>/g;
  return text.replace(spanRegex, (_, flag) => flag);
};
