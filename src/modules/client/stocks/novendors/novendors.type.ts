import dayjs from 'dayjs';
import { WarehouseStatusEnum } from '../../warehouse';

type NovendorType = {
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

export type { NovendorType };
