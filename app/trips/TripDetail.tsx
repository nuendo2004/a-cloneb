"use client";
import React from "react";
import useTripDetail from "../hooks/useTripDetail";
import Model from "../components/Model/Model";
import GoogleMapWidget from "../components/GoogleMapWidget";

const TripDetail = () => {
  const tripHook = useTripDetail();
  const { reservation, isActive, onClose } = tripHook;

  const body = (
    <div className="h-[60vh] w-100">
      <GoogleMapWidget destination={reservation?.listing.location} />
    </div>
  );

  const handleCancel = () => {
    console.log("cancel trip");
  };

  const getRoute = () => {
    console.log("getRoute");
  };

  return (
    <>
      {isActive && reservation && (
        <div className="w-[100vw] h-[100vh] fixed bg-neutral-400/75 z-20">
          <Model
            title={`Your trip to ${reservation.listing.location.location.city}`}
            actionLabel="Cancel Trip"
            isActive={isActive}
            body={body}
            onClose={onClose}
            onSubmit={handleCancel}
            secondaryAction={getRoute}
            secondaryLabel="Get Navigation"
          />
        </div>
      )}
    </>
  );
};

export default TripDetail;
