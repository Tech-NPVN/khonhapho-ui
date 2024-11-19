import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const AreaRangeSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  description: z.string().trim().optional(),
  order: z.number().default(0).optional(),
});

type AreaRangeSchemaType = z.infer<typeof AreaRangeSchema>;

export { AreaRangeSchema, type AreaRangeSchemaType };
