import dbClient from "../libs/mongodb";

export interface IListingParam {
  userId?: string;
}

export default async function getListing(params: IListingParam) {
  try {
    const { userId } = params;
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await dbClient.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safelistings = listings.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
      dateModified: list.dateModified.toISOString(),
    }));

    return safelistings;
  } catch (err: any) {
    throw new Error(err);
  }
}
