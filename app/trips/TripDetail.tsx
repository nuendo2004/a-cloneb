"use client";
import React, { useState, useEffect, useMemo } from "react";
import useTripDetail from "../hooks/useTripDetail";
import Model from "../components/Model/Model";
import GoogleMapWidget from "../components/GoogleMapWidget";
import useLocation from "../hooks/useLocation";
import { toast } from "react-hot-toast";
import { cancelReservation } from "../service/rentingService";
import { useRouter } from "next/navigation";
import usePayment from "../hooks/usePayment";

const TripDetail = () => {
  const tripHook = useTripDetail();
  const [showCurrentRoute, setShowCurrentRoute] = useState(false);
  const { reservation, isActive, onClose } = tripHook;
  const [currentCoords, setCurrentCoords] = useState<number[] | null>([]);
  const locationHook = useLocation();
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const location = locationHook.geoLocation;
    if (!location)
      navigator.geolocation.getCurrentPosition((res) =>
        setCurrentCoords([res.coords.latitude, res.coords.longitude])
      );
    else setCurrentCoords(location);
  }, [locationHook.geoLocation]);

  const body = useMemo(
    () => (
      <div className="h-[60vh] w-100">
        <GoogleMapWidget
          destination={reservation?.listing.location}
          showCurrentRoute={showCurrentRoute}
          currentCoords={currentCoords}
        />
      </div>
    ),
    [showCurrentRoute, currentCoords, reservation]
  );
  const { redirectToPayment } = usePayment();
  const handleCancelReservation = (id: string) => {
    if (!reservation?.hasPaid) {
      redirectToPayment(reservation!);
    } else {
      setDeleteId(id);
      cancelReservation(id)
        .then((res) => {
          toast.success("Reservation cancelled");
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Something has failed, please try again"))
        .finally(() => setDeleteId(""));
    }
  };

  const getRoute = () => {
    if (!currentCoords) toast.error("GPS is not enabled");
    else setShowCurrentRoute((state) => !state);
  };

  return (
    <>
      {isActive && reservation && (
        <div className="w-[100vw] h-[100vh] fixed bg-neutral-400/75 z-20">
          <Model
            title={`Your trip to ${reservation.listing.location.location.city}`}
            actionLabel={reservation.hasPaid ? "Cancel Trip" : "Pay Now"}
            isActive={isActive}
            body={body}
            onClose={onClose}
            onSubmit={() => handleCancelReservation(reservation.id)}
            secondaryAction={getRoute}
            secondaryLabel={showCurrentRoute ? "Destination" : "Get Navigation"}
          />
        </div>
      )}
    </>
  );
};

export default TripDetail;
