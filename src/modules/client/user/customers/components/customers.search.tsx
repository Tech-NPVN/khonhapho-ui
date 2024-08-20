import { ChangeIcon, ReloadDownIcon } from '@/components/icons';
import { SELECT_FILTER_CUSTOMER } from '@/constants/data';
import { Button, Checkbox, Col, Row, Select } from 'antd';
import { memo } from 'react';

const optionsCheckbox = [
  { label: 'Cần mua gấp', value: 'can-mua-gap' },
  { label: 'Mua hụt nhà', value: 'mua-hut-nha' },
  { label: 'Hiểu thị trường', value: 'hieu-thi-truong' },
];

const CustomersSearch = () => {
  return (
    <>
      <Row gutter={12} className="mt-5">
        <Col span={6}>
          <Select placeholder="Tiêu chí" size="large" className="w-full" />
        </Col>
        <Col span={6}>
          <Select placeholder="Tỉnh/Thành" size="large" className="w-full" />
        </Col>
        <Col span={6}>
          <Select placeholder="Quận/Huyện" size="large" className="w-full" disabled />
        </Col>
        <Col span={6}>
          <Button
            icon={<ReloadDownIcon />}
            size="large"
            className="w-full bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d"
          >
            Đặt lại
          </Button>
        </Col>
      </Row>

      <div className="flex justify-between mt-5 items-center">
        <Checkbox.Group
          options={optionsCheckbox}
          className="[&>label]:py-2 [&>label]:px-3 [&>label]:rounded-lg [&>label]:bg-background_l_2"
        />
        <Select
          size="large"
          className="w-72"
          suffixIcon={<ChangeIcon />}
          options={SELECT_FILTER_CUSTOMER}
          defaultValue={SELECT_FILTER_CUSTOMER[0].value}
        />
      </div>
    </>
  );
};

export default memo(CustomersSearch);
