import { z } from 'zod';

const LoginSchema = z.object({
  phone_number_or_identify: z
    .string({ message: 'Vui lòng nhập SĐT hoặc CCCD' })
    .trim()
    .min(1, { message: 'Vui lòng nhập SĐT hoặc CCCD' }),
  password: z
    .string({ message: 'Vui lòng nhập mật khẩu' })
    .trim()
    .min(6, { message: 'Vui lòng nhập ít nhất 6 ký tự' }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export { LoginSchema, type LoginSchemaType };
