import { FormTrainingFeedCategoryTypes, TrainingFeedCategoryModal } from '@/common/modal';
import { ArrowTopIcon, PenIcon, TrashIcon } from '@/components/icons';
import { Button, Modal, Select, Table, type TableProps } from 'antd';
import { useState } from 'react';
import { FeedCategoryType } from './categories.type';

const ActionColumn = () => {
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState<FormTrainingFeedCategoryTypes | undefined>({
    name: 'Cẩm nang cho người mới',
    description: 'Cách bán nhà hiệu quả dành cho người mới',
    number_order: 1,
    status: false,
    type: '1',
  });
  const handleDelete = () => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa danh mục này?',
      onOk() {
        console.log('Delete success');
        return Promise.resolve();
      },
      onCancel() {
        console.log('Delete canceled');
      },
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <Button className="px-2" type="text" onClick={() => setVisible(true)}>
          <PenIcon className="fill-[#69C3F4]" />
        </Button>
        <Button className="px-2" type="text" onClick={handleDelete}>
          <TrashIcon className="fill-[#FF3B30]" />
        </Button>
      </div>
      <TrainingFeedCategoryModal
        defaultValue={editData}
        open={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

const columns: TableProps<FeedCategoryType>['columns'] = [
  {
    title: 'Loại feed',
    key: 'type',
    dataIndex: 'type',
    className: 'text-center !py-3',
  },
  {
    title: 'Tên danh mục',
    key: 'name',
    dataIndex: 'name',
    className: 'text-center',
  },
  {
    title: 'Mô tả',
    key: 'description',
    dataIndex: 'description',
    className: 'text-center',
  },
  {
    title: 'Thứ tự',
    key: 'no',
    dataIndex: 'no',
    className: 'text-center',
    render: (no: FeedCategoryType['no']) => <span className="block text-center w-full">{no}</span>,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    className: 'text-center',
    render: (status: FeedCategoryType['status']) => (
      <span className="block text-center w-full">{status === 'active' ? 'Hiển thị' : 'Ẩn'}</span>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    align: 'center',
    className: 'text-center',
    render: () => <ActionColumn />,
  },
];

const data: FeedCategoryType = {
  type: 'Chia sẻ kỹ năng',
  name: 'Cẩm nang nhà môi giới',
  description: 'Có thể sửa và xoá',
  no: 322,
  status: 'active',
};

const dataSource: FeedCategoryType[] = Array.from({ length: 12 }, () => ({ ...data }));

export const CategoriesTable = () => {
  return (
    <>
      <Table
        className="mt-5"
        dataSource={dataSource}
        columns={columns}
        size="small"
        pagination={false}
        scroll={{ x: 'max-content' }}
        rowClassName={(_, index) =>
          index % 2 === 0
            ? 'bg-primary_color_l dark:bg-primary_color_d'
            : 'bg-background_l_2 dark:bg-background_d'
        }
      />
      <div className="w-full flex justify-end mt-5 gap-2">
        <div className="flex gap-[2px]">
          <Button
            type="dashed"
            className="h-8 w-8 -rotate-90 border-solid p-1 border-transparent [&_path]:hover:!fill-color_l hover:border-color_l"
          >
            <ArrowTopIcon width={16} height={8} />
          </Button>
          <Button type="dashed" className="h-8 w-8 border-solid p-3">
            1
          </Button>
          <Button
            type="dashed"
            className="h-8 w-8 rotate-90 border-solid p-1 border-transparent [&_path]:hover:!fill-color_l hover:border-color_l"
          >
            <ArrowTopIcon width={16} height={8} />
          </Button>
        </div>
        <div>
          <Select placeholder="20/Trang" />
        </div>
      </div>
    </>
  );
};
