import { ReloadDownIcon, SearchIcon } from '@/components/icons';
import { Button, Col, Input, Row, Select } from 'antd';

export const OnlAccountSearch = () => {
  return (
    <Row gutter={10}>
      <Col flex="20%">
        <Input
          size="large"
          placeholder="Nhập nội dung tìm kiếm"
          suffix={<SearchIcon className="w-4 h-4" />}
          className="w-full rounded-xl dark:bg-transparent"
        />
      </Col>
      <Col flex="20%">
        <Select placeholder="Chi nhánh" size="large" className="w-full" />
      </Col>
      <Col flex="20%">
        <Select placeholder="Phòng ban" size="large" className="w-full" disabled />
      </Col>
      <Col flex="20%">
        <Select placeholder="Nhập tên tài khoản" size="large" className="w-full" disabled />
      </Col>
      <Col flex="20%">
        <Button
          icon={<ReloadDownIcon />}
          size="large"
          className="w-full bg-transparent dark:border-divider_d dark:text-primary_text_d rounded-xl"
        >
          Đặt lại
        </Button>
      </Col>
    </Row>
  );
};
