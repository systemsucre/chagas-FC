import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./publicRoute";
import { useEffect, useState } from "react";

import useAuth from "../Auth/useAuth";
import { TIEMPO_INACTIVO, LOCAL_URL } from "../Auth/config";
import Check from "./check";

import E500 from "./e500";


import AdminLayout from "layouts/Admin/Admin.js";
import Encargado from "layouts/Encargado/Encargado";
import Estadistica from "layouts/estadistica/Estadistica";
import Tecnico from "layouts/tecnico/Tecnico";
import Evaluacion from "layouts/Evaluacion/Evaluacion";
import PublicNavbar from "layouts/public/public";
import Login from "views/session/sing-in";
import MSDK from "views/maps/m-sdk";
import RecepcionUBE from "layouts/UBE/recepcionUBE";
import Tratamiento from "layouts/tratamiento/tratamiento";
import Laboratorio from "layouts/laboratorio/laboratorio";
import IEC from "layouts/IEC/iec";

// reportes tratamiento departamento 
import ReportesTratamientoDepto from "layouts/reportesTramiento/reportesTratamiento";





export default function AppRouter() {
  const auth = useAuth();

  useEffect(() => {
    async function check() {
      if (localStorage.getItem("token") != null) {
        const inter = setInterval(() => {
          const tiempo1 = localStorage.getItem("tiempo");
          if (!tiempo1 || localStorage.getItem("token") == null) {
            auth.logout();
          } // sino existe el cookie redireccionamos a la ventana login
          const tiempo2 = new Date().getMinutes();
          let dif = 0;
          let aux1 = 0;
          let aux2 = 0;
          const maximo = 59;
          const inicio = 0;
          if (tiempo1 === tiempo2) {
            dif = 0;
          }
          if (tiempo2 > tiempo1) {
            dif = tiempo2 - tiempo1;
          }
          if (tiempo1 > tiempo2) {
            aux1 = maximo - tiempo1; //  59 - 50 = 10
            aux2 = tiempo2 - inicio; //  5 - 0  = 5
            dif = aux2 - aux1;
          }
          if (dif >= TIEMPO_INACTIVO) {
            // el tiempo de abandono tolerado, se define en el archivo varEntorno en unidades de tiempo MINUTOS
            auth.logout();
          }
        }, 10000);
        return inter;
      }
    }
    check()
  }, [auth]);


  const [backgroundColor, setBackgroundColor] = useState('#E8F5E9');

  useEffect(() => {
    const colors = [
      '#E8F5E9', // Verde suave
      '#E3F2FD', // Azul suave  
      '#F3E5F5', // Morado suave
      '#FFF3E0', // Naranja suave
      '#E1F5FE'  // Celeste suave
    ];

    let colorIndex = 0;
    colorIndex = (colorIndex + 1) % colors.length;
    setBackgroundColor(colors[colorIndex]);

  }, []);


  const [footerPosition, setFooterPosition] = useState(-100);

  useEffect(() => {
    const animateFooter = () => {
      setFooterPosition(0);
    };

    // Animar el footer después de 500ms
    setTimeout(animateFooter, 500);

    return () => {
      setFooterPosition(-100);
    };
  }, []);
  const [navbarPosition, setNavbarPosition] = useState(-100);



  const [welcomeMessage, setWelcomeMessage] = useState('');

  // useEffect(() => {
  //   const messages = [
  //     "¡Bienvenido de nuevo!",
  //     "¡Que tengas un excelente día!",
  //     "¡Es un gusto verte otra vez!",
  //     "¡Comencemos un gran día!",
  //     "¡Gracias por estar aquí!",
  //     "¡Esperamos que logres tus objetivos hoy!"
  //   ];

  //   const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  //   setWelcomeMessage(randomMessage);

  //   const toast = document.createElement('div');
  //   toast.style.cssText = `
  //     position: fixed;
  //     width: ${window.innerWidth < 768 ? '80%' : 'auto'};
  //     top: 5px;
  //     left: 50%;
  //     transform: translateX(-50%);
  //     background-color: rgba(255,255,255,1);
  //     padding: 15px 30px;
  //     border-radius: 8px;
  //     box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  //     font-size: 16px;
  //     color: #4E5AFE;
  //     text-align: center;
  //     z-index: 9999;
  //     animation: fadeInOut 3s forwards;
  //   `;
  //   toast.textContent = randomMessage;

  //   // Agregar estilos para la imagen
  //   const img = document.createElement('img');
  //   img.src = logo; // Usando el logo existente del proyecto
  //   if (window.innerWidth < 768) {
  //     img.style.cssText = `
  //        width: 20px;
  //       height: 40px;
  //       margin-right: 10px;
  //       vertical-align: middle;
  //   `;
  //   } else {
  //     img.style.cssText = `
  //       width: 20px;
  //       height: 40px;
  //       margin-right: 10px;
  //       vertical-align: middle;
  // `;
  //   }
  //   toast.insertBefore(img, toast.firstChild);
  //   document.body.appendChild(toast);

  //   setTimeout(() => {
  //     document.body.removeChild(toast);
  //   }, 3000);

  // }, []);


  useEffect(() => {
    const animateNavbar = () => {
      setNavbarPosition(0);
    };

    setTimeout(animateNavbar, 500);
    return () => {
      setNavbarPosition(-100);
    };
  }, []);




  useEffect(() => {
    const navbars = document.querySelectorAll('.navbar');
    navbars.forEach(navbar => {
      navbar.style.transform = `translateX(${navbarPosition}%)`;
      navbar.style.transition = 'transform 1s ease';
    });
  }, [navbarPosition]);

  // Aplicar la animación al footer
  useEffect(() => {
    if (document.querySelector('.footer')) {
      document.querySelector('.footer').style.transform = `translateY(${footerPosition}%)`;
      document.querySelector('.footer').style.transition = 'transform 1s ease';
    }
  }, [footerPosition]);

  // Aplicar el color de fondo al contenedor principal
  useEffect(() => {
    document.querySelector('body').style.backgroundColor = backgroundColor;
    document.querySelector('body').style.transition = 'background-color 2s ease';

    if (document.querySelector('.content')) {
      document.querySelector('.content').style.backgroundColor = backgroundColor;
      document.querySelector('.content').style.transition = 'background-color 2s ease';
    }

    if (document.querySelector('.footer')) {
      document.querySelector('.footer').style.backgroundColor = backgroundColor;
      document.querySelector('.footer').style.transition = 'background-color 2s ease';
    }

    if (document.querySelector('.modal-body')) {
      document.querySelector('.modal-body').style.backgroundColor = backgroundColor;
      document.querySelector('.modal-body').style.transition = 'background-color 2s ease';
    }
  }, [backgroundColor]);
  useEffect(() => {
    return () => { };
  }, []);


  const handleKeyPress = () => {
    localStorage.setItem("tiempo", new Date().getMinutes());
  };

  const handleClick = () => {
    localStorage.setItem("tiempo", new Date().getMinutes());
  };




  const ruta1 = createBrowserRouter(
    [
      {
        path: LOCAL_URL + '/*',
        element: <PublicRoute component={PublicNavbar} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/login",
        // element: <JwtLogin />,
        element: <PublicRoute component={Login} />,
        errorElement: <E500 />,
      },
      {
        path: LOCAL_URL + "/admin/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/estadistica-departamental/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/ee-2-jefe-municipal/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/recepcion-ube/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/tecnico/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
          },
          {
              path: LOCAL_URL + "/evaluacion/georef",
              element: <Check component={MSDK} />,
              errorElement: <E500 />,
          },
      {
        path: LOCAL_URL + "/tratamiento/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/reportes-tratamiento-depto/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/laboratorio-diagnostico/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },



      {
        path: LOCAL_URL + "/iec/georef",
        element: <Check component={MSDK} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/admin/*",
        element: <Check component={AdminLayout} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/tecnico/*",
        element: <Check component={Tecnico} />,
        errorElement: <E500 />,
          },
          {
              path: LOCAL_URL + "/evaluacion/*",
              element: <Check component={Evaluacion}></Check>,
              errorElement: <E500 />
          },
      {
        path: LOCAL_URL + "/ee-2-jefe-municipal/*",
        element: <Check component={Encargado} />,
        errorElement: <E500 />,
      },
      {
        path: LOCAL_URL + "/estadistica-departamental/*",
        element: <Check component={Estadistica} />,
        errorElement: <E500 />,
      },


      {
        path: LOCAL_URL + "/recepcion-ube/*",
        element: <Check component={RecepcionUBE} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/tratamiento/*",
        element: <Check component={Tratamiento} />,
        errorElement: <E500 />,
      },

      {
        path: LOCAL_URL + "/reportes-tratamiento-depto/*",
        element: <Check component={ReportesTratamientoDepto} />,
        errorElement: <E500 />,
      },


      {
        path: LOCAL_URL + "/laboratorio-diagnostico/*",
        element: <Check component={Laboratorio} />,
        errorElement: <E500 />,
      },

   


      {
        path: LOCAL_URL + "/iec/*",
        element: <Check component={IEC} />,
        errorElement: <E500 />,
      },


    ]
  )

  return (
    <div onClick={handleClick} onKeyPress={handleKeyPress} >
      <RouterProvider router={ruta1} />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            padding: '20px 30px',
            background: "#fff",
            // fontWeight:'bold',
            color: "#4E5AFE",
            fontSize: "14px",
          },
        }} />
    </div>
  );
}
