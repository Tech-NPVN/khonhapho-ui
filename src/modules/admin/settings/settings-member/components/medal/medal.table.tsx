'use client';

import { Button, Image, Popconfirm, Table, type TableProps } from 'antd';
import { MedalForm } from './medal.form';
import { PenIcon, TrashIcon } from '@/components/icons';
import { MedalSchemaType } from './medal.schema';
import { useState } from 'react';
import useDragScroll from '@/hooks/use-drag-scroll';

const data: MedalSchemaType = {
  name: 'Top 10 hoa hậu thế giới',
  code: 'top-10-hoa-hau-the-gioi',
  description: 'Xinh đẹp tuyệt vời hú hú khẹc khẹc',
  order: 1,
  image: 'https://i.pinimg.com/736x/1e/20/32/1e20329bf9a2487347cfbedfc5c0f03d.jpg',
};

const dataSource: MedalSchemaType[] = Array.from({ length: 11 }, () => ({ ...data }));

export const MedalTable = () => {
  const [currentState, setCurrentState] = useState<MedalSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<MedalSchemaType>['columns'] = [
    {
      title: 'Tên ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: MedalSchemaType['image']) => (
        <Image src={image} alt="Hình ảnh" width={60} className='py-1' />
      ),
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

      <MedalForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
