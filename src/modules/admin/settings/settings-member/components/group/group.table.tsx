'use client';

import { Button, Popconfirm, Table, type TableProps } from 'antd';
import { GroupForm } from './group.form';
import { GroupSchemaType } from './group.schema';
import { useState } from 'react';
import useDragScroll from '@/hooks/use-drag-scroll';
import { DATE_TIME_FORMAT } from '@/constants/data';
import dayjs from 'dayjs';
import { PenIcon, TrashIcon } from '@/components/icons';

const data: GroupSchemaType = {
  name: 'Nhóm đẹp trai',
  department: 1,
  description: 'GĐKD Test',
};

const dataSource: GroupSchemaType[] = Array.from({ length: 10 }, () => ({ ...data }));

export const GroupTable = () => {
  const [currentState, setCurrentState] = useState<GroupSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<GroupSchemaType>['columns'] = [
    {
      title: 'Tên nhóm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chi nhánh',
      // dataIndex: 'code',
      // key: 'code',
      render: () => <span>NHÀ PHỐ VIỆT NAM - CHI NHÁNH HÀ NỘI</span>,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Tác giả',
      // dataIndex: 'headquarters',
      // key: 'headquarters',
      render: (headquarters) => <span>Olala</span>,
    },
    {
      title: 'Chỉnh sửa lần cuối',
      // dataIndex: 'headquarters',
      // key: 'headquarters',
      render: (headquarters) => <span>{dayjs(new Date()).format(DATE_TIME_FORMAT)}</span>,
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

      <GroupForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
