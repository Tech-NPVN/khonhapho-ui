export type ReferralType = {
  id: number;
  code: string;
  status: 'activated' | 'inactive' | 'expired';
  branch: string;
  created_at: string;
  department?: string;
  person_used?: string;
  role?: string;
};
