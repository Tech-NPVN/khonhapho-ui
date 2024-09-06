import dayjs from "dayjs";

enum WarehouseStatusEnum {
  HaChao = 'ha-chao',
  TangChao = 'tang-chao',
  BanManh = 'ban-manh',
  TamDung = 'tam-dung',
  DungBan = 'dung-ban',
  DaBan = 'da-ban',
  DaChot = 'da-chot',
}

type WarehouseType = {
  saved: boolean;
  date: string | dayjs.Dayjs;
  status: WarehouseStatusEnum;
  address: string;
  city: string;
  district: string;
  params: string;
  price: {
    value: number;
    unit: 'billion' | 'million';
  };
  million_per_square_meters: number;
  owner: {
    name: string;
    phone_number: string;
    profile_url: string;
    contact?: {
      type: 'zalo' | 'messenger' | 'khonhapho';
      url: string;
    }[];
  };
  feature: string[];
};

export { type WarehouseType, WarehouseStatusEnum };
