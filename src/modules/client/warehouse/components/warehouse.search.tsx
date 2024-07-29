import { DoubleArrowBottomIcon, ReloadDownIcon } from '@/components/icons';
import { SelectAddon } from '@/components/reuse/data-entry';
import { SELECT_PRICE_UNIT } from '@/constants/data';
import { Button, Col, Collapse, InputNumber, Row, Select } from 'antd';
import { useState } from 'react';

const WarehouseSearch = () => {
  const [expand, setExpand] = useState<string[]>([]);

  const renderExpanding = () => {
    return (
      <Row gutter={[6, 6]}>
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
            className="w-full bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d"
          >
            Đặt lại
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Row gutter={[6, 6]} className="mt-5">
      <Col flex="20%">
        <Select placeholder="Hiện trạng" size="large" className="w-full" />
      </Col>
      <Col flex="20%">
        <Select placeholder="Loại hình" size="large" className="w-full" />
      </Col>
      <Col flex="20%">
        <Select placeholder="Tỉnh/Thành phố" size="large" className="w-full" />
      </Col>
      <Col flex="20%">
        <Select placeholder="Quận/Huyện" size="large" className="w-full" disabled />
      </Col>
      <Col flex="20%">
        <Select placeholder="Đường phố" size="large" className="w-full" disabled />
      </Col>
      <Col flex="20%">
        <InputNumber
          addonAfter={
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
          }
          type="number"
          size="large"
          placeholder="Giá tối thiểu"
          className="h-10 w-full bg-transparent"
        />
      </Col>
      <Col flex="20%">
        <InputNumber
          addonAfter={
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
          }
          type="number"
          size="large"
          placeholder="Giá tối đa"
          className="h-10 w-full bg-transparent"
        />
      </Col>
      <Col flex="20%">
        <Select placeholder="Khoảng giá" size="large" className="w-full" />
      </Col>
      <Col flex="20%">
        <Select placeholder="Đặc điểm BĐS" size="large" className="w-full" />
      </Col>
      <Col flex="20%">
        <Select placeholder="Dự án/Chung cư" size="large" className="w-full" />
      </Col>
      <Col span={24}>
        <Collapse
          className="[&>div]:flex [&>div]:flex-col-reverse p-0"
          defaultActiveKey={expand}
          ghost
          onChange={(key) => (key.includes('1') ? setExpand(['1']) : setExpand([]))}
          items={[
            {
              key: '1',
              showArrow: false,
              className: 'text-right',
              label: (
                <div className="relative">
                  <Button
                    icon={
                      <DoubleArrowBottomIcon
                        className={`${expand.includes('1') ? 'rotate-180' : ''}`}
                      />
                    }
                    type="text"
                    className="dark:bg-background_d py-5"
                  >
                    <span className="absolute flex h-2 w-2 top-0 right-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color_l opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-color_l"></span>
                    </span>
                    {expand.includes('1') ? 'Thu nhỏ' : 'Mở rộng'}
                  </Button>
                </div>
              ),
              children: renderExpanding(),
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default WarehouseSearch;
