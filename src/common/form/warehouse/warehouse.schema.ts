import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { z } from 'zod';

const WarehouseFormSchema = z.object({
  property_type: z
    .string({ message: 'Vui lòng chọn loại hình.' })
    .min(1, 'Vui lòng chọn loại hình.'),
  property_feature: z
    .string({ message: 'Vui lòng chọn ít nhất 1 đặc điểm.' })
    .array()
    .min(1, 'Vui lòng chọn ít nhất 1 đặc điểm.'),
  c1ty: z.string({ message: 'Vui lòng chọn Thành phố.' }).min(1, 'Vui lòng chọn Thành phố.'),
  district: z.string({ message: 'Vui lòng chọn Quận/Huyện.' }).min(1, 'Vui lòng chọn Quận/Huyện.'),
  street: z.string({ message: 'Vui lòng chọn Đường/Phố.' }).min(1, 'Vui lòng chọn Đường/Phố.'),
  house_number: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  project: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  spec: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  bonus_value: z.number({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  bonus_type: z.enum(['percent', 'million', 'billion']).default('percent').optional(),
  contract_type: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  bonus_referral: z.coerce.number().min(0, 'Tối thiểu 0%').max(30, 'Tối đa 30%').optional(),
  title: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  content: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(50, 'Tối thiểu 50 từ')
    .max(3000, 'Tối đa 3000 ký tự'),
  legal_status: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  number_certificate: z.array(z.string()).optional(),
  owner_phone: z.string({ message: REQUIRED_MSG_SAMPLE }).length(10, 'SĐT phải đủ 10 số.').trim(),

  // Upload
  images: z.any(),
  videos: z.any().optional(),
  private_images: z.any(),
  audios: z.any().optional(),
});

type WarehouseCreateSchemaType = z.infer<typeof WarehouseFormSchema>;

export { WarehouseFormSchema as WarehouseCreateSchema, type WarehouseCreateSchemaType };
