
import React, { useEffect, useState, useRef } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Modal, ModalBody, ModalHeader,
  Table,

} from "reactstrap";


import * as maptilersdk from '@maptiler/sdk';
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import logo from "assets/img/map.png";
import {
  InputUsuarioStandar,
  Select1,
} from "components/input/elementos"; // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'
import { saveDB } from "service";
import toast from "react-hot-toast";
import { editDB } from "service";
import { eliminarDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ComponenteInputUserDisabled } from "components/input/elementos";
import { Select1Aux } from "components/input/elementos";
import { ContenedorCheck } from "components/input/stylos";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";

function Casas() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapController, setMapController] = useState();
  maptilersdk.config.apiKey = 'KEglBNfzESBPXqrEfLxy';


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [lista, setLista] = useState([]);
  const [listaComunidad, setListaComunidad] = useState([]);
  const [listaMunicipio, setListaMunicipio] = useState([]);

  const [id, setId] = useState({ campo: null, valido: null });
  const [jefeFamilia, setJefeFamilia] = useState({ campo: null, valido: null });
  const [municipio, setMunicipio] = useState({ campo: null, valido: null });
  const [comunidad, setComunidad] = useState({ campo: null, valido: null });
  const [longitud, setLongitud] = useState({ campo: null, valido: null });
  const [latitud, setLatitud] = useState({ campo: null, valido: null });
  const [altitud, setAltitud] = useState({ campo: null, valido: null });
  const [vmIntra, setVmIntra] = useState({ campo: null, valido: null });
  const [vmPeri, setVmPeri] = useState({ campo: null, valido: null });
  const [numHab, setNumHab] = useState({ campo: null, valido: null });
  const [numHabitantes, setNumHabitantes] = useState({ campo: null, valido: null });
  const [cv, setCv] = useState({ campo: null, valido: null });
  const [coor, setCoor] = useState(faTruckField);


  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEditarMap, setModalEditarMap] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(0);
  const [countGetPosition, setCountGetPosition] = useState(0);


  useEffect(() => {
    document.title = "viviendas";
    listar()
    if (localStorage.getItem('numRol') == 3) listarComunidad()
    else listarMunicipio()
    return () => { }
  }, [])



  var options = {
    enableHighAccuracy: true,
    timeout: 5000, maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    if (map.current) return; // stops map from intializing more than once
    // console.log(crd)
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [crd.longitude, crd.latitude],
      zoom: 10,
    })
    if (!coor) {
      new maptilersdk.Marker({
        // draggable: true,
        color: null,
        className: 'marcador-grave',
        pitchAlignment: 'viewport'

      })
        // .setLngLat([crd.longitude, crd.latitude]) // latitud, longitud
        .setLngLat([crd.longitude, crd.latitude]) // longitud, latitud
        .addTo(map.current)
    }


    setLongitud({ campo: crd.latitude, valido: 'true' })
    setLatitud({ campo: crd.longitude, valido: 'true' })
    setAltitud({ campo: crd.accuracy ? crd.accuracy : null, valido: crd.accuracy ? 'true' : null })

    setMapController(createMapLibreGlMapController(map.current, maptilersdk));
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const location = async (editar = false, e = null) => {
    if (!editar) {
      setModalInsertar(true);


    } else {
      setId({ campo: e.id, valido: 'true' })
      setModalEditarMap(true);
    }

    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" })
          .then(function (result) {
            // console.log(result);
            if (result.state === "granted") {

              // navigator.geolocation.watchPosition(success, errors, opciones);
              navigator.geolocation.getCurrentPosition(success, errors, options);

            }
            else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(success, errors, options);
            }
            else if (result.state === "denied") {
            }
          });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, 1000)
  }



  const listar = async () => {
    const data = await start(URL + '/casa/listar')
    setLista(data)
  };

  const listarMunicipio = async () => {
    const data = await start(URL + '/casa/listar-municipios')
    setListaMunicipio(data)
  };
  const listarComunidad = async (id) => {
    const data = await start(URL + '/casa/listar-comunidad', { id })
    setListaComunidad(data)
  };


  const buscar = async () => {

    if (inputBuscar.valido === "true") {
      const data = await buscarDB(URL + '/casa/buscar', { dato: inputBuscar.campo })
      toast.success(data.length > 0 ? 'Informacion encontrada..' : 'No se encontró ninguna informacion..!')
      setLista(data)
    }
  };


  const insertar = async () => {

    if (
      comunidad.valido === "true" &&
      longitud.valido === "true" &&
      latitud.valido === "true" &&
      altitud.valido === "true" &&
      vmIntra.valido === "true" &&
      vmPeri.valido === "true" &&
      numHab.valido === "true" &&
      numHabitantes.valido === "true" &&
      cv.valido === "true" &&
      jefeFamilia.valido === "true" &&
      estadoEnvio === 0
    ) {
      setEstadoEnvio(1);
      await saveDB(URL + '/casa/guardar', {
        comunidad: comunidad.campo,
        longitud: longitud.campo,
        latitud: latitud.campo,
        altitud: altitud.campo,
        vmIntra: vmIntra.campo == 1 ? 1 : 0,
        vmPeri: vmPeri.campo == 1 ? 1 : 0,


        numero_habitaciones: numHab.campo,
        numero_habitantes: numHabitantes.campo,

        numero_control_vectorial: cv.campo,
        jefefamilia: jefeFamilia.campo
      }, setModalInsertar, setEstadoEnvio, true)
      listar()
    } else toast.error("Formulario incompleto!");
  };

  const editar = async () => {
    if (
      id.valido === 'true' &&
      comunidad.valido === "true" &&
      vmIntra.valido === "true" &&
      vmPeri.valido === "true" &&
      numHab.valido === "true" &&
      numHabitantes.valido === "true" &&
      cv.valido === "true" &&
      jefeFamilia.valido === "true"
    ) {
      await editDB(URL + '/casa/actualizar', {
        id: id.campo,
        comunidad: comunidad.campo,
        vmIntra: vmIntra.campo == 1 ? 1 : 0,
        vmPeri: vmPeri.campo == 1 ? 1 : 0,
        numero_habitaciones: numHab.campo,
        numero_habitantes: numHabitantes.campo,
        numero_control_vectorial: cv.campo,
        jefefamilia: jefeFamilia.campo
      }, setModalEditar)
      listar()
    } else toast.error("Formulario incompleto!");
  };

  const editarMap = async () => {
    // alert(id.campo)
    if (
      id.valido === 'true' &&
      longitud.valido === "true" &&
      latitud.valido === "true" &&
      altitud.valido === "true"

    ) {
      await editDB(URL + '/casa/actualizar-coordenadas', {
        id: id.campo,
        longitud: longitud.campo,
        latitud: latitud.campo,
        altitud: altitud.campo,
      }, setModalEditarMap, false)
      // listar()
    } else toast.error("Formulario incompleto!");
  };
  const eliminar = async (id, nombre) => {
    let ok = window.confirm('Eliminar a: ' + nombre + ' ?')
    if (ok) {
      await eliminarDB(URL + '/casa/eliminar', { id })
      listar()
    }
  };


  const toggle = () => {
    setModalInsertar(!modalInsertar)
    window.location.reload()
  }

  const toggleEdit = () => {
    setModalEditar(false)
  }
  const toggleEditMap = () => {
    setModalEditarMap(false)
    window.location.reload()
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
                        VIVIENDAS
                      </div>
                      {(parseInt(localStorage.getItem('numRol')) === 3 || parseInt(localStorage.getItem('numRol')) === 40) &&
                        <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                          <button className='btn-new' pb={3} onClick={() => {
                            // if (localStorage.getItem('numRol') == 40) setComunidad({ campo: 200000000, valido: 'true' })
                            // location()
                            setModalInsertar(true)
                          }} >
                            {window.innerWidth < 768 ? 'Nuevo' : 'Registro nuevo'}
                          </button >
                        </div>
                      }
                    </div>
                  </div>
                )}
              </BackgroundColorContext.Consumer>
            </CardHeader>

            <CardBody>

              {localStorage.getItem('numRol') != 40 && <Row>
                {localStorage.getItem('numRol') != 3 && <Col md='5'>
                  <Select1
                    estado={municipio}
                    cambiarEstado={setMunicipio}
                    ExpresionRegular={INPUT.ID}
                    lista={listaMunicipio}
                    funcion={listarComunidad}
                    name={"municipio"}
                    etiqueta={"Municipio"}
                    msg="Seleccione una opcion"
                  /></Col>}
                <Col md='5'>
                  <Select1
                    estado={inputBuscar}
                    cambiarEstado={setInputBuscar}
                    ExpresionRegular={INPUT.ID}
                    lista={listaComunidad}
                    name={"comunidad"}
                    etiqueta={"Comunidad"}
                    msg="Seleccione una opcion"
                  />
                </Col>

                <Col md='2' style={{ paddingTop: window.innerWidth > 767 ? '20px' : '0', paddingRight: window.innerWidth > 767 ? '0' : '15', paddingLeft: window.innerWidth > 767 ? '0' : '15' }}>
                  <Button onClick={() => buscar()}>Filtrar</Button>
                </Col>
              </Row>
              }
              {lista.length + ' Viviendas encontradas'}
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th >COMUNIDAD</th>
                    <th>CV</th>
                    <th >Jefe. Fam.</th>
                    <th >PUNTO GPS</th>
                    <th >VM-INTRA</th>
                    <th >VM-PERI</th>{(parseInt(localStorage.getItem('numRol')) === 3 || parseInt(localStorage.getItem('numRol')) === 40)  &&
                      <th className="text-center">MODIFICAR COORDENADA</th>}
                    <th className="text-center">CREACION</th>
                    {(localStorage.getItem('numRol') == 3) || localStorage.getItem('numRol') == 40 && <>
                      <th className="text-center">EDITAR</th>
                      <th className="text-center">ELIMINAR</th>
                    </>
                    }
                  </tr>
                </thead>
                <tbody> 
                  {lista.map(e => (
                    <tr key={e.id}>
                      <td>
                        <div className="tbl-name tbl-bold">{e.comunidad}</div>
                        <div className="tbl-des">{e.municipio}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{'CV : ' + e.cv}</div>
                        <div className="tbl-des">{e.num_hab + ' Habitaciones'}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{e.jefefamilia}</div>
                        <div className="tbl-des">{e.habitantes + ' ocupantes'}</div>
                      </td>

                      <td>
                        <div className="tbl-name tbl-bold">{'lat: ' + e.latitud}</div>
                        <div className="tbl-des">{' long: ' + e.longitud}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{e.vm_intra ? 'SI' : 'NO'}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{e.vm_peri ? 'SI' : 'NO'}</div>
                      </td>
                      {(parseInt(localStorage.getItem('numRol')) === 3 || parseInt(localStorage.getItem('numRol')) === 40) &&
                        <td className="text-center tbl-bold" onClick={() => {
                          location(true, e);
                          // localStorage.setItem('LAT', e.longitud)
                          // localStorage.setItem('LONG', e.latitud)
                          // localStorage.setItem('ALT', e.altitud)
                        }}><img src={logo} style={{ width: '30px', height: '30px', cursor: 'pointer' }} /></td>}
                      <td><div className="text-center tbl-name tbl-bold">{e.creacion}</div></td>
                      {(parseInt(localStorage.getItem('numRol')) === 3 || parseInt(localStorage.getItem('numRol')) === 40)  && <>
                        <td className="text-center">
                          <div className="tbl-edit" onClick={() => {
                            setModalEditar(true);
                            listarComunidad(e.idmunicipio)

                            setId({ campo: e.id, valido: 'true' })
                            setMunicipio({ campo: e.idmunicipio, valido: 'true' })
                            setComunidad({ campo: e.idcomunidad, valido: 'true' })
                            setVmIntra({ campo: e.vm_intra ? 1 : 2, valido: 'true' })
                            setVmPeri({ campo: e.vm_peri ? 1 : 2, valido: 'true' })
                            setNumHab({ campo: e.num_hab, valido: 'true' })
                            setNumHabitantes({ campo: e.habitantes, valido: 'true' })
                            setCv({ campo: e.cv, valido: 'true' })
                            setJefeFamilia({ campo: e.jefefamilia, valido: 'true' })
                            // location(true, e)
                          }} >Editar</div>
                        </td>
                        <td className="text-center tbl-bold"><div className="tbl-delete" onClick={() => eliminar(e.id, e.comunidad)}>Eliminar</div></td>
                      </>}
                    </tr>
                  ))}

                </tbody>
                {lista.length < 1 && 'lista vacia'}
              </Table>
            </CardBody>
          </Card>

        </Row>

      </div>
      <Modal isOpen={modalInsertar} toggle={toggle} className="modal-lg" >
        <Card>
          <ModalHeader toggle={toggle}>
            Registrar vivienda
          </ModalHeader>
          <ModalBody>
            <Form>

              <fieldset className="border  p-1" style={{ marginLeft: '0', marginRight: '0', marginTop: '0' }}>
                <legend
                  className="float-none w-auto p-2"
                >
                  Filtros
                </legend>
                {localStorage.getItem('numRol') != 40 && <Row>
                  {localStorage.getItem('numRol') != 3 && <Col md='12'>
                    <Select1
                      estado={municipio}
                      cambiarEstado={setMunicipio}
                      ExpresionRegular={INPUT.ID}
                      lista={listaMunicipio}
                      funcion={listarComunidad}
                      name={"municipio"}
                      etiqueta={"Municipio"}
                      msg="Seleccione una opcion"
                    /></Col>}
                  <Col md='12'>
                    <Select1Aux
                      estado={comunidad}
                      cambiarEstado={setComunidad}
                      name="comunidad"
                      etiqueta={"Comunidad"}
                      placeholder="Comunidad"
                      lista={listaComunidad}
                      ExpresionRegular={INPUT.ID} //expresion regular
                      msg={"Este campo acepta letras, numero y algunos caracteres"}
                    />
                  </Col>
                </Row>
                }
              </fieldset>
              <fieldset className="border  p-1" style={{ marginLeft: '0', marginRight: '0', marginTop: '0' }}>
                <legend
                  className="float-none w-auto p-2"
                >
                  Coodenadas formato Decimal DD
                </legend>
                {!coor ? <Row>

                  <Col md='4'>
                    <ComponenteInputUserDisabled
                      estado={longitud}
                      etiqueta={"Latitud °"}
                      placeholder={'cargando ...'}
                    />
                  </Col>
                  <Col md='4'>
                    <ComponenteInputUserDisabled
                      estado={latitud}
                      etiqueta={"Longitud °"}
                      placeholder={'cargando ...'}
                    />
                  </Col>

                  <Col md='4'>
                    <ComponenteInputUserDisabled
                      estado={altitud}
                      etiqueta={"altitud"}
                      placeholder={'cargando ...'}

                    />
                  </Col>
                  <ContenedorCheck>
                    <label htmlFor={'coor'}>
                      <input name="coor" id="coor" type="checkbox" onChange={() => setCoor(!coor)} defaultChecked={coor} />
                      <span>{'Insertar manualmente'}</span>
                    </label>
                  </ContenedorCheck>
                </Row> : <Row>


                  <Col md='4'>
                    <InputUsuarioStandar
                      estado={longitud}
                      cambiarEstado={setLongitud}
                      name="latitud"
                      etiqueta={"Latitud"}
                      placeholder="Latitud"
                      ExpresionRegular={INPUT.COORDENADAS} //expresion regular
                      msg={"Este campo acepta  numero "}
                    />
                  </Col>
                  <Col md='4'>
                    <InputUsuarioStandar
                      estado={latitud}
                      cambiarEstado={setLatitud}
                      name="longitud"
                      etiqueta={"Longitud"}
                      placeholder="Longitud"
                      ExpresionRegular={INPUT.COORDENADAS} //expresion regular
                      msg={"Este campo acepta  numero "}
                    />
                  </Col>
                  <Col md='4'>
                    <InputUsuarioStandar
                      estado={altitud}
                      cambiarEstado={setAltitud}
                      name="Altitud"
                      etiqueta={"Altitud"}
                      placeholder="Altitud"
                      ExpresionRegular={INPUT.COORDENADAS} //expresion regular
                      msg={"Este campo acepta  numero "}
                    />
                  </Col>


                  {/* <ContenedorCheck>
                    <label htmlFor={'coor'}>
                      <input name="coor" id="coor" type="checkbox" onChange={() => setCoor(!coor)} defaultChecked={coor} />
                      <span>{'Capturar mi ubicacion'}</span>
                    </label>
                  </ContenedorCheck> */}
                </Row>
                }
              </fieldset>
              <Row>
                <Col md='2'>
                  <Select1
                    estado={vmIntra}
                    cambiarEstado={setVmIntra}
                    ExpresionRegular={INPUT.ID}
                    lista={[{ id: 1, label: 'SI' }, { id: 2, label: 'NO' }]}
                    name={'vmintra'}
                    etiqueta={"VM-Intra"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='2'>
                  <Select1
                    estado={vmPeri}
                    cambiarEstado={setVmPeri}
                    ExpresionRegular={INPUT.ID}
                    lista={[{ id: 1, label: 'SI' }, { id: 2, label: 'NO' }]}
                    name={'vmperi'}
                    etiqueta={"VM-Peri"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='2'>
                  <InputUsuarioStandar
                    estado={numHab}
                    cambiarEstado={setNumHab}
                    name="num_habitaciones"
                    etiqueta={"Numero habitaciones"}
                    placeholder="Num Habitaciones"
                    ExpresionRegular={INPUT.ID} //expresion regular
                    msg={"Este campo acepta  numero "}
                  />
                </Col>
                <Col md='3'>
                  <InputUsuarioStandar
                    estado={numHabitantes}
                    cambiarEstado={setNumHabitantes}
                    name="num_habitaciones"
                    etiqueta={"Numero Ocupantes"}
                    placeholder="Num Ocupantes"
                    ExpresionRegular={INPUT.ID} //expresion regular
                    msg={"Este campo acepta  numero "}
                  />
                </Col>
                <Col md='3'>
                  <InputUsuarioStandar
                    estado={cv}
                    cambiarEstado={setCv}
                    name="cv"
                    etiqueta={"CV"}
                    placeholder="CV"
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    msg={"Este campo acepta  numeros y algunos caracteres"}
                  />
                </Col>
                <Col md='12'>
                  <InputUsuarioStandar
                    estado={jefeFamilia}
                    cambiarEstado={setJefeFamilia}
                    name="jefefamilia"
                    etiqueta={"Jefe de Familia"}
                    placeholder="Jefe de Familia"
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    msg={"Este campo acepta  numeros y algunos caracteres"}
                  />
                </Col>
              </Row>
              <p style={{ fontWeight: 'bold' }}>Herramienta de validacion de geolocalización</p>
              <div style={{ height: '40vh', width: '100%' }}>
                <div className="map-wrap">
                  <div className="geocoding">
                    {mapController &&
                      <GeocodingControl apiKey={maptilersdk.config.apiKey} mapController={mapController} />
                    }
                  </div>
                  <div ref={mapContainer} className="map-validacion" />
                </div>
              </div>
            </Form>

          </ModalBody>

          <div className="boton-modal">
            <Button color="success" onClick={() => insertar()}>
              Guardar
            </Button>
          </div>
        </Card>
      </Modal>
      <Modal isOpen={modalEditar} toggle={toggleEdit} >
        <Card>
          <ModalHeader toggle={toggleEdit}>
            Actualizar vivienda
          </ModalHeader>
          <ModalBody>
            <Form>

              <fieldset className="border  p-1" style={{ marginLeft: '0', marginRight: '0', marginTop: '0' }}>
                <legend
                  className="float-none w-auto p-2"
                >
                  Filtros para comunidad
                </legend>
                {localStorage.getItem('numRol') != 40 && <Row>
                  {localStorage.getItem('numRol') != 3 && <Col md='5'>
                    <Select1
                      estado={municipio}
                      cambiarEstado={setMunicipio}
                      ExpresionRegular={INPUT.ID}
                      lista={listaMunicipio}
                      funcion={listarComunidad}
                      name={"municipio"}
                      etiqueta={"Municipio"}
                      msg="Seleccione una opcion"
                    /></Col>}
                  <Col md='12'>
                    <Select1Aux
                      estado={comunidad}
                      cambiarEstado={setComunidad}
                      name="comunidad"
                      etiqueta={"Comunidad"}
                      placeholder="Comunidad"
                      lista={listaComunidad}
                      ExpresionRegular={INPUT.ID} //expresion regular
                      msg={"Este campo acepta letras, numero y algunos caracteres"}
                    />
                  </Col>
                </Row>}

              </fieldset>

              <Row>
                <Col md='6'>
                  <Select1
                    estado={vmIntra}
                    cambiarEstado={setVmIntra}
                    ExpresionRegular={INPUT.ID}
                    lista={[{ id: 1, label: 'SI' }, { id: 2, label: 'NO' }]}
                    name={'vmintra'}
                    etiqueta={"VM-Intra"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='6'>
                  <Select1
                    estado={vmPeri}
                    cambiarEstado={setVmPeri}
                    ExpresionRegular={INPUT.ID}
                    lista={[{ id: 1, label: 'SI' }, { id: 2, label: 'NO' }]}
                    name={'vmperi'}
                    etiqueta={"VM-Peri"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='6'>
                  <InputUsuarioStandar
                    estado={numHab}
                    cambiarEstado={setNumHab}
                    name="num_habitaciones"
                    etiqueta={"Numero habitaciones"}
                    placeholder="Num Habitaciones"
                    ExpresionRegular={INPUT.ID} //expresion regular
                    msg={"Este campo acepta  numero "}
                  />
                </Col>
                <Col md='6'>
                  <InputUsuarioStandar
                    estado={numHabitantes}
                    cambiarEstado={setNumHabitantes}
                    name="num_habitaciones"
                    etiqueta={"Numero Ocupantes"}
                    placeholder="Num Ocupantes"
                    ExpresionRegular={INPUT.ID} //expresion regular
                    msg={"Este campo acepta  numero "}
                  />
                </Col>
                <Col md='4'>
                  <InputUsuarioStandar
                    estado={cv}
                    cambiarEstado={setCv}
                    name="cv"
                    etiqueta={"CV"}
                    placeholder="CV"
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    msg={"Este campo acepta  numeros y algunos caracteres"}
                  />
                </Col>
                <Col md='8'>
                  <InputUsuarioStandar
                    estado={jefeFamilia}
                    cambiarEstado={setJefeFamilia}
                    name="jefefamilia"
                    etiqueta={"Jefe de Familia"}
                    placeholder="Jefe de Familia"
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    msg={"Este campo acepta  numeros y algunos caracteres"}
                  />
                </Col>
              </Row>
            </Form>
          </ModalBody>

          <div className="boton-modal">
            <Button color="info" onClick={() => editar()} >
              Actualizar
            </Button>
          </div>
        </Card>
      </Modal>

      <Modal isOpen={modalEditarMap} toggle={toggleEdit} className="modal-lg" >
        <Card>
          <ModalHeader toggle={toggleEditMap}>
            Actualizar Coordenadas vivienda
          </ModalHeader>
          <ModalBody>
            <Form>
              <fieldset className="border  p-1" style={{ marginLeft: '0', marginRight: '0', marginTop: '0' }}>
                <legend
                  className="float-none w-auto p-2"
                >
                  Coodenadas formato Decimal DD
                </legend>
                {!coor ? <Row>

                  <Col md='4'>
                    <ComponenteInputUserDisabled
                      estado={longitud}
                      etiqueta={"Latitud"}
                      placeholder={'cargando ...'}
                    />
                  </Col>
                  <Col md='4'>
                    <ComponenteInputUserDisabled
                      estado={latitud}
                      etiqueta={"Longitud"}
                      placeholder={'cargando ...'}
                    />
                  </Col>

                  <Col md='4'>
                    <ComponenteInputUserDisabled
                      estado={altitud}
                      etiqueta={"altitud"}
                      placeholder={'cargando ...'}
                    />
                  </Col>
                  <ContenedorCheck>
                    <label htmlFor={'coor'}>
                      <input name="coor" id="coor" type="checkbox" onChange={() => {
                        setCoor(!coor);
                        // setLatitud({ campo: localStorage.getItem('LAT'), valido: 'true' });
                        // setLongitud({ campo: localStorage.getItem('LONG'), valido: 'true' });
                        // setAltitud({ campo: localStorage.getItem('ALT'), valido: 'true' })
                      }} defaultChecked={coor} />
                      <span>{'Insertar manualmente'}</span>
                    </label>
                  </ContenedorCheck>
                </Row> : <Row>


                  <Col md='4'>
                    <InputUsuarioStandar
                      estado={longitud}
                      cambiarEstado={setLongitud}
                      name="latitud"
                      etiqueta={"Latitud"}
                      placeholder="Latitud"
                      ExpresionRegular={INPUT.COORDENADAS} //expresion regular
                      msg={"Este campo acepta  numero "}
                    />
                  </Col>
                  <Col md='4'>
                    <InputUsuarioStandar
                      estado={latitud}
                      cambiarEstado={setLatitud}
                      name="longitud"
                      etiqueta={"Longitud"}
                      placeholder="Longitud"
                      ExpresionRegular={INPUT.COORDENADAS} //expresion regular
                      msg={"Este campo acepta  numero "}
                    />
                  </Col>
                  <Col md='4'>
                    <InputUsuarioStandar
                      estado={altitud}
                      cambiarEstado={setAltitud}
                      name="Altitud"
                      etiqueta={"Altitud"}
                      placeholder="Altitud"
                      ExpresionRegular={INPUT.COORDENADAS} //expresion regular
                      msg={"Este campo acepta  numero "}
                    />
                  </Col>
                  <ContenedorCheck>
                    <label htmlFor={'coor'}>
                      <input name="coor" id="coor" type="checkbox" onChange={() => setCoor(!coor)} defaultChecked={coor} />
                      <span>{'Capturar mi ubicacion'}</span>
                    </label>
                  </ContenedorCheck>
                </Row>
                }
              </fieldset>
              <p style={{ fontWeight: 'bold' }}>Herramienta de validacion de geolocalización</p>
              <div style={{ height: '60vh', width: '100%' }}>
                <div className="map-wrap">
                  <div className="geocoding">
                    {mapController &&
                      <GeocodingControl apiKey={maptilersdk.config.apiKey} mapController={mapController} />
                    }
                  </div>
                  <div ref={mapContainer} className="map-validacion-edit" />
                </div>
              </div>
            </Form>

          </ModalBody>


          <div className="boton-modal">
            <Button color="info" onClick={() => editarMap()} >
              Actualizar Coordenadas
            </Button>
          </div>
        </Card>
      </Modal>

    </>

  );
}

export default Casas;
