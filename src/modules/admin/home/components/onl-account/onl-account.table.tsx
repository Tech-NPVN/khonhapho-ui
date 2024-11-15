import { Button, Table, TableProps } from 'antd';
import { OnlAccountType } from './onl-account.type';
import { IMAGE_SAMPLE } from '@/constants/data';
import Image from 'next/image';
import Link from 'next/link';
import { ThreeDotIcon } from '@/components/icons';
import useDragScroll from '@/hooks/use-drag-scroll';

const columns: TableProps<OnlAccountType>['columns'] = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'center',
    render: (avatar: string) => (
      <Image src={avatar} width={30} height={30} alt="" className="rounded-full" />
    ),
  },
  {
    title: 'Họ tên',
    dataIndex: 'full_name',
    key: 'full_name',
    render: (full_name: string) => (
      <Link href="" className="font-semibold text-link_text_l dark:text-link_text_d">
        {full_name}
      </Link>
    ),
  },
  {
    title: 'Chức vụ',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch',
    key: 'branch',
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Nhóm',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'T.Tác',
    key: 'action',
    align: 'center',
    className: 'flex justify-center',
    render: () => <Button type="text" icon={<ThreeDotIcon />} />,
  },
];

const data: OnlAccountType = {
  avatar: IMAGE_SAMPLE,
  full_name: 'Nguyễn Văn A',
  role: 'Thư ký',
  phone_number: '0123456789',
  branch: 'NPVN - HÀ NỘI',
  department: 'CODE',
  group: 'NamNP2012 - Nhóm',
};

const dataSource: OnlAccountType[] = Array.from({ length: 12 }, () => ({ ...data }));

export const OnlAccountTable = () => {
  const dragScrollHandlers = useDragScroll();

  return (
    <div
      {...dragScrollHandlers}
      className="overflow-x-auto overflow-y-hidden mt-6"
      style={{ cursor: dragScrollHandlers.cursor }}
    >
      <Table
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
  );
};
