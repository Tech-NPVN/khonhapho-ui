import { ModalBooking, ModalNewReport, ModalWarehouseDetails } from '@/common/modal';
import {
  AlarmSmallIcon,
  BookmarkOutlineIcon,
  CopyDocumentIcon,
  ShareArrowIcon,
} from '@/components/icons';
import { ModalAddCollection, ModalColCreateUpdate } from '@/modules/client/user/collection';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { type TableProps } from 'antd/lib';
import { useState } from 'react';
import { WarehouseType } from '../../warehouse.type';
import { commonWarehouseColumns, data, WarehouseTable } from '../warehouse.table';

const dataSource: WarehouseType[] = Array.from({ length: 15 }, () => ({ ...data }));

const WarehouseTabsList = () => {
  const [openBooking, setOpenBooking] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openPostDetails, setOpenPostDetails] = useState<boolean>(false);

  const [openAddCollection, setOpenAddCollection] = useState<boolean>(false);
  const [openCreateCollection, setOpenCreateCollection] = useState<boolean>(false);

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
            <Button
              type="text"
              icon={<BookmarkOutlineIcon />}
              onClick={() => setOpenAddCollection(true)}
            />
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
    {
      title: 'B.Cáo',
      align: 'center',
      key: 'report',
      width: 50,
      render: () => {
        return (
          <div className="flex justify-center">
            <Button type="text" icon={<CopyDocumentIcon />} onClick={() => setOpenReport(true)} />
          </div>
        );
      },
    },
    {
      title: 'Xem',
      align: 'center',
      key: 'view',
      fixed: 'right',
      width: 50,
      render: () => {
        return (
          <div className="flex justify-center">
            <Button
              type="text"
              icon={<ShareArrowIcon />}
              onClick={() => setOpenPostDetails(true)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <WarehouseTable columns={columns} data={dataSource} />

      {/* Đặt lịch */}
      <ModalBooking open={openBooking} handleCancel={() => setOpenBooking(false)} />

      {/* Báo cáo dẫn khách */}
      <ModalNewReport open={openReport} onClose={() => setOpenReport(false)} />

      {/* Xem chi tiết */}
      <ModalWarehouseDetails
        open={openPostDetails}
        onClose={() => {
          setOpenPostDetails(false);
        }}
      />

      <ModalAddCollection
        open={openAddCollection}
        handleCancel={() => setOpenAddCollection(false)}
        openCreate={() => setOpenCreateCollection(true)}
      />

      <ModalColCreateUpdate
        open={openCreateCollection}
        handleCancel={() => setOpenCreateCollection(false)}
      />
    </>
  );
};

export { WarehouseTabsList };
