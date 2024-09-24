import { XIcon } from '@/components/icons';

type MiniSearchProps = {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  hashtag?: string;
  onChange?: (value?: string) => void;
  onSearch?: (value?: string) => void;
  onTagChange?: (value?: string) => void;
};

const MiniSearch = ({
  className,
  defaultValue,
  placeholder,
  hashtag,
  onChange,
  onSearch,
  onTagChange,
}: MiniSearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  const handleSearch = () => {
    onSearch?.(defaultValue);
  };
  return (
    <>
      <div
        className={
          'w-full bg-white h-10 dark:bg-primary_color_d rounded-lg shadow-sm flex items-center ' +
          className
        }
      >
        <div className="w-full flex">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              width={25}
              height={25}
              viewBox="0 0 25 25"
              className="fill-black/50 dark:fill-[#daefff]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.1956 15.9683L22.5 21.2727L21.1145 22.6582L15.8101 17.3538L17.1956 15.9683Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3174 4.61762C7.52983 4.61762 4.45942 7.68804 4.45942 11.4756C4.45942 15.2631 7.52983 18.3336 11.3174 18.3336C15.1049 18.3336 18.1754 15.2631 18.1754 11.4756C18.1754 7.68804 15.1049 4.61762 11.3174 4.61762ZM2.5 11.4756C2.5 6.60588 6.44768 2.6582 11.3174 2.6582C16.1871 2.6582 20.1348 6.60588 20.1348 11.4756C20.1348 16.3453 16.1871 20.293 11.3174 20.293C6.44768 20.293 2.5 16.3453 2.5 11.4756Z"
              />
            </svg>
          </div>
          <input
            className="flex-1 outline-none border-none bg-transparent pe-3"
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder ?? 'Nhập nội dung tìm kiếm'}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
      </div>
      {hashtag ? (
        <div className="mt-4 flex">
          <div className="bg-[#E5E6E8] dark:bg-primary_color_d py-2 px-3 rounded-lg flex gap-3 items-center">
            <span className="text-primary_text_l dark:text-primary_text_d">#{hashtag}</span>
            <div
              className="cursor-pointer w-4 h-4 hover:opacity-80"
              onClick={() => {
                onTagChange?.('');
              }}
            >
              <XIcon width={16} height={16} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export { MiniSearch };
