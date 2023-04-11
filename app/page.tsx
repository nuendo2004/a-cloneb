import { Inter } from "next/font/google";
import Container from "./components/Container";
import NotFound from "./components/NotFound";
import getListing from "./actions/getListing";
import ListingCard from "./components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const listing = await getListing();
  const currentUser = await getCurrentUser();

  const mappedListing = listing.map((list) => (
    <ListingCard
      key={list.id}
      data={list}
      actionId=""
      currentUser={currentUser}
    />
  ));

  if (listing.length === 0) return <NotFound showReset />;
  return (
    <main>
      <Container>
        <div className="pt-24 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grod-cols-5">
          {mappedListing}
        </div>
      </Container>
    </main>
  );
}
