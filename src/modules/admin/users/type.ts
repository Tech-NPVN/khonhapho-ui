export type UserType = {
  id: number;
  name: string;
  role: string;
  branch: string;
  group?: string;
  avatar: string;
  email?: string;
  expiry?: string;
  birthday?: string;
  department: string;
  deleted_at?: string;
  phone_number: string;
  citizen_identification: string;
  social_network?: {
    zalo?: string;
    facebook?: string;
    messenger?: string;
  };
  created_at?: string;
  updated_at?: string;
};
