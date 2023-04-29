import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbClient from "../libs/mongodb";

export async function getSession() {
  return await getServerSession(authOptions);
}

interface UserModel {
  email: string;
  image: string;
}

export default async function setCurrentUser(userModel: UserModel) {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;
    const currentUser = await dbClient.user.update({
      where: {
        email: session.user.email as string,
      },
      data: {
        email: userModel.email,
        image: userModel.image,
      },
    });

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updateAt: currentUser.updateAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (e) {
    return null;
  }
}
