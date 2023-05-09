import WideSection from "@/app/components/WideSection";
import { SafeListing, SafeUser } from "../../types";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import useRentHome from "@/app/hooks/useRentHome";
import ListingCard from "@/app/components/listing/ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingByHost } from "@/app/actions/getListingByHost";

const MyProperties = async () => {
  // const rentHome = useRentHome();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <div>Please Login</div>;
  }

  const myListings = (await getListingByHost({ userId: currentUser.id })) || [];

  const body = myListings.map((list: SafeListing) => (
    <ListingCard
      data={list}
      actionId=""
      key={list.id}
      currentUser={currentUser}
    />
  ));

  return (
    <WideSection>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <Heading title="My properties" subtitle="Manage your listings" />
        {/* <div className="my-auto">
          <Button label="Add New" onClick={() => rentHome.onOpen()} />
        </div> */}
      </div>
      <div className=" mx-auto pt-[24px] gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grod-cols-5">
        {body}
      </div>
    </WideSection>
  );
};

export default MyProperties;
