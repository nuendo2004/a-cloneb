import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import dbClient from "@/app/libs/mongodb";

interface IParams {
  reservationId?: string;
}

const DELETE = async (request: Request, { params }: { params: IParams }) => {
  const currenUser = await getCurrentUser();
  if (!currenUser) {
    return NextResponse.error();
  }
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string")
    throw new Error("Invalid Id");
  let reservation;
  try {
    reservation = await dbClient.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: currenUser.id }, { listing: { userId: currenUser.id } }],
      },
    });
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json(reservation);
};

export { DELETE };
