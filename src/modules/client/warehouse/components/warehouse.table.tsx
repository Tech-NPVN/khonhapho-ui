import { ChangeIcon, EyeSlashIcon, ShareArrowIcon } from '@/components/icons';
import { SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import { Badge, Button, Select, Table, Tag, type TableProps } from 'antd';
import { WarehouseStatusEnum, WarehouseType } from './warehouse.type';
import Link from 'next/link';
import Image from 'next/image';
import { compareWarehouseStatus } from './warehouse.util';
import { PopoverVisibilityColumns, useColumnVisibility } from '@/components/common';
import { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

export const commonWarehouseColumns: TableProps<WarehouseType>['columns'] = [
  {
    title: 'T.Gian',
    key: 'date',
    dataIndex: 'date',
    align: 'center',
    className: 'border-0',
  },
  {
    title: 'Hiện trạng',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    className: 'border-0',

    render: (status: string) => <Tag>{compareWarehouseStatus[status]}</Tag>,
  },
  {
    title: 'Địa chỉ',
    key: 'address',
    dataIndex: 'address',
    className: 'border-0',

    render: (address: string) => <span className="font-medium">{address}</span>,
  },
  {
    title: 'Phố',
    key: 'city',
    dataIndex: 'city',
    className: 'border-0',

    render: (city: string) => <span className="font-medium">{city}</span>,
  },
  {
    title: 'Quận',
    key: 'district',
    dataIndex: 'district',
    className: 'border-0',

    render: (district: string) => <span className="font-medium">{district}</span>,
  },
  {
    title: 'Thông số',
    key: 'params',
    dataIndex: 'params',
    className: 'border-0',
  },
  {
    title: 'Giá',
    key: 'price',
    dataIndex: 'price',
    className: 'border-0',

    render: (price: WarehouseType['price']) => {
      return (
        <span className="font-medium">
          {price.value} {price.unit === 'billion' ? 'tỷ' : 'triệu'}
        </span>
      );
    },
  },
  {
    title: 'Tr/m²',
    key: 'million_per_square_meters',
    dataIndex: 'million_per_square_meters',
    className: 'border-0',

    render: (value: number) => {
      return <Tag color={value < 100 ? '#3FB44B' : ''}>{value}tr/m²</Tag>;
    },
  },
  {
    title: 'Đầu chủ',
    key: 'owner.name',
    dataIndex: 'owner',
    className: 'border-0',

    render: (owner: WarehouseType['owner']) => (
      <a href={owner.profile_url} className="text-primary_text_l dark:text-primary_text_d">
        {owner.name}
      </a>
    ),
  },
  {
    title: 'SĐT',
    key: 'owner.phone_number',
    dataIndex: 'owner',
    className: 'border-0',

    render: (owner: WarehouseType['owner']) => {
      const { phone_number, contact } = owner;

      return (
        <div className="flex items-center gap-2">
          <a href={`tel:${phone_number}`} className="text-link !text-[13px] mr-2">
            {phone_number}
          </a>

          {contact?.map((item) => {
            switch (item.type) {
              case 'khonhapho':
                return (
                  <Link href={item.url}>
                    <Image
                      src="/images/messenger-knp.png"
                      alt="khonhapho-url"
                      width={18}
                      height={18}
                    />
                  </Link>
                );
              case 'messenger':
                return (
                  <Link href={item.url}>
                    <Image src="/images/messenger.png" alt="messenger-url" width={18} height={18} />
                  </Link>
                );
              case 'zalo':
                return (
                  <Link href={item.url}>
                    <Image src="/images/zalo.png" alt="zalo-url" width={18} height={18} />
                  </Link>
                );
              default:
                return '-';
            }
          })}
        </div>
      );
    },
  },
  {
    title: 'Đặc điểm',
    key: 'feature',
    dataIndex: 'feature',
    className: 'border-0',
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

export const data: WarehouseType = {
  saved: false,
  date: '22/02/23',
  status: WarehouseStatusEnum.BanManh,
  address: '12',
  city: 'Thái Hà',
  district: 'Đống Đa',
  params: '70 5 4',
  price: {
    value: 4.6,
    unit: 'billion',
  },
  million_per_square_meters: 629,
  owner: {
    name: 'GĐTC Test Trợ Lý',
    phone_number: '0123456789',
    profile_url: '/#',
    contact: [
      {
        type: 'khonhapho',
        url: '/#',
      },
      {
        type: 'zalo',
        url: '/#',
      },
      {
        type: 'messenger',
        url: '/#',
      },
    ],
  },
  feature: 'Mặt phố',
};

export const WarehouseTable = ({
  columns,
  data,
}: {
  columns: TableProps<WarehouseType>['columns'];
  data: WarehouseType[];
}) => {
  const [openPopoverHidden, setOpenPopoverHidden] = useState<boolean>(false);

  const { columnsVisibility, toggleColumnVisibility, visibleColumns, hiddenColumnsCount } =
    useColumnVisibility(columns);

  return (
    <>
      <div className="flex justify-between">
        <PopoverVisibilityColumns
          open={openPopoverHidden}
          setOpen={setOpenPopoverHidden}
          columns={columns}
          columnsVisibility={columnsVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          placement="bottomLeft"
          trigger="click"
        >
          <Button
            icon={<EyeSlashIcon />}
            size="large"
            className={`dark:bg-background_d dark:border-0 dark:text-primary_text_d px-5 py-2`}
          >
            Ẩn cột{' '}
            {hiddenColumnsCount > 0 && (
              <Badge count={hiddenColumnsCount} className="badge-error ml-1" />
            )}
          </Button>
        </PopoverVisibilityColumns>

        <Select
          size="large"
          className="w-72"
          suffixIcon={<ChangeIcon />}
          options={SELECT_FILTER_WAREHOUSE}
          defaultValue="hot-news"
        />
      </div>

      <Table
        bordered
        className="mt-6"
        scroll={{ x: 'max-content' }}
        dataSource={data}
        columns={visibleColumns}
        size="small"
        pagination={false}
        rowClassName={(_, index) =>
          index % 2 === 0
            ? 'bg-primary_color_l dark:bg-primary_color_d'
            : 'bg-background_l_2 dark:bg-background_d'
        }
      />
    </>
  );
};
