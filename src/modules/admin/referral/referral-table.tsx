'use client';

import useDragScroll from '@/hooks/use-drag-scroll';
import { Pagination, Select, Table, type TableProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CopyReferral from './copy-referral';
import { ReferralType } from './type';

const columns: TableProps<ReferralType>['columns'] = [
  {
    title: 'Mã giới thiệu',
    key: 'code',
    dataIndex: 'code',
    className: 'text-center !py-3 sm:text-base',
    render: (code: ReferralType['code']) => (
      <>
        <CopyReferral text={code} />
      </>
    ),
  },
  {
    title: 'Người sử dụng',
    key: 'person_used',
    dataIndex: 'person_used',
    className: 'text-center !py-3 sm:text-base',
    render: (person_used: ReferralType['person_used']) => (
      <div className="text-center cursor-text">{person_used ?? '-'}</div>
    ),
  },
  {
    title: 'Chức danh',
    key: 'role',
    dataIndex: 'role',
    className: 'text-center !py-3 sm:text-base',
    render: (role: ReferralType['role']) => (
      <div className="text-center cursor-text">{role ?? '-'}</div>
    ),
  },
  {
    title: 'Chi nhánh',
    key: 'branch',
    dataIndex: 'branch',
    className: 'text-center !py-3 sm:text-base',
    render: (branch: ReferralType['branch']) => (
      <div className="text-center cursor-text">{branch ?? '-'}</div>
    ),
  },
  {
    title: 'Phòng ban',
    key: 'department',
    dataIndex: 'department',
    className: 'text-center !py-3 sm:text-base',
    render: (department: ReferralType['department']) => (
      <div className="text-center cursor-text">{department ?? '-'}</div>
    ),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    className: 'text-center !py-3 sm:text-base',
    render: (status: ReferralType['status']) => {
      if (status === 'activated')
        return <div className="text-center cursor-text text-blue-500">Đã kích hoạt</div>;
      if (status === 'inactive')
        return <div className="text-center cursor-text text-gray-700">Chưa kích hoạt</div>;
      if (status === 'expired')
        return <div className="text-center cursor-text text-red-500">Đã hết hạn</div>;
    },
  },
  {
    title: 'Ngày tạo',
    key: 'created_at',
    dataIndex: 'created_at',
    className: 'text-center !py-3 sm:text-base',
    render: (created_at: ReferralType['created_at']) => (
      <div className="text-center cursor-text">
        {dayjs(created_at).format('DD/MM/YYYY hh:mm:ss') ?? '-'}
      </div>
    ),
  },
];

const demo: ReferralType = {
  created_at: new Date(Date.now()).toISOString(),
  id: 0,
  code: 'ZXCVBNM',
  person_used: '0389619050',
  department: 'Đống Đa',
  status: 'activated',
  branch: 'Nhà Phố 999, Hà Nội',
  role: 'Học viên',
};

const array = Array.from({ length: 100 });
const dataSource: ReferralType[] = array.map((_, index) => ({
  ...demo,
  status: index == 0 ? 'inactive' : index == 1 ? 'activated' : 'expired',
}));
export const ReferralTable = () => {
  const dragScrollHandlers = useDragScroll();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [data, setData] = useState<ReferralType[]>([]);
  useEffect(() => {
    setData(dataSource.slice(itemPerPage * (currentPage - 1), itemPerPage * currentPage));
  }, [currentPage, itemPerPage]);
  return (
    <>
      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden min-h-[calc(100vh-220px)]"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <Table
          className="mt-5"
          dataSource={data}
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

      <div className="w-full flex justify-end mt-5 gap-2">
        <Pagination
          total={dataSource.length}
          pageSize={itemPerPage}
          current={currentPage}
          showSizeChanger={false}
          onChange={(n) => {
            setCurrentPage(n);
          }}
        />
        <Select
          placeholder="20/trang"
          value={itemPerPage}
          onChange={(n) => {
            setItemPerPage(n);
            setCurrentPage(1);
          }}
        >
          <Select.Option value={5}>5/trang</Select.Option>
          <Select.Option value={10}>10/trang</Select.Option>
          <Select.Option value={20}>20/trang</Select.Option>
          <Select.Option value={30}>30/trang</Select.Option>
          <Select.Option value={50}>50/trang</Select.Option>
        </Select>
      </div>
    </>
  );
};
