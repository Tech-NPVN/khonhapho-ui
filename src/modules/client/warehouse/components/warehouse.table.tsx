import { ChangeIcon, EyeSlashIcon } from '@/components/icons';
import { Button, Select } from 'antd';

export const WarehouseTable = () => {
  return (
    <>
      <div className="flex justify-between">
        <Button
          icon={<EyeSlashIcon />}
          size="large"
          className="dark:bg-background_d dark:border-0 dark:text-primary_text_d px-5 py-2"
        >
          Ẩn cột
        </Button>
        <Select placeholder="Tin nổi bật" size="large" className="w-[320px]" suffixIcon={<ChangeIcon />} />
      </div>

      <div></div>
    </>
  );
};
