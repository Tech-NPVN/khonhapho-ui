import { WarehouseStatusEnum } from './warehouse.type';

const compareWarehouseStatus: { [key: string]: string } = {
  [WarehouseStatusEnum.BanManh]: 'Bán mạnh',
  [WarehouseStatusEnum.DaBan]: 'Đã bán',
  [WarehouseStatusEnum.DaChot]: 'Đã chốt',
  [WarehouseStatusEnum.DungBan]: 'Dừng bán',
  [WarehouseStatusEnum.HaChao]: 'Hạ chào',
  [WarehouseStatusEnum.TamDung]: 'Tạm dừng',
  [WarehouseStatusEnum.TangChao]: 'Tăng chào',
};

// const getColorWarehouseStatus = (status: WarehouseStatusEnum) => {
//   if(status === WarehouseStatusEnum.BanManh)
// }

export { compareWarehouseStatus };
