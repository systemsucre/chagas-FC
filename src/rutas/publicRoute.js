import React from 'react';
import useAuth from "../Auth/useAuth"
import { LOCAL_URL } from "../Auth/config";



export default function PublicRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    let url = null
    if (parseInt(localStorage.getItem('numRol')) === 20) {
        url = LOCAL_URL + "/estadistica-departamental/EE-2"
        localStorage.setItem('sidevar', 'green')
    }
    if (parseInt(localStorage.getItem('numRol')) === 6) {
        url = LOCAL_URL + "/laboratorio-diagnostico/laboratorio"
        localStorage.setItem('sidevar', 'green')
    }

    if (parseInt(localStorage.getItem('numRol')) === 5) {
        url = LOCAL_URL + "/tratamiento/pacientes"
        localStorage.setItem('sidevar', 'green')
    }
    if (parseInt(localStorage.getItem('numRol')) === 7) {
        url = LOCAL_URL + "/reportes-tratamiento-depto/main"
        localStorage.setItem('sidevar', 'green')
    }


    if (parseInt(localStorage.getItem('numRol')) === 4) {
        url = LOCAL_URL + "/recepcion-ube/formulario"
    }

    if (parseInt(localStorage.getItem('numRol')) === 3) {
        url = LOCAL_URL + "/tecnico/home"
    }
    if (parseInt(localStorage.getItem('numRol')) === 2) {
        url = LOCAL_URL + "/ee-2-jefe-municipal/EE-2"
    }
    if (parseInt(localStorage.getItem('numRol')) === 1) {
        url = LOCAL_URL + "/admin/hospitales"
    }

    if (parseInt(localStorage.getItem('numRol')) === 30) {
        url = LOCAL_URL + "/iec/img"
    }
    if (parseInt(localStorage.getItem('numRol')) === 40) {
        url = LOCAL_URL + "/evaluacion/home"
    }
    // console.log(url)
    return (
        auth.isLogged() ? (
            window.location.href = url?url:LOCAL_URL
        ) : (
            <Component />  
        )
    );
} 