import BlogForm from '@/modules/admin/media-mnt/blog/components/blog-form';

const UpdateMediaGalleryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <BlogForm id={id as string} />
    </>
  );
};

export default UpdateMediaGalleryPage;
