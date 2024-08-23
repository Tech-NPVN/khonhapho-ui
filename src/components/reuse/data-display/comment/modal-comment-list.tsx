'use client';
import { Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { Comment, CommentInput, CommentTypes } from './comment';

interface IProps {
  open?: boolean;
  onClose?: () => void;
}

const initComments: CommentTypes[] = [
  {
    id: '1',
    body: 'Nhà này rất đẹp nên mua',
  },
  {
    id: '2',
    body: 'Căn này đã bán chưa chị',
  },
];
const ModalCommentList = ({ open, onClose }: IProps) => {
  const [comments, setComments] = useState<CommentTypes[]>(initComments);
  const handleSendComment = (comment: CommentTypes) => {
    setComments((prev) => [...prev, comment]);
  };

  return (
    <Modal
      title="Bình luận"
      centered
      okText="Lưu"
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      open={open}
      className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white p-0 my-5 mx-auto"
      classNames={{
        content: 'dark:bg-background_d dark:text-primary_text_d !px-0 !py-3',
        header: 'dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl !px-3',
        mask: 'dark:!fill-white',
      }}
      onClose={(e) => {
        onClose && onClose();
      }}
      onCancel={() => {
        onClose && onClose();
      }}
      width={'780px'}
    >
      <div className="w-full">
        <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
        <div className="flex flex-col mx-3 mt-3 sm:h-[75vh] overflow-y-auto gap-1">
          {comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                onDelete={(cmt) => {
                  setComments((prev) => prev.filter((c) => c.id !== cmt?.id));
                }}
              />
            );
          })}
        </div>
        <div className="m-3">
          <div className="flex justify-between items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
            </div>
            <CommentInput onSendComment={handleSendComment} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ModalCommentList };
