import { ReloadDownIcon } from '@/components/icons';
import { Button, Col, Input, Row, Select } from 'antd';

export const DepartmentStatsSearch = () => {
  return (
    <Row gutter={10}>
      <Col span={14}>
        <Input
          size="large"
          placeholder="Nhập nội dung tìm kiếm"
          className="w-full h-10 rounded-xl dark:bg-transparent"
        />
      </Col>
      <Col span={5}>
        <Select placeholder="Chi nhánh" size="large" className="w-full" />
      </Col>
      <Col span={5}>
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
