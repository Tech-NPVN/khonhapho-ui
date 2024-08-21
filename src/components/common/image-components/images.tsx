import Image from 'next/image';
import { ImageComponentProps } from './types';

const MessengerImage = ({ className }: ImageComponentProps) => {
  return (
    <div className="w-full aspect-square">
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
    <div className="w-full aspect-square">
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

export { MessengerImage, MessengerKNPImage };
