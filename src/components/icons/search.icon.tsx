const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.1306 9.20642L13.6668 12.7427L12.7432 13.6663L9.20691 10.1301L10.1306 9.20642Z"
        fill="#2F3643"
        className="dark:fill-primary_text_d"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.21175 1.63929C3.68672 1.63929 1.63978 3.68623 1.63978 6.21127C1.63978 8.7363 3.68672 10.7832 6.21175 10.7832C8.73679 10.7832 10.7837 8.7363 10.7837 6.21127C10.7837 3.68623 8.73679 1.63929 6.21175 1.63929ZM0.333496 6.21127C0.333496 2.96479 2.96528 0.333008 6.21175 0.333008C9.45823 0.333008 12.09 2.96479 12.09 6.21127C12.09 9.45774 9.45823 12.0895 6.21175 12.0895C2.96528 12.0895 0.333496 9.45774 0.333496 6.21127Z"
        fill="#2F3643"
        className="dark:fill-primary_text_d"
      />
    </svg>
  );
};

export { SearchIcon };
