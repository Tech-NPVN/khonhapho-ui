'use client';

import { Button, Popconfirm, Table, type TableProps } from 'antd';
import { LegalStatusSchemaType } from './legal-status.schema';
import useDragScroll from '@/hooks/use-drag-scroll';
import { PenIcon, TrashIcon } from '@/components/icons';
import { useState } from 'react';
import { LegalStatusForm } from './legal-status.form';

const data: LegalStatusSchemaType = {
  name: 'Sổ đỏ/sổ hồng',
  code: 'so-do-so-hong',
  description: 'Tình trạng pháp lý của Sổ đỏ/sổ hồng',
  order: 1,
};

const dataSource: LegalStatusSchemaType[] = Array.from({ length: 3 }, () => ({ ...data }));

export const LegalStatusTable = () => {
  const [currentState, setCurrentState] = useState<LegalStatusSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<LegalStatusSchemaType>['columns'] = [
    {
      title: 'Tình trạng pháp lý',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
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
          pagination={false}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? 'bg-primary_color_l dark:bg-primary_color_d'
              : 'bg-background_l_2 dark:bg-background_d'
          }
        />
      </div>

      <LegalStatusForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
