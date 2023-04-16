"use client";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  return (
    <Container>
      <Heading title="Trips" />
      <div className="mt-10 gap-8 grid grid-cols-1 w-full">
        {reservation.map((resv) => (
          <div key={resv.id} className="flex">
            <ReservationCard reservation={resv} />
            <Places latlng={resv.listing.location.latlng} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TripPage;
