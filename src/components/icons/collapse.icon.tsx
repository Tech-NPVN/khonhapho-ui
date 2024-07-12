const CollapseIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.63184 1H14.8793"
        stroke="#344142"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="dark:stroke-primary_text_d"
      />
      <path
        d="M6.63184 5.69238H14.8758"
        stroke="#344142"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="dark:stroke-primary_text_d"
      />
      <path
        d="M3.34615 1L1 3.34615L3.34615 5.69231"
        stroke="#344142"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-primary_text_d"
      />
      <path
        d="M1.11182 10.3848H14.8511"
        stroke="#344142"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="dark:stroke-primary_text_d"
      />
    </svg>
  );
};

export { CollapseIcon };
