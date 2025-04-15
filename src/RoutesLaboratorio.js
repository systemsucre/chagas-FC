



import Check from "rutas/check";

import Laboratorio from "views/diagnostico/diagnostico/laboratorio.js";
import MSDK from "views/maps/m-sdk";
import Icons from "views/Icons";

var RoutesLaboratorio = [


  {
    path: "/laboratorio",
    name: "LABORATORIO",
    icon: " tim-icons  icon-single-02",
    component: <Laboratorio />,
    layout: "/laboratorio-diagnostico",
  },



  {
    path: "/georef",
    name: "Georeferenciaciones UBE",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/laboratorio-diagnostico",
  },

  // {
  //   path: "/icons",
  //   name: "icons",
  //   icon: "tim-icons icon-pin",
  //   component: <Icons />,
  //   layout: "/laboratorio-diagnostico",
  // },



];
export default RoutesLaboratorio;
