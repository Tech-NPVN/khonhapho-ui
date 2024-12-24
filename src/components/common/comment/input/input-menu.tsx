import { ImageIcon, StickerSelectIcon } from '@/components/icons';
import { EmojiSelector } from '../../emoji-picker';

export type CommentInputMenuProps = {
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmojiChange?: (emoji?: string) => void;
};

const CommentInputMenu: React.FC<CommentInputMenuProps> = ({ onImageChange, onEmojiChange }) => {
  return (
    <div className="flex me-2 items-center">
      <label className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer p-1">
        <ImageIcon />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            onImageChange?.(e);
          }}
          className="hidden"
        />
      </label>
      <label className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer p-1">
        <StickerSelectIcon />
      </label>
      <EmojiSelector
        onSelect={(emoji) => {
          onEmojiChange?.(emoji);
        }}
      />
    </div>
  );
};

export default CommentInputMenu;
