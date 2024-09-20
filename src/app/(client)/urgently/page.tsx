'use client';

import { ModalUrgently, ModalUrgentlyType } from '@/common/modal';
import { MiniSearch } from '@/components/common';
import PostDetail from '@/components/reuse/data-display/post';
import Image from 'next/image';
import { useState } from 'react';

const UrgentlyPage = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<ModalUrgentlyType>();
  const [searchData, setSearchData] = useState<{
    text?: string;
    hashtag?: string;
  }>();
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
          <div className="mt-6">
            <MiniSearch
              defaultValue={searchData?.text}
              hashtag={searchData?.hashtag}
              onTagChange={(value) => {
                setSearchData((prev) => ({
                  ...prev,
                  hashtag: value,
                }));
              }}
            />
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
                onHashtagClick={(hashtag) => {
                  console.log(hashtag);

                  setSearchData((prev) => ({
                    ...prev,
                    hashtag,
                  }));
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
