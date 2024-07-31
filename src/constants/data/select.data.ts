import { DefaultOptionType } from 'antd/es/select';

const SELECT_PRICE_UNIT = [
  { value: 'billion', display_value: 'tỷ' },
  { value: 'million', display_value: 'triệu' },
];

const SELECT_FILTER_WAREHOUSE: DefaultOptionType[] = [
  {
    value: 'hot-news',
    label: 'Tin nổi bật',
  },
  {
    value: 'lastest-news',
    label: 'Tin mới nhất',
  },
  {
    value: 'oldest-news',
    label: 'Tin cũ nhất',
  },
  {
    value: 'highest-price',
    label: 'Giá cao nhất',
  },
  {
    value: 'lowest-price',
    label: 'Giá thấp nhất',
  },
];

export { SELECT_PRICE_UNIT, SELECT_FILTER_WAREHOUSE };
