import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const BlockSchema = z.object({
  group: z
    .array(z.coerce.number())
    .nonempty({ message: MsgValidation.SELECT_REQUIRED })
    .refine((values) => values.length > 0, MsgValidation.SELECT_REQUIRED),
  leader: z.coerce
    .number({ message: MsgValidation.SELECT_REQUIRED })
    .min(1, { message: MsgValidation.SELECT_REQUIRED }),
  description: z.string().optional(),
  author: z.string().optional(),
});

type BlockSchemaType = z.infer<typeof BlockSchema>;

export { BlockSchema, type BlockSchemaType };
