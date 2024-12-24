'use client';

import { Routes } from '@/constants/enums';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

/** Ảnh tác giả */

type CommentAvatarProps = {
  src: string;
  user_id: number | string;
  className?: string;
};

const CommentAvatar: React.FC<CommentAvatarProps> = memo(({ className, src, user_id }) => {
  return (
    <Link
      href={`${Routes.User}/${user_id}`}
      className={clsx('comment-avatar rounded-full overflow-hidden', className)}
    >
      <Image
        className="w-full h-full object-contain"
        src={src}
        alt="avatar"
        width={40}
        height={40}
      />
    </Link>
  );
});
CommentAvatar.displayName = 'CommentAvatar';

export { CommentAvatar };
