'use client';
import TiptapEditor from '@/common/tiptap';
import { UploadInput } from '@/components/common';
import { MsgValidation } from '@/constants/enums';
import useUpload from '@/hooks/use-upload';
import { Button, message, Modal, Select, Spin } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CATEGORY_SAMPLE } from './data.sample';
import { LibNhaPhoTypes } from './lib.types';

type LibNhaPhoFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: LibNhaPhoTypes;
  onSuccess?: (post: LibNhaPhoTypes) => void;
  title?: string;
};
interface libNhaPhoData {
  title?: string;
  content?: string;
  category?: string;
}

const validate = (data: libNhaPhoData) => {
  const error: { title?: string; content?: string; category?: string } = {};
  if (!data.title?.replaceAll(/<p>\s*<\/p>/g, '').trim()) {
    error.title = MsgValidation.REQUIRED;
  }
  if (!data.content?.replaceAll(/<p>\s*<\/p>/g, '').trim()) {
    error.content = MsgValidation.REQUIRED;
  }
  if (!data.category) {
    error.category = MsgValidation.REQUIRED;
  }
  return error;
};
const HASH = '#modal-lib-nha-pho';
const LibNhaPhoForm = ({ defaultValue, open, setOpen, onSuccess, title }: LibNhaPhoFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<libNhaPhoData>({
    title: defaultValue?.title,
    content: defaultValue?.content,
    category: CATEGORY_SAMPLE.find((item) => item.label === defaultValue?.category)?.value,
  });
  const [error, setError] = useState<{ title?: string; content?: string; category?: string }>();
  const imagesUpload = useUpload(defaultValue?.images);
  const handleSubmit = () => {
    const error = validate(data);
    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }
    setError(undefined);
    console.log(imagesUpload.fileList);
    setLoading(true);
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
        category: CATEGORY_SAMPLE.find((item) => item.value === data?.category)?.label,
        tags: ['dev', 'test'],
      });
      setOpen(false);
    }, 1000);
  };
  const handleClose = () => {
    setOpen?.(false);
    window.history.back();
  };
  useEffect(() => {
    if (open) {
      if (window.location.hash !== HASH) {
        window.history.pushState(null, '', HASH);
      }
    }
  }, [open]);
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== HASH) setOpen?.(false);
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [setOpen]);
  return (
    <Modal
      open={open}
      centered
      title={defaultValue?.id ? 'Cập nhật bài viết' : 'Tạo bài viết'}
      className="md:max-w-[720px] sm:max-w-[600px] max-w-none max-sm:my-0"
      classNames={{
        header: 'text-center sm:[&>div]:!text-xl mb-4' + (!loading ? '' : ' opacity-30'),
        content: 'max-sm:rounded-none max-sm:min-h-[100vh] max-sm:p-2',
      }}
      width={'100%'}
      onCancel={() => {
        !loading && handleClose();
      }}
      onClose={() => {
        !loading && handleClose();
      }}
      footer={null}
    >
      <Spin spinning={loading} size="large">
        <div className="flex flex-col gap-5 max-sm:min-h-[calc(100vh-180px)]">
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
                onChange={(html, text) => {
                  const value = text;
                  setData((prev) => ({
                    ...prev,
                    title: value,
                  }));
                  if (value) {
                    if (value.length > 1000)
                      setError((prev) => ({
                        ...prev,
                        title: 'Tiêu đề tối đa 1000 ký tự',
                      }));
                    else
                      setError((prev) => ({
                        ...prev,
                        title: '',
                      }));
                  } else
                    setError((prev) => ({
                      ...prev,
                      title: MsgValidation.REQUIRED,
                    }));
                }}
                config={{
                  limit: 1000,
                  placeholder: 'Tiêu đề bài viết *',
                }}
              />
              {error?.title && <div className="text-error_l dark:text-error_d">{error?.title}</div>}
            </div>
            <div>
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
                    else
                      setError((prev) => ({
                        ...prev,
                        content: MsgValidation.REQUIRED,
                      }));
                  }}
                  showCount
                />
              </div>
              {error?.content && (
                <div className="text-error_l dark:text-error_d">{error?.content}</div>
              )}
            </div>
            <div className="w-full my-3">
              <Select
                className="w-full h-10 [&_.ant-select-item]:!h-10"
                placeholder="Danh mục đào tạo *"
                optionRender={(option) => {
                  return <div className="py-[2px]">{option.label}</div>;
                }}
                value={data.category}
                onChange={(value) => {
                  setData((prev) => ({
                    ...prev,
                    category: value,
                  }));
                  if (value)
                    setError((prev) => ({
                      ...prev,
                      category: '',
                    }));
                }}
              >
                {CATEGORY_SAMPLE.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <span>{option.label}</span>
                  </Select.Option>
                ))}
              </Select>
              {error?.category && (
                <div className="text-error_l dark:text-error_d">{error?.category}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="me-3">Ảnh</div>
            <div className="flex dark:[&_.ant-upload.ant-upload-select]:!bg-white/10 mt-1">
              <UploadInput
                {...imagesUpload}
                maxCount={6}
                multiple
                accept=".jpg, .jpeg, .png, .webm, .heic"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full sm:justify-end justify-center mt-5">
          <Button
            className="!text-base sm:text-sm max-sm:px-12"
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            {defaultValue?.id ? 'Cập nhật' : 'Đăng'}
          </Button>
        </div>
      </Spin>
    </Modal>
  );
};

export { LibNhaPhoForm };
export type { LibNhaPhoFormProps };
