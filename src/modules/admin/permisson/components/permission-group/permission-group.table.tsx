'use client';

import { Button, Form, Input, type TableProps } from 'antd';
import { PermissionGroupSchemaType } from './permission-group.schema';
import { useSearchParams } from 'next/navigation';
import { Table, useFilterPagination } from '@/components/common';
import { getSearchParams } from '@/utilities/func.util';
import { useMemo } from 'react';
import { PenIcon, SearchIcon, TrashIcon } from '@/components/icons';
import { modalError } from '@/common/modal';
import { useRouter } from 'next-nprogress-bar';
import { Routes } from '@/constants/enums';

const data: PermissionGroupSchemaType = {
  name: 'Bỏ - Nhóm tìm kiếm tài khoản trong nhóm',
  description: 'Dành cho thư ký, tổng giám đốc, admin',
  // permission_type: 'cap-nhat-tai-khoan',
};

const dataSource: PermissionGroupSchemaType[] = Array.from({ length: 14 }, () => ({ ...data }));

type FilterForm = { key: string };

export const PermissionGroupTable = () => {
  const [form] = Form.useForm<FilterForm>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, limit } = useFilterPagination();

  const handleSubmit = async (values: FilterForm) => {
    const params = getSearchParams(values);
    const newUrl = `${window.location.pathname}?${params}`;
    history.replaceState(null, '', newUrl);
  };

  const columns: TableProps<PermissionGroupSchemaType>['columns'] = useMemo(() => {
    return [
      {
        title: 'Tên nhóm quyền',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
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
              onClick={() => router.push(Routes.AdminPermission + '/group/update/1')}
            />

            <Button
              icon={<TrashIcon className="fill-error_l dark:fill-error_d" />}
              type="text"
              onClick={() => {
                modalError({
                  title: 'Bạn có muốn xoá nhóm quyền này không?',
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

      <Table<Partial<PermissionGroupSchemaType>>
        columns={columns as any}
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
