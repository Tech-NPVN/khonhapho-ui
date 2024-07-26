const CopyLink = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'fill-primary_text_l dark:fill-primary_text_d ' + props.className}
      {...props}
    >
      <path
        d="M10.125 1.249a3.4 3.4 0 0 0-1.12.314c-.378.178-1.871 1.058-1.952 1.15a.34.34 0 0 0-.049.405c.077.154.163.213.326.225l.133.011.8-.467c.44-.257.895-.516 1.012-.576a2.66 2.66 0 0 1 1.887-.185 2.695 2.695 0 0 1 1.714 1.492 2.64 2.64 0 0 1-.551 2.909c-.228.23-.377.329-1.312.871-.454.263-.856.512-.893.552a.388.388 0 0 0 .287.65c.118 0 .123-.003 1.038-.534.916-.533 1.037-.612 1.3-.851.751-.678 1.134-1.55 1.135-2.577a3.315 3.315 0 0 0-1.004-2.389 2.988 2.988 0 0 0-.871-.638c-.57-.29-1.284-.427-1.88-.362M3.261 4.878c-1.096.636-1.197.705-1.523 1.033-.492.495-.75.954-.928 1.652-.063.25-.07.315-.071.737-.001.347.01.517.043.68a3.426 3.426 0 0 0 2.251 2.592 3.06 3.06 0 0 0 1.105.186c.421.001.674-.038 1.073-.164.315-.099.526-.208 1.512-.782.55-.32.819-.491.856-.543.084-.117.091-.309.016-.418-.129-.191-.323-.249-.515-.156-.051.025-.457.257-.903.517-1.028.598-1.213.677-1.731.742a2.907 2.907 0 0 1-.956-.066 2.654 2.654 0 0 1-1.919-2.024c-.073-.329-.055-.901.04-1.238A2.708 2.708 0 0 1 2.7 6.135c.103-.068.545-.33.983-.584.886-.515.905-.531.905-.768a.38.38 0 0 0-.387-.383c-.106 0-.192.044-.94.478m6.039.02c-.111.034-4.335 2.501-4.393 2.566-.254.284.043.75.403.631.164-.055 4.292-2.464 4.382-2.558a.38.38 0 0 0-.128-.615c-.108-.049-.164-.054-.264-.024"
        fill-rule="evenodd"
      />
    </svg>
  );
};

export { CopyLink };