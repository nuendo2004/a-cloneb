import dbClient from "../libs/mongodb";

interface IParams {
  listingId?: string;
}

const getListingById = async (params: IParams) => {
  try {
    const { listingId } = params;
    const listing = await dbClient.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) return null;
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      dateModified: listing.dateModified.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updateAt: listing.user.updateAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getListingById };
