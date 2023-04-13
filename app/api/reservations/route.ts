import { NextResponse } from "next/server";
import dbClient from "@/app/libs/mongodb";
import getCurrentUser from "@/app/actions/getCurrentUser";

const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const reqBody = await req.json();
  const { listingId, startDate, endDate, totalPrice } = reqBody;

  if (!listingId || !startDate || !endDate || !totalPrice)
    return NextResponse.error();

  const listingReservation = await dbClient.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingReservation);
};

export { POST };
