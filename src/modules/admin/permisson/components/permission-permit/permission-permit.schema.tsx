import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const PermissionPermitSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  permission_type: z
    .string({ message: MsgValidation.SELECT_REQUIRED })
    .min(1, MsgValidation.SELECT_REQUIRED),
  order: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
});

type PermissionPermitSchemaType = z.infer<typeof PermissionPermitSchema>;

export { PermissionPermitSchema, type PermissionPermitSchemaType };
