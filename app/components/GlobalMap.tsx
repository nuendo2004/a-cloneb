"use client";
import Leaf from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
delete Leaf.Icon.Default.prototype._getIconUrl;
Leaf.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  center?: number[];
  className?: string;
};

const GlobalMap: React.FC<MapProps> = ({ center, className }) => {
  return (
    <MapContainer
      center={(center as Leaf.LatLngExpression) || [51, -0.09]}
      zoom={center ? 15 : 2}
      scrollWheelZoom={false}
      className={`${className} h-[45vh] rounded-lg`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default GlobalMap;
