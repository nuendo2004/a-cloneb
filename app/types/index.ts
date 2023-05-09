import { Listing, Reservation, User } from "@prisma/client";
import { IconType } from "react-icons";

type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
  createdAt: string;
  updateAt: string;
  emailVerified: string | null;
};

type SafeListing = Omit<Listing, "createdAt" | "dateModified"> & {
  createdAt: string;
  dateModified: string;
};

type ListingInfo = {
  user: SafeUser;
  category: { label: string; icon: IconType; description: string } | undefined;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: PropertyLocation;
};

type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing" | "dateModified"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  user: SafeUser;
  dateModified: string;
};

type PropertyLocation = {
  address: string;
  location: { city: string; state: string; country: string };
  latlng: number[];
};

export type {
  SafeUser,
  SafeListing,
  ListingInfo,
  SafeReservation,
  PropertyLocation,
};
