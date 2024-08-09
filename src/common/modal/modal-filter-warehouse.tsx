import { FilterIcon, ReloadDownIcon } from '@/components/icons';
import { SelectAddon } from '@/components/reuse/data-entry';
import { SELECT_PRICE_UNIT } from '@/constants/data';
import { Button, Divider, Flex, InputNumber, Modal, Select } from 'antd';

export const ModalFilterWarehouse = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  return (
    <Modal title="Bộ lọc" open={open} onCancel={handleCancel} width={500} footer={null} centered>
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Flex vertical gap={16}>
        <Select placeholder="Hiện trạng" className="w-full" />
        <Select placeholder="Loại hình" className="w-full" />
        <Select placeholder="Tỉnh/Thành phố" className="w-full" />
        <Select placeholder="Quận/Huyện" className="w-full" disabled />
        <Select placeholder="Đường phố" className="w-full" disabled />

        <InputNumber
          addonAfter={
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
          }
          type="number"
        
          placeholder="Giá tối thiểu"
          className="w-full bg-transparent"
        />

        <InputNumber
          addonAfter={
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
          }
          type="number"
        
          placeholder="Giá tối đa"
          className="w-full bg-transparent"
        />

        <Select placeholder="Khoảng giá" className="w-full" />
        <Select placeholder="Đặc điểm BĐS" className="w-full" />
        <Select placeholder="Dự án/Chung cư" className="w-full" />
        <Select placeholder="Chi nhánh" className="w-full" />
        <Select placeholder="Phòng ban" className="w-full" disabled />
        <Select placeholder="Nhập tên tài khoản" className="w-full" disabled />

        <Button
          block
          type="primary"
          icon={<FilterIcon className="[&>path]:stroke-primary_color_l" />}
          className="mt-5 py-4"
        >
          Lọc
        </Button>

        <Button block type="default" icon={<ReloadDownIcon />} className="py-4">
          Đặt lại
        </Button>
      </Flex>
    </Modal>
  );
};
