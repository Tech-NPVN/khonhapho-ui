'use client';

import {
  CalendarIcon,
  CameraIcon,
  ChangeIcon,
  ClockIcon,
  MailIcon,
  PenEditGreenIcon,
  PhoneOutlineRightIcon,
  SearchIcon,
  TeamIcon,
  UserPasswordGreenIcon,
} from '@/components/icons';
import { MessengerNhaPhoIcon } from '@/components/icons/messenger-nhapho.icon';
import { IMAGE_SAMPLE, SELECT_FILTER_PROFILE } from '@/constants/data';
import { Button, Col, Divider, Empty, Input, Progress, Rate, Row, Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ModalChangePassword, ModalUpdateProfile } from './modal';

export const UserProfileIndex = ({ id }: { id?: string }) => {
  const [openUpdateProfile, setOpenUpdateProfile] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  const renderBlock = useCallback((title: string, children: React.ReactNode) => {
    return (
      <div className="rounded-lg bg-primary_color_l dark:bg-primary_color_d mb-5">
        <h3 className="m-0 py-4 px-6 font-semibold">{title}</h3>
        <Divider className="bg-background_l dark:bg-divider_d/40 my-0" />
        <div className="py-4 px-6">{children}</div>
      </div>
    );
  }, []);

  return (
    <>
      <section className="flex flex-col items-center gap-5 mt-4">
        <div className="md:w-[950px]">
          <div className="rounded-xl bg-primary_color_l dark:bg-primary_color_d overflow-hidden mb-5">
            <Image
              src="/images/npvn-cover.jpg"
              alt="Wallpaper Image"
              objectFit="cover"
              priority
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />

            <div className="p-5 flex gap-5 relative h-[160px]">
              <div className="flex-shrink-0 absolute -top-6">
                <Image
                  className="w-full object-contain rounded-full ring-4 ring-primary_color_l"
                  width={160}
                  height={160}
                  src="/images/post-1.jpeg"
                  alt="user-avatar"
                />
                <button className="absolute w-[30px] h-[30px] bg-background_l_2 ring-1 ring-[#D9D9D9]/50 flex items-center justify-center rounded-full bottom-2 right-2 border-0 cursor-pointer">
                  <CameraIcon />
                </button>
              </div>

              <div className="flex justify-between pl-[calc(160px_+_20px)] w-full">
                <div className="flex-1">
                  <h1 className="mb-3 font-semibold">Nguyễn Kim Ngân</h1>
                  <p className="mb-2 font-normal">Trưởng phòng • NPHN-0000 (Khối 0000)</p>
                  <p className=" font-normal">Hội Sở Miền Bắc Chi nhánh Đống Đa</p>

                  <div className="flex items-center gap-2">
                    <Link href={''}>
                      <Image
                        src="/images/messenger.png"
                        alt="messenger-url"
                        width={18}
                        height={18}
                      />
                    </Link>
                    <Link href={''}>
                      <Image src="/images/zalo.png" alt="zalo-url" width={18} height={18} />
                    </Link>
                    <Link href={''}>
                      <Image src="/images/phone.png" alt="phone-url" width={18} height={18} />
                    </Link>
                    •
                    <Link href={''} className="text-link flex items-center gap-2">
                      <Image src="/images/facebook.png" alt="facebook-url" width={18} height={18} />
                      Nguyễn Kim Ngân
                    </Link>
                  </div>
                </div>
                <div className="content-end">
                  {id ? (
                    <Button
                      type="default"
                      className="bg-transparent text-color_l border-color_l rounded-full"
                      icon={<MessengerNhaPhoIcon />}
                    >
                      Nhắn tin
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="default"
                        className="bg-transparent text-color_l border-color_l rounded-full"
                        icon={<PenEditGreenIcon />}
                        onClick={() => setOpenUpdateProfile(true)}
                      >
                        Chỉnh sửa hồ sơ
                      </Button>

                      <Button
                        type="default"
                        className="bg-transparent text-color_l border-color_l rounded-full ml-3"
                        icon={<UserPasswordGreenIcon />}
                        onClick={() => setOpenChangePassword(true)}
                      >
                        Đổi mật khẩu
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Row gutter={24}>
            {/* Left column */}
            <Col span={11}>
              {renderBlock(
                'Giới thiệu',
                <div className="flex justify-between gap-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 h-5">
                      <TeamIcon /> Team 1
                    </div>
                    <div className="flex items-center gap-3 h-5">
                      <PhoneOutlineRightIcon width={18} /> 0986822281
                    </div>
                    <div className="flex items-center gap-3 h-5">
                      <MailIcon width={18} /> nhaphovietnam@gmail.com
                    </div>
                    <div className="flex items-center gap-3 h-5">
                      <ClockIcon width={18} /> Tham gia ngày 01/01/2020
                    </div>
                    <div className="flex items-center gap-3 h-5">
                      <CalendarIcon width={18} /> Sinh năm 1990
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-center">
                    <div className="p-1 shadow-block rounded-md">
                      <Image
                        src="/images/qr-code-sample.png"
                        alt="qr-code"
                        width={76}
                        height={76}
                      />
                    </div>
                    <span className="text-primary_text_l/50 dark:text-primary_text_d/50">
                      QR của tôi
                    </span>
                  </div>
                </div>,
              )}

              {renderBlock(
                'Đánh giá',
                <>
                  <Rate
                    defaultValue={4.5}
                    className="text-4xl text-center block text-star_l dark:text-star_d"
                    disabled
                    allowHalf
                  />
                  <Divider className="bg-background_l dark:bg-divider_d/40 my-4" />
                  <Row gutter={20}>
                    <Col span={14}>
                      <div className="flex items-center gap-2">
                        5 <Progress percent={65} strokeColor="#FBBD23" showInfo={false} />
                      </div>
                      <div className="flex items-center gap-2">
                        4 <Progress percent={85} strokeColor="#FBBD23" showInfo={false} />
                      </div>
                      <div className="flex items-center gap-2">
                        3 <Progress percent={50} strokeColor="#FBBD23" showInfo={false} />
                      </div>
                      <div className="flex items-center gap-2">
                        2 <Progress percent={30} strokeColor="#FBBD23" showInfo={false} />
                      </div>
                      <div className="flex items-center gap-2">
                        1 <Progress percent={55} strokeColor="#FBBD23" showInfo={false} />
                      </div>
                    </Col>
                    <Col span={10}>
                      <div className="flex flex-col justify-start items-center gap-4">
                        <Rate
                          defaultValue={4.5}
                          className="text-sm text-center block text-star_l dark:text-star_d"
                          disabled
                          allowHalf
                        />
                        <div className="flex justify-center items-baseline space-x-1 w-full">
                          <span className="text-4xl font-semibold">4,5</span>
                          <span className="text-lg">/5</span>
                        </div>
                        <span className="text-primary_text_l/50 dark:text-primary_text_d/50">
                          41 Đánh giá
                        </span>
                      </div>
                    </Col>
                  </Row>
                </>,
              )}

              {renderBlock(
                'Thành tích',
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Image src={IMAGE_SAMPLE} width={32} height={32} alt="" /> Tester đỉnh nhất Việt
                    Nam
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={IMAGE_SAMPLE} width={32} height={32} alt="" /> Tester đỉnh nhất Việt
                    Nam
                  </div>
                </div>,
              )}
            </Col>

            {/* Right column */}
            <Col span={13}>
              <div className="flex justify-center gap-4">
                <Select
                  size="large"
                  className="w-full"
                  suffixIcon={<ChangeIcon />}
                  options={SELECT_FILTER_PROFILE}
                  defaultValue="khach-can-mua-gap"
                />

                <Input
                  size="large"
                  placeholder="Tìm kiếm"
                  suffix={<SearchIcon className="w-4 h-4" />}
                  className="w-full !bg-primary_color_l dark:!bg-primary_color_d"
                />
              </div>

              <div className="my-5 flex flex-col items-center justify-center">
                <Empty description="Không có kết quả!" />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <ModalUpdateProfile
        open={openUpdateProfile}
        handleCancel={() => setOpenUpdateProfile(false)}
      />
      <ModalChangePassword
        open={openChangePassword}
        handleCancel={() => setOpenChangePassword(false)}
      />
    </>
  );
};
