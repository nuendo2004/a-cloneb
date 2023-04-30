import { Inter, Port_Lligat_Sans } from "next/font/google";
import Container from "./components/Container";
import NotFound from "./components/NotFound";
import getListing, { IListingParam } from "./actions/getListing";
import ListingCard from "./components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import Carousel from "./components/Carousel";
const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  searchParams: IListingParam;
}

export default async function Home({ searchParams }: HomeProps) {
  if (!process.env.NEXT_PUBLIC_STRIPE_KEY!)
    throw new Error("Critical error: no stripe key found");

  const listing = await getListing(searchParams);
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
        <Carousel />
        <div className="max-w-[2520px] mx-auto xl:px-24 md:px-16 xm:px-4 px-8 pt-[24px] gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grod-cols-5">
          {mappedListing}
        </div>
      </Container>
    </main>
  );
}
