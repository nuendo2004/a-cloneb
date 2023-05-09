"use client";
import React, { useCallback, useMemo, useState } from "react";
import Model from "./Model";
import useSearch from "@/app/hooks/useSearch";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelection } from "../Inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const Search = () => {
  const search = useSearch();
  const router = useRouter();
  const params = useSearchParams();

  const [currentStep, setCurrentStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelection>();
  const [guestCount, setGuestCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [bathRoomCount, setBathRoomCount] = useState(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../GlobalMap"), { ssr: false }),
    [location]
  );

  const onReturn = useCallback(() => {
    setCurrentStep((val) => val - 1);
  }, []);

  const onNext = useCallback(() => {
    setCurrentStep((val) => val + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (currentStep !== STEPS.INFO) return onNext();
    let query = {};
    if (params) query = queryString.parse(params.toString());
    const updatedQuery: any = {
      ...query,
      locationValue: location?.label,
      guestCount,
      roomCount,
      bathRoomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setCurrentStep(STEPS.LOCATION);
    search.onClose();
    router.push(url);
  }, [
    currentStep,
    search,
    location,
    router,
    guestCount,
    bathRoomCount,
    roomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (currentStep === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [currentStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [currentStep]);

  let bodyContent = (
    <div>
      <Heading title="Where would you like to go" subtitle="select a region" />
      <CountrySelect
        value={location}
        onChange={(val) => setLocation(val as CountrySelection)}
      />
      <hr />
      <Map center={location?.latlng} zoomOut={true} className="mt-3" />
    </div>
  );

  if (currentStep === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="When will you start your trip?"
          subtitle="choose a date"
        />
        <Calendar
          value={dateRange}
          onChange={(val) => setDateRange(val.selection)}
        />
      </div>
    );
  }

  if (currentStep === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="More information"
          subtitle="Make sure your trip is perfect"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are we expected"
          value={guestCount}
          onChange={(val) => setGuestCount(val)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms will you need"
          value={roomCount}
          onChange={(val) => setRoomCount(val)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms is good for you"
          value={bathRoomCount}
          onChange={(val) => setBathRoomCount(val)}
        />
      </div>
    );
  }

  return (
    <Model
      isActive={search.isActive}
      onClose={search.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={currentStep === STEPS.LOCATION ? undefined : onReturn}
      secondaryLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default Search;
