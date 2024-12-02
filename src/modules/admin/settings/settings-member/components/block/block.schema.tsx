import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const BlockSchema = z.object({
  department: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
  leader: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
  description: z.string().optional(),
});

type BlockSchemaType = z.infer<typeof BlockSchema>;

export { BlockSchema, type BlockSchemaType };
