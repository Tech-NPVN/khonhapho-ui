import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

const CommentInput = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState('');
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
      </div>
      <div className="relative flex-1 bg-black/5 dark:bg-[#151E2F] rounded-2xl py-1 px-3">
        <input
          className="w-full h-10 bg-transparent focus:outline-none border-none outline-none"
          placeholder="Viết bình luận ..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => setText(e.target.value?.replaceAll('  ', ''))}
        ></input>
        <button
          disabled={text === ''}
          className="w-8 h-8  absolute border-none bg-transparent outline-none cursor-pointer top-1/2 -translate-y-1/2 right-3 flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g
              clipPath="url(#clip0_989_55394)"
              className={clsx(
                text === '' ? 'fill-black/20 dark:fill-[#daefff]/40' : 'fill-green-600',
              )}
            >
              <path d="M22.3314 12.1544C22.3407 11.4377 21.9525 10.779 21.322 10.4332L6.63011 2.3611C5.97206 1.98918 5.19633 2.03487 4.57625 2.4583C3.9448 2.88885 3.6216 3.91379 3.79812 4.65406L5.16967 10.4003C5.31047 10.9896 5.83783 11.4045 6.44453 11.4019L14.6205 11.3765C15.0392 11.3681 15.3788 11.7077 15.3704 12.1263C15.3691 12.5379 15.0345 12.8724 14.6159 12.8808L6.43208 12.8998C5.82538 12.901 5.29544 13.3178 5.15098 13.9079L3.73093 19.677C3.55851 20.3588 3.75509 21.0394 4.23612 21.5204C4.29271 21.577 4.35637 21.6406 4.42008 21.6901C5.04303 22.1707 5.85887 22.232 6.55542 21.8609L21.2971 13.8677C21.9297 13.5323 22.322 12.8711 22.3314 12.1544Z" />
            </g>
            <defs>
              <clipPath id="clip0_989_55394">
                <rect width={24} height={24} fill="red" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className={clsx('flex -ms-1', isFocus || text !== '' ? '' : 'hidden')}>
          <button className="w-7 h-7 p-1 flex items-center justify-center outline-none border-none cursor-pointer hover:bg-black/10 dark:bg-primary_color_d rounded-full dark:bg-transparent dark:hover:bg-white/10">
            <svg
              className="w-full h-full stroke-[#344142] dark:stroke-[#daefff]/50 dark:hover:stroke-[#daefff]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3.5" y="3.5" width={17} height={17} rx="3.5" />
              <circle cx="7.5" cy="7.5" r="1.1" strokeWidth="0.8" />
              <path
                d="M3.5 16C4.33333 14.1666 6 13 8 15.5178C10 17.5 11.2 15.7177 12 14.5178C13.5 12.0179 17.5 10 20.5 16.0002"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="w-7 h-7 p-1 flex items-center justify-center outline-none border-none cursor-pointer hover:bg-black/10 dark:bg-primary_color_d rounded-full dark:bg-transparent dark:hover:bg-white/10">
            <svg
              className="w-full h-full stroke-[#344142] dark:stroke-[#daefff]/50 dark:hover:stroke-[#daefff]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.5 8C3.5 5.51472 5.51472 3.5 8 3.5H16C18.4853 3.5 20.5 5.51472 20.5 8V13C20.5 17.1421 17.1421 20.5 13 20.5H8C5.51472 20.5 3.5 18.4853 3.5 16V8Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 21V17C14 15.3431 15.3431 14 17 14H21V13H17C14.7909 13 13 14.7909 13 17V21H14Z"
                fill="#344142"
              />
              <circle cx={9} cy={10} r={1} fill="#344142" />
              <circle cx={15} cy={10} r={1} fill="#344142" />
              <path d="M10 14C11 16 13.5 16 14.5 14" strokeLinecap="round" />
            </svg>
          </button>
          <button className="w-7 h-7 p-1 flex items-center justify-center outline-none border-none cursor-pointer hover:bg-black/10 dark:bg-primary_color_d rounded-full dark:bg-transparent dark:hover:bg-white/10">
            <svg
              className="w-full h-full stroke-[#344142] dark:stroke-[#daefff]/50 dark:hover:stroke-[#daefff]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={12} cy={12} r="8.5" />
              <circle cx={9} cy={10} r={1} fill="#344142" />
              <circle cx={15} cy={10} r={1} fill="#344142" />
              <path d="M10 14C11 16 13.5 16 14.5 14" strokeLinecap="round" />
            </svg>
          </button>
          <button className="w-7 h-7 p-1 flex items-center justify-center outline-none border-none cursor-pointer hover:bg-black/10 dark:bg-primary_color_d rounded-full dark:bg-transparent dark:hover:bg-white/10">
            <svg
              className="w-full h-full stroke-[#344142] dark:stroke-[#daefff]/50 dark:hover:stroke-[#daefff]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3.5" y="3.5" width={17} height={17} rx="3.5" />
              <path
                d="M8.94531 15.0938C7.33203 15.0938 6.31641 13.9688 6.31641 12.1562V12.1523C6.31641 10.375 7.33203 9.26953 8.93359 9.26953C10.2539 9.26953 11.082 10.0312 11.3164 11.0469L11.332 11.1172H10.4336L10.4219 11.0742C10.1836 10.4219 9.67188 10.043 8.9375 10.043C7.85938 10.043 7.20703 10.8281 7.20703 12.1484V12.1523C7.20703 13.5 7.87891 14.3203 8.95312 14.3203C9.86719 14.3203 10.5 13.7422 10.5117 12.8867V12.793H9.03125V12.0781H11.375V12.6562C11.375 14.1836 10.4727 15.0938 8.94531 15.0938ZM12.2305 15V9.36328H13.1055V15H12.2305ZM14.1445 15V9.36328H17.6641V10.1172H15.0195V11.9023H17.4414V12.6406H15.0195V15H14.1445Z"
                fill="#344142"
              />
            </svg>
          </button>
          <button className="w-7 h-7 p-1 flex items-center justify-center outline-none border-none cursor-pointer hover:bg-black/10 dark:bg-primary_color_d rounded-full dark:bg-transparent dark:hover:bg-white/10">
            <svg
              className="w-full h-full stroke-[#344142] dark:stroke-[#daefff]/50 dark:hover:stroke-[#daefff]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C9.51862 21 7.5 18.9814 7.5 16.5V6.375C7.5 6.27554 7.53951 6.18016 7.60983 6.10983C7.68016 6.03951 7.77554 6 7.875 6C7.97446 6 8.06984 6.03951 8.14017 6.10983C8.21049 6.18016 8.25 6.27554 8.25 6.375V16.5C8.25 18.5677 9.93225 20.25 12 20.25C14.0677 20.25 15.75 18.5677 15.75 16.5V6.5625C15.75 5.0115 14.4885 3.75 12.9375 3.75C11.3865 3.75 10.125 5.0115 10.125 6.5625V14.25C10.125 15.3229 11.115 16.125 12 16.125C13.1741 16.125 13.875 15.4241 13.875 14.25V6.375C13.875 6.27554 13.9145 6.18016 13.9848 6.10983C14.0552 6.03951 14.1505 6 14.25 6C14.3495 6 14.4448 6.03951 14.5152 6.10983C14.5855 6.18016 14.625 6.27554 14.625 6.375V14.25C14.625 15.8201 13.5701 16.875 12 16.875C10.6016 16.875 9.375 15.6484 9.375 14.25V6.5625C9.375 4.59825 10.9732 3 12.9375 3C14.9017 3 16.5 4.59825 16.5 6.5625V16.5C16.5 18.9814 14.4817 21 12 21Z"
                fill="#344142"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommentInput;
