import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const BranchSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  city: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
  headquarters: z.boolean().default(false),
});

type BranchSchemaType = z.infer<typeof BranchSchema>;

export { BranchSchema, type BranchSchemaType };
