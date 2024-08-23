import { MessengerImage, MessengerKNPImage } from '@/components/common/image-components';
import { AlarmIcon, BookmarkOutlineIcon, CopyDocumentIcon, PhoneIcon } from '@/components/icons';
import { Button, Divider, Flex, Image, Modal } from 'antd';
import Link from 'next/link';
import { memo } from 'react';

const HouseItem = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="relative rounded-xl overflow-hidden">
        <Image width={100} height={100} src="/images/post-2.jpeg" alt="" />
        <p className="absolute bottom-0 left-0 right-0 bg-color_l text-center text-sm mb-0 text-primary_color_l">
          Hạ chào
        </p>
      </div>
      <div className="flex-1">
        <p className="mb-0 text-sm line-clamp-3">
          11A Cao Bá Quát 46 5 5.2 29 tỷ Ba Đình Hà Nội HĐ TP Thái Tài NPHN-3369, 0384628527, X3,
          nguồn ĐT10, 25 đến 35, #ĐC2
        </p>

        <div className="flex items-center gap-2">
          {['#NPVN', '#NP781', '#NP92193'].map((item) => (
            <span className="text-link_text_l cursor-pointer hover:underline lowercase" key={item}>
              {item}
            </span>
          ))}
        </div>

        <div className="flex justify-between gap-2 mt-3">
          <div className="flex items-center gap-2">
            <Link href="/Messenger/id">
              <div className="w-4">
                <MessengerKNPImage />
              </div>
            </Link>
            <a href="https://www.facebook.com/messages/t/100010636721382" target="_blank">
              <div className="w-4">
                <MessengerImage />
              </div>
            </a>
            <a href="https://zalo.me/0389619050" target="_blank" className="">
              <Image width={15} height={15} src={'/images/zalo.png'} alt="/images/zalo.png" />
            </a>
            <a href="tel:0389619050" className="h-5">
              <PhoneIcon />
            </a>
          </div>

          <div className="flex items-center gap-1">
            <Button icon={<AlarmIcon />} type="text" />
            <Button icon={<BookmarkOutlineIcon height={16} width={16} />} type="text" />
            <Button icon={<CopyDocumentIcon />} type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalVisitedHouse = memo(
  ({ open, handleCancel }: { open: boolean; handleCancel: () => void }) => {
    return (
      <Modal
        title="Căn đã dẫn đi xem"
        open={open}
        onCancel={handleCancel}
        onClose={handleCancel}
        width={550}
        footer={null}
        centered
      >
        <Divider className="bg-background_l dark:bg-background_d my-4" />

        <Flex vertical gap={16} className="pb-40">
          {Array.from({ length: 2 }).map((_, i) => (
            <HouseItem key={i} />
          ))}
        </Flex>
      </Modal>
    );
  },
);

ModalVisitedHouse.displayName = ModalVisitedHouse.name;
