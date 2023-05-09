"use client";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { cancelReservation } from "../service/rentingService";
import ReservationCard from "./ReservationCard";
import { toast } from "react-hot-toast";
import Places from "./Places";

interface TripPageProps {
  reservation: SafeReservation[];
  currentUser: SafeUser | null;
}
const TripPage: React.FC<TripPageProps> = ({ reservation, currentUser }) => {
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();
  const onCancelReservation = (id: string) => {
    setDeleteId(id);
    cancelReservation(id)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch(() => toast.error("Something has failed, please try again"))
      .finally(() => setDeleteId(""));
  };

  const getPaidReservation = useCallback(() => {
    return reservation
      .filter((reservation) => reservation.hasPaid)
      .map((resv) => (
        <div key={resv.id} className="flex">
          <ReservationCard reservation={resv} />
          <Places latlng={resv.listing.location.latlng} />
        </div>
      ));
  }, [reservation]);

  const getPendingReservation = useCallback(() => {
    return reservation
      .filter((reservation) => !reservation.hasPaid)
      .map((resv) => (
        <div key={resv.id}>
          <ReservationCard
            reservation={resv}
            minimum={true}
            option={
              <div className="bg-white rounded-2xl px-3 flex items-center">
                <div className="text-1xl text-red-600 me-2">•</div>
                <div>Waiting for payment</div>
              </div>
            }
          />
        </div>
      ));
  }, [reservation]);

  return (
    <Container>
      <Heading title="Your Trips" />
      <div className="mt-10 gap-8 grid grid-cols-1 w-full">
        {getPaidReservation()}
      </div>
      <hr />
      <Heading title="Pending" />
      <div className="mt-10 gap-8 grid grid-cols-3 w-full">
        {getPendingReservation()}
      </div>
    </Container>
  );
};

export default TripPage;
