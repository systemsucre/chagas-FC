



import Check from "rutas/check";

import MSDK from "views/maps/m-sdk";
import ReportesTratamientoDepto from "views/diagnostico/reportes/reportes_tratamiento_depto";
import ReportesDiagnosticoDepto from "views/diagnostico/reportes/reportes_diagnostico_depto";

import Icons from "views/Icons";

var RoutesReportesTratamientoDepto = [

  {
    path: "/main",
    name: "Reportes Tratamiento",
    icon: "tim-icons  icon-notes",
    component: <ReportesTratamientoDepto />,
    layout: "/reportes-tratamiento-depto",
  },


  {
    path: "/diagnostico",
    name: "Reportes Diagnostico",
    icon: "tim-icons  icon-notes",
    component: <ReportesDiagnosticoDepto />,
    layout: "/reportes-tratamiento-depto",
  },


  {
    path: "/georef",
    name: "Georeferenciaciones UBE",
    icon: "tim-icons icon-pin",
    component: <Check component={MSDK} />,
    layout: "/reportes-tratamiento-depto",
  },

  // {
  //   path: "/icons",
  //   name: "icons",
  //   icon: "tim-icons icon-pin",
  //   component: <Icons />,
  //   layout: "/tratamiento",
  // },



];
export default RoutesReportesTratamientoDepto;
