'use client';

import { modalError } from '@/common/modal';
import { SearchIcon } from '@/components/icons';
import { Empty } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { POSTS_SAMPLE } from '../data.sample';
import { LibNhaPhoTypes } from '../lib.types';
import { LibNhaPhoForm } from '../modal';
import { LibNhaPhoPost } from '../post';

const LibAssistIndex: React.FC = ({}) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<LibNhaPhoTypes>();
  const [posts, setPosts] = useState<LibNhaPhoTypes[]>(POSTS_SAMPLE);
  const deleteEvent = (id?: string) => {
    modalError({
      title: 'Xác nhận xoá bài viết?',
      content: 'Bài viết sẽ được xoá vĩnh viễn không thể phục hồi',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      onOk() {
        console.log('Xoá');
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
      },
    });
  };
  return (
    <>
      <div className="w-full sm:px-3 pb-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mt-6 bg-primary_color_l dark:bg-primary_color_d w-full sm:rounded-lg shadow p-4">
            <h1 className="font-semibold text-xl dark:text-primary_text_d_2 text-primary_text_l mb-0">
              Tạo bài viết
            </h1>
            <div>(Cần xét duyệt)</div>
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
          <div
            className={clsx(
              'mt-4 bg-white h-[42px] dark:bg-primary_color_d rounded-lg shadow-sm flex items-center ',
              'sm:w-full w-[calc(100%_-_24px)] mx-3 sm:mx-0',
            )}
          >
            <div className="w-full flex">
              <div className="w-10 h-[42px] flex items-center justify-center">
                <SearchIcon width={18} height={18} />
              </div>
              <input
                className="flex-1 outline-none border-none bg-transparent pe-3"
                type="text"
                placeholder="Nhập nội dung tìm kiếm"
              />
            </div>
          </div>
          <div className="w-full mt-4 gap-6 flex flex-col">
            {posts.map((post, index) => (
              <LibNhaPhoPost
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
                isCompanyPost
              />
            ))}
          </div>
          {posts.length === 0 && (
            <div className="w-full bg-white md:min-h-[360px] 2xl:min-h-[420px] dark:bg-primary_color_d rounded-lg shadow-sm flex items-center justify-center py-8">
              <Empty description={<>Không có bài viết nào</>} />
            </div>
          )}
        </div>
      </div>
      {isOpenForm && (
        <LibNhaPhoForm
          open
          defaultValue={defaultValue}
          setOpen={setIsOpenForm}
          title="Thư viện trợ lý"
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

export { LibAssistIndex };
