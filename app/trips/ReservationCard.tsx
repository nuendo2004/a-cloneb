"use client";
import React, { useTransition } from "react";
import { SafeReservation } from "../types";
import Image from "next/image";
import Heading from "../components/Heading";
import useTripDetail from "../hooks/useTripDetail";

interface ReservationCardProps {
  reservation: SafeReservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
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

  return (
    <div
      className="max-w-full lg:max-w-[60vw] grid grid-cols-1 lg:grid-cols-2 h-[340px] overflow-hidden rounded-xl shadow-full cursor-pointer"
      onClick={() => tripDetail.onOpen(reservation)}
    >
      <div className="order-1 lg:order-2 h-[170px] w-full lg:h-full relative">
        <Image
          fill
          src={imageSrc}
          alt="listing image"
          className="object-cover"
        />
      </div>
      <div className="h-full order-2 grid grid-rows-2 lg:order-1 px-8 lg:p-8">
        <div className="relative border-b-2 flex items-center">
          <Heading
            title={title}
            subtitle={`House with ${roomCount} reserved`}
            longText={true}
          />
        </div>
        <div className="flex">
          <div className="flex flex-col justify-center items-center border-r-2 p-2">
            <div className="flex items-center">
              <div className="text-lg">
                {startDate.month} {startDate.date}
              </div>
              <div className="mx-3"> - </div>
              <div className="text-lg">
                {endDate.month} {endDate.date}
              </div>
            </div>
            <div>{startDate.year}</div>
          </div>
          <div className="flex flex-col justify-center items-center flex-1 p-2">
            <div>{location?.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
