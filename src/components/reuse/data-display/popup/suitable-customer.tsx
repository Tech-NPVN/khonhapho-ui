'use client';

import { OpenFullIcon, SearchIcon } from '@/components/icons';
import { Button, Modal, Select, Table, TableProps } from 'antd';
import { ModalProps } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const convertReportingTime = (reportingTime: string): string => {
  const date = new Date(reportingTime);
  return date
    .toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .slice(0, -3)
    .replace(',', ' ');
};
interface ListOfReportProps extends ModalProps {
  setOpen: () => void;
}
interface DataType {
  key: string;
  reporting_time: string;
  time: string;
  view: string;
  guest_name: string;
  maximum_finance: string;
  address: string;
  owner: {
    name: string;
    phone: string;
    avatar?: string;
    messenger?: string;
    facebook?: string;
    zalo?: string;
    department?: string;
  };
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'T.Gian BC',
    dataIndex: 'reporting_time',
    key: 'reporting_time',
    width: '100px',
    render: (text: string) => convertReportingTime(text),
  },
  {
    title: 'Họ tên Khách',
    dataIndex: 'guest_name',
    key: 'guest_name',
  },
  {
    title: 'T.C tối đa',
    align: 'center',
    dataIndex: 'maximum_finance',
    key: 'maximum_finance',
    width: '100px',
  },
  {
    title: 'Khu vực',
    key: 'address',
    align: 'center',
    dataIndex: 'address',
  },
  {
    title: 'Đầu khách',
    align: 'center',
    dataIndex: 'owner',
    key: 'owner',
    render: (_, { owner }) => (
      <Link className="flex items-center gap-2" href={'/user/id'}>
        <div className="rounded-full overflow-hidden w-[30px] h-[30px]">
          <Image width={30} height={30} src={owner.avatar || ''} alt={owner.name}></Image>
        </div>
        <div className="flex flex-col text-left">
          <div className="uppercase">{owner.name}</div>
          <div>{owner.department}</div>
        </div>
      </Link>
    ),
  },
  {
    title: 'Chat',
    align: 'center',
    dataIndex: 'chat',
    key: 'chat',
    render: (_, { owner }) => (
      <div className="flex gap-2">
        {owner.zalo && (
          <a
            href={owner.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[18px] h-[18px] "
          >
            <Image
              className="object-contain h-full w-full"
              src="/images/zalo.png"
              alt="Zalo"
              width={50}
              height={50}
            />
          </a>
        )}
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image src="/images/messenger-knp.png" alt="messenger-knp" width={20} height={18} />
        </a>

        {owner.messenger && (
          <a href={owner.messenger} target="_blank" rel="noopener noreferrer">
            <Image src="/images/messenger.png" alt="Messenger" width={21} height={21} />
          </a>
        )}
        {owner.facebook && (
          <a href={owner.facebook} target="_blank" rel="noopener noreferrer">
            <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} />
          </a>
        )}
      </div>
    ),
  },
  {
    title: 'Xem',
    align: 'center',
    dataIndex: 'chat',
    key: 'chat',
    render: (_, { view }) => (
      <Button type="link">
        <OpenFullIcon className="fill-link_text_l" />
      </Button>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    reporting_time: new Date().toISOString(),
    time: new Date().toISOString(),
    view: 'View',
    guest_name: 'Nguyễn Văn A',
    address: 'Ba Đình',
    owner: {
      name: 'Nguyễn Kim Ngân',
      avatar: '/images/user-default.jpg',
      department: 'npvn999',
      phone: '0391398381',
      facebook: 'http://www.facebook.com',
      messenger: 'http://www.messenger.com',
      zalo: 'http://www.zalo.com',
    },
    maximum_finance: '12 tỷ',
  },
  {
    key: '2',
    reporting_time: new Date().toISOString(),
    time: new Date().toISOString(),
    view: 'View',
    guest_name: 'Nguyễn Thị B',
    address: 'Ba Đình',
    owner: {
      name: 'Nguyễn Ngọc Ánh',
      avatar: '/images/user-default.jpg',
      department: 'npvn999',
      phone: '0391398381',
      facebook: 'http://www.facebook.com',
      messenger: 'http://www.messenger.com',
      zalo: 'http://www.zalo.com',
    },
    maximum_finance: '8,5 tỷ',
  },
];
const SuitableCustomerPopup = ({ open = false, onClose, onCancel, setOpen }: ListOfReportProps) => {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <div>
      <Modal
        title="Khách hàng phù hợp với tin đăng"
        centered
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        open={isOpen}
        className="dark:bg-primary_color_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white"
        classNames={{
          content: 'dark:bg-primary_color_d dark:text-primary_text_d',
          header: 'dark:bg-primary_color_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl',
          mask: 'dark:!fill-white',
        }}
        onClose={(e) => {
          onClose && onClose(e);
          setOpen && setOpen();
        }}
        onCancel={(e) => {
          onCancel && onCancel(e);
          setOpen && setOpen();
        }}
        width={'auto'}
      >
        <div className="w-[1000px] min-h-80 flex flex-col">
          <div className="w-full flex justify-end gap-3">
            <div className="w-60 h-10 shadow rounded-lg flex items-center gap-2   dark:text-primary_text_d [&_.ant-select-selector]:border-none [&_.ant-select-selector]:!border-transparent [&_.ant-select-selector]:!ring-0">
              <Select
                className="w-full border-transparent focus:ring-transparent focus:outline-none !dark:bg-background_d ring-transparent"
                defaultActiveFirstOption
                value={'0'}
              >
                <Select.Option value="0">Ngày tạo mới nhất</Select.Option>
                <Select.Option value="1">Ngày Tạo cũ nhất</Select.Option>
              </Select>
            </div>
            <div className="w-72 h-10 p-2 shadow rounded-lg flex items-center gap-2 dark:bg-background_d dark:text-primary_text_d">
              <SearchIcon width={20} height={20} />
              <input
                className="border-transparent focus:ring-transparent focus:outline-none bg-transparent flex-1"
                placeholder="Nhập Đ/C SĐT, Seri sổ"
              />
            </div>
          </div>
          <div className="w-full mt-5 even:">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              rowClassName={'even:bg-black/5 dark:even:bg-background_d dark:bg-primary_color_d '}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuitableCustomerPopup;
