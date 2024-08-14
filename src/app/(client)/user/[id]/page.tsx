import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const UserProfileOtherDynamic = dynamic(
  () => import('@/modules/client/user/profile').then((res) => res.UserProfileIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const UserProfileOther = ({ params }: Readonly<{ params: { id: string } }>) => {
  return <UserProfileOtherDynamic id={params.id} />;
};

export default UserProfileOther;
