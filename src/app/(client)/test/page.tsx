import { MediaGallery } from '@/components/common/gallery';

const images = [
  '/images/post-1.jpeg',
  '/images/post-2.jpeg',
  '/images/post-3.jpeg',
  '/images/post-4.jpeg',
  '/images/banner.png',
  '/images/post-6.jpeg',
];

const videos = ['/videos/house-preview.mp4'];
function page() {
  return (
    <div className="p-6">
      <h1>Test</h1>
      <div className="flex gap-5 justify-center">
        <MediaGallery
          mode="slider"
          media={[...images, ...videos].map((media, i) => ({
            src: media,
            type: i >= images.length ? 'video' : 'image',
          }))}
        />
      </div>
      <div>{/* <Video src={videos[0]} /> */}</div>
    </div>
  );
}

export default page;
