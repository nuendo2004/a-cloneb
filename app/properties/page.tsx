import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListing";
import AdminPanel from "./AdminPanel";
import MyProperties from "./mylistings/page";
import Overview from "./Overview";

const Property = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <></>;
  }

  const myListings = await getListing({ userId: currentUser.id });

  return (
    <section className="flex flex-col h-full lg:flex-row">
      <AdminPanel currentUser={currentUser} />
      <Overview listings={myListings} />
    </section>
  );
};

export default Property;
