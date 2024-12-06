import { Navigations, Routes } from '@/constants/enums';
import {
  ActivityNewsIcon,
  AdminPageIcon,
  AdminWarehouseIcon,
  BuyUrgentlyIcon,
  CandidateIcon,
  ChatGroupIcon,
  ChatSettingGroupIcon,
  CollapseIcon,
  ConsignmentIcon,
  DarkIcon,
  DataWarehouseIcon,
  FeedsIcon,
  LibraryIcon,
  LightIcon,
  ListCompanyIcon,
  LogoutIcon,
  MeetingScheduleIcon,
  NewsIcon,
  PersonalIcon,
  RefferalIcon,
  RegulationIcon,
  ResourceWarehouseIcon,
  SettingCompanyIcon,
  TrainingScheduleIcon,
  WarehouseManagementIcon,
} from '@/components/icons';
import { MenuType } from './layout.type';
import { getItem } from './layout.util';
import { TabLabelWithBadge } from '@/components/common';

const MenuLabel = ({ label }: { label: string }) => {
  return (
    <>
      <span className="mr-3">•</span>
      {label}
    </>
  );
};

const itemsClient: MenuType[] = [
  getItem(
    Navigations.Warehouse,
    Routes.Warehouse,
    <ResourceWarehouseIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.Urgently,
    Routes.Urgently,
    <BuyUrgentlyIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.ActivityNews,
    Routes.ActivityNews,
    <ActivityNewsIcon className="w-8" />,
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
    <RegulationIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.ListCompany,
    Routes.ListCompany,
    <ListCompanyIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.LibNhaPho,
    Routes.LibNhaPho,
    <LibraryIcon className="w-8" />,
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
    <WarehouseManagementIcon className="w-8" />,
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
  getItem(
    Navigations.User,
    Routes.UserCustomers,
    <PersonalIcon className="w-8" />,
    [
      getItem(
        <MenuLabel label={Navigations.UserCustomers} />,
        Routes.UserCustomers,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.UserAppointment} />,
        Routes.UserAppointment,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.UserReview} />,
        Routes.UserReview,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.UserCollection} />,
        Routes.UserCollection,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.UserProfile} />,
        Routes.UserProfile,
        undefined,
        undefined,
        'sidebar-item',
      ),
    ],
    'sidebar-item-dropdown',
  ),
  getItem('Đăng xuất', 'logout', <LogoutIcon className="w-8" />, undefined, 'sidebar-item'),
  getItem(
    Navigations.Admin,
    Routes.AdminHome,
    <AdminPageIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
];

const itemsAdmin: MenuType[] = [
  getItem(
    Navigations.Admin,
    Routes.AdminHome,
    <AdminPageIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.ChatGroup,
    Routes.ChatGroup,
    <ChatGroupIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.ChatSettingGroup,
    Routes.ChatSettingGroup,
    <ChatSettingGroupIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.TrainingSchedule,
    Routes.TrainingSchedule,
    <TrainingScheduleIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.MeetingSchedule,
    Routes.MeetingSchedule,
    <MeetingScheduleIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem('Bảng tin', Routes.Home, <NewsIcon className="w-8" />, undefined, 'sidebar-item'),
  getItem(
    Navigations.Feeds,
    Routes.Feeds,
    <FeedsIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    <TabLabelWithBadge title={Navigations.AdminWarehouse} count={2} className="justify-between" />,
    Routes.AdminWarehouse,
    <AdminWarehouseIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.AdminConsignment,
    Routes.AdminConsignment,
    <ConsignmentIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.AdminUsers,
    Routes.AdminUsers,
    <ListCompanyIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.AdminCandidate,
    Routes.AdminCandidate,
    <CandidateIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.AdminRefferal,
    Routes.AdminRefferal,
    <RefferalIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.DataWarehouse,
    Routes.DataWarehouse + '/legal-status',
    <DataWarehouseIcon className="w-8" />,
    undefined,
    'sidebar-item',
  ),
  getItem(
    Navigations.SettingsCompany,
    Routes.SettingsCompany,
    <SettingCompanyIcon className="w-8" />,
    [
      getItem(
        <MenuLabel label={Navigations.SettingsMember} />,
        Routes.SettingsMember + '/area',
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.SettingsCompany} />,
        Routes.SettingsCompany,
        undefined,
        undefined,
        'sidebar-item',
      ),
      getItem(
        <MenuLabel label={Navigations.SettingsSticker} />,
        Routes.SettingsSticker,
        undefined,
        undefined,
        'sidebar-item',
      ),
    ],
    'sidebar-item-dropdown',
  ),
  // getItem(
  //   Navigations.DataUsers,
  //   Routes.DataUsers,
  //   <DataUsersIcon className="w-8" />,
  //   undefined,
  //   'sidebar-item',
  // ),
  // getItem(
  //   Navigations.CompanySetting,
  //   Routes.CompanySetting,
  //   <SettingCompanyIcon className="w-8" />,
  //   undefined,
  //   'sidebar-item',
  // ),
  // getItem(
  //   Navigations.Stickers,
  //   Routes.Stickers,
  //   <StickerIcon className="w-8" />,
  //   undefined,
  //   'sidebar-item',
  // ),
];

const itemsBottom = (isLightMode: boolean, collapsed: boolean): MenuType[] => {
  return [
    getItem(
      collapsed ? 'Mở rộng' : 'Thu gọn',
      'collapse',
      <CollapseIcon className={`w-8 ${collapsed ? 'rotate-180' : ''}`} />,
      undefined,
      'sidebar-item [&.ant-menu-item-selected]:bg-transparent',
    ),
    getItem(
      `Chế độ ${isLightMode ? 'tối' : 'sáng'}`,
      'mode',
      isLightMode ? <DarkIcon className="w-8" /> : <LightIcon className="w-8" />,
      undefined,
      'sidebar-item [&.ant-menu-item-selected]:bg-transparent flex-row-reverse',
    ),
  ];
};

export { itemsClient, itemsAdmin, itemsBottom };
