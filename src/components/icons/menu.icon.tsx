const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 10H17.5"
        stroke="#344142"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-primary_text_d"
      />
      <path
        d="M2.5 5H17.5"
        stroke="#344142"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-primary_text_d"
      />
      <path
        d="M2.5 15H17.5"
        stroke="#344142"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-primary_text_d"
      />
    </svg>
  );
};

export { MenuIcon };
