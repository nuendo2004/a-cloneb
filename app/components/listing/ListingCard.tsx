"use client";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId: string;
  currentUser: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId,
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(data.locationValue);

  const handleCancellation = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data.price;
  }, [data, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    return `${format(startDate, "pp")} to ${format(endDate, "pp")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listing/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full h-[300px]">
        <div className="aspect-squre w-full h-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="listing image"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
