import { ModalWarehouseDetails } from '@/common/modal';
import { PopoverVisibilityColumns, useColumnVisibility } from '@/components/common';
import { ChangeIcon, EyeSlashIcon, ShareArrowIcon } from '@/components/icons';
import { DATE_FORMAT, SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import useDragScroll from '@/hooks/use-drag-scroll';
import { WarehouseStatusEnum } from '@/modules/client/warehouse';
import { compareWarehouseStatus } from '@/modules/client/warehouse/warehouse.util';
import { Badge, Button, Image, Select, Table, Tag, Tooltip, type TableProps } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { NovendorType } from '../novendors.type';

export const data: NovendorType = {
  date: dayjs(new Date()),
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
  feature: ['Mặt phố', 'Kinh doanh'],
};

const dataSource: NovendorType[] = Array.from({ length: 15 }, () => ({ ...data }));

export const NovendorsTable = () => {
  const [openPostDetails, setOpenPostDetails] = useState<boolean>(false);
  const [openPopoverHidden, setOpenPopoverHidden] = useState<boolean>(false);
  const dragScrollHandlers = useDragScroll();

  const columns: TableProps<NovendorType>['columns'] = [
    {
      title: 'T.Gian',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
      className: 'border-0',
      render: (date: NovendorType['date']) => dayjs(date).format(DATE_FORMAT),
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
      render: (address: string) => (
        <Tooltip title={address}>
          <span className="font-medium">{address}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Phố',
      key: 'city',
      dataIndex: 'city',
      className: 'border-0',
      render: (city: string) => (
        <Tooltip title={city}>
          <span className="font-medium">{city}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Quận',
      key: 'district',
      dataIndex: 'district',
      className: 'border-0',
      render: (district: string) => (
        <Tooltip title={district}>
          <span className="font-medium">{district}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Thông số',
      key: 'params',
      dataIndex: 'params',
      className: 'border-0',
      render: (params: NovendorType['params']) => {
        const parts = params?.split(' ') ?? [''];

        let landArea, usageArea;
        if (parts[0].includes('/')) {
          [landArea, usageArea] = parts[0].split('/');
        } else {
          landArea = parts[0];
          usageArea = parts[0];
        }

        const numberOfFloors = parts[1] ?? '0';
        const frontage = parts[2] ?? '0';

        return (
          <Tooltip
            title={
              <>
                Diện tích đất: {landArea}m<sup>2</sup>
                <br />
                Diện tích sử dụng: {usageArea}m<sup>2</sup>
                <br />
                Số tầng: {numberOfFloors} <br />
                Mặt tiền: {frontage}m <br />
              </>
            }
          >
            <span>{params}</span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'price',
      className: 'border-0',
      render: (price: NovendorType['price']) => {
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
      render: (owner: NovendorType['owner']) => (
        <a href={owner.profile_url} className="text-link_l dark:text-link_d font-medium">
          {owner.name}
        </a>
      ),
    },
    {
      title: 'SĐT',
      key: 'owner.phone_number',
      dataIndex: 'owner',
      className: 'border-0',
      render: (owner: NovendorType['owner']) => {
        const { phone_number, contact } = owner;
        return (
          <div className="flex items-center gap-2">
            <a href={`tel:${phone_number}`} className="text-link !text-xs mr-2">
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
                        width={16}
                        height={16}
                      />
                    </Link>
                  );
                case 'messenger':
                  return (
                    <Link href={item.url}>
                      <Image
                        src="/images/messenger.png"
                        alt="messenger-url"
                        width={16}
                        height={16}
                      />
                    </Link>
                  );
                case 'zalo':
                  return (
                    <Link href={item.url}>
                      <Image src="/images/zalo.png" alt="zalo-url" width={16} height={16} />
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
      render: (features: NovendorType['feature']) => {
        const values = features.map((feat) => feat).join(', ');
        return (
          <Tooltip title={values}>
            <span>{values}</span>
          </Tooltip>
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

  const {
    columnsVisibility,
    toggleColumnVisibility,
    visibleColumns,
    hiddenColumnsCount,
    resetColumnVisibility,
  } = useColumnVisibility(columns);

  return (
    <>
      <div className="flex justify-between gap-5 max-lg:mt-5">
        <PopoverVisibilityColumns
          open={openPopoverHidden}
          setOpen={setOpenPopoverHidden}
          columns={columns}
          columnsVisibility={columnsVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          resetColumnVisibility={resetColumnVisibility}
          placement="bottomLeft"
          trigger="click"
        >
          <Button
            icon={<EyeSlashIcon />}
            size="large"
            className={`dark:bg-background_d dark:border-0 dark:text-primary_text_d px-5 py-2`}
          >
            Ẩn cột
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
          defaultValue="tin-noi-bat"
        />
      </div>

      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden mt-6"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <Table
          bordered
          tableLayout="auto"
          dataSource={dataSource}
          columns={visibleColumns}
          size="small"
          pagination={false}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? 'bg-primary_color_l dark:bg-primary_color_d'
              : 'bg-background_l_2 dark:bg-background_d'
          }
        />
      </div>

      {/* Xem chi tiết */}
      <ModalWarehouseDetails open={openPostDetails} setOpen={setOpenPostDetails} />
    </>
  );
};
