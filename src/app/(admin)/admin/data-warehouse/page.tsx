import { Routes } from '@/constants/enums';
import { redirect } from 'next/navigation';

const DataWarehousePage = () => {
  return redirect(Routes.DataWarehouse + '/legal-status');
};

export default DataWarehousePage;
