import localFont from 'next/font/local';

const seGoeUiFont = localFont({
  src: [
    {
      path: '../../public/fonts/Segoe-UI.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe-UI-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Segoe-UI-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe-UI-Bold-Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-segue-ui',
});

export default seGoeUiFont;
