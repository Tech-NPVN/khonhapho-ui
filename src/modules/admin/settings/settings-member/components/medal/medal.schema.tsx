import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const MedalSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  description: z.string().optional(),
  order: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
  image: z
    .any()
    .refine((value) => typeof value === 'string', REQUIRED_MSG_SAMPLE)
    .refine((value) => value.trim().length > 0, REQUIRED_MSG_SAMPLE),
});

type MedalSchemaType = z.infer<typeof MedalSchema>;

export { MedalSchema, type MedalSchemaType };
