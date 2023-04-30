import dbClient from "../libs/mongodb";
export default async function getListing() {
  try {
    const listings = await dbClient.listing.findMany({
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
