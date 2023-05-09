"use client";
import { SafeReservation } from "../types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useManageReservation from "../hooks/useManageReservation";
import { format } from "date-fns";

interface ReservationContactCard {
  reservation: SafeReservation;
}

const ReservationContactCard: React.FC<ReservationContactCard> = ({
  reservation,
}) => {
  const router = useRouter();
  const { imageSrc } = reservation.listing;
  const { startDate, endDate, id } = reservation;
  const { onOpen } = useManageReservation();

  return (
    <div
      onClick={() => onOpen(reservation)}
      className="cursor-pointer border p-6 rounded-lg"
    >
      <div className="flex font-bold">
        <div className="h-[120px] w-[120px] overflow-hidden relative rounded-full">
          <Image
            src={
              reservation.user.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            fill
            alt="profile photo"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>
        <div className="ms-2 flex flex-col items-center justify-center">
          <div className="text-2xl">{reservation.user.name}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mt-3">
          <div>
            Property:{" "}
            <h3 className="font-bold">
              {reservation.listing.location.address}
            </h3>
          </div>
        </div>
        <div>
          Status:{" "}
          {reservation.hasPaid ? (
            <p className="text-green-600">Approved</p>
          ) : (
            <p className="text-red-600">Waiting for payment</p>
          )}
        </div>
        <div>
          <div className="text-neutral-500">
            {"Start:"} {format(new Date(startDate), "dd/MM/yyyy")}
          </div>
          <div className="text-neutral-500">
            {"End: "} {format(new Date(endDate), "dd/MM/yyyy")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationContactCard;
