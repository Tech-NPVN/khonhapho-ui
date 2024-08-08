import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export interface IComment {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  body?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICommentProps {
  comment: IComment;
  className?: string;
}
const Comment = ({ comment, className }: ICommentProps) => {
  return (
    <div className={clsx('', className)}>
      <div className="flex items-start">
        <div>
          <Image
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
            src={comment.user?.avatar || '/images/user-default.jpg'}
            alt={comment.user?.name || 'User'}
          />
        </div>
        <div>
          <div className="bg-background_l_2 dark:bg-background_d p-2 rounded-lg flex flex-col">
            <div className="font-semibold text-sm flex gap-2 dark:text-primary_text_d">
              <Link className="text-black dark:text-primary_text_d" href={'/'}>
                {comment.user?.name || 'Nguyễn Văn A'}
              </Link>
              <span>•</span>
              <span className="dark:text-primary_text_d">NPVN-2019</span>
            </div>
            <div className="mt-1 text-gray-800 dark:text-primary_text_d font-normal text-sm">
              {comment.body || 'No comment available'}
            </div>
          </div>
          <div className="flex gap-3 mt-1 ms-1 dark:text-primary_text_d/50">
            <button className="border-none bg-transparent cursor-pointer text-[12px] font-semibold">
              Thích
            </button>
            <button className="border-none bg-transparent cursor-pointer text-[12px] font-semibold">
              Trả lời
            </button>
            <span className="text-[12px]">3 ngày trước</span>
            <span className="text-[12px]">Đã chỉnh sửa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
