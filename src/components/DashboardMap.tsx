import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/images/layers-2x.png";
import "leaflet/dist/images/layers.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { findCoordinates } from "../helper/functions";

const DashboardMap = ({
  origin,
  destination,
}: {
  origin: string | undefined;
  destination: string | undefined;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const originCoordinates = findCoordinates(origin!);
  const destinationCoordinates = findCoordinates(destination!);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
      }).addTo(map);

      // Add routing control
      if (originCoordinates && destinationCoordinates) {
        L.Routing.control({
          waypoints: [
            L.latLng(originCoordinates.lat, originCoordinates.lng),
            L.latLng(destinationCoordinates.lat, destinationCoordinates.lng),
          ],
        }).addTo(map);
      }
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        zIndex: "1",
      }}
    />
  );
};

export default DashboardMap;
