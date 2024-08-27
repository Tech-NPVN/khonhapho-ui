import { Button, Dropdown, type MenuProps, Rate, Table, TableProps, Tooltip } from 'antd';
import { ModalCustCreateUpdate, ModalSuitableGoods, ModalVisitedHouse } from './modal';
import useDragScroll from '@/hooks/use-drag-scroll';
import { memo, useMemo, useState } from 'react';
import { CopyDocumentIcon, ThreeDotIcon } from '@/components/icons';
import dayjs from 'dayjs';
import { DATE_FORMAT, SELECT_BUY_PURPOSE, SELECT_HOUSE_DIRECTION } from '@/constants/data';
import { formatMoneyVN } from '@/utilities/func.util';
import { modalError, ModalNote } from '@/common/modal';
import { ItemType } from 'antd/es/menu/interface';
import { CustomerSchemaType } from '../customers.schema';

type CustomersType = CustomerSchemaType & { createdAt: dayjs.Dayjs | string };

const fakeData: CustomersType = {
  rate: 2,
  full_name: 'John Doe',
  cccd: '123456789012',
  birthday: '1990',
  phone: '0987654321',
  address: '123 Main St, Hanoi, Vietnam',
  money: 500000000,
  districts_city: 'Hanoi',
  districts_district: ['Đống Đa', 'Long Biên', 'Tây Hồ'],
  direction: 'chua-ro',
  purpose: 'mua-de-o',
  finance_status: true,
  miss: false,
  understand: true,
  honored: true,
  urgently: false,
  description: 'Looking for a 3-bedroom apartment near the city center.',
  purchase_status: 'dang-tim-mua',
  createdAt: dayjs(new Date()),
};

const dataSource: CustomersType[] = Array.from({ length: 10 }, () => ({ ...fakeData }));

const CustomerTable = ({ type }: { type: 'buying' | 'bought' }) => {
  const [openRequest, setOpenRequest] = useState<boolean>(false);
  const [openSuitableGoods, setOpenSuitableGoods] = useState<boolean>(false);
  const [openVisited, setOpenVisited] = useState<boolean>(false);
  const [currentCustomer, setCurrentCustomer] = useState<CustomersType | undefined>(undefined);

  const dragScrollHandlers = useDragScroll();

  const dropdownItems: MenuProps['items'] = useMemo(() => {
    return [
      {
        label: 'Sửa thông tin',
        key: '0',
        onClick: () => setCurrentCustomer(fakeData),
      },
      {
        label: 'Tìm hàng phù hợp',
        key: '1',
        onClick: () => setOpenSuitableGoods(true),
      },
      {
        label: 'Căn đã dẫn đi xem',
        key: '2',
        onClick: () => setOpenVisited(true),
      },
      {
        label: <>{type === 'buying' ? 'Đã mua nhà' : 'Đang tìm mua'}</>,
        key: '3',
      },
      type === 'bought'
        ? {
            label: 'Xoá',
            danger: true,
            key: '4',
            onClick: () => modalError({ title: 'Bạn có muốn xoá khách hàng' }),
          }
        : (undefined as unknown as ItemType),
    ];
  }, [type]);

  const customerColumns: TableProps<CustomersType>['columns'] = [
    {
      title: 'Yêu cầu',
      key: 'request-action',
      align: 'center',
      className: 'border-0',
      width: 50,
      render: () => (
        <div className="flex justify-center">
          <Button type="text" icon={<CopyDocumentIcon />} onClick={() => setOpenRequest(true)} />
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      key: 'rate',
      dataIndex: 'rate',
      className: 'border-0',
      render: (rate: CustomersType['rate']) => {
        return <Rate defaultValue={rate} allowHalf disabled className="text-xs" />;
      },
    },
    {
      title: 'T.Gian',
      key: 'createdAt',
      dataIndex: 'createdAt',
      className: 'border-0',
      render: (createdAt: CustomersType['createdAt']) => dayjs(createdAt).format(DATE_FORMAT),
    },
    {
      title: 'Họ và tên khách',
      key: 'full_name',
      dataIndex: 'full_name',
      className: 'border-0',
      render: (full_name: CustomersType['full_name']) => (
        <Tooltip title={full_name}>
          <strong>{full_name}</strong>
        </Tooltip>
      ),
    },
    {
      title: 'N.Sinh',
      key: 'birthday',
      dataIndex: 'birthday',
      className: 'border-0',
    },
    {
      title: 'T.C Tối đa',
      key: 'money',
      dataIndex: 'money',
      className: 'border-0',
      render: (money: CustomersType['money']) => {
        const formatValue = formatMoneyVN(money);
        return <Tooltip title={formatValue}>{formatValue}</Tooltip>;
      },
    },
    {
      title: 'Khu vực',
      key: 'districts_district',
      dataIndex: 'districts_district',
      className: 'border-0',
      render: (districts_district: CustomersType['districts_district']) => {
        const list = districts_district.map((item) => item).join(', ');
        return <Tooltip title={list}>{list}</Tooltip>;
      },
    },
    {
      title: 'Hướng nhà',
      key: 'direction',
      dataIndex: 'direction',
      className: 'border-0',
      render: (direction: CustomersType['direction']) => {
        const mappedDirection = SELECT_HOUSE_DIRECTION.find(
          (item) => item.value === direction,
        )?.label;
        return <Tooltip title={mappedDirection}>{mappedDirection}</Tooltip>;
      },
    },
    {
      title: 'Mục đích mua',
      key: 'purpose',
      dataIndex: 'purpose',
      className: 'border-0',
      render: (purpose: CustomersType['purpose']) => {
        const mappedPurpose = SELECT_BUY_PURPOSE.find((item) => item.value === purpose)?.label;
        return <Tooltip title={mappedPurpose}>{mappedPurpose}</Tooltip>;
      },
    },
    {
      title: 'T.C sẵn sàng',
      key: 'finance_status',
      dataIndex: 'finance_status',
      className: 'border-0',
      render: (finance_status: CustomersType['finance_status']) => {
        return finance_status ? 'Sẵn sàng' : '-';
      },
    },
    {
      title: 'Mua hụt nhà',
      key: 'miss',
      dataIndex: 'miss',
      className: 'border-0',
      render: (miss: CustomersType['miss']) => {
        return miss ? 'Đã từng' : '-';
      },
    },
    {
      title: 'Hiểu thị trường',
      key: 'understand',
      dataIndex: 'understand',
      className: 'border-0',
      render: (understand: CustomersType['understand']) => {
        return understand ? 'Đã hiểu' : '-';
      },
    },
    {
      title: 'Tôn trọng MG',
      key: 'honored',
      dataIndex: 'honored',
      className: 'border-0',
      render: (honored: CustomersType['honored']) => {
        return honored ? 'Tôn trọng' : '-';
      },
    },
    {
      title: 'Cần mua gấp',
      key: 'urgently',
      dataIndex: 'urgently',
      className: 'border-0',
      render: (urgently: CustomersType['urgently']) => {
        return urgently ? 'Cần mua gấp' : '-';
      },
    },
    {
      title: 'T.Tác',
      align: 'center',
      key: 'view',
      fixed: 'right',
      width: 50,
      render: () => {
        return (
          <div className="flex justify-center">
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
              <Button type="text" icon={<ThreeDotIcon />} />
            </Dropdown>
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
          bordered
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

      {/* Yêu cầu */}
      <ModalNote
        open={openRequest}
        handleCancel={() => setOpenRequest(false)}
        title="Ghi chú yêu cầu của khách"
        description={fakeData.description}
      />

      {/* Sửa khách hàng */}
      <ModalCustCreateUpdate
        open={Boolean(currentCustomer)}
        handleCancel={() => setCurrentCustomer(undefined)}
        initialValues={currentCustomer}
      />

      {/* Hàng phù hợp */}
      <ModalSuitableGoods
        open={openSuitableGoods}
        handleCancel={() => setOpenSuitableGoods(false)}
        customer={fakeData}
      />

      {/* Căn đã dẫn khách */}
      <ModalVisitedHouse open={openVisited} handleCancel={() => setOpenVisited(false)} />
    </>
  );
};

export default memo(CustomerTable);
