'use client';

import { Button, Popconfirm, Table, type TableProps } from 'antd';
import { DepartmentForm } from './department.form';
import { PenIcon, TrashIcon } from '@/components/icons';
import { DepartmentSchemaType } from './department.schema';
import { useState } from 'react';
import useDragScroll from '@/hooks/use-drag-scroll';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants/data';

const data: DepartmentSchemaType = {
  name: '001',
  code: 'hanoi001',
  branch: 1,
  author: 'Nguyễn Đẹp Trai',
  updatedAt: new Date(),
};

const dataSource: DepartmentSchemaType[] = Array.from({ length: 13 }, () => ({ ...data }));

export const DepartmentTable = () => {
  const [currentState, setCurrentState] = useState<DepartmentSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<DepartmentSchemaType>['columns'] = [
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã phòng ban',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branch',
      key: 'branch',
      render: (branch) => 'NHÀ PHỐ HÀ NỘI - HÀ NỘI',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Chỉnh sửa lần cuối',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: DepartmentSchemaType['updatedAt']) => (
        <span>{dayjs(updatedAt).format(DATE_TIME_FORMAT)}</span>
      ),
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

      <DepartmentForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
