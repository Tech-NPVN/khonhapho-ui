const OpenFullIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path
        d="M1.538.825c-.531.073-.983.46-1.17 1l-.055.163-.007 6.606-.007 6.607 6.607-.007c6.346-.006 6.612-.008 6.744-.053.36-.121.709-.404.867-.703.174-.332.171-.292.171-1.9 0-1.425-.001-1.453-.053-1.563a.68.68 0 0 0-.635-.404.68.68 0 0 0-.635.404c-.051.11-.053.148-.06 1.469l-.007 1.356H1.7V2.203l1.356-.008c1.321-.007 1.359-.009 1.469-.06a.68.68 0 0 0 .404-.635.68.68 0 0 0-.404-.635C4.415.814 4.381.812 3.05.809 2.301.807 1.62.814 1.538.825m5.835 0a.593.593 0 0 0-.358.191.632.632 0 0 0-.197.484.69.69 0 0 0 .407.635c.112.052.127.053 2.599.06l2.486.007-3.504 3.505c-3.858 3.86-3.614 3.595-3.612 3.92a.68.68 0 0 0 .402.629c.152.068.41.066.57-.005.101-.044.72-.651 3.627-3.557l3.506-3.505.007 2.487c.006 2.472.007 2.487.059 2.599a.68.68 0 0 0 .635.404.68.68 0 0 0 .635-.404l.053-.113V1.338l-.053-.113a.824.824 0 0 0-.36-.36l-.112-.052-3.338-.004C8.989.807 7.436.814 7.373.825"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export { OpenFullIcon };
