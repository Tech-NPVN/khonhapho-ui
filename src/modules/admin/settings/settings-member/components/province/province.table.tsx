'use client';

import { Button, Popconfirm, Table, type TableProps } from 'antd';
import { ProvinceForm } from './province.form';
import { PenIcon, TrashIcon } from '@/components/icons';
import { ProvinceSchemaType } from './province.schema';
import { useState } from 'react';
import useDragScroll from '@/hooks/use-drag-scroll';

const data: ProvinceSchemaType = {
  name: 'Thành phố Hà Nội',
  code: 'TPHN',
  slug: 'thanh-pho-ha-noi',
  area: 'mien-bac',
};

const dataSource: ProvinceSchemaType[] = Array.from({ length: 13 }, () => ({ ...data }));

export const ProvinceTable = () => {
  const [currentState, setCurrentState] = useState<ProvinceSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<ProvinceSchemaType>['columns'] = [
    {
      title: 'Tên tỉnh',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã tỉnh',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Khu vực',
      dataIndex: 'area',
      key: 'area',
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

      <ProvinceForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
