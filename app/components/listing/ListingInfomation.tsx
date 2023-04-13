import useCountries from "@/app/hooks/useCountries";
import { ListingInfo } from "@/app/types";
import ListingCategory from "./ListingCategory";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../GlobalMap"), { ssr: false });

interface ListingInfoProp {
  listing: ListingInfo;
}

const ListingInfomation: React.FC<ListingInfoProp> = ({ listing }) => {
  const {
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
  } = listing;

  const { getCountryByValue } = useCountries();

  const coordinate = getCountryByValue(locationValue)?.latlng;

  return (
    <div className="col-span-7 flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-xl font-semibold gap-2">
            Hosted by {user?.name}
          </div>
          <div className="flex items-center gap-3 font-light text-neutral-700">
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bath</div>
          </div>
        </div>
        <Avatar src={user?.image} height={56} width={56} />
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-600">{description}</div>

      <hr />

      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfomation;
