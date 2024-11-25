import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const LegalStatusSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  description: z.string().optional(),
  order: z.coerce.number().default(0).optional(),
});

type LegalStatusSchemaType = z.infer<typeof LegalStatusSchema>;

export { LegalStatusSchema, type LegalStatusSchemaType };
