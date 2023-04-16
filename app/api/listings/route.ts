import { NextResponse } from "next/server";

import dbClient from "@/app/libs/mongodb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { request } from "http";

const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  const reqBody = await req.json();
  const {
    category,
    location,
    guestCount,
    bathroomCount,
    roomCount,
    imageSrc,
    price,
    title,
    description,
    detailImage,
    review,
  } = reqBody;

  Object.keys(reqBody).forEach((val) => {
    if (!reqBody[val]) NextResponse.error();
  });

  const listing = await dbClient.listing.create({
    data: {
      userId: currentUser.id,
      category,
      location,
      guestCount,
      bathroomCount,
      roomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      review: 4.9,
      detailImage,
    },
  });

  return NextResponse.json(listing);
};

export { POST };
