import { WAREHOUSE_REASON_CONTENT_SAMPLE } from '@/constants/data';
import { Divider, Modal } from 'antd';

export const ModalReasonDecs = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal
      title="Lý do không lọc Diện tích/Mặt tiền/Hướng"
      open={open}
      onCancel={handleCancel}
      width={650}
      footer={null}
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <div
        dangerouslySetInnerHTML={{ __html: WAREHOUSE_REASON_CONTENT_SAMPLE }}
        style={{ fontSize: '15px' }}
      ></div>
    </Modal>
  );
};
