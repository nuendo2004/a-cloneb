import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import NotFound from "../components/NotFound";
import Navbar from "../components/nav/Navbar";
import ReservationPage from "./ReservationPage";

const Reservation = async () => {
  const curretUser = await getCurrentUser();

  if (!curretUser) {
    return (
      <div>
        <Navbar currentUser={curretUser} search={false} />
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
      <>
        <Navbar currentUser={curretUser} search={false} />
        <NotFound
          title="Found 0 result"
          subtitle="You don't have any reservation yet."
        />
      </>
    );

  return (
    <>
      <Navbar currentUser={curretUser} search={false} />
      <ReservationPage reservations={reservations} currentUser={curretUser} />
    </>
  );
};

export default Reservation;
