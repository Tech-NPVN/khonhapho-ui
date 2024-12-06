import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const AreaSchema = z.object({
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

type AreaSchemaType = z.infer<typeof AreaSchema>;

export { AreaSchema, type AreaSchemaType };
