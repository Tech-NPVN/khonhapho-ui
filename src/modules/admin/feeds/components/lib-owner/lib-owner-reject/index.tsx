import { FEEDS_DEMO } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { AdminFeedsCard } from '../../card';
import { useRouter } from 'next-nprogress-bar';

const LibOwnerRejectIndex = () => {
  const router = useRouter();
  const handleHashTagClick = (tag: string) => {
    router.push(Routes.LibOwner + '?hashtag=' + tag);
  };
  const handleApprove = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col gap-3 mb-4">
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
      <AdminFeedsCard
        status="rejected"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onApprove: handleApprove,
        }}
      />
    </div>
  );
};

export default LibOwnerRejectIndex;
