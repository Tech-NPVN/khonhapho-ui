import { Button, Divider, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { memo } from 'react';
import { z } from 'zod';

type ModalNoteProps = {
  open: boolean;
  handleCancel: () => void;
  handleSubmit?: () => void;
  description?: string;
  title?: string;
};

const NoteSchema = z.object({
  description: z.string().max(500, 'Tối đa 500 ký tự').optional(),
});

type NoteSchemaType = z.infer<typeof NoteSchema>;

const rule = createSchemaFieldRule(NoteSchema);

/**
 * Modal Note - Modal Ghi chú
 *
 * @property {boolean} [open]
 * @property {() => void} [handleCancel]
 * @property {() => void} [handleSubmit]
 * @property {string} [description]
 * @property {string} [title]
 * @returns {JSX.Element}
 */
export const ModalNote = memo(
  ({ open, handleCancel, handleSubmit, description, title }: ModalNoteProps): JSX.Element => {
    const [form] = Form.useForm<NoteSchemaType>();

    const onSubmit = async (values: NoteSchemaType) => {
      console.log(values);
      handleSubmit?.();
    };

    return (
      <Modal
        title={title ?? 'Ghi chú'}
        open={open}
        onCancel={handleCancel}
        width={450}
        footer={null}
        centered
      >
        <Divider className="bg-background_l dark:bg-background_d my-4" />
        <Form
          form={form}
          initialValues={{
            description: description ?? '',
          }}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item<NoteSchemaType>
            name="description"
            label="Ghi chú"
            className="mb-6"
            rules={[rule]}
          >
            <Input.TextArea
              size="large"
              rows={10}
              placeholder="Nhập ghi chú"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" size="large">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
    );
  },
);

ModalNote.displayName = ModalNote.name;
