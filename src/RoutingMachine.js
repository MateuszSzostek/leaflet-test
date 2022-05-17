import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ waypoints, color }) => {
    const instance = L.Routing.control({
        waypoints: waypoints,
        lineOptions: {
            styles: [{ color: color, weight: 7 }],
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: false,
        showAlternatives: false,
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
