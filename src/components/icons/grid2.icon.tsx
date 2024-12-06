const Grid2Icon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="448"
      height="512"
      viewBox="0 0 448 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" />{' '}
    </svg>
  );
};
const GridSolidIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'' + props.className}
      {...props}
    >
      <path
        d="M10 3H3V10H10V3Z"
        strokeWidth={2}
        stroke="#344142"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3H14V10H21V3Z"
        strokeWidth={2}
        stroke="#344142"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H14V21H21V14Z"
        strokeWidth={2}
        stroke="#344142"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14H3V21H10V14Z"
        strokeWidth={2}
        stroke="#344142"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { Grid2Icon, GridSolidIcon };
