'use client';

import { AddIcon } from '@/components/icons';
import { SearchInput } from '@/components/reuse/data-entry/input';
import { Button } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import EventCard from './components/event-card';

const EventIndex = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="mt-4 mr-4 ml-4 lg:ml-0">
      <div className="w-full bg-white flex items-center p-4 rounded-lg justify-between">
        <div className="uppercase text-xl">quản lý sự kiện</div>
        <div className="flex gap-4">
          <div className="w-[300px]">
            <SearchInput
              placeholder="Tìm kiếm sự kiện"
              value={search}
              onChange={(value) => {
                setSearch(value);
              }}
              onClear={() => {
                setSearch('');
              }}
              onSearch={() => {
                console.log('Tìm kiếm: ' + search);
              }}
            />
          </div>
          <Link href={'/admin/media/event/new'}>
            <Button className="h-10 rounded-xl" type="primary" icon={<AddIcon />}>
              Tạo sự kiện
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4 w-full flex items-center rounded-lg flex-col gap-4">
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default EventIndex;
