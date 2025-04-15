
import Check from "rutas/check";
import Casas from "views/casa";

import DashboardTecnico from 'views/evaluacion/tecnico/Dashboard'

import EvaluacionMunicipal from "views/evaluacion/tecnico/evaluador.municipal"
import Rociado1 from "views/evaluacion/tecnico/rociado1";
import MSDK from "views/maps/m-sdk";

var routes = [

    {
      path: "/home",
      name: "INICIO",
      icon: "tim-icons icon-chart-pie-36",
      component: <DashboardTecnico />,
      layout: "/tecnico",
    },

  {
    path: "/viviendas",
    name: "Viviendas",
    icon: "tim-icons icon-bank",
    component: <Casas />,
    layout: "/tecnico",
  },


  // {
  //   path: "/ee-1",
  //   name: "Eval. entomologica EE-1",
  //   icon: "tim-icons icon-notes",
  //   component: <Ee1 />,
  //   layout: "/tecnico",
  // },


  {
    path: "/ee-1-version-2",
    name: "EVALUACION V-2",
    icon: "tim-icons icon-notes",
    component: <EvaluacionMunicipal />,
    layout: "/tecnico",
  },


  {
    path: "/RR1-CH-MA",
    name: "RR1-CH-MA",
    icon: " tim-icons  icon-book-bookmark",
    component: <Rociado1 />,
    layout: "/tecnico",
  },


  {
    path: "/georef",
    name: "Georeferenciaciones",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/tecnico",
  },


]; 

export default routes;
