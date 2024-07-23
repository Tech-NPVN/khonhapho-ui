'use client';

import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

export interface ITabList {
  name: string;
  items: ReactNode[] | string[];
  defaultIndex?: number;
  className?: string;
  classNames?: {
    tabActive?: string;
    tab?: string;
    textActive?: string;
  };
  onChange?: (index: number) => void;
}

export interface ITabPanel {
  name: string;
  children: ReactNode;
  tabIndex: number;
}

export function TabList({
  name,
  items,
  defaultIndex,
  className,
  classNames,
  onChange,
}: Readonly<ITabList>) {
  const [selected, setSelected] = useState<number>(defaultIndex ?? -1);

  const handleChange = (tab: number) => {
    items.forEach((_, i) => {
      document.getElementById(`tab-panel-${name}-${i}`)?.setAttribute('data-display', 'false');
    });
    document.getElementById(`tab-panel-${name}-${tab}`)?.setAttribute('data-display', 'true');
    setSelected(tab);
    onChange?.(tab);
  };

  useEffect(() => {
    defaultIndex != -1 && handleChange(defaultIndex ?? -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <ul
        className={clsx(
          'relative flex p-1 list-none rounded-xl dark:bg-primary_color_d',
          className,
        )}
        data-tabs="tabs"
      >
        {items.map((item, i) => (
          <li
            key={'tabpanel' + i}
            onClick={() => {
              handleChange(i);
            }}
            className={clsx(
              'z-10 flex-auto text-center rounded-lg cursor-pointer',
              selected != i
                ? 'hover:bg-black/5 text-black'
                : classNames?.textActive + ' transition-all duration-500',
            )}
            style={{ width: `calc(100% / ${items.length}` }}
          >
            <span
              className={`flex items-center justify-center w-full px-0 py-1 mb-0 border-0 rounded-lg dark:text-primary_text_d font-normal ${
                classNames?.tab ?? ''
              }`}
            >
              {item}
            </span>
          </li>
        ))}
        <li
          className={clsx(
            'flex-auto text-center absolute transition-all duration-500  bg-color_l rounded-lg',
            classNames?.tabActive ?? 'bg-color_l',
          )}
          style={{
            width: `calc(100% / ${items.length} - 8px)`,
            left: `calc(${(selected * 100) / items.length}% + 4px)`,
            display: selected == -1 ? 'none' : '',
          }}
        >
          <span
            className={clsx(
              'text-transparent flex items-center justify-center font-medium w-full px-0 py-1 mb-0 border-0 ',
              classNames?.tab ?? '',
            )}
          >
            -
          </span>
        </li>
      </ul>
    </div>
  );
}

export const TabPane = ({ children, name, tabIndex }: ITabPanel) => {
  return (
    <div className="hidden data-[display=true]:block" id={`tab-panel-${name}-${tabIndex ?? -1}`}>
      {children}
    </div>
  );
};
