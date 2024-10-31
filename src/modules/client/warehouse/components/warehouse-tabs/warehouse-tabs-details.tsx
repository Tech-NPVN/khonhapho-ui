import { ChangeIcon } from '@/components/icons';
import { FeedDetail } from '@/components/reuse/data-display/';
import { SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import { HOME_POSTS } from '@/modules/client/home/Components/feed/data.sample';
import { Select } from 'antd';

const WarehouseTabsDetailsFilter = () => {
  return (
    <div className="flex justify-end">
      <Select
        size="large"
        className="w-72"
        suffixIcon={<ChangeIcon />}
        options={SELECT_FILTER_WAREHOUSE}
        defaultValue="tin-noi-bat"
      />
    </div>
  );
};
HOME_POSTS;
const WarehouseTabsDetails = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="rounded-lg bg-primary_color_l dark:bg-primary_color_d">
          <FeedDetail className="max-w-none" type="warehouse" post={HOME_POSTS[0]} />
        </div>
      ))}
    </div>
  );
};

export { WarehouseTabsDetails, WarehouseTabsDetailsFilter };
