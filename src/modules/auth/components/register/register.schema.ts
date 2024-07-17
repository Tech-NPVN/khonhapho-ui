import { z } from 'zod';

const RegisterSchema = z.object({});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type RegisterSchemaType };
