'use client';
import { CityType, DistrictType, locationApi } from '@/apis/location';
import { CaretDown } from '@/components/icons/caret-down.icon';
import { Button, Collapse, Form, Select } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import PostDetail from '../../../../../components/reuse/data-display/post';
import { RequiredSymbolLabel } from '../../../../../components/reuse/data-entry/required-symbol-label';
import { HOME_POSTS } from './data.sample';

type FieldType = {
  city?: number;
  districts?: number[];
  price_range: string[];
  status: string[];
};
const FeedInterested = () => {
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [form] = Form.useForm<FieldType>();
  const [cities, setCities] = useState<CityType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const handleCityChange = (value: string) => {
    form.setFieldValue('city', value);
    form.setFieldValue('districts', []);

    const fetchDistricts = async () => {
      try {
        const id = cities.find((c) => c.code === value)?.id || -1;
        const res = await locationApi.getDistricts(id);
        setDistricts(res);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  };
  const handleDistrictChange = (value: string[]) => {
    if (value.includes('all')) {
      form.setFieldValue(
        'districts',
        districts.map((value) => value.code),
      );
      return;
    }
    if (value.includes('-all')) {
      form.setFieldValue('districts', []);
      return;
    }
    form.setFieldValue('districts', value);
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await locationApi.getCities();
        setCities(res);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = (response: FieldType) => {
    console.log('Success:', response);
  };
  const customCity = Form.useWatch('city', form);
  const customDistricts = Form.useWatch('districts', form);
  return (
    <>
      <div
        className={clsx(
          'mt-4 sm:mt-6 rounded-lg bg-primary_color_l dark:bg-primary_color_d px-2 sm:px-4',
          'max-sm:w-[calc(100%_-_24px)] mx-auto',
        )}
      >
        <Collapse
          bordered={false}
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key as string[])}
          className="bg-transparent p-0 [&_.ant-collapse-header]:!py-[10px]"
          items={[
            {
              key: '0',
              label: 'Chọn tiêu chí nhận thông báo kho hàng',
              className: 'dark:text-primary_text_d_2 text-white',
              children: (
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmit}
                  autoComplete="off"
                  form={form}
                >
                  <label htmlFor="city" className="mb-2 inline-block dark:!text-primary_text_d">
                    <RequiredSymbolLabel />
                    Chọn khu vực
                  </label>
                  <Form.Item<FieldType>
                    label=""
                    name="city"
                    rules={[{ required: true, message: 'Yêu cầu nhập trường này' }]}
                    style={{ marginBottom: '8px' }}
                  >
                    <Select
                      placeholder="Tỉnh/Thành phố"
                      onChange={(value) => {
                        handleCityChange(value);
                      }}
                      value={form.getFieldValue('city')}
                      fieldNames={{ label: 'name', value: 'code' }}
                      options={cities}
                      showSearch
                    ></Select>
                  </Form.Item>
                  <Form.Item<FieldType>
                    label=""
                    name="districts"
                    rules={[{ required: true, message: 'Yêu cầu nhập trường này' }]}
                    style={{ marginBottom: '8px' }}
                  >
                    <Select
                      placeholder="Quận/Huyện"
                      disabled={!customCity || customCity === -1}
                      allowClear
                      mode="multiple"
                      onChange={handleDistrictChange}
                      value={form.getFieldValue('districts')}
                      fieldNames={{ label: 'name', value: 'code' }}
                      options={[
                        {
                          name:
                            customDistricts?.length === districts.length
                              ? 'Bỏ chọn tất cả'
                              : 'Chọn tất cả',
                          code: customDistricts?.length === districts.length ? '-all' : 'all',
                        },
                        ...districts,
                      ]}
                    ></Select>
                  </Form.Item>
                  <label htmlFor="city" className="mb-2 inline-block dark:text-primary_text_d">
                    <RequiredSymbolLabel />
                    Chọn phân khúc
                  </label>
                  <Form.Item<FieldType>
                    label=""
                    name="price_range"
                    rules={[{ required: true, message: 'Yêu cầu nhập trường này' }]}
                    style={{ marginBottom: '8px' }}
                  >
                    <Select placeholder="Chọn phân khúc" mode="multiple">
                      <Select.Option value="0">Hà Nội</Select.Option>
                      <Select.Option value="1">Hồ Chí Minh</Select.Option>
                      <Select.Option value="2">Đà Nẵng</Select.Option>
                    </Select>
                  </Form.Item>
                  <label htmlFor="city" className="mb-2 inline-block dark:text-primary_text_d">
                    <RequiredSymbolLabel />
                    Chọn đặc điểm
                  </label>
                  <Form.Item<FieldType> label="" name="status" style={{ marginBottom: '8px' }}>
                    <Select placeholder="Bỏ trống đồng nghĩa với chọn tất cả" mode="multiple">
                      <Select.Option value="0">Hà Nội</Select.Option>
                      <Select.Option value="1">Hồ Chí Minh</Select.Option>
                      <Select.Option value="2">Đà Nẵng</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{
                      marginBottom: '8px',
                      marginTop: '16px',
                    }}
                  >
                    <div className="w-full flex justify-end mb-4">
                      <Button type="primary" htmlType="submit">
                        Cập nhật
                      </Button>
                      <Button
                        className="ms-2"
                        type="default"
                        onClick={() => {
                          setActiveKey([]);
                        }}
                      >
                        Đóng
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
          expandIcon={({ isActive }) => (
            <CaretDown
              width={24}
              height={16}
              className={clsx(
                'fill-primary_text_l dark:fill-primary_text_d ',
                isActive ? '' : '-rotate-90',
              )}
            />
          )}
        ></Collapse>
      </div>
      <div className="w-full mt-4 gap-4 flex flex-col sm:mt-6 sm:gap-6">
        {HOME_POSTS.map((post, index) => (
          <PostDetail isWarehouse key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export { FeedInterested };
