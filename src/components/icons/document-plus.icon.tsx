const DocumentPlusIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'stroke-primary_text_l dark:stroke-primary_text_d ' + props.className}
      {...props}
    >
      <path
        d="M22 13.0465V21.4707C22 22.8669 20.8669 24 19.4707 24H5.52929C4.13312 24 3 22.8669 3 21.4707V7.52929C3 6.13312 4.13312 5 5.52929 5H13.9535"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path d="M21 3V9" stroke-width="1.5" stroke-linecap="round" />
      <path d="M18 6.00732L24 5.99997" stroke-width="1.5" stroke-linecap="round" />
      <path d="M6.6875 10.3125H15.2875" stroke-width="1.6" stroke-linecap="round" />
      <path d="M6.6875 14.4126L17.4872 14.496" stroke-width="1.6" stroke-linecap="round" />
      <path d="M6.6875 18.5957H19.2875" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  );
};

export { DocumentPlusIcon };
