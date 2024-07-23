import dayjs from 'dayjs';
import { z } from 'zod';

const RegisterSchema = z
  .object({
    full_name: z
      .string({ message: 'Vui lòng nhập họ tên' })
      .min(1, { message: 'Vui lòng nhập họ tên' }),
    phone_number: z
      .string({ message: 'Vui lòng nhập số điện thoại' })
      .min(10, { message: 'Số điện thoại bao gồm 10 số' })
      .max(10, { message: 'Số điện thoại bao gồm 10 số' }),
    phone_number_familiar: z
      .string()
      .min(10, { message: 'Số điện thoại bao gồm 10 số' })
      .max(10, { message: 'Số điện thoại bao gồm 10 số' })
      .optional(),
    idenfity: z
      .string()
      .min(12, { message: 'Căn cước công dân bao gồm 12 số' })
      .max(12, { message: 'Căn cước công dân bao gồm 12 số' })
      .optional(),
    date_of_issuance: z
      .preprocess((arg) => {
        if (dayjs.isDayjs(arg)) {
          return arg.toDate();
        }
        return arg;
      }, z.date({ message: 'Vui lòng chọn ngày cấp' }))
      .nullable(),
    address: z
      .string({ message: 'Vui lòng nhập địa chỉ thường trú' })
      .min(1, { message: 'Vui lòng nhập địa chỉ thường trú' }),
    address_current: z.string().optional(),
    email: z
      .string({ message: 'Vui lòng nhập email' })
      .email({ message: 'Không đúng định dạng email' })
      .min(1, { message: 'Vui lòng nhập email' }),
    password: z
      .string({ message: 'Vui lòng nhập mật khẩu' })
      .min(6, { message: 'Nhập ít nhất 6 ký tự' }),
    password_confirm: z
      .string({ message: 'Vui lòng xác nhận mật khẩu' })
      .min(6, { message: 'Nhập ít nhất 6 ký tự' }),
    date_of_birth: z
      .preprocess((arg) => {
        if (dayjs.isDayjs(arg)) {
          return arg.toDate();
        }
        return arg;
      }, z.date({ message: 'Vui lòng chọn ngày sinh' }))
      .nullable(),
    url_facebook: z.string().url({ message: 'URL không hợp lệ' }).optional(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Mật khẩu không khớp',
    path: ['password_confirm'],
  });

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type RegisterSchemaType };
