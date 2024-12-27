'use client';

import { Button, Image, Table, type TableProps } from 'antd';
import { StickerForm } from './sticker.form';
import { PenIcon, TrashIcon } from '@/components/icons';
import { StickerSchemaType } from './sticker.schema';
import { useMemo, useState } from 'react';
import useDragScroll from '@/hooks/use-drag-scroll';
import { modalError } from '@/common/modal';

const data: StickerSchemaType = {
  name: 'Cảm ơn',
  avatar: ['https://i.pinimg.com/736x/1e/20/32/1e20329bf9a2487347cfbedfc5c0f03d.jpg'],
  images: [
    'https://i.pinimg.com/736x/1e/20/32/1e20329bf9a2487347cfbedfc5c0f03d.jpg',
    'https://i.pinimg.com/736x/1e/20/32/1e20329bf9a2487347cfbedfc5c0f03d.jpg',
  ],
  status: 'hien-thi',
  order: 1,
};

const dataSource: StickerSchemaType[] = Array.from({ length: 11 }, () => ({ ...data }));

export const StickerTable = () => {
  const [currentState, setCurrentState] = useState<StickerSchemaType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<StickerSchemaType>['columns'] = useMemo(() => {
    return [
      {
        title: 'Tên ',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avatar: StickerSchemaType['avatar']) => (
          <Image
            src={avatar[0]}
            alt="avatar"
            width={60}
            height={60}
            className="py-1"
            loading="lazy"
          />
        ),
      },
      {
        title: 'Sticker',
        dataIndex: 'images',
        key: 'images',
        render: (images: StickerSchemaType['images']) => (
          <div className="flex items-center gap-2">
            {images.map((image) => (
              <Image
                key={image}
                src={image}
                alt="image"
                width={60}
                className="py-1"
                loading="lazy"
              />
            ))}
          </div>
        ),
      },
      {
        title: 'Hiển thị',
        dataIndex: 'status',
        key: 'status',
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

            <Button
              icon={<TrashIcon className="fill-error_l dark:fill-error_d" />}
              type="text"
              onClick={() => {
                modalError({
                  title: 'Bạn có muốn xoá sticker này không?',
                  cancelText: 'Không',
                  okText: 'Có',
                  centered: true,
                });
              }}
            />
          </div>
        ),
      },
    ];
  }, []);

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

      <StickerForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
