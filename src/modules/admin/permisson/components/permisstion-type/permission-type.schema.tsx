import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const PermissionTypeSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  order: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
});

type PermissionTypeSchemaType = z.infer<typeof PermissionTypeSchema>;

export { PermissionTypeSchema, type PermissionTypeSchemaType };
