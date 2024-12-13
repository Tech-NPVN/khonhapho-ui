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
    .refine((value) => typeof value === 'string', MsgValidation.IMAGES_REQUIRED)
    .refine((value) => !value || value.trim().length > 0, MsgValidation.IMAGES_REQUIRED),
});

type MedalSchemaType = z.infer<typeof MedalSchema>;

export { MedalSchema, type MedalSchemaType };
