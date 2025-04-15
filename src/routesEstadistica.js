



import Check from "rutas/check";
import Casas from "views/casa";
import Ee2Estadistica from "views/evaluacion/estadistica/ee2";
import RR2Estadistica from "views/evaluacion/estadistica/RR2";
import Estratificado from "views/estadistica/estratificado/estratificado";
import EstadisticaLaboratorioUbeConsolidado from "views/estadistica/UBE/laboratorioUbeConsolidado";
import ReportesTratamientoDepto from "views/diagnostico/reportes/reportes_tratamiento_depto";
import ReportesDiagnosticoDepto from "views/diagnostico/reportes/reportes_diagnostico_depto";

import MSDK from "views/maps/m-sdk";

var routes = [

  {
    path: "/EE-2",
    name: "EE-2",
    icon: " tim-icons  icon-book-bookmark",
    component: <Ee2Estadistica />,
    layout: "/estadistica-departamental",
  },

  {
    path: "/RR2-CH-MA",
    name: "RR2-CH-MA",
    icon: " tim-icons  icon-book-bookmark",
    component: <RR2Estadistica />,
    layout: "/estadistica-departamental",
  },
  {
    path: "/estratificado",
    name: "Estratificado",
    icon: "tim-icons  icon-book-bookmark",
    component: <Estratificado />,
    layout: "/estadistica-departamental",
  },

  {
    path: "/ube-consolidado",
    name: "UBE Consolidado",
    icon: "tim-icons  icon-book-bookmark",
    component: <EstadisticaLaboratorioUbeConsolidado />,
    layout: "/estadistica-departamental",
  },

    {
      path: "/reportes-tratamiento-depto",
      name: "Reportes Tratamiento",
      icon: "tim-icons  icon-book-bookmark",
      component: <ReportesTratamientoDepto />,
      layout: "/estadistica-departamental",
    },
    {
      path: "/reportes-diagnostico-depto",
      name: "Reportes Diagnostico",
      icon: "tim-icons  icon-book-bookmark",
      component: <ReportesDiagnosticoDepto />,
      layout: "/estadistica-departamental",
    },

  {
    path: "/viviendas",
    name: "Viviendas",
    icon: "tim-icons icon-bank",
    component: <Casas />,
    layout: "/estadistica-departamental",
  },

  {
    path: "/georef",
    name: "Georeferenciaciones",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/estadistica-departamental",
  },



];
export default routes;
