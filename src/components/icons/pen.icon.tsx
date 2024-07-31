const PenIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path
        d="M12.994.323a2.736 2.736 0 0 0-.941.308c-.219.122-.387.286-5.524 5.418-3.528 3.524-5.312 5.325-5.34 5.389a54.95 54.95 0 0 0-.469 1.813c-.415 1.665-.427 1.721-.401 1.866a.722.722 0 0 0 .549.563c.148.031.167.027 1.834-.388a65.25 65.25 0 0 0 1.818-.469c.121-.044.638-.554 5.428-5.349 5.134-5.14 5.299-5.308 5.421-5.527.557-1.007.377-2.202-.449-2.982a2.419 2.419 0 0 0-1.926-.642m.705 1.474c.204.093.408.301.509.516.063.135.072.186.072.42 0 .246-.007.281-.088.454-.085.18-.272.37-5.187 5.281l-5.098 5.095-.955.235c-.525.13-.961.228-.97.22-.008-.009.09-.445.22-.97l.235-.955 5.095-5.097c3.612-3.615 5.13-5.116 5.215-5.16.205-.106.298-.126.546-.121.2.005.268.019.406.082M7.871 14.322a.691.691 0 0 0-.524.908.666.666 0 0 0 .354.388l.152.075h3.64c3.03 0 3.658-.006 3.745-.037a.834.834 0 0 0 .396-.374.709.709 0 0 0-.157-.781c-.222-.211.116-.194-3.904-.198-1.972-.003-3.639.006-3.702.019"
        fillRule="evenodd"
      />{' '}
    </svg>
  );
};

export { PenIcon };
