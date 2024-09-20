'use client';

import { MiniSearch } from '@/components/common';
import { Empty } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { RegulationForm } from './components/modal';
import { RegulationPost, RegulationTypes } from './components/post';
import { POSTS_SAMPLE } from './data.sample';

type RegulationProps = {};
const RegulationIndex: React.FC<RegulationProps> = ({}) => {
  const [searchData, setSearchData] = useState<{
    text?: string;
    hashtag?: string;
  }>();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<RegulationTypes>();
  const [posts, setPosts] = useState<RegulationTypes[]>(POSTS_SAMPLE);
  const deleteEvent = (id?: string) => {
    console.log(id);
  };
  return (
    <>
      <div className="w-full sm:px-3 pb-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mt-6 bg-primary_color_l dark:bg-primary_color_d w-full sm:rounded-lg shadow p-4">
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
                  setDefaultValue(undefined);
                }}
              >
                Bắt đầu một bài viết...
              </div>
            </div>
          </div>
          <div className={clsx('mt-4', 'sm:w-full w-[calc(100%_-_24px)] mx-3 sm:mx-0')}>
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
          <div className="w-full mt-4 gap-6 flex flex-col">
            {posts.map((post, index) => (
              <RegulationPost
                key={post.id}
                post={post}
                threeDotEvents={{
                  editEvent() {
                    setDefaultValue(post);
                    setIsOpenForm(true);
                  },
                  deleteEvent() {
                    deleteEvent(post.id);
                  },
                }}
                onHashtagClick={(hashtag) => {
                  setSearchData((prev) => ({
                    ...prev,
                    hashtag,
                  }));
                }}
              />
            ))}
          </div>
          {posts.length === 0 && (
            <div className="w-full mt-6 bg-white min-h-24 dark:bg-primary_color_d rounded-lg shadow-sm flex items-center justify-center py-8">
              <Empty description={<>Không có bài viết nào</>} />
            </div>
          )}
        </div>
      </div>
      {isOpenForm && (
        <RegulationForm
          open
          defaultValue={defaultValue}
          setOpen={setIsOpenForm}
          title="Quy định và hướng dẫn"
          onSuccess={(post) => {
            const newPosts = [...posts];
            const index = newPosts.findIndex((item) => item.id === post.id);
            if (index !== -1) {
              newPosts[index] = post;
            } else {
              newPosts.unshift(post);
            }
            setPosts(newPosts);
          }}
        />
      )}
    </>
  );
};

export { RegulationIndex };
export type { RegulationProps };
