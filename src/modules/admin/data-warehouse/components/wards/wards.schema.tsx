import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const WardsSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),

  city: z.coerce.number({ message: MsgValidation.SELECT_REQUIRED }).min(1, MsgValidation.SELECT_REQUIRED),

  district: z.coerce.number({ message: MsgValidation.SELECT_REQUIRED }).min(1, MsgValidation.SELECT_REQUIRED),

  code: z.string().trim().optional(),

  slug: z.string().trim().optional(),
});

type WardsSchemaType = z.infer<typeof WardsSchema>;

export { WardsSchema, type WardsSchemaType };
