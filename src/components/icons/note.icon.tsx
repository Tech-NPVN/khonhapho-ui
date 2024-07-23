const NoteIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="17"
      height="19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path
        d="M1.709 1.621a.223.223 0 0 0-.093.115c-.041.12-.041 14.399 0 14.519.017.047.062.1.101.118.052.023 1.218.032 4.376.032h4.305l.001-2.061c0-1.694.007-2.089.04-2.213.075-.28.265-.499.554-.638l.185-.089 2.117-.008 2.118-.008V6.605c0-3.267-.009-4.81-.029-4.869a.234.234 0 0 0-.101-.117c-.097-.044-13.483-.043-13.574.002m9.908 12.453v1.467l1.459-1.459c.802-.803 1.459-1.463 1.459-1.466 0-.004-.657-.008-1.459-.008h-1.459v1.466"
        fill-rule="evenodd"
      />
    </svg>
  );
};

export { NoteIcon };
