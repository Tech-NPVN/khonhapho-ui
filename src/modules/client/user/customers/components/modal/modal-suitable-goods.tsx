import { ModalBooking, ModalNote, ModalWarehouseDetails } from '@/common/modal';
import {
  AlarmSmallIcon,
  BookmarkOutlineIcon,
  ChangeIcon,
  FilterIcon,
  ReloadDownIcon,
  ShareArrowIcon,
} from '@/components/icons';
import useDragScroll from '@/hooks/use-drag-scroll';
import {
  commonWarehouseColumns,
  data as dataWarehouse,
  WarehouseType,
} from '@/modules/client/warehouse';
import { Button, Col, Divider, Flex, Modal, Row, Select, Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { memo, useState } from 'react';
import { CustomerSchemaType } from '../../customers.schema';

const dataSource: WarehouseType[] = Array.from({ length: 8 }, () => ({ ...dataWarehouse }));

export const ModalSuitableGoods = memo(
  ({
    open,
    handleCancel,
    customer,
  }: {
    open: boolean;
    handleCancel: () => void;
    customer?: CustomerSchemaType;
  }) => {
    const dragScrollHandlers = useDragScroll();

    const [openBooking, setOpenBooking] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [openNote, setOpenNote] = useState<boolean>(false);
    const [openPostDetails, setOpenPostDetails] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);

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
              <Button type="text" icon={<BookmarkOutlineIcon />} />
            </div>
          );
        },
      },
      {
        title: 'Đ.Lịch',
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
      ...(commonWarehouseColumns as ColumnsType<WarehouseType>),
      {
        title: 'Đã báo cáo',
        key: 'reported',
        render: () => <>-</>,
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
        <Modal
          title="Hàng phù hợp"
          open={open}
          onCancel={handleCancel}
          onClose={handleCancel}
          width={1250}
          footer={null}
          centered
        >
          <Divider className="bg-background_l dark:bg-background_d my-4" />

          {/* Lọc */}
          <Row gutter={6} className="mt-5 max-md:hidden">
            <Col flex="20%">
              <Select
                placeholder="Hiện trạng"
                size="large"
                className="w-full"
                options={SELECT_WAREHOUSE_STATUS}
              />
            </Col>

            <Col flex="20%">
              <Select
                placeholder="Loại hình"
                size="large"
                className="w-full"
                options={[
                  {
                    value: 'tat-ca',
                    label: 'Tất cả',
                  },
                  ...SELECT_PROPERTY_TYPE.map((values) => ({
                    value: values.code,
                    label: values.name,
                  })),
                ]}
              />
            </Col>

            <Col flex="20%">
              <Select placeholder="Quận/Huyện" size="large" className="w-full" disabled />
            </Col>

            <Col flex="20%">
              <Select
                placeholder="Đặc điểm BĐS"
                size="large"
                className="w-full"
                options={SELECT_PROPERTY_FEATURE.map((option) => ({
                  label: option.name,
                  value: option.code,
                }))}
              />
            </Col>

            <Col flex="20%">
              <Button
                icon={<ReloadDownIcon />}
                size="large"
                className="w-full bg-transparent dark:text-primary_text_d"
              >
                Đặt lại
              </Button>
            </Col>
          </Row>
          <div className="flex md:justify-end justify-between my-4 gap-3">
            <Button
              icon={<FilterIcon />}
              type="text"
              size="large"
              className="shadow-btn rounded-xl dark:bg-background_d md:hidden flex"
              onClick={() => setOpenFilter(true)}
            >
              Lọc
            </Button>
            <Select
              size="large"
              className="w-64"
              suffixIcon={<ChangeIcon />}
              options={SELECT_FILTER_WAREHOUSE}
              defaultValue="tin-noi-bat"
            />
          </div>

          <div
            {...dragScrollHandlers}
            className="overflow-x-auto overflow-y-hidden"
            style={{ cursor: dragScrollHandlers.cursor }}
          >
            <Table
              bordered
              tableLayout="auto"
              dataSource={dataSource}
              columns={columns}
              size="small"
              pagination={false}
              rowClassName={(_, index) =>
                index % 2 === 0
                  ? 'bg-primary_color_l dark:bg-primary_color_d'
                  : 'bg-background_l_2 dark:bg-background_d'
              }
            />
          </div>
        </Modal>

        {/* Ghi chú */}
        <ModalNote open={openNote} handleCancel={() => setOpenNote(false)} />

        {/* Đặt lịch  */}
        <ModalBooking open={openBooking} handleCancel={() => setOpenBooking(false)} />

        {/* Báo cáo dẫn khách */}
        <FormReportPopup open={openReport} setOpen={setOpenReport} />

        {/* Xem chi tiết */}
        <ModalWarehouseDetails open={openPostDetails} setOpen={setOpenPostDetails} />

        {/* Lọc (responsive) */}
        <ModalSuitableGoodsSearch open={openFilter} handleCancel={() => setOpenFilter(false)} />
      </>
    );
  },
);

const ModalSuitableGoodsSearch = memo(
  ({ open, handleCancel }: { open: boolean; handleCancel: () => void }) => {
    return (
      <Modal title="Bộ lọc" open={open} onCancel={handleCancel} width={500} footer={null} centered>
        <Divider className="bg-background_l dark:bg-background_d my-4" />

        <Flex vertical gap={16}>
          <Select
            placeholder="Hiện trạng"
            size="large"
            className="w-full"
            options={SELECT_WAREHOUSE_STATUS}
          />
          <Select
            placeholder="Loại hình"
            size="large"
            className="w-full"
            options={[
              {
                value: 'tat-ca',
                label: 'Tất cả',
              },
              ...SELECT_PROPERTY_TYPE.map((values) => ({
                value: values.code,
                label: values.name,
              })),
            ]}
          />
          <Select placeholder="Quận/Huyện" size="large" className="w-full" disabled />
          <Select
            placeholder="Đặc điểm BĐS"
            size="large"
            className="w-full"
            options={SELECT_PROPERTY_FEATURE.map((option) => ({
              label: option.name,
              value: option.code,
            }))}
          />

          <Button
            block
            type="primary"
            icon={<FilterIcon className="[&>path]:stroke-primary_color_l" />}
            className="mt-5 py-4"
          >
            Lọc
          </Button>

          <Button block type="default" icon={<ReloadDownIcon />} className="py-4">
            Đặt lại
          </Button>
        </Flex>
      </Modal>
    );
  },
);

ModalSuitableGoodsSearch.displayName = ModalSuitableGoodsSearch.name;
ModalSuitableGoods.displayName = ModalSuitableGoods.name;
