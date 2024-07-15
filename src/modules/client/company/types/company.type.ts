type CompanyType = {
  rate: number;
  full_name: string;
  role: string;
  achievement?: string[];
  birth_year: Date | string;
  phone_number: string;
  contact?: ContactType[];
  department: string;
  branch: string;
};

type ContactType = {
  url: string;
  social: 'zalo' | 'messenger' | 'facebook' | 'nhapho';
};

export type { CompanyType, ContactType };
