import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const PurposeSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  description: z.string().optional(),
  order: z.coerce.number().default(0).optional(),
});

type PurposeSchemaType = z.infer<typeof PurposeSchema>;

export { PurposeSchema, type PurposeSchemaType };
