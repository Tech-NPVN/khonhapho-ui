'use client';
import { CopyLink } from '@/components/icons/copy-link.icon';
import { ShareMessageIcon } from '@/components/icons/share-message.icon';
import { ShareIcon } from '@/components/icons/share.icon';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useClickAway, useCopyToClipboard, useWindowSize } from 'react-use';
interface IProps {
  content: string;
}
const ShareComponent = ({ content }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCopiedMobile, setIsCopiedMobile] = useState<boolean>(false);
  const RootRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  useClickAway(RootRef, () => {
    setIsOpen(false);
  });
  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopy = () => {
    if (copied) return;
    copyToClipboard(content);
    setCopied(true);
    if (width < 640) {
      setIsCopiedMobile(true);
      setIsOpen(false);
    }
    setTimeout(() => {
      setCopied(false);
      setIsCopiedMobile(false);
    }, 2000);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isOpen]);
  return (
    <>
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
        <div
          className={clsx(
            'list-none min-w-[180px] py-2 px-1 z-[9999]',
            width > 640
              ? 'absolute mx-0 w-full right-0 top-full mt-3'
              : 'fixed -bottom-full left-0 w-[calc(100%-24px)] mx-3 transition-all duration-150 ease-in-out',
            isOpen ? (width < 640 ? '!bottom-0' : '') : width < 640 ? '' : 'hidden',
          )}
        >
          <ul className="list-none w-full p-0 m-0 bg-white sm:dark:bg-background_d flex flex-col shadow-md rounded-lg overflow-hidden">
            <li
              className="m-0 px-2 py-4 text-base sm:text-sm sm:py-3 w-full max-sm:justify-center flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg max-sm:text-black"
              onClick={(e) => {
                e.preventDefault();
                handleCopy();
              }}
            >
              <CopyLink className="!sm:dark:fill-black" />
              <span>{copied ? 'Đã sao chép' : 'Sao chép liên kết'}</span>
            </li>
            <div className="border-b border-divider_l border-0 border-solid dark:border-divider_d mx-3"></div>
            <li className="m-0 px-2 py-4 text-base sm:text-sm sm:py-3 w-full max-sm:justify-center flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg max-sm:text-black">
              <ShareMessageIcon className="!sm:dark:fill-black" />
              <span>Chia sẻ qua tin nhắn</span>
            </li>
          </ul>
          <ul className="list-none w-full p-0 m-0 mt-3 flex flex-col shadow-md rounded-lg overflow-hidden">
            <li
              className="m-0 px-2 py-4 text-base sm:text-sm sm:py-3 w-full bg-white text-red-500 rounded-lg cursor-pointer text-center font-semibold"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Đóng
            </li>
          </ul>
        </div>
        {isOpen && width < 640 && (
          <div
            className="bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-[999]"
            onClick={() => {
              setIsOpen(false);
            }}
          ></div>
        )}
      </div>
      {isCopiedMobile && copied && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] bg-black/80 text-white py-3 px-5 rounded-lg  font-normal text-nowrap">
          Đã sao chép vào bộ nhớ tạm
        </div>
      )}
    </>
  );
};

export default ShareComponent;
