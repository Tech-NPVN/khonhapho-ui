import dynamic from 'next/dynamic';

const SettingsCompanyPageDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-company').then((res) => res.SettingsCompanyIndex),
  {
    ssr: false,
  },
);

const SettingsCompanyPage = () => {
  return <SettingsCompanyPageDynamic />;
};

export default SettingsCompanyPage;
