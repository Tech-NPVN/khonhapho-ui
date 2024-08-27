import { UploadInput } from '@/components/common';
import { IMAGE_ACCEPTED } from '@/constants/data';
import useUpload from '@/hooks/use-upload';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';

const ColllectionNoteSchema = z.object({
  content: z.string().max(500, 'Tối đa 500 ký tự').optional(),
  images: z.array(z.any()).max(6, 'Tối đa 6 ảnh.').optional(),
});

type ColllectionNoteSchemaType = z.infer<typeof ColllectionNoteSchema>;

const rule = createSchemaFieldRule(ColllectionNoteSchema);

export const ModalColNote = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm<ColllectionNoteSchemaType>();

  const imagesUpload = useUpload();

  const onSubmit = async (values: ColllectionNoteSchemaType) => {
    console.log(values);
  };

  return (
    <Modal
      title="Ghi chú"
      open={open}
      onCancel={handleCancel}
      onClose={handleCancel}
      width={530}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Form
        form={form}
        initialValues={{
          content: '',
          images: [],
        }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item<ColllectionNoteSchemaType>
          name="content"
          label="Nội dung"
          className="mb-6"
          rules={[rule]}
        >
          <Input.TextArea
            size="large"
            rows={10}
            placeholder="Nhập nội dung"
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item<ColllectionNoteSchemaType>
          name="images"
          label="Ảnh (tối đa 6 ảnh):"
          rules={[rule]}
        >
          <UploadInput
            {...imagesUpload}
            maxCount={6}
            multiple
            accept={IMAGE_ACCEPTED}
            className="[&>div>div]:dark:!bg-primary_color_d"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" size="large" block className="mt-3">
          Lưu
        </Button>
        <Button
          type="default"
          size="large"
          onClick={handleCancel}
          block
          className="mt-3 dark:bg-transparent"
        >
          Đóng
        </Button>
      </Form>
    </Modal>
  );
};
