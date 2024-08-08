'use client';
import ChatPreviewComponent from '@/components/chat/chat-preview';
import FeedHome from '@/components/feed/feed.home';
import FeedInterested from '@/components/feed/feed.interested';
import { Segmented } from '@/components/reuse/data-display';
import WarehouseDetailsPopup from '@/components/reuse/data-display/popup/warehouse-details';
import { CHAT_PREVIEW_SAMPLE } from '@/constants/data';
import { useState } from 'react';

const Home = () => {
  const [first, setFirst] = useState(false);
  return (
    <div className="flex w-full justify-between">
      <div className="w-[calc(100%_-_286px)] flex justify-center">
        <div className="w-full max-w-[800px]">
          <div
            className="hidden"
            onClick={() => {
              setFirst(true);
            }}
          >
            Click
          </div>
          <div className="mt-4 w-full">
            <Segmented
              options={[
                {
                  label: 'Trang chủ',
                  component: <FeedHome />,
                  value: 'home',
                },
                {
                  label: 'Bạn quan tâm',
                  component: <FeedInterested />,
                  value: 'interested',
                },
              ]}
              size="middle"
              block
            />
          </div>
        </div>
      </div>
      <div className="w-[286px] h-full relative flex">
        <div className="flex-1 fixed top-[68px]">
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
      {first && (
        <WarehouseDetailsPopup
          setOpen={setFirst}
          open
          post={{
            content: 'aaaa',
            images: [
              '/images/post-1.jpeg',
              '/images/post-2.jpeg',
              '/images/post-3.jpeg',
              '/images/post-4.jpeg',
              '/images/post-5.jpeg',
            ],
            videos: [
              '/videos/house-preview.mp4',
              'https://www.taxmann.com/emailer/images/CompaniesAct.mp4',
              'https://www.taxmann.com/emailer/images/Incometax.mp4',
            ],
          }}
        />
      )}
    </div>
  );
};

export default Home;
