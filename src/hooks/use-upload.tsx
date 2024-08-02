'use client';

import { GetProp, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadProps } from 'antd/lib';
import { Dispatch, SetStateAction, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type UseUpload = {
  previewOpen: boolean;
  previewImage: string;
  fileList: UploadFile<any>[];
  handlePreview: (file: UploadFile) => Promise<void>;
  handleChange: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
  setPreviewOpen: Dispatch<SetStateAction<boolean>>;
  setPreviewImage: Dispatch<SetStateAction<string>>;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(new Error());
  });

const useUpload = (): UseUpload => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url ?? (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return {
    previewOpen,
    previewImage,
    fileList,
    handlePreview,
    handleChange,
    setPreviewOpen,
    setPreviewImage,
  };
};

export { type FileType, type UseUpload, getBase64 };

export default useUpload;
