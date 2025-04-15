
import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from './reportWebVitals';
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import AppRouter from "rutas/AppRouter";
import AuthProvider from "Auth/authProvider";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

document.addEventListener('touchstart', ()=>{console.log('touchstart')}, true);
document.addEventListener('touchstart', ()=>{console.log('touchstart')}, { capture: true });
document.addEventListener('touchstart', ()=>{console.log('touchstart')}, { passive: true });
var passiveEvent = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveEvent = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) { }

// in my case I need both passive and capture set to true, change as you need it.
passiveEvent = passiveEvent ? { capture: true, passive: true } : true;

//if you need to handle mouse wheel scroll
// var supportedWheelEvent: string = "onwheel" in HTMLDivElement.prototype ? "wheel" :
//     document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";

var supportedWheelEvent = "onwheel" in HTMLDivElement.prototype ? "wheel" :
  document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";

document.addEventListener("touchstart", ()=>{console.log('touchstart')}, passiveEvent);

root.render(
  <AuthProvider>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <AppRouter />
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
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
  </AuthProvider>
);
reportWebVitals();