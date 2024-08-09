const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 0.5H1L6.6 7.33222V12.0556L9.4 13.5V7.33222L15 0.5Z"
        stroke="#344142"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-primary_text_d"
      />
    </svg>
  );
};
export { FilterIcon };
