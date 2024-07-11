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
    <div className="bg-white py-4">
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
          <div className="bg-[#F3F4F6] p-2 rounded-lg flex flex-col">
            <p className="font-semibold text-[15px] flex gap-[10px]">
              <Link href={'/'}>{comment.user?.name || 'User'}</Link>
              <span>•</span>
              <span>Quy định và Hướng dẫn</span>
            </p>
            <div className="mt-1 text-gray-800 font-normal text-[15px]">
              {comment.body || 'No comment available'}
            </div>
          </div>
          <div className="flex gap-3 mt-2 ms-2">
            <button className="text-[12px] font-semibold">Thích</button>
            <button className="text-[12px] font-semibold">Trả lời</button>
            <span className="text-[12px]">3 ngày trước</span>
            <span className="text-[12px]">Đã chỉnh sửa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
