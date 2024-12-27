'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import * as unicodeEmoji from 'unicode-emoji';
import { getRecentEmojis, saveRecentEmoji } from './emoji-picker-helpers';
import './style.css';

export type EmojiPickerProps = {
  onSelect?: (emoji: string) => void;
};

const emojis = unicodeEmoji.getEmojis();
const Tabs: {
  key: unicodeEmoji.Group | 'history';
  emoji: string;
  group: unicodeEmoji.Group | 'history';
  groupTitle: string;
}[] = [
  { key: 'history', emoji: '🕔', group: 'history', groupTitle: 'Đã sử dụng gần đây' },
  {
    key: 'smileys-emotion',
    emoji: '🙂',
    group: 'smileys-emotion',
    groupTitle: 'Mặt cười & hình người',
  },
  { key: 'people-body', emoji: '🧑', group: 'people-body', groupTitle: 'Con người & cơ thể' },
  {
    key: 'animals-nature',
    emoji: '🐶',
    group: 'animals-nature',
    groupTitle: 'Động vật & thiên nhiên',
  },
  { key: 'food-drink', emoji: '🍎', group: 'food-drink', groupTitle: 'Đồ ăn & đồ uống' },
  { key: 'travel-places', emoji: '✈️', group: 'travel-places', groupTitle: 'Du lịch & địa điểm' },
  { key: 'activities', emoji: '⚽', group: 'activities', groupTitle: 'Hoạt động' },
  { key: 'objects', emoji: '📱', group: 'objects', groupTitle: 'Đồ vật' },
  { key: 'symbols', emoji: '©️', group: 'symbols', groupTitle: 'Biểu tượng' },
  { key: 'flags', emoji: '🚩', group: 'flags', groupTitle: 'Cờ' },
];

const groupedEmojis = Tabs.reduce<Record<string, unicodeEmoji.BaseEmoji[]>>((acc, tab) => {
  acc[tab.key] =
    tab.key === 'history'
      ? [] // 'history' được quản lý riêng
      : emojis.filter((emoji) => emoji.group === tab.key);
  return acc;
}, {} as Record<string, unicodeEmoji.BaseEmoji[]>);

const visibleGroups = Tabs.map((tab) => tab.key);
const EmojiContent: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const [recentEmojis, setRecentEmojis] = useState<string[]>(getRecentEmojis());
  const [tabIndex, setTabIndex] = useState<number>(recentEmojis.length > 0 ? 0 : 1);
  const groupRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    Tabs.reduce((acc, tab) => {
      acc[tab.key] = React.createRef();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>),
  );
  const swiperRef = useRef<SwiperRef | null>(null);
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    let closestGroup = '';
    let closestDistance = Infinity;

    for (const group of visibleGroups) {
      const groupRef = groupRefs.current[group]?.current;
      if (groupRef) {
        const distance = Math.abs(groupRef.offsetTop - target.scrollTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestGroup = group;
        }
      }
    }

    const tabIndex = Tabs.findIndex((tab) => tab.key === closestGroup);
    if (tabIndex !== -1) setTabIndex(tabIndex);
  };

  const handleTabClick = (group: string, index: number) => {
    setTabIndex(index);
    const groupRef = groupRefs.current[group]?.current;
    const container = groupRef?.closest('.emoji-picker') as HTMLElement | null;
    if (container && groupRef) {
      const offsetTop = groupRef.offsetTop - container.offsetTop;
      container.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (swiperRef.current) swiperRef.current.swiper.slideTo(tabIndex, 300); // Tự động kéo đến tabIndex
  }, [tabIndex]);

  return (
    <div className="w-[305px] h-[340px] flex flex-col items-center select-none">
      <div className="h-1"></div>
      <div
        className="w-[305px] h-[300px] bg-white overflow-y-auto p-3 rounded-lg emoji-picker"
        onScroll={handleScroll}
      >
        <div
          ref={groupRefs.current['history']}
          data-group={'history'}
          key={'history'}
          className="mb-4"
        >
          <h3 id={'#' + Tabs[0]?.key} className="text-sm">
            {Tabs[0]?.groupTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentEmojis.length === 0 && (
              <div className="py-6 text-center w-full text-black/50">Bạn chưa sử dụng icon nào</div>
            )}
            {recentEmojis.map((emoji, index) => (
              <div
                key={'history-emoji-' + index}
                className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-sm hover:bg-gray-200"
                onClick={() => {
                  saveRecentEmoji(emoji);
                  setRecentEmojis(getRecentEmojis());
                  if (onSelect) onSelect(emoji);
                }}
              >
                <span className="emoji text-3xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>

        {visibleGroups.slice(1).map((group, index) => {
          const tab = Tabs.find((tab) => tab.key === group);
          return (
            <div
              ref={groupRefs.current[group]}
              data-group={group}
              key={group + index}
              className="mb-4"
            >
              <h3 id={'#' + tab?.key} className="text-sm">
                {tab?.groupTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {groupedEmojis[group].map((emoji, index) => (
                  <div
                    key={group + '-emoji-' + index}
                    className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-sm hover:bg-gray-200"
                    onClick={() => {
                      saveRecentEmoji(emoji.emoji);
                      setRecentEmojis(getRecentEmojis());
                      if (onSelect) onSelect(emoji.emoji);
                    }}
                  >
                    <span className="emoji text-3xl">{emoji.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[305px] flex gap-2 border-t border-black/10">
        <Swiper
          ref={swiperRef}
          className="w-full"
          freeMode
          slidesPerView="auto"
          spaceBetween={5}
          modules={[FreeMode]}
        >
          {Tabs.map((tab, index) => (
            <SwiperSlide
              style={{ width: '40px', height: '40px' }}
              key={tab.key}
              onClick={() => handleTabClick(tab.key, index)}
            >
              <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                <span className={clsx('text-xl', tab.key != 'history' ? 'emoji' : '')}>
                  {tab.emoji}
                </span>
                {index === tabIndex && (
                  <div className="w-3/4 border-b-2 border-0 border-solid border-color_l mt-1"></div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EmojiContent;
