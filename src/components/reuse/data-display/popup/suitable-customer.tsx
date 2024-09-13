'use client';

import {
  FacebookImage,
  MessengerImage,
  MessengerKNPImage,
  ZaloImage,
} from '@/components/common/image-components';
import { OpenFullIcon, SearchIcon } from '@/components/icons';
import { Modal, Select, Table, TableProps, Tooltip } from 'antd';
import { ModalProps } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ModalSuitableCustomerDetailTypes {
  id?: string | number;
  customer_name?: string;
}
const convertReportingTime = (reportingTime: string): string => {
  const date = new Date(reportingTime);
  return date
    .toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .slice(0, -3)
    .replace(',', ' ');
};
interface ListOfReportProps extends ModalProps {
  setOpen: () => void;
}
interface DataType {
  key: string;
  reporting_time: string;
  time: string;
  view: string;
  guest_name: string;
  maximum_finance: string;
  address: string;
  owner: {
    name: string;
    phone: string;
    avatar?: string;
    messenger?: string;
    facebook?: string;
    zalo?: string;
    department?: string;
  };
}

const ViewButton = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <button className="bg-transparent border-none cursor-pointer" onClick={() => setShow(true)}>
        <OpenFullIcon className="fill-link_text_l" />
      </button>
      <ModalSuitableCustomerDetails
        open={show}
        onClose={() => {
          setShow(false);
        }}
      />
    </>
  );
};
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'T.Gian BC',
    dataIndex: 'reporting_time',
    key: 'reporting_time',
    width: '100px',
    render: (text: string) => convertReportingTime(text),
  },
  {
    title: 'Họ tên Khách',
    dataIndex: 'guest_name',
    key: 'guest_name',
    render(value, record, index) {
      return (
        <>
          <Tooltip title={record.guest_name}>
            <div className="line-clamp-1">{value}</div>
          </Tooltip>
        </>
      );
    },
  },
  {
    title: 'T.C tối đa',
    align: 'center',
    dataIndex: 'maximum_finance',
    key: 'maximum_finance',
    width: '100px',
    render(value) {
      return (
        <>
          <Tooltip title={value}>
            <div className="line-clamp-1">{value}</div>
          </Tooltip>
        </>
      );
    },
  },
  {
    title: 'Khu vực',
    key: 'address',
    align: 'center',
    dataIndex: 'address',
    render(value) {
      return (
        <>
          <Tooltip title={value}>
            <div className="line-clamp-1">{value}</div>
          </Tooltip>
        </>
      );
    },
  },
  {
    title: 'Đầu khách',
    align: 'center',
    dataIndex: 'owner',
    key: 'owner',
    render: (_, { owner }) => (
      <Link className="flex items-center gap-2" href={'/user/id'}>
        <div className="rounded-full overflow-hidden w-[30px] h-[30px]">
          <Image width={30} height={30} src={owner.avatar || ''} alt={owner.name}></Image>
        </div>
        <div className="flex flex-col text-left">
          <div className="uppercase">{owner.name}</div>
          <div>{owner.department}</div>
        </div>
      </Link>
    ),
  },
  {
    title: 'Chat',
    align: 'center',
    dataIndex: 'chat',
    key: 'chat',
    render: (_, { owner }) => (
      <div className="flex gap-2 justify-center">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <MessengerKNPImage className="w-[18px] h-[18px]" />
        </a>
        {owner.zalo && (
          <a
            href={owner.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[18px] h-[18px] "
          >
            <ZaloImage />
          </a>
        )}
        {owner.messenger && (
          <a href={owner.messenger} target="_blank" rel="noopener noreferrer">
            <MessengerImage className="w-[18px] h-[18px]" />
          </a>
        )}
        {owner.facebook && (
          <a href={owner.facebook} target="_blank" rel="noopener noreferrer">
            <FacebookImage className="w-[18px] h-[18px]" />
          </a>
        )}
      </div>
    ),
  },
  {
    title: 'Xem',
    align: 'center',
    dataIndex: 'view',
    key: 'view',
    fixed: 'right',
    width: '30px',
    className: 'px-2',
    render: (_, { view }) => <ViewButton />,
  },
];

const data: DataType[] = [
  {
    key: '1',
    reporting_time: new Date().toISOString(),
    time: new Date().toISOString(),
    view: 'View',
    guest_name: 'Nguyễn Văn A',
    address: 'Ba Đình',
    owner: {
      name: 'Nguyễn Kim Ngân',
      avatar: '/images/user-default.jpg',
      department: 'npvn999',
      phone: '0391398381',
      facebook: 'http://www.facebook.com',
      messenger: 'http://www.messenger.com',
      zalo: 'http://www.zalo.com',
    },
    maximum_finance: '12 tỷ',
  },
  {
    key: '2',
    reporting_time: new Date().toISOString(),
    time: new Date().toISOString(),
    view: 'View',
    guest_name: 'Nguyễn Thị B',
    address: 'Ba Đình',
    owner: {
      name: 'Nguyễn Ngọc Ánh',
      avatar: '/images/user-default.jpg',
      department: 'npvn999',
      phone: '0391398381',
      facebook: 'http://www.facebook.com',
      messenger: 'http://www.messenger.com',
      zalo: 'http://www.zalo.com',
    },
    maximum_finance: '8,5 tỷ',
  },
];
const ModalSuitableCustomerHash = '#suitable-customer';
const SuitableCustomerPopup = ({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) => {
  const handleClose = () => {
    onClose?.();
    window.history.back();
  };
  useEffect(() => {
    if (open) {
      if (window.location.hash !== ModalSuitableCustomerHash) {
        window.history.pushState(null, '', ModalSuitableCustomerHash);
      }
    }
  }, [open]);
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== ModalSuitableCustomerHash) onClose?.();
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [onClose]);
  return (
    <Modal
      title="Khách hàng phù hợp với tin đăng"
      centered
      open={open}
      className="dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white max-md:!max-w-[calc(100%-16px)] "
      classNames={{
        content: 'dark:bg-primary_color_d dark:text-primary_text_d max-sm:px-2',
        header: 'dark:bg-primary_color_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl',
        mask: 'dark:!fill-white',
      }}
      onClose={() => {
        handleClose();
      }}
      onCancel={() => {
        handleClose();
      }}
      width={1000}
      footer={null}
    >
      <div className="min-h-60 flex flex-col">
        <div className="w-full flex justify-end gap-3 max-sm:flex-col-reverse">
          <div className="w-full sm:w-60 h-10 shadow rounded-lg flex items-center gap-2 dark:text-primary_text_d [&_.ant-select-selector]:border-none [&_.ant-select-selector]:!border-transparent [&_.ant-select-selector]:!ring-0">
            <Select
              className="w-full h-10 border-transparent focus:ring-transparent focus:outline-none !dark:bg-background_d ring-transparent"
              defaultActiveFirstOption
              value={'0'}
            >
              <Select.Option value="0">Ngày tạo mới nhất</Select.Option>
              <Select.Option value="1">Ngày Tạo cũ nhất</Select.Option>
            </Select>
          </div>
          <div className="w-full sm:w-60 h-10 p-2 shadow rounded-lg flex items-center gap-2 dark:bg-primary_color_d dark:text-primary_text_d">
            <SearchIcon width={20} height={20} />
            <input
              className="border-transparent focus:ring-transparent focus:outline-none bg-transparent flex-1"
              placeholder="Nhập Đ/C SĐT, Seri sổ"
            />
          </div>
        </div>
        <div className="mt-5">
          <Table
            // className="dark:[&_th]:bg-primary_text_l"
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: 'max-content' }}
            rowClassName={(_, index) =>
              index % 2 === 0
                ? '[&_td]:bg-primary_color_l dark:[&_td]:bg-primary_color_d !h-12 [&_td]:text-sm'
                : '[&_td]:bg-background_l_2 dark:[&_td]:bg-background_d !h-12 [&_td]:text-sm'
            }
          />
        </div>
      </div>
    </Modal>
  );
};
const ModalSuitableCustomerDetailHash = '#suitable-customer-details';
const ModalSuitableCustomerDetails: React.FC<{
  open?: boolean;
  onClose?: () => void;
}> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose?.();
    window.history.back();
  };
  useEffect(() => {
    if (open) {
      if (window.location.hash !== ModalSuitableCustomerDetailHash) {
        window.history.pushState(null, '', ModalSuitableCustomerDetailHash);
      }
    }
  }, [open]);
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== ModalSuitableCustomerDetailHash) onClose?.();
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [onClose]);
  return (
    <>
      <Modal
        open={open}
        footer={null}
        title="Khách hàng Nguyễn Kim Ngân"
        width={'100%'}
        className="dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white max-sm:!max-w-[calc(100%-16px)] lg:max-w-[780px] md:max-w-[680px] sm:max-w-[520px]"
        classNames={{
          content: 'dark:bg-primary_color_d dark:text-primary_text_d max-sm:px-2',
          header: 'dark:bg-primary_color_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl',
          mask: 'dark:!fill-white',
        }}
        onClose={handleClose}
        onCancel={handleClose}
      >
        <div className="flex flex-col pt-1">
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Thời gian</div>
            <div className="flex-1 p-2 flex items-center">21/02/2024 07:03:04</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-stretch capitalize">
              Họ tên khách hàng
            </div>
            <div className="flex-1 p-2 flex items-center">Nguyễn Kim Ngân</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Đã dẫn khách?</div>
            <div className="flex-1 p-2 flex items-center">Chưa dẫn</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Tài chính tối đa</div>
            <div className="flex-1 p-2 flex items-center">4.6 tỷ</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Khu vực cần mua</div>
            <div className="flex-1 p-2 capitalize">Hà nội</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Quận huyện</div>
            <div className="flex-1 p-2 capitalize">Ba đình, đống đa</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Hướng nhà</div>
            <div className="flex-1 p-2 flex items-center">Hướng Tây</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Mục đích mua</div>
            <div className="flex-1 p-2 flex items-center">Mua để ở</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Tài chính sẵn sàng?</div>
            <div className="flex-1 p-2 flex items-center">Sẵn sàng</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Đã mua hụt nhà?</div>
            <div className="flex-1 p-2 flex items-center">Đã từng</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Hiểu thị trường</div>
            <div className="flex-1 p-2 flex items-center">Đã hiểu</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Cần mua gấp?</div>
            <div className="flex-1 p-2 flex items-center">Không</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Hiện trạng</div>
            <div className="flex-1 p-2 flex items-center">Đang tìm mua</div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Ghi chú yêu cầu</div>
            <div className="flex-1 p-2 flex items-center">
              Mặt ngõ thoáng để chụp ảnh. Ngõ thông. DT trên 30m. Mặt tiền tối thiểu 3,8m trở lên.
              Hướng Tây.
            </div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 capitalize">Nguồn khách</div>
            <div className="flex-1 px-2 flex items-center">
              <Link
                className="flex items-center gap-2 text-link_text_l dark:text-link_text_d hover:underline"
                href={'/user/id'}
              >
                <div className="flex justify-center items-center w-[22px] h-[22px] overflow-hidden rounded-full">
                  <Image
                    className="w-full h-full object-contain"
                    src={'/images/user-default.jpg'}
                    alt="avatar"
                    width={22}
                    height={22}
                  />
                </div>
                Nguyễn Văn A
              </Link>
            </div>
          </div>
          <div className="flex border-b border-black/20 dark:border-white/10 border-0 border-solid items-stretch">
            <div className="w-[150px] bg-black/5 p-2 flex items-center">Liên hệ</div>
            <div className="flex-1 p-2 flex justify-start gap-2 flex-wrap">
              <a href="tel:000000000" className="text-link_text_l dark:text-link_text_d">
                0389619050
              </a>
              <div className="flex gap-2">
                <Link href="/messenger/id" className="text-link_text_l dark:text-link_text_d">
                  <MessengerKNPImage className="w-[18px] h-[18px]" />
                </Link>
                <a
                  href="https://zalo.me/0389619050"
                  target="_blank"
                  className="text-link_text_l dark:text-link_text_d"
                >
                  <ZaloImage className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.facebook.com/messages/t/1"
                  target="_blank"
                  className="text-link_text_l dark:text-link_text_d"
                >
                  <FacebookImage className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.facebook.com/messages/t/1"
                  target="_blank"
                  className="text-link_text_l dark:text-link_text_d"
                >
                  <MessengerImage className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SuitableCustomerPopup;
export { ModalSuitableCustomerDetails, SuitableCustomerPopup };
