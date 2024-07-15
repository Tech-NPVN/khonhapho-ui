import clsx from 'clsx';
import Image from 'next/image';
interface IChatPreview {
  user?: {
    name?: string;
    avatar?: string;
  };
  online?: boolean;
  message?: string;
}
interface IChatPreviewProps {
  className?: string;
  chat: IChatPreview;
}
const ChatPreviewComponent = ({ chat }: IChatPreviewProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            width={40}
            height={40}
            src={chat?.user?.avatar || '/images/user-default.jpg'}
            alt={chat?.user?.avatar || '/images/user-default.jpg'}
          />
        </div>
        <div
          className={clsx(
            'absolute w-[10px] h-[10px] rounded-full border bg-green-700 ring-2 ring-white bottom-0 right-0 box-border ',
            chat.online ? '' : 'hidden',
          )}
        ></div>
      </div>
      <div className="line-clamp-2 font-semibold text-sm cursor-pointer dark:text-[#daefff]">
        {chat?.user?.name || 'User'}
      </div>
    </div>
  );
};
export default ChatPreviewComponent;
export type { IChatPreview, IChatPreviewProps };
