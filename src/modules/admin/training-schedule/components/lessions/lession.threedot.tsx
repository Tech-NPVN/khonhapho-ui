import { ModalClassMember } from '@/common/modal';
import { ModalLessionForm } from '@/common/modal/modal-lession.form';
import { DownLoadIcon, EyeIcon, PenIcon, ThreeDotIcon, TrashIcon } from '@/components/icons';
import { Popover } from 'antd';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { LessionType } from './types';

const demo: LessionType = {
  name: 'Đào tạo học viên mới',
  content: 'Cách bán nhà hiệu quả dành cho người mới',
  author: 'TP Nguyễn Kim Ngân',
  id: '1234',
  created_at: new Date(Date.now()).toISOString(),
  updated_at: new Date(Date.now()).toISOString(),
};
type ClassInformationTypes = {
  value?: LessionType;
  state?: 'create' | 'update' | 'view';
};
const Content = ({
  viewClickEvent,
  deleteClickEvent,
  memberClickEvent,
  updateClickEvent,
}: {
  viewClickEvent?: () => void;
  deleteClickEvent?: () => void;
  memberClickEvent?: () => void;
  updateClickEvent?: () => void;
}) => {
  return (
    <>
      <div className=" min-w-56 sm:min-w-48 min-h-32 border-t dark:border-t-0 border-black/5 border-0 border-solid dark:border-divider_d bg-white dark:bg-background_d shadow-md dark:shadow-sm dark:shadow-white/20 dark:border-white/5 rounded-lg flex flex-col py-2 px-1 z-[99999]">
        <div
          className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
          onClick={() => {
            viewClickEvent?.();
            console.log('viewClickEvent');
          }}
        >
          <div className="flex justify-center w-4">
            <EyeIcon />
          </div>
          <span className="max-sm:text-base">Xem chi tiết</span>
        </div>
        <div
          className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
          onClick={() => {
            updateClickEvent?.();
          }}
        >
          <div className="flex justify-center w-4">
            <PenIcon />
          </div>
          <span className="max-sm:text-base">Chỉnh sửa</span>
        </div>
        <div
          className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
          onClick={() => {
            memberClickEvent?.();
          }}
        >
          <div className="flex justify-center w-4">
            <DownLoadIcon />
          </div>
          <span className="max-sm:text-base">Tải xuống</span>
        </div>
        <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
          <div className="flex justify-center w-4" onClick={() => deleteClickEvent?.()}>
            <TrashIcon className="fill-red-500" />
          </div>
          <span className="max-sm:text-base text-red-500">Xoá</span>
        </div>
      </div>
    </>
  );
};
const ThreeDotLession = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isShowClassInformationModal, setIsShowClassInformationModal] = useState<boolean>(false);
  const [isShowClassMemberModal, setIsShowClassMemberModal] = useState<boolean>(false);
  const classInformationRef = useRef<ClassInformationTypes>({});
  const buttonRef = useRef<HTMLDivElement>(null);
  useClickAway(buttonRef, () => {
    setTimeout(() => {
      setOpen(false);
    }, 100);
  });
  return (
    <>
      <Popover
        open={open}
        rootClassName="[&_.ant-popover-inner]:!p-0"
        placement="bottomLeft"
        content={
          <Content
            viewClickEvent={() => {
              classInformationRef.current.state = 'view';
              classInformationRef.current.value = demo;
              setIsShowClassInformationModal(true);
              setOpen(false);
            }}
            deleteClickEvent={() => {
              setOpen(false);
            }}
            memberClickEvent={() => {
              setIsShowClassMemberModal(true);
              setOpen(false);
            }}
            updateClickEvent={() => {
              classInformationRef.current.state = 'update';
              classInformationRef.current.value = demo;
              setIsShowClassInformationModal(true);
              setOpen(false);
            }}
          />
        }
        trigger="click"
      >
        <div
          ref={buttonRef}
          className="flex justify-center items-center w-8 h-8 p-1 hover:bg-black/5 rounded dark:hover:bg-divider_d cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <ThreeDotIcon width={16} height={3} />
        </div>
      </Popover>

      <ModalLessionForm
        open={isShowClassInformationModal}
        onClose={() => setIsShowClassInformationModal(false)}
        defaultValue={classInformationRef.current?.value}
        type={classInformationRef.current?.state}
      />
      <ModalClassMember
        open={isShowClassMemberModal}
        onClose={() => setIsShowClassMemberModal(false)}
      />
    </>
  );
};

export { ThreeDotLession };
