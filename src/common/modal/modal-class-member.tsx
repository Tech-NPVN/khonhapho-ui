import { AlarmIcon, LocationIcon, ReloadDownIcon } from '@/components/icons';
import { SearchInput } from '@/components/reuse/data-entry/input';
import { Button, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ModalWithHash } from './modal-with-hash';

import useDragScroll from '@/hooks/use-drag-scroll';
import { Pagination, Table, type TableProps } from 'antd';
import Image from 'next/image';
export interface ClassMemberTypes {
  id?: string;
  username?: string;
  branch?: string;
  checkin_time?: string;
  checkout_time?: string;
}
const columns: TableProps<ClassMemberTypes>['columns'] = [
  {
    title: 'Họ & Tên',
    key: 'username',
    dataIndex: 'username',
    className: 'text-left !py-1 header-name',
    render: (name: ClassMemberTypes['username']) => (
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full overflow-hidden w-8 h-8"
          src="/images/user-default.jpg"
          alt="/images/user-default.jpg"
          width={40}
          height={40}
        />
        <span className="block text-left flex-1 cursor-text">{name}</span>
      </div>
    ),
  },
  {
    title: 'Chi nhánh',
    key: 'branch',
    dataIndex: 'branch',
    className: 'text-center',
    render(branch, _record, index) {
      return (
        <span className="block text-center w-full cursor-text">
          {branch} {index + 1}
        </span>
      );
    },
  },
  {
    title: 'Checkin',
    key: 'checkin_time',
    dataIndex: 'checkin_time',
    className: 'text-center',
    render(checkin_time, _record, index) {
      return <span className="block text-center w-full cursor-text">{checkin_time}</span>;
    },
  },
  {
    title: 'Checkout',
    key: 'checkout_time',
    dataIndex: 'checkout_time',
    className: 'text-center',
    render: (checkout_time: ClassMemberTypes['checkout_time']) => (
      <span className="block text-center w-full">{checkout_time}</span>
    ),
  },
];

const demo: ClassMemberTypes = {
  id: '1',
  branch: 'Hà Nội',
  checkin_time: '09:58:23',
  checkout_time: '10:01:12',
  username: 'TP Nguyễn Kim Ngân',
};

const dataSource: ClassMemberTypes[] = Array.from({ length: 12 }, () => ({ ...demo }));

export const ClassMemberTable = () => {
  const dragScrollHandlers = useDragScroll();
  return (
    <>
      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <Table
          className="mt-5 [&_.ant-table-thead_.header-name]:pl-16"
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={false}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? 'bg-primary_color_l dark:bg-primary_color_d'
              : 'bg-background_l_2 dark:bg-background_d'
          }
        />
      </div>

      <div className="w-full flex justify-end mt-5 gap-2 sm:px-5 px-3">
        <Pagination total={50} defaultPageSize={20} defaultCurrent={1} />
        <Select placeholder="20/trang" />
      </div>
    </>
  );
};

//

type ModalClassMemberProps = {
  open?: boolean;
  onClose?: () => void;
};

const ClassMemberHeader: React.FC<ModalClassMemberProps> = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  return (
    <div className="px-3 sm:px-5">
      <h3>Cách bán nhà hiệu quả dành cho người mới</h3>
      <div>
        <span className="flex gap-1 items-center">
          <span className="mt-1">
            <AlarmIcon width={18} height={18} />
          </span>
          <span>{dayjs().format('DD/MM/YYYY')}</span>
          <span className="text-green-500">10:00</span>
          <span>-</span>
          <span className="text-red-500">12:00</span>
        </span>
        <span className="flex gap-1 items-center">
          <span className="mt-1">
            <LocationIcon width={18} height={18} />
          </span>
          <span>Hội trường tầng 5 tháp A 102 Thái Thịnh</span>
        </span>
      </div>
      <div className="mt-3 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <SearchInput
            placeholder="Tìm kiếm"
            value={searchInput}
            onSearch={(value) => {
              setSearchInput(value);
            }}
            onClear={() => {
              setSearchInput('');
            }}
            onChange={(value) => setSearchInput(value)}
          />
          <Select placeholder="Chức danh" className="h-10 [&_.ant-select-selector]:!rounded-xl" />
          <Select placeholder="Chi nhánh" className="h-10 [&_.ant-select-selector]:!rounded-xl" />
          <Button
            type="dashed"
            className="border-solid h-10 [&_path]:hover:fill-color_l [&span]:hover:text-color_l !duration-0 dark:bg-transparent rounded-xl dark:border-white/15"
          >
            <span className="flex gap-2 items-center dark:text-secondary_text_d">
              <ReloadDownIcon width={14} height={14} />
              Đặt lại
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
const ModalClassMember: React.FC<ModalClassMemberProps> = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <ModalWithHash
          open
          hash="class-member"
          onClose={() => {
            onClose?.();
          }}
          fullScreenInMobile
          antdModalProps={{
            closable: true,
            title: 'Thông tin lớp học',
            classNames: {
              header: 'text-center',
            },
          }}
        >
          <div className="flex flex-col py-2 gap-2">
            <ClassMemberHeader
              onClose={() => {
                window.history.back();
              }}
            />
            <div>
              <ClassMemberTable />
            </div>
            <div className="w-full flex justify-end mt-5 pb-3 sm:px-5 px-3">
              <Button
                onClick={() => {
                  onClose?.();
                }}
              >
                Đóng
              </Button>
            </div>
          </div>
        </ModalWithHash>
      )}
    </>
  );
};

export { ModalClassMember };
