'use client';

import { ModalEditHistory } from '@/common/modal';
import { MarqueeText } from '@/components/common';
import { ClockIcon, HistoryIcon } from '@/components/icons';
import { ImageGrid } from '@/components/reuse/data-display';
import { DATE_TIME_FORMAT } from '@/constants/data';
import { Avatar, Button, Col, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import { WarehouseBrowseConfirmModal } from './warehouse-browse.conf';

export const WarehouseBrowseItem = () => {
  const [openUpdateHistory, setOpenUpdateHistory] = useState<boolean>(false);
  const [openWhConfirm, setOpenWhConfirm] = useState<boolean>(false);

  const { width } = useWindowSize();

  return (
    <>
      <Row className="bg-primary_color_l dark:bg-primary_color_d rounded-lg overflow-hidden">
        <Col xl={6} lg={8} xs={24} className="flex items-center bg-slate-100/50 dark:bg-black/50">
          <ImageGrid
            images={Array.from({ length: 6 }).map(
              (_) =>
                'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
            )}
            maxImagePreview={4}
            horizontally={width > 480 && width <= 991}
          />
        </Col>
        <Col xl={18} lg={16} xs={24} className="p-3 flex flex-col gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Avatar
                  src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                  className="flex-shrink-0 w-10 h-10"
                />
                <div>
                  <h4 className="mb-1">Nhà Phố Việt Nam</h4>
                  <div className="flex items-center gap-2 opacity-60">
                    <ClockIcon width={18} height={18} />
                    <span className="max-md:text-xs">
                      {dayjs(new Date()).format(DATE_TIME_FORMAT)}
                    </span>
                  </div>
                </div>
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
              </div>
            </div>

            <div className="flex mt-4 items-center gap-1">
              <h3 className="text-color_l mb-0 flex-shrink-0">27.727 tỷ</h3>
              <span className="flex-shrink-0">• 255.152tr/m</span>
              <Tag
                className="lg:!text-sm font-semibold bg-background_l dark:bg-background_d overflow-hidden ml-4"
                bordered={false}
              >
                <MarqueeText
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

            <div className="flex items-center justify-end mt-3">
              <Button
                className="flex items-center gap-2"
                type="text"
                onClick={() => setOpenUpdateHistory(true)}
              >
                <HistoryIcon />
                <span className="max-md:hidden">Lịch sử chỉnh sửa</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="default" size="large" className="dark:bg-background_d">
              Sửa
            </Button>
            <Button type="primary" size="large" onClick={() => setOpenWhConfirm(true)}>
              Duyệt tin
            </Button>
          </div>
        </Col>
      </Row>

      <ModalEditHistory
        open={openUpdateHistory}
        onClose={() => {
          setOpenUpdateHistory(false);
        }}
      />

      <WarehouseBrowseConfirmModal open={openWhConfirm} onCancel={() => setOpenWhConfirm(false)}/>
    </>
  );
};
