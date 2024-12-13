import { Routes } from '@/constants/enums';
import { getItem, MenuType } from '@/layouts';

export const menuSettingsMember: MenuType[] = [
  getItem('Khu vực', Routes.SettingsMember + '/area', undefined, undefined, 'sidebar-item'),
  getItem('Tỉnh', Routes.SettingsMember + '/province', undefined, undefined, 'sidebar-item'),
  getItem('Chi nhánh', Routes.SettingsMember + '/branch', undefined, undefined, 'sidebar-item'),
  getItem('Khối', Routes.SettingsMember + '/block', undefined, undefined, 'sidebar-item'),
  getItem(
    'Phòng ban',
    Routes.SettingsMember + '/department',
    undefined,
    undefined,
    'sidebar-item',
  ),
  getItem('Nhóm', Routes.SettingsMember + '/group', undefined, undefined, 'sidebar-item'),
  getItem('Huy hiệu', Routes.SettingsMember + '/medal', undefined, undefined, 'sidebar-item'),
];
