const ShareArrowIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 10V12.25C13.5 12.6642 13.1642 13 12.75 13H1.5V1.75C1.5 1.33579 1.83579 1 2.25 1H4.5"
        stroke="#1677FF"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="dark:stroke-link_text_d"
      />
      <path
        d="M6 8.5L13.5 1M13.5 1H7.5M13.5 1V7"
        stroke="#1677FF"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="dark:stroke-link_text_d"
      />
    </svg>
  );
};

export { ShareArrowIcon };
