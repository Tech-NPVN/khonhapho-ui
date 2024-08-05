'use client';

import { SectionBody, UploadInput } from '@/components/common';
import { Button, Col, Form, Input, Row, Select, Tooltip } from 'antd';
import { WarehouseCreateSchema, WarehouseCreateSchemaType } from './warehouse.schema';
import { createSchemaFieldRule } from 'antd-zod';
import {
  SELECT_BONUS_TYPE,
  SELECT_CONTRACT_TYPE,
  SELECT_LEGAL_STATUS,
  SELECT_PROPERTY_FEATURE,
  SELECT_PROPERTY_TYPE,
} from '@/constants/data';
import { SelectAddon } from '@/components/reuse/data-entry';
import { useCallback, useState } from 'react';
import useUpload from '@/hooks/use-upload';
import { ModalDoubleFeed } from '@/common/modal';

const DISABLE_PROPERTY_FEAT_MAPPING: { [key: string]: string[] } = {
  'mat-pho': ['ngo-oto', 'ngo-3-gac', 'ngo-xe-may'],
  'ngo-oto': ['mat-pho', 'ngo-3-gac', 'ngo-xe-may'],
  'ngo-3-gac': ['mat-pho', 'ngo-oto', 'ngo-xe-may', 'gara-oto'],
  'ngo-xe-may': ['mat-pho', 'ngo-oto', 'ngo-3-gac', 'gara-oto'],
  'gara-oto': ['ngo-3-gac', 'ngo-xe-may'],
};

const rule = createSchemaFieldRule(WarehouseCreateSchema);

/**
 * Warehouse Form - Form thêm/sửa tin trong kho
 *
 * @property {string} [id] - (Optinal) Truyền id trong trường hợp sửa tin
 * @returns {JSX.Element}
 */
export const WarehouseForm = ({ id }: { id?: string }): JSX.Element => {
  const [openDoubleFeed, setOpenDoubleFeed] = useState<boolean>(false);
  const [propsFeatureOption, setPropsFeatureOption] = useState(
    SELECT_PROPERTY_FEATURE.map((option) => ({
      label: option.name,
      value: option.code,
    })),
  );

  const [form] = Form.useForm<WarehouseCreateSchemaType>();
  const legal_status = Form.useWatch('legal_status', form);

  const imagesUpload = useUpload();
  const videosUpload = useUpload();
  const privateImagesUpload = useUpload();
  const audiosUpload = useUpload();

  const handleSelectPropertyFeat = useCallback((values: string[]) => {
    const disabledOptions = new Set<string>();

    values.forEach((value) => {
      if (DISABLE_PROPERTY_FEAT_MAPPING[value]) {
        DISABLE_PROPERTY_FEAT_MAPPING[value].forEach((disabledValue) => {
          disabledOptions.add(disabledValue);
        });
      }
    });

    setPropsFeatureOption(
      SELECT_PROPERTY_FEATURE.map((option) => ({
        label: option.name,
        value: option.code,
        disabled: disabledOptions.has(option.code),
      })),
    );
  }, []);

  const handleSubmit = async (values: WarehouseCreateSchemaType) => {
    console.log(values);
    // handle logic submit
    // ...
  };

  return (
    <>
      <div className="pt-4 pr-4">
        <SectionBody title={`${id ? 'Sửa tin' : 'Đăng tin'}`}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Row gutter={40}>
              {/* Left column */}
              <Col span={14}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item label="Nhân bản tin đăng:">
                      <Button
                        type="primary"
                        size="large"
                        className="w-full"
                        onClick={() => setOpenDoubleFeed(true)}
                      >
                        Chọn tin
                      </Button>
                    </Form.Item>
                  </Col>

                  {/* Loại hình */}
                  <Col span={12}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="property_type"
                      label="Loại hình:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Loại hình"
                        options={SELECT_PROPERTY_TYPE.map((option) => ({
                          label: option.name,
                          value: option.code,
                        }))}
                      />
                    </Form.Item>
                  </Col>

                  {/* Đặc điểm */}
                  <Col span={24}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="property_feature"
                      label="Đặc điểm:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        mode="multiple"
                        size="large"
                        className="w-full"
                        placeholder="Chọn đặc điểm"
                        options={propsFeatureOption}
                        onChange={handleSelectPropertyFeat}
                      />
                    </Form.Item>
                  </Col>

                  {/* Thành phố */}
                  <Col span={12}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="c1ty"
                      label="Thành phố:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn thành phố"
                        options={[]}
                      />
                    </Form.Item>
                  </Col>

                  {/* Quận/Huyện */}
                  <Col span={12}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="district"
                      label="Quận/Huyện:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn Quận/Huyện"
                        options={[]}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  {/* Đường phố */}
                  <Col span={12}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="street"
                      label="Đường phố:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn đường phố"
                        options={[]}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  {/* Ngõ, hẻm, số nhà, số phòng */}
                  <Col span={12}>
                    <Tooltip placement="bottomLeft" title="Ví dụ: 40.35.20.15">
                      <Form.Item<WarehouseCreateSchemaType>
                        name="house_number"
                        label="Ngõ, hẻm, số nhà, số phòng:"
                        rules={[rule]}
                        required
                      >
                        <Input
                          size="large"
                          className="w-full h-10"
                          placeholder="Nhập ngõ, hẻm, số nhà, số phòng"
                        />
                      </Form.Item>
                    </Tooltip>
                  </Col>

                  {/* Dự án/Khu đô thị/Chung cư */}
                  <Col span={24}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="project"
                      label="Dự án/Khu đô thị/Chung cư:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="VD: Vinhomes Ocean Park"
                        options={[]}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  {/* Thông số nhà */}
                  <Col span={12}>
                    <Tooltip
                      placement="bottomLeft"
                      title={
                        <>
                          Cách nhập thông số nhà: <br />
                          [Diện tích] [Tầng] [Giá tiền(Triệu đồng)] <br />
                          Ví dụ: 90 T5 6500
                        </>
                      }
                    >
                      <Form.Item<WarehouseCreateSchemaType>
                        name="spec"
                        label="Thông số nhà:"
                        rules={[rule]}
                        required
                      >
                        <Input
                          size="large"
                          className="w-full h-10"
                          placeholder="Nhập thông số nhà"
                          disabled
                        />
                      </Form.Item>
                    </Tooltip>
                  </Col>

                  {/* Hoa hồng */}
                  <Col span={12}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="bonus_value"
                      label="Hoa hồng:"
                      rules={[rule]}
                      required
                    >
                      <Input
                        addonAfter={
                          // Đơn vị hoa hồng
                          <Form.Item<WarehouseCreateSchemaType>
                            name="bonus_type"
                            rules={[rule]}
                            className="m-0"
                          >
                            <SelectAddon
                              options={SELECT_BONUS_TYPE}
                              defaultValue="percent"
                              className="w-20 [&>.ant-select-selector]:border-0"
                            />
                          </Form.Item>
                        }
                        type="number"
                        size="large"
                        placeholder="Nhập hoa hồng"
                        className="h-10 w-full"
                      />
                    </Form.Item>
                  </Col>

                  {/* Loại hợp đồng */}
                  <Col span={12}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="contract_type"
                      label="Loại hợp đồng:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn loại hợp đồng"
                        options={SELECT_CONTRACT_TYPE.map((option) => ({
                          label: option.name,
                          value: option.code,
                        }))}
                      />
                    </Form.Item>
                  </Col>

                  {/* Cầu đối tác */}
                  <Col span={12}>
                    <Tooltip placement="bottomLeft" title="Bất động sản lớn hơn 20 tỷ">
                      <Form.Item<WarehouseCreateSchemaType>
                        name="bonus_referral"
                        label="Cầu đối tác:"
                        rules={[rule]}
                      >
                        <Input
                          type="number"
                          size="large"
                          className="w-full h-10"
                          placeholder="Nhập cầu đối tác"
                          addonAfter="%"
                          disabled
                        />
                      </Form.Item>
                    </Tooltip>
                  </Col>

                  {/* Tiêu đề (tự động) */}
                  <Col span={24}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="title"
                      label="Tiêu đề (tự động):"
                      rules={[rule]}
                      required
                    >
                      <Input.TextArea size="large" rows={4} placeholder="Tiêu đề ..." readOnly />
                    </Form.Item>
                  </Col>

                  {/* Nội dung */}
                  <Col span={24}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="content"
                      label="Nội dung:"
                      rules={[rule]}
                      required
                    >
                      <Input.TextArea
                        size="large"
                        rows={6}
                        showCount
                        maxLength={3000}
                        placeholder="Nội dung ..."
                      />
                    </Form.Item>
                  </Col>

                  {/* Pháp lý */}
                  <Col span={8}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="legal_status"
                      label="Pháp lý:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn pháp lý"
                        options={SELECT_LEGAL_STATUS.map((option) => ({
                          label: option.name,
                          value: option.code,
                        }))}
                      />
                    </Form.Item>
                  </Col>

                  {/* Serial sổ */}
                  <Col span={8}>
                    <Tooltip
                      placement="topLeft"
                      title={
                        <>
                          Nhập mã sổ đỏ để được hưởng quyền lợi khi trùng bảng <br />
                          Ví dụ: AB123456 hoặc 10123456789
                        </>
                      }
                    >
                      <Form.Item<WarehouseCreateSchemaType>
                        name="number_certificate"
                        label="Serial sổ:"
                        rules={[rule]}
                        required
                      >
                        <Select
                          mode="tags"
                          size="large"
                          style={{ width: '100%' }}
                          className="w-full h-auto"
                          placeholder="Được công ty bảo mật"
                          tokenSeparators={[' ']}
                          disabled={legal_status !== 'so-do'}
                        />
                      </Form.Item>
                    </Tooltip>
                  </Col>

                  {/* Số điện thoại chủ nhà */}
                  <Col span={8}>
                    <Form.Item<WarehouseCreateSchemaType>
                      name="owner_phone"
                      label="Số điện thoại chủ nhà:"
                      rules={[rule]}
                      required
                    >
                      <Input
                        type="number"
                        size="large"
                        className="w-full h-10"
                        placeholder="Được công ty bảo mật"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              {/* Right column */}
              <Col span={10}>
                {/* Ảnh */}
                <Form.Item<WarehouseCreateSchemaType>
                  name="images"
                  label="Ảnh (tối đa 12 ảnh):"
                  rules={[rule]}
                  required
                >
                  <UploadInput
                    {...imagesUpload}
                    maxCount={12}
                    multiple
                    accept=".jpg, .jpeg, .png, .webm, .heic"
                  />
                </Form.Item>

                {/* Video */}
                <Form.Item<WarehouseCreateSchemaType>
                  name="videos"
                  label="Video (tối đa 4 video và không vượt quá 50MB/video):"
                  rules={[rule]}
                >
                  <UploadInput
                    {...videosUpload}
                    maxCount={4}
                    multiple
                    accept=".mp4, .mov, .hevc, .webm, .m4v"
                  />
                </Form.Item>

                {/* Ảnh sổ đỏ pháp lý, hợp đồng trích thưởng */}
                <Form.Item<WarehouseCreateSchemaType>
                  name="private_images"
                  label="Ảnh sổ đỏ pháp lý, hợp đồng trích thưởng (tối đa 20 ảnh):"
                  rules={[rule]}
                  required
                >
                  <UploadInput
                    {...privateImagesUpload}
                    maxCount={20}
                    multiple
                    accept=".jpg, .jpeg, .png, .webm, .heic"
                  />
                </Form.Item>

                {/* Audio ghi âm pháp lý, hợp đồng trích thưởng (tối đa 4 audio) */}
                <Form.Item<WarehouseCreateSchemaType>
                  name="audios"
                  label="Audio ghi âm pháp lý, hợp đồng trích thưởng (tối đa 4 audio):"
                  rules={[rule]}
                >
                  <UploadInput
                    {...audiosUpload}
                    maxCount={4}
                    multiple
                    accept=".mp3, .wav, .ogg, .aac, .m4a"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" size="large" className="w-full mt-5">
              {id ? 'Sửa tin' : 'Đăng tin'}
            </Button>
          </Form>
        </SectionBody>
      </div>

      <ModalDoubleFeed open={openDoubleFeed} handleCancel={() => setOpenDoubleFeed(false)} />
    </>
  );
};
