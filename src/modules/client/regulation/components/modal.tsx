'use client';
import TiptapEditor from '@/common/tiptap';
import { UploadInput } from '@/components/common';
import { MsgValidation } from '@/constants/enums';
import useUpload from '@/hooks/use-upload';
import { Button, message, Modal, Spin } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { RegulationTypes } from './post';

interface RegulationFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: RegulationTypes;
  onSuccess?: (post: RegulationTypes) => void;
  title?: string;
}
const RegulationForm = ({ defaultValue, open, setOpen, onSuccess, title }: RegulationFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ title?: string; content?: string }>({
    content: defaultValue?.content,
    title: defaultValue?.title,
  });
  const [error, setError] = useState<{ title?: string; content?: string }>();
  const imagesUpload = useUpload(defaultValue?.images);
  const handleSubmit = () => {
    let isError = false;
    if (!data.title?.replaceAll(/<p>\s*<\/p>/g, '').trim()) {
      setError((prev) => ({
        ...prev,
        title: MsgValidation.REQUIRED,
      }));
      isError = true;
    }
    if (!data.content?.replaceAll(/<p>\s*<\/p>/g, '').trim()) {
      setError((prev) => ({
        ...prev,
        content: MsgValidation.REQUIRED,
      }));
      isError = true;
    }
    if (isError) return;

    setLoading(true);
    console.log(imagesUpload.fileList);

    setTimeout(() => {
      setLoading(false);
      message.success(defaultValue?.id ? 'Cập nhật thành công' : 'Thêm thành công');
      onSuccess?.({
        ...defaultValue,
        id: defaultValue?.id || new Date().getTime().toString(),
        content: data.content,
        title: data.title,
        images: imagesUpload.fileList.map((item) =>
          item.thumbUrl ? URL.createObjectURL(item.originFileObj as Blob) : (item.url as string),
        ),
        tags: ['dev', 'test'],
      });
      setOpen(false);
    }, 1000);
  };

  return (
    <Modal
      open={open}
      centered
      title={defaultValue?.id ? 'Cập nhật bài viết' : 'Tạo bài viết'}
      className="sm:max-w-[640px]"
      classNames={{
        header: 'text-center sm:[&>div]:!text-xl' + (!loading ? '' : ' opacity-30'),
      }}
      width={'100%'}
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
              <div className="text-secondary_text_l dark:text-secondary_text_d">
                {title ?? 'Đăng tin'}
              </div>
            </div>
          </div>
          <div>
            <div className="w-full my-3">
              <TiptapEditor
                className={clsx(
                  'w-full outline-none px-2 py-2 bg-black/5 dark:bg-white/10 rounded-lg placeholder:text-[#adb5bd] border border-solid',
                  error?.title ? 'border-error_l dark:border-error_d' : 'border-transparent',
                )}
                content={data.title}
                config={{
                  placeholder: 'Tiêu đề bài viết *',
                  limit: 1000,
                }}
                onChange={(html, text) => {
                  setData((prev) => ({
                    ...prev,
                    title: html,
                  }));
                  if (text)
                    setError((prev) => ({
                      ...prev,
                      title: '',
                    }));
                  else
                    setError((prev) => ({
                      ...prev,
                      title: MsgValidation.REQUIRED,
                    }));
                }}
              />

              {error?.title && <div className="text-error_l dark:text-error_d">{error?.title}</div>}
            </div>
            <div
              className={clsx(
                'bg-black/5 dark:bg-white/10 rounded-lg border border-solid',
                error?.content ? 'border-error_l dark:border-error_d' : 'border-transparent',
              )}
            >
              <TiptapEditor
                className="p-2 [&>div.tiptap]:min-h-64 w-full"
                config={{ limit: 3000, placeholder: 'Nội dung bài viết *' }}
                content={data.content}
                onChange={(html) => {
                  setData((prev) => ({
                    ...prev,
                    content: html,
                  }));
                  if (html)
                    setError((prev) => ({
                      ...prev,
                      content: '',
                    }));
                }}
                showCount
              />
            </div>
            {error?.content && (
              <div className="text-error_l dark:text-error_d">{error?.content}</div>
            )}
          </div>
          <div className="flex">
            <div className="me-3">Ảnh</div>
            <div className="flex dark:[&_.ant-upload.ant-upload-select]:!bg-white/10">
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
              {defaultValue?.id ? 'Cập nhật' : 'Đăng'}
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export { RegulationForm };
export type { RegulationFormProps };
