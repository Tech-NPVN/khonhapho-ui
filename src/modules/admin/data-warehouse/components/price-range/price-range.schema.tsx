import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const PriceRangeSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  description: z.string().optional(),
  order: z.number().default(0).optional(),
});

type PriceRangeSchemaType = z.infer<typeof PriceRangeSchema>;

export { PriceRangeSchema, type PriceRangeSchemaType };
