import { Divider, Modal } from 'antd';

export const ModalCustCreate = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal title="Thêm mới" open={open} onCancel={handleCancel} width={650} footer={null} centered>
      <Divider className="bg-background_l dark:bg-background_d my-4" />
    </Modal>
  );
};
