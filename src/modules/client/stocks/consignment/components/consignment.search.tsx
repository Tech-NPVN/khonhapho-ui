import { FilterIcon, ReloadRightIcon, SearchIcon } from '@/components/icons';
import { SELECT_PROPERTY_TYPE } from '@/constants/data';
import { Button, Divider, Flex, Input, Modal, Select } from 'antd';
import { memo, useState } from 'react';

export const ModalConsignmentSearch = memo(
  ({ open, handleCancel }: { open: boolean; handleCancel: () => void }) => {
    return (
      <Modal title="Bộ lọc" open={open} onCancel={handleCancel} width={500} footer={null} centered>
        <Divider className="bg-background_l dark:bg-background_d my-4" />

        <Flex vertical gap={16}>
          <Select
            placeholder="Loại hình"
            size="large"
            className="w-full"
            options={[{ name: 'Tất cả', code: 'tat-ca' }, ...SELECT_PROPERTY_TYPE]}
            fieldNames={{ label: 'name', value: 'code' }}
          />
          <Select
            placeholder="Tỉnh/Thành phố"
            size="large"
            className="w-full"
          />
          <Select
            placeholder="Quận/Huyện"
            size="large"
            className="w-full"
            disabled
          />

          <Select placeholder="Khoảng giá" size="large" className="w-full" />
          <Select
            placeholder="Khoảng diện tích"
            size="large"
            className="w-full"
          />

          <Button
            icon={<ReloadRightIcon />}
            size="large"
            className="w-full bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d mt-2"
          >
            Đặt lại
          </Button>
        </Flex>
      </Modal>
    );
  },
);

ModalConsignmentSearch.displayName = ModalConsignmentSearch.name;

export const ConsignmentSearch = memo(() => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-4 mt-5">
        <Input
          size="large"
          placeholder="Nhập nội dung tìm kiếm"
          suffix={<SearchIcon className="w-4 h-4" />}
          className="w-full max-lg:hidden flex"
        />
        <div className="flex items-center gap-3 lg:hidden">
          <Button
            icon={<FilterIcon />}
            type="text"
            size="large"
            className="shadow-btn rounded-xl dark:bg-background_d"
            onClick={() => setOpenFilter(true)}
          >
            Lọc
          </Button>
          <Input
            size="large"
            placeholder="Nhập nội dung tìm kiếm"
            suffix={<SearchIcon className="w-4 h-4" />}
            className="w-full"
          />
        </div>
        <Select
          placeholder="Loại hình"
          size="large"
          className="w-full max-lg:hidden block"
          options={[{ name: 'Tất cả', code: 'tat-ca' }, ...SELECT_PROPERTY_TYPE]}
          fieldNames={{ label: 'name', value: 'code' }}
        />
        <Select placeholder="Tỉnh/Thành phố" size="large" className="w-full max-lg:hidden block" />
        <Select
          placeholder="Quận/Huyện"
          size="large"
          className="w-full max-lg:hidden block"
          disabled
        />

        <Select placeholder="Khoảng giá" size="large" className="w-full max-lg:hidden block" />
        <Select
          placeholder="Khoảng diện tích"
          size="large"
          className="w-full max-lg:hidden block"
        />

        <Button
          icon={<ReloadRightIcon />}
          size="large"
          className="w-full max-lg:hidden flex bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d mt-2"
        >
          Đặt lại
        </Button>
      </div>

      <ModalConsignmentSearch open={openFilter} handleCancel={() => setOpenFilter(false)} />
    </>
  );
});

ConsignmentSearch.displayName = ConsignmentSearch.name;
