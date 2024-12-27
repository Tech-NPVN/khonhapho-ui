/**
 * Lưu emoji được sử dụng gần đây vào localStorage.
 *
 * @param {string} emoji - Emoji được chọn bởi người dùng.
 * @returns {void}
 */
const saveRecentEmoji = (emoji: string): void => {
  const key = 'recentEmojis';
  const maxRecent = 7 * 2;
  const recentEmojis = JSON.parse(localStorage.getItem(key) || '[]') as string[];
  const updatedEmojis = recentEmojis.filter((e) => e !== emoji);
  updatedEmojis.unshift(emoji);
  if (updatedEmojis.length > maxRecent) updatedEmojis.pop();
  localStorage.setItem(key, JSON.stringify(updatedEmojis));
};

/**
 * Lấy danh sách emoji được sử dụng gần đây từ localStorage.
 *
 * @returns {string[]} Danh sách emoji gần đây.
 */
const getRecentEmojis = (): string[] => {
  const key = 'recentEmojis';
  return JSON.parse(localStorage.getItem(key) || '[]') as string[];
};

export { getRecentEmojis, saveRecentEmoji };
