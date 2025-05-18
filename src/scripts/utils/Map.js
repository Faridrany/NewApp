import { MAP_SERVICE_API_KEY } from "../config";
import { getAddress } from "../data/api";

export default class Map {
    #map = null;
    #marker = null;


    constructor({ containerId, lat, lng, draggable = false }) {
        this.init(containerId, lat, lng, draggable);
    }

    init(containerId, lat, lng, draggable) {
        this.#map = L.map(containerId).setView([lat, lng], 5);
        this.setLayer();
    }

    initEvent() {
        this.#map.on('click', (event) => this.handleMapClick(event));
        this.#marker.on('dragend', () => this.handleMapDrag());
    }

    async costumMark({ lat, lng, option = {} }, stories = null) {
        stories.forEach(story => {
            if (story.lat === null || story.lon === null) {
                return;
            }
            this.#marker = L.marker([story.lat, story.lon], option).addTo(this.#map)
                .bindPopup(` 
                <div class=" flex flex-col">
                    <img src="${story.photoUrl}" class="rounded-sm">
                    <h3 class="font-semibold mb-1 mt-2">${story.name}</h3>
                    <span class="max-w-[150px] line-clamp-3">${story.description}</span>
                </div>`);
        });

    }

    async mark({ lat, lng, option }) {
        try {
            let response = await getAddress({ lat: lat, lng: lng });
            let address = response.address || "Address is not found";

            this.#marker = L.marker([lat, lng], option).addTo(this.#map)
                .bindPopup(`<b>Alamat: </b> ${address}`);

        } catch (error) {
            console.error("Error mengambil alamat:", error);
        }
    }

    setLayer() {
        const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        });

        const googleSat = L.tileLayer(
            "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
            {
                attribution: "© Google Maps",
            }
        );

        const mapTiler = L.tileLayer(
            `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAP_SERVICE_API_KEY.mapTiller}`,
            {
                attribution: "© MapTiler",
            }
        );

        osm.addTo(this.#map);

        const baseMaps = {
            "OpenStreetMap": osm,
            "Google Satellite": googleSat,
            "MapTiler Streets": mapTiler,
        };

        L.control.layers(baseMaps).addTo(this.#map);
    }
    async handleMapClick(event) {
        const { lat, lng } = event.latlng;
        try {
            let response = await getAddress({ lat: lat, lng: lng });
            let address = response.address || "Address is not found";
            this.updateMarker(lat, lng, address);

        } catch (error) {
            console.error("Error mengambil alamat:", error);
        }

        this.updateLatLngFields(lat, lng);
    }

    async handleMapDrag() {
        const { lat, lng } = this.#marker._latlng;
        try {
            let response = await getAddress({ lat: lat, lng: lng });
            let address = response.address || "Address is not found";
            this.updateMarker(lat, lng, address);

        } catch (error) {
            console.error("Error mengambil alamat:", error);
        }
        this.updateLatLngFields(lat, lng);
    }

    updateMarker(lat, lng, address) {
        if (this.#marker) {
            this.#map.removeLayer(this.#marker);
        }

        this.#marker = L.marker([lat, lng], { draggable: true }).addTo(this.#map)
            .bindPopup(`<b>Alamat:</b> ${address}`)
            .openPopup();

        this.#marker.on('dragend', () => this.handleMapDrag());
    }

    updateLatLngFields(lat, lng) {
        document.getElementById('location-lat').value = lat;
        document.getElementById('location-lng').value = lng;
    }
}