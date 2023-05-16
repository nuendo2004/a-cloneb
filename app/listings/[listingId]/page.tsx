import React from "react";
import { getListingById } from "@/app/actions/getListingById";
import NotFound from "@/app/components/NotFound";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingPage from "@/app/components/listing/ListingPage";
import WideSection from "@/app/components/WideSection";
import { getReservations } from "@/app/actions/getReservations";
import Navbar from "@/app/components/nav/Navbar";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <>
        <Navbar currentUser={currentUser} search={false} />
        <NotFound />
      </>
    );
  }
  return (
    <>
      <Navbar currentUser={currentUser} search={false} />
      <WideSection>
        <ListingPage
          listing={listing}
          reservation={reservations}
          currentUser={currentUser}
        />
      </WideSection>
    </>
  );
};
export default page;
