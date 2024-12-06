import { MsgValidation } from '@/constants/enums';
import { dateValidate } from '@/lib/zod';
import { z } from 'zod';

const DepartmentSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  code: z.string().trim().optional(),
  branch: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
  author: z.string().optional(),
  updatedAt: dateValidate.optional(),
});

type DepartmentSchemaType = z.infer<typeof DepartmentSchema>;

export { DepartmentSchema, type DepartmentSchemaType };
