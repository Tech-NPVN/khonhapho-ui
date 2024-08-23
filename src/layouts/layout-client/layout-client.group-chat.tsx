import ChatPreviewComponent from '@/components/chat/chat-preview';
import { CHAT_PREVIEW_SAMPLE } from '@/constants/data';

function LayoutClientGroupChat() {
  return (
    <div className="w-[250px] h-full relative lg:flex hidden">
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
  );
}

export default LayoutClientGroupChat;
