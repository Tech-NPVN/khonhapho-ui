enum Routes {
  // (auth)
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  ConfirmCode = '/confirm-code',

  // (client)
  Home = '/',

  Warehouse = '/warehouse',
  WarehouseCreate = '/warehouse/create',

  Urgently = '/urgently',

  ActivityNews = '/activity-news',
  ActivityNewsAll = '/activity-news/all',
  ActivityNewsBranch = '/activity-news/branch',
  ActivityNewsDeals = '/activity-news/deals',
  ActivityNewsDepartment = '/activity-news/department',
  ActivityNewsGroup = '/activity-news/group',

  Regulation = '/regulation',
  ListCompany = '/list-company',

  LibNhaPho = '/lib-nhapho',
  LibKnowledge = '/lib-nhapho/knowledge',
  ShareSkill = '/lib-nhapho/skill',
  LibManager = '/lib-nhapho/manager',
  LibOwner = '/lib-nhapho/owner',
  LibAssist = '/lib-nhapho/assist',

  Stock = '/stock',
  StockOwn = '/stock/own',
  StockConsignment = '/stock/consignment',
  StockNovendors = '/stock/novendors',
  StockAppointment = '/stock/appointment',
  StockReview = '/stock/review',

  User = '/user',
  UserCustomers = '/user/customers',
  UserAppointment = '/user/appointment',
  UserReview = '/user/review',
  UserCollection = '/user/collection',
  UserProfile = '/user/profile',

  // (admin)
  AdminHome = '/admin',

  ChatGroup = '/admin/chat-group',
  ChatSettingGroup = '/admin/chat-setting-group',
  TrainingSchedule = '/admin/training-schedule',
  MeetingSchedule = '/admin/meeting-schedule',

  Feeds = '/admin/feeds',
  FeedsDeal = '/admin/feeds/deal',
  FeedsUrgently = '/admin/feeds/urgently',
  FeedsSkill = '/admin/feeds/skill',
  FeedsLibKnowledge = '/admin/feeds/lib-knowledge',
  FeedsLibOwner = '/admin/feeds/lib-owner',
  FeedsLibAssist = '/admin/feeds/lib-assist',
  FeedsLibManager = '/admin/feeds/lib-manager',
  FeedsCategories = '/admin/feeds/categories',

  AdminWarehouse = '/admin/warehouse',
  AdminConsignment = '/admin/consignment',
  AdminUsers = '/admin/users',
  AdminCandidate = '/admin/candidate',
  AdminRefferal = '/admin/referral',

  DataWarehouse = '/admin/data-warehouse',

  DataUsers = '/admin/data-users',

  CompanySetting = '/admin/company-setting',
  Stickers = '/admin/stickers',
}

export { Routes };
