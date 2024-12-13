'use client';

import { FacebookImage, MessengerImage, ZaloImage } from '@/components/common/image-components';
import { EyeIcon, EyeSlashIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import useDragScroll from '@/hooks/use-drag-scroll';
import { Pagination, Rate, Select, Table, type TableProps } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './custom.css';
import { UserType } from './type';
import UsersThreedot from './users-threedot';
const CitizenIdentificationComponent: React.FC<{ id: string }> = ({ id }) => {
  const [visible, setVisible] = useState(false);
  const formatId = (id: string, visible: boolean) =>
    visible ? id : id.slice(0, -4).replace(/\d/g, '*') + id.slice(-4);
  return (
    <span className="flex gap-2 items-center justify-center">
      <span className="cursor-text">{formatId(id, visible)}</span>
      <span className="cursor-pointer" onClick={(e) => setVisible(!visible)}>
        {visible ? <EyeSlashIcon /> : <EyeIcon />}
      </span>
    </span>
  );
};
const columns: TableProps<UserType>['columns'] = [
  {
    title: 'Đánh giá',
    key: 'rate',
    dataIndex: 'rate',
    className: 'text-center sm:text-base cursor-text',
    render: () => (
      <div className="flex justify-center items-center gap-2">
        <Rate className="[&_svg]:w-3 [&_li]:me-1" allowHalf value={4} disabled />
        <span>4</span>
      </div>
    ),
  },
  {
    title: 'Họ & Tên',
    key: 'name',
    dataIndex: 'name',
    className: 'text-left sm:text-base',
    render: (name: UserType['name'], record: UserType) => (
      <div className="flex">
        <Image
          className="rounded-full overflow-hidden w-10 h-10"
          src={record.avatar}
          alt={record.name}
          width={50}
          height={50}
        />
        <div className="ml-2 flex flex-col items-start text-left">
          <Link href={Routes.User + '/' + record.id}>{name}</Link>
          <span className="text-sm">Đang hoạt động</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Chức danh',
    key: 'role',
    dataIndex: 'role',
    className: 'text-center sm:text-base cursor-text',
    render: (role: UserType['role']) => <div className="text-center">{role}</div>,
  },
  {
    title: 'Chi nhánh',
    key: 'branch',
    dataIndex: 'branch',
    className: 'text-center sm:text-base cursor-text',
    render: (branch: UserType['branch']) => <div className="text-center">{branch}</div>,
  },
  {
    title: 'Khối',
    key: 'group',
    dataIndex: 'group',
    className: 'text-center sm:text-base cursor-text',
    render: (group: UserType['group']) => <div className="text-center">{group ?? '-'}</div>,
  },
  {
    title: 'Phòng',
    key: 'department',
    dataIndex: 'department',
    className: 'text-center sm:text-base cursor-text',
    render: (department: UserType['department']) => (
      <div className="text-center">{department ?? '-'}</div>
    ),
  },
  {
    title: 'HSD',
    key: 'expiry',
    dataIndex: 'expiry',
    className: 'text-center sm:text-base cursor-text',
    render: (expiry: UserType['expiry']) => <div className="text-center">{expiry ?? '-'}</div>,
  },
  {
    title: 'Ngày sinh',
    key: 'birthday',
    dataIndex: 'birthday',
    className: 'text-center sm:text-base cursor-text',
    render: (birthday: UserType['birthday']) => (
      <div className="text-center">{dayjs(birthday).format('DD/MM/YYYY') ?? '-'}</div>
    ),
  },
  {
    title: 'SĐT',
    key: 'phone_number',
    dataIndex: 'phone_number',
    className: 'text-center sm:text-base cursor-text',
    render: (phone_number: UserType['phone_number']) => (
      <a href={'tel:' + phone_number} className="text-center">
        {phone_number ?? '-'}
      </a>
    ),
  },
  {
    title: 'Chat',
    key: 'social_network',
    dataIndex: 'social_network',
    className: 'text-center sm:text-base cursor-text',
    render: (chat: UserType['social_network']) => (
      <div className="flex gap-2">
        {chat?.zalo ? (
          <a href={'tel:' + chat.zalo} className="text-center block w-5 h-5">
            <ZaloImage />
          </a>
        ) : (
          <div className="text-center block w-5 h-5">-</div>
        )}
        {chat?.messenger ? (
          <a href={'tel:' + chat.messenger} className="text-center block w-5 h-5">
            <MessengerImage />
          </a>
        ) : (
          <div className="text-center block w-5 h-5">-</div>
        )}
        {chat?.facebook ? (
          <a href={'tel:' + chat.facebook} className="text-center block w-5 h-5">
            <FacebookImage />
          </a>
        ) : (
          <div className="text-center block w-5 h-5">-</div>
        )}
      </div>
    ),
  },
  {
    title: 'CCCD',
    key: 'citizen_identification',
    dataIndex: 'citizen_identification',
    className: 'text-center sm:text-base cursor-text',
    render: (citizen_identification: UserType['citizen_identification']) => (
      <>
        <CitizenIdentificationComponent id={citizen_identification ?? ''} />
      </>
    ),
  },
  {
    title: 'T.Tác',
    key: 'threedot',
    dataIndex: 'threedot',
    className: 'text-center sm:text-base cursor-text',
    fixed: 'right',
    render: (_, record: UserType) => (
      <>
        <UsersThreedot user={record} />
      </>
    ),
  },
];

const demo: UserType = {
  created_at: new Date(Date.now()).toISOString(),
  id: 0,
  avatar: '/images/user-default.jpg',
  branch: 'Nhà Phố 999, Hà Nội',
  citizen_identification: '010202030138',
  name: 'Nguyễn Kim Ngân',
  department: 'Hà Nội 999',
  phone_number: '0389619050',
  role: 'Học viên',
  social_network: {
    facebook: 'facebook.com/kimngan',
    messenger: 'messenger.com/kimngan',
    zalo: 'zalo.com/kimngan',
  },
  email: 'kimngan@gmail.com',
};

const array = Array.from({ length: 100 });
const dataSource: UserType[] = array.map((_, index) => ({
  ...demo,
  social_network: {
    facebook: index % 2 == 0 ? 'facebook.com/user' : undefined,
    messenger: index % 5 == 0 ? 'facebook.com/user' : undefined,
    zalo: index % 3 == 0 ? 'facebook.com/user' : undefined,
  },
}));

/** (Component) Danh sách thành viên trong trang quản trị */
const UsersTable = () => {
  const dragScrollHandlers = useDragScroll();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [data, setData] = useState<UserType[]>([]);
  useEffect(() => {
    setData(dataSource.slice(itemPerPage * (currentPage - 1), itemPerPage * currentPage));
  }, [currentPage, itemPerPage]);
  return (
    <>
      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <Table
          className="dark:[&_.ant-table-thead_tr_th]:bg-primary_color_d"
          dataSource={data}
          columns={columns}
          size="small"
          pagination={false}
        />
      </div>

      <div className="w-full flex justify-end mt-5 gap-2 pr-3">
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
export default UsersTable;
