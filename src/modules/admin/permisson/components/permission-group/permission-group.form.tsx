'use client';

import { Button, Checkbox, Form, Input, TableProps } from 'antd';
import { PermissionGroupSchema, PermissionGroupSchemaType } from './permission-group.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { SectionBody, Table } from '@/components/common';
import { useCallback, useMemo } from 'react';
import { ArrowBackIcon } from '@/components/icons';
import { useRouter } from 'next-nprogress-bar';

const rule = createSchemaFieldRule(PermissionGroupSchema);

const dataSource = [
  {
    permission_name: 'Cập nhật tài khoản',
    permission_type: [
      {
        label: 'Cập nhật mật khẩu user trong phòng',
        value: 'cap-nhat-mat-khau-user-trong-phong',
      },
      {
        label: 'Cập nhật mật khẩu user trong phòng',
        value: 'cap-nhat-mat-khau-user-trong-phong',
      },
      {
        label: 'Cập nhật mật khẩu user trong phòng',
        value: 'cap-nhat-mat-khau-user-trong-phong',
      },
      {
        label: 'Cập nhật mật khẩu user trong phòng',
        value: 'cap-nhat-mat-khau-user-trong-phong',
      },
      {
        label: 'Cập nhật mật khẩu user trong phòng',
        value: 'cap-nhat-mat-khau-user-trong-phong',
      },
      {
        label: 'Cập nhật mật khẩu user trong phòng',
        value: 'cap-nhat-mat-khau-user-trong-phong',
      },
    ],
  },
  {
    permission_name: 'Quyền đăng tin',
    permission_type: [
      {
        label: 'Đăng tin',
        value: 'dang-tin',
      },
      {
        label: 'Sửa tin',
        value: 'sua-tin',
      },
      {
        label: 'Xoá tin',
        value: 'xoa-tin',
      },
    ],
  },
  {
    permission_name: 'Nâng/hạ tài khoản',
    permission_type: [
      {
        label: 'Nâng/hạ Học viên lên Chuyên viên',
        value: 'nang-ha-hoc-vien-len-chuyen-vien',
      },
      {
        label: 'Nâng/hạ Học viên lên Trợ lý',
        value: 'nang-ha-hoc-vien-len-tro-ly',
      },
      {
        label: 'Nâng/hạ Học viên lên Trưởng nhóm',
        value: 'nang-ha-hoc-vien-len-truong-nhom',
      },
    ],
  },
  {
    permission_name: 'Quyền chức danh',
    permission_type: [
      {
        label: 'Trưởng ban',
        value: 'truong-ban',
      },
      {
        label: 'Trưởng nhóm',
        value: 'truong-nhom',
      },
      {
        label: 'Trưởng phòng',
        value: 'truong-phong',
      },
      {
        label: 'Giám đốc khu vực',
        value: 'giam-doc-khu-vuc',
      },
      {
        label: 'Thư ký',
        value: 'thu-ky',
      },
    ],
  },
  {
    permission_name: 'Mã giới thiệu',
    permission_type: [
      {
        label: 'Tạo mã giới thiệu',
        value: 'tao-ma-gioi-thieu',
      },
      {
        label: 'Tạo mã giới thiệu gia nhập phòng',
        value: 'tao-ma-gioi-thieu-gia-nhap-phong',
      },
    ],
  },
  {
    permission_name: 'Xem kho hàng',
    permission_type: [
      {
        label: 'Kho hàng theo khu vực',
        value: 'kho-hang-theo-khu-vuc',
      },
      {
        label: 'Kho hàng theo phòng',
        value: 'kho-hang-theo-phong',
      },
      {
        label: 'Kho hàng dưới 30 tỷ',
        value: 'kho-hang-duoi-30-ty',
      },
    ],
  },
  {
    permission_name: 'Tạo tài khoản',
    permission_type: [
      {
        label: 'Tạo tài khoản',
        value: 'tao-tai-khoan',
      },
      {
        label: 'Tạo tài khoản trong phòng',
        value: 'tao-tai-khoan-trong-phong',
      },
      {
        label: 'Tạo tài khoản trong nhóm',
        value: 'tao-tai-khoan-trong-nhom',
      },
    ],
  },
  {
    permission_name: 'Tìm kiếm tài khoản',
    permission_type: [
      {
        label: 'Tìm kiếm tài khoản trong nhóm',
        value: 'tim-kiem-tai-khoan-trong-phong',
      },
      {
        label: 'Tìm kiếm tài khoản trong phòng',
        value: 'tim-kiem-tai-khoan-trong-phong',
      },
    ],
  },
  {
    permission_name: 'Reset',
    permission_type: [],
  },
  {
    permission_name: 'Quản lý địa điểm',
    permission_type: [
      {
        label: 'Cập nhật thông tin địa điểm',
        value: 'cap-nhat-thong-tin-dia-diem',
      },
    ],
  },
  {
    permission_name: 'Quyền newsfeed',
    permission_type: [
      {
        label: 'Cập nhật vụ chốt',
        value: 'cap-nhat-vu-chot',
      },
      {
        label: 'Tạo feed đào tạo',
        value: 'tao-feed-dao-tao',
      },
      {
        label: 'Xem feed của các phòng trong chi nhánh',
        value: 'xem-feed-cua-cac-phong-trong-chi-nhanh',
      },
      {
        label: 'Tạo newsfeed nhóm',
        value: 'tao-newsfeed-nhom',
      },
    ],
  },
  {
    permission_name: 'Giới hạn tài khoản chuyên viên/học viên',
    permission_type: [
      {
        label: 'Gia hạn tất cả thành viên',
        value: 'gia-han-tat-ca-thanh-vien',
      },
      {
        label: 'Gia hạn thành viên trong phòng',
        value: 'gia-han-thanh-vien-trong-phong',
      },
      {
        label: 'Gia hạn thành viên trong nhóm',
        value: 'gia-han-thanh-vien-trong-nhom',
      },
    ],
  },
  {
    permission_name: 'Khách hàng',
    permission_type: [
      {
        label: 'Tìm kiếm khách hàng trong nhóm',
        value: 'tim-kiem-khach-hang-trong-nhom',
      },
      {
        label: 'Tìm kiếm khách hàng trong phòng',
        value: 'tim-kiem-khach-hang-trong-phong',
      },
    ],
  },
  {
    permission_name: 'Quyền phòng đào tạo',
    permission_type: [
      {
        label: 'Cập nhật thông tin địa điểm',
        value: 'cap-nhat-thong-tin-dia-diem',
      },
    ],
  },
  {
    permission_name: 'Chat',
    permission_type: [
      {
        label: 'Sửa thông tin avatar',
        value: 'sua-thong-tin-avatar',
      },
    ],
  },
  {
    permission_name: 'Quản lý ứng viên',
    permission_type: [
      {
        label: 'Quyền cập nhật ứng viên trong phòng',
        value: 'quyen-cap-nhat-ung-vien-trong-phong',
      },
      {
        label: 'Quyền xem tất cả ứng viên trong phòng',
        value: 'quyen-xem-tat-ca-ung-vien-trong-phong',
      },
    ],
  },
  {
    permission_name: 'Quyền tin chính chủ',
    permission_type: [
      {
        label: 'Cập nhật tin chính chủ',
        value: 'cap-nhat-tin-chinh-chu',
      },
      {
        label: 'Duyệt tin chính chủ',
        value: 'duyet-tin-chinh-chu',
      },
    ],
  },
];

export const PermissionGroupForm = ({ id }: { id?: string }) => {
  const router = useRouter();

  const [form] = Form.useForm<PermissionGroupSchemaType>();

  const renderTitle = useCallback(() => {
    return (
      <div className="flex items-center gap-5">
        <button
          className="border-0 bg-transparent p-0 flex items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        {id ? 'Sửa nhóm quyền' : 'Thêm nhóm quyền'}
      </div>
    );
  }, [id, router]);

  const handleSubmit = async (values: PermissionGroupSchemaType) => {
    console.log(values);
  };

  const columns: TableProps['columns'] = useMemo(() => {
    return [
      {
        title: 'Loại quyền',
        dataIndex: 'permission_name',
        key: 'permission_name',
      },
      {
        title: 'Các quyền',
        dataIndex: 'permission_type',
        key: 'permission_type',
        render: (permission_type: any) => (
          <div className="flex flex-wrap gap-3 py-2">
            {permission_type?.map((item: any) => (
              <Checkbox value={item.value} key={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div className="mt-5 lg:pr-3">
      <SectionBody title={renderTitle()}>
        <Form
          form={form}
          initialValues={{}}
          onFinish={handleSubmit}
          layout="horizontal"
          labelCol={{ span: 16, lg: 4, sm: 8 }}
          className="mt-4"
        >
          <Form.Item<PermissionGroupSchemaType>
            name="name"
            label="Tên nhóm quyền:"
            required
            rules={[rule]}
          >
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="Nhập tên nhóm"
            />
          </Form.Item>

          <Form.Item<PermissionGroupSchemaType> name="description" label="Mô tả:" rules={[rule]}>
            <Input.TextArea
              size="large"
              className="dark:!bg-primary_color_d"
              placeholder="Nhập mô tả"
              rows={3}
            />
          </Form.Item>

          <Form.Item<PermissionGroupSchemaType>
            name="permission_type"
            label="Loại quyền:"
            rules={[rule]}
          >
            <Table<Partial<PermissionGroupSchemaType>>
              columns={columns}
              dataSource={dataSource as any}
              className="!mt-0"
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" size="large" htmlType="submit" className="px-6">
              Lưu
            </Button>
          </div>
        </Form>
      </SectionBody>
    </div>
  );
};
