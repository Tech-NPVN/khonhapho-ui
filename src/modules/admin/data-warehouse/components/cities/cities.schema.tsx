import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const CitiesSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),

  code: z.string({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  slug: z.string().trim().optional(),
});

type CitiesSchemaType = z.infer<typeof CitiesSchema>;

export { CitiesSchema, type CitiesSchemaType };
