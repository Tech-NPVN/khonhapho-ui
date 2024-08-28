import { Avatar, Divider, Modal, Table, Typography } from 'antd';
import { ReviewType } from '../../review.type';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants/data';
import Link from 'next/link';
import { ImageGrid } from '@/components/reuse/data-display';

export const ModalReviewDetails = ({
  open,
  handleCancel,
  reviewDetails,
}: {
  open: boolean;
  handleCancel: () => void;
  reviewDetails: ReviewType;
}) => {
  const {
    address_visited,
    customer,
    report_images,
    report_time,
    saler,
    visit_time,
    rate_house_owner,
  } = reviewDetails;

  const data = [
    { key: '1', label: 'Thời gian báo cáo:', value: dayjs(report_time).format(DATE_TIME_FORMAT) },
    {
      key: '2',
      label: 'Họ tên Đầu khách:',
      value: (
        <div className="flex items-center">
          <Avatar src={saler.saler_avatar} alt="Saler Avatar" size="small" />
          <Link className="text-link_text_l dark:text-link_text_d ml-2" href={'#$'}>
            {saler.saler_name}
          </Link>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Liên hệ Đầu khách:',
      value: (
        <a
          className="text-link_text_l dark:text-link_text_d"
          href={`tel:${saler.saler_contact}`}
          target="_blank"
        >
          {saler.saler_contact}
        </a>
      ),
    },
    {
      key: '4',
      label: 'Thời gian khách xem nhà:',
      value: dayjs(visit_time).format(DATE_TIME_FORMAT),
    },
    { key: '5', label: 'Họ tên khách:', value: customer.customer_name },
    {
      key: '6',
      label: 'CMND/CCCD:',
      value: `${Array.from({ length: 7 })
        .map((_) => '*')
        .join('')}${customer.customer_identity.slice(-5)}`,
    },
    { key: '7', label: 'Địa chỉ khách ở:', value: customer.customer_address },
    {
      key: '8',
      label: 'Địa chỉ khách xem:',
      value: (
        <div
          className="my-1 whitespace-normal"
          dangerouslySetInnerHTML={{ __html: address_visited }}
        />
      ),
    },
    { key: '9', label: 'Mục đích mua:', value: customer.customer_purpose },
    {
      key: '10',
      label: 'Phản hồi của khách:',
      value: customer.customer_reply,
    },
    { key: '11', label: 'Đánh giá của chủ nhà:', value: rate_house_owner ?? 'Không có' },
    { key: '12', label: 'Ý kiến của Đầu khách:', value: saler.saler_opinition ?? 'Không có' },
    {
      key: '13',
      label: 'Ảnh:',
      value: (
        <div className="py-2">
          <ImageGrid images={report_images} isWarehouse />
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      className:
        'border-b-[1px] border-[#000000]/10 border-r-0 !py-2 bg-[#F2F2F2] whitespace-break-spaces',
      width: '30%',
      render: (text: string) => <Typography.Text className="font-semibold">{text}</Typography.Text>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      className: 'border-b-[1px] border-[#000000]/10 border-r-0',
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
  ];

  return (
    <Modal title="Chi tiết" open={open} onCancel={handleCancel} width={700} footer={null} centered>
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Table columns={columns} dataSource={data} pagination={false} showHeader={false} bordered />
    </Modal>
  );
};
