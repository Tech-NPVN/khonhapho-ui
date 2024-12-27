'use client';

import { useMemo, useState } from 'react';
import { PermissionPermitSchemaType } from './permission-permit.schema';
import { Button, Form, Input, type TableProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import { Table, useFilterPagination } from '@/components/common';
import { getSearchParams } from '@/utilities/func.util';
import { PenIcon, SearchIcon, TrashIcon } from '@/components/icons';
import { modalError } from '@/common/modal';
import { PermissionPermitForm } from './permission-permit.form';

const data: PermissionPermitSchemaType = {
  name: 'Cập nhật tài khoản user trong phòng',
  code: 'cap_nhat_tai_khoan_user_trong_phong',
  permission_type: 'cap-nhat-tai-khoan',
  order: 1,
};

const dataSource: PermissionPermitSchemaType[] = Array.from({ length: 7 }, () => ({ ...data }));

type FilterForm = { key: string };

export const PermissionPermitTable = () => {
  const [currentState, setCurrentState] = useState<PermissionPermitSchemaType | undefined>(
    undefined,
  );
  const [form] = Form.useForm<FilterForm>();

  const searchParams = useSearchParams();
  const { page, limit } = useFilterPagination();

  const handleSubmit = async (values: FilterForm) => {
    const params = getSearchParams(values);
    const newUrl = `${window.location.pathname}?${params}`;
    history.replaceState(null, '', newUrl);
  };

  const columns: TableProps<PermissionPermitSchemaType>['columns'] = useMemo(() => {
    return [
      {
        title: 'Tên quyền',
        width: 500,
        render: (data: PermissionPermitSchemaType) => {
          return (
            <div className="flex flex-col items-start">
              <p className="font-semibold mb-1">{data.name}</p>
              <span className="opacity-80 text-sm">{data.code}</span>
            </div>
          );
        },
      },
      {
        title: 'Loại quyền',
        dataIndex: 'permission_type',
        key: 'permission_type',
      },
      {
        title: 'Thứ tự',
        dataIndex: 'order',
        key: 'order',
      },
      {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 120,
        render: () => (
          <div className="flex justify-center items-center gap-1">
            <Button
              icon={<PenIcon className="fill-link_text_l dark:fill-link_text_d" />}
              type="text"
              onClick={() => setCurrentState(data)}
            />

            <Button
              icon={<TrashIcon className="fill-error_l dark:fill-error_d" />}
              type="text"
              onClick={() => {
                modalError({
                  title: 'Bạn có muốn xoá quyền này không?',
                  cancelText: 'Không',
                  okText: 'Có',
                  centered: true,
                });
              }}
            />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <Form
          form={form}
          initialValues={{ key: searchParams.get('key') ?? '' }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item<FilterForm> name="key" className="sm:w-[320px] w-full mb-0">
            <Input
              size="large"
              placeholder="Nhập nội dung tìm kiếm"
              prefix={
                <button type="submit" className="border-0 bg-transparent flex justify-center">
                  <SearchIcon className="w-4 h-4 opacity-70" />
                </button>
              }
              className="border-0 shadow-btn dark:!bg-background_d"
            />
          </Form.Item>
        </Form>
      </div>

      <Table<PermissionPermitSchemaType>
        columns={columns}
        dataSource={dataSource}
        paginationProps={{
          current: Number(page),
          pageSize: Number(limit),
          total: dataSource.length,
          size: 'small',
        }}
      />

      <PermissionPermitForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
