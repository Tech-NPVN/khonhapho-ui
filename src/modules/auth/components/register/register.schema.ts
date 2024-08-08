import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { z } from 'zod';

const RegisterSchema = z
  .object({
    // Họ và tên
    full_name: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, { message: REQUIRED_MSG_SAMPLE }),

    // Email
    email: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .email({ message: 'Không đúng định dạng email' })
      .min(1, { message: REQUIRED_MSG_SAMPLE }),

    // Số điện thoại
    phone_number: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .length(10, { message: 'Số điện thoại bao gồm 10 số.' }),

    // Mật khẩu
    password: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .min(6, { message: 'Nhập ít nhất 6 ký tự.' }),

    // Xác minh mật khẩu
    password_confirm: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .min(6, { message: 'Nhập ít nhất 6 ký tự.' }),

    // phone_number_familiar: z
    //   .string()
    //   .length(10, { message: 'Số điện thoại bao gồm 10 số' })
    //   .optional(),
    // idenfity: z
    //   .string()
    //   .min(12, { message: 'Căn cước công dân bao gồm 12 số' })
    //   .max(12, { message: 'Căn cước công dân bao gồm 12 số' })
    //   .optional(),
    // date_of_issuance: z
    //   .preprocess((arg) => {
    //     if (dayjs.isDayjs(arg)) {
    //       return arg.toDate();
    //     }
    //     return arg;
    //   }, z.date({ message: 'Vui lòng chọn ngày cấp' }))
    //   .nullable(),
    // address: z
    //   .string({ message: 'Vui lòng nhập địa chỉ thường trú' })
    //   .min(1, { message: 'Vui lòng nhập địa chỉ thường trú' }),
    // address_current: z.string().optional(),
    // date_of_birth: z
    //   .preprocess((arg) => {
    //     if (dayjs.isDayjs(arg)) {
    //       return arg.toDate();
    //     }
    //     return arg;
    //   }, z.date({ message: 'Vui lòng chọn ngày sinh' }))
    //   .nullable(),
    // url_facebook: z.string().url({ message: 'URL không hợp lệ' }).optional(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Mật khẩu không khớp.',
    path: ['password_confirm'],
  });

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type RegisterSchemaType };
