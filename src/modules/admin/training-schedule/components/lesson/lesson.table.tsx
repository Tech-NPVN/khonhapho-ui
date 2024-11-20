import useDragScroll from '@/hooks/use-drag-scroll';
import { Pagination, Select, Table, Tooltip, type TableProps } from 'antd';

import dayjs from 'dayjs';
import { ThreeDotLession } from './lesson.threedot';
import { LessonType } from './types';

const columns: TableProps<LessonType>['columns'] = [
  {
    title: 'Tên tài liệu',
    key: 'name',
    dataIndex: 'name',
    className: 'text-left !py-3',
    render(name, _record, index) {
      return (
        <span className="block text-left cursor-text">
          {name} {index + 1}
        </span>
      );
    },
  },
  {
    title: 'Nội dung',
    key: 'content',
    dataIndex: 'content',
    className: 'text-left min-w-[150px]',
    render: (content: LessonType['content']) => (
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
    title: 'Ngày thêm',
    key: 'created_at',
    dataIndex: 'created_at',
    className: 'text-center min-w-[150px]',
    render: (created_at: LessonType['created_at']) => (
      <span className="block text-center w-full cursor-text">
        {dayjs(created_at).format('DD/MM/YYYY - HH:mm:ss')}
      </span>
    ),
  },
  {
    title: 'Người thêm',
    key: 'role',
    dataIndex: 'role',
    className: 'text-center',
    render: (author: LessonType['author']) => (
      <span className="block text-center w-full cursor-text">{author}</span>
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
        <ThreeDotLession />
      </div>
    ),
  },
];

const demo: LessonType = {
  created_at: new Date(Date.now()).toISOString(),
  name: 'Đào tạo học viên mới',
  content: 'Cách bán nhà hiệu quả dành cho người mới',
  id: '1234',
  updated_at: new Date(Date.now()).toISOString(),
  author: 'TP Nguyễn Kim Ngân',
};

const dataSource: LessonType[] = Array.from({ length: 12 }, () => ({ ...demo }));

export const LessionTable = () => {
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
