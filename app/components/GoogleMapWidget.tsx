import React from "react";
import GoogleMapReact from "google-map-react";
import { IconType } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PropertyLocation } from "../types";

interface GoogleMapWidgetProps {
  destination?: PropertyLocation | null;
}

interface MapMarker {
  label: string;
  icon: IconType;
}

const MapMarker: React.FC<MapMarker> = ({ label, icon: Icon }) => {
  return (
    <div className="flex flex-col justify-center">
      <Icon size={24} className="text-rose-600" />
      <p className="text-lg">{label}</p>
    </div>
  );
};

const GoogleMapWidget: React.FC<GoogleMapWidgetProps> = ({ destination }) => {
  const coords = destination?.latlng || [11, -11];
  const defaultProps = {
    center: {
      lat: coords[0],
      lng: coords[1],
    },
    zoom: 11,
  };
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "";
  return (
    <div className="h-[100%] w-100">
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapMarker label="Your trip" icon={FaMapMarkerAlt} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMapWidget;
