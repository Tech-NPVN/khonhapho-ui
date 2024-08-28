'use client';
import { Modal } from 'antd';
import { useState } from 'react';
import { Comment, CommentTypes } from './comment';
import { CommentInput } from './comment-input';

interface IProps {
  open?: boolean;
  onClose?: () => void;
}

const initComments: CommentTypes[] = [
  {
    id: '1',
    body: 'Nhà này rất đẹp nên mua',
    created_at: new Date('2024-04-09').toISOString(),
    updated_at: new Date('2024-05-09').toISOString(),
    child_comments: [
      {
        id: 'cmm1',
        body: 'Căn này đã bán chưa chị Căn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chị',
        created_at: new Date('2024-07-02').toISOString(),
        updated_at: new Date('2024-08-09').toISOString(),
      },
      {
        id: 'cmm3',
        body: 'Lorem ipsum dolor sit amet',
        created_at: new Date('2024-07-02').toISOString(),
        updated_at: new Date('2024-08-09').toISOString(),
      },
    ],
  },
  {
    id: '2',
    body: 'Căn này đã bán chưa chị',
    created_at: new Date('2024-07-02').toISOString(),
    updated_at: new Date('2024-08-09').toISOString(),
  },
];
const ModalCommentList = ({ open, onClose }: IProps) => {
  const [comments, setComments] = useState<CommentTypes[]>(initComments);
  const handleSendComment = (comment: CommentTypes) => {
    const newComment: CommentTypes = {
      ...comment,
      id: Math.random().toString(),
      created_at: comment.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as CommentTypes;
    const newComments = [...comments];
    newComments.unshift(newComment);
    setComments(newComments);
  };

  return (
    <Modal
      title="Bình luận"
      centered
      okText="Lưu"
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      open={open}
      className="dark:[&_.ant-modal-close-icon_svg]:fill-white p-0 my-5 mx-auto"
      classNames={{
        content: 'dark:!bg-primary_color_d dark:text-primary_text_d !px-0 !py-3',
        header: 'dark:!bg-primary_color_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl !px-3',
        mask: 'dark:!fill-white',
      }}
      onClose={(e) => {
        onClose && onClose();
      }}
      onCancel={() => {
        onClose && onClose();
      }}
      width={'768px'}
    >
      <div className="w-full">
        <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
        <div className="modal-comments flex flex-col mx-3 mt-3 sm:h-[65vh] overflow-y-auto gap-1">
          {comments.map((comment) => {
            return (
              <Comment
                className=""
                key={comment.id}
                comment={comment}
                onDelete={(cmt) => {
                  setComments((prev) => prev.filter((c) => c.id !== cmt?.id));
                }}
              />
            );
          })}
        </div>
        <div className="m-3">
          <CommentInput onSendComment={handleSendComment} showAvatar autoFocus />
        </div>
      </div>
    </Modal>
  );
};

export { ModalCommentList };
