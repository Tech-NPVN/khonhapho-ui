import useDragScroll from '@/hooks/use-drag-scroll';
import { Pagination, Select, Table, Tooltip, type TableProps } from 'antd';
import dayjs from 'dayjs';
import { ScheduleTypes } from '../types/types';
import QrCodeButton from './qrcode';
import { ThreeDotSchedule } from './schedule.threedot';

const columns: TableProps<ScheduleTypes>['columns'] = [
  {
    title: 'Tg.Tạo',
    key: 'created_at',
    dataIndex: 'created_at',
    className: 'text-center !py-3',
    render: (time: ScheduleTypes['created_at']) => (
      <span className="flex flex-col text-center w-full cursor-text">
        <span>{dayjs(time).format('DD/MM/YYYY')}</span>
        <span>{dayjs(time).format('HH:mm:ss')}</span>
      </span>
    ),
  },
  {
    title: 'Tên khoá học',
    key: 'name',
    dataIndex: 'name',
    className: 'text-left',
    render(name, _record, index) {
      return (
        <span className="block text-left w-full cursor-text">
          {name} {index + 1}
        </span>
      );
    },
  },
  {
    title: 'Nội dung khoá học',
    key: 'content',
    dataIndex: 'content',
    className: 'text-left min-w-[150px]',
    render: (content: ScheduleTypes['content']) => (
      <span className="block text-left w-full">
        <Tooltip title={content} placement="top">
          <span className="max-w-[200px] text-ellipsis line-clamp-2 text-wrap cursor-text">
            {content}
          </span>
        </Tooltip>
      </span>
    ),
  },
  {
    title: 'Địa điểm',
    key: 'location',
    dataIndex: 'location',
    className: 'text-left min-w-[150px]',
    render: (location: ScheduleTypes['location']) => (
      <span className="block text-left w-full">
        <Tooltip title={location} placement="top">
          <span className="max-w-[200px] text-ellipsis line-clamp-2 text-wrap cursor-text">
            {location}
          </span>
        </Tooltip>
      </span>
    ),
  },
  {
    title: 'Khu vực',
    key: 'area',
    dataIndex: 'area',
    className: 'text-center',
    render: (area: ScheduleTypes['area']) => (
      <span className="block text-center w-full cursor-text">{area}</span>
    ),
  },
  {
    title: 'Chức danh',
    key: 'role',
    dataIndex: 'role',
    className: 'text-center',
    render: (role: ScheduleTypes['role']) => (
      <span className="block text-center w-full cursor-text">{role?.join(', ')}</span>
    ),
  },
  {
    title: 'Lịch đào tạo',
    key: 'time',
    dataIndex: 'time',
    className: 'text-center',
    render: (time: ScheduleTypes['time']) => (
      <span className="flex flex-col text-center w-full cursor-text">
        <span>{time?.date}</span>
        <span className="flex gap-1 justify-center">
          <span className="text-green-500">{time?.start_time}</span>
          <span>-</span>
          <span className="text-red-500">{time?.end_time}</span>
        </span>
      </span>
    ),
  },
  {
    title: 'QR Checkin',
    key: 'time',
    dataIndex: 'time',
    className: 'text-center max-w-[70px] text-wrap',
    render: (qr: ScheduleTypes['qr_code'], defaultValue) => (
      <div className="block text-center w-full">
        <QrCodeButton
          qrInfo={{
            value: qr?.check_in,
            title: 'Quét để điểm danh lớp học',
            downloadProps: {
              description: [
                'Lớp học: ' + defaultValue?.name,
                defaultValue?.content ?? '-',
                '',
                'Khu vực: ' + defaultValue?.area,
                'Địa điểm: ' + defaultValue?.location,
                'Thời gian: ' +
                  defaultValue?.time?.date +
                  ' ' +
                  defaultValue?.time?.start_time +
                  ' - ' +
                  defaultValue?.time?.end_time,
              ],
            },
          }}
        />
      </div>
    ),
  },
  {
    title: 'Qr Check Out',
    key: 'time',
    dataIndex: 'time',
    className: 'text-center max-w-[70px] text-wrap',
    render: (qr: ScheduleTypes['qr_code'], defaultValue) => (
      <div className="block text-center w-full">
        <QrCodeButton
          qrInfo={{
            value: qr?.check_out,
            title: 'Quét để điểm danh rời lớp học',
            downloadProps: {
              description: [
                'Lớp học: ' + defaultValue?.name,
                defaultValue?.content ?? '-',
                '',
                'Khu vực: ' + defaultValue?.area,
                'Địa điểm: ' + defaultValue?.location,
                'Thời gian: ' +
                  defaultValue?.time?.date +
                  ' ' +
                  defaultValue?.time?.start_time +
                  ' - ' +
                  defaultValue?.time?.end_time,
              ],
            },
          }}
        />
      </div>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    align: 'center',
    className: 'text-center max-w-[60px] text-wrap',
    // fixed: 'right',
    render: () => (
      <div className="flex justify-center">
        <ThreeDotSchedule />
      </div>
    ),
  },
];

const demo: ScheduleTypes = {
  created_at: new Date(Date.now()).toISOString(),
  name: 'Đào tạo học viên mới',
  content: 'Cách bán nhà hiệu quả dành cho người mới',
  location: 'Hội trường tầng 5 tháp A 102 Thái Thịnh',
  area: 'Hà nội',
  role: ['Trợ lý', 'Học Viên'],
  time: {
    date: '11/11/2024',
    start_time: '10:00',
    end_time: '12:00',
  },
  id: '1234',
  qr_code: {
    check_in: 'CHECK IN',
    check_out: 'CHECK OUT',
  },
  updated_at: new Date(Date.now()).toISOString(),
};

const dataSource: ScheduleTypes[] = Array.from({ length: 12 }, () => ({ ...demo }));

export const ScheduleTable = () => {
  const dragScrollHandlers = useDragScroll();
  return (
    <>
      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <Table
          className="mt-5"
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={false}
          rowClassName={(_, index) =>
            index % 2 === 0
              ? 'bg-primary_color_l dark:bg-primary_color_d'
              : 'bg-background_l_2 dark:bg-background_d'
          }
        />
      </div>

      <div className="w-full flex justify-end mt-5 gap-2">
        <Pagination total={50} defaultPageSize={20} defaultCurrent={1} />
        <Select placeholder="20/trang" />
      </div>
    </>
  );
};
