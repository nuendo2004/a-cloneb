import type { Listing } from "@prisma/client";
import dbClient from "../libs/mongodb";

export interface IListingParam {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListing(params: IListingParam) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;
    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (startDate && startDate?.length > 0 && endDate && endDate?.length > 0) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }
    // if (locationValue)
    // query.location = {
    //   location: {
    //     country: locationValue,
    //   },
    // };

    const listings = await dbClient.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safelistings = listings.map((list: Listing) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
      dateModified: list.dateModified.toISOString(),
    }));

    return safelistings;
  } catch (err: any) {
    throw new Error(err);
  }
}
