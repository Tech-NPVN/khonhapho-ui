const MessageReplyIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M3.2 1H12.8C13.1183 1 13.4235 1.12643 13.6485 1.35147C13.8736 1.57651 14 1.88174 14 2.2V8.8C14 9.11826 13.8736 9.42349 13.6485 9.64853C13.4235 9.87357 13.1183 10 12.8 10H6.2L3.2 13V10C2.88174 10 2.57652 9.87357 2.35147 9.64853C2.12643 9.42349 2 9.11826 2 8.8V2.2C2 1.88174 2.12643 1.57651 2.35147 1.35147C2.57652 1.12643 2.88174 1 3.2 1Z"
        stroke="#344142"
        strokeMiterlimit="10"
        className="dark:stroke-primary_text_d"
      />
      <rect
        x="7.46484"
        y="2"
        width="1"
        height="4"
        rx="0.5"
        fill="#344142"
        className="dark:fill-primary_text_d"
      />
      <circle cx="7.96484" cy="7.5" r="0.5" fill="#344142" className="dark:fill-primary_text_d" />
    </svg>
  );
};

export { MessageReplyIcon };
