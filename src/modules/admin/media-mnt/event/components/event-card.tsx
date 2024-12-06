import { TextSeeMore } from '@/components/common';
import { BlueEyeIcon, HeartRedIcon } from '@/components/icons';
import { FEEDS_DEMO } from '@/constants/data';
import EventAvatar from './event-avatar';
import EventBanner from './event-banner';
import EventMedia from './event-media';

/**(Admin) Quản lý truyền thông/Sự kiện */
const EventCard = () => {
  return (
    <div className="w-full bg-white rounded-lg p-4">
      <EventAvatar />
      <div>
        <TextSeeMore _html={FEEDS_DEMO.deals.content} maxLine={5} />
      </div>
      <EventBanner src="/images/banner.png" />
      <div className="my-3">Ảnh sự kiện</div>
      <EventMedia />
      <div className="flex gap-2 mt-3 items-center">
        <BlueEyeIcon />2
        <HeartRedIcon />2
      </div>
    </div>
  );
};

export default EventCard;
