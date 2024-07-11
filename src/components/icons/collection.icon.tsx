const CollectionIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.2"
        y="1.2"
        width="19.6"
        height="19.6"
        rx="3.3"
        stroke="#344142"
        strokeWidth="1.4"
        className="dark:stroke-primary_text_d"
      />
      <path
        d="M11 2V9.5L14 6.5L17 9.5V2"
        stroke="#344142"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-primary_text_d"
      />
    </svg>
  );
};

export { CollectionIcon };
