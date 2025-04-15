import React, { useRef, useEffect, useState } from 'react';

import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavLink,
} from 'reactstrap';
import * as maptilersdk from '@maptiler/sdk';
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { LOCAL_URL } from 'Auth/config';
import { URL } from 'Auth/config';
import { start } from 'service';
import toast from 'react-hot-toast';
// import './map.css';

export default function MSDK() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tokyo = { lng: -64.132544, lat: -20.218045, };
    const zoom = 6;
    const [mapController, setMapController] = useState();
    const [tipoDato, setTipoDato] = useState(localStorage.getItem('tipoDato') ? localStorage.getItem('tipoDato') : 1);

    const type = [{ id: 1, label: 'STREETS' }, { id: 2, label: 'VOYAGER' }, { id: 3, label: 'SATELLITE' }, { id: 4, label: 'OCEAN' }, { id: 5, label: 'BASIC' },]

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);


    maptilersdk.config.apiKey = 'KEglBNfzESBPXqrEfLxy';

    useEffect(async () => {
        try {

            if (map.current) return; // stops map from intializing more than once
            map.current = new maptilersdk.Map({
                container: mapContainer.current,
                // style: maptilersdk.MapStyle.VOYAGER,

                style:
                    localStorage.getItem('tipo_mapa') == 1 ? maptilersdk.MapStyle.STREETS :
                        localStorage.getItem('tipo_mapa') == 2 ? maptilersdk.MapStyle.VOYAGER :
                            localStorage.getItem('tipo_mapa') == 3 ? maptilersdk.MapStyle.SATELLITE :
                                localStorage.getItem('tipo_mapa') == 4 ? maptilersdk.MapStyle.OCEAN :
                                    maptilersdk.MapStyle.BASIC,

                center: [tokyo.lng, tokyo.lat],
                zoom: zoom,

            });

            if (tipoDato == 1) { // situacion entomologica
                await start(URL + '/casa/listar-coordenadas').then(data => {

                    data.map(e => {
                        if (typeof e.latitud !== 'undefined' && typeof e.longitud !== 'undefined') {
                            if (e.latitud.match(/((\d+)+(\.\d+))$/) && e.longitud.match(/((\d+)+(\.\d+))$/)) {
                                new maptilersdk.Marker({

                                    color: null,
                                    // draggable: true,
                                    // className: e == 1 ? 'marcador-grave' : e == 2 ?
                                    //     'marcador-leve' : 'marcador-moderado',

                                    className: e.ejemplares > 0 ? 'marcador-grave' : null,
                                    pitchAlignment: 'viewport'

                                })
                                    .setLngLat([e.longitud, e.latitud])
                                    // .setLngLat([e.latitud, e.longitud])
                                    // .setLngLat([e.longitud, e.la])
                                    // .setLngLat([-65.28005757450093,-19.01009821305282 ])

                                    .addTo(map.current)
                                    .setPopup(new maptilersdk.Popup().setHTML(e.comunidad + ' (' + e.jefefamilia + ', cv:' + e.cv + '), Ejemplares: ' + e.ejemplares))
                            }
                        }
                    })
                })
            }


            if (tipoDato == 2) { // mapa de riesgos
                await start(URL + '/casa/listar-coordenadas').then(data => {

                    data.map(e => {
                        if (typeof e.latitud !== 'undefined' && typeof e.longitud !== 'undefined') {
                            if (e.latitud.match(/((\d+)+(\.\d+))$/) && e.longitud.match(/((\d+)+(\.\d+))$/)) {
                                new maptilersdk.Marker({

                                    color: null,
                                    // draggable: true,
                                    // className: e == 1 ? 'marcador-grave' : e == 2 ?
                                    //     'marcador-leve' : 'marcador-moderado',

                                    // className: e.riesgo == 0 || e.riesgo == 1 || e.riesgo == 2 ? 'marcador-bajo' : e.riesgo == 3 || e.riesgo == 4 ? 'marcador-mediano' : e.riesgo == 5 || e.riesgo == 6 ? 'marcador-grave' : null,
                                    className: e.riesgo == 0? 'vivienda-existente' : e.riesgo == 1 || e.riesgo == 2 ? 'marcador-bajo' : e.riesgo == 3 || e.riesgo == 4 ? 'marcador-mediano' : e.riesgo == 5 || e.riesgo == 6 ? 'marcador-grave' : null,
                                    pitchAlignment: 'viewport'

                                })
                                    .setLngLat([e.longitud, e.latitud])
                                    // .setLngLat([e.latitud, e.longitud])
                                    // .setLngLat([e.longitud, e.la])
                                    // .setLngLat([-65.28005757450093,-19.01009821305282 ])

                                    .addTo(map.current)
                                    .setPopup(new maptilersdk.Popup().setHTML(e.comunidad + ' (' + e.jefefamilia + ', cv:' + e.cv + ')'))
                            }
                        }
                    })
                })
            }


            setMapController(createMapLibreGlMapController(map.current, maptilersdk));
        } catch (error) {
            toast.error(error.message)
        }

    }, [tokyo.lng, tokyo.lat, zoom,]);





    return (
        <div  >
            <Nav tabs className='bg-info'>
                <NavItem>
                    <NavLink href={LOCAL_URL} >
                        Salir de mapa
                    </NavLink>
                </NavItem>
                <Dropdown nav isOpen={dropdownOpen2} toggle={toggle2}>
                    <DropdownToggle nav caret  >
                        Mapa de casos
                    </DropdownToggle>
                    <DropdownMenu>
                        {[{ id: 1, label: 'Mapa de situacion epidemica' }, { id: 2, label: 'Mapa de riesgo' }].map((e, i) => (
                            <DropdownItem key={i} onClick={() => { localStorage.setItem('tipoDato', e.id); window.location.reload() }}>{e.label}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle nav caret  >
                        Estilo de mapa
                    </DropdownToggle>
                    <DropdownMenu>
                        {type.map((e, i) => (
                            <DropdownItem key={i} onClick={() => { localStorage.setItem('tipo_mapa', e.id); window.location.reload() }}>{e.label}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

            </Nav>
            <p style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'red', textAlign: 'center' }}>{tipoDato == 1 ? 'Situacion entomológica' : 'Mapa de riesgo entomológico'}</p>
            <div style={{ height: '90vh', width: '100%' }}>
                <div className="map-wrap">
                    <div className="geocoding">
                        {mapController &&
                            <GeocodingControl
                                apiKey={maptilersdk.config.apiKey}
                                mapController={mapController}
                                placeholder='Buscar...'
                                position='top-right'
                            />
                        }
                    </div>
                    <div ref={mapContainer} className="map" />
                </div>
            </div>
        </div>
    );
}