import { removeVietnameseAccents } from '@/lib/string';
import { DefaultOptionType } from 'antd/es/select';

const selectFilterOption = (input: string, option?: DefaultOptionType) => {
  const search = removeVietnameseAccents(input);
  const text = removeVietnameseAccents(
    option?.children?.toString() || option?.label?.toString() || '',
  );
  return text.toLowerCase().includes(search.toLowerCase()) ?? false;
};

export { removeVietnameseAccents, selectFilterOption };
