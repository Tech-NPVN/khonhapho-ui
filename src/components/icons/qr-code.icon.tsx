const QrCodeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="[&_.fill]:fill-primary_text_l [&_.stroke]:stroke-primary_text_l dark:[&_.fill]:fill-primary_text_l dark:[&_.stroke]:stroke-primary_text_l"
      {...props}
    >
      <path
        d="M16.023 1.5H19.8816C20.776 1.5 21.5 2.22402 21.5 3.1184V5.18399V7.24957M21.5 16.3041V19.8901C21.5 20.7845 20.776 21.5 19.8816 21.5H16.023M1.5 16.3041V19.8901C1.5 20.7845 2.22402 21.5 3.1184 21.5H6.977M1.5 7.24957V3.1184C1.5 2.22402 2.22402 1.5 3.1184 1.5H6.977"
        className="stroke"
        strokeWidth="1.2"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <rect x="12.1" y="5.1" width="5.8" height="5.8" rx={1} className="stroke" strokeWidth="1.2" />
      <rect x="5.1" y="13.1" width="5.8" height="5.8" rx={1} className="stroke" strokeWidth="1.2" />
      <rect x="14.5" y="17.5" width={1} height={1} className="fill" />
      <rect x="13.5" y="15.5" width={1} height={1} className="fill" />
      <rect x="13.5" y="14.5" width={1} height={1} className="fill" />
      <rect x="14.5" y="14.5" width={1} height={1} className="fill" />
      <rect x="16.5" y="16.5" width={1} height={1} className="fill" />
      <rect x="17.5" y="14.5" width={1} height={1} className="fill" />
      <rect x="16.5" y="17.5" width={1} height={1} className="fill" />
      <rect x="17.5" y="17.5" width={1} height={1} className="fill" />
      <rect x="17.5" y="18.5" width={1} height={1} className="fill" />
      <rect x="13.5" y="18.5" width={1} height={1} className="fill" />
      <rect x="4.5" y="5.5" width={1} height={1} className="fill" />
      <rect x="4.5" y="4.5" width={1} height={1} className="fill" />
      <rect x="5.5" y="6.5" width={1} height={1} className="fill" />
      <rect x="5.5" y="5.5" width={1} height={1} className="fill" />
      <rect x="8.5" y="4.5" width={1} height={1} className="fill" />
      <rect x="8.5" y="7.5" width={1} height={1} className="fill" />
      <rect x="8.5" y="8.5" width={1} height={1} className="fill" />
      <rect x="7.5" y="8.5" width={1} height={1} className="fill" />
      <rect x="4.5" y="8.5" width={1} height={1} className="fill" />
      <rect x="7.5" y="5.5" width={1} height={1} className="fill" />
    </svg>
  );
};

export { QrCodeIcon };
