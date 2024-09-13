import ChatPreviewComponent from '@/components/chat/chat-preview';
import { CHAT_PREVIEW_SAMPLE } from '@/constants/data';

function LayoutClientGroupChat() {
  return (
    <div className="w-[250px] h-screen relative lg:flex hidden">
      <div className="w-[250px] fixed top-[68px] px-4">
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
  );
}

export default LayoutClientGroupChat;
