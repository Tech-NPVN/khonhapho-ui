'use client';

import { Empty, Modal } from 'antd';

type ConsignmentReplyModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ConsignmentReplyModal = ({ open, onClose }: ConsignmentReplyModalProps) => {
  return (
    <Modal
      title="Phản hồi"
      open={open}
      onCancel={onClose}
      onClose={onClose}
      width={600}
      footer={null}
    >
      <Empty description="Chưa có phản hồi!" className="my-5" />
    </Modal>
  );
};
