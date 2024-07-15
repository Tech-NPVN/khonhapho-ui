import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
const isTextClamped = (elm: HTMLDivElement) => elm?.scrollHeight > elm?.clientHeight;

const PinItem = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  useEffect(() => {
    if (contentRef.current && isTextClamped(contentRef.current)) setShowSeeMore(true);
  }, []);

  return (
    <div className="m-1 shadow-md dark:bg-[#151e2f] rounded-lg w-[255px]  relative">
      <div className="flex px-3 pt-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Link href={'/'}>
            <Image width={40} height={40} src={'/images/user-default.jpg'} alt="..." />
          </Link>
        </div>
        <div className="ms-3">
          <Link href={'/'} className="text-sm font-semibold text-black dark:text-white">
            Nhà Phố Việt Nam
          </Link>
          <div className="text-sm text-gray-400">8 giờ trước</div>
        </div>
      </div>
      <div className="mt-5 text-sm">
        <div className="px-3">
          <div
            className="line-clamp-3"
            ref={contentRef}
            dangerouslySetInnerHTML={{
              __html:
                'Tôi có khách cần mua gấp, kính nhờ anh chị em tìm hộ giúp tôi. Tiêu chí khách:</br><b>Khu vực</b>: Hà Nội</br><b>Tài chính</b>: 35 tỷ',
            }}
          ></div>
          <button
            className={clsx(
              showSeeMore
                ? 'border-none bg-transparent p-0 text-[#1677FF] dark:text-[#5BB6E8] cursor-pointer hover:underline'
                : 'hidden',
            )}
          >
            Xem thêm
          </button>
        </div>
        <div className="w-full overflow-hidden rounded-md mt-1 flex justify-center items-center content-center h-36 ">
          <Image
            className="w-full object-cover "
            width={255}
            height={200}
            src={'/images/post-1.jpeg'}
            alt="..."
          ></Image>
        </div>
      </div>
      <div className="absolute -top-2 -right-1 rotate-[38.55deg] text-lg">📍</div>
    </div>
  );
};

export default PinItem;
