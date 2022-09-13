import { createBuses, realTimeData } from "./map.js";
const buses = createBuses();

async function run() {
    let data = await realTimeData();
    // console.log(data)
    for (let vehicle of data) {
        (await buses).forEach(bus => {
            if (vehicle.id === bus.id) {
                bus.marker.setLngLat([
                    vehicle.attributes.longitude,
                    vehicle.attributes.latitude
                ]);
            }
        })
    }
    setTimeout(run, 10000);
}

run()
