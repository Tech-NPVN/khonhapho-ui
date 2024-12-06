import { ThreeDotIcon } from '@/components/icons';

const EventThreeDot = () => {
  return (
    <div>
      <div className="cursor-pointer w-6 h-6 hover:bg-black/5 rounded flex justify-center items-center">
        <ThreeDotIcon className="scale-125" />
      </div>
    </div>
  );
};

export default EventThreeDot;
