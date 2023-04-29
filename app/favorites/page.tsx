import NotFound from "../components/NotFound";

import getCurrentUser from "../actions/getCurrentUser";
import getFoveriteListing from "../actions/getFovoriteListing";
import Favorites from "./Favorites";

const FavoritesPage = async () => {
  const listings = await getFoveriteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <NotFound
        title="No favorites found"
        subtitle="Save your favorite listing for later"
      />
    );
  }
  return <Favorites listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
