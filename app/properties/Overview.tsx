"use client";
import React, { useCallback } from "react";
import Card from "../components/Card";
import { GoKey } from "react-icons/go";
import { BsCalendar2CheckFill, BsFillCarFrontFill } from "react-icons/bs";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { FaBed } from "react-icons/fa";
import { isAfter, isSameDay, isWithinInterval } from "date-fns";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
const currentDate = new Date();
interface OverviewProps {
  currentUser: SafeUser;
  reservations: SafeReservation[];
}

const Overview: React.FC<OverviewProps> = ({ reservations }) => {
  const getCurrentActive = useCallback(() => {
    return reservations.filter((reservation) =>
      isWithinInterval(currentDate, {
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
    );
  }, [reservations]);
  const getIncoming = useCallback(() => {
    return reservations.filter((reservation) =>
      isAfter(new Date(reservation.endDate), currentDate)
    );
  }, [reservations]);
  const getCheckOut = useCallback(() => {
    return reservations.filter((reservation) =>
      isSameDay(new Date(reservation.endDate), currentDate)
    );
  }, [reservations]);
  const getCheckIn = useCallback(() => {
    return reservations.filter((reservation) =>
      isSameDay(new Date(reservation.startDate), currentDate)
    );
  }, [reservations]);

  const router = useRouter();

  return (
    <div className="h-full w-full p-5">
      <div className="text-center h-full">
        <div className="md:flex justify-between pb-1">
          <h3 className="text-2xl my-2 text-center sm:text-start">
            What is happening today
          </h3>
          <Button
            label="Home"
            className="md:w-auto"
            onClick={() => router.push("/")}
          />
        </div>
        <hr />
        <div className="h-[90%] flex-grow sm:flex justify-center items-center">
          <div className="flex flex-col gap-8 my-3 items-center sm:flex-row">
            <div className="w-[13rem] h-[13rem]">
              <Card
                title={getCheckIn().length.toString()}
                subtitle="Check-ins"
                titleIcon={GoKey}
              />
            </div>
            <div className="w-[13rem] h-[13rem]">
              <Card
                title={getCheckOut().length.toString()}
                subtitle="CheckOuts"
                titleIcon={BsCalendar2CheckFill}
              />
            </div>
            <div className="w-[13rem] h-[13rem]">
              <Card
                title={getIncoming().length.toString()}
                subtitle="Trips in progress"
                titleIcon={BsFillCarFrontFill}
              />
            </div>
            <div className="w-[13rem] h-[13rem]">
              <Card
                title={getCurrentActive().length.toString()}
                subtitle="Current stays"
                titleIcon={FaBed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
