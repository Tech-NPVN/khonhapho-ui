import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const GroupSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  description: z.string().trim().optional(),
  department: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
});

type GroupSchemaType = z.infer<typeof GroupSchema>;

export { GroupSchema, type GroupSchemaType };
