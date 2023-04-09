"use client";
import { TbBeach, TbPool } from "react-icons/tb";
import { IoDiamond } from "react-icons/io5";
import {
  GiWindmill,
  GiFamilyHouse,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiCampfire,
  GiCaveEntrance,
  GiBarn,
} from "react-icons/gi";
import Category from "../Category";
import { usePathname, useSearchParams } from "next/navigation";
import { MdCabin, MdOutlineKingBed, MdOutlineVilla } from "react-icons/md";
import { RiCactusLine } from "react-icons/ri";
import { BsFire, BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import React, { useRef, forwardRef, ReactElement } from "react";
const categories = [
  {
    label: "Trending",
    icon: BsFire,
    description: "This property is on fire, not literally",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property his in the artic circle",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This property is a barn",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is inside or close to a cave",
  },
  {
    label: "Rooms",
    icon: MdOutlineKingBed,
    description: "This include part of this property",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Farms",
    icon: GiWindmill,
    description: "This property is in a farm",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is shinny",
  },
  {
    label: "Mansions",
    icon: GiFamilyHouse,
    description: "This property let you experience being the richest",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property looks fantastic",
  },
  {
    label: "Cabins",
    icon: MdCabin,
    description: "Enjoy the peace",
  },
  {
    label: "Lakefront",
    icon: GiBoatFishing,
    description: "Who doesn't like a little pound",
  },
  {
    label: "Desert",
    icon: RiCactusLine,
    description: "Under the star",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Enjoy your private pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Only accessable by boat",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is on top of a snowing mountain",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a castle",
  },
  {
    label: "Camping",
    icon: GiCampfire,
    description: "This property has camping activities",
  },
];

const Categories = React.forwardRef(function Categories(props, childref: any) {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <div
      ref={childref}
      className="gap-12 pt-4 flex flex-row items-center justify-between flex-nowrap transition-all"
    >
      {categories.map((c) => (
        <Category
          key={c.label}
          label={c.label}
          selected={category === c.label}
          description={c.description}
          icon={c.icon}
        />
      ))}
    </div>
  );
});

export { categories };
export default Categories;
