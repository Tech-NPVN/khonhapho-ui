'use client';

import { ModalBooking } from '@/common/modal';
import {
  AlarmIcon,
  BookmarkIcon,
  CommentIcon,
  CopyDocumentIcon,
  CopyIcon,
  HeartRedIcon,
  HistoryIcon,
  NoteIcon,
  PeopleGroup,
  PhoneIcon,
  XIcon,
} from '@/components/icons';
import { Modal, Rate, Tag } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import CommentInput from '../../data-entry/comment-input';
import Comment from '../comment';
import { Slide, VideoTag } from '../images';
import LikeComponent from '../like';
import { IPostDetail } from '../post';
import ShareComponent from '../share';
import FormReportPopup from './form-report';
import NotePopup from './note';
import SuitableCustomerPopup from './suitable-customer';

interface IProps {
  post?: IPostDetail;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
const isTextClamped = (elm: HTMLDivElement) => elm?.scrollHeight > elm?.clientHeight;

const WarehouseDetailsPopup = ({ open, setOpen, post }: IProps) => {
  const [sliderIndex, setSliderIndex] = useState<number>(-1);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isShowModalSuitableCustomerPopup, setIsShowModalSuitableCustomerPopup] =
    useState<boolean>(false);
  const [isShowNotePopup, setIsShowNotePopup] = useState<boolean>(false);
  const [isShowReport, setIsShowReport] = useState<boolean>(false);
  const [isShowBooking, setIsShowBooking] = useState<boolean>(false);
  const [_clipboard, onCopyClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // Copied
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (isShowMore) return;
      setIsHidden(isTextClamped(contentRef.current as HTMLDivElement));
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isShowMore, post?.content]);

  return (
    <div>
      <Modal
        centered
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        open={open}
        className="dark:bg-primary_color_d dark:text-primary_text_d !p-0 [&_.ant-modal-close]:!hidden"
        classNames={{
          content: 'dark:bg-primary_color_d dark:text-primary_text_d !p-0',
          header: '!hidden',
          mask: '!hidden',
          wrapper: 'bg-black/50',
        }}
        onClose={(e) => {
          setOpen && setOpen(false);
        }}
        onCancel={(e) => {
          setOpen && setOpen(false);
        }}
        width={'auto'}
      >
        <div className="w-[calc(100vw_-_100px)] xl:w-[1200px] 2xl:w-[1380px] flex flex-col overflow-hidden">
          <div className="w-full flex h-[780px]">
            <div className="w-1/2 h-full overflow-hidden rounded-s-lg bg-black relative">
              <Swiper
                ref={swiperRef}
                spaceBetween={3}
                navigation={true}
                modules={[FreeMode, Navigation]}
                className={clsx(
                  '[&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:ms-1 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:me-1 [&_.swiper-button-next:after]:text-[32px] [&_.swiper-button-prev:after]:text-[32px]',
                  'transition-all ease-in-out duration-200 h-full',
                  'warehouse-slider-p',
                )}
                centeredSlides
                onSlideChange={() => {
                  document.querySelectorAll('.warehouse-slider-p video').forEach((element) => {
                    if (element instanceof HTMLVideoElement && !element.paused) element.pause();
                  });
                }}
              >
                {post?.videos?.map((video, index) => (
                  <SwiperSlide
                    key={video}
                    className="h-full w-full flex justify-center"
                    onClick={() => {}}
                  >
                    <VideoTag
                      video={video}
                      onClick={() => {
                        setSliderIndex(index);
                        document
                          .querySelectorAll('.warehouse-slider-p video')
                          .forEach((element) => {
                            if (element instanceof HTMLVideoElement && !element.paused)
                              element.pause();
                          });
                      }}
                    />
                  </SwiperSlide>
                ))}
                {post?.images?.map((image, index) => (
                  <SwiperSlide
                    key={image}
                    className="h-full w-full flex justify-center"
                    onClick={() => {
                      setSliderIndex(index + (post.videos?.length ?? 0));
                    }}
                  >
                    <div className="swiper-zoom-container w-full h-full select-none">
                      <Image
                        className="w-auto max-w-full max-h-full h-full object-cover"
                        width={0}
                        height={0}
                        src={image}
                        alt={image}
                        quality={100}
                        unoptimized
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className="absolute top-2 left-2 z-10 w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-white/10 rounded-full"
                onClick={() => {
                  setOpen && setOpen(false);
                }}
              >
                <XIcon width={20} height={20} className="!fill-white" />
              </div>
            </div>
            <div className="w-1/2 h-full relative flex flex-col max-h-full overflow-hidden rounded-lg">
              <div className="max-h-full overflow-y-auto flex-1">
                <div className="px-3 py-4">
                  <div className={clsx('bg-white dark:bg-primary_color_d rounded-lg w-full')}>
                    <div className="flex relative w-full">
                      <div>
                        <Image
                          className="w-10 h-10 rounded-full mr-3"
                          width={40}
                          height={40}
                          src="/images/user-default.jpg"
                          alt="User"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between w-full">
                          <Link
                            className="font-semibold text-primary_text_l dark:text-primary_text_d flex gap-2"
                            href={'/'}
                          >
                            <span>CV Nguyễn Trung</span>
                            <span>•</span>
                            <span>NPHN-1234</span>
                          </Link>
                          <div className="text-sm">
                            <span className="inline-block me-1">Mã số:</span>
                            <span className="text-link_text_l hover:underline">#18182</span>
                          </div>
                        </div>
                        <div className="[&_span]:text-sm text-secondary_text_l dark:text-primary_text_d flex justify-between">
                          <div className={clsx('flex gap-[10px]')}>
                            <div className="flex">
                              <div className="">
                                <Rate
                                  allowHalf
                                  disabled
                                  defaultValue={4.5}
                                  className="[&_svg]:w-3 [&_svg]:h-3 [&_.ant-rate-star-first_svg]:fill-[#fbbc04] [&_.ant-rate-star-full_svg]:fill-[#fbbc04] [&>li]:me-1"
                                />
                              </div>
                              <span className="text-primary_text_l dark:text-primary_text_d">
                                4,5
                              </span>
                            </div>
                            <span className="text-primary_text_l dark:text-primary_text_d hidden">
                              •
                            </span>
                            <a
                              className="inline-block w-6 h-5 "
                              href="https://www.facebook.com/messages/t/1"
                              target="_blank"
                            >
                              <Image
                                className="w-full h-full object-contain"
                                width={48}
                                height={43}
                                src={'/images/messenger-knp.png'}
                                alt="/images/messenger-knp.png"
                              />
                            </a>
                            <a
                              className="inline-block w-6 h-6"
                              href="https://www.facebook.com/messages/t/1"
                              target="_blank"
                            >
                              <Image
                                className="w-full h-full object-contain"
                                width={40}
                                height={40}
                                src={'/images/messenger.png'}
                                alt="/images/messenger.png"
                              />
                            </a>
                            <a
                              className="inline-block w-[18px] h-[18px]"
                              href="https://www.facebook.com/messages/t/1"
                              target="_blank"
                            >
                              <Image
                                className="w-full h-full object-contain "
                                width={40}
                                height={40}
                                src={'/images/zalo.png'}
                                alt="/images/zalo.png"
                              />
                            </a>
                            <a
                              className="inline-block w-6 h-6"
                              href="https://www.facebook.com/messages/t/1"
                              target="_blank"
                            >
                              <PhoneIcon width={24} height={24} />
                            </a>
                          </div>
                          <div className=" bg-background_l dark:bg-background_d flex items-center rounded">
                            <span className="!text-[12px] font-semibold px-2 text-primary_text_l dark:text-primary_text_d">
                              Bán mạnh
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className={clsx('flex justify-between items-center mb-4')}>
                        <div className="flex gap-2 text-sm">
                          <span className="font-semibold text-color_l ">27.727 tỷ</span>
                          <span>·</span>
                          <span>255.152tr/m</span>
                        </div>
                        <Tag className="!text-[12px] lg:!text-sm font-normal bg-background_l dark:bg-background_d border-none">
                          Mặt phố, kinh doanh, có tầng thượng
                        </Tag>
                      </div>
                      <div className="overflow-hidden">
                        <div className={clsx('flex')}>
                          16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà
                          NPHN-886, 056272444, X3, nguồn ĐT10, 25 đến 35
                        </div>
                        <div className={'flex gap-1'}>
                          <div>Mô tả:</div>
                          <div className={'flex-wrap gap-2 flex'}>
                            <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                              #NPVN
                            </span>
                            <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                              #NP781
                            </span>
                            <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                              #NP92193
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full items-end flex-wrap">
                          <div
                            ref={contentRef}
                            className={clsx(
                              'text-base dark:text-primary_text_d mt-4',
                              isShowMore ? 'w-full' : 'overflow-hidden line-clamp-[3]',
                            )}
                          >
                            <div dangerouslySetInnerHTML={{ __html: post?.content || '' }}></div>
                          </div>
                          <button
                            onClick={() => {
                              setIsShowMore((prev) => !prev);
                            }}
                            className={clsx(
                              isHidden ? 'block' : 'hidden',
                              'py-[2px] px-0 text-base rounded-lg font-medium text-link_text_l hover:underline bg-transparent border-0 cursor-pointer',
                            )}
                          >
                            {isShowMore ? 'Thu gọn' : 'Xem thêm'}
                          </button>
                        </div>
                        <div className={'mt-2'}>
                          <button
                            onClick={() => {
                              onCopyClipboard(post?.content || '');
                              setIsCopied(true);
                              setTimeout(() => {
                                setIsCopied(false);
                              }, 3000);
                            }}
                            disabled={isCopied}
                            className={clsx(
                              'py-0 px-1 text-base border-black/20 dark:border-primary_text_d_2 rounded bg-transparent cursor-pointer flex justify-between items-center gap-2 border',
                            )}
                          >
                            <CopyIcon width={10} />
                            <span className="text-[12px]">
                              {isCopied ? 'Đã sao chép' : 'Sao chép'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={'mt-2 flex justify-between'}>
                      <div className="flex gap-2 items-center">
                        <Tag color="red">Có sổ đỏ - Thiếu Seri Sổ</Tag>
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md dark:hover:bg-background_d relative cursor-pointer p-2"
                          onClick={() => {
                            setIsShowModalSuitableCustomerPopup(true);
                          }}
                        >
                          <div className="relative w-6 h-5">
                            <PeopleGroup width={18} height={20} />
                            <span className="flex items-center justify-center absolute text-[8px] bg-red-500 text-white rounded-full w-3 h-3 -top-1 right-0 select-none">
                              10
                            </span>
                          </div>
                          <span>Khách phù hợp</span>
                        </div>
                        <div
                          className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md dark:hover:bg-background_d relative cursor-pointer p-2"
                          onClick={() => {
                            setIsShowModalSuitableCustomerPopup(true);
                          }}
                        >
                          <HistoryIcon width={16} height={16} />
                          <span>Lịch sử chỉnh sửa</span>
                        </div>
                      </div>
                    </div>

                    <div className={clsx((post?.images || []).length > 0 ? 'mt-1' : 'mt-2')}>
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <div className="flex gap-1 items-center dark:text-primary_text_d">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              className="fill-link_text_l"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.1871 8C6.1871 8.46413 6.37148 8.90925 6.69967 9.23744C7.02785 9.56563 7.47297 9.75 7.9371 9.75C8.40123 9.75 8.84635 9.56563 9.17454 9.23744C9.50273 8.90925 9.6871 8.46413 9.6871 8C9.6871 7.53587 9.50273 7.09075 9.17454 6.76256C8.84635 6.43437 8.40123 6.25 7.9371 6.25C7.47297 6.25 7.02785 6.43437 6.69967 6.76256C6.37148 7.09075 6.1871 7.53587 6.1871 8ZM14.7215 7.59688C13.2402 4.47656 11.0012 2.90625 7.9996 2.90625C4.99648 2.90625 2.75898 4.47656 1.27773 7.59844C1.21831 7.72425 1.1875 7.86165 1.1875 8.00078C1.1875 8.13991 1.21831 8.27732 1.27773 8.40312C2.75898 11.5234 4.99804 13.0938 7.9996 13.0938C11.0027 13.0938 13.2402 11.5234 14.7215 8.40156C14.8418 8.14844 14.8418 7.85469 14.7215 7.59688ZM7.9371 10.75C6.41835 10.75 5.1871 9.51875 5.1871 8C5.1871 6.48125 6.41835 5.25 7.9371 5.25C9.45585 5.25 10.6871 6.48125 10.6871 8C10.6871 9.51875 9.45585 10.75 7.9371 10.75Z" />
                            </svg>
                            <span className="text-sm">3131</span>
                          </div>
                          <div className="flex gap-1 items-center dark:text-primary_text_d">
                            <HeartRedIcon />
                            <span className="text-sm">133</span>
                          </div>
                        </div>

                        <div className={clsx('flex [&_span]:hidden sm:[&_span]:inline-block')}>
                          <div
                            className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none"
                            onClick={() => {
                              setIsShowBooking(true);
                            }}
                          >
                            <AlarmIcon width={17} height={20} />
                            <span className="ms-1">Đặt lịch</span>
                          </div>
                          <div className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none">
                            <BookmarkIcon className="fill-[#FF4D4F] scale-90" />
                            <span className="ms-1">Lưu</span>
                          </div>
                          <div
                            className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none"
                            onClick={() => setIsShowNotePopup(true)}
                          >
                            <NoteIcon className="fill-[#FFB547]" />
                            <span className="ms-1">Ghi chú</span>
                          </div>
                          <div
                            className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none"
                            onClick={() => {
                              setIsShowReport(true);
                            }}
                          >
                            <CopyDocumentIcon />
                            <span className="ms-1">Báo cáo</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
                      <div className="w-full flex justify-between items-center">
                        <button className="border-transparent bg-transparent flex-1 px-0">
                          <LikeComponent liked></LikeComponent>
                        </button>
                        <button className="cursor-pointer flex border-transparent bg-transparent items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d px-0">
                          <span className="inline-block w-5 h-5">
                            <CommentIcon></CommentIcon>
                          </span>
                          <span>Bình luận</span>
                        </button>
                        <button className="border-transparent bg-transparent flex-1 px-0">
                          <ShareComponent content="/"></ShareComponent>
                        </button>
                      </div>
                      <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full flex flex-col gap-3">
                        <Comment comment={{}} />
                        <Comment comment={{}} />
                        <Comment comment={{}} />
                        <Comment comment={{}} />
                        <Comment comment={{}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-h-[72px] w-full bg-white dark:bg-primary_color_d p-3">
                <CommentInput />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <SuitableCustomerPopup
        open={isShowModalSuitableCustomerPopup}
        onCancel={() => {
          setIsShowModalSuitableCustomerPopup(false);
        }}
        onOk={() => {
          setIsShowModalSuitableCustomerPopup(false);
        }}
        setOpen={() => {
          setIsShowModalSuitableCustomerPopup(false);
        }}
      />
      <NotePopup
        open={isShowNotePopup}
        onCancel={() => setIsShowNotePopup(false)}
        onOk={() => {
          setIsShowNotePopup(false);
        }}
        setOpen={() => {
          setIsShowNotePopup(false);
        }}
      />
      <FormReportPopup open={isShowReport} setOpen={setIsShowReport} />
      <ModalBooking
        open={isShowBooking}
        handleCancel={() => {
          setIsShowBooking(false);
        }}
      />
      {sliderIndex >= 0 && (
        <Slide
          videos={post?.videos}
          images={post?.images}
          open={sliderIndex >= 0}
          onClose={() => {
            setSliderIndex(-1);
          }}
          index={sliderIndex}
        />
      )}
    </div>
  );
};
export default WarehouseDetailsPopup;
