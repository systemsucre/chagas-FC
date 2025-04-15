import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row, Card, CardBody, Table, Button } from 'reactstrap';




import { InputUsuarioStandar, Select1, } from 'components/input/elementos';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { useState, useEffect } from "react";

import { API_ENDPOINTS } from './api';
import { editDB } from 'service';
import { INPUT } from 'Auth/config';
import { start } from 'service';



function Mes() {

    const [lista, setLista] = useState([]);
    const [listaGestion, setListaGestion] = useState([]);
    const [listaEstado, setListaEstado] = useState([{ id: 1, label: 'OPORTUNO' }, { id: 2, label: 'RETRASO' }, { id: 3, label: 'FUERA DE PLAZO' }]);
    const [estadom, setestadom] = useState({ campo: null, valido: null });
    const [fin, setFin] = useState({ campo: null, valido: null });
    const [finH, setFinH] = useState({ campo: null, valido: null });
    const [ini, setIni] = useState({ campo: null, valido: null });
    const [iniH, setIniH] = useState({ campo: null, valido: null });
    const [id, setId] = useState({ campo: null, valido: null })
    const [gestion, setGestion] = useState({ campo: null, valido: null })
    const [cantidad, setCantidad] = useState(0);
    const [año, setAño] = useState(0);
    const [mes, setMes] = useState(0);
    const [modalEditar, setModalEditar] = useState(false);


    let today = new Date()
    let fecha_ = today.toLocaleDateString()
    let dia = fecha_.split('/')[0]
    if (dia.length === 1) dia = '0' + dia
    let mes_ = fecha_.split('/')[1]
    if (mes_.length === 1) mes_ = '0' + mes_
    let año_ = fecha_.split('/')[2]
    let fecha = año_ + '-' + mes_ + '-' + dia



    useEffect(() => {
        document.title = 'MESES'
        if (lista.length === 0) {
            listarInicio()
            listarGestion()
        } else listar()
    }, [])



    const listarInicio = async () => {
        setListaGestion([{ id: 1, nombre: fecha.split('-')[0] }])
        setAño(fecha.split('-')[0])

        setGestion({ campo: 1, valido: null })

        const data = await start(API_ENDPOINTS.MES.LISTARINICIO)
        console.log(data, ' meses')
        if (data.length > 0) setLista(data)
    }

    const listarGestion = async () => {
        const data = await start(API_ENDPOINTS.MES.LISTARGESTION)
        if (data.length > 0) setListaGestion(data)
    }

    const listar = async (id) => {

        if (id) {
            listaGestion.forEach(e => {
                if (id == e.id)
                    setAño(e.label)
            })

            const data = await start(API_ENDPOINTS.MES.LISTAR, { id }, 'Espere por favor, obteniendo informacion ...')
            setLista(data)
        }

    }

    const actualizar = async (a) => {
        if (estadom.valido === 'true' && id.valido === 'true' && ini.valido === 'true' && iniH.valido === 'true'
            && fin.valido === 'true' && finH.valido === 'true') {
            let accion = window.confirm('Actualizar accesos ?')
            if (accion) {
                await editDB(API_ENDPOINTS.MES.ACTUALIZAR, {
                    id: id.campo,
                    f1: ini.campo,
                    h1: iniH.campo,
                    f2: fin.campo,
                    h2: finH.campo,
                    estado: estadom.campo,
                }, setModalEditar)
                listarInicio()
            }
        }

    }


    const rellenar = (f) => {
        setMes(f.mes.split(' ')[0])
        setId({ campo: f.id, valido: 'true' })
        let i = f.ini.split(' ')[0]
        let ih = f.ini.split(' ')[1]

        let fn = f.fin.split(' ')[0]
        let fnh = f.fin.split(' ')[1]

        setIni({ campo: i, valido: "true" })
        setestadom({ campo: f.estado, valido: "true" })
        setIniH({ campo: ih, valido: "true" })

        setFin({ campo: fn, valido: "true" })
        setFinH({ campo: fnh, valido: "true" })
        setModalEditar(true)
    }

    return (
        <div className="content" >
            <Row className="main-container">
                <Card>
                    <h2 className='text-center text-bold'>{' GESTION : ' + año} </h2>

                    <CardBody>
                        <Col md='5'>
                            <Select1
                                estado={gestion}
                                cambiarEstado={setGestion}
                                ExpresionRegular={INPUT.ID}
                                name={'select_1'}
                                lista={listaGestion}
                                etiqueta={'Gestion'}
                                funcion={listar}
                                msg='Seleccione una opcion'
                            />
                        </Col>
                        <Table className="tablesorter" responsive>
                            <thead>
                                <tr >

                                    <th >MES</th>
                                    <th >INICIAL</th>
                                    <th >FINAL</th>
                                    <th> ESTADO</th>
                                    <th> ACCION</th>

                                </tr>
                            </thead>
                            <tbody >
                                {lista.map((a) => (
                                    <tr className='item' key={a.id} >


                                        <td ><div className="tbl-name tbl-bold">{a.mes}</div></td>
                                        <td  ><div className="tbl-name tbl-bold">{a.ini}</div></td>
                                        <td  ><div className="tbl-name tbl-bold">{a.fin}</div></td>
                                        {a.estado == 1 && <td  ><div className="tbl-name tbl-bold tbl-edit" >OPORTUNO</div></td>}
                                        {a.estado == 2 && <td  ><div className="tbl-name tbl-bold " style={{color:'orange'}}>RETRASO</div></td>}
                                        {a.estado == 3 && <td  ><div className="tbl-name tbl-bold tbl-delete" >FUERA DE PLAZO</div></td>}
                                        <th >
                                            <div className="tbl-edit" onClick={() => rellenar(a)} style={{ cursor: 'pointer' }}>Modificar Fechas</div>
                                        </th>

                                    </tr>
                                ))}
                            </tbody>

                        </Table>

                    </CardBody>

                </Card>
            </Row>

            <Modal isOpen={modalEditar} className="modal-md">

                <ModalHeader toggle={() => {
                    setModalEditar(false)
                }}>  {mes + ' (GESTIÓN  ' + año + ')'}</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6'>
                            <InputUsuarioStandar
                                estado={ini}
                                tipo='date'
                                name ='f1'

                                cambiarEstado={setIni}
                                ExpresionRegular={INPUT.FECHA}  //expresion regular  
                                etiqueta='Fecha inicial'
                                msg={'Este campo acepta letras, numero y algunos caracteres'}
                            />
                        </div>
                        <div className='col-6'>
                            <InputUsuarioStandar
                                estado={iniH}
                                name ='h1'

                                tipo='time'
                                cambiarEstado={setIniH}
                                ExpresionRegular={INPUT.HORA}  //expresion regular  
                                etiqueta='hora Inicial'
                                msg={'Este campo acepta letras, numero y algunos caracteres'}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <InputUsuarioStandar
                                estado={fin}
                                name ='f2'

                                tipo='date'
                                cambiarEstado={setFin}
                                ExpresionRegular={INPUT.FECHA}  //expresion regular  
                                etiqueta='Fecha Fin'
                                msg={'Este campo acepta letras, numero y algunos caracteres'}
                            />
                        </div>
                        <div className='col-6'>
                            <InputUsuarioStandar
                                estado={finH}
                                name ='h2'
                                tipo='time'
                                cambiarEstado={setFinH}
                                ExpresionRegular={INPUT.HORA}  //expresion regular  
                                etiqueta='Hora Final'
                                msg={'Este campo acepta letras, numero y algunos caracteres'}
                            />
                        </div>

                        <Select1
                            estado={estadom}
                            cambiarEstado={setestadom}
                            ExpresionRegular={INPUT.ID}
                            lista={listaEstado}
                            etiqueta={'Estado'}
                            msg='Seleccione una opcion'
                            name={'estado'}
                        />
                    </div>
                </ModalBody>
                <div className="boton-modal">
                    <Button color="success" onClick={() => actualizar()}>
                        Actualizar
                    </Button>
                </div>

            </Modal >
        </div >

    );


}
export default Mes;
