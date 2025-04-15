import React from 'react';
import { Card, CardHeader, Modal, ModalBody, ModalHeader, Row, Col, Table, CardBody } from 'reactstrap';
import { Await, Link } from 'react-router-dom';
import md5 from 'md5'
import axios from 'axios';
import { toast } from 'react-hot-toast'



import useAuth from "../Auth/useAuth"
import { InputUsuarioStandar, ComponenteInputBuscar_, Select1, InputUsuarioLogin } from "components/input/elementos";  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { useState, useEffect } from "react";
import { INPUT } from 'Auth/config';

import { start, buscarDB } from 'service';
import { API_ENDPOINTS } from './api';
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';
import { Select1Easy } from 'components/input/elementos';
import { saveDB } from 'service';
import { editDB } from 'service';
import { eliminarDB } from 'service';

function Usuario() {
    const auth = useAuth()

    const [lista, setLista] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [listaComunidad, setListaComunidad] = useState([]);
    const [cantidad, setCantidad] = useState(0);

    const [listaRol, setListaRol] = useState([]);
    const [listaHospital, setListaHospital] = useState([]);
    const [listaMunicipio, setListaMunicipio] = useState([]);


    const [id, setId] = useState({ campo: null, valido: null })
    const [rol, setRol] = useState({ campo: null, valido: null });
    const [username, setUsername] = useState({ campo: null, valido: null });
    const [pass, setPass] = useState({ campo: null, valido: null });
    const [pass1, setPass1] = useState({ campo: null, valido: null });
    const [nombre, setNombre] = useState({ campo: null, valido: null });
    const [ap1, setAp1] = useState({ campo: null, valido: null });
    const [ap2, setAp2] = useState({ campo: null, valido: null });
    const [comunidad, setComunidad] = useState({ campo: null, valido: null });

    const [correo, setCorreo] = useState({ campo: null, valido: null });
    const [direccion, setDireccion] = useState({ campo: null, valido: null });
    const [celular, setCelular] = useState({ campo: null, valido: null });
    const [hospital, setHospital] = useState({ campo: null, valido: null });
    const [municipio, setMunicipio] = useState({ campo: null, valido: null });

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    const [modalRecet, setModalRecet] = useState(false);


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })

    const [estado, setEstado] = useState(null)
    const [estadoEnvio, setEstadoEnvio] = useState(0);







    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )
    useEffect(() => {
        document.title = 'USUARIOS'
        if (inputBuscar.valido === null) listar()
        if (inputBuscar.valido === 'false') listar()

    }, [inputBuscar])

    const listar = async () => {
        // listarVariable()
        const json = await start(API_ENDPOINTS.USUARIOS.LISTAR)
        if (json?.length > 0) setLista(json)
    }

    const listarRolMunicipio = async () => {
        const json = await start(API_ENDPOINTS.USUARIOS.LISTAR_ROL_MUNICIPIO)
        if (json[0]?.length > 0) setListaRol(json[0])
        if (json[1]?.length > 0) setListaMunicipio(json[1])

    }


    const listarHospital = async (municipio) => {
        const json = await start(API_ENDPOINTS.USUARIOS.LISTAR_HOSPITAL, { municipio })
        setListaHospital(json)
        listarComunidad(municipio)
    }
    const listarComunidad = async (municipio) => {
        if (rol.campo == 40) {
            const json = await start(API_ENDPOINTS.USUARIOS.LISTAR_COMUNIDAD, { municipio })
            setListaComunidad(json)
        }
    }



    const vaciarDatos = async () => {
        setPass({ campo: null, valido: null })
        setPass1({ campo: null, valido: null })
        setId({ campo: null, valido: null })
        setRol({ campo: null, valido: null })
        setHospital({ campo: null, valido: null })
        setMunicipio({ campo: null, valido: null })
        setNombre({ campo: null, valido: null })
        setComunidad({ campo: null, valido: null })
        setCelular({ campo: null, valido: null })
        setCorreo({ campo: null, valido: null })
        setUsername({ campo: null, valido: null })
        setEstado(0)
        setModalEditar(false)
        setModalInsertar(false)
    }

    const insertar = async () => {
        if (estadoEnvio === 0) {
            if (pass.campo === pass1.campo) {

                setEstadoEnvio(1)
                await saveDB(API_ENDPOINTS.USUARIOS.REGISTRAR, {
                    'rol': rol.campo,
                    'municipio': municipio.campo,
                    'hospital': hospital.campo,
                    'comunidad': comunidad.campo,
                    "usuario": username.campo,
                    'contraseña': md5(pass.campo),
                    'nombre': nombre.campo,
                    'ap1': ap1.campo,
                    'ap2': ap2.campo,
                    'direccion': direccion.campo,
                    'celular': celular.campo,
                    'correo': correo.campo,
                }, setModalInsertar, setEstadoEnvio)
                listar()
            } else toast.error('las contraseñas no coinciden!, verifique e intente nuevamente')
        }
    }

    const recet_ = async () => {
        if (pass.valido === 'true' && pass1.valido === 'true') {
            if (pass.campo === pass1.campo) {
                setModalRecet(false)
                await editDB(API_ENDPOINTS.USUARIOS.RECETAR, {
                    'id': id.campo,
                    'otros': md5(pass.campo),
                }, setModalRecet)
            } else toast.error('las contraseñas no coinciden!, verifique e intente nuevamente')
        } else toast.error('Complete todos los campos con *, o verifique que todos los datos proporcionados sean los correctos')
    }

    const actualizar = async (e) => {

        await editDB(API_ENDPOINTS.USUARIOS.ACTUALIZAR, {
            'id': id.campo,
            'rol': rol.campo,
            'municipio': municipio.campo,
            'hospital': hospital.campo,

            'comunidad': comunidad.campo,
            'nombre': nombre.campo,
            'ap1': ap1.campo,
            'ap2': ap2.campo,
            'direccion': direccion.campo,
            'celular': celular.campo,
            'correo': correo.campo,
            'estado': estado.campo

        }, setModalEditar)
        listar()

    }
    const eliminar = async (id, nombre) => {
        let ok = window.confirm('Eliminar a: ' + nombre + ' ?')
        if (ok) {
            await eliminarDB(API_ENDPOINTS.USUARIOS.ELIMINAR, { id })
            listar()
        }
    };

    const buscar = async () => {
        const json = await buscarDB(API_ENDPOINTS.USUARIOS.BUSCAR, { dato: inputBuscar.campo })
        if (json.length < 1) toast.error('No se encontraron resultados')
        setLista(json)
    }


    return (
        <>
            <div className="content" >
                <Row className="main-container">
                    <Card>
                        <CardHeader>
                            <BackgroundColorContext.Consumer>
                                {({ color }) => (
                                    <div className="tbl-header" data={color}>

                                        <div className="row">
                                            <div className="col-8">
                                                USUARIOS
                                            </div>
                                            <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                                                <button className='btn-new' pb={3} onClick={() => { setModalInsertar(true); listarRolMunicipio() }} >
                                                    {'Registrar'}
                                                </button >
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </BackgroundColorContext.Consumer>
                        </CardHeader>
                        <CardBody>
                            <Col md='12 mt-3 ml-2'>
                                <ComponenteInputBuscar_
                                    estado={inputBuscar}
                                    cambiarEstado={setInputBuscar}
                                    name="inputBuscar"
                                    ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                    placeholder="Escriba para filtrar ..."
                                    eventoBoton={buscar}
                                    etiqueta={'Buscar'}
                                />
                            </Col>
                            {lista.length + ' Usuarios encontrados'}
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                    <tr >
                                        <th>USUARIO/ROL</th>
                                        <th>NOMBRE</th>
                                        <th >LUGAR</th>
                                        <th >ESTADO</th>
                                        <th >CELULAR/CORREO</th>
                                        <th >DIRECCION</th>
                                        <th >CREACION/EDITADO</th>
                                        <th >ELIMINAR</th>
                                        <th >EDITAR</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {lista.map((a, index) => (

                                        <tr key={index} style={{
                                            height: '50px', background: index % 2 == 0 ? "#E1EEF4" : 'white',
                                            color: index % 2 == 0 ? "#00496B" : 'white'
                                        }} className='item'>
                                            <td>
                                                <div className="tbl-name tbl-bold">{a.usuario}</div>
                                                <div className="tbl-des">{a.rol}</div>
                                            </td>
                                            <td>
                                                <div className="tbl-name tbl-bold">{a.nombre}</div>
                                                <div className="tbl-des">{a.ap1} {a.ap2}</div>
                                            </td>
                                            <td>
                                                {a.comunidad && <div className="tbl-name tbl-bold">{'Comunidad : ' + a.comunidad}</div>}
                                                {a.hospital && <div className="tbl-name tbl-bold">{'Estab. : ' + a.hospital}</div>}
                                                {a.municipio && <div className="tbl-des">{'Municipio : ' + a.municipio}</div>}
                                            </td>
                                            <td>{a.estado === 1 ? <div className="online">online</div> : <div className="delete">delete</div>}</td>
                                            <td>
                                                <div className="tbl-name tbl-bold">{a.celular}</div>
                                                <div className="tbl-des">{a.correo}</div>
                                            </td>
                                            <td>
                                                <div className="tbl-des">{a.direccion ? a.direccion : '-'}</div>
                                            </td>
                                            <td >
                                                <div className="tbl-name tbl-bold">{a.creating}</div>
                                                <div className="tbl-des">{a.editing}</div>
                                            </td>
                                            <td className='text-center'>
                                                <div className="tbl-delete"
                                                    onClick={() => {
                                                        eliminar(a.id, a.nombre)
                                                    }}
                                                >
                                                    Eliminar
                                                </div>
                                            </td>
                                            <td className='text-center'>

                                                <div className="tbl-edit"
                                                    onClick={ async() => {
                                                        listarRolMunicipio()
                                                        setId({ campo: a.id, valido: 'true' })
                                                        setNombre({ campo: a.nombre, valido: 'true' })
                                                        setAp1({ campo: a.ap1, valido: 'true' })
                                                        setAp2({ campo: a.ap2, valido: 'true' })
                                                        setUsername({ campo: a.usuario, valido: 'true' })
                                                        setRol({ campo: a.idrol, valido: 'true' })
                                                        setHospital({ campo: a.idhospital, valido: 'true' })
                                                        setMunicipio({ campo: a.idmunicipio, valido: 'true' })
                                                        const json = await start(API_ENDPOINTS.USUARIOS.LISTAR_COMUNIDAD, { municipio:a.idmunicipio })
                                                        setListaComunidad(json)
                                                        setComunidad({ campo: a.idcomunidad, valido: 'true' })
                                                        setCelular({ campo: a.celular, valido: 'true' })
                                                        setCorreo({ campo: a.correo, valido: 'true' })
                                                        setDireccion({ campo: a.direccion, valido: 'true' })
                                                        setEstado({ campo: a.estado == 1 ? 1 : 2, valido: 'true' })
                                                        setModalEditar(true)
                                                    }}
                                                >
                                                    Editar
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <div className="tbl-delete"
                                                    onClick={() => {
                                                        setId({ campo: a.id, valido: 'true' })
                                                        setModalRecet(true)
                                                    }}
                                                >
                                                    Cambiar contraseña
                                                </div>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Row >

            </div>

            <Modal isOpen={modalRecet}>

                <ModalHeader toggle={() => setModalRecet(false)}> Reiniciar Contraseña</ModalHeader>
                <ModalBody className='p-3'>
                    <InputUsuarioLogin
                        estado={pass}
                        cambiarEstado={setPass}
                        ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                        etiqueta='Contraseña'
                        name='otros'
                        msg={'Este campo acepta solo letras '}
                    />
                    <InputUsuarioLogin
                        estado={pass1}
                        cambiarEstado={setPass1}
                        ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                        etiqueta='Confirmar contraseña'
                        name='otros'
                        msg={'Este campo acepta todos los caracteres'}
                    />

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
                        <div className="hero-section mt-4 mt-0" >
                            <button onClick={() => recet_()} className="btn btn-info" style={{ background: '#4E5AFE' }} >Modificar</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalInsertar} className='modal-md'>

                <ModalHeader toggle={() => setModalInsertar(false)}> Nuevo Usuario</ModalHeader>
                <ModalBody className=''>

                    <div className='row'>
                        <Col md='3'>
                            <Select1Easy
                                estado={rol}
                                cambiarEstado={setRol}
                                ExpresionRegular={INPUT.ID}
                                lista={listaRol}
                                name={'rol'}
                                etiqueta={'Rol'}
                                msg='Seleccione una opcion'
                            />
                        </Col>
                        {(rol.campo != 1 && rol.campo != 20 && rol.campo != 30) ?
                            <Col md='3'>
                                <Select1Easy
                                    estado={municipio}
                                    cambiarEstado={setMunicipio}
                                    name={'municipio'}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaMunicipio}
                                    etiqueta={'Municipio'}
                                    msg='Seleccione una opcion'
                                    funcion={listarHospital}
                                    onchange={() => {
                                        setHospital({ campo: null, valido: null });
                                        setListaHospital([])
                                    }}
                                />
                            </Col> : null
                        }
                        {rol.campo == 40 ?
                            <Col md='3'>
                                <Select1Easy
                                    estado={comunidad}
                                    cambiarEstado={setComunidad}
                                    name={'comunidad'}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaComunidad}
                                    etiqueta={'Comunidad'}
                                    msg='Seleccione una opcion'
                                />
                            </Col> : null
                        }
                        {(rol.campo == 5 || rol.campo == 6) ?
                            <Col md='3'>
                                <Select1Easy
                                    estado={hospital}
                                    cambiarEstado={setHospital}
                                    name={'hospital'}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaHospital}
                                    etiqueta={'Hospital'}
                                    msg='Seleccione una opcion'
                                />
                            </Col> : null
                        }
                    </div>



                    <div className='row'>
                        <Col md='4'>
                            <InputUsuarioLogin
                                estado={username}
                                type='text'
                                cambiarEstado={setUsername}
                                ExpresionRegular={INPUT.INPUT_USUARIO}  //expresion regular  
                                etiqueta='Usuario'
                                name={'usuario'}
                                msg={'Este campo acepta solo letras minusculas'}
                            />
                        </Col>

                        <Col md='4'>
                            <InputUsuarioStandar
                                estado={pass}
                                cambiarEstado={setPass}
                                placeholder="CONTRASEÑA"
                                ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                                etiqueta='Contraseña'
                                name={'contraseña'}
                                msg={'Este campo acepta todos los caracteres'}
                                campoUsuario={true}
                            /></Col>
                        <Col md='4'>
                            <InputUsuarioStandar
                                estado={pass1}
                                cambiarEstado={setPass1}
                                placeholder="CONTRASEÑA"
                                name={'contraseña'}
                                ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                                etiqueta='Confirmar contraseña'
                                msg={'Este campo acepta todos los caracteres'}
                            /></Col>



                    </div>

                    <div className='row'>
                        <Col md='12'>
                            <InputUsuarioStandar
                                estado={nombre}
                                cambiarEstado={setNombre}
                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                                etiqueta='Nombre completo'
                                name='nombre'
                                msg={'Este campo acepta solo letras '}
                            />
                        </Col>

                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={ap1}
                                cambiarEstado={setAp1}
                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                                etiqueta='Primer Apellido'
                                name='ap1'
                                msg={'Este campo acepta solo letras '}
                            />
                        </Col>
                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={ap2}
                                cambiarEstado={setAp2}
                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                                etiqueta='Segundo Apellido'
                                name='ap2'
                                msg={'Este campo acepta solo letras '}
                                importante={false}

                            />
                        </Col>

                    </div>

                    <div className='row pb-3'>
                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={celular}
                                cambiarEstado={setCelular}
                                placeholder="CELULAR/TELEF."
                                ExpresionRegular={INPUT.TELEFONO}  //expresion regular  
                                etiqueta='Celular/Telf.'
                                name={'celular'}
                                msg={'Este campo acepta solo números '}
                                importante={false}
                            /></Col>
                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={correo}
                                cambiarEstado={setCorreo}
                                placeholder="CORREO"
                                ExpresionRegular={INPUT.CORREO}  //expresion regular  
                                etiqueta='Correo'
                                name={'correo'}
                                msg={'Este campo acepta en formato de correo'}
                                importante={false}
                            /></Col>
                        <Col md='12'>
                            <InputUsuarioStandar
                                estado={direccion}
                                cambiarEstado={setDireccion}
                                placeholder="DIRECCION"
                                ExpresionRegular={INPUT.DIRECCION}  //expresion regular  
                                etiqueta='Direccion'
                                name={'direccion'}
                                msg={'Este campo acepta letras, numeros y algunos caracteres'}
                                importante={false}
                            /></Col>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
                        <div className="hero-section m-1 mt-0" >
                            <button onClick={() => insertar()} className="btn btn-primary" >Registrar</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalEditar} className='modal-md'>

                <ModalHeader toggle={() => {
                    vaciarDatos();
                }}>  Actualizar Usuario</ModalHeader>
                <ModalBody>


                    <div className='row'>
                        <Col md='3'>
                            <Select1Easy
                                estado={rol}
                                cambiarEstado={setRol}
                                ExpresionRegular={INPUT.ID}
                                lista={listaRol}
                                name={'rol'}
                                etiqueta={'Rol'}
                                msg='Seleccione una opcion'
                            />
                        </Col>
                        {(rol.campo != 1 && rol.campo != 20 && rol.campo != 30) ?
                            <Col md='3'>
                                <Select1Easy
                                    estado={municipio}
                                    cambiarEstado={setMunicipio}
                                    name={'municipio'}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaMunicipio}
                                    etiqueta={'Municipio'}
                                    msg='Seleccione una opcion'
                                    funcion={listarHospital}
                                    onchange={() => {
                                        setHospital({ campo: null, valido: null });
                                        setListaHospital([])
                                    }}
                                />
                            </Col> : null
                        }
                        {rol.campo == 40 ?
                            <Col md='3'>
                                <Select1Easy
                                    estado={comunidad}
                                    cambiarEstado={setComunidad}
                                    name={'comunidad'}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaComunidad}
                                    etiqueta={'Comunidad'}
                                    msg='Seleccione una opcion'
                                />
                            </Col> : null
                        }
                        {(rol.campo == 5 || rol.campo == 6) ?
                            <Col md='3'>
                                <Select1Easy
                                    estado={hospital}
                                    cambiarEstado={setHospital}
                                    name={'hospital'}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaHospital}
                                    etiqueta={'Hospital'}
                                    msg='Seleccione una opcion'
                                />
                            </Col> : null
                        }

                    </div>


                    <div className='row'>
                        <Col md='12'>
                            <InputUsuarioStandar
                                estado={nombre}
                                cambiarEstado={setNombre}
                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                                etiqueta='Nombre completo'
                                name='nombre'
                                msg={'Este campo acepta solo letras '}
                            />
                        </Col>

                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={ap1}
                                cambiarEstado={setAp1}
                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                                etiqueta='Primer Apellido'
                                name='ap1'
                                msg={'Este campo acepta solo letras '}
                            />
                        </Col>
                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={ap2}
                                cambiarEstado={setAp2}
                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                                etiqueta='Segundo Apellido'
                                name='ap2'
                                msg={'Este campo acepta solo letras '}
                                importante={false}
                            />
                        </Col>

                    </div>

                    <div className='row pb-3'>
                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={celular}
                                cambiarEstado={setCelular}
                                placeholder="CELULAR/TELEF."
                                ExpresionRegular={INPUT.TELEFONO}  //expresion regular  
                                etiqueta='Celular/Telf.'
                                name={'celular'}
                                msg={'Este campo acepta solo números '}
                                importante={false}
                            /></Col>
                        <Col md='6'>
                            <InputUsuarioStandar
                                estado={correo}
                                cambiarEstado={setCorreo}
                                placeholder="CORREO"
                                ExpresionRegular={INPUT.CORREO}  //expresion regular  
                                etiqueta='Correo'
                                name={'correo'}
                                msg={'Este campo acepta en formato de correo'}
                                importante={false}
                            /></Col>
                        <Col md='12'>
                            <InputUsuarioStandar
                                estado={direccion}
                                cambiarEstado={setDireccion}
                                placeholder="DIRECCION"
                                ExpresionRegular={INPUT.DIRECCION}  //expresion regular  
                                etiqueta='Direccion'
                                name={'direccion'}
                                msg={'Este campo acepta letras, numeros y algunos caracteres'}
                                importante={false}
                            /></Col>
                    </div>

                    <div className='col-12'>
                        <Select1
                            estado={estado}
                            cambiarEstado={setEstado}
                            ExpresionRegular={INPUT.ID}
                            name={'Estado'}
                            etiqueta={"Estado"}

                            lista={[{ id: 1, label: 'Online' }, { id: 2, label: 'Deleted' }]}
                            msg="Seleccione una opcion"
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
                        <div className="hero-section m-1 mt-0" >
                            <button onClick={() => actualizar()} className="btn btn-info" style={{ background: '#4E5AFE' }} >Modificar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>

        </>

    );


}
export default Usuario;
