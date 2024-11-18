'use client';

import { CopyIcon } from '@/components/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

function CopyButton({ content }: { content?: string }) {
  const [_clipboard, onCopyClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!content) return;

    // Tạo một div tạm và thêm vào DOM
    const div = document.createElement('div');
    div.innerHTML = content;
    div.style.position = 'absolute';
    div.style.left = '-9999px'; // Ẩn khỏi màn hình
    document.body.appendChild(div);

    // Tạo một Range để chọn toàn bộ nội dung trong div
    const range = document.createRange();
    range.selectNodeContents(div);

    // Sao chép định dạng văn bản mà không giữ thẻ như <p>
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand('copy'); // Sao chép nội dung
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      } catch (err) {
        console.error('Sao chép thất bại', err);
      }

      // Bỏ chọn nội dung sau khi sao chép
      selection.removeAllRanges();
    }

    // Xóa div tạm khỏi DOM
    document.body.removeChild(div);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className={clsx(
        'py-[2px] px-1 text-base border-black/20 dark:border-primary_text_d_2 rounded bg-transparent cursor-pointer flex justify-between items-center gap-2 border',
        isCopied ? '!border-color_l' : '',
      )}
    >
      <CopyIcon className={isCopied ? '!fill-color_l' : ''} />
      <span className={clsx('text-sm', isCopied ? 'text-color_l' : '')}>
        {isCopied ? 'Đã sao chép' : 'Sao chép'}
      </span>
    </button>
  );
}

export default CopyButton;
export { CopyButton };
