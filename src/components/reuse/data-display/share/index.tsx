'use client';
import { CopyLink, ShareMessageIcon } from '@/components/icons';
import { ShareIcon } from '@/components/icons/share.icon';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useClickAway, useCopyToClipboard, useWindowSize } from 'react-use';
interface IProps {
  content: string;
}
const ShareComponent = ({ content }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const RootRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 640;
  useClickAway(RootRef, () => {
    if (!isMobile) setIsOpen(false);
  });
  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopy = () => {
    if (isMobile) setIsOpen(false);
    if (copied) return;
    copyToClipboard(content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isMobile, isOpen]);
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
        {!isMobile && (
          <div
            className={clsx(
              'list-none min-w-[180px] py-2 px-1 z-[9999]',
              'absolute mx-0 w-full right-0 top-2/3 mt-3',
              isOpen ? '' : 'hidden',
            )}
          >
            <ul className="list-none w-full p-0 m-0 bg-white sm:dark:bg-background_d flex flex-col shadow-md rounded-lg overflow-hidden">
              <li
                className="m-0 px-2 py-3 my-1 mx-1 text-base sm:text-sm sm:py-2 w-[calc(100%-8px)] max-sm:justify-center flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg max-sm:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy();
                }}
              >
                <CopyLink className="!sm:dark:fill-black" />
                <span>{copied ? 'Đã sao chép' : 'Sao chép liên kết'}</span>
              </li>
              <div className="border-b border-divider_l border-0 border-solid dark:border-divider_d mx-3"></div>
              <li className="m-0 px-2 py-3 my-1 mx-1 text-base sm:text-sm sm:py-2 w-[calc(100%-8px)] max-sm:justify-center flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg max-sm:text-black">
                <ShareMessageIcon className="!sm:dark:fill-black" />
                <span>Chia sẻ qua tin nhắn</span>
              </li>
            </ul>
          </div>
        )}
        {isOpen && isMobile && <ContentAddToBody handleCopy={handleCopy} setOpen={setIsOpen} />}
        {copied && isMobile && <NotificationAddToBody />}
      </div>
    </>
  );
};

const ContentAddToBody = ({
  handleCopy,
  setOpen,
}: {
  handleCopy?: () => void;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        className={clsx(
          'list-none min-w-[180px] py-2 px-1 z-[1001] !bottom-0',
          'fixed left-0 w-[calc(100%-24px)] mx-3 transition-transform duration-200 ease-in-out',
          visible ? 'translate-y-0' : 'translate-y-full', // Animation đẩy lên
          'mb-1',
        )}
      >
        <ul className="list-none w-full p-0 m-0 bg-white sm:dark:bg-background_d flex flex-col shadow-md rounded-lg overflow-hidden">
          <li
            className="m-0 px-2 py-3 my-1 mx-1 text-base sm:text-sm sm:py-2 w-[calc(100%-8px)] max-sm:justify-center flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg max-sm:text-black"
            onClick={(e) => {
              e.preventDefault();
              handleCopy?.();
            }}
          >
            <CopyLink className="!sm:dark:fill-black" />
            <span>Sao chép liên kết</span>
          </li>
          <div className="border-b border-divider_l border-0 border-solid dark:border-divider_d mx-3"></div>
          <li className="m-0 px-2 py-3 my-1 mx-1 text-base sm:text-sm sm:py-2 w-[calc(100%-8px)] max-sm:justify-center flex gap-2 items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg max-sm:text-black">
            <ShareMessageIcon className="!sm:dark:fill-black" />
            <span>Chia sẻ qua tin nhắn</span>
          </li>
        </ul>
        <ul className="list-none w-full p-0 m-0 mt-3 flex flex-col shadow-md rounded-lg overflow-hidden">
          <li
            className="m-0 px-2 py-3 my-1 mx-1 text-base sm:text-sm sm:py-2 w-[calc(100%-8px)] bg-white text-red-500 rounded-lg cursor-pointer text-center font-semibold"
            onClick={() => {
              setVisible(false);
              setTimeout(() => setOpen?.(false), 300); // Delay để đợi animation hoàn thành trước khi đóng
            }}
          >
            Đóng
          </li>
        </ul>
      </div>

      <div
        className="bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-[1000] transition-opacity duration-200 ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={() => {
          setVisible(false);
          setTimeout(() => setOpen?.(false), 300); // Delay để đợi animation hoàn thành trước khi đóng
        }}
      ></div>
    </>,
    document.body,
  );
};
const NotificationAddToBody = () => {
  return ReactDOM.createPortal(
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] bg-black/80 text-white py-3 px-5 rounded-lg font-normal text-nowrap">
      Đã sao chép vào bộ nhớ tạm
    </div>,
    document.body,
  );
};
export default ShareComponent;
