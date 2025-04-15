



import Check from "rutas/check";
import IEC from "views/IEC/iec";
import IEC_FOLLETOS from "views/IEC/folletos";
import MSDK from "views/maps/m-sdk";
import IEC_VIDEOS from "views/IEC/videos";

var routes = [

  {
    path: "/img",
    name: "IEC - IMAGENES",
    icon: "tim-icons icon-camera-18",
    component: <IEC />,
    layout: "/iec",
  },

  
  {
    path: "/folletos",
    name: "IEC - FOLLETOS",
    icon: " tim-icons  icon-book-bookmark", 
    component: <IEC_FOLLETOS />,
    layout: "/iec",
  },

    
  {
    path: "/videos",
    name: "IEC - VIDEOS",
    icon: " tim-icons  icon-video-66", 
    component: <IEC_VIDEOS />,
    layout: "/iec",
  },

 

 
  {
    path: "/georef",
    name: "Georeferenciaciones",
    icon: "tim-icons icon-pin",
    componet: <Check component={MSDK} />,
    layout: "/iec",
  },


]; 
export default routes;
