import { FEEDS_DEMO } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { useRouter } from 'next/navigation';
import { AdminFeedsCard } from '../../card';

const DealsRejectIndex = () => {
  const router = useRouter();
  const handleHashTagClick = (tag: string) => {
    router.push(Routes.ActivityNewsDeals + '?hashtag=' + tag);
  };
  const handleApprove = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col gap-3 mb-4">
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
    </div>
  );
};

export default DealsRejectIndex;
