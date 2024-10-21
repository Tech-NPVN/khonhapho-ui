const isTextClamped = (elm: HTMLDivElement): boolean => {
  return elm?.scrollHeight > elm?.clientHeight || elm?.scrollWidth > elm?.clientWidth;
};
const vietnameseCharMap: { [key: string]: string } = {
  a: 'aáàảãạâấầẩẫậăắằẳẵặ',
  A: 'AÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ',
  e: 'eéèẻẽẹêếềểễệ',
  E: 'EÉÈẺẼẸÊẾỀỂỄỆ',
  i: 'iíìỉĩị',
  I: 'IÍÌỈĨỊ',
  o: 'oóòỏõọôốồổỗộơớờởỡợ',
  O: 'OÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ',
  u: 'uúùủũụưứừửữự',
  U: 'UÚÙỦŨỤƯỨỪỬỮỰ',
  y: 'yýỳỷỹỵ',
  Y: 'YÝỲỶỸỴ',
  d: 'dđ',
  D: 'DĐ',
};
function convertYouTubeLinksToIframe(text: string): string {
  const regex =
    /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/g;
  return text.replace(regex, (match, p1, p2, p3, p4, videoId) => {
    return `
      <iframe
        class="w-full aspect-video"
        width="auto"
        height="auto"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>`;
  });
}
const replaceAnchorWithIframe = (htmlString: string): string => {
  const regex =
    /<a [^>]*href="(https:\/\/youtu\.be\/([A-Za-z0-9_\-]+)|https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_\-]+))"[^>]*>[^<]*<\/a>/gi;
  return htmlString.replace(regex, (match, videoLink) => {
    return convertYouTubeLinksToIframe(videoLink);
  });
};

// Tạo một hàm để chuyển đổi các ký tự không dấu thành regex tìm kiếm các ký tự có dấu tương đương.
const createVietnameseRegex = (input: string): RegExp => {
  const regexPattern = input
    .split('')
    .map((char) => {
      return vietnameseCharMap[char] ? `[${vietnameseCharMap[char]}]` : char;
    })
    .join('');
  return new RegExp(regexPattern, 'gi'); // Tạo regex không phân biệt hoa thường
};

const removeVietnameseAccent = (str: string): string => {
  const removeAccentMap: { [key: string]: string } = {};
  for (const [nonAccentChar, accentedChars] of Object.entries(vietnameseCharMap)) {
    accentedChars.split('').forEach((accentedChar) => {
      removeAccentMap[accentedChar] = nonAccentChar;
    });
  }
  return str
    .split('')
    .map((char) => removeAccentMap[char] || char)
    .join('');
};
export {
  convertYouTubeLinksToIframe,
  createVietnameseRegex,
  isTextClamped,
  removeVietnameseAccent,
  replaceAnchorWithIframe,
};
