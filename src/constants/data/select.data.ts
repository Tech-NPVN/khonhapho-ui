import { DefaultOptionType } from 'antd/es/select';

const SELECT_PRICE_UNIT = [
  { value: 'billion', display_value: 'tỷ' },
  { value: 'million', display_value: 'triệu' },
];

const SELECT_BONUS_TYPE = [
  {
    value: 'percent',
    display_value: '%',
  },
  {
    value: 'million',
    display_value: 'Triệu',
  },
  {
    value: 'billion',
    display_value: 'Tỷ',
  },
];

const SELECT_FILTER_WAREHOUSE: DefaultOptionType[] = [
  {
    value: 'hot-news',
    label: 'Tin nổi bật',
  },
  {
    value: 'lastest-news',
    label: 'Tin mới nhất',
  },
  {
    value: 'oldest-news',
    label: 'Tin cũ nhất',
  },
  {
    value: 'highest-price',
    label: 'Giá cao nhất',
  },
  {
    value: 'lowest-price',
    label: 'Giá thấp nhất',
  },
];

const SELECT_FILTER_CUSTOMER: DefaultOptionType[] = [
  {
    value: 'ngay-tao-moi-nhat',
    label: 'Ngày tạo mới nhất',
  },
  {
    value: 'ngay-tao-cu-nhat',
    label: 'Ngày tạo cũ nhất',
  },
  {
    value: 'tai-chinh-toi-da-lon-nhat',
    label: 'Tài chính tối đa lớn nhất',
  },
  {
    value: 'tai-chinh-toi-da-nho-nhat',
    label: 'Tài chính tối đa nhỏ nhất',
  },
];

const SELECT_FILTER_PROFILE: DefaultOptionType[] = [
  {
    value: 'nhom',
    label: 'Nhóm',
  },
  {
    value: 'phong',
    label: 'Phòng',
  },

  {
    value: 'chi-nhanh',
    label: 'Chi nhánh',
  },
  {
    value: 'khoi',
    label: 'Khối',
  },
  {
    value: 'thong-bao-vu-chot',
    label: 'Thông báo vụ chốt',
  },
  {
    value: 'khach-can-mua-gap',
    label: 'Khách cần mua gấp',
  },
];

// Warehouse (Đăng tin)
const SELECT_PROPERTY_TYPE = [
  {
    _id: '63fd646f999ec14887097837',
    name: 'Thổ cư',
    code: 'tho-cu',
  },
  {
    _id: '63fccba6999ec1488709033c',
    name: 'Chung cư',
    code: 'chung-cu',
  },
  {
    _id: '63fd85d6a70c1916aab988d1',
    name: 'Dự án',
    code: 'du-an',
  },
];

const SELECT_PROPERTY_FEATURE = [
  {
    _id: '63fd6494999ec14887097877',
    name: 'Mặt phố',
    code: 'mat-pho',
  },
  {
    _id: '63fd649f999ec14887097890',
    name: 'Ngõ ô tô',
    code: 'ngo-oto',
  },
  {
    _id: '63fd64b2999ec148870978aa',
    name: 'Ngõ 3 gác',
    code: 'ngo-3-gac',
  },
  {
    _id: '63fd64be999ec148870978cc',
    name: 'Ngõ xe máy',
    code: 'ngo-xe-may',
  },
  {
    _id: '64a93aa4d928df622500e290',
    name: 'Gara ô tô',
    code: 'gara-oto',
  },
  {
    _id: '63fd64cc999ec148870978ea',
    name: 'Kinh doanh',
    code: 'kinh-doanh',
  },
  {
    _id: '63fd64d9999ec148870978fe',
    name: 'Cửa hàng',
    code: 'cua-hang',
  },
  {
    _id: '63fd64e6999ec14887097915',
    name: 'Thời trang',
    code: 'thoi-trang',
  },
  {
    _id: '63fda058e83753c136e24a8c',
    name: 'Văn phòng',
    code: 'van-phong',
  },
  {
    _id: '642ea719d70e36f55110024c',
    name: 'Thang máy',
    code: 'thang-may',
  },
  {
    _id: '63fda06fe83753c136e24ab4',
    name: 'Thuê ở',
    code: 'thue-o',
  },
  {
    _id: '63fda07ee83753c136e24ae2',
    name: 'Biệt thự',
    code: 'biet-thu',
  },
  {
    _id: '63fda08fe83753c136e24b07',
    name: 'Liền kề',
    code: 'lien-ke',
  },
  {
    _id: '64ae0c13039bc6ef6edb8613',
    name: 'View Hồ - Công viên',
    code: 'view-ho-cong-vien',
  },
  {
    _id: '63fda0a4e83753c136e24b2f',
    name: 'Nhà hàng',
    code: 'nha-hang',
  },
  {
    _id: '63fda0afe83753c136e24b4f',
    name: 'Khách sạn',
    code: 'khach-san',
  },
  {
    _id: '63fda0bbe83753c136e24b60',
    name: 'Nhà nghỉ',
    code: 'nha-nghi',
  },
  {
    _id: '641133768f8d7da1a027cea9',
    name: 'Căn hộ',
    code: 'can-ho',
  },
  {
    _id: '63fda0c8e83753c136e24b90',
    name: 'Căn hộ cao cấp',
    code: 'can-ho-cao-cap',
  },
  {
    _id: '641133978f8d7da1a027ceee',
    name: 'Căn hộ tập thể',
    code: 'can-ho-tap-the',
  },
  {
    _id: '63fda0d5e83753c136e24ba9',
    name: 'Chung cư Mini',
    code: 'chung-cu-mi-ni',
  },
  {
    _id: '64239f3d7f0e2c563e9b7ec1',
    name: 'Cấp 4',
    code: 'cap-4',
  },
  {
    _id: '64239f547f0e2c563e9b7f6a',
    name: 'Đất',
    code: 'dat',
  },
  {
    _id: '648fb833f445466afaa75479',
    name: 'Dòng tiền',
    code: 'dong-tien',
  },
  {
    _id: '63fda0e1e83753c136e24bc3',
    name: 'HOMESTAY',
    code: 'homestay',
  },
  {
    _id: '6491024a945112f44b316847',
    name: 'Penthouse',
    code: 'penthouse',
  },
  {
    _id: '63fda0eee83753c136e24bd7',
    name: 'Shophouse',
    code: 'shophouse',
  },
  {
    _id: '64910369945112f44b317471',
    name: 'Condotel',
    code: 'condotel',
  },
  {
    _id: '649102b2945112f44b316d02',
    name: 'Officetel',
    code: 'officetel',
  },
  {
    _id: '63fda0f8e83753c136e24bf7',
    name: 'Resort',
    code: 'resort',
  },
  {
    _id: '63fda103e83753c136e24c06',
    name: 'Đất Dự án',
    code: 'dat-du-an',
  },
  {
    _id: '63fda115e83753c136e24c2c',
    name: 'Kho xưởng',
    code: 'kho-xuong',
  },
];

const SELECT_CONTRACT_TYPE = [
  {
    _id: '63fd63e5999ec14887097769',
    name: 'HĐ ký chính chủ (ĐC1)',
    code: 'ĐC1',
  },
  {
    _id: '63fd63f9999ec14887097781',
    name: 'HĐ ký không chính chủ (ĐC2)',
    code: 'ĐC2',
  },
  {
    _id: '63fd6436999ec148870977d8',
    name: 'HĐ ký lại chính chủ (ĐC1A)',
    code: 'ĐC1A',
  },
];

const SELECT_LEGAL_STATUS = [
  {
    _id: '63fd6297999ec1488709753c',
    name: 'Sổ đỏ/sổ hồng',
    code: 'so-do',
  },
  {
    _id: '63fd62ab999ec14887097553',
    name: 'Chưa sổ/Chờ cấp sổ',
    code: 'chua-so',
  },
  {
    _id: '6412d27575b9c23c32e60713',
    name: 'Có sổ - Thiếu Seri sổ',
    code: 'thieu-seri-so',
  },
];

// Hướng nhà
const SELECT_HOUSE_DIRECTION = [
  {
    value: 'chua-ro',
    label: 'Chưa rõ',
  },
  {
    value: 'khong-quan-trong',
    label: 'Không quan trọng',
  },
  {
    value: 'bac',
    label: 'Bắc',
  },
  {
    value: 'nam',
    label: 'Nam',
  },
  {
    value: 'dong',
    label: 'Đông',
  },
  {
    value: 'tay',
    label: 'Tây',
  },
  {
    value: 'dong-bac',
    label: 'Đông Bắc',
  },
  {
    value: 'tay-bac',
    label: 'Tây Bắc',
  },
  {
    value: 'dong-nam',
    label: 'Đông Nam',
  },
  {
    value: 'tay-nam',
    label: 'Tây Nam',
  },
  {
    value: 'dong-tu-trach',
    label: 'Đông Tứ Trach',
  },
  {
    value: 'tay-tu-trach',
    label: 'Tây Tứ Trạch',
  },
];

// Mục đích mua
const SELECT_BUY_PURPOSE = [
  {
    value: 'chua-ro',
    label: 'Chưa rõ',
  },
  {
    value: 'mua-de-o',
    label: 'Mua để ở',
  },
  {
    value: 'mua-de-kinh-doanh',
    label: 'Mua để kinh doanh',
  },
  {
    value: 'mua-de-o-va-kinh-doanh',
    label: 'Mua để ở và kinh doanh',
  },
  {
    value: 'mua-de-giu-tien',
    label: 'Mua để giữ tiền',
  },
  {
    value: 'mua-de-dau-tu-dong-tien',
    label: 'Mua để đầu tư dòng tiền',
  },
];

export {
  SELECT_PRICE_UNIT,
  SELECT_BONUS_TYPE,
  SELECT_FILTER_WAREHOUSE,
  SELECT_FILTER_CUSTOMER,
  SELECT_FILTER_PROFILE,
  SELECT_PROPERTY_TYPE,
  SELECT_PROPERTY_FEATURE,
  SELECT_CONTRACT_TYPE,
  SELECT_LEGAL_STATUS,
  SELECT_HOUSE_DIRECTION,
  SELECT_BUY_PURPOSE
};
