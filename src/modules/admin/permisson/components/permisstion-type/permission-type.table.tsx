'use client';

import { Table, useFilterPagination } from '@/components/common';
import { PenIcon, SearchIcon, TrashIcon } from '@/components/icons';
import { Button, Form, Input, type TableProps } from 'antd';
import { PermissionTypeSchemaType } from './permission-type.schema';
import { useMemo, useState } from 'react';
import { modalError } from '@/common/modal';
import { getSearchParams } from '@/utilities/func.util';
import { PermissionTypeForm } from './permission-type.form';
import { useSearchParams } from 'next/navigation';

const data: PermissionTypeSchemaType = {
  name: 'Cập nhật tài khoản',
  order: 1,
};

const dataSource: PermissionTypeSchemaType[] = Array.from({ length: 11 }, () => ({ ...data }));

type FilterForm = { key: string };

export const PermissionTypeTable = () => {
  const [currentState, setCurrentState] = useState<PermissionTypeSchemaType | undefined>(undefined);
  const [form] = Form.useForm<FilterForm>();

  const searchParams = useSearchParams();
  const { page, limit } = useFilterPagination();

  const handleSubmit = async (values: FilterForm) => {
    const params = getSearchParams(values);
    const newUrl = `${window.location.pathname}?${params}`;
    history.replaceState(null, '', newUrl);
  };

  const columns: TableProps<PermissionTypeSchemaType>['columns'] = useMemo(() => {
    return [
      {
        title: 'Tên loại quyền',
        dataIndex: 'name',
        key: 'name',
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
                  title: 'Bạn có muốn xoá loại quyền này không?',
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

      <Table<PermissionTypeSchemaType>
        columns={columns}
        dataSource={dataSource}
        paginationProps={{
          current: Number(page),
          pageSize: Number(limit),
          total: dataSource.length,
          size: 'small',
        }}
      />

      <PermissionTypeForm
        open={Boolean(currentState)}
        onClose={() => setCurrentState(undefined)}
        initialValues={currentState}
      />
    </>
  );
};
