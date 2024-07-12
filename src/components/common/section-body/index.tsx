'use client';

import { Divider } from 'antd';

type SectionBodyProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

const SectionBody = ({ title, children }: SectionBodyProps) => {
  return (
    <section className="rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5">
      <h3 className="uppercase text-lg">{title}</h3>
      <Divider className="bg-background_l dark:bg-background_d" />
      {children}
    </section>
  );
};

export { SectionBody };
