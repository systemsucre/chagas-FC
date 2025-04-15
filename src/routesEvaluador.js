
import Check from "rutas/check";
import Casas from "views/casa";


import Evaluacion from "views/evaluacion/evaluador/evaluador.ee1";
import DashboardEvaluador from 'views/evaluacion/evaluador/Dashboard'
import MSDK from "views/maps/m-sdk";
import Icons from "views/Icons";

var routes = [
  {
    path: "/home",
    name: "INICIO",
    icon: "tim-icons icon-chart-pie-36",
    component: <DashboardEvaluador />,
    layout: "/evaluacion",
  },
  
  {
    path: "/viviendas",
    name: "Viviendas",
    icon: "tim-icons icon-bank",
    component: <Casas />,
    layout: "/evaluacion",
  },

  {
    path: "/evaluacion",
    name: "Eval. entomologica EE-1",
    icon: "tim-icons icon-notes",
    component: <Evaluacion />,
    layout: "/evaluacion",
  },

  {
    path: "/georef",
    name: "Georeferenciaciones",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/evaluacion",
  },

];
export default routes;
