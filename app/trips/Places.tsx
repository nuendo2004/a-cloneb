"use client";
import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { getAttractions } from "../service/locationService";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PlacesProps {
  listSize?: number;
  radius?: number; // redius is in meter
  latlng: number[];
  kind?: string;
}

const Places: React.FC<PlacesProps> = ({
  listSize = 12,
  radius = 4000,
  latlng,
  kind = "interesting_places",
}) => {
  const [attractions, setAttractions] = useState([]);
  useEffect(() => {
    getAttractions(radius, latlng, kind, listSize).then((res) =>
      setAttractions(res.data)
    );
  }, [listSize, radius, latlng, kind]);

  type Attraction = {
    xid: number;
    name: string;
    dist: number;
    rate: number;
    osm?: string;
    point: { lon: number; lat: number };
    wikidata?: string;
    kind?: string;
  };
  const router = useRouter();

  const mappedAttractions = attractions.map((attr: Attraction) => {
    if (attr.name.length > 0)
      return (
        <div
          key={attr.xid}
          className="rounded-xl border-1 bg-rose-200 inline-block px-2 py-1 m-2"
        >
          <div>{attr.name}</div>
        </div>
      );
  });

  return (
    <div className="lg:max-w-[36%] mx-4">
      <h2 className="mx-2 text-lg font-bold">Near by</h2>
      {mappedAttractions}
    </div>
  );
};

export default Places;
