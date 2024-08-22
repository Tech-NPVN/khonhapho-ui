import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { identityValidate, phoneValidate } from '@/lib/zod';
import { z } from 'zod';

const CustomerSchema = z.object({
  // Đánh giá
  rate: z.number().optional(),

  // Họ và tên
  full_name: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // CMND hoặc Thẻ căn cước của khách (Hoàn toàn được bảo mật)
  cccd: identityValidate,

  // Năm sinh khách
  birthday: z.string({ message: REQUIRED_MSG_SAMPLE }).length(4, 'Năm sinh chưa hơp lệ.'),

  // SĐT khách (Hoàn toàn được bảo mật)
  phone: phoneValidate.optional(),

  // Nơi khách ở
  address: z.string().optional(),

  // Tài chính tối đa
  money: z.number({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Khu vực cần mua
  districts_city: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Quận/Huyện
  districts_district: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .array()
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(3, 'Tối đa 3 đặc điểm.'),

  // Hướng nhà
  direction: z.string().optional(),

  // Mục đích mua
  purpose: z.string().optional(),

  // Tài chính sẵn sàng?
  finance_status: z.boolean().optional(),

  // Đã mua hụt nhà?
  miss: z.boolean().optional(),

  // Hiểu thị trường?
  understand: z.boolean().optional(),

  // Tôn trọng môi trường?
  honored: z.boolean().optional(),

  // Cần mua gấp?
  urgently: z.boolean().optional(),

  // Ghi chú yêu cầu
  description: z.string().optional(),

  // Hiện trạng
  purchase_status: z.string().optional(),
});

type CustomerSchemaType = z.infer<typeof CustomerSchema>;

export { CustomerSchema, type CustomerSchemaType };
