import { Routes } from '@/constants/enums';
import { redirect } from 'next/navigation';

const MemberPage = () => {
  return redirect(Routes.SettingsMember + '/area');
};

export default MemberPage;
