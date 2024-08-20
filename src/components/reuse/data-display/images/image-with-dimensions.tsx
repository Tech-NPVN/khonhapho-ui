import clsx from 'clsx';
import { useEffect, useState } from 'react';

const ImageWithDimensions = ({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
    if (src) img.src = src;
  }, [src]);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={clsx(
        dimensions.width > dimensions.height
          ? 'w-full h-auto object-contain'
          : 'h-full object-cover w-auto',
        className,
      )}
      {...props}
    />
  );
};
export { ImageWithDimensions };
