import getCurrentUser from "../actions/getCurrentUser";
import { getListingByHost } from "../actions/getListingByHost";
import getListing from "../actions/getListing";
import AdminPanel from "./AdminPanel";
import MyProperties from "./mylistings/page";
import Overview from "./Overview";

const Property = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <></>;
  }

  return (
    <section className="flex flex-col h-full lg:flex-row">
      <AdminPanel currentUser={currentUser} />
      <Overview currentUser={currentUser} />
    </section>
  );
};

export default Property;
