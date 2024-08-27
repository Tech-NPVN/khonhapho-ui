import { UploadIcon } from '@/components/icons';
import { UseUpload } from '@/hooks/use-upload';
import { Image, Upload } from 'antd';
import { type UploadListType } from 'antd/es/upload/interface';

const uploadButton = (
  <button className="border-0 bg-transparent cursor-pointer flex items-center gap-2" type="button">
    <UploadIcon />
    <span className="text-primary_text_l/50 dark:text-primary_text_d/50 font-medium">Tải lên</span>
  </button>
);

type UploadInputProps = UseUpload & {
  maxCount: number;
  accept: string;
  multiple?: boolean;
  listType?: UploadListType;
  className?: string;
};

const UploadInput = (props: UploadInputProps) => {
  const {
    handleChange,
    handlePreview,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    accept,
    fileList,
    maxCount,
    multiple,
    listType = 'picture-card',
    className
  } = props;

  return (
    <>
      <Upload
        listType={listType}
        onPreview={handlePreview}
        onChange={handleChange}
        accept={accept}
        fileList={fileList}
        maxCount={maxCount}
        multiple={multiple}
        className={className}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
          alt={previewImage}
        />
      )}
    </>
  );
};

export { uploadButton, UploadInput };
