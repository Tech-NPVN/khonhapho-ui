import { emailValidate } from '@/lib/zod';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: emailValidate,
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export { ForgotPasswordSchema, type ForgotPasswordSchemaType };
