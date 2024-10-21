'use client';

import { IMAGE_SAMPLE } from '@/constants/data';
import useDragScroll from '@/hooks/use-drag-scroll';
import { Rate, Table, type TableProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { CompanyType } from '../types';

const columns: TableProps<CompanyType>['columns'] = [
  {
    title: 'Đánh giá',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate: number) => (
      <div className="flex items-center gap-4">
        <Rate defaultValue={rate} allowHalf disabled className="text-sm" />
        <b>{rate.toFixed(1)}</b>
      </div>
    ),
  },
  {
    title: 'Họ tên',
    dataIndex: 'full_name',
    key: 'full_name',
    render: (full_name: string) => (
      <div className="flex items-center gap-3">
        <Image src={IMAGE_SAMPLE} width={30} height={30} alt="" className="rounded-full" />
        <Link href="" className="font-semibold text-link_text_l dark:text-link_text_d">
          {full_name}
        </Link>
      </div>
    ),
  },
  {
    title: 'Chức vụ',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Thành tích',
    dataIndex: 'achievement',
    key: 'achievement',
    render: (achievement) => achievement?.map((item: any) => <p key={item}>{item}</p>),
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birth_year',
    key: 'birth_year',
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Chat',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch',
    key: 'branch',
  },
];

const data: CompanyType = {
  rate: 4.5,
  full_name: 'Nhà Phố Việt Nam',
  role: 'Chủ tịch',
  achievement: [],
  birth_year: '2005',
  phone_number: '0123456789',
  contact: [],
  department: 'HĐQT',
  branch: 'NPVN - Hà Nội',
};

const dataSource: CompanyType[] = Array.from({ length: 10 }, () => ({ ...data }));

export const CompanyTable = () => {
  const dragScrollHandlers = useDragScroll();

  return (
    <div
      {...dragScrollHandlers}
      className="overflow-x-auto overflow-y-hidden mt-6"
      style={{ cursor: dragScrollHandlers.cursor }}
    >
      <Table
        dataSource={dataSource}
        tableLayout="auto"
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
  );
};
