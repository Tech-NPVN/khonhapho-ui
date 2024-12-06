import ViewMediaIndex from '@/modules/admin/media-mnt/photo-gallery/details';

type Props = {
  params: { id: string };
};

/**
 * (Admin) Trang Xem chi tiết 1 thư viện hình ảnh
 */
const ViewMediaPage = ({ params }: Props) => {
  return <ViewMediaIndex id={params.id} />;
};

export default ViewMediaPage;
