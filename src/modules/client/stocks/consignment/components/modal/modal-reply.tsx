import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { Button, Divider, Form, Input, Modal, Radio, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';

const ReplySchema = z
  .object({
    reason: z.enum(['1', '2', '3', 'other'], { message: REQUIRED_MSG_SAMPLE }),
    description: z.string().default('').optional(),
  })
  .refine(
    (data) =>
      data.reason !== 'other' || (data.reason === 'other' && data.description?.trim() !== ''),
    {
      message: REQUIRED_MSG_SAMPLE,
      path: ['description'],
    },
  );

type ReplySchemaType = z.infer<typeof ReplySchema>;

const rule = createSchemaFieldRule(ReplySchema);

const REPLY_OPTIONS = [
  {
    label: 'Bất động sản này đã được ký về Công ty.',
    value: '1',
  },
  {
    label: 'Tin này không phải Chính chủ.',
    value: '2',
  },
  {
    label: 'Bất động sản này Chủ nhà Đã bán hoặc Dừng bán.',
    value: '3',
  },
  {
    label: 'Lý do khác',
    value: 'other',
  },
];

export const ModalReply = ({ open, handleCancel }: { open: boolean; handleCancel: () => void }) => {
  const [form] = Form.useForm<ReplySchemaType>();

  const reason = Form.useWatch('reason', form);

  const handleSubmit = async (values: ReplySchemaType) => {
    console.log(values);
    // ...
  };

  return (
    <Modal
      title="Ý kiến phản hồi"
      open={open}
      onCancel={handleCancel}
      onClose={handleCancel}
      width={500}
      footer={null}
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />

      <Form form={form} onFinish={handleSubmit} layout="vertical" autoComplete="off">
        <Form.Item<ReplySchemaType> name="reason" label="Mẫu lý do:" rules={[rule]} required>
          <Radio.Group>
            <Space direction="vertical">
              {REPLY_OPTIONS.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        {reason === 'other' && (
          <Form.Item<ReplySchemaType> name="description" rules={[rule]}>
            <Input.TextArea rows={4} placeholder="Nhập lý do" />
          </Form.Item>
        )}

        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType='submit'>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
