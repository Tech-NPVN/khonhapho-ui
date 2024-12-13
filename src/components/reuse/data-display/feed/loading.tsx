import { Skeleton } from 'antd';

const FeedLoading = () => {
  return (
    <div className="bg-white dark:bg-primary_color_d w-full sm:rounded-lg rounded-none py-4 max-w-[864px">
      <div className="w-full px-4">
        <div className="flex gap-3">
          <Skeleton.Avatar size={52} active />
          <div className="flex flex-col">
            <Skeleton className="w-96" paragraph={{ rows: 1 }} title={false} active />
            <Skeleton className="w-64" paragraph={{ rows: 1 }} title={false} active />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-col">
            <Skeleton className="w-3/4" title={false} active />
            <Skeleton className="w-4/5" title={false} active />
          </div>
          <div className="flex gap-3 mt-2">
            <Skeleton.Button className="w-20 h-5" active />
            <Skeleton.Button className="w-20 h-5" active />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedLoading;
