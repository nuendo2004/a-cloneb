import NotFound from "../components/NotFound";
import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import TripPage from "./TripPage";
import WideSection from "../components/WideSection";
import Navbar from "../components/nav/Navbar";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NotFound title="User Not Found" />;
  }
  const reservation = await getReservations({ userId: currentUser.id });
  if (!reservation || reservation.length === 0) {
    return (
      <NotFound
        title="Found 0 Reservation"
        subtitle="Book a new trip, and start your journey!"
      />
    );
  }

  return (
    <div>
      <Navbar currentUser={currentUser} search={false} />
      <WideSection>
        <TripPage reservation={reservation} currentUser={currentUser} />
      </WideSection>
    </div>
  );
};

export default page;
