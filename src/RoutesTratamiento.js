



import Check from "rutas/check";
import Paciente from "views/diagnostico/paciente.js";
import Tratamiento from "views/diagnostico/tratamiento/tratamiento.js";
import Consultas from "views/diagnostico/tratamiento/consultas.js";
import Diagnostico from "views/diagnostico/tratamiento/diagnostico.js";
import MSDK from "views/maps/m-sdk";
import Icons from "views/Icons";
import { redirect } from "react-router-dom";

var RoutesUBE = [

  {
    path: "/pacientes",
    name: "PACIENTES",
    icon: " tim-icons  icon-single-02",
    component: <Paciente />,
    layout: "/tratamiento",
  },

  {
    path: "/diagnostico/:id_paciente",
    name: "DIAGNOSTICO",
    icon: " tim-icons  icon-single-02",
    component: <Diagnostico />,
    layout: "/tratamiento",
    redirect
  },
  {
    path: "/tratamiento/:paciente",
    name: "TRATAMIENTOS",
    icon: " tim-icons  icon-single-02",
    component: <Tratamiento />,
    layout: "/tratamiento",
    redirect
  },

  {
    path: "/consultas/:paciente/:id_tratamiento",
    name: "CONSULTAS",
    icon: " tim-icons  icon-single-02",
    component: <Consultas />,
    layout: "/tratamiento",
    redirect
  },

  {
    path: "/georef",
    name: "Georeferenciaciones UBE",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/tratamiento",
  },

  // {
  //   path: "/icons",
  //   name: "icons",
  //   icon: "tim-icons icon-pin",
  //   component: <Icons />,
  //   layout: "/tratamiento",
  // },



];
export default RoutesUBE;
