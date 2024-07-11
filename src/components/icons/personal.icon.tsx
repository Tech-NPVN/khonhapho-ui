const PersonalIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.5 18.8549C5.5 15.8171 8.1464 14.1621 11.4115 14.1621C14.6767 14.1621 17.2857 15.8171 17.2857 18.8549"
        stroke="#344142"
        strokeMiterlimit="10"
        strokeLinecap="round"
        className="dark:stroke-primary_text_d"
      />
      <circle cx="11.2093" cy="9.16923" r="3.16923" stroke="#344142" className="dark:stroke-primary_text_d"/>
      <circle cx="11" cy="11" r="10.5" stroke="#344142" className="dark:stroke-primary_text_d"/>
    </svg>
  );
};

export { PersonalIcon };
