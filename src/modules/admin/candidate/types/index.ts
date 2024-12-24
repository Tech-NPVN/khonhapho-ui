export type CandidateType = {
  id: string;
  created_at: string;
  candidate_name: string;
  candidate_birthday: string;
  candidate_address?: string;
  candidate_phone?: string;
  candidate_email?: string;
  candidate_id?: string;
  interview_time?: string;
  interviewer?: string;
  duplicate?: boolean;
  images?: any;
};
