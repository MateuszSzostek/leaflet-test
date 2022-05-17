import logo from "./logo.svg";
import { useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import rabbitIcon from "./happy.png";
import dogIcon from "./happiness.png";
import catIcon from "./laughing.png";
import customMarkerIcon from "./light-bulb.png";
import { L as LRouting } from "leaflet-routing-machine";
import RoutingMachine from "./RoutingMachine";
import Map from "./Map";

const iconCustomMarker = new L.Icon({
    iconUrl: rabbitIcon,
    iconRetinaUrl: rabbitIcon,
    iconAnchor: [27, 55],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
});

const iconCatMarker = new L.Icon({
    iconUrl: dogIcon,
    iconRetinaUrl: dogIcon,
    iconAnchor: [27, 55],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
});

const iconRabbitMarker = new L.Icon({
    iconUrl: catIcon,
    iconRetinaUrl: catIcon,
    iconAnchor: [27, 55],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
});

const iconDogMarker = new L.Icon({
    iconUrl: customMarkerIcon,
    iconRetinaUrl: customMarkerIcon,
    iconAnchor: [27, 55],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
});

function App() {
    return (
        <div className="App">
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <Map />
            </MapContainer>
        </div>
    );
}

export default App;
