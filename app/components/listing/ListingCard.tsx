"use client";
import { SafeListing, SafeUser } from "@/app/types";
import type { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Heart from "../Heart";
import { AiFillStar } from "react-icons/ai";
import Button from "../Button";
import useLocation from "@/app/hooks/useLocation";
import getDistance from "@/app/actions/getDistance";
import { useState } from "react";

interface ListingCardProps {
  data: SafeListing;
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
  const location = data.location;
  const { geoLocation, setLocation } = useLocation();
  const [currentLocation, setCurrentLocation] = useState<number[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      setCurrentLocation([res.coords.latitude, res.coords.longitude]);
      setLocation([res.coords.latitude, res.coords.longitude]);
    });
  }, [setLocation]);

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

  const distance = geoLocation
    ? getDistance(geoLocation, data.location.latlng)
    : null;

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <figure className="flex flex-col gap-2 w-full aspect-square">
        <div className=" w-full h-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="listing image"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute right-4 top-4">
            <Heart listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-1">
            <div className="font-semibold text-md ">
              {location?.location.city}, {location?.location.state}
            </div>
            <div className="flex items-center">
              <AiFillStar size={16} className="mr-1" />
              <div className="text-md font-light">{data.review}</div>
            </div>
          </div>
          <div className="font-light text-neutral-500 leading-none">
            {reservationDate || `${distance} miles away` || data.category}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancellation}
          />
        )}
      </figure>
    </div>
  );
};

export default ListingCard;
