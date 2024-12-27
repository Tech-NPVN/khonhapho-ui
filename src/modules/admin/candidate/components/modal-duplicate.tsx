'use client';
import { ModalWithHash } from '@/common/modal';
import { MediaGallery, MediaViewProps } from '@/components/common/gallery';
import { Routes } from '@/constants/enums';
import { Divider, Skeleton } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMeasure } from 'react-use';

export type ModalDuplicateType = {
  candidate_id?: number | string;
  open?: boolean;
  onClose?: () => void;
};
/** (Modal/Admin) Thông tin ứng viên vòng 0 bị trùng */
const ModalDuplicate: React.FC<ModalDuplicateType> = ({ candidate_id, onClose, open }) => {
  return (
    <>
      <ModalWithHash
        open={open}
        onClose={onClose}
        antdModalProps={{
          title: 'Ứng viên trùng',
        }}
        hash="duplicate-candidate"
        fullScreenInMobile
      >
        <ModalContent />
      </ModalWithHash>
    </>
  );
};

const ModalContent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [imageRef, { width }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  return (
    <>
      <Divider className="my-0" />
      <div className="py-3 px-0 sm:p-3">
        {!loading &&
          Array.from({ length: 2 }).map((candidate, index) => (
            <div className="w-full flex flex-col text-base" key={index}>
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Thời gian tạo
                </div>
                <div className="p-3">{dayjs().format('DD/MM/YYYY - HH:mm')}</div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Họ & Tên
                </div>
                <div className="p-3">Nguyễn Văn A</div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Ngày sinh
                </div>
                <div className="p-3">11/11/1999</div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Số điện thoại
                </div>
                <div className="p-3">
                  <span className={clsx('p-1 rounded', index > 0 ? 'text-white bg-error_l' : '')}>
                    0987654321
                  </span>
                </div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  CCCD
                </div>
                <div className="p-3">
                  <span className={clsx('p-1 rounded', index > 0 ? 'text-white bg-error_l' : '')}>
                    0102017233570
                  </span>
                </div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Người phỏng vấn
                </div>
                <div className="p-3">
                  <Link
                    className="flex gap-3 items-center justify-center"
                    href={Routes.User + '/' + 'id-nguoi-phong-van'}
                  >
                    <Image
                      className="w-8 h-8 overflow-hidden rounded-full"
                      src={'/images/user-default.jpg'}
                      alt="..."
                      width={60}
                      height={60}
                    />
                    <span>Nguyễn Kim Ngân</span>
                  </Link>
                </div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Thời gian phỏng vấn
                </div>
                <div className="p-3">{dayjs().format('DD/MM/YYYY - HH:mm')}</div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Phòng
                </div>
                <div className="p-3">1234</div>
              </div>
              <Divider className="my-0" />
              <div className="flex items-stretch w-full">
                <div className="min-w-[140px] max-w-[140px]  sm:min-w-[240px] flex items-center p-3 bg-gray-50">
                  Ảnh phỏng vấn
                </div>
                <div className={clsx('p-3 w-full', width == 0 ? 'opacity-0' : '')} ref={imageRef}>
                  <MediaGallery
                    mode="grid"
                    media={
                      Array.from({ length: 5 }).map((_, index) => ({
                        src: `/images/post-${index + 1}.jpeg`,
                        type: 'image',
                      })) as MediaViewProps[]
                    }
                    configs={{
                      grid: {
                        imagePerRow: width < 400 ? 2 : 4,
                        maxMediaDisplay: 4,
                      },
                    }}
                  />
                </div>
              </div>
              {index === 0 && (
                <h2 className="flex gap-1 my-3 sm:my-6 sm:px-0 px-3">
                  Trùng với
                  <span className="w-6 h-6 flex items-center justify-center p-1 text-base rounded-full bg-error_l text-white">
                    {1}
                  </span>
                  ứng viên trước đó
                </h2>
              )}
            </div>
          ))}
        {loading && <Skeleton active paragraph={{ rows: 5 }} title={false} />}
      </div>
    </>
  );
};

export default ModalDuplicate;
