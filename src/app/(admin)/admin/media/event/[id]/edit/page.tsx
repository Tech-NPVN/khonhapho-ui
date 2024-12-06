import EventForm from '@/modules/admin/media-mnt/event/components/event-form';

const UpdateMediaGalleryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <EventForm id={id as string} />
    </>
  );
};

export default UpdateMediaGalleryPage;
