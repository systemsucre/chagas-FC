



import Check from "rutas/check";
import Casas from "views/casa";
import Ee2Encargado from "views/evaluacion/encargado/ee2";
import RociadoRR2 from "views/evaluacion/encargado/Rociado";
import MSDK from "views/maps/m-sdk";

var routes = [

  {
    path: "/EE-2",
    name: "EE-2",
    icon: " tim-icons  icon-book-bookmark",
    component: <Ee2Encargado />,
    layout: "/ee-2-jefe-municipal",
  },

  {
    path: "/RR2-CH-MA",
    name: "RR2-CH-MA",
    icon: " tim-icons  icon-book-bookmark",
    component: <RociadoRR2 />,
    layout: "/ee-2-jefe-municipal",
  },
  {
    path: "/viviendas",
    name: "Viviendas",
    icon: "tim-icons icon-bank",
    component: <Casas />,
    layout: "/ee-2-jefe-municipal",
  },
  {
    path: "/georef",
    name: "Georeferenciaciones",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/ee-2-jefe-municipal",
  },


]; 
export default routes;
