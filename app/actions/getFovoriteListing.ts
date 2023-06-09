import dbClient from "../libs/mongodb";
import getCurrentUser from "./getCurrentUser";

export default async function getFoveriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await dbClient.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((fav: any) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
      dateModified: fav.dateModified.toISOString(),
    }));

    return safeFavorites;
  } catch (err: any) {
    throw new Error(err);
  }
}
