import { z } from 'zod';

const WarehouseCreateSchema = z.object({
  property_type: z
    .string({ message: 'Vui lòng chọn loại hình.' })
    .min(1, 'Vui lòng chọn loại hình.'),
  property_feature: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 đặc điểm.'),
  c1ty: z.string({ message: 'Vui lòng chọn Thành phố.' }).min(1, 'Vui lòng chọn Thành phố.'),
  district: z.string({ message: 'Vui lòng chọn Quận/Huyện.' }).min(1, 'Vui lòng chọn Quận/Huyện.'),
  street: z.string({ message: 'Vui lòng chọn Đường/Phố.' }).min(1, 'Vui lòng chọn Đường/Phố.'),
  house_number: z.string().min(1, 'Vui lòng không bỏ trống.'),
  project: z.string().min(1, 'Vui lòng không bỏ trống.'),
  spec: z.string().min(1, 'Vui lòng không bỏ trống.'),
  bonus_value: z.string().min(1, 'Vui lòng không bỏ trống.'),
  bonus_type: z.enum(['percent', 'million', 'billion']).default('percent'),
  contract_type: z.string().min(1, 'Vui lòng không bỏ trống.'),
  bonus_referral: z.number().min(0, 'Tối thiểu 0%').max(30, 'Tối đa 30%'),
  title: z.string().min(1, 'Không được bỏ trống.'),
  content: z.string().min(50, 'Ít nhất 50 từ'),
  legal_status: z.string().min(1, 'Không được bỏ trống'),
  number_certificate: z.array(z.string()).optional(),
  owner_phone: z.string().length(10, 'SĐT phải đủ 10 số.').trim(),

  // Upload
  images: z.any(),
  videos: z.any().optional(),
  private_images: z.any(),
  audios: z.any().optional(),
});

type WarehouseCreateSchemaType = z.infer<typeof WarehouseCreateSchema>;

export { WarehouseCreateSchema, type WarehouseCreateSchemaType };
