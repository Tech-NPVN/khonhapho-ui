import { SuggestionItemType } from './suggestion';

interface Result {
  status?: 'success' | 'error';
  data?: SuggestionItemType[];
  error?: string;
}

const dataDemo: SuggestionItemType[] = [
  { id: 1, label: 'Đầu chủ' },
  { id: 2, label: 'Đầu khách' },
  { id: 3, label: 'Nguyễn Văn A' },
  { id: 4, label: 'Trần Thị B' },
  { id: 5, label: 'Lê Văn C' },
];

export const findUserByUserName = (query: string): Promise<Result> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = dataDemo.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase()),
      );
      resolve({
        status: 'success',
        data: filteredData,
      });
    }, 300);
  });
