import { Divider, Modal } from 'antd';

export const ModalUpdateProfile = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal
      title="Chỉnh sửa hồ sơ"
      open={open}
      onCancel={handleCancel}
      width={450}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
    </Modal>
  );
};
