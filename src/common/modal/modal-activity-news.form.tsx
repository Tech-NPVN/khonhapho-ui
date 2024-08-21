import { UploadInput } from '@/components/common';
import useUpload from '@/hooks/use-upload';
import { Button, message, Modal, Spin } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import TiptapEditor from '../tiptap';

interface ModalActivityNewsFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue: {
    id?: number;
    content?: string;
    image?: string;
  };
  onSuccess?: (post: { id: number; content: string; image?: string[] }) => void;
}
const ModalActivityNewsForm = ({
  defaultValue,
  open,
  setOpen,
  onSuccess,
}: ModalActivityNewsFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>(defaultValue.content || '');
  const imagesUpload = useUpload();
  const handleSubmit = () => {
    console.log(imagesUpload.fileList);
    console.log(content);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(defaultValue.id ? 'Cập nhật thành công' : 'Thêm thành công');
      onSuccess?.({
        id: defaultValue.id || new Date().getTime(),
        content: content,
        image: [],
      });
    }, 1000);
  };
  return (
    <Modal
      open={open}
      centered
      title={defaultValue.id ? 'Cập nhật bài viết' : 'Tạo bài viết'}
      classNames={{
        header: 'text-center sm:[&>div]:!text-xl' + (!loading ? '' : ' opacity-30'),
      }}
      width={700}
      onCancel={() => {
        !loading && setOpen(false);
      }}
      onClose={() => {
        !loading && setOpen(false);
      }}
      footer={null}
    >
      <Spin spinning={loading} size="large">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                className="w-full h-full object-cover rounded-full"
                src={'/images/user-default.jpg'}
                alt={'avatar'}
                width={60}
                height={60}
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                <Link
                  className="flex gap-1 font-semibold text-primary_text_l dark:text-primary_text_d_2 hover:underline"
                  href={'user/profile'}
                >
                  <span>CV Lương Quang Trọng</span>
                  <span>·</span>
                  <span>NPVN-0000</span>
                </Link>
              </div>
              <div>Tin thông báo vụ chốt</div>
            </div>
          </div>
          <div className="bg-black/5 dark:bg-white/10 rounded-lg">
            <TiptapEditor
              className="p-2 [&>div.tiptap]:min-h-64 w-full"
              config={{ limit: 3000, placeholder: 'Bắt đầu một bài viết...' }}
              content=""
              onChange={(html, text) => {
                setContent(html);
              }}
              showCount
            />
          </div>
          <div className="flex">
            <div className="me-3">Ảnh</div>
            <div className="flex">
              <UploadInput
                {...imagesUpload}
                maxCount={6}
                multiple
                accept=".jpg, .jpeg, .png, .webm, .heic"
              />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button
              type="primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              {defaultValue.id ? 'Cập nhật' : 'Đăng'}
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export { ModalActivityNewsForm };
export type { ModalActivityNewsFormProps };
