import { IMAGE_ACCEPTED, VIDEO_ACCEPTED } from '@/constants/data';

const FileName = 'nha-pho-viet-nam';

/**
 * Lấy phần mở rộng file từ chuỗi hoặc Blob.
 * @param input Chuỗi URL hoặc Blob của file.
 * @returns Phần mở rộng file (ví dụ: "jpg", "png", "mp4") hoặc `null` nếu không xác định được.
 */
const getFileType = (input: string | Blob): string | null => {
  if (typeof input === 'string') {
    const match = input.match(/\.([a-z0-9]+)$/i);
    return match?.[1] || null;
  } else if (input instanceof Blob) {
    return getFileExtensionFromMime(input.type);
  }
  return null;
};

/**
 * Lấy phần mở rộng từ MIME type.
 * @param mimeType Chuỗi MIME type (ví dụ: "image/jpeg").
 * @returns Phần mở rộng file (ví dụ: "jpg") hoặc `null` nếu không xác định được.
 */
const getFileExtensionFromMime = (mimeType: string): string | null => {
  try {
    return mimeType.split('/')[1] || null;
  } catch {
    return null;
  }
};

/**
 * Tải file media (hình ảnh hoặc video) từ URL.
 * @param fileUrl Đường dẫn URL của file cần tải.
 * @example
 * handleDownloadMedia('https://example.com/image.jpg');
 * handleDownloadMedia('https://example.com/video.mp4');
 */
const handleDownloadMedia = async (fileUrl: string) => {
  if (!fileUrl) return;
  console.log(fileUrl);

  // Danh sách đuôi file cho phép (từ constants)
  const allowedExtensions = [
    ...IMAGE_ACCEPTED.replaceAll('.', '').split(' '),
    ...VIDEO_ACCEPTED.replaceAll('.', '').split(' '),
  ];

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Failed to fetch file');
    const blob = await response.blob();
    const fileType = getFileType(blob) || getFileType(fileUrl);
    const fileName = `${FileName}.${fileType || 'unknown'}`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading file:', error);
    console.log('Không thể tải file. Vui lòng kiểm tra đường dẫn.');
  }
};

export { handleDownloadMedia };
