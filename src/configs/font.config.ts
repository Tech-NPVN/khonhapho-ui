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

const sfProPlayFont = localFont({
  src: [
    {
      path: '../../public/fonts/SFPro-Display-Black-Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFPro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFPro-Display-Heavy-Italic.otf',
      weight: '700',
      style: 'heavy',
    },
    {
      path: '../../public/fonts/SFPro-Display-Light-Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFPro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFPro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFPro-Display-Semibold-Italic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFPro-Display-Thin-Italic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFPro-Display-Ultralight-Italic.otf',
      weight: '100',
      style: 'italic',
    },
  ],
});

export { seGoeUiFont, sfProPlayFont };
