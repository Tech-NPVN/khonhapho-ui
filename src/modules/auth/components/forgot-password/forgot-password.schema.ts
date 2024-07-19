import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z
    .string({ message: 'Vui lòng nhập Email' })
    .email({ message: 'Email không đúng định dạng' })
    .min(1, { message: 'Vui lòng nhập Email' }),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export { ForgotPasswordSchema, type ForgotPasswordSchemaType };
