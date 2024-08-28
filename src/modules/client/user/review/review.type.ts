import dayjs from 'dayjs';

type ReviewType = {
  report_time: string | dayjs.Dayjs;
  visit_time: string | dayjs.Dayjs;
  address_visited: string;
  rate_house_owner?: string;
  report_images: string[];
  saler: {
    saler_avatar?: string;
    saler_name: string;
    saler_contact: string;
    saler_opinition: string;
  };
  customer: {
    customer_name: string;
    customer_identity: string;
    customer_address: string;
    customer_purpose: string;
    customer_reply: string;
  };
};

export type { ReviewType };
