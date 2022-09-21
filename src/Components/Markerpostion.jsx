import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useMemo } from "react";
import Icon from "../icon";

export default function Markerposition({ location }) {
  const position = useMemo(() => {
    return [location.lat, location.lng];
  }, [location.lat, location.lng]);
  const map = useMap();
  //Automatically adjusts map to new marker position.
  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);

  return (
    <Marker position={position} icon={Icon}>
      <Popup>
        {location.city}
        <br />
        {location.region}
      </Popup>
    </Marker>
  );
}
