const BookmarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path d="M0 16V1.5C0 0.671562 0.671562 0 1.5 0H10.5C11.3284 0 12 0.671562 12 1.5V16L6 12.5L0 16Z" />
    </svg>
  );
};

export { BookmarkIcon };
