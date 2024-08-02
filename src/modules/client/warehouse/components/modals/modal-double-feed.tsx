import { SearchIcon } from '@/components/icons';
import { Empty, Input, Modal } from 'antd';

export const ModalDoubleFeed = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal title="Tin của bạn" open={open} onCancel={handleCancel} width={500} footer={null}>
      <div className="flex justify-end my-3">
        <Input
          size="large"
          placeholder="Nhập đc, SĐT, seri sổ"
          prefix={<SearchIcon className="w-4 h-4" />}
          className="w-[300px] border-0 shadow-btn dark:bg-background_d rounded-xl"
        />
      </div>
      <Empty description="Không có kết quả nào trên hệ thống!" className="mt-5 mb-2" />
    </Modal>
  );
};
