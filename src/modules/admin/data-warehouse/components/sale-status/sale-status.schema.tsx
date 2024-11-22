import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const SaleStatusSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  description: z.string().trim().optional(),
  order: z.coerce.number().default(0).optional(),
});

type SaleStatusSchemaType = z.infer<typeof SaleStatusSchema>;

export { SaleStatusSchema, type SaleStatusSchemaType };
