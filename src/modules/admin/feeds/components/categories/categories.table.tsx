import { ThreeDotIcon } from '@/components/icons';
import { Button, Table, type TableProps } from 'antd';
import { FeedCategoryType } from './categories.type';

const columns: TableProps<FeedCategoryType>['columns'] = [
  {
    title: 'Loại feed',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'Tên danh mục',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Mô tả',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Thứ tự',
    key: 'no',
    dataIndex: 'no',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (status: FeedCategoryType['status']) => <>{status === 'active' ? 'Hiển thị' : 'Ẩn'}</>,
  },
  {
    title: 'T.Tác',
    key: 'action',
    align: 'center',
    className: 'flex justify-center',
    render: () => <Button type="text" icon={<ThreeDotIcon />} />,
  },
];

const data: FeedCategoryType = {
  type: 'Chia sẻ kỹ năng',
  name: 'Cẩm nang nhà môi giới',
  description: '',
  no: 322,
  status: 'active',
};

const dataSource: FeedCategoryType[] = Array.from({ length: 12 }, () => ({ ...data }));

export const CategoriesTable = () => {
  return (
    <Table
      className="mt-5"
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
  );
};
