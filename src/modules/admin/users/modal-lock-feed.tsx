import { DatePicker, message, Modal, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

export type ModalLockFeedProps = {
  open?: boolean;
  onClose?: () => void;
};

const calculateTimeDifference = (selectedDate?: dayjs.Dayjs): string => {
  if (!selectedDate) return '-';
  const now = dayjs();
  const diff = selectedDate.diff(now);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ngày`);
  if (hours > 0) parts.push(`${hours} giờ`);
  if (minutes > 0) parts.push(`${minutes} phút`);
  return parts.length > 0 ? parts.join(' ') : '-';
};

/** Modal chọn khoảng thời gian khoá đăng bài viết mới */
const ModalLockFeed: React.FC<ModalLockFeedProps> = ({ open, onClose }) => {
  const [isCustomEndTime, setIsCustomEndTime] = useState(false);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);
  const [endOption, setEndOption] = useState<string>('15');

  const startDateTime = dayjs();
  // Hàm xử lý khi nhấn OK
  const handleOk = () => {
    if (isCustomEndTime && !endDateTime) {
      message.error('Vui lòng chọn thời gian kết thúc!');
      return;
    }

    const calculatedEndTime = isCustomEndTime
      ? endDateTime
      : startDateTime.add(parseInt(endOption), 'minute');

    // if (calculatedEndTime && calculatedEndTime.diff(startDateTime, 'minute') < 15) {
    //   message.error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu ít nhất 15 phút!');
    //   return;
    // }

    message.success(
      `Thời gian đã chọn: Từ ${startDateTime.format(
        'HH:mm DD:MM:YYYY',
      )} đến ${calculatedEndTime?.format('HH:mm DD:MM:YYYY')}`,
    );
    onClose?.();
  };
  const handleEndOptionChange = (value: string) => {
    setEndOption(value);
    setIsCustomEndTime(value === 'custom');
    if (value !== 'custom') setEndDateTime(null);
  };

  return (
    <Modal
      title="Khoá chức năng đăng tin"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        onClose?.();
      }}
      afterClose={() => {
        setIsCustomEndTime(false);
        setEndDateTime(null);
        setEndOption('15');
      }}
      centered
    >
      <div>
        <label className="block mt-2 mb-1">Thời gian khoá:</label>
        <Select className="h-10 w-full" value={endOption} onChange={handleEndOptionChange}>
          <Select.Option value="15">15 phút</Select.Option>
          <Select.Option value="30">30 phút</Select.Option>
          <Select.Option value="60">1 giờ</Select.Option>
          <Select.Option value="180">3 giờ</Select.Option>
          <Select.Option value="720">12 giờ</Select.Option>
          <Select.Option value="1440">24 giờ</Select.Option>
          <Select.Option value="custom">Khác</Select.Option>
        </Select>
      </div>
      {isCustomEndTime && (
        <div>
          <div>
            <label className="block mt-2 mb-1">Khoá đến:</label>
            <DatePicker
              className="w-full h-10"
              showTime
              value={endDateTime}
              onChange={(date) => {
                setEndDateTime(date);
              }}
              disabledDate={(current) => {
                const now = dayjs().add(15, 'minute');
                return current.isBefore(now.startOf('day'));
              }}
              disabledTime={(current) => {
                if (!current) return {};
                const now = dayjs().add(15, 'minute');
                if (current.isSame(now, 'day')) {
                  const startHour = now.hour();
                  const startMinute = now.minute();
                  // nếu vượt qua 23 giờ 45 phút
                  if (startHour === 0) {
                    return {
                      disabledHours: () =>
                        Array.from({ length: 24 }, (_, i) => i).filter((h) => h !== 0),
                      disabledMinutes: (selectedHour) =>
                        selectedHour === 0
                          ? Array.from({ length: 60 }, (_, i) => i).filter((m) => m < startMinute)
                          : Array.from({ length: 60 }, (_, i) => i),
                    };
                  }
                  return {
                    disabledHours: () =>
                      Array.from({ length: 24 }, (_, i) => i).filter((h) => h < startHour),
                    disabledMinutes: (selectedHour) =>
                      selectedHour === startHour
                        ? Array.from({ length: 60 }, (_, i) => i).filter((m) => m < startMinute)
                        : [],
                  };
                }

                return {};
              }}
              format="YYYY-MM-DD HH:mm"
            />
          </div>
          <div>Khoảng: {calculateTimeDifference(endDateTime ?? undefined)}</div>
        </div>
      )}
    </Modal>
  );
};

export default ModalLockFeed;
