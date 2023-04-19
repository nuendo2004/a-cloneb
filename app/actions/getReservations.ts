import { error } from "console";
import dbClient from "../libs/mongodb";

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
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
      user: {
        ...reservation.user,
        createdAt: reservation.user.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getReservations };
