import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const DistrictsSchema = z.object({
  city: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),
  
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),

  code: z.string({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  slug: z.string().trim().optional(),
});

type DistrictsSchemaType = z.infer<typeof DistrictsSchema>;

export { DistrictsSchema, type DistrictsSchemaType };
