import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import dayjs from 'dayjs';
import { z } from 'zod';

const phoneValidate = z
  .string({ message: REQUIRED_MSG_SAMPLE })
  .length(10, { message: 'Số điện thoại bao gồm 10 số.' })
  .regex(/^0\d{9}$/, { message: 'SĐT không hợp lệ.' })
  .trim();

const emailValidate = z
  .string({ message: REQUIRED_MSG_SAMPLE })
  .email({ message: 'Không đúng định dạng email' })
  .min(1, { message: REQUIRED_MSG_SAMPLE })
  .trim();

const identityValidate = z
  .string({ message: REQUIRED_MSG_SAMPLE })
  .length(12, { message: 'Căn cước công dân bao gồm 12 số.' })
  .trim();

const dateValidate = z.preprocess((arg) => {
  if (dayjs.isDayjs(arg)) {
    return arg.toDate();
  }
  return arg;
}, z.date({ message: 'Vui lòng chọn ngày' }));

export { phoneValidate, emailValidate, identityValidate, dateValidate };
