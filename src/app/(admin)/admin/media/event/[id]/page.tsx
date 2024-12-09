import ViewMediaIndex from '@/modules/admin/media-mnt/photo-gallery/details';

type Props = {
  params: { id: string };
};

/**
 * (Admin) Trang Xem chi tiết 1 sự kiện
 */
const ViewMediaPage = ({ params }: Props) => {
  return <ViewMediaIndex id={params.id} />;
};

export default ViewMediaPage;
