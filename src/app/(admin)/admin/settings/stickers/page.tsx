import dynamic from 'next/dynamic';

const SettingsStickerPageDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-sticker').then((res) => res.SettingsStickerIndex),
  {
    ssr: false,
  },
);

const SettingsStickerPage = () => {
  return <SettingsStickerPageDynamic />;
};

export default SettingsStickerPage;
