import { ColumnsType } from 'antd/es/table';
import { commonWarehouseColumns, data, WarehouseTable } from '../warehouse.table';
import { WarehouseType } from '../warehouse.type';
import { type TableProps } from 'antd/lib';
import { Button } from 'antd';
import { AlarmSmallIcon, BookmarkOutlineIcon } from '@/components/icons';
import { useState } from 'react';
import { ModalBooking } from '../modals';

const dataSource: WarehouseType[] = Array.from({ length: 15 }, () => ({ ...data }));

const WarehouseTabsList = () => {
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
            <Button type="text" icon={<BookmarkOutlineIcon />} />
          </div>
        );
      },
    },
    {
      title: 'Đ.Lịch',
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
    ...(commonWarehouseColumns as ColumnsType<WarehouseType>),
  ];

  return (
    <>
      <WarehouseTable columns={columns} data={dataSource} />
      <ModalBooking open={openBooking} handleCancel={() => setOpenBooking(false)} />
    </>
  );
};

export { WarehouseTabsList };
