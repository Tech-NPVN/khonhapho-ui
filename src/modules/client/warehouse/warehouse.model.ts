import dayjs from "dayjs";

class WarehouseBooking {
  viewed_date: string | dayjs.Dayjs = dayjs(new Date()).add(30, 'minute');
  description: string = '';
}

export { WarehouseBooking };
