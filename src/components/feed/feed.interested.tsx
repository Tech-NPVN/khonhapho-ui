import { Button, Collapse, Form, Select } from 'antd';
import { useState } from 'react';
import PostDetail from '../reuse/data-display/post';
import { RequiredSymbolLabel } from '../reuse/data-entry/required-symbol-label';

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
      <div className="mt-6 rounded-md bg-primary_color_l dark:bg-primary_color_d px-4">
        <div>
          <Collapse
            bordered={false}
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key as string[])}
            className="bg-transparent p-0 [&_.ant-collapse-header]:!py-3"
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
          ></Collapse>
        </div>
      </div>
      <div className="w-full mt-6 gap-6 flex flex-col">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostDetail
            key={'post-' + index}
            post={{
              content: `Tôi có khách cần mua gấp, kính nhờ anh chị
                              em tìm hộ giúp tôi. Tiêu chí khách:<br/>
                              <b>Khu vực</b>: Hà Nội
                              `,
              images: [
                '/images/post-1.jpeg',
                '/images/post-2.jpeg',
                '/images/post-3.jpeg',
                '/images/post-4.jpeg',
                '/images/post-5.jpeg',
              ],
            }}
            isWarehouse
          />
        ))}
      </div>
    </>
  );
};

export default FeedInterested;
