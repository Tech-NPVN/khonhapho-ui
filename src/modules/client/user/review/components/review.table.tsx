import { memo, useState } from 'react';
import { ReviewType } from '../review.type';
import dayjs from 'dayjs';
import useDragScroll from '@/hooks/use-drag-scroll';
import { Button, Table, type TableProps } from 'antd';
import { DATE_TIME_FORMAT } from '@/constants/data';
import { BadgeNewIcon, ShareArrowIcon } from '@/components/icons';
import { ModalReviewDetails } from './modal';

const fakeData: ReviewType = {
  customer: {
    customer_address: 'Đống Đa',
    customer_identity: '0478293748167',
    customer_name: 'Test',
    customer_reply: 'Đẹp trai và nhát gái',
    customer_purpose: 'Mua để ở',
  },
  saler: {
    saler_contact: '0123456789',
    saler_name: 'Test Đẹp Trai',
    saler_opinition: '',
    saler_avatar:
      'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  visit_time: dayjs(new Date()),
  report_time: dayjs(new Date()),
  report_images: [
    'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  rate_house_owner: '',
  address_visited: `
    <p style="margin-bottom:4px;">250.12.25 Khương Trung 50 3 3.5 6.3 tỷ Thanh Xuân HĐ ĐC Trần Thành Lâm NPHN-6268, 0927749999, X3, nguồn ĐC Trần Thành Lâm, 6 đến 9, #ĐC2</p>
    <p style="margin-bottom:0;">Mô tả: 
      <a href="#">#khuongtrung</a>, 
      <a href="#">#thanhxuan6den9</a>, 
      <a href="#">#dctranthanhlam6268</a>, 
      <a href="#">#nphn6268</a>, 
      <a href="#">#thocu</a>
    </p>`,
};

const dataSource: ReviewType[] = Array.from({ length: 10 }, () => ({ ...fakeData }));

export const ReviewTable = memo(() => {
  const [openReportDetails, setOpenReportDetails] = useState<boolean>(false);
  const dragScrollHandlers = useDragScroll();

  const customerColumns: TableProps<ReviewType>['columns'] = [
    {
      title: 'Thời gian báo cáo',
      dataIndex: 'report_time',
      key: 'report_time',
      render: (report_time: ReviewType['report_time']) => (
        <div className="flex items-center gap-2">
          {dayjs(report_time).format(DATE_TIME_FORMAT)} <BadgeNewIcon />
        </div>
      ),
    },
    {
      title: 'Họ tên Khách',
      dataIndex: 'customer',
      key: 'customer.customer_name',
      render: ({ customer_name }: ReviewType['customer']) => customer_name,
    },
    {
      title: 'Thời gian khách xem nhà',
      dataIndex: 'visit_time',
      key: 'visit_time',
      render: (visit_time: ReviewType['visit_time']) => dayjs(visit_time).format(DATE_TIME_FORMAT),
    },
    {
      title: 'Địa chỉ đã dẫn khách xem',
      dataIndex: 'address_visited',
      key: 'address_visited',
      render: (address_visited: ReviewType['address_visited']) => (
        <div className="my-1" dangerouslySetInnerHTML={{ __html: address_visited }} />
      ),
    },
    {
      title: 'Xem',
      align: 'center',
      key: 'view',
      width: 50,
      render: () => {
        return (
          <div className="flex justify-center">
            <Button
              type="text"
              icon={<ShareArrowIcon />}
              onClick={() => setOpenReportDetails(true)}
            />
          </div>
        );
      },
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
          tableLayout="auto"
          dataSource={dataSource}
          columns={customerColumns}
          size="small"
          pagination={false}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? 'bg-primary_color_l dark:bg-primary_color_d'
              : 'bg-background_l_2 dark:bg-background_d'
          }
        />
      </div>

      <ModalReviewDetails
        open={openReportDetails}
        handleCancel={() => setOpenReportDetails(false)}
        reviewDetails={fakeData}
      />
    </>
  );
});

ReviewTable.displayName = ReviewTable.name;
