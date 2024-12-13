'use client';

import { useState } from 'react';
import { AreaSchemaType } from './area.schema';
import useDragScroll from '@/hooks/use-drag-scroll';
import { Button, Popconfirm, Table, TableProps } from 'antd';
import { PenIcon, TrashIcon } from '@/components/icons';
import { AreaForm } from './area.form';

const data: AreaSchemaType = {
  name: 'Miền Bắc',
  code: 'MB',
  slug: 'mien-bac',
};

const dataSource: AreaSchemaType[] = Array.from({ length: 7 }, () => ({ ...data }));

export const AreaTable = () => {
  const [currentState, setCurrentState] = useState<AreaSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<AreaSchemaType>['columns'] = [
    {
      title: 'Tên khu vực',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã khu vực',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
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

      <AreaForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
