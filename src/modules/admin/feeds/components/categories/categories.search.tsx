import { SearchIcon } from '@/components/icons';
import { Col, Input, Row, Select } from 'antd';

export const CategoriesSearch = () => {
  return (
    <Row gutter={15}>
      <Col span={8}>
        <Select placeholder="Chia sẻ kỹ năng" size="large" className="w-full" />
      </Col>
      <Col span={8}>
        <Select placeholder="Tất cả" size="large" className="w-full" />
      </Col>
      <Col span={8}>
        <Input
          size="large"
          placeholder="Nhập nội dung tìm kiếm"
          suffix={<SearchIcon className="w-4 h-4" />}
          className="w-full rounded-xl dark:bg-transparent"
        />
      </Col>
    </Row>
  );
};
