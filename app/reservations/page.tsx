import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import NotFound from "../components/NotFound";
import ReservationPage from "./ReservationPage";

const Reservation = async () => {
  const curretUser = await getCurrentUser();

  if (!curretUser) {
    return (
      <div>
        <NotFound
          title="Page Not Found"
          subtitle="Please login to manege your reservation"
        />
      </div>
    );
  }
  const reservations = await getReservations({ hostId: curretUser.id });
  if (reservations.length === 0)
    return (
      <NotFound
        title="Found 0 result"
        subtitle="You don't have any reservation yet."
      />
    );

  return (
    <ReservationPage reservations={reservations} currentUser={curretUser} />
  );
};

export default Reservation;
