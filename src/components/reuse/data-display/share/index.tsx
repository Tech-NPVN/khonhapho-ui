'use client';
import { CopyLink } from '@/components/icons/copy-link.icon';
import { ShareMessageIcon } from '@/components/icons/share-message.icon';
import { ShareIcon } from '@/components/icons/share.icon';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useClickAway, useCopyToClipboard } from 'react-use';
interface IProps {
  content: string;
}
const ShareComponent = ({ content }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const RootRef = useRef<HTMLDivElement>(null);
  useClickAway(RootRef, () => {
    setIsOpen(false);
  });

  const [_, copyToClipboard] = useCopyToClipboard();
  return (
    <div
      className={clsx('flex h-9 gap-2 items-center relative w-full justify-center rounded-lg')}
      ref={RootRef}
    >
      <div
        className="flex h-full w-full items-center justify-center gap-2 hover:bg-black/5 dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d rounded-lg cursor-pointer"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="inline-block w-5 h-5">
          <ShareIcon />
        </span>
        <span>Chia sẻ</span>
      </div>
      <ul
        className={clsx(
          'absolute mx-0 py-2 px-1 w-full left-0 top-full mt-4 list-none bg-white dark:bg-background_d flex flex-col shadow-md rounded-lg overflow-hidden',
          isOpen ? '' : 'hidden',
        )}
      >
        <li
          className="m-0 px-2 py-3 w-full flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            if (copied) return;
            copyToClipboard(content);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          <CopyLink />
          <span>{copied ? 'Đã sao chép vào bộ nhớ tạm' : 'Sao chép liên kết'}</span>
        </li>
        <li className="m-0 px-2 py-3 w-full flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
          <ShareMessageIcon />
          <span>Chia sẻ qua tin nhắn</span>
        </li>
      </ul>
    </div>
  );
};

export default ShareComponent;
