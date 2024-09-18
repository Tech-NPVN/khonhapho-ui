import { convertReportingTime } from '@/utilities/func.time';
import { Modal, Tag } from 'antd';

interface HistoryItemTypes {
  id?: string;
  title?: string;
  tags?: string[];
  status?: string;
  created_at?: string;
  updated_at?: string;
}
const DEMO: HistoryItemTypes[] = [
  {
    id: '1',
    title:
      '16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886, 056272444, X3, nguồn ĐT10, 25 đến 35',
    tags: ['nha-pho-viet-nam', 'npvn', 'np888'],
    status: 'Bán mạnh',
    created_at: '2022-01-01 10:00:00',
    updated_at: '2022-01-02 10:00:00',
  },
  {
    id: '2',
    title:
      'Biệt thự 15B.50 Hồ Tây 100 3 20.5 50 tỷ Tây Hồ Hà Nội ĐC Nguyễn Thanh Tùng, 012345678, nguồn ĐT20, 40 đến 50',
    tags: ['biet-thu', 'btvn', 'bt50'],
    status: 'Bán tốt',
    created_at: '2022-02-01 12:00:00',
    updated_at: '2022-02-02 12:00:00',
  },
  {
    id: '3',
    title:
      'Shophouse 22C.10 Phạm Văn Đồng 120 7 15.6 35 tỷ Cầu Giấy Hà Nội HĐ ĐC Lê Quang Huy, 098765432, nguồn ĐT30, 20 đến 35',
    tags: ['shophouse', 'shopvn', 'shop22'],
    status: 'Bán nhanh',
    created_at: '2022-03-01 14:00:00',
    updated_at: '2022-03-02 14:00:00',
  },
  {
    id: '4',
    title:
      'Chung cư 12A.12 Time City 90 4 10.8 20 tỷ Hai Bà Trưng Hà Nội HĐ ĐC Đỗ Quốc Khánh, 011112223, nguồn ĐT15, 10 đến 20',
    tags: ['chung-cu', 'ccvn', 'cc12'],
    status: 'Đang rao bán',
    created_at: '2022-04-01 16:00:00',
    updated_at: '2022-04-02 16:00:00',
  },
  {
    id: '5',
    title:
      'Đất nền 10D.30 Vinhomes Riverside 150 0 8.5 15 tỷ Long Biên Hà Nội HĐ ĐC Nguyễn Văn Nam, 099998877, nguồn ĐT50, 8 đến 15',
    tags: ['dat-nen', 'dnvn', 'dn10'],
    status: 'Mới đăng',
    created_at: '2022-05-01 18:00:00',
    updated_at: '2022-05-02 18:00:00',
  },
];
const HistoryItem = ({ item }: { item?: HistoryItemTypes }) => {
  return (
    <div className=" bg-white dark:bg-primary_color_d rounded-lg mx-2">
      <div className="flex flex-col flex-wrap gap-2 p-2">
        <div className="text-sm font-medium text-black dark:text-primary_text_d">
          <div className="flex justify-between mb-2">
            <div>Duyệt tin: {convertReportingTime(item?.updated_at)}</div>
            <div>
              <Tag>{item?.status}</Tag>
            </div>
          </div>
          <div className="w-[calc(100%-20px)] h-[1px] bg-black/5"></div>
        </div>
        <div>
          <div className="flex-1 text-sm font-medium text-black dark:text-primary_text_d">
            {item?.title}
          </div>
          <div className="flex-1 text-sm font-medium text-black dark:text-primary_text_d">
            Mô tả:{' '}
            {item?.tags?.map((tag) => (
              <span key={tag} className="text-link_text_l dark:text-link_text_d hover:underline">
                {`#${tag} `}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const ModalEditHistory: React.FC<{ open?: boolean; onClose?: () => void }> = ({
  open,
  onClose,
}) => {
  const handleClose = () => {
    onClose?.();
    // window.history.back();
  };
  return (
    <>
      {open && (
        <Modal
          open
          onClose={() => {
            handleClose();
          }}
          onCancel={handleClose}
          title={'Lịch sửa chỉnh sửa'}
          className="max-w-[98vw] sm:max-w-[520px] md:max-w-[680px] lg:max-w-[760px] rounded-lg overflow-hidden"
          classNames={{
            content: '!p-0 rounded-lg overflow-hidden',
            header: 'text-lg px-3 py-3 border border-solid border-black/5 !mb-0',
            mask: 'dark:!fill-white',
          }}
          footer={null}
          width={'100%'}
        >
          <div className="flex flex-col py-2 gap-2 bg-background_l dark:bg-background_d">
            {DEMO.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export { ModalEditHistory };
