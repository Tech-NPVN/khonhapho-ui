'use client';

import { SectionBody } from '@/components/common';
import { ReloadDownIcon, SearchIcon } from '@/components/icons';
import { IMAGE_SAMPLE } from '@/constants/data';
import { Avatar, Button, Col, Input, Row, Select } from 'antd';

export const CompanyIndex = () => {
  return (
    <div className="pr-4">
      <SectionBody title="Danh sách nhân sự tập đoàn nhà phố việt nam">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar.Group size="large">
              {Array.from({ length: 8 }).map((_) => (
                <Avatar key={IMAGE_SAMPLE} src={IMAGE_SAMPLE} />
              ))}
            </Avatar.Group>
            <span className="font-semibold">+ 758 thành viên</span>
          </div>
          <Input
            size="large"
            placeholder="Nhập nội dung tìm kiếm"
            prefix={<SearchIcon className="w-4 h-4" />}
            className="w-[300px] border-0 shadow-sm"
          />
        </div>

        <Row gutter={5} className="py-5">
          <Col span={6}>
            <Select placeholder="Chi nhánh" size="large" className="w-full" />
          </Col>
          <Col span={6}>
            <Select placeholder="Phòng ban" size="large" className="w-full" disabled />
          </Col>
          <Col span={6}>
            <Select placeholder="Chức danh" size="large" className="w-full" />
          </Col>
          <Col span={6}>
            <Button icon={<ReloadDownIcon />} size="large" className="w-full">Đặt lại</Button>
          </Col>
        </Row>
      </SectionBody>
    </div>
  );
};
