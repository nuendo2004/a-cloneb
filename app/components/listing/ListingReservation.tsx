"use client";
import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  disabled?: boolean;
  totalPrice: number;
  listPrice: number;
  onChangeDate: (val: any) => void;
  dateRange: Range;
  onSubmit: () => void;
  disableDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  disabled,
  totalPrice,
  listPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disableDates,
}) => {
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-300 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${listPrice}</div>
        <div className="text-neutra-600 font-light">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disableDates={disableDates}
        onChange={(val) => onChangeDate(val.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex justify-between items-center front-semibold text-lg">
        <div>Total</div> <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
