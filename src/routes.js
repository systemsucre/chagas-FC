

import Hospital from "views/hospital"
import Comunidad from "views/comunidad";
import Usuario from "views/usuarios";
import Casas from "views/casa";
import Gestion from "views/gestion";
import Mes from "views/mes";
import MSDK from "views/maps/m-sdk";
import Dashboard from "views/Dashboard";

var routes = [

  {
    path: "/home",
    name: "INICIO",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },

  {
    path: "/hospitales",
    name: "CENTROS DE SALUD",
    icon: "tim-icons icon-heart-2",
    component: <Hospital />,
    layout: "/admin",
  },

  {
    path: "/comunidad",
    name: "Comunidades",
    icon: "tim-icons icon-heart-2",
    component: <Comunidad />,
    layout: "/admin",
  },

  {
    path: "/usuarios",
    name: "Usuarios",
    icon: "tim-icons  icon-single-02",
    component: <Usuario />,
    layout: "/admin",
  },


  {
    path: "/viviendas",
    name: "Viviendas",
    icon: "tim-icons icon-bell-55",
    component: <Casas />,
    layout: "/admin",
  },

  {
    path: "/gestion",
    name: "Gestion",
    icon: "tim-icons icon-bell-55",
    component: <Gestion />,
    layout: "/admin",
  },

  
  {
    path: "/meses",
    name: "MESES",
    icon: "tim-icons icon-calendar-60",
    component: <Mes />,
    layout: "/admin",
  },

  {
    path: "/georef",
    name: "Georeferenciaciones",
    icon: "tim-icons icon-pin",
    // component: <Map />,
    componet: <MSDK />,
    layout: "/admin",
  },

];
export default routes;
