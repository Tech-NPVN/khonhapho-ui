import { PenIcon, TrashIcon } from '@/components/icons';
import { Button } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import { useMeasure } from 'react-use';
import { SwitchDisplayButtonProps } from './switch-button';

export type GalleryListProps = {
  className?: string;
  display?: SwitchDisplayButtonProps['value'];
};

/**
 * (Admin) Component - danh sách thư viện hình ảnh
 * @returns
 */

const GalleryList: React.FC<GalleryListProps> = ({ className, display = 'grid' }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const imagePerRow = getImagePerRow(width);
  const router = useRouter();
  if (display === 'grid')
    return (
      <div
        ref={ref}
        className="w-full grid gap-2 sm:gap-4"
        style={{
          gridTemplateColumns: `repeat(${imagePerRow}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: 12 }).map((img, index) => {
          return (
            <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                className="w-full h-full absolute object-cover top-0 left-0"
                src={'/images/post-1.jpeg'}
                width={600}
                height={420}
                alt="thumbnail"
              />
              <div
                className="group absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent to-black/80 text-white z-10 flex flex-col justify-end px-2 sm:px-4 pb-4"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/admin/media/photo-gallery/' + index);
                }}
              >
                <div className="line-clamp-1 text-lg">Hội thao 20/10</div>
                <div className="text-[12px]">Cập nhật lần cuối 04-09-2024 15:00 PM</div>
                <div className="flex justify-between items-center px-1 mt-1 overflow-hidden sm:h-0 sm:group-hover:h-8 transition-all duration-200">
                  <Link
                    className="bg-[#616B76] flex gap-2 px-3 py-2 rounded-lg text-white cursor-default"
                    href={'/admin/media/photo-gallery/' + index}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <PenIcon className="fill-white" width={14} /> Chỉnh sửa
                  </Link>
                  <button
                    className="bg-transparent cursor-pointer border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TrashIcon className="fill-red-500 scale-125" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  if (display === 'line')
    return (
      <div ref={ref} className="w-full flex flex-col">
        <div className="w-full flex justify-between bg-[#E5E6E8] py-3 px-2 font-semibold">
          <div className="flex-[2]">Tên</div>
          <div className="flex-[1] text-center">Ngày chỉnh sửa</div>
          <div className="flex w-28 justify-center">Hành động</div>
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <div
                className="w-full flex justify-between p-2 hover:bg-gray-500/5 items-center"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/admin/media/photo-gallery/' + index);
                }}
              >
                <div className="flex-[2] flex items-center gap-2">
                  <svg
                    width="19"
                    height="17"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H8L10 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V17Z"
                      stroke="#344142"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="line-clamp-1 text-base">Ngày hội thể thao 20/10</span>
                </div>
                <div className="flex-[1] text-center">22/03/2024 10:32:24</div>
                <div className="flex items-center w-28 justify-center">
                  <Link
                    href={`/admin/media/photo-gallery/${index}/edit`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Button className="border-none bg-transparent px-2">
                      <PenIcon className="fill-link_text_d" />
                    </Button>
                  </Link>
                  <Button className="border-none bg-transparent px-2">
                    <TrashIcon className="fill-red-500" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};
const getImagePerRow = (width: number) => {
  console.log(width);

  if (width >= 1600) return 6;
  if (width >= 1000) return 5;
  if (width >= 780) return 4;
  if (width >= 640) return 3;
  return 2;
};
export default GalleryList;
