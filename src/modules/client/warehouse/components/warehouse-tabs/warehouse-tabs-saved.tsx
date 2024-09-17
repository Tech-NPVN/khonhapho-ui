import { ModalBooking, ModalNewReport, ModalNoteForm, ModalWarehouseDetails } from '@/common/modal';
import {
  AlarmSmallIcon,
  BookmarkedIcon,
  CopyDocumentIcon,
  ItemViewIcon,
  ShareArrowIcon,
} from '@/components/icons';
import { ModalAddCollection, ModalColCreateUpdate } from '@/modules/client/user/collection';
import { Button, type TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { WarehouseType } from '../../warehouse.type';
import { WarehouseTable, commonWarehouseColumns, data } from '../warehouse.table';

const dataSource: WarehouseType[] = Array.from({ length: 10 }, () => ({ ...data, saved: false }));

const WarehouseTabsSaved = () => {
  const [openBooking, setOpenBooking] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openNote, setOpenNote] = useState<boolean>(false);
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
              icon={<BookmarkedIcon />}
              onClick={() => setOpenAddCollection(true)}
            />
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

      {/* Ghi chú */}
      <ModalNoteForm open={openNote} onCancel={() => setOpenNote(false)} />

      {/* Đặt lịch  */}
      <ModalBooking open={openBooking} handleCancel={() => setOpenBooking(false)} />

      {/* Báo cáo dẫn khách */}
      <ModalNewReport
        open={openReport}
        onClose={() => {
          setOpenReport(false);
        }}
      />

      {/* Xem chi tiết */}
      <ModalWarehouseDetails open={openPostDetails} setOpen={setOpenPostDetails} />

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

export { WarehouseTabsSaved };
