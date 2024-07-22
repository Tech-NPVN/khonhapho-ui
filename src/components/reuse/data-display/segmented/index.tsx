'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Segmented as SegmentedAntd } from 'antd';
import { useCallback, useEffect, useState } from 'react';

type SegmentedProps = {
  options: SegmentedOptionProps[];
  block?: boolean;
  size?: 'small' | 'middle' | 'large';
};

type SegmentedOptionProps = {
  label: React.ReactNode | string;
  value: string;
  disabled?: boolean;
  component: React.ReactNode;
};

const Segmented = ({ options, block = false, size = 'middle' }: SegmentedProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const tab = useSearchParams().get('tab');

  const [value, setValue] = useState<string>();

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      router.push(pathname + '?tab=' + value);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!tab) {
      handleChange(options[0].value);
    } else {
      handleChange(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <SegmentedAntd
          options={options}
          block={block}
          size={size}
          value={value}
          onChange={handleChange}
        />
      </div>
      {options.find((option) => option.value === value)?.component}
    </>
  );
};

export { Segmented, type SegmentedProps, type SegmentedOptionProps };
