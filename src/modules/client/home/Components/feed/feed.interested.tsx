import { CaretDown } from '@/components/icons/caret-down.icon';
import { Button, Collapse, Form, Select } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import PostDetail from '../../../../../components/reuse/data-display/post';
import { RequiredSymbolLabel } from '../../../../../components/reuse/data-entry/required-symbol-label';

type FieldType = {
  city: string;
  district?: string;
  price_range: string[];
  status: string[];
};
const FeedInterested = () => {
  const [activeKey, setActiveKey] = useState<string[]>([]);
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
                  // onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
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
                    <Select placeholder="Tỉnh/Thành phố">
                      <Select.Option value="0">Hà Nội</Select.Option>
                      <Select.Option value="1">Hồ Chí Minh</Select.Option>
                      <Select.Option value="2">Đà Nẵng</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item<FieldType>
                    label=""
                    name="district"
                    rules={[{ required: true, message: 'Yêu cầu nhập trường này' }]}
                    style={{ marginBottom: '8px' }}
                  >
                    <Select placeholder="Quận/Huyện">
                      <Select.Option value="0">Hà Nội</Select.Option>
                      <Select.Option value="1">Hồ Chí Minh</Select.Option>
                      <Select.Option value="2">Đà Nẵng</Select.Option>
                    </Select>
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
        {Array.from({ length: 10 }).map((_, index) => (
          <PostDetail
            isWarehouse
            key={'post-' + index}
            post={{
              content: `Tôi có khách cần mua gấp, kính nhờ anh chị
                              em tìm hộ giúp tôi. Tiêu chí khách:<br/>
                              <b>Khu vực</b>: Hà Nội
                              <br>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              <br>
                              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                              <br>
                              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                              <br> 
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              <br>
                              Lorem ipsum dolor sit amet, con in culpa qui officia deserunt mollit anim id est laborum.
                              `,
              images: [
                '/images/post-1.jpeg',
                '/images/post-2.jpeg',
                '/images/post-3.jpeg',
                '/images/post-4.jpeg',
                '/images/post-5.jpeg',
                '/images/post-6.jpeg',
              ],
            }}
          />
        ))}
      </div>
    </>
  );
};

export { FeedInterested };
