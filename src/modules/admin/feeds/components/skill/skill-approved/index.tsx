import { FEEDS_DEMO } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { AdminFeedsCard } from '../../card';
import { useRouter } from 'next-nprogress-bar';

const SkillApprovedIndex = () => {
  const router = useRouter();
  const handleHashTagClick = (tag: string) => {
    router.push(Routes.ShareSkill + '?hashtag=' + tag);
  };
  const handleDelete = (id: string) => {
    console.log(id);
  };
  return (
    <div className="flex flex-col gap-3 mb-4">
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
      <AdminFeedsCard
        status="approved"
        post={FEEDS_DEMO.skill}
        events={{
          onHashTagClick: handleHashTagClick,
          onDelete: handleDelete,
        }}
      />
    </div>
  );
};

export default SkillApprovedIndex;
