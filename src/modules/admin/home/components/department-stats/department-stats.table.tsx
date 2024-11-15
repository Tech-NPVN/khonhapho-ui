import { IMAGE_SAMPLE } from '@/constants/data';
import { DepartmentStatsType } from './department-stats.type';
import { Table, TableProps } from 'antd';
import Image from 'next/image';
import useDragScroll from '@/hooks/use-drag-scroll';

const columns: TableProps<DepartmentStatsType>['columns'] = [
  {
    title: 'Phòng',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => values.deparment.name,
    className: 'border-0',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch',
    render: (values: DepartmentStatsType['branch']) => values.name,
    className: 'border-0',
  },
  {
    title: 'Trưởng phòng',
    dataIndex: 'branch',
    render: (values: DepartmentStatsType['branch']) => {
      if (values.deparment?.manager) {
        const { avatar, name } = values.deparment.manager;

        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              height={32}
              width={32}
              src={avatar}
              alt={'avatar-manager'}
              className="rounded-full"
            />
            <span>{name}</span>
          </div>
        );
      }
    },
    className: 'border-0',
  },
  {
    title: 'Phó phòng',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => values.deparment.deputyQuantity ?? '-',
    className: 'border-0',
  },
  {
    title: 'Trợ lý',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => values.deparment.assistantQuantity ?? '-',
    className: 'border-0',
  },
  {
    title: 'Đầu chủ',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => values.deparment.ownerQuantity ?? '-',
    className: 'border-0',
  },
  {
    title: 'Chuyên viên',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => values.deparment.staffQuantity ?? '-',
    className: 'border-0',
  },
  {
    title: 'Học viên',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => values.deparment.learnerQuantity ?? '-',
    className: 'border-0',
  },
  {
    title: 'Tổng',
    dataIndex: 'branch',
    align: 'center',
    render: (values: DepartmentStatsType['branch']) => <b>{values.deparment.totalMember}</b>,
    className: 'border-e-divider_l dark:border-e-divider_d',
  },
  {
    title: 'Biến động',
    dataIndex: 'branch',
    align: 'center',
    className: 'border-r-0',
    render: (values: DepartmentStatsType['branch']) => {
      const {
        deparment: { fluctuations },
      } = values;

      if (!fluctuations) {
        return '-';
      }

      return (
        <b className={`${fluctuations.type === 'increase' ? 'text-color_l ' : 'text-error_l'}`}>
          {fluctuations.type === 'increase' ? '+' : '-'} {fluctuations.count}
        </b>
      );
    },
  },
];

const data: DepartmentStatsType = {
  branch: {
    name: 'NPVN - Hà Nội',
    deparment: {
      name: 'HĐQT',
      manager: {
        avatar: IMAGE_SAMPLE,
        name: 'Nguyễn Văn A',
      },
      ownerQuantity: 1,
      totalMember: 2,
      fluctuations: {
        type: 'increase',
        count: 1,
      },
    },
  },
};

const dataSource: DepartmentStatsType[] = Array.from({ length: 12 }, () => ({ ...data }));

export const DepartmentStatsTable = () => {
  const dragScrollHandlers = useDragScroll();

  return (
    <>
      <p className="mt-5">
        Tổng số lượng phòng: <span className="font-semibold">177</span>
      </p>

      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden mt-6"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <Table
          bordered
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
    </>
  );
};
