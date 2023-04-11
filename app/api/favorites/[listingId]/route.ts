import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import dbClient from "@/app/libs/mongodb";

interface IParams {
  listingId?: string;
}

const authCheck = async (params: IParams) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }
  return { currentUser, listingId };
};

const POST = async (req: Request, { params }: { params: IParams }) => {
  const auth = await authCheck(params);
  if (!auth) return NextResponse.error();
  const { currentUser, listingId } = auth;

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);
  const user = await dbClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
};
const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const auth = await authCheck(params);
  if (!auth) return NextResponse.error();
  const { currentUser, listingId } = auth;

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await dbClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
};

export { POST, DELETE };
