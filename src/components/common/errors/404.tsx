'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';

type Error404Props = {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onLinkClick?: () => boolean;
};
const Error404: React.FC<Error404Props> = ({
  buttonText,
  className,
  description,
  onLinkClick,
  title,
}) => {
  const router = useRouter();
  return (
    <div className={clsx('flex justify-center flex-col items-center', className)}>
      <div className="w-[80vw] sm:w-[400px]">
        <Image
          className="w-full object-cover h-auto"
          src={'/images/404.png'}
          width={400}
          height={400}
          alt="404.png"
        />
      </div>
      <div className="text-xl font-bold mt-4">{title ?? 'Không tìm thấy trang'}</div>
      <div>{description ?? ''}</div>
      <Link
        className="bg-color_l text-white no-underline py-2 px-3 rounded-lg mt-2"
        href="/"
        onClick={(e) => {
          if (onLinkClick && onLinkClick()) {
            e.preventDefault();
            return;
          }
          router.push('/');
        }}
      >
        {buttonText ?? 'Trang chủ'}
      </Link>
    </div>
  );
};
export { Error404 };
