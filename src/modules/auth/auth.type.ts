type User = {
  _id: number;
  title: string;
  birthday: string; // Date in ISO 8601 format
  relatives_phone: string;
  phone: string;
  email: string;
  cccd: string;
  cccd_date: string; // Date in ISO 8601 format
  address: string;
  pr_address: string;
  user_group_permission_id: number;
  is_realtor: number; // Boolean (0 or 1)
  sub_group_permission_id: number;
  job_title: string;
  job_title_id: number;
  details: string;
  detail1s: string;
  detail2s: string;
  warehouse: string;
  branch_id: number;
  block_id: string;
  depart_id: number;
  avatar: string;
  group_id: number;
  status: number;
  joined_date: null; // Can be null
  token: string;
  facebook_link: string;
  expiration_date: null; // Can be null
  order_1: number;
  order_2: number;
  full_name: string;
  enable_block_manager: boolean;
  block_manager: boolean;
  branch_name: string;
  branch_head: number;
  depart_name: string;
  depart_code: string;
  group_name: string;
  block_name: string;
  job_title_code: string;
  training: number;
  total_training: number;
  fCity: {
    _id: number;
    name: string;
  };
  fDistricts: {
    _id: number;
    name: string;
  }[];
  fPriceRange: {
    _id: string;
    name: string;
  }[];
  fFeature: any[]; // Can be any type of data
  medals: any[]; // Can be any type of data
  sticker_data: any[]; // Can be any type of data
  full_job_title: string;
  avatar_link: string;
  permission: string[];
  refresh_token: string;
  first_name: string;
  last_name: string;
  point: number;
  call_point: number;
  support_point: number;
  negotiation_point: number;
  sign_point: number;
  edit_point: number;
  point_data: {
    star_1: number;
    star_2: number;
    star_3: number;
    star_4: number;
    star_5: number;
    total_start: number;
  };
  many_login: boolean;
  config: string[];
};

export type { User };
