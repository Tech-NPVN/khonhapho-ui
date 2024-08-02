import { Button, type TableProps } from 'antd';
import { WarehouseTable, commonWarehouseColumns, data } from '../warehouse.table';
import { WarehouseType } from '../warehouse.type';
import {
  AlarmSmallIcon,
  BookmarkedIcon,
  CopyDocumentIcon,
  ItemViewIcon,
  ShareArrowIcon,
} from '@/components/icons';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { ModalBooking } from '../modals';
import FormReportPopup from '@/components/reuse/data-display/popup/form-report';
import NotePopup from '@/components/reuse/data-display/popup/note';

const dataSource: WarehouseType[] = Array.from({ length: 10 }, () => ({ ...data, saved: false }));

const WarehouseTabsSaved = () => {
  const [openBooking, setOpenBooking] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openNote, setOpenNote] = useState<boolean>(false);

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
            <Button type="text" icon={<ItemViewIcon />} onClick={() => setOpenNote(true)} />
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
            <Button type="text" icon={<ShareArrowIcon />} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <WarehouseTable columns={columns} data={dataSource} />
      <NotePopup open={openNote} onCancel={() => setOpenNote(false)} />
      <ModalBooking open={openBooking} handleCancel={() => setOpenBooking(false)} />
      <FormReportPopup open={openReport} setOpen={setOpenReport} />
    </>
  );
};

export { WarehouseTabsSaved };
