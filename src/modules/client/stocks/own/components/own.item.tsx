import { ModalNewReport } from '@/common/modal';
import { ModalSuitableCustomer } from '@/common/modal/modal-suitable-customer';
import {
  BlueEyeIcon,
  BookmarkedIcon,
  ClockIcon,
  CommentIcon,
  CopyDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
  HistoryIcon,
  PenEditGreenIcon,
  PeopleGroup,
  ThreeDotIcon,
  TrashIcon,
} from '@/components/icons';
import { ImageGrid } from '@/components/reuse/data-display';
import { Marquee } from '@/components/reuse/data-display/post/marquee';
import { DATE_TIME_FORMAT } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { Badge, Button, Col, Dropdown, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';

const MaskedInformation = ({ info }: { info: string }) => {
  const [isMasked, setIsMasked] = useState<boolean>(true);

  const getMaskedValue = (value: string) => {
    return value.slice(0, 3) + '*'.repeat(value.length - 6) + value.slice(-3);
  };

  const displayedValue = isMasked ? getMaskedValue(info) : info;

  const onMasked = () => {
    setIsMasked((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-link_text_l dark:text-link_text_d">{displayedValue}</span>
      {isMasked ? (
        <EyeSlashIcon className="cursor-pointer" onClick={onMasked} />
      ) : (
        <EyeIcon className="cursor-pointer" onClick={onMasked} />
      )}
    </div>
  );
};

const OwnItem = () => {
  const router = useRouter();

  const [openSuitableCustomer, setOpenSuitableCustomer] = useState<boolean>(false);
  const [openUpdateHistory, setOpenUpdateHistory] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);

  return (
    <>
      <Row className="bg-primary_color_l dark:bg-primary_color_d rounded-lg overflow-hidden">
        <Col xl={6} lg={8} xs={24} className="flex items-center bg-slate-100/50 dark:bg-black/50">
          <ImageGrid
            images={Array.from({ length: 4 }).map(
              (_) =>
                'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
            )}
          />
        </Col>
        <Col xl={18} lg={16} xs={24} className="p-3 flex flex-col gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ClockIcon width={18} height={18} />
                <span className="max-md:text-xs">{dayjs(new Date()).format(DATE_TIME_FORMAT)}</span>
              </div>

              <div className="flex items-center gap-3">
                <Tag color="red" className="mr-0 max-md:hidden">
                  Có sổ - Thiếu Seri sổ
                </Tag>
                <span className="text-[13px] max-md:hidden">
                  Mã số: <span className="text-link_text_l dark:text-link_text_d">#28820</span>
                </span>
                <Tag
                  className="bg-background_l dark:bg-background_d dark:text-primary_color_l font-medium rounded-lg mr-0"
                  bordered={false}
                >
                  Bán mạnh
                </Tag>
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: 'Bán mạnh',
                        key: '0',
                        onClick: () => {},
                        className: 'text-center',
                      },
                      {
                        label: 'Tạm dừng',
                        key: '1',
                        onClick: () => {},
                        className: 'text-center',
                      },
                      {
                        label: 'Dừng bán',
                        key: '2',
                        onClick: () => {},
                        className: 'text-center',
                      },
                      {
                        label: 'Đã bán',
                        key: '3',
                        onClick: () => {},
                        className: 'text-center',
                      },
                      {
                        label: 'Đã chốt',
                        key: '4',
                        onClick: () => {},
                        className: 'text-center',
                      },
                    ],
                  }}
                  trigger={['click']}
                >
                  <Button type="text" icon={<ThreeDotIcon />} />
                </Dropdown>
              </div>
            </div>

            <div className="flex mt-4 items-center gap-1">
              <h3 className="text-color_l mb-0 flex-shrink-0">27.727 tỷ</h3>
              <span className="flex-shrink-0">• 255.152tr/m</span>
              <Tag
                className="lg:!text-sm font-semibold bg-background_l dark:bg-background_d overflow-hidden ml-4"
                bordered={false}
              >
                <Marquee
                  text="Mặt phố, kinh doanh, có tầng thượng, penhouse"
                  className="max-w-52"
                />
              </Tag>
            </div>

            <div className="my-4">
              <p className="mb-1">
                11A Cao Bá Quát 46 5 5.2 29 tỷ Ba Đình Hà Nội HĐ TP Thái Tài NPHN-3369, 0384628527,
                X3, nguồn ĐT10, 25 đến 35, #ĐC2{' '}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span>Mô tả: </span>
                {['#NPVN', '#NP781', '#NP92193'].map((item) => (
                  <span
                    className="text-link_text_l dark:text-link_text_d cursor-pointer hover:underline lowercase"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="max-md:flex items-center gap-3 hidden max-md:mb-3">
              <Tag color="red" className="mr-0">
                Có sổ - Thiếu Seri sổ
              </Tag>
              <span className="text-[13px]">
                Mã số: <span className="text-link_text_l dark:text-link_text_d">#28820</span>
              </span>
            </div>

            <div className="bg-[#F2F7F8] dark:bg-background_d px-4 py-3 rounded">
              <div className="mb-2 flex items-center gap-1">
                SĐT chủ nhà: <MaskedInformation info="0123456789" />
              </div>
              <div className="mb-2">
                Người duyệt: <span className="text-error_l dark:text-error_d">Thư ký</span>
              </div>
              <div>
                Lý do:
                <p className="mt-2 mb-0 text-error_l dark:text-error_d">
                  - Đầu chỉ sửa lại sổ đổ, viết liền, không phẩy, không cách ạ.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BlueEyeIcon /> 200
                </div>
                <div className="flex items-center gap-2">
                  <CommentIcon /> 1
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkedIcon width={15} height={15} /> 1
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  className="flex items-center gap-2"
                  type="text"
                  onClick={() => setOpenUpdateHistory(true)}
                >
                  <HistoryIcon />
                  <span className="max-md:hidden">Lịch sử chỉnh sửa</span>
                </Button>
                <Button
                  className="flex items-center gap-2"
                  type="text"
                  onClick={() => setOpenSuitableCustomer(true)}
                >
                  <Badge className="badge-error" count={5} size="small" offset={[5, -5]}>
                    <PeopleGroup />
                  </Badge>
                  <span className="max-md:hidden">Khách phù hợp</span>
                </Button>
                <Button
                  className="flex items-center gap-2"
                  type="text"
                  onClick={() => setOpenReport(true)}
                >
                  <Badge className="badge-error" count={5} size="small" offset={[5, -5]}>
                    <CopyDocumentIcon />
                  </Badge>
                  <span className="max-md:hidden">Báo cáo dẫn khách</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="default"
              size="large"
              className="border-error_l dark:border-error_d text-error_l dark:text-error_d bg-transparent"
            >
              <TrashIcon className="fill-error_l dark:fill-error_d" />
              Xoá
            </Button>
            <Button
              type="default"
              size="large"
              className="border-color_l text-color_l bg-transparent"
              onClick={() => router.push(Routes.WarehouseUpdate + '/1')}
            >
              <PenEditGreenIcon />
              Sửa
            </Button>
            <Button type="primary" size="large">
              <EyeIcon className="[&>path]:!fill-primary_color_l" width={18} height={18} />
              Xem
            </Button>
          </div>
        </Col>
      </Row>

      <ModalNewReport
        open={openReport}
        onClose={() => {
          setOpenReport(false);
        }}
      />

      <ModalSuitableCustomer
        open={openSuitableCustomer}
        onClose={() => {
          setOpenSuitableCustomer(false);
        }}
      />
    </>
  );
};

export default memo(OwnItem);
