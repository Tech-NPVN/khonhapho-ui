const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1.37C3.7 1.37 1.33 3.11 1.33 6.15c0 .67.28 1.52.76 2.49.48.94 1.12 1.91 1.77 2.77.65.88 1.3 1.66 1.8 2.23.12.14.23.27.33.39.1-.12.22-.25.34-.39.5-.57 1.15-1.35 1.8-2.23.65-.86 1.3-1.83 1.77-2.77.48-.97.76-1.82.76-2.49C10.67 3.11 8.3 1.37 6 1.37ZM6 15.03c-.47.48-.47.48-.47.48l-.01-.01-.01-.01a2.42 2.42 0 0 1-.2-.21c-.04-.04-.08-.08-.12-.12-.19-.2-.43-.46-.7-.76-.51-.58-1.19-1.39-1.88-2.31-.68-.92-1.37-1.96-1.9-3.01C0 8.24 0 7.15 0 6.15 0 2.22 3.1 0 6 0s6 2.22 6 6.15c0 1-.39 2.09-1.07 3.13-.57.94-1.25 1.96-1.88 2.76-.27.31-.51.57-.7.77-.04.04-.08.08-.12.12-.07.07-.14.14-.22.22l-.01.01-.46.47ZM6 4.78c-.74 0-1.33.61-1.33 1.37 0 .75.6 1.37 1.33 1.37s1.33-.62 1.33-1.37c0-.76-.6-1.37-1.33-1.37ZM3.33 6.15c0-1.51 1.19-2.73 2.67-2.73s2.67 1.22 2.67 2.73c0 1.51-1.19 2.73-2.67 2.73S3.33 7.66 3.33 6.15Z"
      />
    </svg>
  );
};
export { LocationIcon };