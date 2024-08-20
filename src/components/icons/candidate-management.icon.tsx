import clsx from 'clsx';

const CandidateManagement = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        '[&_.fill]:fill-primary_text_l [&_.stroke]:stroke-primary_text_l dark:[&_.fill]:fill-primary_text_l dark:[&_.stroke]:stroke-primary_text_l',
        props.className,
      )}
      {...props}
    >
      <rect
        x="3.85"
        y="1.35"
        width="19.3"
        height="24.3"
        rx="2.65"
        className="stroke"
        strokeWidth="0.7"
      />
      <rect
        x="5.85547"
        y="3.3335"
        width="15.2895"
        height="19.2917"
        rx="0.75"
        className="stroke"
        strokeWidth="0.5"
      />
      <path
        d="M14.8289 24.2292C14.8289 24.6639 14.472 25.0208 14.0263 25.0208C13.5805 25.0208 13.2236 24.6639 13.2236 24.2292C13.2236 23.7944 13.5805 23.4375 14.0263 23.4375C14.472 23.4375 14.8289 23.7944 14.8289 24.2292Z"
        className="stroke"
        strokeWidth="0.5"
      />
      <path
        d="M10.8691 14.8538C10.8691 13.1502 12.2644 11.7695 13.9858 11.7695C15.7073 11.7695 17.1025 13.1502 17.1025 14.8538"
        className="stroke"
        strokeWidth="0.7"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M15.4624 9.16434C15.4624 10.0249 14.7564 10.7287 13.8779 10.7287C12.9993 10.7287 12.2934 10.0249 12.2934 9.16434C12.2934 8.30383 12.9993 7.6 13.8779 7.6C14.7564 7.6 15.4624 8.30383 15.4624 9.16434Z"
        className="stroke"
        strokeWidth="0.7"
      />
      <path
        d="M8.36426 16.8335H16.1315"
        className="stroke"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M8.33594 18.5005H18.7636"
        className="stroke"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path d="M8.38086 20.167H16.658" className="stroke" strokeWidth="0.5" strokeLinecap="round" />
      <ellipse cx="8.94241" cy="6.38542" rx="2.28421" ry="2.26042" className="fill" />
      <path
        d="M8.13672 6.26222L8.40961 6.56166L8.80653 6.9609L9.79796 5.76904"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { CandidateManagement };
