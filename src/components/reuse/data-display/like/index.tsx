import { HeartRedIcon } from '@/components/icons';
import { HeartSolidIcon } from '@/components/icons/heart-solid.icon';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  liked?: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
}
const LikeComponent = ({ liked = false, onClick, label = 'Thích', className }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  return (
    <div
      className={clsx(
        'w-full h-9 items-center justify-center flex gap-2 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:[&_svg]:hover:fill-primary_text_d cursor-pointer hover:bg-black/5',
        className,
      )}
      onClick={() => {
        onClick && onClick();
        setIsLiked((prev) => !prev);
      }}
    >
      <span className="inline-block w-4 h-4">
        {isLiked ? <HeartRedIcon /> : <HeartSolidIcon />}
      </span>
      <span className={clsx('', isLiked ? 'text-[#F95E73]' : ' dark:hover:hover:bg-background_d')}>
        {label}
      </span>
    </div>
  );
};

export default LikeComponent;
