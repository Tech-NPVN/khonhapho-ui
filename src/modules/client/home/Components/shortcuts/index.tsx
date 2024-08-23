import {
  BuyUrgentlyIcon,
  CandidateManagement,
  CollectionIcon,
  DocumentPlusIcon,
  FreeWarehouseIcon2,
  GuestManagementAutoPairGuests,
  MainInfoWarehouseIcon2,
  MoneyGroupGreenIcon,
  PeopleGroup2,
  PersonalWarehouseIcon2,
  QrCodeIcon,
  ResourceWarehouseIcon,
} from '@/components/icons';
import { Routes } from '@/constants/enums';
import Link from 'next/link';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ListShortcuts = () => {
  return (
    <div className="w-full">
      <Swiper slidesPerView={'auto'} modules={[FreeMode]} spaceBetween={18} className="max-w-full">
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.Warehouse}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <ResourceWarehouseIcon className="[&_path]:stroke-color_l dark:[&_path]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Kho tài nguyên
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.Urgently}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <BuyUrgentlyIcon className="[&_path]:stroke-color_l [&_circle]:fill-color_l dark:[&_path]:stroke-color_l dark:[&_circle]:fill-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Khách cần mua gấp
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.UserCollection}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <CollectionIcon className="[&_path]:stroke-color_l [&_rect]:stroke-color_l dark:[&_path]:stroke-color_l dark:[&_rect]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Bộ sưu tập
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.WarehouseCreate}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <DocumentPlusIcon className="[&_path]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Đăng tin
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.StockOwn}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <PersonalWarehouseIcon2 className="[&_.fill]:fill-color_l [&_.stroke]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Kho cá nhân
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.StockConsignment}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <MainInfoWarehouseIcon2 className="[&_.fill]:fill-color_l [&_.stroke]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Kho tin chính chủ
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.AdminRefferal}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <QrCodeIcon className="[&_.fill]:fill-color_l [&_.stroke]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Mã giới thiệu
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={'/manage-department/customers'}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <PeopleGroup2 className="[&_.fill]:fill-color_l [&_.stroke]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Q.Lý khách của Đầu Khách
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.UserCustomers}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <GuestManagementAutoPairGuests className="fill-color_l dark:fill-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Q.Lý khách-Tự khớp khách
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.StockNovendors}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <FreeWarehouseIcon2 className="[&_.fill]:fill-color_l [&_.stroke]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Kho hàng tự do
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.FeedsDeal}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <MoneyGroupGreenIcon />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Thông báo vụ chốt
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="w-[72px] max-w-[72px] h-[85px]">
          <Link
            href={Routes.AdminCandidate}
            className="w-full h-full bg-white dark:bg-primary_color_d rounded-lg flex flex-col items-center justify-center"
          >
            <div>
              <CandidateManagement className="[&_.fill]:fill-color_l [&_.stroke]:stroke-color_l" />
            </div>
            <div className="text-center cursor-pointer mt-1 text-[12px] px-1 text-primary_text_l dark:text-primary_text_d">
              Quản lý ứng viên
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export { ListShortcuts };
