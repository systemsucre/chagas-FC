import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { faEdit, faEye, faTrashAlt, faUser, faUserCircle, faUserClock, faUserDoctor, faUserGear, faUserNurse, faUsersSlash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardHeader, Modal, ModalBody, ModalHeader, Row, Card, Table, Col } from "reactstrap";
import { toast } from "react-hot-toast";

import { LOCAL_URL, INPUT } from "../../Auth/config";
import { Select1, InputUsuario, ComponenteInputBuscar_, Select1Aux, CabeceraFormularios } from './input/elementos';
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { start } from "service";
import paciente_femenino from 'assets/img/paciente_femenino.png'
import paciente_masculino from 'assets/img/paciente_masculino.png'
import paciente_femenino_modal from 'assets/img/paciente-femenino-modal.png'
import paciente_masculino_modal from 'assets/img/paciente-masculino-modal.png'
import { saveDB } from "service";
import { editDB } from "service";
import { eliminarDB } from "service";
import { buscarDB } from "service";
import { API_ENDPOINTS } from "./api";


export default function Paciente() {


  useEffect(() => {
    const ini = () => {
      document.title = "PACIENTES";
      listar()
    }
    ini()
    return () => { }
  }, []);



  const [pacientes, setPacientes] = useState([])
  const [ListaComunidad, setListaComunidad] = useState([])
  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })





  const [modal, setModal] = useState(false)
  const [pacienteData, setPacienteData] = useState(null)
  const [modalRegistrar, setModalRegistrar] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [id, setId] = useState({ campo: null, valido: null })
  const [ci, setCi] = useState({ campo: null, valido: null })
  const [ap1, setAp1] = useState({ campo: null, valido: null })
  const [ap2, setAp2] = useState({ campo: null, valido: null })
  const [nombre, setNombre] = useState({ campo: null, valido: null })
  const [fechaNac, setFechaNac] = useState({ campo: null, valido: null })
  const [ocupacion, setOcupacion] = useState({ campo: null, valido: null })
  const [sexo, setSexo] = useState({ campo: null, valido: null })
  const [celular, setCelular] = useState({ campo: null, valido: null })
  const [direccion, setDireccion] = useState({ campo: null, valido: null })
  const [comunidad, setComunidad] = useState({ campo: null, valido: null })
  const [comunidadNombre, setComunidadNombre] = useState({ campo: null, valido: null })
  const [antFam, setAntFam] = useState({ campo: null, valido: null })
  const [antPer, setAntPer] = useState({ campo: null, valido: null })
  const [otros, setOtros] = useState({ campo: null, valido: null })
  const [personaReferencia, setPersonaReferencia] = useState({ campo: null, valido: null })
  const [celularReferencia, setCelularReferencia] = useState({ campo: null, valido: null })

  const [estadoEnvio, setEstadoEnvio] = useState(0);


  const initialFormState = {
    campo: null,
    valido: null
  };

  const vaciarDatos = () => {
    const fieldsToReset = {
      setCi,
      setAp1,
      setAp2,
      setNombre,
      setFechaNac,
      setSexo,
      setOcupacion,
      setAntFam,
      setCelular,
      setDireccion,
      setComunidad,
      setComunidadNombre,
      setAntPer,
      setOtros,
      setPersonaReferencia,
      setCelularReferencia
    };
    Object.values(fieldsToReset).forEach(setterFn => {
      setterFn(initialFormState);
    });

    setModalEdit(false);
    setModalRegistrar(false);
  };


  useEffect(() => {
    const ini = () => {
      if (inputBuscar.campo === '') listar()
    }
    ini()
    return () => { }
  }, [inputBuscar]);


  const listar = async () => {

    const data = await start(API_ENDPOINTS.PACIENTES.LISTAR)

    for (let f of data[0]) {


      var fechaDeNacimiento = new Date(f.fecha);
      var hoy = new Date();
      const milisegundosPorAnio = 1000 * 60 * 60 * 24 * 365;
      // console.log((hoy - fechaDeNacimiento) / milisegundosPorAnio)

      if (parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) >= 1) {
        f.edad = parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' años';
        localStorage.setItem('edad', parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' años')

      } else {
        let edad = Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365);

        if (edad < 31) {
          f.edad = Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365) + ' dias';
          localStorage.setItem('edad', parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' dias')
        }
        if (edad > 30) {
          f.edad = parseInt(edad / 30) + ' meses';
          localStorage.setItem('edad', parseInt(edad / 30) + ' meses')
        }
      }
    }
    setPacientes(data[0]);
    setListaComunidad(data[1]);
  };



  const insertar = async () => {
    if (estadoEnvio === 0) {
      setEstadoEnvio(1);
      await saveDB(API_ENDPOINTS.PACIENTES.REGISTRAR, {
        ci: ci.campo,
        ap1: ap1.campo,
        ap2: ap2.campo ? ap2.campo : null,
        nombre: nombre.campo,
        fecha_nac: fechaNac.campo,
        sexo: sexo.campo,
        ocupacion: ocupacion.campo,
        celular: celular.campo,
        direccion: direccion.campo,
        ant_fam: antFam.campo,
        ant_per: antPer.campo,
        otros: otros.campo,
        persona_referencia: personaReferencia.campo,
        celular_referencia: celularReferencia.campo,
        comunidad: comunidad.campo,
        comunidad_nombre: comunidadNombre.campo
      }, setModalRegistrar, setEstadoEnvio, false, vaciarDatos)
      listar()
    } else toast.error("Formulario incompleto!");
  };

  const modificar = async () => {

    await editDB(API_ENDPOINTS.PACIENTES.MODIFICAR, {
      id: id.campo,
      ci: ci.campo,
      ap1: ap1.campo,
      ap2: ap2.campo ? ap2.campo : null,
      nombre: nombre.campo,
      fecha_nac: fechaNac.campo,
      sexo: sexo.campo,
      ocupacion: ocupacion.campo,
      celular: celular.campo,
      direccion: direccion.campo,
      ant_fam: antFam.campo,
      ant_per: antPer.campo,
      otros: otros.campo,
      persona_referencia: personaReferencia.campo,
      celular_referencia: celularReferencia.campo,
      comunidad: comunidad.campo,
      comunidad_nombre: comunidadNombre.campo
    }, setModalEdit, false, vaciarDatos)
    listar()
  };
  const eliminar = async (id) => {
    if (window.confirm('Eliminar Paciente ?')) {
      await eliminarDB(API_ENDPOINTS.PACIENTES.ELIMINAR, { id })
      listar()
    }
  };
  const buscar = async () => {
    if (inputBuscar.valido === "true") {
      const data = await buscarDB(API_ENDPOINTS.PACIENTES.BUSCAR, { dato: inputBuscar.campo })
      toast.success(data.length > 0 ? 'Informacion encontrada..' : 'No se encontró ninguna informacion..!')
      setPacientes(data)
    }
  }



  return (
    <>
      <div className="content"  >
        <Row className="main-container">
          <Card>
            <CardHeader>
              <BackgroundColorContext.Consumer>
                {({ color }) => (
                  <div className="tbl-header" data={color}>

                    <div className="row">
                      <div className="col-8">
                        PACIENTES

                      </div>

                      <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className='btn-new' pb={3} onClick={() => { setModalRegistrar(true); }} >
                          Registrar
                        </button >
                      </div>
                    </div>
                  </div>
                )}
              </BackgroundColorContext.Consumer>
            </CardHeader>

            <div className="p-2 pl-0">
              <ComponenteInputBuscar_
                estado={inputBuscar}
                cambiarEstado={setInputBuscar}
                name="inputBuscar"
                ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                placeholder="Escriba para filtrar ..."
                eventoBoton={buscar}
                etiqueta={'Buscar'}
              />
            </div>


            <Table className="tablesorter" responsive >
              <BackgroundColorContext.Consumer>
                {({ color }) => (
                  <thead className="text-primary" data={color}>
                    <tr>
                      <th >PACIENTE</th>

                      <th >SEXO</th>
                      <th >COMUNIDAD</th>
                      <th >FECHA NACIMIENTO</th>
                      <th >EDAD</th>

                      <th >CELULAR</th>
                      <th></th>
                      <th></th>
                      <th>HOSPITAL</th>
                      {/* <th>USUARIO</th> */}
                    </tr>
                  </thead>
                )}
              </BackgroundColorContext.Consumer>
              <tbody >
                {pacientes.map((a, index) => (
                  <tr key={a.id} style={{
                    height: '50px', background: index % 2 == 0 ? "#E1EEF4" : 'white',
                    color: index % 2 == 0 ? "#00496B" : 'white'
                  }} className='item'>

                    <td>
                      <div className="row">
                        <div className="col-auto">
                          <img className=" user-table" src={a.sexo == 1 ? paciente_masculino : paciente_femenino} />
                        </div>
                        <div className="col-auto">

                          <div className="tbl-name tbl-bold">{a.ap2 ? a.nombre + ' ' + a.ap1 + ' ' + a.ap2 : a.nombre + ' ' + a.ap1}</div>
                          <div className="tbl-des">{a.ci ? 'C.I.: ' + a.ci : 'C.I.: 0000'}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="tbl-name tbl-bold">{a.sexo == 1 ? 'MASCULINO' : 'FEMENINO'}</div>
                    </td>
                    <td>
                      <div className="tbl-des">{a.comunidad}</div>
                    </td>
                    <td>
                      <div className="tbl-des">{a.fecha}</div>
                    </td>
                    <td>
                      <div className="tbl-des">{a.edad}</div>
                    </td>

                    <td>
                      <div className="tbl-des">{a.celular}</div>
                    </td>

                    <td>
                      <div className="btn-tbl-container row">
                        {parseInt(localStorage.getItem('id_')) == a.user_created ?
                          <div
                            onClick={() => {
                              setId({ campo: a.id, valido: 'true' })
                              setCi({ campo: a.ci, valido: 'true' })
                              setAp1({ campo: a.ap1, valido: 'true' })
                              setAp2({ campo: a.ap2, valido: 'true' })
                              setNombre({ campo: a.nombre, valido: 'true' })
                              setFechaNac({ campo: a.fecha, valido: 'true' })
                              setSexo({ campo: a.sexo, valido: 'true' })
                              setOcupacion({ campo: a.ocupacion, valido: 'true' })
                              setCelular({ campo: a.celular, valido: 'true' })
                              setDireccion({ campo: a.direccion, valido: 'true' })
                              setComunidad({ campo: a.id_comunidad, valido: 'true' })
                              setComunidadNombre({ campo: a.comunidad_nombre, valido: 'true' })
                              setAntFam({ campo: a.antFam, valido: 'true' })
                              setAntPer({ campo: a.antPer, valido: 'true' })
                              setOtros({ campo: a.otros, valido: 'true' })
                              setPersonaReferencia({ campo: a.persona_referencia, valido: 'true' })
                              setCelularReferencia({ campo: a.celular_referencia, valido: 'true' })
                              setModalEdit(true)
                            }}
                            className="btn-tbl col-3 bg-info" ><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></div> : <div > </div>}
                        {parseInt(localStorage.getItem('id_')) == a.user_created ?
                          <div
                            onClick={() => eliminar(a.id)}
                            className="btn-tbl col-3  ml-1" style={{ background: '#FF3D85' }}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                          </div> : <div > </div>}
                        <div
                          onClick={() => { setPacienteData(a); setModal(true) }}
                          className="btn-tbl btn-success col-3  ml-1 " style={{ background: '#00d084' }} ><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></div>
                      </div>

                    </td>
                    <td>
                      <Link
                        className="btn-tbl-tratamiento  "
                        to={LOCAL_URL + "/tratamiento/tratamiento/" + a.id}
                        onClick={() => {
                          localStorage.setItem('ci', a.ci || '-')
                          localStorage.setItem('nombrePaciente', a.nombre + ' ' + a.ap1 + ' ' + a.ap2)
                        }}
                      >
                        Tratamiento
                      </Link>

                    </td>
                    <td>
                      <div className="tbl-des">{a.hospital}</div>
                    </td>
                    {/* <td>
                      <div className="tbl-des">{a.usuario}</div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
            {pacientes.length < 1 && (
              <div style={{ fontSize: "18px" }} className="text-success text-center">Lista Vacia</div>
            )}

            <div className="text-table p-2">
              {pacientes.length + " Registro(s)"}
            </div>

            <div style={{ borderBottom: '1px solid #A1AAA7' }}></div>
          </Card>
        </Row>
      </div>

      <Modal
        isOpen={modalRegistrar}
        className="modal-md"
        toggle={() => setModalRegistrar(!modalRegistrar)}
      >
        <ModalHeader
          toggle={() => setModalRegistrar(!modalRegistrar)}
        >
        </ModalHeader>
        <CabeceraFormularios
          nombre={'FORMULARIO DE REGISTRO DE PACIENTE'}
        />
        <ModalBody>
          <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
                  <InputUsuario
                    estado={ci}
                    cambiarEstado={setCi}
                    ExpresionRegular={INPUT.CI} //expresion regular
                    etiqueta={'Cédula de identidad'}
                    msg={"el formato no es valido"}
                    name={'ci'}
                  />

                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputUsuario
                    estado={ap1}
                    name={'ap1'}
                    cambiarEstado={setAp1}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    etiqueta={'Apellido Paterno'}
                    msg={"el formato no es valido"}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputUsuario
                    estado={ap2}
                    cambiarEstado={setAp2}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    etiqueta={'Apellido Materno'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'ap2'}
                    importante={false}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputUsuario
                    estado={nombre}
                    cambiarEstado={setNombre}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    etiqueta={'Nombre completo'}
                    msg={"el formato no es valido"}
                    name={'nombre'}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <InputUsuario
                    estado={fechaNac}
                    cambiarEstado={setFechaNac}
                    tipo="date"
                    ExpresionRegular={INPUT.FECHA} //expresion regular
                    etiqueta={'Fecha de nacimiento'}
                    msg={"el formato no es valido"}
                    frithday={true}
                    name={'fecha_nac'}
                  />
                </div>

                <Col md={4}>
                  <Select1Aux
                    estado={sexo}
                    cambiarEstado={setSexo}
                    ExpresionRegular={INPUT.ID} //expresion regular
                    etiqueta={'Sexo'}
                    lista={[

                      { id: 1, label: 'Masculino' },
                      { id: 2, label: 'Femenino' },
                    ]
                    }
                    msg={"el formato no es valido"}
                    name={'sexo'}
                  />
                </Col>

                <Col md={4}>

                  <InputUsuario
                    estado={celular}
                    cambiarEstado={setCelular}
                    ExpresionRegular={INPUT.TELEFONO} //expresion regular
                    etiqueta={'Celular/Telf'}
                    msg={"el formato no es valido"}
                    name={'celular'}
                  />
                </Col>

                <div className="col-12 ">
                  <InputUsuario
                    estado={ocupacion}
                    cambiarEstado={setOcupacion}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Ocupacion'}
                    msg={"el formato no es valido"}
                    name={'ocupacion'}
                  />
                </div>

                <div className="col-12  ">
                  <Select1
                    estado={comunidad}
                    cambiarEstado={setComunidad}
                    ExpresionRegular={INPUT.DIRECCION} //expresion regular
                    etiqueta={'Comunidad/barrio'}
                    msg={"el formato no es valido"}
                    lista={ListaComunidad}
                    name={'comunidad'}
                    label={setComunidadNombre}
                    importante={false}
                  />
                </div>




                <div className="col-12">
                  <InputUsuario
                    estado={direccion}
                    cambiarEstado={setDireccion}
                    ExpresionRegular={INPUT.DIRECCION} //expresion regular
                    etiqueta={'Direccion'}
                    msg={"el formato no es valido"}
                    name={'direccion'}
                    importante={false}
                  />
                </div>
              </div>
              {/* </fieldset> */}
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-5">
              {/* <fieldset className="border p-2">
                <legend
                  className="float-none w-auto p-2"
                  style={{ fontSize: "14px" }}
                >
                  OTROS DATOS
                </legend> */}
              <div className="row">



                <div className="col-12">
                  <InputUsuario
                    estado={antFam}
                    tipo="textarea"
                    cambiarEstado={setAntFam}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Antecedentes familiares'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'ant'}
                    importante={false}
                  />
                </div>

              </div>
              <div className="row">

                <div className="col-12 ">
                  <InputUsuario
                    estado={antPer}
                    cambiarEstado={setAntPer}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    tipo="textarea"
                    etiqueta={'Antecedentes Personales'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'antecper'}
                    importante={false}
                  />
                </div>

                <div className="col-12">
                  <InputUsuario
                    estado={otros}
                    cambiarEstado={setOtros}
                    tipo="textarea"
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Otro'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'otros'}
                    importante={false}
                  />
                </div>
                <Col md={6}>
                  <InputUsuario
                    estado={personaReferencia}
                    cambiarEstado={setPersonaReferencia}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Persona de referencia'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'persona_referencia'}
                    importante={false}
                  />
                </Col>
                <Col md={6}>
                  <InputUsuario
                    estado={celularReferencia}
                    cambiarEstado={setCelularReferencia}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'celular de referencia'}
                    msg={"el formato no es valido"}
                    name={'celular_referencia'}
                    importante={false}
                  />
                </Col>

              </div>
              {/* </fieldset> */}
            </div>
          </Row>

        </ModalBody>

        <BackgroundColorContext.Consumer>
          {({ color }) => (
            <div className="text-primary" data={color}></div>
          )}
        </BackgroundColorContext.Consumer>

        <fieldset className="border p-2">
          <legend
            className="float-none w-auto p-2"
            style={{ fontSize: "14px" }}
          >
          </legend>
          <p style={{ color: '#f5365c', textAlign: 'center', fontSize: '11px' }}>
            Para los pacientes recien nacidos no es obligatorio el número de cédula de identidad, pero este se debe actualizar una ves que el paciente obtenga este documento
          </p>
        </fieldset>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
          <div className="hero-section m-1 mt-3 mb-3" >
            <button onClick={() => insertar()} className="btn btn-success" >Registrar</button>
          </div>
        </div>

      </Modal>




      <Modal
        isOpen={modalEdit}
        toggle={() => setModalEdit(!modalEdit)}
        className="modal-md"
      >
        <ModalHeader
          toggle={() => { setModalEdit(!modalEdit); vaciarDatos() }}
        ></ModalHeader>
        <CabeceraFormularios
          nombre={'FORMULARIO DE REGISTRO DE PACIENTE'}
        />
        <ModalBody>
          <Row>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">

              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
                  <InputUsuario
                    estado={ci}
                    cambiarEstado={setCi}
                    ExpresionRegular={INPUT.CI} //expresion regular
                    etiqueta={'Cédula de identidad'}
                    msg={"el formato no es valido"}
                    name={'ci'}
                  />

                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputUsuario
                    estado={ap1}
                    name={'ap1'}
                    cambiarEstado={setAp1}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    etiqueta={'Apellido Paterno'}
                    msg={"el formato no es valido"}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputUsuario
                    estado={ap2}
                    cambiarEstado={setAp2}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    etiqueta={'Apellido Materno'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'ap2'}
                    importante={false}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <InputUsuario
                    estado={nombre}
                    cambiarEstado={setNombre}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    etiqueta={'Nombre completo'}
                    msg={"el formato no es valido"}
                    name={'nombre'}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <InputUsuario
                    estado={fechaNac}
                    cambiarEstado={setFechaNac}
                    tipo="date"
                    ExpresionRegular={INPUT.FECHA} //expresion regular
                    etiqueta={'Fecha de nacimiento'}
                    msg={"el formato no es valido"}
                    frithday={true}
                    name={'fecha_nac'}
                  />
                </div>

                <Col md={4}>
                  <Select1Aux
                    estado={sexo}
                    cambiarEstado={setSexo}
                    ExpresionRegular={INPUT.ID} //expresion regular
                    etiqueta={'Sexo'}
                    lista={[

                      { id: 1, label: 'Masculino' },
                      { id: 2, label: 'Femenino' },
                    ]
                    }
                    msg={"el formato no es valido"}
                    name={'sexo'}
                  />
                </Col>
                <Col md={4}>
                  <InputUsuario
                    estado={celular}
                    cambiarEstado={setCelular}
                    ExpresionRegular={INPUT.TELEFONO} //expresion regular
                    etiqueta={'Celular/Telf'}
                    msg={"el formato no es valido"}
                    name={'celular'}
                  />
                </Col>
                <div className="col-12 ">
                  <InputUsuario
                    estado={ocupacion}
                    cambiarEstado={setOcupacion}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Ocupacion'}
                    msg={"el formato no es valido"}
                    name={'ocupacion'}
                  />
                </div>

                <div className="col-12  ">
                  <Select1
                    estado={comunidad}
                    cambiarEstado={setComunidad}
                    ExpresionRegular={INPUT.DIRECCION} //expresion regular
                    etiqueta={'Comunidad/barrio'}
                    msg={"el formato no es valido"}
                    lista={ListaComunidad}
                    name={'comunidad'}
                    label={setComunidadNombre}
                    importante={false}
                  />
                </div>
                <div className="col-12">
                  <InputUsuario
                    estado={direccion}
                    cambiarEstado={setDireccion}
                    ExpresionRegular={INPUT.DIRECCION} //expresion regular
                    etiqueta={'Direccion'}
                    msg={"el formato no es valido"}
                    name={'direccion'}
                    importante={false}
                  />
                </div>
              </div>
              {/* </fieldset> */}
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              {/* <fieldset className="border p-2">
                <legend
                  className="float-none w-auto p-2"
                  style={{ fontSize: "14px" }}
                >
                  OTROS DATOS
                </legend> */}
              <div className="row">



                <div className="col-12">
                  <InputUsuario
                    estado={antFam}
                    tipo="textarea"
                    cambiarEstado={setAntFam}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Antecedentes familiares'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'ant'}
                    importante={false}
                  />
                </div>

              </div>
              <div className="row">

                <div className="col-12 ">
                  <InputUsuario
                    estado={antPer}
                    cambiarEstado={setAntPer}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    tipo="textarea"
                    etiqueta={'Antecedentes Personales'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'antecper'}
                    importante={false}
                  />
                </div>

                <div className="col-12">
                  <InputUsuario
                    estado={otros}
                    cambiarEstado={setOtros}
                    tipo="textarea"
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Otro'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'otros'}
                    importante={false}
                  />
                </div>
                <Col md={6}>
                  <InputUsuario
                    estado={personaReferencia}
                    cambiarEstado={setPersonaReferencia}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'Persona de referencia'}
                    msg={"el formato no es valido"}
                    important={false}
                    name={'persona_referencia'}
                    importante={false}
                  />
                </Col>
                <Col md={6}>
                  <InputUsuario
                    estado={celularReferencia}
                    cambiarEstado={setCelularReferencia}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                    etiqueta={'celular de referencia'}
                    msg={"el formato no es valido"}
                    name={'celular_referencia'}
                    importante={false}
                  />
                </Col>

              </div>
              {/* </fieldset> */}
            </div>
          </Row>

        </ModalBody>
        <BackgroundColorContext.Consumer>
          {({ color }) => (
            <div className="text-primary" data={color}></div>
          )}
        </BackgroundColorContext.Consumer>

        <fieldset className="border p-2">
          <legend
            className="float-none w-auto p-2"
            style={{ fontSize: "14px" }}
          >
          </legend>
          <p style={{ color: '#f5365c', textAlign: 'center', fontSize: '11px' }}>
            Para los pacientes recien nacidos no es obligatorio el número de cédula de identidad, pero este se debe actualizar una ves que el paciente obtenga este documento
          </p>
        </fieldset>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
          <div className="hero-section m-1 mt-0" >
            <button onClick={() => modificar()} className="btn btn-success" >Actualizar</button>
          </div>
        </div>

      </Modal>





      <Modal isOpen={modal} toggle={() => { setModal(!modal) }} className="modal-lg">
        <BackgroundColorContext.Consumer>
          {({ color }) => (
            <ModalHeader toggle={() => { setModal(!modal) }} className="cabecera-modal" data={color}>
            </ModalHeader>
          )}
        </BackgroundColorContext.Consumer>
        <ModalBody >

          {pacienteData != null && <>



            <div className="titulo-paciente-modal"> DATOS DE {' : ' + pacienteData.nombre + ' ' + pacienteData.ap1 + ' ' + pacienteData.ap2}</div>

            <div className="row" style={{ alignContent: 'center', justifyContent: 'space-around', }}>
              {window.innerWidth > 767 &&
                <Col md={3} >
                  <img className=" user-modal-paciente" src={pacienteData.sexo == 1 ? paciente_masculino_modal : paciente_femenino_modal} />
                </Col>
              }
              <Col md={7} style={{ alignContent: 'center' }}>
                <div className="container-info-paciente-modal">
                  <div className="row">
                    <Col className="label" md={4}>Nombre: </Col>
                    <Col className="content" md={8}><p> {pacienteData.nombre + ' ' + pacienteData.ap1 + ' ' + pacienteData.ap2} </p></Col>
                  </div>
                  <div className="row">
                    <Col className="label" md={4}>Fecha de Nacimiento: </Col>
                    <Col className="content" md={8}><p> {pacienteData.fecha} </p></Col>
                  </div>

                  <div className="row">
                    <Col className="label" md={4}>Edad: </Col>
                    <Col className="content" md={8}><p> {pacienteData.edad} </p></Col>
                  </div>



                  {/* <p style={{ color: 'rgba(34, 42, 66, 0.7)', fontWeight: '800', fontSize: '14px' }}>sexo: <span style={{ fontWeight: '400', fontSize: '14px' }}>  {pacienteData.sexo == 1 ? 'Masculino' : 'Femenino'} </span></p>
                  <p style={{ color: 'rgba(34, 42, 66, 0.7)', fontWeight: '800', fontSize: '14px' }}>Fecha Nac.: <span style={{ fontWeight: '400', fontSize: '14px' }}>  {pacienteData.fecha + ' (' + pacienteData.edad + ')'}  </span></p>

                  <Col className="content" md={8}><p> {pacienteData.ci ? 'C.I. :' + pacienteData.ci : 'C.I. : no tiene'} </p></Col> */}

                </div>
              </Col>
            </div>

            <p className="titulo-info-general-paciente-modal">Información General</p>
            <BackgroundColorContext.Consumer>
              {({ color }) => (
                <div className="text-primary" data={color}> </div>
              )}
            </BackgroundColorContext.Consumer>
            <div className="info-general-paciente-modal">
              <div>
                <div className="row filas-2-info-paciente">
                  <Col md={4} className="label"><p>C.I. </p></Col>
                  <Col md={8} className="content"><p>{pacienteData.ci || 'no tiene'}</p></Col>
                </div>

                <div className="row filas-2-info-paciente">
                  <Col md={4} className="label"><p>Sexo </p></Col>
                  <Col md={8} className="content"><p>{pacienteData.sexo == 1 ? 'Masculino' : 'Femenino'}</p></Col>
                </div>
                <div className="row filas-2-info-paciente">
                  <Col md={4} className="label"><p>Celular </p></Col>
                  <Col md={8} className="content"><p>{pacienteData.celular}</p></Col>
                </div>
                <div className="row filas-2-info-paciente">
                  <Col md={4} className="label"><p>Direccion </p></Col>
                  <Col md={8} className="content"><p>{pacienteData.direccion || '-'}</p></Col>
                </div>
                <div className="row filas-2-info-paciente">
                  <Col md={4} className="label"><p>Comunidad </p></Col>
                  <Col md={8} className="content"><p>{pacienteData.comunidad || '-'}</p></Col>
                </div>


              </div>

              <div>
                <div className="filas-2-info-paciente">
                  Tratamientos
                </div>
              </div>

              <div>
                <div className="filas-2-info-paciente">
                  Diagnosticos
                </div>
              </div>

              <div>
                <div className="filas-2-info-paciente">
                  Ficha Epidemiol+ogica
                </div>
              </div>
            </div>

          </>
          }

        </ModalBody>
      </Modal >



    </>
  );
}


