import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const PermissionRoleSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  role_name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  order: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED })
    .optional(),
  description: z.string().optional(),
  permission_group: z.any(),
});

type PermissionRoleSchemaType = z.infer<typeof PermissionRoleSchema>;

export { PermissionRoleSchema, type PermissionRoleSchemaType };
