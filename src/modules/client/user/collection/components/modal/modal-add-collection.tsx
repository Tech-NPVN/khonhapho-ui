import { Button, Checkbox, Divider, Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

type CollectionItemProps = {
  title: string;
  imageSrc?: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
};

const CollectionItem: React.FC<CollectionItemProps> = ({
  title,
  imageSrc,
  isChecked,
  onChange,
}) => {
  return (
    <div
      className="shadow-btn bg-primary_color_l dark:bg-primary_color_d rounded-lg p-[10px] flex items-start gap-3 cursor-pointer hover:bg-background_l dark:hover:bg-background_d cursor-pointer"
      onClick={() => onChange(!isChecked)}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={title}
          width={130}
          height={100}
          className="object-cover rounded-lg flex-shrink-0"
        />
      ) : (
        <div className="flex justify-center items-center flex-shrink-0 w-[130px] h-[100px] bg-background_l dark:bg-primary_color_d rounded-lg transition-all">
          <span>{title.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="flex-1">
        <strong className="block">{title}</strong>
        <span className="text-gray-500">1 Tin</span>
      </div>
      <Checkbox
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="ml-4"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const CollectionList = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'mac-dinh': false,
    'bo-suu-tap-0': false,
    'bo-suu-tap-1': false,
    'bo-suu-tap-2': false,
    'bo-suu-tap': false,
  });

  const handleChange = (title: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [title]: checked,
    }));
  };

  return (
    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto mb-5">
      <CollectionItem
        title="Mặc định"
        isChecked={checkedItems['mac-dinh']}
        onChange={(checked) => handleChange('mac-dinh', checked)}
      />
      <CollectionItem
        title="Bộ sưu tập 0"
        imageSrc="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
        isChecked={checkedItems['bo-suu-tap-0']}
        onChange={(checked) => handleChange('bo-suu-tap-0', checked)}
      />
      <CollectionItem
        title="Bộ sưu tập 1"
        imageSrc="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
        isChecked={checkedItems['bo-suu-tap-1']}
        onChange={(checked) => handleChange('bo-suu-tap-1', checked)}
      />
      <CollectionItem
        title="Bộ sưu tập 2"
        imageSrc="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
        isChecked={checkedItems['bo-suu-tap-2']}
        onChange={(checked) => handleChange('bo-suu-tap-2', checked)}
      />
      <CollectionItem
        title="Bộ sưu tập"
        isChecked={checkedItems['bo-suu-tap']}
        onChange={(checked) => handleChange('bo-suu-tap', checked)}
      />
    </div>
  );
};

export const ModalAddCollection = ({
  open,
  handleCancel,
  openCreate,
}: {
  open: boolean;
  handleCancel: () => void;
  openCreate: () => void;
}) => {
  return (
    <Modal
      title="Thêm vào bộ sưu tập"
      open={open}
      onCancel={handleCancel}
      onClose={handleCancel}
      width={530}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />

      <CollectionList />

      <Button
        type="primary"
        size="large"
        block
        onClick={() => {
          handleCancel();
          openCreate();
        }}
      >
        Tạo bộ sưu tập
      </Button>

      <Divider className="bg-background_l dark:bg-background_d my-4" />

      <div className="flex justify-end">
        <Button type="primary" size="large" htmlType="submit">
          Lưu
        </Button>
      </div>
    </Modal>
  );
};
