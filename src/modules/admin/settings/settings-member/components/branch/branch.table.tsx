'use client';

import { Button, Popconfirm, Table, TableProps } from 'antd';
import { BranchForm } from './branch.form';
import { PenIcon, TrashIcon } from '@/components/icons';
import { BranchSchemaType } from './branch.schema';
import { useState } from 'react';
import useDragScroll from '@/hooks/use-drag-scroll';

const data: BranchSchemaType = {
  name: 'Cầu Giấy',
  code: 'cau-giay',
  city: 1,
  headquarters: true,
};

const dataSource: BranchSchemaType[] = Array.from({ length: 10 }, () => ({ ...data }));

export const BranchTable = () => {
  const [currentState, setCurrentState] = useState<BranchSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<BranchSchemaType>['columns'] = [
    {
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã chi nhánh',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Thành Phố',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Trụ sở chính',
      dataIndex: 'headquarters',
      key: 'headquarters',
      render: (headquarters) => <span>{headquarters? '✓' : ' '}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
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

      <BranchForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
