'use client';

import { Modal } from 'antd';
import { ModalProps } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
const replaceId = (IdString: string) => {
  const s2 = IdString.substring(IdString.length - 3, IdString.length);
  const s1 = IdString.substring(0, IdString.length - 3).replaceAll(/\d/g, '*');
  return s1 + s2;
};
interface ListOfReportProps extends ModalProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const ReportDetailsPopup = ({ open = false, onClose, onCancel, setOpen }: ListOfReportProps) => {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <div>
      <Modal
        title="Chi tiết"
        centered
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        open={isOpen}
        className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white"
        classNames={{
          content: 'dark:bg-background_d dark:text-primary_text_d',
          header: 'dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-lg',
          mask: 'dark:!fill-white',
        }}
        onClose={(e) => {
          onClose && onClose(e);
          setOpen && setOpen(false);
        }}
        onCancel={(e) => {
          onCancel && onCancel(e);
          setOpen && setOpen(false);
        }}
        width={'auto'}
      >
        <div className="w-[650px] border-t">
          <div className="flex flex-col pt-1">
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Thời gian báo cáo</div>
              <div className="flex-1 p-2">21/02/2024 07:03:04</div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 capitalize">Họ tên đâu khách</div>
              <div className="flex-1 px-2 flex h-full">
                <Link className="flex items-center gap-2" href={'/user/id'}>
                  <div className="flex justify-center items-center w-[18px] h-[18px] overflow-hidden rounded-full">
                    <Image
                      className="w-full h-full object-contain"
                      src={'/images/user-default.jpg'}
                      alt="avatar"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span>Nguyễn Văn A</span>
                </Link>
              </div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Liên hệ đầu khách</div>
              <div className="flex-1 p-2 flex justify-between">
                <a href="tel:000000000" target="_blank">
                  0828238212
                </a>
                <div className="flex gap-1">
                  <a href="zalo:000000000" target="_blank">
                    <Image src={'/images/zalo.png'} alt="zalo" width={15} height={15}></Image>
                  </a>
                  <a href="messenger" target="_blank">
                    <Image
                      src={'/images/messenger.png'}
                      alt="messenger"
                      width={18}
                      height={18}
                    ></Image>
                  </a>
                  <a href="/npk" target="_blank">
                    <Image
                      src={'/images/messenger-knp.png'}
                      alt="zalo"
                      width={17}
                      height={15}
                    ></Image>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">
                Thời gian khách xem nhà
              </div>
              <div className="flex-1 p-2 flex justify-between">
                {convertReportingTime(new Date('2024-01-01').toISOString())}
              </div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Họ tên Khách hàng</div>
              <div className="flex-1 p-2 flex justify-between">Nguyễn Bình Minh</div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">CMND/CCCD</div>
              <div className="flex-1 p-2 flex justify-between">{replaceId('099731193999')}</div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-stretch">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Địa chỉ khách ở</div>
              <div className="flex-1 p-2 flex justify-between">
                102 P. Thái Thịnh, Ngã Tư Sở, Đống Đa, Hà Nội 100000
              </div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-stretch">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Địa chỉ khách xem</div>
              <div className="flex-1 p-2 flex flex-col">
                <div>
                  11A Cao Bá Quát 46 5 5.2 29 tỷ Ba Đình Hà Nội HĐ TP Thái Tài NPHN-3369,
                  0384628527, X3, nguồn ĐT10, 25 đến 35, #ĐC2
                  <br />
                  Mô tả:
                </div>
                <div className="flex gap-2">
                  <span className="text-link_text_l">#ctnp</span>
                  <span className="text-link_text_l">#npvn</span>
                  <span className="text-link_text_l">#np6868</span>
                  <span className="text-link_text_l">#zxcvbnm</span>
                </div>
              </div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Mục đích mua</div>
              <div className="flex-1 p-2 flex justify-between">Mua để ở</div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Phản hồi khách hàng</div>
              <div className="flex-1 p-2 flex justify-between">
                Khách thích nhà - vị trí nhà hoặc hẹn chủ nhà sẽ tới xem lại
              </div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Đánh giá chủ nhà</div>
              <div className="flex-1 p-2 flex justify-between">Vui vẻ hợp tác</div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-center">
              <div className="w-[150px] bg-black/5 p-2 flex items-stretch">Ý kiến đầu khách</div>
              <div className="flex-1 p-2 flex justify-between">Hơi tốn thời gian sắp xếp</div>
            </div>
            <div className="flex border-b border-black/20 border-0 border-solid items-stretch">
              <div className="w-[150px] bg-black/5 p-2 flex items-center">Ảnh dẫn khách</div>
              <div className="flex-1 p-2 flex justify-between">
                <div className="flex gap-1">
                  <Image
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] object-contain"
                    src={'/images/post-1.jpeg'}
                    alt="example"
                  />
                  <Image
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] object-contain"
                    src={'/images/post-1.jpeg'}
                    alt="example"
                  />
                  <Image
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] object-contain"
                    src={'/images/post-1.jpeg'}
                    alt="example"
                  />
                  <Image
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] object-contain"
                    src={'/images/post-1.jpeg'}
                    alt="example"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportDetailsPopup;
