import clsx from 'clsx';
import Image from 'next/image';
// 5 ca
interface ImageGridProps {
  images: string[];
}
const Image4 = ({ images }: ImageGridProps) => {
  return (
    <div className="flex flex-wrap gap-[2px]">
      <div className="w-full flex gap-[2px]">
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[0]}
            alt={images[0]}
          />
        </div>
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[1]}
            alt={images[1]}
          />
        </div>
      </div>
      <div className="w-full flex gap-[2px]">
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={400}
            height={400}
            src={images[2]}
            alt={images[2]}
          />
        </div>
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={400}
            height={400}
            src={images[3]}
            alt={images[3]}
          />
        </div>
        {images.length > 4 && (
          <div className="flex-1 aspect-square relative">
            <Image
              className="w-full h-full object-contain z-0"
              width={400}
              height={400}
              src={images[4]}
              alt={images[4]}
            />
            <div
              className={clsx(
                'absolute inset-0 bg-black z-10 opacity-60 flex justify-center items-center',
                images.length <= 5 ? 'hidden' : '',
              )}
            >
              <span className="text-white text-3xl font-bold flex items-center">
                <span className="mt-1 h-5 w-5 flex justify-center items-center">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="white"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </span>
                <span>{images.length - 5}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const Image3 = ({ images }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      <div className="w-8/12 flex">
        <div className="w-full aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={1000}
            height={1000}
            src={images[0]}
            alt={images[0]}
          />
        </div>
      </div>
      <div className="w-4/12 flex flex-wrap overflow-hidden gap-[2px]">
        <div className="w-[calc(100%_-_2px)] aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[1]}
            alt={images[2]}
          />
        </div>
        <div className="w-[calc(100%_-_2px)] aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[2]}
            alt={images[2]}
          />
        </div>
      </div>
    </div>
  );
};
const Image2 = ({ images }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      {images.map((image) => (
        <div className="flex-1 aspect-square" key={image}>
          <Image
            className="w-full h-full object-contain"
            width={1200 / images.length}
            height={1200 / images.length}
            src={image}
            alt={image}
          />
        </div>
      ))}
    </div>
  );
};
const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <>
      {images.length >= 4 && <Image4 images={images} />}
      {images.length == 3 && <Image3 images={images} />}
      {images.length <= 2 && <Image2 images={images} />}
    </>
  );
};

export default ImageGrid;
export type { ImageGridProps };
