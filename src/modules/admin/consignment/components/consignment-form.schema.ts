import { MsgValidation } from '@/constants/enums';
import { phoneValidate } from '@/lib/zod';
import { z } from 'zod';

const ConsignmentSchema = z.object({
  // Chính chủ / tin nhanh
  type: z.coerce
    .number({ message: MsgValidation.SELECT_REQUIRED })
    .min(1, MsgValidation.SELECT_REQUIRED),

  // Loại hình nhà đất
  property_type: z
    .string({ message: MsgValidation.SELECT_REQUIRED })
    .min(1, MsgValidation.SELECT_REQUIRED),

  // Thành phố
  city: z.coerce
    .number({ message: MsgValidation.SELECT_REQUIRED })
    .min(1, MsgValidation.SELECT_REQUIRED),

  // Quận/Huyện
  district: z.coerce.number().optional(),

  // Địa chỉ
  address: z.string({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  // Số điện thoại chủ nhà
  owner_phone: phoneValidate,

  // Giá
  price: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  // Diện tích
  area: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  // Giá thoả thuận
  price_type: z.boolean().optional(),

  // Tiêu đề
  title: z.string({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  // Nội dung
  content: z.string({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),
});

type ConsignmentSchemaType = z.infer<typeof ConsignmentSchema>;

export { ConsignmentSchema, type ConsignmentSchemaType };
