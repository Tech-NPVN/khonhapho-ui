import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const UserProfileDynamic = dynamic(
  () => import('@/modules/client/user/profile').then((res) => res.UserProfileIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const ProfilePage = () => {
  return <UserProfileDynamic />;
};

export default ProfilePage;
