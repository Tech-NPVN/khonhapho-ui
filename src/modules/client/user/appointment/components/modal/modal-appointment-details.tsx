import { CommentInput } from '@/components/reuse/data-display';
import { DATE_TIME_FORMAT } from '@/constants/data';
import { Avatar, Divider, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

export const ModalAppointmentĐetails = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal
      title="Chi tiết"
      open={open}
      onCancel={handleCancel}
      onClose={handleCancel}
      width={670}
      footer={null}
      centered
      classNames={{ content: 'px-0 py-5', header: 'max-md:px-3 px-6' }}
    >
      <Divider className="bg-background_l dark:bg-background_d mt-4 mb-0" />

      <div className="bg-primary_color_l dark:bg-primary_color_d max-md:px-3 px-6 py-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Avatar
              src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="flex-shrink-0"
            />
            <h3 className="mb-0">Nhà Phố Việt Nam</h3>
          </div>
          <Tag color="green">Đã xác nhận</Tag>
        </div>

        <p className="mb-2">
          Vào lúc:{' '}
          <strong className="font-medium">{dayjs(new Date()).format(DATE_TIME_FORMAT)}</strong>
        </p>

        <p className="mb-0">
          Tại địa chỉ:{' '}
          <strong className="font-medium">
            16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886
          </strong>
        </p>

        <div className="flex items-center gap-2 mb-2">
          <span>Mô tả: </span>
          {['#NPVN', '#NP781', '#NP92193'].map((item) => (
            <span
              className="text-link_text_l cursor-pointer hover:underline lowercase underline"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mb-0">Ghi chú: ...</p>
      </div>

      <div className="h-[400px] bg-background_l dark:bg-background_d py-3 max-md:px-3 px-6"></div>

      <div className="flex justify-between items-center gap-3 pt-4 max-md:px-3 px-6">
        <Image
          width={40}
          height={40}
          src="/images/user-default.jpg"
          alt=""
          className="rounded-full"
        />
        <CommentInput />
      </div>
    </Modal>
  );
};
