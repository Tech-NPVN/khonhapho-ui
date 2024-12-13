'use client';
import { Segmented } from 'antd';
import { useEffect, useState } from 'react';
import { FeedHome, FeedInterested } from './feed';
const options = [
  {
    label: 'Bản tin',
    value: 'feeds',
  },
  {
    label: 'Bạn quan tâm',
    value: 'interested',
  },
];

type TabType = 'feeds' | 'interested';
const Content = () => {
  const [tab, setTab] = useState<TabType | null>(null);
  const handleTabChange = (tab: TabType) => {
    history.replaceState(null, '', '?tab=' + tab);
    setTab(tab);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (!tab || (tab != 'feeds' && tab != 'interested')) setTab('feeds');
    else setTab(tab as TabType);
  }, []);
  console.log(tab);

  if (!tab) return null;
  return (
    <>
      <div className="mt-4 w-full">
        <Segmented
          block
          value={tab ?? options[0].value}
          size="middle"
          options={options}
          className="min-[640px]:w-full w-[calc(100%_-_24px)] my-auto mx-3 min-[640px]:mx-0"
          onChange={(tab) => {
            handleTabChange(tab as TabType);
          }}
        />
      </div>
      <div className="">
        {tab === 'feeds' ? <FeedHome /> : tab === 'interested' ? <FeedInterested /> : <></>}
      </div>
    </>
  );
};

export default Content;
