export type ScheduleTypes = {
  id?: string;
  time?: {
    date?: string;
    start_time?: string;
    end_time?: string;
  };
  name?: string;
  content?: string;
  location?: string;
  area: string;
  role?: string[];
  created_at?: string;
  updated_at?: string;
  qr_code?: {
    check_in?: string;
    check_out?: string;
  };
};
