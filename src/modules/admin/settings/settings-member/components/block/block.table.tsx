'use client';

import { useState } from 'react';
import { BlockSchemaType } from './block.schema';
import useDragScroll from '@/hooks/use-drag-scroll';
import { Button, Modal, Popconfirm, Table, TableProps } from 'antd';
import { PenIcon, TrashIcon } from '@/components/icons';
import { BlockForm } from './block.form';

const data: BlockSchemaType = {
  group: [1, 2],
  leader: 2,
  author: 'Đẹp trai và nhát gái',
  description: 'Vẫn cứ là đẹp trai',
};

const dataSource: BlockSchemaType[] = Array.from({ length: 10 }, () => ({ ...data }));

export const BlockTable = () => {
  const [currentState, setCurrentState] = useState<BlockSchemaType | undefined>(undefined);
  const [viewTotalDepartment, setViewTotalDepartment] = useState<boolean>(false);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<BlockSchemaType>['columns'] = [
    {
      title: 'Tên khối',
      render: () => <span>Khối 1</span>,
    },
    {
      title: 'Tổng số phòng',
      dataIndex: 'group',
      key: 'group',
      render: (group: BlockSchemaType['group']) => (
        <div className="flex items-center gap-2">
          <span>{group.length}</span>
          <Button type="default" size="small" onClick={() => setViewTotalDepartment(true)}>
            Xem
          </Button>
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 50,
      render: () => (
        <div className="flex justify-center items-center gap-1">
          <Button
            icon={<PenIcon className="fill-link_text_l dark:fill-link_text_d" />}
            type="text"
            onClick={() => setCurrentState(data)}
          />
          <Popconfirm
            title="Bạn có muốn xoá?"
            okText="Có"
            cancelText="Không"
            placement="bottomRight"
          >
            <Button icon={<TrashIcon className="fill-error_l dark:fill-error_d" />} type="text" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
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
          pagination={{
            position: ['bottomRight'],
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 30],
            defaultPageSize: 10,
          }}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? 'bg-primary_color_l dark:bg-primary_color_d'
              : 'bg-background_l_2 dark:bg-background_d'
          }
        />
      </div>

      <BlockForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />

      <ModalViewTotalDepartment
        open={viewTotalDepartment}
        onClose={() => setViewTotalDepartment(false)}
      />
    </>
  );
};

const ModalViewTotalDepartment = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <Modal title="Danh sách các phòng" open={open} onCancel={onClose} width={600} footer={null}>
      <div className="flex flex-col gap-2">
        <p>Phòng 0000 - Giám đốc Khối</p>
      </div>
    </Modal>
  );
};
