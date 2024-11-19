'use client';
import { FEEDS_DEMO } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { useRouter } from 'next-nprogress-bar';
import { AdminFeedsCard } from '../../card';

const DealsPendingIndex = () => {
  const router = useRouter();
  const handleHashTagClick = (tag: string) => {
    router.push(Routes.ActivityNewsDeals + '?hashtag=' + tag);
  };
  const handleApprove = (id: string) => {
    console.log(id);
  };
  const handleReject = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col gap-3 mb-4">
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
      <AdminFeedsCard
        status="pending"
        post={FEEDS_DEMO.deals}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
          onReject: handleReject,
        }}
      />
    </div>
  );
};

export default DealsPendingIndex;
