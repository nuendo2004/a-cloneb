"use client";
import React from "react";
import Card from "../components/Card";
import { GoKey } from "react-icons/go";
import { BsCalendar2CheckFill, BsFillCarFrontFill } from "react-icons/bs";
import { SafeReservation } from "../types";

interface OverviewProps {
  checkIn: SafeReservation[];
}

const Overview = () => {
  return (
    <div className=" w-full sm:flex justify-center items-center">
      <div>
        <h3 className="text-2xl text-center sm:text-start">
          What is happening today
        </h3>
        <div className="flex flex-col gap-8 my-3 items-center sm:flex-row">
          <div className="w-[13rem] h-[13rem]">
            <Card title="0" subtitle="Check-ins" titleIcon={GoKey} />
          </div>
          <div className="w-[13rem] h-[13rem]">
            <Card
              title="0"
              subtitle="CheckOuts"
              titleIcon={BsCalendar2CheckFill}
            />
          </div>
          <div className="w-[13rem] h-[13rem]">
            <Card
              title="4"
              subtitle="Trips in progress"
              titleIcon={BsFillCarFrontFill}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
