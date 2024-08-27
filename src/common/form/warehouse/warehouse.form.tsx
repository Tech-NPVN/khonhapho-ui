'use client';

import { SectionBody, UploadInput } from '@/components/common';
import { Button, Col, Form, Input, Row, Select, Tooltip } from 'antd';
import { WarehouseFormSchema, WarehouseFormSchemaType } from './warehouse.schema';
import { createSchemaFieldRule } from 'antd-zod';
import {
  AUDIO_ACCEPTED,
  IMAGE_ACCEPTED,
  SELECT_BONUS_TYPE,
  SELECT_CONTRACT_TYPE,
  SELECT_LEGAL_STATUS,
  SELECT_PROPERTY_FEATURE,
  SELECT_PROPERTY_TYPE,
  VIDEO_ACCEPTED,
} from '@/constants/data';
import { SelectAddon } from '@/components/reuse/data-entry';
import { useCallback, useEffect, useState } from 'react';
import useUpload, { UseUpload } from '@/hooks/use-upload';
import { ModalDoubleFeed } from '@/common/modal';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import useFetchLocation from '@/hooks/use-fetch-location';
import { DistrictType, ProjectRequest } from '@/apis/location';

const DISABLE_PROPERTY_FEAT_MAPPING: { [key: string]: string[] } = {
  'mat-pho': ['ngo-oto', 'ngo-3-gac', 'ngo-xe-may'],
  'ngo-oto': ['mat-pho', 'ngo-3-gac', 'ngo-xe-may'],
  'ngo-3-gac': ['mat-pho', 'ngo-oto', 'ngo-xe-may', 'gara-oto'],
  'ngo-xe-may': ['mat-pho', 'ngo-oto', 'ngo-3-gac', 'gara-oto'],
  'gara-oto': ['ngo-3-gac', 'ngo-xe-may'],
};

const rule = createSchemaFieldRule(WarehouseFormSchema);

/**
 * Warehouse Form - Form thêm/sửa tin trong kho
 *
 * @property {string} [id] - (Optinal) Truyền id trong trường hợp sửa tin
 * @returns {JSX.Element}
 */
export const WarehouseForm = ({ id }: { id?: string }): JSX.Element => {
  const [openDoubleFeed, setOpenDoubleFeed] = useState<boolean>(false);
  const [propsFeatureOption, setPropsFeatureOption] = useState(SELECT_PROPERTY_FEATURE);

  const [form] = Form.useForm<WarehouseFormSchemaType>();

  const legal_status = Form.useWatch('legal_status', form);
  const property_type = Form.useWatch('property_type', form);

  const imagesUpload = useUpload();
  const videosUpload = useUpload();
  const privateImagesUpload = useUpload();
  const audiosUpload = useUpload();

  const {
    cities,
    districts,
    streets,
    projects,
    fetchCities,
    fetchDistricts,
    fetchStreets,
    fetchProjects,
    setDistricts,
    setStreets,
    setProjects,
  } = useFetchLocation();

  useEffect(() => {
    if (cities.length === 0) fetchCities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        ...option,
        disabled: disabledOptions.has(option.code),
      })),
    );
  }, []);

  const handleChangeUpload = useCallback(
    (
      upload: UseUpload,
      info: UploadChangeParam<UploadFile<any>>,
      name: keyof WarehouseFormSchemaType,
    ) => {
      upload.handleChange?.(info);
      form.setFieldValue(name, info.fileList);
      form.validateFields([[name]], { recursive: true });
    },
    [form],
  );

  const handleSubmit = async (values: WarehouseFormSchemaType) => {
    console.log(values);
    // ...
  };

  return (
    <>
      <div className="pt-4 lg:pr-4">
        <SectionBody title={`${id ? 'Sửa tin' : 'Đăng tin'}`}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Row gutter={40}>
              {/* Left column */}
              <Col lg={14} xs={24}>
                <Row gutter={20}>
                  <Col lg={12} xs={24}>
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
                  <Col lg={12} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="property_type"
                      label="Loại hình:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Loại hình"
                        options={SELECT_PROPERTY_TYPE}
                        fieldNames={{ label: 'name', value: 'code' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Đặc điểm */}
                  <Col span={24}>
                    <Form.Item<WarehouseFormSchemaType>
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
                        fieldNames={{ label: 'name', value: 'code' }}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Thành phố */}
                  <Col md={12} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="c1ty"
                      label="Thành phố:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn thành phố"
                        options={cities}
                        fieldNames={{ label: 'name', value: 'id' }}
                        showSearch
                        optionFilterProp="name"
                        onChange={(value: number) => {
                          if (value) {
                            fetchDistricts(value);
                          } else {
                            setDistricts([]);
                            setStreets([]);
                          }
                          form.setFieldsValue({
                            district: undefined,
                            street: undefined,
                          });
                        }}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Quận/Huyện */}
                  <Col md={12} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="district"
                      label="Quận/Huyện:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn Quận/Huyện"
                        options={districts}
                        fieldNames={{ label: 'name', value: 'id' }}
                        showSearch
                        optionFilterProp="name"
                        disabled={districts.length === 0}
                        onChange={(value: number, fullValues) => {
                          if (value) {
                            fetchStreets((fullValues as DistrictType).city, value);
                            fetchProjects(
                              new ProjectRequest({
                                city: (fullValues as DistrictType).city,
                                district: value,
                              }),
                            );
                          } else {
                            setStreets([]);
                            setProjects([]);
                          }
                          form.setFieldsValue({ street: undefined, project: undefined });
                        }}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Đường phố */}
                  <Col md={12} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="street"
                      label="Đường phố:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn đường phố"
                        options={streets}
                        fieldNames={{ label: 'name', value: 'id' }}
                        showSearch
                        optionFilterProp="name"
                        disabled={streets.length === 0}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Ngõ, hẻm, số nhà, số phòng */}
                  <Col md={12} xs={24}>
                    <Tooltip placement="bottomLeft" title="Ví dụ: 40.35.20.15">
                      <Form.Item<WarehouseFormSchemaType>
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
                    <Form.Item<WarehouseFormSchemaType>
                      name="project"
                      label="Dự án/Khu đô thị/Chung cư:"
                      rules={[rule]}
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="VD: Vinhomes Ocean Park"
                        options={projects}
                        fieldNames={{ label: 'name', value: '_id' }}
                        showSearch
                        optionFilterProp="name"
                        disabled={districts.length === 0}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Thông số nhà */}
                  <Col md={12} xs={24}>
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
                      <Form.Item<WarehouseFormSchemaType>
                        name="spec"
                        label="Thông số nhà:"
                        rules={[rule]}
                        required
                      >
                        <Input
                          size="large"
                          className="w-full h-10"
                          placeholder="Nhập thông số nhà"
                          disabled={!property_type}
                        />
                      </Form.Item>
                    </Tooltip>
                  </Col>

                  {/* Hoa hồng */}
                  <Col md={12} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="bonus_value"
                      label="Hoa hồng:"
                      rules={[rule]}
                      required
                    >
                      <Input
                        addonAfter={
                          // Đơn vị hoa hồng
                          <Form.Item<WarehouseFormSchemaType>
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
                  <Col md={12} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="contract_type"
                      label="Loại hợp đồng:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn loại hợp đồng"
                        options={SELECT_CONTRACT_TYPE}
                        fieldNames={{ label: 'name', value: 'code' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Cầu đối tác */}
                  <Col md={12} xs={24}>
                    <Tooltip placement="bottomLeft" title="Bất động sản lớn hơn 20 tỷ">
                      <Form.Item<WarehouseFormSchemaType>
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
                    <Form.Item<WarehouseFormSchemaType>
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
                    <Form.Item<WarehouseFormSchemaType>
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
                  <Col md={8} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
                      name="legal_status"
                      label="Pháp lý:"
                      rules={[rule]}
                      required
                    >
                      <Select
                        size="large"
                        className="w-full"
                        placeholder="Chọn pháp lý"
                        options={SELECT_LEGAL_STATUS}
                        fieldNames={{ label: 'name', value: 'code' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Serial sổ */}
                  <Col md={8} xs={24}>
                    <Tooltip
                      placement="topLeft"
                      title={
                        <>
                          Nhập mã sổ đỏ để được hưởng quyền lợi khi trùng bảng <br />
                          Ví dụ: AB123456 hoặc 10123456789
                        </>
                      }
                    >
                      <Form.Item<WarehouseFormSchemaType>
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
                  <Col md={8} xs={24}>
                    <Form.Item<WarehouseFormSchemaType>
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
              <Col lg={10} xs={24}>
                {/* Ảnh */}
                <Form.Item<WarehouseFormSchemaType>
                  name="images"
                  label="Ảnh (tối đa 12 ảnh):"
                  rules={[rule]}
                  required
                >
                  <UploadInput
                    {...imagesUpload}
                    maxCount={12}
                    multiple
                    accept={IMAGE_ACCEPTED}
                    handleChange={(info) => handleChangeUpload(imagesUpload, info, 'images')}
                  />
                </Form.Item>

                {/* Video */}
                <Form.Item<WarehouseFormSchemaType>
                  name="videos"
                  label="Video (tối đa 4 video và không vượt quá 50MB/video):"
                  rules={[rule]}
                >
                  <UploadInput
                    {...videosUpload}
                    maxCount={4}
                    multiple
                    accept={VIDEO_ACCEPTED}
                    handleChange={(info) => handleChangeUpload(videosUpload, info, 'videos')}
                  />
                </Form.Item>

                {/* Ảnh sổ đỏ pháp lý, hợp đồng trích thưởng */}
                <Form.Item<WarehouseFormSchemaType>
                  name="private_images"
                  label="Ảnh sổ đỏ pháp lý, hợp đồng trích thưởng (tối đa 20 ảnh):"
                  rules={[rule]}
                  required
                >
                  <UploadInput
                    {...privateImagesUpload}
                    maxCount={20}
                    multiple
                    accept={IMAGE_ACCEPTED}
                    handleChange={(info) =>
                      handleChangeUpload(privateImagesUpload, info, 'private_images')
                    }
                  />
                </Form.Item>

                {/* Audio ghi âm pháp lý, hợp đồng trích thưởng (tối đa 4 audio) */}
                <Form.Item<WarehouseFormSchemaType>
                  name="audios"
                  label="Audio ghi âm pháp lý, hợp đồng trích thưởng (tối đa 4 audio):"
                  rules={[rule]}
                >
                  <UploadInput
                    {...audiosUpload}
                    maxCount={4}
                    multiple
                    accept={AUDIO_ACCEPTED}
                    handleChange={(info) => handleChangeUpload(audiosUpload, info, 'audios')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="w-full md:w-[460px] block m-auto">
              <Button type="primary" htmlType="submit" size="large" className="w-full mt-5">
                {id ? 'Sửa tin' : 'Đăng tin'}
              </Button>
            </div>
          </Form>
        </SectionBody>
      </div>

      <ModalDoubleFeed open={openDoubleFeed} handleCancel={() => setOpenDoubleFeed(false)} />
    </>
  );
};
