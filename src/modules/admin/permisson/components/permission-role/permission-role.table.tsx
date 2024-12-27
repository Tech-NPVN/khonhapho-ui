'use client';

import { Button, Form, Input, TableProps } from 'antd';
import { PermissionRoleSchemaType } from './permission-role.schema';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { Table, useFilterPagination } from '@/components/common';
import { getSearchParams } from '@/utilities/func.util';
import { useMemo } from 'react';
import { PenIcon, SearchIcon, TrashIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import { modalError } from '@/common/modal';

const data: PermissionRoleSchemaType = {
  name: 'Giám đốc khu vực',
  code: 'GĐKV',
  role_name: 'Giám đốc khu vực',
  permission_group: '',
  order: 1,
  description: 'Quản lý nhân sự Chi nhánh - Khối - Phòng và Đăng hàng',
};

const dataSource: PermissionRoleSchemaType[] = Array.from({ length: 8 }, () => ({ ...data }));

type FilterForm = { key: string };

export const PermissionRoleTable = () => {
  const [form] = Form.useForm<FilterForm>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, limit } = useFilterPagination();

  const handleSubmit = async (values: FilterForm) => {
    const params = getSearchParams(values);
    const newUrl = `${window.location.pathname}?${params}`;
    history.replaceState(null, '', newUrl);
  };

  const columns: TableProps<PermissionRoleSchemaType>['columns'] = useMemo(() => {
    return [
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Chức danh',
        dataIndex: 'role_name',
        key: 'role_name',
      },
      {
        title: 'Thứ tự',
        dataIndex: 'order',
        key: 'order',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Junior',
        render: () => {
          return <Button type="primary" size='small' className='rounded-lg px-3'>Cập nhật</Button>;
        },
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
              onClick={() => router.push(Routes.AdminPermission + '/role/update/1')}
            />

            <Button
              icon={<TrashIcon className="fill-error_l dark:fill-error_d" />}
              type="text"
              onClick={() => {
                modalError({
                  title: 'Bạn có muốn xoá chức danh này không?',
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
  }, [router]);

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

      <Table<PermissionRoleSchemaType>
        columns={columns}
        dataSource={dataSource}
        paginationProps={{
          current: Number(page),
          pageSize: Number(limit),
          total: dataSource.length,
          size: 'small',
        }}
      />
    </>
  );
};
