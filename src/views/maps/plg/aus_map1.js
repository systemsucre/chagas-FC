import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control.js";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import XYZ from "ol/source/XYZ";
import { onMount } from "svelte";
import { GeocodingControl } from "./openlayers";



async function Map1() {

  let containerElement = HTMLElement;

  const apiKey = "KEglBNfzESBPXqrEfLxy"

  const scale = devicePixelRatio > 1.5 ? "@2x" : "";

  await onMount(() => {
    new Map({
      target: containerElement,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}${scale}.png?key=${apiKey}`,
            tileSize: 512,
            attributions: [
              '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>',
              '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            ],
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
      controls: defaultControls().extend([
        new GeocodingControl({
          apiKey,
          enableReverse: "always",
          // collapsed: true,
          iconsBaseUrl: "/icons/",
        }),
      ]),
    });
    <main id="main" />
    var d = document.getElementById('main');
    d.innerHTML = containerElement;
  });
}


export default Map1;

