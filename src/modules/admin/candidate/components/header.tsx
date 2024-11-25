'use client';
import { SearchInput } from '@/components/reuse/data-entry/input';
import { useState } from 'react';

const Header = () => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <div className="w-full flex justify-between items-center flex-wrap gap-2">
      <div>Tổng số ứng viên: 1990</div>
      <div className="max-[500px]:flex-1 w-[280px]">
        <SearchInput
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(value) => setSearchText(value)}
          onSearch={() => {
            setSearchText('');
          }}
        />
      </div>
    </div>
  );
};

export { Header };
