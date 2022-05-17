import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
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
    const map = useMap();
    const [zoomLevel, setZoomLevel] = useState(map._zoom);

    const [points, setPoints] = useState([
        L.latLng(51.505, -0.1),
        L.latLng(51.513, -0.09),
        L.latLng(51.515, -0.11),
        L.latLng(51.506, -0.13),
    ]);

    const [mergedPoint, setMergedPoint] = useState(null);

    const [connections, setConnections] = useState([
        [L.latLng(51.505, -0.1), L.latLng(51.513, -0.09)],
        [L.latLng(51.505, -0.1), L.latLng(51.515, -0.11)],
        [L.latLng(51.505, -0.1), L.latLng(51.506, -0.13)],
    ]);

    function calculateDistances(pointsArray) {
        let convertedArray = [];

        pointsArray.forEach((element) => {
            convertedArray.push(L.latLngToLayerPoint(element));
        });
        //  console.log(convertedArray);
    }

    const [distances, setDistances] = useState(L.d);

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    useEffect(() => {
        console.log(mergedPoint);
    }, [mergedPoint]);

    useEffect(() => {
        //  connections.map((con) => console.log(con));
        setZoomLevel(map._zoom);

        let convertedArray = [];

        points.forEach((element) => {
            convertedArray.push(map.latLngToLayerPoint(element));
        });
        //   console.log(convertedArray);

        let distances = [];

        convertedArray.forEach((item) => {
            convertedArray.forEach((secItem) => {
                //   console.log(secItem.x);
                let distance = Math.sqrt(
                    Math.pow(item.x - secItem.x, 2) +
                        Math.pow(item.y - secItem.y, 2)
                );
                distances.push(distance);
            });
        });

        // console.log(distances);

        let outOfRange = false;

        distances.forEach((dist) => {
            if (dist < 50 && dist !== 0) {
                if (outOfRange === false) {
                    outOfRange = true;
                }
                /*
                console.log("wchodze");
                let middleX = 0;
                let middleY = 0;

                points.forEach((item) => {
                    middleX += item.lat;
                });

                points.forEach((item) => {
                    middleY += item.lng;
                });

                middleX /= points.length;
                middleY /= points.length;

                //  console.log(middleX);
                //   console.log(middleY);
                console.log("LOVER than 150!");
                setMergedPoint(L.latLng(middleX, middleY));
                */
            } else {
                setMergedPoint(null);
                //  console.log("greather than 150!");
            }
        });

        if (outOfRange === true) {
            distances.forEach((dist) => {
                // console.log("wchodze");
                let middleX = 0;
                let middleY = 0;

                points.forEach((item) => {
                    middleX += item.lat;
                });

                points.forEach((item) => {
                    middleY += item.lng;
                });

                middleX /= points.length;
                middleY /= points.length;

                //  console.log(middleX);
                //   console.log(middleY);
                setMergedPoint(L.latLng(middleX, middleY));
            });
        } else {
            setMergedPoint(null);
        }
        // console.log(mergedPoint);
    }, [zoomLevel]);

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mergedPoint === null &&
                connections.map((connection, idx) => (
                    <RoutingMachine waypoints={connection} color="#9e3b99" />
                ))}
            {mergedPoint !== null && (
                <Marker
                    position={[mergedPoint.lat, mergedPoint.lng]}
                    icon={iconCustomMarker}
                >
                    <Popup>Clever fox :D</Popup>
                </Marker>
            )}
            {mergedPoint === null && (
                <>
                    <Marker position={[51.515, -0.11]} icon={iconCustomMarker}>
                        <Popup>Clever fox :D</Popup>
                    </Marker>
                    <Marker position={[51.505, -0.1]} icon={iconCatMarker}>
                        <Popup>Have a nice day! :)</Popup>
                    </Marker>
                    <Marker position={[51.506, -0.13]} icon={iconDogMarker}>
                        <Popup>Good idea!</Popup>
                    </Marker>
                    <Marker position={[51.513, -0.09]} icon={iconRabbitMarker}>
                        <Popup>Happy kitten ^^</Popup>
                    </Marker>
                </>
            )}
        </>
    );
}

export default App;
