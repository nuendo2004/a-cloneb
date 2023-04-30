"use client";
import React from "react";
import { SafeReservation } from "../types";
import Image from "next/image";
import Heading from "../components/Heading";
import useTripDetail from "../hooks/useTripDetail";
import usePayment from "../hooks/usePayment";
import { getPaymentUrl } from "../service/paymentService";
import { useRouter } from "next/navigation";

interface ReservationCardProps {
  reservation: SafeReservation;
  minimum?: boolean;
  option?: React.ReactNode;
  isPaid?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  minimum = false,
  option,
  isPaid = false,
}) => {
  const { listing } = reservation;
  const { imageSrc, title, roomCount } = listing;

  const getFormatDates = (dates: string) => {
    const formatDates = new Date(dates);
    return {
      month: formatDates.toLocaleString("en-US", {
        month: "long",
      }),
      date: formatDates.getDay() + 1,
      year: formatDates.getFullYear(),
    };
  };
  const startDate = getFormatDates(reservation.startDate);
  const endDate = getFormatDates(reservation.endDate);
  const location = reservation.listing.location;
  const tripDetail = useTripDetail();
  const payment = usePayment();
  const router = useRouter();

  const handleOpen = async () => {
    tripDetail.onOpen(reservation);
  };

  return (
    <div className="relative">
      <div className="absolute right-1 top-1 z-10">{option && option}</div>
      <div
        className={`max-w-full ${
          !minimum && "lg:max-w-[60vw] lg:grid-cols-2"
        } ${
          minimum && "grid-rows-2"
        } grid grid-cols-1 h-[340px] overflow-hidden rounded-xl shadow-full cursor-pointer`}
        onClick={handleOpen}
      >
        <div
          className={`order-1 ${
            !minimum && "lg:order-2 h-[170px]"
          }  w-full lg:h-full relative`}
        >
          <Image
            fill
            src={imageSrc}
            alt="listing image"
            className="object-cover"
          />
        </div>
        <div
          className={`h-full order-2 grid grid-rows-2 px-8 ${
            !minimum && "lg:p-8 lg:order-1"
          }`}
        >
          <div className={`relative border-b-2 flex items-center`}>
            <Heading
              title={title}
              subtitle={`House with ${roomCount} reserved`}
              longText={true}
            />
          </div>
          <div className="flex">
            <div
              className={`flex justify-center items-center ${
                !minimum && "flex-col border-r-2 p-2"
              }`}
            >
              <div className="flex items-center">
                <div className="text-lg">
                  {startDate.month} {startDate.date}
                </div>
                <div className="mx-3"> - </div>
                <div className="text-lg">
                  {endDate.month} {endDate.date}
                </div>
              </div>
              <div className="ms-3">{startDate.year}</div>
            </div>
            {!minimum && (
              <div className="flex flex-col justify-center items-center flex-1 p-2">
                <div>{location?.address}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
