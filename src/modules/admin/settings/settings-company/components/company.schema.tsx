import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const CompanySchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  avatar: z
    .array(z.any(), { required_error: MsgValidation.IMAGES_REQUIRED })
    .min(1, MsgValidation.IMAGES_REQUIRED)
    .max(1, MsgValidation.IMAGES_REQUIRED),
});

type CompanySchemaType = z.infer<typeof CompanySchema>;

export { CompanySchema, type CompanySchemaType };
