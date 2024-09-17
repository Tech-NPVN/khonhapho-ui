import { BadgeNewIcon, ShareArrowIcon } from '@/components/icons';
import { DATE_TIME_FORMAT } from '@/constants/data';
import useDragScroll from '@/hooks/use-drag-scroll';
import {
  dataSource,
  fakeData as fakeDateReview,
  ModalReviewDetails,
  ReviewType,
} from '@/modules/client/user/review';
import { Avatar, Button, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { memo, useState } from 'react';

export const StocksReviewTable = memo(() => {
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
      title: 'Họ tên đầu khách',
      dataIndex: 'saler',
      key: 'saler',
      render: (saler: ReviewType['saler']) => (
        <div className="flex items-center gap-2">
          <Avatar src={saler.saler_avatar} alt="" className="flex-shrink-0" />
          <Link href="#" className="text-link_text_l dark:text-link_text_d">
            {saler.saler_name}
          </Link>
        </div>
      ),
    },
    {
      title: 'Họ tên khách',
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
        reviewDetails={fakeDateReview}
      />
    </>
  );
});

StocksReviewTable.displayName = StocksReviewTable.name;
