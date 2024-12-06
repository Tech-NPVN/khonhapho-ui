import { TextSeeMore } from '@/components/common';
import { FEEDS_DEMO } from '@/constants/data';
import EventAvatar from './event-avatar';

/**(Admin) Quản lý truyền thông/Sự kiện */
const EventCard = () => {
  return (
    <div className="w-full bg-white rounded-lg p-4">
      <EventAvatar />
      <div>
        <TextSeeMore _html={FEEDS_DEMO.deals.content} maxLine={5} />
      </div>
    </div>
  );
};

export default EventCard;
