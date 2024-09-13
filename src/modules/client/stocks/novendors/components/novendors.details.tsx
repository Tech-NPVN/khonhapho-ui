import { TextSeeMore } from '@/components/common';
import CopyButton from '@/components/common/copy-button';
import { BlueEyeIcon, CommentIcon, HeartRedIcon } from '@/components/icons';
import { ImageGrid, ModalCommentList } from '@/components/reuse/data-display';
import LikeShareComment from '@/components/reuse/data-display/post/like-share-comment';
import { Marquee } from '@/components/reuse/data-display/post/marquee';
import { DATE_TIME_FORMAT, WAREHOUSE_REASON_CONTENT_SAMPLE } from '@/constants/data';
import { Avatar, Tag } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

export const NovendorsItem = () => {
  const [isOpenModalComment, setIsOpenModalComment] = useState<boolean>(false);

  return (
    <>
      <div className="bg-primary_color_l dark:bg-primary_color_d rounded-lg px-3 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Avatar
              src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="flex-shrink-0 w-10 h-10"
            />
            <div>
              <h4 className="mb-1">Nhà Phố Việt Nam</h4>
              <span className="text-xs opacity-70">
                {dayjs(new Date()).format(DATE_TIME_FORMAT)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tag color="red" className="mr-0 max-md:hidden">
              Có sổ - Thiếu Seri sổ
            </Tag>
            <span className="text-[13px] max-md:hidden">
              Mã số: <span className="text-link_text_l dark:text-link_text_d">#28820</span>
            </span>
            <Tag
              className="bg-background_l dark:bg-background_d dark:text-primary_color_l font-medium rounded-lg mr-0"
              bordered={false}
            >
              Bán mạnh
            </Tag>
          </div>
        </div>

        <div className="flex mt-4 items-center gap-1 mb-3">
          <h3 className="text-color_l mb-0 flex-shrink-0">27.727 tỷ</h3>
          <span className="flex-shrink-0">• 255.152tr/m</span>
          <Tag
            className="lg:!text-sm font-semibold bg-background_l dark:bg-background_d overflow-hidden ml-4"
            bordered={false}
          >
            <Marquee text="Mặt phố, kinh doanh, có tầng thượng, penhouse" className="max-w-52" />
          </Tag>
        </div>

        <TextSeeMore _html={WAREHOUSE_REASON_CONTENT_SAMPLE} maxLine={1} className="text-sm" />

        <div className="flex items-center gap-2 my-3">
          {['#NPVN', '#NP781', '#NP92193', '#NP92193', '#NP92193'].map((item) => (
            <span
              className="text-link_text_l dark:text-link_text_d cursor-pointer hover:underline lowercase"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <CopyButton content="123" />

        <div className="my-5">
          <ImageGrid
            images={[
              '/images/post-1.jpeg',
              '/images/post-6.jpeg',
              '/images/test.jpg',
              '/images/banner.png',
              '/images/banner-2.png',
              '/images/post-2.jpeg',
            ]}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <HeartRedIcon /> 200
          </div>
          <div className="flex items-center gap-2">
            <CommentIcon /> 1
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
          <LikeShareComment />
          <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
        </div>
        <div className="mt-4 max-[640px]:hidden">
          <div className="flex justify-between items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
            </div>
            <div className="relative flex-1 bg-black/5 dark:bg-[#151E2F] rounded-2xl py-[2px] px-3">
              <div
                className="w-full h-9 bg-transparent focus:outline-none border-none outline-none flex items-center"
                onClick={() => {
                  setIsOpenModalComment(true);
                }}
              >
                <span className="select-none opacity-60">Viết bình luận ...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenModalComment && (
        <ModalCommentList open={isOpenModalComment} onClose={() => setIsOpenModalComment(false)} />
      )}
    </>
  );
};

export const NovendorsDetails = () => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <NovendorsItem />
    </div>
  );
};
