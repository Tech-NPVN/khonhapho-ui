import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const ProjectSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),

  city: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  district: z.coerce.number({ message: MsgValidation.REQUIRED }).min(1, MsgValidation.REQUIRED),

  code: z.string().trim().optional(),

  description: z.string().optional(),
});

type ProjectSchemaType = z.infer<typeof ProjectSchema>;

export { ProjectSchema, type ProjectSchemaType };
