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
}
const Comment = ({ comment }: ICommentProps) => {
  return (
    <div className="py-4">
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
          <div className="bg-[#F3F4F6] dark:bg-[#151E2F] p-2 rounded-lg flex flex-col">
            <div className="font-semibold text-[15px] flex gap-2 dark:text-[#daefff]">
              <Link className="text-black dark:text-[#daefff]" href={'/'}>
                {comment.user?.name || 'User'}
              </Link>
              <span>•</span>
              <span className="dark:text-[#daefff]">Quy định và Hướng dẫn</span>
            </div>
            <div className="mt-2 text-gray-800 dark:text-[#daefff] font-normal text-[15px]">
              {comment.body || 'No comment available'}
            </div>
          </div>
          <div className="flex gap-3 mt-2 ms-2 dark:text-[#daefff]/50">
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
