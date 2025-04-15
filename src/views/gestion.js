import React from 'react';
import { Card, Row, CardHeader, CardBody, } from 'reactstrap';



import { useState, useEffect } from "react";

import { API_ENDPOINTS } from './api';
import { start } from 'service';
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';
import { defaultDB } from 'service';


function Gestion() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        document.title = 'GESTION'
        listar()
        return () => { }
    }, [])




    const listar = async () => {
        const json = await start(API_ENDPOINTS.GESTION.LISTAR)
        if (json?.length > 0) setLista(json)
    }


    const activar = async (id, gestion) => {

        if (window.confirm(`Habilitar esta gestion ${gestion}? `)) {
            await defaultDB(API_ENDPOINTS.GESTION.ACTIVAR, { id }, 'Activando gestion, Espere por favor...')
            listar()
        }
    }

    const desactivar = async (id, gestion) => {
        if (window.confirm(`deshabilitar esta gestion ${gestion}? `)) {

           await defaultDB(API_ENDPOINTS.GESTION.DESACTIVAR, { id }, 'Activando gestion, Espere por favor...')
            listar()

        }
    }


    return (
        <div className="content" >
            <Row className="main-container">
                <Card>

                    <CardHeader>
                        <BackgroundColorContext.Consumer>
                            {({ color }) => (
                                <div className="tbl-header" data={color}>
                                    <div >
                                        GESTION
                                    </div>

                                </div>
                            )}
                        </BackgroundColorContext.Consumer>
                    </CardHeader>
                    <CardBody>
                        <table className="table table-sm">
                            <thead>
                                <tr >
                                    <th className="col-10 ">GESTION</th>

                                    <th>ACCION</th>

                                </tr>
                            </thead>
                            <tbody >
                                {lista.map((a) => (
                                    <tr className='item' key={a.id} >

                                        <td >
                                            <div className="tbl-name tbl-bold">{'GESTION ' + a.gestion}</div>
                                        </td>
                                        <td>
                                            {a.estado === 1 ?

                                                <div className="tbl-edit" style={{ cursor: 'pointer' }}
                                                    onClick={() => desactivar(a.id, a.gestion)}
                                                >click para deshabilitar </div> : <div className="tbl-delete" style={{ cursor: 'pointer' }} onClick={() => activar(a.id, a.gestion)}>click para habilitar </div>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </CardBody>

                </Card>
            </Row >

        </div >

    );


}
export default Gestion;
