import { ColumnsType } from 'antd/es/table';
import { commonWarehouseColumns, data, WarehouseTable } from '../warehouse.table';
import { WarehouseType } from '../../warehouse.type';
import { type TableProps } from 'antd/lib';
import { Button } from 'antd';
import {
  AlarmSmallIcon,
  BookmarkOutlineIcon,
  CopyDocumentIcon,
  ShareArrowIcon,
} from '@/components/icons';
import { useState } from 'react';
import { ModalBooking } from '@/common/modal';
import FormReportPopup from '@/components/reuse/data-display/popup/form-report';
import WarehouseDetailsPopup from '@/components/reuse/data-display/popup/warehouse-details';

const dataSource: WarehouseType[] = Array.from({ length: 15 }, () => ({ ...data }));

const WarehouseTabsList = () => {
  const [openBooking, setOpenBooking] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openPostDetails, setOpenPostDetails] = useState<boolean>(false);

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
      <FormReportPopup open={openReport} setOpen={setOpenReport} />

      {/* Xem chi tiết */}
      <WarehouseDetailsPopup open={openPostDetails} setOpen={setOpenPostDetails} />
    </>
  );
};

export { WarehouseTabsList };
