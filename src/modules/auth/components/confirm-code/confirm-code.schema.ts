import { z } from 'zod';

const ConfirmCodeSchema = z.object({
  code: z.string().trim().optional(),
});

type ConfirmCodeSchemaType = z.infer<typeof ConfirmCodeSchema>;

export { ConfirmCodeSchema, type ConfirmCodeSchemaType };
