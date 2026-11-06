const oeHq = ol.proj.fromLonLat([12.970886, 45.966033]);
const attribution = new ol.control.Attribution({
  collapsible: true,
});

/* Map preparation */

const map = new ol.Map({
  target: "display-map",
  controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    constrainResolution: true,
    center: oeHq,
    zoom: 16
  }),
});

const marker = new ol.Overlay({
  position: oeHq,
  positioning: "bottom-center",
  element: document.getElementById("oe-marker"),
  stopEvent: false,
});

map.addOverlay(marker);
