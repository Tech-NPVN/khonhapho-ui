import { HashtagProps } from '../type';

export const Hashtag: React.FC<HashtagProps> = ({ className, items, onHashtagClick }) => {
  return (
    <div className={`mt-3 flex-wrap gap-2 flex ${className}`}>
      {items?.map((item) => (
        <span
          key={item}
          className="text-link_text_l cursor-pointer hover:underline lowercase"
          onClick={() => {
            onHashtagClick?.(item);
          }}
        >
          #{item}
        </span>
      ))}
    </div>
  );
};
