import PhotoGalleryForm from '@/modules/admin/media-mnt/photo-gallery/form/photo-form';

const UpdateMediaGalleryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <PhotoGalleryForm id={id as string} />
    </>
  );
};

export default UpdateMediaGalleryPage;
