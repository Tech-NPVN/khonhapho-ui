'use client';

import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { CollapseIcon, SearchIcon, XIcon } from '@/components/icons';
import { SegmentedOptionProps } from '@/components/reuse/data-display';
import { useSidebar } from '@/components/reuse/navigation';
import { useDivWidth } from '@/hooks/use-div-width';
import { Button, Segmented, Select, Tooltip } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import LibManagerApprovedIndex from './lib-manager-approved';
import LibManagerPendingIndex from './lib-manager-pending';
import LibManagerRejectIndex from './lib-manager-reject';

const TAB_INFO = [
  {
    label: 'Chờ duyệt',
    value: 'pending',
    count: 0,
    searchQuery: '',
    component: LibManagerPendingIndex,
  },
  {
    label: 'Đã duyệt',
    value: 'approved',
    count: 0,
    searchQuery: '',
    component: LibManagerApprovedIndex,
  },
  {
    label: 'Từ chối',
    value: 'reject',
    count: 0,
    searchQuery: '',
    component: LibManagerRejectIndex,
  },
];
type HeaderProps = {
  segmentedValue: string;
  handleSegmentedChange: (value: string) => void;
  searchString?: string;
  onSearchStringChange?: (value: string) => void;
  tabs?: SegmentedOptionProps[];
};
const Header = ({
  segmentedValue,
  searchString,
  tabs,
  handleSegmentedChange,
  onSearchStringChange,
}: HeaderProps) => {
  const [searchInput, setSearchInput] = useState<string>(searchString ?? '');
  const { divRef: containerRef, width: containerWidth } = useDivWidth({ delay: 50 });
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setSearchInput(searchString ?? '');
  }, [searchString]);
  const containerWidthLessThan1024 = containerWidth != 0 && containerWidth < 1024;
  return (
    <div
      ref={containerRef}
      className={clsx('flex justify-between w-full', containerWidthLessThan1024 ? 'flex-wrap' : '')}
    >
      <div
        className={clsx(
          ' overflow-y-auto scrollbar-hide',
          containerWidthLessThan1024 ? 'w-full' : 'flex-1',
        )}
      >
        <Segmented
          options={tabs ?? []}
          value={segmentedValue}
          onChange={handleSegmentedChange}
          className={clsx(
            'dark:!bg-background_d !bg-black/5',
            containerWidthLessThan1024 ? '[&_.ant-segmented-item]:!px-2' : '',
          )}
          block={containerWidthLessThan1024}
        />
      </div>
      <div className={clsx('flex gap-2', containerWidthLessThan1024 ? 'w-full mt-2' : 'w-[420px]')}>
        <Select
          placeholder="Danh mục"
          size="large"
          className="w-1/2 [&_.ant-select-selector]:!rounded-xl"
        />

        <div
          className={clsx(
            'flex bg-white border border-solid border-divider_l dark:border-divider_d rounded-xl relative dark:bg-black/10 min-h-10 w-1/2',
          )}
        >
          <input
            ref={inputRef}
            className="border-none pl-2 focus-visible:outline-none bg-transparent dark:bg-transparent flex-1"
            type="text"
            placeholder="Tìm kiếm"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.currentTarget.value === '') onSearchStringChange?.('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchInput != searchString) onSearchStringChange?.(searchInput);
              }
            }}
          />
          {searchInput && (
            <button
              className="bg-transparent border-none cursor-pointer mt-[2px]"
              onClick={() => {
                setSearchInput('');
                onSearchStringChange?.('');
                inputRef.current?.focus();
              }}
            >
              <XIcon width={12} height={12} />
            </button>
          )}

          <button
            className="bg-transparent border-transparent border-solid py-1 px-3 [&_path]:hover:!fill-color_l cursor-pointer border-l border-l-divider_l dark:border-l-divider_d"
            onClick={() => {
              if (searchInput != searchString) onSearchStringChange?.(searchInput);
            }}
          >
            <SearchIcon className="mt-[2px]" width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const LibManagerIndex = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //
  const [firstLoaded, setFirstLoaded] = useState<boolean>(false);
  const [tabs, setTabs] = useState(TAB_INFO);
  const [tabString, setTabString] = useState(searchParams.get('tab') || TAB_INFO[0].value);
  const { collapsed, toggleCollapse } = useSidebar();

  //
  const renderTitle = useCallback(() => {
    if (collapsed) {
      return (
        <div className="flex items-center gap-3 h-8">
          <Tooltip title="Mở rộng" placement="bottom">
            <Button
              type="text"
              icon={<CollapseIcon className="rotate-180" />}
              onClick={toggleCollapse}
            />
          </Tooltip>
          <span>Duyệt tin thư viện trưởng phòng</span>
        </div>
      );
    }
    return (
      <div className="flex items-center h-8">
        <span>Duyệt tin thư viện trưởng phòng</span>
      </div>
    );
  }, [collapsed, toggleCollapse]);

  // Call api hay làm gì đó
  useEffect(() => {
    if (!firstLoaded) {
      setFirstLoaded(true);
      // Đã gọi xong api
      setTimeout(() => {
        setTabs((prev) => {
          return prev.map((tab) => ({
            ...tab,
            count: Math.floor(Math.random() * 100),
            searchQuery: searchParams.get('tab') === tab.value ? searchParams.get('q') || '' : '',
          }));
        });
      }, 200);
    } else {
      const updatedTab = searchParams.get('tab') || TAB_INFO[0].value;
      const updatedQ = searchParams.get('q');
      if (updatedQ)
        setTabs((prev) => {
          return prev.map((tab) =>
            tab.value === updatedTab ? { ...tab, searchQuery: updatedQ } : tab,
          );
        });

      setTabString(updatedTab);
    }
    return () => {};
  }, [searchParams, firstLoaded]);

  const Component = tabs.find((tab) => tab.value === tabString)?.component;

  return (
    <>
      <SectionBody title={renderTitle()}>
        <div className="flex justify-between">
          <Header
            segmentedValue={tabString}
            tabs={tabs.map((tab) => ({
              label: <TabLabelWithBadge title={tab.label} count={tab.count} />,
              value: tab.value,
              component: <tab.component />,
            }))}
            handleSegmentedChange={(value) => {
              // setTabString(value);
              const s = tabs.find((tab) => tab.value === value)?.searchQuery;
              router.push(`?tab=${value}${s ? '&q=' + s : ''}`);
            }}
            searchString={tabs.find((tab) => tab.value === tabString)?.searchQuery}
            onSearchStringChange={(value) => {
              const updatedParams = new URLSearchParams(searchParams.toString());
              if (value) updatedParams.set('q', value);
              else updatedParams.delete('q');
              setTabs((prev) => {
                return prev.map((tab) =>
                  tab.value === tabString ? { ...tab, searchQuery: value } : tab,
                );
              });
              router.push(`?${updatedParams.toString()}`, undefined);
            }}
          />
        </div>
      </SectionBody>

      <div className="rounded-lg mt-5">{Component && <Component />}</div>
    </>
  );
};
