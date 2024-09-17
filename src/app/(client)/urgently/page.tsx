'use client';

import { ModalUrgently, ModalUrgentlyType } from '@/common/modal';
import PostDetail from '@/components/reuse/data-display/post';
import Image from 'next/image';
import { useState } from 'react';

const UrgentlyPage = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<ModalUrgentlyType>();
  return (
    <>
      <div className="w-full sm:px-3">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mt-6 bg-primary_color_l dark:bg-primary_color_d w-full rounded-lg shadow p-4">
            <h1 className="font-semibold text-xl dark:text-primary_text_d_2 text-primary_text_l ">
              Tạo bài viết
            </h1>
            <div className="flex mb-2 mt-6">
              <div className="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden">
                <Image
                  className="w-full object-contain"
                  width={40}
                  height={40}
                  src={'/images/user-default.jpg'}
                  alt="..."
                />
              </div>
              <div
                className="ms-2 px-3 rounded-2xl border-none focus:outline-none flex-1 bg-background_l dark:bg-background_d flex items-center cursor-pointer text-text dark:text-secondary_text_d text-secondary_text_l select-none"
                onClick={() => {
                  setIsOpenForm(true);
                  setIsUpdate(false);
                  setDefaultValue({
                    area: '',
                    city: undefined,
                    districts: undefined,
                    price: '',
                    request: '',
                  });
                }}
              >
                Bắt đầu một bài viết...
              </div>
            </div>
          </div>
          <div className="w-full mt-6 bg-white h-10 dark:bg-primary_color_d rounded-lg shadow-sm flex items-center">
            <div className="w-full flex">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg
                  width={25}
                  height={25}
                  viewBox="0 0 25 25"
                  className="fill-black/50 dark:fill-[#daefff]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.1956 15.9683L22.5 21.2727L21.1145 22.6582L15.8101 17.3538L17.1956 15.9683Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.3174 4.61762C7.52983 4.61762 4.45942 7.68804 4.45942 11.4756C4.45942 15.2631 7.52983 18.3336 11.3174 18.3336C15.1049 18.3336 18.1754 15.2631 18.1754 11.4756C18.1754 7.68804 15.1049 4.61762 11.3174 4.61762ZM2.5 11.4756C2.5 6.60588 6.44768 2.6582 11.3174 2.6582C16.1871 2.6582 20.1348 6.60588 20.1348 11.4756C20.1348 16.3453 16.1871 20.293 11.3174 20.293C6.44768 20.293 2.5 16.3453 2.5 11.4756Z"
                  />
                </svg>
              </div>
              <input
                className="flex-1 outline-none border-none bg-transparent pe-3"
                type="text"
                placeholder="Nhập nội dung tìm kiếm"
              />
            </div>
          </div>
          <div className="w-full mt-6 gap-6 flex flex-col">
            {Array.from({ length: 10 }).map((_, index) => (
              <PostDetail
                key={'post-' + index}
                post={{
                  content: `Tôi có khách cần mua gấp, kính nhờ anh chị
                              em tìm hộ giúp tôi. Tiêu chí khách:<br/>
                              <b>Khu vực</b>: Hà Nội
                              `,
                  images: ['/images/post-1.jpeg', '/images/post-2.jpeg', '/images/post-3.jpeg'],
                }}
                isUrgently
                threeDotEvents={{
                  editEvent() {
                    setIsUpdate(true);
                    setIsOpenForm(true);
                    setDefaultValue({
                      city: 'ha-noi',
                      districts: 'dong-da',
                      area: '102m²',
                      price: '15 tỷ',
                      request: 'Mua để ở',
                    });
                  },
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalUrgently
        open={isOpenForm}
        value={defaultValue}
        setOpen={setIsOpenForm}
        isUpdate={isUpdate}
      />
    </>
  );
};

export default UrgentlyPage;
