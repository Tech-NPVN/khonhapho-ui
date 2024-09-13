import clsx from 'clsx';
import Image from 'next/image';
import { ImageComponentProps } from './types';

const MessengerImage = ({ className }: ImageComponentProps) => {
  return (
    <div className={clsx('w-full aspect-square flex justify-center items-center', className)}>
      <Image
        className="w-full h-full object-contain"
        width={0}
        height={0}
        src={'/images/messenger.png'}
        alt={'/images/messenger.png'}
        unoptimized
      />
    </div>
  );
};
const MessengerKNPImage = ({ className }: ImageComponentProps) => {
  return (
    <div className={clsx('w-full aspect-square flex justify-center items-center', className)}>
      <Image
        className="w-full h-full object-contain"
        width={0}
        height={0}
        src={'/images/messenger-knp.png'}
        alt={'/images/messenger-knp.png'}
        unoptimized
      />
    </div>
  );
};
const ZaloImage = ({ className }: ImageComponentProps) => {
  return (
    <div className={clsx('w-full aspect-square flex justify-center items-center', className)}>
      <Image
        className="w-full h-full object-contain"
        width={0}
        height={0}
        src={'/images/zalo.png'}
        alt={'/images/zalo.png'}
        unoptimized
      />
    </div>
  );
};
const PhoneImage = ({ className }: ImageComponentProps) => {
  return (
    <div className={clsx('w-full aspect-square flex justify-center items-center', className)}>
      <Image
        className="w-full h-full object-contain"
        width={0}
        height={0}
        src={'/images/phone.png'}
        alt={'/images/phone.png'}
        unoptimized
      />
    </div>
  );
};
const FacebookImage = ({ className }: ImageComponentProps) => {
  return (
    <div className={clsx('w-full aspect-square flex justify-center items-center', className)}>
      <Image
        className="w-full h-full object-contain"
        width={0}
        height={0}
        src={'/images/facebook.png'}
        alt={'/images/facebook.png'}
        unoptimized
      />
    </div>
  );
};
export { FacebookImage, MessengerImage, MessengerKNPImage, PhoneImage, ZaloImage };
