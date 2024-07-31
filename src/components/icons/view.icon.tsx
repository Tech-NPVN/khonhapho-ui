const ItemViewIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1176_77814)">
        <rect x="7.75" y="7.75" width="14.5" height="14.5" stroke="#FBBD23" strokeWidth="1.5" />
      </g>
      <path
        d="M0.75 0.75H15.25V12C15.25 13.7949 13.7949 15.25 12 15.25H0.75V0.75Z"
        stroke="#FBBD23"
        strokeWidth="1.5"
      />
      <defs>
        <clipPath id="clip0_1176_77814">
          <path d="M0 0H16V12C16 14.2091 14.2091 16 12 16H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { ItemViewIcon };
