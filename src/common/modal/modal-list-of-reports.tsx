'use client';

import { OpenFullIcon, SearchIcon } from '@/components/icons';
import { convertReportingTime } from '@/utilities/func.time';
import { Button, Modal, Table, TableProps } from 'antd';
import { ModalProps } from 'antd/lib';
import { useState } from 'react';
import { ModalReportDetails } from './modal-report-details';

interface ListOfReportProps extends ModalProps {
  setOpen: () => void;
}
interface DataType {
  key: string;
  reporting_time: string;
  time: string;
  view: string;
  guest_name: string;
}

const ModalListOfReports = ({ open = false, onClose, onCancel, setOpen }: ListOfReportProps) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Thời gian báo cáo',
      dataIndex: 'reporting_time',
      key: 'reporting_time',
      render: (text: string) => convertReportingTime(text),
    },
    {
      title: 'Họ tên Khách',
      dataIndex: 'guest_name',
      key: 'guest_name',
    },
    {
      title: 'Thời gian khách xem nhà',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => convertReportingTime(text),
    },
    {
      title: 'Xem',
      key: 'view',
      align: 'center',
      dataIndex: 'view',
      render: () => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setIsOpenDetail(true);
              }}
            >
              <OpenFullIcon className="fill-link_text_l" />
            </Button>
            <ModalReportDetails open={isOpenDetail} setOpen={setIsOpenDetail} />
          </>
        );
      },
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      reporting_time: new Date().toISOString(),
      time: new Date().toISOString(),
      view: 'View',
      guest_name: 'Nguyễn Văn A',
    },
    {
      key: '2',
      reporting_time: new Date('2022-01-01').toISOString(),
      time: new Date('2024-01-01').toISOString(),
      view: 'View',
      guest_name: 'Nguyễn Văn b',
    },
  ];

  return (
    <div>
      <Modal
        title="Danh sách báo cáo dẫn khách"
        centered
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        open={open}
        className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white"
        classNames={{
          content: 'dark:bg-background_d dark:text-primary_text_d',
          header: 'dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl',
          mask: 'dark:!fill-white',
        }}
        onClose={(e) => {
          onClose && onClose(e);
          setOpen && setOpen();
        }}
        onCancel={(e) => {
          onCancel && onCancel(e);
          setOpen && setOpen();
        }}
        width={'auto'}
      >
        <div className="w-[1000px] min-h-80 flex flex-col">
          <div className="w-full flex justify-end">
            <div className="w-72 h-10 p-2 shadow rounded-lg flex items-center gap-2 dark:bg-primary_color_d dark:text-primary_text_d">
              <SearchIcon width={20} height={20} />
              <input
                className="border-transparent focus:ring-transparent focus:outline-none bg-transparent flex-1"
                placeholder="Nhập Đ/C SĐT, Seri sổ"
              />
            </div>
          </div>
          <div className="w-full mt-5 !rounded-lg overflow-hidden ">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              rowClassName={'even:bg-black/5 dark:even:bg-background_d dark:bg-primary_color_d '}
              className="dark:[&_thead_tr_th]:!bg-divider_d "
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { ModalListOfReports };
