import { SearchIcon } from '@/components/icons';
import { useDivWidth } from '@/hooks/use-div-width';
import { Col, Input, Row, Select } from 'antd';

export const CategoriesSearch = () => {
  const { divRef, width } = useDivWidth({ delay: 10 });
  return (
    <Row ref={divRef} gutter={15}>
      <Col className={width < 540 ? 'max-sm:mb-1' : ''} span={width < 540 ? 24 : 8}>
        <Select placeholder="Chia sẻ kỹ năng" size="large" className="w-full" />
      </Col>
      <Col className={width < 540 ? 'max-sm:mb-1' : ''} span={width < 540 ? 24 : 8}>
        <Select placeholder="Tất cả" size="large" className="w-full" />
      </Col>
      <Col className={width < 540 ? 'max-sm:mb-1' : ''} span={width < 540 ? 24 : 8}>
        <Input
          size="large"
          placeholder="Nhập nội dung tìm kiếm"
          suffix={<SearchIcon className="w-4 h-4" />}
          className="w-full rounded-lg dark:bg-transparent"
        />
      </Col>
    </Row>
  );
};
