const StickerIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M0.5 5C0.5 2.51472 2.51472 0.5 5 0.5H14.9992C17.4845 0.5 19.4992 2.51472 19.4992 5V11.9999C19.4992 16.1421 16.1413 19.5 11.9992 19.5H5C2.51472 19.5 0.5 17.4852 0.5 15V5Z"
        stroke="#344142"
        className="dark:stroke-primary_text_d"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1113 20V15.1111C12.1113 13.4542 13.4545 12.1111 15.1113 12.1111H20.0001V11.1111H15.1113C12.9022 11.1111 11.1113 12.9019 11.1113 15.1111V20H12.1113Z"
        fill="#344142"
        className="dark:fill-primary_text_d"
      />
      <ellipse
        cx="6.66673"
        cy="7.77786"
        rx="1.11107"
        ry="1.11111"
        fill="#344142"
        className="dark:fill-primary_text_d"
      />
      <ellipse
        cx="13.3327"
        cy="7.77786"
        rx="1.11107"
        ry="1.11111"
        fill="#344142"
        className="dark:fill-primary_text_d"
      />
      <path
        d="M7.77734 12.2224C8.88841 14.4446 11.6661 14.4446 12.7771 12.2224"
        stroke="#344142"
        strokeLinecap="round"
        className="dark:stroke-primary_text_d"
      />
    </svg>
  );
};

export { StickerIcon };
