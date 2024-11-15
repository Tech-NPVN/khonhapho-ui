'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Segmented as SegmentedAntd } from 'antd';
import { useCallback, useState } from 'react';

type SegmentedProps = {
  options: SegmentedOptionProps[];
  block?: boolean;
  size?: 'small' | 'middle' | 'large';
  children?: React.ReactNode;
  className?: string;
  wrapperCn?: string;
  notRedirect?: boolean;
};

type SegmentedOptionProps = {
  label: React.ReactNode | string;
  value: string;
  disabled?: boolean;
  component: React.ReactNode;
};

const useSegmented = (options: SegmentedOptionProps[], notRedirect?: boolean) => {
  const router = useRouter();
  const pathname = usePathname();
  const tab = useSearchParams().get('tab');

  const [value, setValue] = useState<string>(tab ?? options[0].value);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      if (!notRedirect) {
        router.push(pathname + '?tab=' + value);
      }
    },
    [notRedirect, pathname, router],
  );

  return { value, handleChange };
};

const Segmented = ({
  options,
  block = false,
  size = 'middle',
  children,
  className,
  wrapperCn,
  notRedirect,
}: SegmentedProps) => {
  const { value, handleChange } = useSegmented(options, notRedirect);

  return (
    <>
      <div className={wrapperCn}>
        <SegmentedAntd
          options={options}
          block={block}
          size={size}
          value={value}
          onChange={handleChange}
          className={className}
        />
      </div>
      {children}
      {options.find((option) => option.value === value)?.component}
    </>
  );
};

const SegmentedWithNode = ({
  options,
  block = false,
  size = 'middle',
  children,
  className,
  wrapperCn,
  element,
  notRedirect,
}: SegmentedProps & { element: React.ReactNode }) => {
  const { value, handleChange } = useSegmented(options, notRedirect);

  return (
    <>
      <div className={`flex w-full justify-between ${wrapperCn}`}>
        <SegmentedAntd
          options={options}
          block={block}
          size={size}
          value={value}
          onChange={handleChange}
          className={className}
        />
        {element}
      </div>
      {children}
      {options.find((option) => option.value === value)?.component}
    </>
  );
};

export {
  Segmented,
  SegmentedWithNode,
  useSegmented,
  type SegmentedProps,
  type SegmentedOptionProps,
};
