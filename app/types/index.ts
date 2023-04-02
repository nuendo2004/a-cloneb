import { User } from "@prisma/client";

type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
  createdAt: string;
  updateAt: string;
  emailVerified: string | null;
};

export type { SafeUser };
