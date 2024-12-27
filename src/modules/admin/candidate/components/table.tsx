'use client';

import { EyeIcon, EyeSlashIcon, PenIcon, TrashIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import useDragScroll from '@/hooks/use-drag-scroll';
import { Button, Modal, Pagination, Select, Table, type TableProps } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CandidateType } from '../types';
import DuplicateCandidate from './duplicate-candidate';
import ModalCandidate from './modal-candidate.form';

const ActionColumn = () => {
  const [visible, setVisible] = useState(false);
  const handleDelete = () => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa danh mục này?',
      onOk() {
        console.log('Delete success');
        return Promise.resolve();
      },
      onCancel() {
        console.log('Delete canceled');
      },
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <Button className="px-2" type="text" onClick={() => setVisible(true)}>
          <PenIcon className="fill-[#69C3F4]" />
        </Button>
        <Button className="px-2" type="text" onClick={handleDelete}>
          <TrashIcon className="fill-[#FF3B30]" />
        </Button>
      </div>
      <ModalCandidate
        defaultValue={{
          id: '1',
          candidate_name: 'Nguyễn Kim Ngân',
          candidate_birthday: '15/09/2003',
          interview_time: '09/11/2024',
          created_at: '09/11/2024',
          candidate_phone: '0345678900',
          candidate_id: '001020230401',
        }}
        open={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};
const CitizenIdentificationComponent: React.FC<{ id: string }> = ({ id }) => {
  const [visible, setVisible] = useState(false);
  const formatId = (id: string, visible: boolean) =>
    visible ? id : id.slice(0, -4).replace(/\d/g, '*') + id.slice(-4);
  return (
    <span className="flex gap-2 items-center justify-center">
      <span className="cursor-text">{formatId(id, visible)}</span>
      <span className="cursor-pointer" onClick={(e) => setVisible(!visible)}>
        {visible ? <EyeSlashIcon /> : <EyeIcon />}
      </span>
    </span>
  );
};

const columns: TableProps<CandidateType>['columns'] = [
  {
    title: 'TG.Tạo',
    key: 'created_at',
    dataIndex: 'created_at',
    className: 'text-center !py-3',
    render: (time: CandidateType['created_at']) => (
      <span className="!cursor-text block text-center w-full">
        {dayjs(time).format('DD/MM/YYYY - HH:mm')}
      </span>
    ),
  },
  {
    title: 'Họ & Tên',
    key: 'candidate_name',
    dataIndex: 'candidate_name',
    className: 'text-left',
    render(name: CandidateType['candidate_name']) {
      return <span className="!cursor-text block text-left w-full">{name}</span>;
    },
  },
  {
    title: 'Ngày sinh',
    key: 'description',
    dataIndex: 'description',
    className: 'text-center',
    render(candidate_birthday: CandidateType['candidate_birthday']) {
      return (
        <span className="!cursor-text block text-center w-full">
          {dayjs(candidate_birthday).format('DD/MM/YYYY')}
        </span>
      );
    },
  },
  {
    title: 'SĐT',
    key: 'candidate_phone',
    dataIndex: 'candidate_phone',
    className: 'text-center',
    render(phone: CandidateType['candidate_phone']) {
      return (
        <Link
          href={`tel:${phone}`}
          className="!cursor-pointer block text-center w-full hover:underline"
        >
          {phone}
        </Link>
      );
    },
  },
  {
    title: 'CCCD',
    key: 'candidate_id',
    dataIndex: 'candidate_id',
    className: 'text-center',
    render(candidate_id: CandidateType['candidate_id']) {
      return <CitizenIdentificationComponent id={candidate_id ?? ''} />;
    },
  },
  {
    title: 'Thời gian phỏng vấn',
    key: 'interview_time',
    dataIndex: 'interview_time',
    className: 'text-center',
    render(value: CandidateType['interview_time']) {
      return (
        <span className="!cursor-text block text-center w-full">
          {dayjs(value).format('MM/DD/YYYY - HH:mm')}
        </span>
      );
    },
  },
  {
    title: 'Người phỏng vấn',
    key: 'interviewer',
    dataIndex: 'interviewer',
    className: 'text-center',
    render(value: CandidateType['interviewer']) {
      return (
        <Link href={Routes.User + '/' + 1} className="flex gap-3 items-center justify-center">
          <div className="w-8 h-8">
            <Image
              className="w-full object-contain h-full rounded-full"
              src={'/images/user-default.jpg'}
              width={40}
              height={40}
              alt="."
            ></Image>
          </div>
          <div>{value}</div>
        </Link>
      );
    },
  },
  {
    title: 'Phòng ban',
    key: 'department',
    dataIndex: 'department',
    align: 'center',
    className: 'text-center',
    render: (_value, _record, index: number) => (index % 5 == 0 ? '190' + index + 1 : '-'),
  },
  {
    title: 'Trùng',
    key: 'duplicate',
    dataIndex: 'duplicate',
    align: 'center',
    className: 'text-center',
    render: (value: CandidateType['duplicate'], record: CandidateType, index: number) => (
      <DuplicateCandidate candidate_id={index % 9 === 0 ? record.candidate_id : ''} key={index} />
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    align: 'center',
    className: 'text-center',
    render: (_value, _record, index: number) => <ActionColumn key={'action-' + index} />,
  },
];

const data: CandidateType = {
  id: 'candidate',
  candidate_birthday: new Date().toISOString(),
  candidate_name: 'Nguyễn Kim Ngân',
  created_at: new Date().toISOString(),
  candidate_id: '0102001002345',
  candidate_phone: '034567890',
  interview_time: new Date().toISOString(),
  interviewer: 'NPVN Nguyễn Văn A',
};

const dataSource: CandidateType[] = Array.from({ length: 20 }, () => ({ ...data }));

export const CandidateTable = () => {
  const dragScrollHandlers = useDragScroll();
  return (
    <div
      {...dragScrollHandlers}
      className="overflow-x-auto overflow-y-hidden"
      style={{ cursor: dragScrollHandlers.cursor }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        size="small"
        pagination={false}
        // scroll={{ x: 'max-content' }}
        rowClassName={(_, index) =>
          index % 2 === 0
            ? 'bg-primary_color_l dark:bg-primary_color_d'
            : 'bg-background_l_2 dark:bg-background_d'
        }
      />
      <div className="w-full flex justify-end mt-5 gap-2">
        <Pagination defaultCurrent={1} total={50} defaultPageSize={20} />
        <div>
          <Select placeholder="20/Trang" />
        </div>
      </div>
    </div>
  );
};
