import { Button, type TableProps } from 'antd';
import { WarehouseTable, commonWarehouseColumns, data } from '../warehouse.table';
import { WarehouseType } from '../warehouse.type';
import { AlarmSmallIcon, BookmarkedIcon, ItemViewIcon } from '@/components/icons';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { ModalBooking } from '../modals';

const dataSource: WarehouseType[] = Array.from({ length: 10 }, () => ({ ...data, saved: false }));

const WarehouseTabsSaved = () => {
  const [openBooking, setOpenBooking] = useState<boolean>(false);

  const columns: TableProps<WarehouseType>['columns'] = [
    {
      title: 'Lưu',
      key: 'saved',
      dataIndex: 'saved',
      width: 50,
      align: 'center',
      className: 'border-0',
      render: (saved: boolean) => {
        return (
          <div className="flex justify-center">
            <Button type="text" icon={<BookmarkedIcon />} />
          </div>
        );
      },
    },
    {
      title: 'Đ.lịch',
      key: 'booking',
      width: 50,
      align: 'center',
      className: 'border-0',
      render: () => {
        return (
          <div className="flex justify-center">
            <Button type="text" icon={<AlarmSmallIcon />} onClick={() => setOpenBooking(true)} />
          </div>
        );
      },
    },
    {
      title: 'G.Chú',
      key: 'note',
      width: 50,
      align: 'center',
      className: 'border-0',
      render: () => {
        return (
          <div className="flex justify-center">
            <Button type="text" icon={<ItemViewIcon />} />
          </div>
        );
      },
    },
    ...(commonWarehouseColumns as ColumnsType<WarehouseType>),
  ];

  return (
    <>
      <WarehouseTable columns={columns} data={dataSource} />
      <ModalBooking open={openBooking} handleCancel={() => setOpenBooking(false)} />
    </>
  );
};

export { WarehouseTabsSaved };
