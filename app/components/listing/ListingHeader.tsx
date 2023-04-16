"use client";

import useCountries from "@/app/hooks/useCountries";
import { PropertyLocation, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  location: PropertyLocation;
  id: string;
  currentUser?: SafeUser | null;
  review?: number | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  imageSrc,
  location,
  id,
  currentUser,
  review,
}) => {
  const { getCountryByValue } = useCountries();

  return (
    <>
      <div>
        <Heading title={title} />
        <div className="flex gap-3 items-center">
          <div className="flex items-center">
            <AiFillStar size={16} className="mr-1" />
            <div className="text-md font-light">{review}</div>
          </div>
          <div className="text-neutral-700">{`${location?.location.city}, ${location?.location.state}, ${location?.location.country}`}</div>
        </div>
      </div>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          alt="property image"
          className="object-cover w-full"
        />
      </div>
    </>
  );
};

export default ListingHeader;
