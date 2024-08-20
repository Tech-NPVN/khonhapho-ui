'use client';
import TiptapEditor from '@/common/tiptap';
import { ImageIcon, SmileyFaceIcon, StickerSelectIcon } from '@/components/icons';
import { Modal } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Comment, IComment } from './comment';

interface IProps {
  open?: boolean;
  onClose?: () => void;
}

interface ICommentListProps {
  id: string;
  comment: IComment;
}
const initComments: ICommentListProps[] = [
  {
    id: '1',
    comment: {
      body: 'Nhà này rất đẹp nên mua',
    },
  },
  {
    id: '2',
    comment: {
      body: 'Căn này đã bán chưa chị',
    },
  },
];
const ModalCommentList = ({ open, onClose }: IProps) => {
  const [newComment, setNewComment] = useState<{ html?: string; text?: string }>();
  const [comments, setComments] = useState<ICommentListProps[]>(initComments);
  const handleSendComment = () => {
    if (newComment?.text) {
      const newCommentId = String(Date.now());
      setComments([
        ...comments,
        {
          id: newCommentId,
          comment: {
            body: newComment.text,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user: {
              name: 'Nguyễn Văn A',
              avatar: '/images/user-default.jpg',
            },
          },
        },
      ]);
      setNewComment({ text: '', html: '' });
    }
  };
  return (
    <Modal
      title="Bình luận"
      centered
      okText="Lưu"
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      open={open}
      className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white p-0 my-5 "
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
            return <Comment key={index} comment={comment.comment} />;
          })}
        </div>
        <div className="m-3">
          <div className="flex justify-between items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
            </div>
            <div className="relative flex justify-around items-center flex-1">
              <div className="flex-1 bg-black/5 dark:bg-[#151E2F] rounded-2xl min-h-10 flex items-center justify-between h-full">
                <div className="max-w-full sm:max-w-[580px] flex-1">
                  <TiptapEditor
                    content={newComment?.html}
                    onChange={(content, text) => {
                      setNewComment({ html: content, text });
                    }}
                    className="w-full py-[2px] px-3"
                  />
                </div>
                <div className="flex me-2 gap-2">
                  <ImageIcon />
                  <StickerSelectIcon />
                  <SmileyFaceIcon />
                </div>
              </div>
              <button
                className="w-10 h-10 border-none bg-transparent outline-none cursor-pointer flex items-center justify-center"
                disabled={newComment?.text === ''}
                onClick={() => {
                  handleSendComment();
                }}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    clipPath="url(#clip0_989_55394)"
                    className={clsx(
                      newComment?.text === ''
                        ? 'fill-black/20 dark:fill-[#daefff]/40'
                        : 'fill-green-600',
                    )}
                  >
                    <path d="M22.3314 12.1544C22.3407 11.4377 21.9525 10.779 21.322 10.4332L6.63011 2.3611C5.97206 1.98918 5.19633 2.03487 4.57625 2.4583C3.9448 2.88885 3.6216 3.91379 3.79812 4.65406L5.16967 10.4003C5.31047 10.9896 5.83783 11.4045 6.44453 11.4019L14.6205 11.3765C15.0392 11.3681 15.3788 11.7077 15.3704 12.1263C15.3691 12.5379 15.0345 12.8724 14.6159 12.8808L6.43208 12.8998C5.82538 12.901 5.29544 13.3178 5.15098 13.9079L3.73093 19.677C3.55851 20.3588 3.75509 21.0394 4.23612 21.5204C4.29271 21.577 4.35637 21.6406 4.42008 21.6901C5.04303 22.1707 5.85887 22.232 6.55542 21.8609L21.2971 13.8677C21.9297 13.5323 22.322 12.8711 22.3314 12.1544Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_989_55394">
                      <rect width={24} height={24} fill="red" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ModalCommentList };
