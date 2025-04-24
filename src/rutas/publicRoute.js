import React from 'react';
import useAuth from "../Auth/useAuth"
import { LOCAL_URL } from "../Auth/config";



export default function PublicRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    let url = null
    if (parseInt(localStorage.getItem('numRol')) === 20) {
        // url = LOCAL_URL + "/estadistica-departamental/EE-2"
        url = "/estadistica-departamental/EE-2"
        localStorage.setItem('sidevar', 'green')
    }
    if (parseInt(localStorage.getItem('numRol')) === 6) {
        url =  "/laboratorio-diagnostico/laboratorio"
        localStorage.setItem('sidevar', 'green')
    }

    if (parseInt(localStorage.getItem('numRol')) === 5) {
        url = "/tratamiento/pacientes"
        localStorage.setItem('sidevar', 'green')
    }
    if (parseInt(localStorage.getItem('numRol')) === 7) {
        url = "/reportes-tratamiento-depto/main"
        localStorage.setItem('sidevar', 'green')
    }


    if (parseInt(localStorage.getItem('numRol')) === 4) {
        url =  "/recepcion-ube/formulario"
    }

    if (parseInt(localStorage.getItem('numRol')) === 3) {
        url = "/tecnico/home"
    }
    if (parseInt(localStorage.getItem('numRol')) === 2) {
        url = "/ee-2-jefe-municipal/EE-2"
    }
    if (parseInt(localStorage.getItem('numRol')) === 1) {
        url = "/admin/hospitales"
    }

    if (parseInt(localStorage.getItem('numRol')) === 30) {
        url = "/iec/img"
    }
    if (parseInt(localStorage.getItem('numRol')) === 40) {
        url = "/evaluacion/home"
    }
    // console.log(url)
    return (
        auth.isLogged() ? (
            window.location.href = url?url:'/'
        ) : (
            <Component />  
        )
    );
} 