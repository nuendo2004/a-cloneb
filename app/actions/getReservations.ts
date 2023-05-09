import { error } from "console";
import dbClient from "../libs/mongodb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
  userId?: string;
  hostId?: string;
}

const getReservations = async (params: IParams) => {
  const { listingId, userId, hostId } = params;

  const query: any = {};

  try {
    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (hostId) query.listing = { userId: hostId };

    const reservation = await dbClient.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservation.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      dateModified: reservation.dateModified.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        dateModified: reservation.listing.dateModified.toISOString(),
      },
      user: {
        ...reservation.user,
        createdAt: reservation.user.createdAt.toISOString(),
        updateAt: reservation.user.updateAt.toISOString(),
        emailVerified: reservation.user.emailVerified?.toDateString() || null,
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

const addPayment = async (data: {
  reservationId: any;
  receiptNumber: string;
}) => {
  try {
    const reservation = await dbClient.reservation.update({
      where: {
        id: data.reservationId,
      },
      data: {
        hasPaid: true,
        receipt: data.receiptNumber,
      },
    });
    return reservation;
  } catch (e: any) {
    throw new Error(e);
  }
};

export { getReservations, addPayment };
