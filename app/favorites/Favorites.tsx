import Container from "../components/Container";
import Heading from "../components/Heading";
import WideSection from "../components/WideSection";
import ListingCard from "../components/listing/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const Favorites: React.FC<FavoritesProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <WideSection>
        <Heading title="Favorites" subtitle="List of places you liked" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grod-cols-5 gap-8">
          {listings.map((list) => (
            <ListingCard
              actionId=""
              data={list}
              currentUser={currentUser}
              key={list.id}
            />
          ))}
        </div>
      </WideSection>
    </Container>
  );
};

export default Favorites;
