import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { PropertyLocation } from "../types";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { toast } from "react-hot-toast";

interface GoogleMapWidgetProps {
  destination?: PropertyLocation | null;
  showCurrentRoute: boolean;
  currentCoords: number[] | null;
}

interface MapMarker {
  label: string;
  icon: IconType;
  lat?: number;
  lng?: number;
}

const MapMarker: React.FC<MapMarker> = ({ label, icon: Icon }) => {
  return (
    <div className="flex flex-col justify-center">
      <Icon size={24} className="text-rose-600" />
      <p className="text-lg">{label}</p>
    </div>
  );
};

const GoogleMapWidget: React.FC<GoogleMapWidgetProps> = ({
  destination,
  showCurrentRoute,
  currentCoords,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
    libraries: ["places"],
  });
  const [direction, setDirection] =
    useState<google.maps.DirectionsResult | null>();

  const coords = destination?.latlng || [11, -11];
  const center = {
    lat: coords[0],
    lng: coords[1],
  };

  const getRoute = async () => {
    const dir = new google.maps.DirectionsService();
    if (!currentCoords) {
      toast.error("No GPS infomation, please allow use location and try again");
      return;
    }
    const result = await dir.route({
      origin: { lat: currentCoords[0], lng: currentCoords[1] },
      destination: center,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirection(result);
  };

  const clearRoute = () => {
    setDirection(null);
  };

  useEffect(() => {
    console.log(showCurrentRoute);
    if (showCurrentRoute) {
      getRoute();
    } else clearRoute();
  }, [showCurrentRoute]);

  return (
    <div className="h-full w-full flex flex-col">
      <GoogleMap center={center} zoom={15} mapContainerClassName="flex-1">
        {direction && <DirectionsRenderer directions={direction} />}
        <Marker
          label="Your trip"
          position={{ lat: coords[0], lng: coords[1] }}
        />
        {showCurrentRoute && currentCoords && (
          <Marker
            label="Current location"
            position={{ lat: currentCoords[0], lng: currentCoords[1] }}
          />
        )}
      </GoogleMap>
      {direction && (
        <>
          <div>Distance: {direction?.routes[0].legs[0].distance?.text}</div>
          <div>
            Estimate Time: {direction?.routes[0].legs[0].duration?.text}
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleMapWidget;
