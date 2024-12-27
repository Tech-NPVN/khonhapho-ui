'use client';

import { memo, useState } from 'react';
import { CommentType } from '../types';
import { Comment } from './index';

export type CommentRepliesProps = {
  replies?: CommentType[];
  onReply?: (comment?: CommentType) => boolean; // hiện tại chỉ để trả lời 2 cấp
};
const CommentReplies: React.FC<CommentRepliesProps> = memo(({ replies, onReply }) => {
  const [expand, setExpand] = useState<boolean>(false);
  if (!replies) return null;
  return (
    <div className="w-full flex flex-col">
      <div>
        {replies.slice(0, expand ? replies.length : 1).map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            className="mt-2 comment-child"
            onReply={(newComment) => {
              onReply?.(newComment);
              return true;
            }}
          />
        ))}
      </div>
      {!expand && replies.length > 1 && (
        <div className="cursor-pointer hover:underline text-sm" onClick={() => setExpand(true)}>
          Xem thêm {replies.length - 1} câu trả lời khác
        </div>
      )}
    </div>
  );
});
CommentReplies.displayName = 'CommentReplies';

export default CommentReplies;
