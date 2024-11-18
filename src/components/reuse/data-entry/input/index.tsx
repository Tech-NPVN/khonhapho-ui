import { SearchIcon, XIcon } from '@/components/icons';
import clsx from 'clsx';
import { useRef } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Tìm kiếm',
  value,
  onSearch,
  onClear,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <div
      className={clsx(
        'flex bg-white border border-solid border-divider_l dark:border-white/15 rounded-xl overflow-hidden relative dark:bg-transparent min-h-10',
      )}
    >
      <input
        ref={inputRef}
        className="border-none pl-3 focus-visible:outline-none bg-transparent dark:bg-transparent flex-1 !min-w-0"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          className="bg-transparent border-none cursor-pointer mt-[2px]"
          onClick={() => {
            onClear?.();
            inputRef.current?.focus();
          }}
        >
          <XIcon width={12} height={12} />
        </button>
      )}

      <button
        className="bg-transparent border-transparent border-solid py-1 px-3 [&_path]:hover:!fill-color_l cursor-pointer border-l border-l-divider_l dark:border-l-divider_d"
        onClick={() => onSearch?.(value)}
      >
        <SearchIcon className="mt-[2px]" width={16} height={16} />
      </button>
    </div>
  );
};

export { SearchInput };
