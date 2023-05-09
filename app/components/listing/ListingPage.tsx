"use client";
import {
  ListingInfo,
  SafeListing,
  SafeReservation,
  SafeUser,
} from "@/app/types";
import type { Reservation } from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "../nav/Categories";
import ListingHeader from "./ListingHeader";
import ListingInfomation from "./ListingInfomation";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { createReservation } from "@/app/service/rentingService";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";
import { sendEmail } from "@/app/service/userService";

interface ListingPageProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservation?: SafeReservation[];
}

const initialDate = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingPage: React.FC<ListingPageProps> = ({
  listing,
  currentUser,
  reservation = [],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDate);

  const login = useLogin();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const listingInfo: ListingInfo = {
    user: listing.user,
    category: category,
    description: listing.description,
    roomCount: listing.roomCount,
    guestCount: listing.guestCount,
    bathroomCount: listing.bathroomCount,
    location: listing.location,
  };

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return login.onOpen();
    const { startDate, endDate } = dateRange;
    const listingId = listing?.id;
    setIsLoading(true);
    createReservation({ totalPrice, startDate, endDate, listingId })
      .then((res) => {
        toast.success("Listing reserved!");
        setDateRange(initialDate);
        sendEmail(currentUser.email || "nuendo2004");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong, please try again later"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, login]);

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reserv) => {
      const range = eachDayOfInterval({
        start: new Date(reserv.startDate),
        end: new Date(reserv.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);

  //+++++++++++++++++++++ price model ++++++++++++++++++++++
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (days && listing.price) {
        setTotalPrice(days * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <div className="max-w-screen-lg mx-auto mt-5 flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <ListingHeader
          title={listing.title}
          imageSrc={listing.imageSrc}
          location={listing.location}
          id={listing.id}
          review={listing.review}
          currentUser={currentUser}
        />
      </div>
      <div className="md:grid md:grid-cols-10 gap-10">
        <ListingInfomation listing={listingInfo} />
        <div className="order-first mb-10, md:order-last md:col-span-3">
          <ListingReservation
            disabled={isLoading}
            totalPrice={totalPrice}
            listPrice={listing.price}
            onChangeDate={(range) => setDateRange(range)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disableDates={disableDates}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
