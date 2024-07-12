'use client';

import type { TableProps } from 'antd';
import { CompanyType } from '../types';

const columns: TableProps<CompanyType>['columns'] = [
  {
    title: 'Đánh giá',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate) => <p>{rate}</p>,
  },
  {
    title: 'Họ tên',
    dataIndex: 'full_name',
    key: 'full_name',
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
    dataIndex: 'birth_date',
    key: 'birth_date',
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
    key: 'branch'
  }
];

export const CompanyTable = () => {
  return;
};
