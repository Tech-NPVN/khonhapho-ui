import { MsgValidation } from '@/constants/enums';
import { z } from 'zod';

const StickerSchema = z.object({
  name: z
    .string({ message: MsgValidation.REQUIRED })
    .trim()
    .min(1, { message: MsgValidation.REQUIRED }),
  order: z.coerce
    .number({ message: MsgValidation.REQUIRED })
    .min(1, { message: MsgValidation.REQUIRED }),
  avatar: z
    .array(z.any(), { required_error: MsgValidation.IMAGES_REQUIRED })
    .min(1, MsgValidation.IMAGES_REQUIRED)
    .max(1, MsgValidation.IMAGES_REQUIRED),
  images: z
    .array(z.any(), { required_error: MsgValidation.IMAGES_REQUIRED })
    .min(1, MsgValidation.IMAGES_REQUIRED),
  status: z
    .string({ message: MsgValidation.SELECT_REQUIRED })
    .min(1, MsgValidation.SELECT_REQUIRED),
});

type StickerSchemaType = z.infer<typeof StickerSchema>;

export { StickerSchema, type StickerSchemaType };
