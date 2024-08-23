import { Segmented } from '@/components/reuse/data-display';
import { FeedBanner, FeedHome, FeedInterested } from './feed';
import { ListShortcuts } from './shortcuts';

const HomeIndex = () => {
  return (
    <div className="flex w-full justify-between gap-4">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl sm:px-2 md:px-4">
          <div className="my-4 w-[calc(100%-32px)] mx-auto sm:hidden">
            <ListShortcuts />
          </div>
          <div className="w-full block min-[640px]:hidden">
            <FeedBanner />
          </div>
          <div className="mt-4 w-full">
            <Segmented
              options={[
                {
                  label: 'Bản tin',
                  component: <FeedHome />,
                  value: 'feeds',
                },
                {
                  label: 'Bạn quan tâm',
                  component: <FeedInterested />,
                  value: 'interested',
                },
              ]}
              size="middle"
              className="min-[640px]:w-full w-[calc(100%_-_24px)] my-auto mx-3 min-[640px]:mx-0"
              block
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomeIndex };
