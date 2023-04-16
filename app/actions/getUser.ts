import dbClient from "../libs/mongodb";

const getUser = async (userId: string) => {
  try {
    const user = await dbClient.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

export { getUser };
