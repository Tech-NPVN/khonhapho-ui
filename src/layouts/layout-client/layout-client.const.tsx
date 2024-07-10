import { Navigations, Routes } from '@/constants/enums';
import { MenuType } from './layout-client.type';
import {
  ActivityNewsIcon,
  AdminPageIcon,
  BuyUrgentlyIcon,
  CollapseIcon,
  LibraryIcon,
  ListCompanyIcon,
  LogoutIcon,
  RegulationIcon,
  ResourceWarehouseIcon,
  WarehouseManagementIcon,
} from '@/components/icons';

const MenuLabel = ({ label }: { label: string }) => {
  return (
    <>
      <span className="mr-3">•</span>
      {label}
    </>
  );
};

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuType[],
  className?: string,
): MenuType => {
  return {
    key,
    icon,
    children,
    label,
    className,
  } as MenuType;
};

const items: MenuType[] = [
  getItem(
    Navigations.Warehouse,
    Routes.Warehouse,
    <ResourceWarehouseIcon className="w-7" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.Urgently,
    Routes.Urgently,
    <BuyUrgentlyIcon className="w-7" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.ActivityNews,
    Routes.ActivityNews,
    <ActivityNewsIcon className="w-7" />,
    [
      getItem(
        <MenuLabel label={Navigations.All} />,
        Routes.ActivityNewsAll,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.Deals} />,
        Routes.ActivityNewsDeals,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.Branch} />,
        Routes.ActivityNewsBranch,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.Department} />,
        Routes.ActivityNewsDepartment,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.Group} />,
        Routes.ActivityNewsGroup,
        undefined,
        undefined,
        'sidebar-item',
      ),
    ],
    'sidebar-item-dropdown',
  ),
  getItem(
    Navigations.Regulation,
    Routes.Regulation,
    <RegulationIcon className="w-7" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.ListCompany,
    Routes.ListCompany,
    <ListCompanyIcon className="w-7" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.LibNhaPho,
    Routes.LibNhaPho,
    <LibraryIcon className="w-7" />,
    [
      getItem(
        <MenuLabel label={Navigations.LibKnowledge} />,
        Routes.LibKnowledge,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.ShareSkill} />,
        Routes.ShareSkill,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.LibManager} />,
        Routes.LibManager,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.LibOwner} />,
        Routes.LibOwner,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.LibAssist} />,
        Routes.LibAssist,
        undefined,
        undefined,
        'sidebar-item',
      ),
    ],
    'sidebar-item-dropdown',
  ),
  getItem(
    Navigations.Stock,
    Routes.Stock,
    <WarehouseManagementIcon className="w-7" />,
    [
      getItem(
        <MenuLabel label={Navigations.StockOwn} />,
        Routes.StockOwn,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.StockConsignment} />,
        Routes.StockConsignment,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.StockNovendors} />,
        Routes.StockNovendors,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.StockAppointment} />,
        Routes.StockAppointment,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.StockReview} />,
        Routes.StockReview,
        undefined,
        undefined,
        'sidebar-item',
      ),
    ],
    'sidebar-item-dropdown',
  ),
  getItem('Đăng xuất', 'logout', <LogoutIcon className="w-7" />, undefined, 'sidebar-item'),
  getItem(
    Navigations.Admin,
    Routes.AdminHome,
    <AdminPageIcon className="w-7" />,
    undefined,
    'sidebar-item',
  ),
];

const itemsBottom: MenuType[] = [
  getItem(
    'Thu nhỏ lại',
    'collapse',
    <CollapseIcon className="w-7" />,
    undefined,
    'sidebar-item [&.ant-menu-item-selected]:bg-transparent',
  ),
];

export { items, itemsBottom, getItem };
