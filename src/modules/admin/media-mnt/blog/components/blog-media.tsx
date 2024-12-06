import { MediaGallery } from '@/components/common/gallery';

const ImageDemo = [
  '/images/post-1.jpeg',
  '/images/post-2.jpeg',
  '/images/post-3.jpeg',
  '/images/post-4.jpeg',
  '/images/post-5.jpeg',
  '/images/post-6.jpeg',
];

const BlogMedia = () => {
  return (
    <div>
      <MediaGallery
        media={ImageDemo.map((image) => ({ src: image, type: 'image' }))}
        mode="grid"
        configs={{
          grid: {
            maxMediaDisplay: 3,
            imagePerRow: 3,
          },
        }}
      />
    </div>
  );
};

export default BlogMedia;
