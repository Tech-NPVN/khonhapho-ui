import { CUSTOMER_QUESTION_18 } from '@/constants/data';
import { Divider, Modal } from 'antd';

export const ModalCustQuestion = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal
      title="18 Câu truy vấn khách hàng qua cuộc gọi đầu tiên"
      open={open}
      onCancel={handleCancel}
      width={650}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <div
        dangerouslySetInnerHTML={{ __html: CUSTOMER_QUESTION_18 }}
        style={{ fontSize: '15px' }}
      ></div>
    </Modal>
  );
};
