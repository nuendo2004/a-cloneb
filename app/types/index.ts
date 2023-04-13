import { Listing, Reservation, User } from "@prisma/client";
import { IconType } from "react-icons";

type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
  createdAt: string;
  updateAt: string;
  emailVerified: string | null;
};

type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string };

type ListingInfo = {
  user: SafeUser;
  category: { label: string; icon: IconType; description: string } | undefined;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
};

type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type { SafeUser, SafeListing, ListingInfo, SafeReservation };
