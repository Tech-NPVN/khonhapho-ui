import { ChangeIcon } from '@/components/icons';
import PostDetail from '@/components/reuse/data-display/post';
import { SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import { Select } from 'antd';

const WarehouseTabsDetailsFilter = () => {
  return (
    <div className="flex justify-end">
      <Select
        size="large"
        className="w-72"
        suffixIcon={<ChangeIcon />}
        options={SELECT_FILTER_WAREHOUSE}
        defaultValue="hot-news"
      />
    </div>
  );
};

const WarehouseTabsDetails = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="rounded-lg bg-primary_color_l dark:bg-primary_color_d">
          <PostDetail
            isWarehouse
            post={{
              images: ['/images/post-1.jpeg', '/images/post-2.jpeg', '/images/post-3.jpeg', '/images/post-4.jpeg'],
            }}
          />
        </div>
      ))}
    </div>
  );
};

export { WarehouseTabsDetailsFilter, WarehouseTabsDetails };
