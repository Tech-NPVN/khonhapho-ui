enum Routes {
  // (auth)
  Login = '/login',
  Register = '/register',

  // (client)
  Home = '/',
  // Collection = '/collection',
  Warehouse = '/warehouse',
  // MainInformationWarehouse = '/main-information-warehouse',
  FreeNewsWarehouse = '/free-news-warehouse',
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
}

export { Routes };
