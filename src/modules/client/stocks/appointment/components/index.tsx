import { AppointmentItem } from "@/modules/client/user/appointment";

export const StocksAppointmentIndex = () => {
  return (
    <div className="pt-4 lg:pr-4 flex justify-center relative">
      <div className="w-[600px] bg-primary_color_l dark:bg-primary_color_d py-4 px-5 rounded-lg min-h-[calc(100vh-100px)]">
        <h3 className="mb-5">Lịch sử Đầu khách đặt lịch xem nhà</h3>

        <div className="flex flex-col gap-3">
          <AppointmentItem type="reject" />
          <AppointmentItem type="reject" />
          <AppointmentItem type="confirm" />
          <AppointmentItem type="new" />
          <AppointmentItem type="new" />
          <AppointmentItem type="new" />
          <AppointmentItem type="confirm" />
          <AppointmentItem type="recall" />
        </div>
      </div>
    </div>
  );
};
