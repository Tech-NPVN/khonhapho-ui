import { Navigations, Routes } from '@/constants/enums';
import { getItem, MenuType } from '@/layouts';

const menuWarehouseData: MenuType[] = [
  getItem(
    Navigations.DataWarehouseLegalStatus,
    Routes.DataWarehouse + '/legal-status',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehousePriceRange,
    Routes.DataWarehouse + '/price-range',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseAreaRange,
    Routes.DataWarehouse + '/area-range',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseSaleStatus,
    Routes.DataWarehouse + '/sale-status',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseContractType,
    Routes.DataWarehouse + '/contract-type',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehousePropertyType,
    Routes.DataWarehouse + '/property-type',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehousePurpose,
    Routes.DataWarehouse + '/purpose',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehousePropertyFeat,
    Routes.DataWarehouse + '/property-feat',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseProject,
    Routes.DataWarehouse + '/project',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseCities,
    Routes.DataWarehouse + '/cities',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseDistricts,
    Routes.DataWarehouse + '/districts',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseStreets,
    Routes.DataWarehouse + '/streets',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouseConsignment,
    Routes.DataWarehouse + '/consignment',
    undefined,
    undefined,
    'sidebar-item',
  ),
];

export { menuWarehouseData };
