'use client';

import { DATE_TIME_FORMAT } from '@/constants/data';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import { memo, useCallback, useState } from 'react';
import { ModalAppointmentDetails } from './modal';

const AppointmentItem = memo(({ type }: { type?: 'reject' | 'confirm' | 'new' | 'recall' }) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const getAppointment = useCallback(() => {
    switch (type) {
      case 'reject':
        return {
          backgroundColor: 'bg-noti_red dark:bg-noti_red_d',
          textColor: 'text-error_l',
          content: 'đã từ chối',
        };
      case 'confirm':
        return {
          backgroundColor: 'bg-noti_green dark:bg-noti_green_d',
          textColor: 'text-color_l',
          content: 'đã xác nhận',
        };
      case 'new':
      case 'recall':
        return {
          backgroundColor: 'bg-noti_yellow dark:bg-noti_yellow_d',
          textColor: 'dark:text-primary_text_d',
          content: `đã ${type === 'recall' ? 'thu hồi' : 'xác nhận'}`,
        };
      default:
        return {
          backgroundColor: 'bg-transparent',
          textColor: 'text-primary_text_d dark:text-primary_text_d',
        };
    }
  }, [type]);

  return (
    <>
      <div
        className={`flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer ${
          getAppointment().backgroundColor
        }`}
        onClick={() => setOpenDetails(true)}
      >
        <Avatar
          src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="flex-shrink-0"
        />
        <div>
          <p className="mb-1">
            <strong>Bạn</strong> đã đặt lịch dẫn khách
          </p>
          <p className="mb-1">
            <strong>Thời gian: {dayjs(new Date()).format(DATE_TIME_FORMAT)}</strong>
          </p>
          <p className="mb-2 line-clamp-2">
            <strong>Địa chỉ:</strong> 16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô
            Xuân Hà NPHN-886
          </p>
          <div className="flex justify-between">
            <span className="text-xs text-link_text_l dark:text-link_text_d">9 phút trước</span>
            <span className={`text-xs ${getAppointment().textColor}`}>
              Bạn {getAppointment().content}
            </span>
          </div>
        </div>
      </div>

      <ModalAppointmentDetails open={openDetails} handleCancel={() => setOpenDetails(false)} />
    </>
  );
});

AppointmentItem.displayName = AppointmentItem.name;

export const UserAppointmentIndex = () => {
  return (
    <div className="pt-4 lg:pr-4 flex justify-center relative">
      <div className="w-[600px] bg-primary_color_l dark:bg-primary_color_d py-4 px-5 rounded-lg min-h-[calc(100vh-100px)]">
        <h3 className="mb-5">Lịch sử đặt lịch xem nhà</h3>

        <div className="flex flex-col gap-3">
          <AppointmentItem type="reject" />
          <AppointmentItem type="reject" />
          <AppointmentItem type="confirm" />
          <AppointmentItem type="new" />
          <AppointmentItem type="new" />
          <AppointmentItem type="new" />
          <AppointmentItem type="confirm" />
          <AppointmentItem type="recall" />
        </div>
      </div>
    </div>
  );
};
