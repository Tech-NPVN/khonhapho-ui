import { Routes } from '@/constants/enums';
import { redirect } from 'next/navigation';

const FeedsPage = () => {
  return redirect(Routes.FeedsDeal);
};

export default FeedsPage;
