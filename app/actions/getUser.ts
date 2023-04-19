import dbClient from "../libs/mongodb";

const getUser = async (userId: string) => {
  let user;
  try {
    user = await dbClient.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
  if (!user) return null;
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updateAt: user.updateAt.toISOString(),
    emailVerified: user.emailVerified?.toISOString() || null,
  };
};

export { getUser };
