



import Check from "rutas/check";
import Casas from "views/casa";
import RecepcionUbe from "views/UBE/recepcionUbe.js";
import LaboratorioUbe from "views/UBE/laboratorioUbe";
import LaboratorioUbeConsolidado from "views/UBE/laboratorioUbeConsolidado";
import MSDK from "views/maps/m-sdk";
import Icons from "views/Icons";

var RoutesUBE = [

  {
    path: "/formulario",
    name: "RECEPCION TRIATOMINOS",
    icon: " tim-icons  icon-notes",
    component: <RecepcionUbe />,
    layout: "/recepcion-ube",
  },

  {
    path: "/resultados-laboratorio",
    name: "RESULTADO LABORATORIO",
    icon: " tim-icons  icon-molecule-40",
    component: <LaboratorioUbe />,
    layout: "/recepcion-ube",
  },


  {
    path: "/laboratorio-consolidado",
    name: "CONSOLIDADO TRIATOMINOS",
    icon: " tim-icons  icon-cloud-download-93",
    component: <LaboratorioUbeConsolidado />,
    layout: "/recepcion-ube",
  },

  {
    path: "/viviendas",
    name: "VIVIENDAS",
    icon: "tim-icons icon-bank",
    component: <Casas />,
    layout: "/recepcion-ube",
  },
  {
    path: "/georef",
    name: "Georeferenciaciones UBE",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/recepcion-ube",
  },

  // {
  //   path: "/icons",
  //   name: "icons",
  //   icon: "tim-icons icon-pin",
  //   component: <Icons />,
  //   layout: "/recepcion-ube",
  // },



];
export default RoutesUBE;
