import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const StreetsSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),

  city: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  district: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  code: z.string().trim().optional(),

  slug: z.string().trim().optional(),
});

type StreetsSchemaType = z.infer<typeof StreetsSchema>;

export { StreetsSchema, type StreetsSchemaType };
