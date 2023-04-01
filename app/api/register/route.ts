import bcrypt from "bcrypt";
import dbClient from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
  const { email, name, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await dbClient.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
};

export { POST };
