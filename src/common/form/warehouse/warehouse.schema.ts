import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { UploadFile } from 'antd';
import { z } from 'zod';

// Maximum file size in bytes (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const SPECIFIC_CHARATERS_REGEX = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/

const WarehouseFormSchema = z.object({
  // Loại hình
  property_type: z
    .string({ message: 'Vui lòng chọn loại hình.' })
    .min(1, 'Vui lòng chọn loại hình.'),

  // Đặc điẻm
  property_feature: z
    .string({ message: 'Vui lòng chọn ít nhất 1 đặc điểm.' })
    .array()
    .min(1, 'Vui lòng chọn ít nhất 1 đặc điểm.')
    .max(5, 'Tối đa 5 đặc điểm.'),

  // Thành phố
  c1ty: z.string({ message: 'Vui lòng chọn Thành phố.' }).min(1, 'Vui lòng chọn Thành phố.'),

  // Quận/Huyện
  district: z.string({ message: 'Vui lòng chọn Quận/Huyện.' }).min(1, 'Vui lòng chọn Quận/Huyện.'),

  // Đường/Phố
  street: z.string({ message: 'Vui lòng chọn Đường/Phố.' }).min(1, 'Vui lòng chọn Đường/Phố.'),

  // Ngõ, hẻm, số nhà, số phòng
  house_number: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Dự án/Khu đô thị/Chung cư
  project: z.string().optional(),

  // Thông số nhà
  spec: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Hoa hồng
  bonus_value: z.coerce.number({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Đơn vị hoa hồng
  bonus_type: z.enum(['percent', 'million', 'billion']).default('percent').optional(),

  // Loại hợp đồng
  contract_type: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Cầu đối tác
  bonus_referral: z.coerce.number().min(0, 'Tối thiểu 0%').max(10, 'Tối đa 10%').optional(),

  // Tiêu đề (tự động)
  title: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Nội dung
  content: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(50, 'Tối thiểu 50 từ')
    .max(3000, 'Tối đa 3000 ký tự'),

  // Pháp lý
  legal_status: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Serial sổ
  number_certificate: z
    .array(z.string())
    .refine((values) => {
      return values?.every(
        (value) => SPECIFIC_CHARATERS_REGEX.test(value) && value.length >= 5,
      );
    }, 'Đủ 5 ký tự trở lên và không bao gồm ký tự đặc biệt.')
    .optional(),

  // Số điện thoại chủ nhà
  owner_phone: z.string({ message: REQUIRED_MSG_SAMPLE }).length(10, 'SĐT phải đủ 10 số.').trim(),

  // Ảnh (tối đa 12 ảnh)
  images: z
    .array(z.any(), { required_error: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(12, 'Tối đa 12 ảnh.'),

  // Video (tối đa 4 video và không vượt quá 50MB/video)
  videos: z
    .array(z.any())
    .max(4, 'Tối đa 4 videos.')
    .refine((values: UploadFile[]) => {
      return values.every((file) => Number(file.size) <= MAX_FILE_SIZE);
    }, 'Không vượt quá 50MB/video')
    .optional(),

  // Ảnh sổ đỏ pháp lý, hợp đồng trích thưởng (tối đa 20 ảnh)
  private_images: z
    .array(z.any(), { required_error: REQUIRED_MSG_SAMPLE }) 
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(20, 'Tối đa 20 ảnh.'),

  // Audio ghi âm pháp lý, hợp đồng trích thưởng (tối đa 4 audio)
  audios: z.array(z.any()).max(4, 'Tối đa 4 audio.').optional(),
});

type WarehouseFormSchemaType = z.infer<typeof WarehouseFormSchema>;

export { WarehouseFormSchema, type WarehouseFormSchemaType };
