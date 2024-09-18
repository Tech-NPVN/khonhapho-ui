'use client';

import { ModalBooking, ModalEditHistory, ModalNewReport, ModalNoteForm } from '@/common/modal';
import { ModalSuitableCustomer } from '@/common/modal/modal-suitable-customer';
import { BookmarkButton } from '@/components/bookmark';
import { TextSeeMore } from '@/components/common';
import CopyButton from '@/components/common/copy-button';
import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import {
  AlarmIcon,
  ArrowBackIcon,
  BlueEyeIcon,
  ClockIcon,
  CommentIcon,
  CopyDocumentIcon,
  HeartRedIcon,
  HistoryIcon,
  NoteIcon,
  PeopleGroup,
  UserConfirmStatusIcon,
  XIcon,
} from '@/components/icons';
import { TriangleWarningIcon } from '@/components/icons/warning.icon';
import {
  Comment,
  CommentInput,
  CommentTypes,
  ImageSlider,
  IPostDetail,
  VideoTag,
} from '@/components/reuse/data-display';
import LikeComponent from '@/components/reuse/data-display/like';
import { Marquee } from '@/components/reuse/data-display/post/marquee';
import ShareComponent from '@/components/reuse/data-display/share';
import { Routes } from '@/constants/enums';
import { Editor } from '@tiptap/core';
import { Divider, Empty, Modal, Rate, Tag } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface IProps {
  post?: IPostDetail;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
const HASH = '#modal-warehouse';
const ModalWarehouseDetails = ({ open, setOpen, post }: IProps) => {
  const [sliderIndex, setSliderIndex] = useState<number>(-1);
  const swiperRef = useRef<SwiperRef | null>(null);
  const handleClose = () => {
    setOpen?.(false);
    window.history.back();
  };
  useEffect(() => {
    if (open) {
      if (window.location.hash !== HASH) {
        window.history.pushState(null, '', HASH);
      }
    }
  }, [open]);
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== HASH) setOpen?.(false);
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [setOpen]);
  return (
    <>
      <Modal
        centered
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        open={open}
        className="dark:bg-primary_color_d dark:text-primary_text_d !p-0 [&_.ant-modal-close]:!hidden my-0 mx-0 sm:my-5 w-full sm:!w-[calc(100vw_-_100px)] xl:!w-[1200px] 2xl:!w-[1380px] max-w-none"
        classNames={{
          content: 'dark:bg-primary_color_d dark:text-primary_text_d !p-0 max-sm:rounded-none',
          header: '!hidden',
          mask: '!hidden',
          wrapper: 'bg-black/50 m-0 p-0 h-full w-full',
        }}
        onClose={() => {
          handleClose();
        }}
        onCancel={() => {
          handleClose();
        }}
        width="100%"
        footer={null}
      >
        <div className="w-full flex flex-col overflow-hidden">
          <div className="fixed top-0 left-0 w-full bg-white dark:bg-primary_color_d z-50 sm:hidden shadow">
            <div className="h-[42px] flex items-center justify-between px-4">
              <button
                onClick={() => {
                  handleClose();
                }}
                className="h-10 w-10 text-black dark:text-white bg-transparent border-none flex items-center cursor-pointer"
              >
                <ArrowBackIcon />
              </button>
              <div className="flex-1">CV Nguyễn Trung • NPHN-1234</div>
              <div className="h-10 w-10"></div>
            </div>
          </div>
          <div className="w-full flex md:min-h-[500px] lg:h-[90vh] 2xl:h-[80vh] max-lg:flex-wrap max-sm:pt-[42px]">
            <div className="w-full lg:w-1/2 h-[400px] lg:h-full overflow-hidden max-sm:rounded-none max-lg:rounded-t-lg lg:rounded-s-lg bg-black relative">
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
                <SwiperSlide
                  key={'abc-1'}
                  className="h-full w-full flex justify-center"
                  onClick={() => {
                    setSliderIndex(0);
                  }}
                >
                  <div className="swiper-zoom-container w-full h-full select-none">
                    <Image
                      className="w-auto max-w-full max-h-full h-full object-cover"
                      width={0}
                      height={0}
                      src={'/images/post-1.jpeg'}
                      alt={'demo'}
                      quality={100}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  key={'abc-2'}
                  className="h-full w-full flex justify-center"
                  onClick={() => {
                    setSliderIndex(0);
                  }}
                >
                  <div className="swiper-zoom-container w-full h-full select-none">
                    <Image
                      className="w-auto max-w-full max-h-full h-full object-cover"
                      width={0}
                      height={0}
                      src={'/images/post-2.jpeg'}
                      alt={'demo'}
                      quality={100}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
              <div
                className="max-sm:hidden absolute top-2 left-2 z-10 w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-white/10 rounded-full"
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon width={20} height={20} className="!fill-white" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 h-full relative flex flex-col max-h-full overflow-hidden max-sm:rounded-none rounded-lg">
              <Right post={post} />
            </div>
          </div>
        </div>
      </Modal>
      {sliderIndex >= 0 && (
        <ImageSlider
          videos={post?.videos}
          images={post?.images}
          open={sliderIndex >= 0}
          onClose={() => {
            setSliderIndex(-1);
          }}
          index={sliderIndex}
        />
      )}
    </>
  );
};

const Right = ({ post }: { post?: IPostDetail }) => {
  const [width, setWidth] = useState<number>(0);
  const [spaceHeight, setSpaceHeight] = useState<number>(112);
  const [isShowModalSuitableCustomerPopup, setIsShowModalSuitableCustomerPopup] =
    useState<boolean>(false);
  const [isShowNotePopup, setIsShowNotePopup] = useState<boolean>(false);
  const [isShowReport, setIsShowReport] = useState<boolean>(false);
  const [isShowBooking, setIsShowBooking] = useState<boolean>(false);
  const [isShowEditHistory, setIsShowEditHistory] = useState<boolean>(false);
  const TiptapEditorRef = useRef<Editor | null>(null);
  const [comments, setComments] = useState<CommentTypes[]>(post?.comments || []);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const commentInputDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      setIsShowModalSuitableCustomerPopup(false);
      setIsShowNotePopup(false);
      setIsShowReport(false);
      setIsShowBooking(false);
      setIsShowEditHistory(false);
    };
  }, []);
  const isMobile = width < 480;
  return (
    <>
      <div ref={contentRef} className="max-h-full overflow-y-auto flex-1 dark:bg-primary_color_d ">
        <div className={clsx('px-3 py-4', isMobile ? 'pt-0' : '')}>
          <div className={clsx('bg-white dark:bg-primary_color_d rounded-lg w-full')}>
            <div
              className={clsx(
                'w-full flex justify-between h-8 items-center',
                isMobile ? '' : 'hidden',
              )}
            >
              <div className="flex gap-2 items-center">
                <ClockIcon />
                <span className="text-sm">17/11/2023 12:00:34</span>
              </div>
              <div>
                <div
                  className={clsx(
                    'min-w-10 flex gap-1 items-center justify-center rounded-md relative cursor-pointer',
                  )}
                  onClick={() => {
                    setIsShowEditHistory(true);
                  }}
                >
                  <HistoryIcon width={12} height={12} />
                  <span className="text-sm">Lịch sử chỉnh sửa</span>
                </div>
              </div>
            </div>
            <Divider className={clsx('my-0 mb-3', isMobile ? '' : 'hidden')} />
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
                    className="font-semibold text-primary_text_l dark:text-primary_text_d hover:underline text-nowrap max-[380px]:max-w-[180px] truncate text-sm sm:text-base"
                    href={Routes.User + '/' + 'id'}
                  >
                    <span>CV Nguyễn Trung</span>
                    <span className="mx-[2px] sm:mx-1 md:sm:mx-2">•</span>
                    <span>NPHN-1234</span>
                  </Link>
                  <div className="text-sm text-nowrap">
                    <span className="inline-block me-1">Mã số:</span>
                    <span className="text-link_text_l hover:underline">#18182</span>
                  </div>
                </div>
                <div className="text-secondary_text_l dark:text-primary_text_d flex justify-between">
                  <div className={clsx('flex gap-[10px] items-center')}>
                    <div className="flex">
                      <div className="">
                        <Rate
                          allowHalf
                          disabled
                          defaultValue={4.5}
                          className="[&_svg]:w-[10px] [&_svg]:h-[10px] sm:[&_svg]:w-3 sm:[&_svg]:h-3 [&_.ant-rate-star-first_svg]:fill-[#fbbc04] [&_.ant-rate-star-full_svg]:fill-[#fbbc04] [&>li]:me-1
                          [&_.ant-rate-star-first]:flex
                          [&_.ant-rate-star-second]:flex
                          "
                        />
                      </div>
                      <span className="text-primary_text_l dark:text-primary_text_d text-[12px] sm:text-sm flex items-center">
                        4,5
                      </span>
                    </div>
                    <span className="text-primary_text_l dark:text-primary_text_d hidden">•</span>
                    <Link
                      className="flex items-center w-3 h-3 sm:w-4 sm:h-4"
                      href={'/messenger/id'}
                    >
                      <MessengerKNPImage />
                    </Link>
                    <a
                      className="flex items-center w-3 h-3 sm:w-4 sm:h-4"
                      href="https://www.facebook.com/messages/t/1"
                      target="_blank"
                    >
                      <MessengerImage />
                    </a>
                    <a
                      className="flex items-center w-3 h-3 sm:w-4 sm:h-4"
                      href="https://zalo.me/0389619050"
                      target="_blank"
                    >
                      <ZaloImage />
                    </a>
                    <a className="flex items-center w-3 h-3 sm:w-4 sm:h-4" href="tel:0389619050">
                      <PhoneImage />
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
                <div className="flex sm:gap-1 md:gap-2 text-sm text-nowrap">
                  <span className="font-semibold text-color_l ">27.727 tỷ</span>
                  <span>·</span>
                  <span>255.152tr/m</span>
                </div>
                <Tag className="max-[380px]:!text-[12px] !text-sm font-semibold bg-background_l dark:bg-background_d border-none overflow-hidden">
                  <Marquee
                    className={width >= 480 ? 'w-[280px]' : 'w-[180px]'}
                    text={'Nhà mặt phố, 3 tầng có ban công, sân thượng '}
                  />
                </Tag>
              </div>
              <div className="overflow-hidden">
                <div className={clsx('flex')}>
                  16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886,
                  056272444, X3, nguồn ĐT10, 25 đến 35
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
                  <div className={clsx('text-base dark:text-primary_text_d mt-4 w-full')}>
                    <TextSeeMore _html={post?.content} />
                  </div>
                </div>
                <div className={'mt-2 flex justify-between'}>
                  <CopyButton content={post?.content} />
                  <div className="flex gap-2 items-center">
                    <Tag color="red">Có sổ đỏ - Thiếu Seri Sổ</Tag>
                  </div>
                </div>
              </div>
            </div>
            <div className={'mt-2 flex justify-end'}>
              <div className="flex gap-1 items-center">
                <button className="px-2 py-1 border-none bg-color_l dark:bg-color_l text-white rounded-md flex gap-2 cursor-pointer items-center">
                  <UserConfirmStatusIcon
                    width={14}
                    height={18}
                    className="!fill-white dark:!fill-white"
                  />
                  Xác nhận còn bán
                </button>
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
                  <span className={clsx(isMobile ? 'hidden' : '')}>Khách phù hợp</span>
                </div>
                <div
                  className={clsx(
                    'min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md dark:hover:bg-background_d relative cursor-pointer p-2',
                    isMobile ? 'hidden' : '',
                  )}
                  onClick={() => {
                    setIsShowEditHistory(true);
                  }}
                >
                  <HistoryIcon width={16} height={16} />
                  <span>Lịch sử chỉnh sửa</span>
                </div>
              </div>
            </div>
            <div className="mt-2 p-1 gap-1 text-center border border-solid rounded-lg border-error_l dark:border-r-error_d flex items-center justify-center text-error_l dark:text-error_d text-base">
              <span>
                <TriangleWarningIcon
                  width={18}
                  height={16}
                  className="fill-error_l dark:fill-error_d"
                />{' '}
                Cảnh báo: Đã 100 ngày chưa có tương tác. Đầu chủ chưa xác thực tình trạng còn bán.
              </span>
            </div>
            <div className={clsx((post?.images || []).length > 0 ? 'mt-1' : 'mt-2')}>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center dark:text-primary_text_d">
                    <BlueEyeIcon />
                    <span className="text-sm">3131</span>
                  </div>
                  <div className="flex gap-1 items-center dark:text-primary_text_d">
                    <HeartRedIcon />
                    <span className="text-sm">133</span>
                  </div>
                </div>

                <div
                  className={clsx('flex ', isMobile ? '[&_span]:hidden' : '[&_span]:inline-block')}
                >
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
                    <BookmarkButton />
                  </div>
                  {/* Đã lưu thì mới hiện ghi chú */}
                  <div
                    className={clsx(
                      ' min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none',
                      'hidden',
                    )}
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
                <button
                  className="cursor-pointer flex border-transparent bg-transparent items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d px-0"
                  onClick={() => {
                    TiptapEditorRef.current?.commands.focus('end');
                  }}
                >
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
                {comments.map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment.id}
                    onDelete={() => {
                      setComments((prev) => prev.filter((c) => c.id !== comment.id));
                    }}
                  />
                ))}
              </div>
              {!comments ||
                (comments.length === 0 && (
                  <div className="sm:mt-16">
                    <Empty description="Chưa có bình luận nào" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full sm:hidden"
        style={{
          height: spaceHeight + 'px',
        }}
      ></div>
      <div>
        <div
          ref={commentInputDivRef}
          className="min-h-[72px] w-full bg-white dark:bg-primary_color_d p-3 max-sm:fixed bottom-0 left-0 z-10"
        >
          <CommentInput
            onReady={(editor) => {
              TiptapEditorRef.current = editor;
            }}
            onSendComment={(comment) => {
              const newComment: CommentTypes = {
                ...comment,
                id: new Date().getTime().toString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };
              setComments([newComment, ...comments]);
            }}
            onContentChange={() => {
              console.log(commentInputDivRef.current?.clientHeight);
              setSpaceHeight(commentInputDivRef.current?.clientHeight || 112);
            }}
          />
        </div>
        {isShowModalSuitableCustomerPopup && (
          <ModalSuitableCustomer
            open={true}
            onClose={() => {
              setIsShowModalSuitableCustomerPopup(false);
            }}
          />
        )}
      </div>

      <ModalNoteForm
        open={isShowNotePopup}
        onCancel={() => setIsShowNotePopup(false)}
        onOk={() => {
          setIsShowNotePopup(false);
        }}
        setOpen={() => {
          setIsShowNotePopup(false);
        }}
      />
      <ModalNewReport
        open={isShowReport}
        onClose={() => {
          setIsShowReport(false);
        }}
      />
      <ModalBooking
        open={isShowBooking}
        handleCancel={() => {
          setIsShowBooking(false);
        }}
      />
      <ModalEditHistory open={isShowEditHistory} onClose={() => setIsShowEditHistory(false)} />
    </>
  );
};
export { ModalWarehouseDetails };
