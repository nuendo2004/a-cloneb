import dbClient from "../libs/mongodb";

const getListingByHost = async ({ userId }: { userId: string }) => {
  try {
    const listings = await dbClient.listing.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!listings) return null;
    return listings.map((listing: any) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      dateModified: listing.dateModified.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getListingByHost };
