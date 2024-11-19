'use client';

import { modalError, ModalWarehouseDetails } from '@/common/modal';
import { SearchIcon, ThreeDotIcon, XIcon } from '@/components/icons';
import { SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import { Breakpoint } from '@/constants/enums';
import { Button, Divider, Dropdown, Input, Select, type MenuProps } from 'antd';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import slugify from 'slugify';
import {
  CollectionFormSchemaType,
  ModalAddCollection,
  ModalColCreateUpdate,
  ModalColNote,
} from './modal';
import { useRouter } from 'next-nprogress-bar';

const CollectionBox = ({
  collection,
  isDefault,
  selected,
  onClickMobile,
}: {
  collection?: CollectionFormSchemaType;
  isDefault?: boolean;
  selected?: boolean;
  onClickMobile?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [openUpdateCollection, setOpenUpdateCollection] = useState<boolean>(false);

  const dropdownItems: MenuProps['items'] = [
    { key: '1', label: 'Sửa bộ sưu tập', onClick: () => setOpenUpdateCollection(true) },
    {
      key: '2',
      label: 'Xóa bộ sưu tập',
      onClick: () =>
        modalError({
          title: 'Bạn có muốn xoá bộ sưu tập này',
          content: 'Tin được lưu trong bộ sưu tập sẽ bị gỡ bỏ',
        }),
      danger: true,
    },
  ];

  const renderCollectionImageOrPlaceholder = useCallback(() => {
    if (isDefault || !collection?.image[0]) {
      return (
        <div className="flex justify-center items-center flex-shrink-0 w-[130px] h-[100px] bg-background_l dark:bg-primary_color_d rounded-lg transition-all">
          <span>
            {isDefault
              ? 'Mặc định'.charAt(0).toUpperCase()
              : collection?.title.charAt(0).toUpperCase()}
          </span>
        </div>
      );
    }
    return (
      <Image
        width={130}
        height={100}
        alt={collection?.title ?? ''}
        src={collection?.image[0]}
        className="object-cover rounded-lg flex-shrink-0"
      />
    );
  }, [collection?.image, collection?.title, isDefault]);

  const renderTitleSlugify = () => {
    const slug = slugify(collection?.title ?? 'Mặc định', {
      replacement: '-',
      trim: true,
      locale: 'vi',
      lower: true,
    });
    router.push(pathname + '?title=' + slug);
  };

  return (
    <>
      <div
        className={`shadow-btn bg-primary_color_l dark:bg-background_d rounded-lg p-[10px] flex items-start gap-3 cursor-pointer hover:bg-background_l dark:hover:bg-background_d ${
          selected ? '!bg-background_l dark:!bg-background_d' : ''
        }`}
        onClick={() => onClickMobile?.() ?? renderTitleSlugify()}
      >
        {renderCollectionImageOrPlaceholder()}
        <div className="flex justify-between gap-2 w-full">
          <div className="flex-1">
            <strong className="mb-1 block">{collection?.title ?? 'Mặc đỊnh'}</strong>
            <span className="opacity-75">1 tin</span>
          </div>
          {!isDefault && (
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']} placement="bottomRight">
              <Button type="text" icon={<ThreeDotIcon />} />
            </Dropdown>
          )}
        </div>
      </div>

      <ModalColCreateUpdate
        open={openUpdateCollection}
        handleCancel={() => setOpenUpdateCollection(false)}
        initialValues={collection}
      />
    </>
  );
};

export const UserCollectionIndex = () => {
  const [openCreateCollection, setOpenCreateCollection] = useState<boolean>(false);
  const [openPostDetails, setOpenPostDetails] = useState<boolean>(false);
  const [openNote, setOpenNote] = useState<boolean>(false);
  const [openAddCollection, setOpenAddCollection] = useState<boolean>(false);

  // On Mobile
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const windows = useWindowSize();

  const title = useSearchParams().get('title');

  useEffect(() => {
    if (windows.width > Breakpoint.Lg && openDetails) setOpenDetails(false);
  }, [windows.width]);

  const renderList = () => {
    return (
      <section className="flex-1 rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 max-lg:px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="uppercase text-[17px] max-lg:text-sm mb-0">{title}</h3>

          {windows.width < Breakpoint.Lg ? (
            <Button
              type="text"
              icon={<XIcon width={16} height={16} onClick={() => setOpenDetails(false)} />}
            />
          ) : (
            <Select
              size="large"
              className="w-64"
              options={SELECT_FILTER_WAREHOUSE}
              defaultValue="tin-noi-bat"
            />
          )}
        </div>
        {windows.width < Breakpoint.Lg && (
          <Select
            size="large"
            className="w-full mt-3"
            options={SELECT_FILTER_WAREHOUSE}
            defaultValue="tin-noi-bat"
          />
        )}
        <Divider className="bg-background_l dark:bg-divider_d/40 my-4" />

        <div className="pt-2 flex flex-col gap-5">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="flex items-start gap-3" key={index}>
              <div className="relative rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  width={windows.width <= Breakpoint.Lg ? 100 : 150}
                  height={windows.width <= Breakpoint.Lg ? 100 : 120}
                  src="/images/post-2.jpeg"
                  alt=""
                  className="object-cover"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-color_l text-center text-sm mb-0 text-primary_color_l">
                  Hạ chào
                </p>
              </div>
              <div className="w-full">
                <p className="mb-0 line-clamp-3">
                  11A Cao Bá Quát 46 5 5.2 29 tỷ Ba Đình Hà Nội HĐ TP Thái Tài NPHN-3369, Quá là
                  điều bình thường luôn 0384628527, X3, nguồn ĐT10, 25 đến 35, #ĐC2
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span>Mô tả: </span>
                  {['#NPVN', '#NP781', '#NP92193'].map((item) => (
                    <span
                      className="text-link_text_l cursor-pointer hover:underline lowercase"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between gap-2 mt-6">
                  <div>
                    <Button
                      type="primary"
                      className="bg-tiertiary_input_color_l text-primary_text_l dark:bg-background_d dark:text-primary_text_d rounded-xl sm:text-xs"
                      onClick={() => setOpenNote(true)}
                    >
                      Ghi chú
                    </Button>
                    <Button
                      type="primary"
                      className="ml-2 bg-tiertiary_input_color_l text-primary_text_l dark:bg-background_d dark:text-primary_text_d rounded-xl sm:text-xs"
                      onClick={() => setOpenAddCollection(true)}
                    >
                      Thêm vào bộ sưu tập
                    </Button>
                  </div>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: '1',
                          label: 'Xem bài viết',
                          onClick: () => setOpenPostDetails(true),
                        },
                        {
                          key: '2',
                          label: 'Gỡ bỏ',
                          onClick: () =>
                            modalError({
                              title: 'Bạn có muốn gỡ tin này khỏi bộ sưu tập',
                            }),
                          danger: true,
                        },
                      ],
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <Button type="text" icon={<ThreeDotIcon />} />
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      <div className="pt-4 lg:pr-4 flex justify-stretch gap-5 relative">
        {!openDetails ? (
          <div className="w-full lg:w-[380px] bg-primary_color_l dark:bg-primary_color_d rounded-lg h-[calc(100vh-100px)] p-4 overflow-y-auto sticky top-[80px]">
            <Input
              size="large"
              placeholder="Nhập tên tìm kiếm"
              prefix={<SearchIcon />}
              className="w-full border-0 shadow-btn dark:!bg-background_d rounded-xl h-10"
            />

            <div className="flex flex-col gap-2 mt-5">
              <CollectionBox
                isDefault
                selected={!title || title === 'mac-dinh'}
                onClickMobile={
                  windows.width < Breakpoint.Lg ? () => setOpenDetails(true) : undefined
                }
              />
              {Array.from({ length: 3 }).map((_, index) => (
                <CollectionBox
                  key={index}
                  collection={{
                    image: [
                      'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
                    ],
                    title: 'Bộ sưu tập ' + index,
                  }}
                  selected={title === `bo-suu-tap-${index}`}
                  onClickMobile={
                    windows.width < Breakpoint.Lg ? () => setOpenDetails(true) : undefined
                  }
                />
              ))}
              <CollectionBox
                collection={{
                  image: [],
                  title: 'Bộ sưu tập',
                }}
                selected={title === 'bo-suu-tap'}
                onClickMobile={
                  windows.width < Breakpoint.Lg ? () => setOpenDetails(true) : undefined
                }
              />
            </div>

            <Button
              size="large"
              block
              className="mt-5"
              type="primary"
              onClick={() => setOpenCreateCollection(true)}
            >
              Tạo bộ sưu tập
            </Button>
          </div>
        ) : (
          renderList()
        )}

        {windows.width > Breakpoint.Lg && renderList()}
      </div>

      <ModalColNote open={openNote} handleCancel={() => setOpenNote(false)} />

      <ModalAddCollection
        open={openAddCollection}
        handleCancel={() => setOpenAddCollection(false)}
        openCreate={() => setOpenCreateCollection(true)}
      />

      <ModalColCreateUpdate
        open={openCreateCollection}
        handleCancel={() => setOpenCreateCollection(false)}
      />

      <ModalWarehouseDetails
        open={openPostDetails}
        onClose={() => {
          setOpenPostDetails(false);
        }}
      />
    </>
  );
};
