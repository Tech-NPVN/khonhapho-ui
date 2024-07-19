'use client';
import ChatPreviewComponent from '@/components/chat/chat-preview';
import FeedHome from '@/components/feed/feed.home';
import FeedInterested from '@/components/feed/feed.interested';
import { TabList, TabPane } from '@/components/reuse/data-display';
import { CHAT_PREVIEW_SAMPLE } from '@/constants/data';
const TABS = ['Bản tin', 'Bạn quan tâm'];

const Home = () => {
  return (
    <div className="flex w-full justify-between">
      <div className="w-[calc(100%_-_406px)] ms-[60px] flex justify-center">
        <div className="w-full">
          <div className="mt-4 w-full">
            <TabList
              items={TABS}
              name="tab-list-1"
              defaultIndex={0}
              classNames={{
                tab: 'py-2 text-bold uppercase',
                tabActive: 'bg-[green]',
                textActive: 'text-white',
              }}
              className="bg-white shadow-sm"
            />
          </div>
          <div className="mt-6 w-full">
            <TabPane name="tab-list-1" tabIndex={0}>
              <FeedHome />
            </TabPane>
            <TabPane name="tab-list-1" tabIndex={1}>
              <FeedInterested />
            </TabPane>
          </div>
        </div>
      </div>
      <div className="w-[286px] h-full relative">
        <div className="w-full fixed top-[68px]">
          <div className="w-full">
            <h5 className="mt-3 font-semibold text-black text-sm dark:text-[#daefff]">
              Người liên hệ
            </h5>
            <div className="mt-3">
              <div className="flex gap-3 flex-col">
                {CHAT_PREVIEW_SAMPLE.users.map((chat, index) => (
                  <ChatPreviewComponent
                    key={'-' + index}
                    chat={{
                      user: {
                        name: chat.user?.name,
                        avatar: chat.user?.avatar,
                      },
                      online: chat.online,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <h5 className="mt-3 font-semibold text-black text-sm dark:text-[#daefff]">
              Nhóm chat mặc định
            </h5>
            <div className="mt-3">
              <div className="flex gap-3 flex-col">
                {CHAT_PREVIEW_SAMPLE.groups_default.map((chat, index) => (
                  <ChatPreviewComponent
                    key={'-' + index}
                    chat={{
                      user: {
                        name: chat.user?.name,
                        avatar: chat.user?.avatar,
                      },
                      online: chat.online,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <h5 className="mt-3 font-semibold text-black text-sm dark:text-[#daefff]">Nhóm chat</h5>
            <div className="mt-3">
              <div className="flex gap-3 flex-col">
                {CHAT_PREVIEW_SAMPLE.groups.map((chat, index) => (
                  <ChatPreviewComponent
                    key={'-' + index}
                    chat={{
                      user: {
                        name: chat.user?.name,
                        avatar: chat.user?.avatar,
                      },
                      online: chat.online,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
