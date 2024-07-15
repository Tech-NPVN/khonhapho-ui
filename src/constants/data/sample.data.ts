import { IChatPreview } from '@/components/chat/chat-preview';

const IMAGE_SAMPLE =
  'https://s3-alpha-sig.figma.com/img/206c/4897/28b7b0c60958131808a8471ce60ce66c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gou9Y9BF1LpeSzG0pfVuHFV7cgEyhhTWF3BGDmhfKJ9KQFujWYps9njFX9DX0BamSqCgV92IREejdMdq0MY9~-NBeWahRP84U69HbHtLEUhZ~GctgjBlFU16rU5N~M~IYYYacM42WQl3zP2cbTJs2jk6uTJLgUacIZn5tZnw3XEl4GI3FW6TycihjEGQOoqh30bfb2hXnWa9DrZRanN2EBeyYbfsnmXFt11RYXq0WowpD1dhKr3NaUFAFDH6QOYD4muQyAGHcbf8W44pNKmObG6kR7j6uaiMYQ-GIeuiGaoeXFMwdj2RjWzHB2zFKKuPtsH56LpJaZyhlweEXz9rxQ__';

const CHAT_PREVIEW_SAMPLE: {
  users: IChatPreview[];
  groups_default: IChatPreview[];
  groups: IChatPreview[];
} = {
  users: [
    {
      user: { name: 'CV Nguyễn Trung · NP-1234', avatar: '/images/user-default.jpg' },
      online: false,
    },
    {
      user: { name: 'CV Nguyễn Trung · NP-4242', avatar: '/images/user-default.jpg' },
      online: true,
    },
    {
      user: { name: 'CV Nguyễn Trung · NP-999', avatar: '/images/user-default.jpg' },
      online: false,
    },
  ],
  groups_default: [
    {
      user: { name: 'THÔNG BÁO TẬP ĐOÀN', avatar: '/logo-white.png' },
      online: false,
    },
    {
      user: { name: 'TRÒ CHUYỆN NPVN', avatar: '/logo-white.png' },
      online: true,
    },
    {
      user: { name: 'THÔNG BÁO NPVN', avatar: '/logo-white.png' },
      online: false,
    },
  ],
  groups: [
    {
      user: { name: 'Nhóm Chat Nhà Phố', avatar: '/images/user-default.jpg' },
      online: false,
    },
    {
      user: { name: 'Nhóm Chat 1', avatar: '/images/user-default.jpg' },
      online: true,
    },
    {
      user: { name: 'Nhóm Chat 2 Phố cổ', avatar: '/images/user-default.jpg' },
      online: false,
    },
  ],
};
export { CHAT_PREVIEW_SAMPLE, IMAGE_SAMPLE };
