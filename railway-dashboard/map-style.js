let map ;
function initMap() {
  if (map) {
    map.remove(); // remove existing map instance safely
  }

  map = L.map("map", {
    zoomControl: false,
  }).setView([28.61, 77.23], 6); // Example default location

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Tiles &copy; CartoDB',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  // Overlay for OpenRailwayMap
  const railwayOverlay = L.tileLayer(
    "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a>',
    }
  );
  railwayOverlay.addTo(map);

  
  

  // 3. Custom red alert marker
  const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // 4. Example alert marker
  L.marker([28.6448, 77.2167], { icon: redIcon })
    .addTo(map)
    .bindPopup("🚨 <strong>Crack detected</strong><br>Reported by child module.");
}

window.onload = initMap;


function confirmFindTracks() {
  closePopup();
  locateAndShowTracks(); // Triggers geolocation + Overpass
}

function closePopup() {
  document.getElementById("track-popup").style.display = "none";
}

function locateAndShowTracks() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const overpassUrl = "https://overpass-api.de/api/interpreter";
      const query = `
        [out:json];
        (
          way["railway"](around:1000,${lat},${lon});
        );
        out geom;
      `;

      fetch(overpassUrl, {
        method: "POST",
        body: query,
      })
        .then((res) => res.json())
        .then((data) => {
          data.elements.forEach((way) => {
            const coords = way.geometry.map((g) => [g.lat, g.lon]);
            L.polyline(coords, {
              color: "#F95C6B", // Accent color
              weight: 3,
            }).addTo(map);
          });

          map.setView([lat, lon], 15);

          // ✅ Stylized current location marker
          L.circleMarker([lat, lon], {
            radius: 8,
            color: "#fefffe",      // stroke color
            fillColor: "#F95C6B",  // fill
            fillOpacity: 0.9,
            weight: 2
          })
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();
        })
        .catch((err) => {
          console.error("Failed to load railway tracks:", err);
        });
    },
    () => alert("Failed to get location.")
  );
}


window.onload = function () {
  initMap(); // Your map init function (already defined)

  setTimeout(() => {
    document.getElementById("track-popup").style.display = "flex";
  }, 3000); // Show popup after 3 seconds
};

function openAlertsPopup() {
  alert("🚨 Critical alerts will be shown here!"); // Replace with custom popup later
}
