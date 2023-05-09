"use client";
import React, { useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { cancelReservation } from "../service/rentingService";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";
import ReservationContactCard from "./ReservationContactCard";
import { isBefore, isSameDay, isWithinInterval } from "date-fns";
import WideSection from "../components/WideSection";

interface ReservationPageProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}
enum Filter {
  "CHECKOUT",
  "UPCOMING",
  "CURRENT",
  "PAST",
  "ALL",
}

const ReservationPage: React.FC<ReservationPageProps> = ({
  reservations,
  currentUser,
}) => {
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();

  const onCancel = (id: string) => {
    setDeleteId(id);
    cancelReservation(id)
      .then((res) => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch(() => toast.error("Something has failed, please try again"))
      .finally(() => setDeleteId(""));
  };

  const filter = (filter: string, reservations: SafeReservation[]) => {
    let res: SafeReservation[];
    switch (filter) {
      case "CHECKOUT":
        res = reservations.filter((res) =>
          isSameDay(new Date(res.endDate), new Date())
        );
        break;
      case "UPCOMING":
        res = reservations.filter((res) =>
          isBefore(new Date(), new Date(res.startDate))
        );
      case "CURRENT":
        res = reservations.filter((res) =>
          isWithinInterval(new Date(), {
            start: new Date(res.startDate),
            end: new Date(res.endDate),
          })
        );
      case "PASSED":
        res = reservations.filter((res) =>
          isBefore(new Date(res.endDate), new Date())
        );
      default:
        res = reservations.filter((res) =>
          isBefore(new Date(res.endDate), new Date())
        );
        break;
    }
    return res;
  };

  return (
    <Container>
      <WideSection>
        <Heading title="Reservations" subtitle="Manage your bookings" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {reservations.map((resv: SafeReservation) => (
            <ReservationContactCard key={resv.id} reservation={resv} />
          ))}
        </div>
      </WideSection>
    </Container>
  );
};

export default ReservationPage;
