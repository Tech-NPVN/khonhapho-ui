import { CopyIcon } from '@/components/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

function CopyButton({ content }: { content?: string }) {
  const [_clipboard, onCopyClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // Copied
  return (
    <button
      onClick={() => {
        // Không cho phép copy thẻ html
        var span = document.createElement('span');
        span.innerHTML = content || '';
        const newContent = span.textContent || span.innerText;
        onCopyClipboard(newContent);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }}
      disabled={isCopied}
      className={clsx(
        'py-[2px] px-1 text-base border-black/20 dark:border-primary_text_d_2 rounded bg-transparent cursor-pointer flex justify-between items-center gap-2 border',
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
