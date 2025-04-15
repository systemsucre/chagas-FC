
import useAuth from "../Auth/useAuth"
import React from 'react';
import { LOCAL_URL } from "../Auth/config";


export default function Check({ component: Component, ...rest }) {
    const auth = useAuth();

    // console.log('hola que tal')

    return (
        auth.isLogged() ? <Component /> : window.location.href = LOCAL_URL + "/"
    )

}
