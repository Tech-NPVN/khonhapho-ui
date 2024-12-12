import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const ProvinceSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  area: z.string({ message: MsgValidation.SELECT_REQUIRED }).min(1, { message: MsgValidation.SELECT_REQUIRED }),
  code: z.string().trim().optional(),
  slug: z.string().trim().optional(),
});

type ProvinceSchemaType = z.infer<typeof ProvinceSchema>;

export { ProvinceSchema, type ProvinceSchemaType };
