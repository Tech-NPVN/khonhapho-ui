import { ThreeDotIcon } from '@/components/icons';
import { message, Modal } from 'antd';
import { useRef, useState } from 'react';
import { CommentType } from '../types';

export type CommentMenuProps = {
  comment: CommentType;
  onUpdateClick?: (comment?: CommentType) => void;
  onDeleteClick?: (comment?: CommentType) => void;
};

/** Dấu ba chấm ở bình luận: Sửa, xoá */
const CommentMenu: React.FC<CommentMenuProps> = ({ comment, onDeleteClick, onUpdateClick }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleDelete = () => {
    Modal.confirm({
      title: 'Xác nhận xoá',
      content: 'Bình luận và nội dung trả lời sẽ bị xoá',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk: () => {
        message.success({ content: 'Xoá thành công' });
      },
      onCancel: () => {
        console.log('Huỷ xoá');
      },
    });
  };
  const PopoverContent = () => {
    return (
      <div>
        <div
          className="cursor-pointer px-4 py-1 hover:bg-black/5 text-base text-black"
          onClick={() => {
            onUpdateClick?.(comment);
          }}
        >
          Sửa
        </div>
        <div
          className="cursor-pointer px-4 py-1 hover:bg-black/5 text-base text-error_l"
          onClick={handleDelete}
        >
          Xóa
        </div>
      </div>
    );
  };
  return (
    <div
      ref={ref}
      className="h-full flex items-center justify-center relative"
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="relative w-6 h-6 hover:bg-black/5 rounded flex justify-center items-center cursor-pointer dark:hover:bg-white/5"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ThreeDotIcon className="scale-125" />
        {open && (
          <>
            <div className="top-3 z-40 absolute bg-transparent w-16 h-8"></div>
            <div className="absolute top-8 right-0 z-50 bg-white rounded-lg shadow-md ">
              <PopoverContent />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentMenu;
