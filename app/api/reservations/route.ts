import { NextResponse } from "next/server";
import dbClient from "@/app/libs/mongodb";
import getCurrentUser from "@/app/actions/getCurrentUser";

const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const reqBody = await req.json();
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    receipt = "pending",
  } = reqBody;

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
          receipt,
        },
      },
    },
  });
  return NextResponse.json(listingReservation);
};

const PUT = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const reqBody = await req.json();
  const {
    reservationsId,
    listingId,
    startDate,
    endDate,
    totalPrice,
    isActive,
    hasPaid,
    receipt = "pending",
  } = reqBody;

  if (!listingId) return NextResponse.error();

  const updates = () => {
    const update: any = {};
    if (startDate) update.startDate = startDate;
    if (endDate) update.endDate = endDate;
    if (totalPrice) update.totalPrice = totalPrice;
    if (isActive) update.isActive = isActive;
    if (hasPaid && receipt) {
      update.hasPaid = hasPaid;
      update.receipt = receipt;
    }
    return update;
  };

  const listingReservation = await dbClient.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        update: {
          where: { id: reservationsId },
          data: {
            ...updates(),
            dateModified: new Date(),
          },
        },
      },
    },
  });
  return NextResponse.json(listingReservation);
};

export { POST, PUT };
