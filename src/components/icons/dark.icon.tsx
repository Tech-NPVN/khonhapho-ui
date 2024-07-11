const DarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`dark:[&>path]:stroke-primary_text_d ${props.className}`}
      {...props}
    >
      <path
        d="M1.01683 7.25331C1.23986 10.3425 3.9472 12.8559 7.18733 12.9938C9.47339 13.0898 11.5178 12.0581 12.7445 10.4325C13.2525 9.76667 12.9799 9.32278 12.1312 9.47274C11.7161 9.54472 11.2886 9.57472 10.8425 9.55672C7.81305 9.43675 5.33494 6.98338 5.32255 4.08611C5.31636 3.30631 5.48363 2.5685 5.7872 1.89667C6.12174 1.15287 5.71905 0.798958 4.94464 1.11688C2.49131 2.11862 0.812382 4.512 1.01683 7.25331Z"
        stroke="#344142"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { DarkIcon };
