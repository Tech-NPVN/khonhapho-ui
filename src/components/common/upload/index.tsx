import { AddIcon } from '@/components/icons';
import { UseUpload } from '@/hooks/use-upload';
import { Image, Upload } from 'antd';

const uploadButton = (
  <button style={{ border: 0, background: 'none', cursor: 'pointer' }} type="button">
    <AddIcon className="[&>path]:fill-primary_color_d dark:[&>path]:fill-primary_color_l" />
    <div style={{ marginTop: 8 }}>Tải lên</div>
  </button>
);

const UploadInput = ({ ...props }: UseUpload & { maxCount: number; accept: string }) => {
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={props.fileList}
        onPreview={props.handlePreview}
        onChange={props.handleChange}
        maxCount={props.maxCount}
        multiple
        accept={props.accept}
      >
        {props.fileList.length >= props.maxCount ? null : uploadButton}
      </Upload>
      {props.previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: props.previewOpen,
            onVisibleChange: (visible) => props.setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && props.setPreviewImage(''),
          }}
          src={props.previewImage}
          alt={props.previewImage}
        />
      )}
    </>
  );
};

export { uploadButton, UploadInput };
