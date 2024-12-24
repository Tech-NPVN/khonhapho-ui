export const removeVietnameseAccents = (str: string): string =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

export const replaceFlagsInText = (str: string): string => {
  // Regex để tìm các cặp ký tự quốc kỳ
  const flagRegex = /(\uD83C[\uDDE6-\uDDFF]){2}/g;

  // Thay thế từng cặp ký tự quốc kỳ thành <span>
  return str.replace(flagRegex, (match) => `<span class="flag-font">${match}</span>`);
};
