import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const TrainingScheduleIndex = dynamic(
  () =>
    import('@/modules/admin/training-schedule/components').then((res) => res.TrainingScheduleIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const TrainingSchedulePage = () => {
  return <TrainingScheduleIndex />;
};

export default TrainingSchedulePage;
