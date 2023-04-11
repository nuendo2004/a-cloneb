import dbClient from "../libs/mongodb";
export default async function getListing() {
  try {
    const listing = await dbClient.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listing;
  } catch (err: any) {
    throw new Error(err);
  }
}
