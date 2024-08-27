import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const UserCollectionDynamic = dynamic(
  () => import('@/modules/client/user/collection').then((res) => res.UserCollectionIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const CollectionPage = () => {
  return <UserCollectionDynamic />;
};

export default CollectionPage;
