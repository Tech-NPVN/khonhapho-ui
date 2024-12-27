import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const PermissionGroupSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  description: z.string().optional(),
  permission_type: z.any(),
});

type PermissionGroupSchemaType = z.infer<typeof PermissionGroupSchema>;

export { PermissionGroupSchema, type PermissionGroupSchemaType };
