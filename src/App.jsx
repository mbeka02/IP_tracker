import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

//Components
import Nav from "./Components/Nav";
import Card from "./Components/Card";
import Markerposition from "./Components/Markerpostion";
import "./App.css";

import { MapContainer, TileLayer } from "react-leaflet";
import { icon } from "leaflet";

function App() {
  //STATE
  const [val, setVal] = useState("");
  const [info, setInfo] = useState([]);
  //Regex
  const domainChecker =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  const ipChecker =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  //untested
  //const domainChecker2 = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

  //API call using the input value
  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        import.meta.env.VITE_KEY_PROD
      }&${
        ipChecker.test(val)
          ? `ipAddress=${val}`
          : domainChecker.test(val)
          ? `domain=${val}`
          : `ipAdress=`
      }`
    )
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.log(err));
  }, [val]);
  //Rendering page content(components,map-container etc.)
  return (
    <div className="App">
      <Nav
        onSub={(IP) => {
          setVal(IP);
        }}
      ></Nav>
      <Card address={info.ip} location={info.location} isp={info.isp} />
      {info.location && (
        <MapContainer
          center={[info.location.lat, info.location.lng]}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {info.location && (
            <Markerposition location={info.location} icon={icon} />
          )}
        </MapContainer>
      )}
    </div>
  );
}

export default App;
