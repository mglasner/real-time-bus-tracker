export function createMap(center) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWdsYXNuZXIiLCJhIjoiY2w3eXkyZmljMDI3ejN2bXVxOTBmM25qYSJ9.qy-NQayspCLNayVHnYmKCg';
    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 13,
    });
};

export function createMarker(map, lngLat, div) {
    return new mapboxgl.Marker(div).setLngLat(lngLat).addTo(map);
};

export function createBusDiv(className, idName, text) {
    const bus = document.createElement("div");
    const span = document.createElement("span");
    span.innerHTML = text;
    bus.appendChild(span);
    bus.className = className;
    bus.setAttribute("id", idName);
    return bus;
};

export async function realTimeData() {
    const url = "https://api-v3.mbta.com/vehicles?filter[route]=1"
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

export async function createBuses() {
    let buses = [];
    let data = await realTimeData();
    let center = calculateCenter(data);
    const map = createMap(center);
    data.forEach(vehicle => {
        let id = vehicle.id
        let lngLat = [
            vehicle.attributes.longitude,
            vehicle.attributes.latitude
        ];
        let div = createBusDiv("marker", "", id);
        let marker = createMarker(map, lngLat , div)
        buses.push({marker, id});
    });
    return buses;
}

function calculateCenter(data) {
    let latitude = 0;
    let longitude = 0;
    data.forEach(vehicle => {
        latitude += vehicle.attributes.latitude;
        longitude += vehicle.attributes.longitude;
    });
    return [longitude / data.length, latitude / data.length]
}
