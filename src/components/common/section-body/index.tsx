'use client';

import { Divider } from 'antd';

type SectionBodyProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const SectionBody = ({ title, children, className }: SectionBodyProps) => {
  return (
    <section
      className={`rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5 ${className}`}
    >
      <h3 className="uppercase text-[17px] max-lg:text-sm mb-0">{title}</h3>
      <Divider className="bg-background_l dark:bg-divider_d/40 max-lg:my-3 my-4" />
      {children}
    </section>
  );
};

const LinkIcon = () => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mr-2"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      ></path>
    </svg>
  );
};

const SectionBodyWithDesc = ({
  children,
  title,
  className,
  description,
}: SectionBodyProps & { description: React.ReactNode | string }) => {
  return (
    <section
      className={`rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5 ${className}`}
    >
      <div>
        <h3 className="uppercase text-[17px] max-lg:text-sm mb-1">{title}</h3>
        <span className="text-xs">{description}</span>
      </div>
      <Divider className="bg-background_l dark:bg-divider_d/40 max-lg:my-3 my-4" />
      {children}
    </section>
  );
};

const SectionBodyWithDescButton = ({
  children,
  title,
  className,
  description,
  btn,
}: SectionBodyProps & { description?: React.ReactNode; btn: React.ReactNode }) => {
  return (
    <section
      className={`rounded-lg bg-primary_color_l dark:bg-primary_color_d px-3 max-lg:px-4 py-5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`uppercase text-[17px] ${description ? 'max-lg:text-sm mb-1' : 'mb-0'}`}>
            {title}
          </h3>
          {description && (
            <div className="flex gap-2 text-link_text_l dark:text-link_text_d">{description}</div>
          )}
        </div>
        {btn}
      </div>
      <Divider className="bg-background_l dark:bg-divider_d/40 max-lg:my-3 my-4" />
      {children}
    </section>
  );
};

export { SectionBody, SectionBodyWithDesc, SectionBodyWithDescButton, LinkIcon };
