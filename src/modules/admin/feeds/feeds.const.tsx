import { Navigations, Routes } from '@/constants/enums';
import { getItem, MenuType } from '@/layouts';

const itemsAdminFeeds: MenuType[] = [
  getItem(Navigations.Deals, Routes.FeedsDeal, undefined, undefined, 'sidebar-item'),
  getItem(Navigations.Urgently, Routes.FeedsUrgently, undefined, undefined, 'sidebar-item'),
  getItem(Navigations.ShareSkill, Routes.FeedsSkill, undefined, undefined, 'sidebar-item'),
  getItem(Navigations.LibKnowledge, Routes.FeedsLibKnowledge, undefined, undefined, 'sidebar-item'),
  getItem(Navigations.LibOwner, Routes.FeedsLibOwner, undefined, undefined, 'sidebar-item'),
  getItem(Navigations.LibAssist, Routes.FeedsLibAssist, undefined, undefined, 'sidebar-item'),
  getItem(Navigations.LibManager, Routes.FeedsLibManager, undefined, undefined, 'sidebar-item'),
  getItem(
    Navigations.FeedsCategories,
    Routes.FeedsCategories,
    undefined,
    undefined,
    'sidebar-item',
  ),
];

export { itemsAdminFeeds };
