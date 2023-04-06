import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const dbClient = globalForPrisma?.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  globalForPrisma.prisma = dbClient;
}

export default dbClient;
