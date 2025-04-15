
import React, { useEffect, useState } from "react";

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

import {
  InputUsuarioStandar,
  Select1,
} from "components/input/elementos"; // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { URL, INPUT } from "Auth/config";
import useAuth from "Auth/useAuth";
import { buscarDB, start } from 'service'
import { saveDB } from "service";
import toast from "react-hot-toast";
import { editDB } from "service";
import { eliminarDB } from "service";
import { ComponenteInputBuscar_ } from "components/input/elementos";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ComponenteCheckTratamiento } from "./diagnostico/input/elementos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileMedical, faFileMedicalAlt } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const auth = useAuth();
  const [lista, setLista] = useState([]);
  const [listaNivel, setListaNivel] = useState([]);
  const [listaMunicipio, setListaMunicipio] = useState([]);
  const [municipio, setMunicipio] = useState({ campo: null, valido: null });
  const [nivelH, setNivelH] = useState({ campo: null, valido: null });
  const [hospital, setHospital] = useState({ campo: null, valido: null });
  const [id, setId] = useState({ campo: null, valido: null });
  const [codigo, setCodigo] = useState({ campo: null, valido: null });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [estado, setEstado] = useState(null);
  const [estadoEnvio, setEstadoEnvio] = useState(0);
  const [laboratorio, setLaboratorio] = useState(false);


  useEffect(() => {
    document.title = "ESTABLECIMIENTOS";
    setTimeout(async () => {
      if (inputBuscar.valido === null) listar()

      if (inputBuscar.valido === "false") listar()

    }, 200);
  }, [inputBuscar]);







  useEffect(() => {
    listar()
    listarMunicipio()
    listarNivel()
    return () => { }
  }, [])

  const listar = async () => {
    const data = await start(URL + '/hospital/listar')
    setLista(data)
  };

  const listarMunicipio = async () => {
    const data = await start(URL + '/hospital/listar-municipios')
    setListaMunicipio(data)
  };
  const listarNivel = async () => {
    const data = await start(URL + '/hospital/listar-niveles')
    setListaNivel(data)
  };


  const buscar = async () => {

    if (inputBuscar.valido === "true") {
      const data = await buscarDB(URL + '/hospital/buscar', { dato: inputBuscar.campo })
      console.log(data, 'jjje')
      setLista(data)
    }
  };

  const insertar = async () => {
    if (
      municipio.valido === "true" &&
      hospital.valido === "true" &&
      codigo.valido === "true" &&
      nivelH.valido === "true" &&
      estadoEnvio === 0
    ) {
      setEstadoEnvio(1);
      await saveDB(URL + '/hospital/guardar', {
        nombre: hospital.campo,
        municipio: municipio.campo,
        nivel: nivelH.campo,
        laboratorio,
        codigo: codigo.campo
      }, setModalInsertar, setEstadoEnvio)
      listar()
    } else toast.error("Formulario incompleto!");
  };

  const editar = async () => {
    // alert(id.campo)
    if (
      id.valido === 'true' &&
      municipio.valido === "true" &&
      hospital.valido === "true" &&
      nivelH.valido === "true" &&
      estado.valido === 'true' && codigo.valido === 'true'
    ) {
      await editDB(URL + '/hospital/actualizar', {
        id: id.campo,
        nombre: hospital.campo,
        municipio: municipio.campo,
        nivel: nivelH.campo,
        codigo: codigo.campo,
        laboratorio,
        estado: estado.campo
      }, setModalEditar)
      listar()
    } else toast.error("Formulario incompleto!");
  };

  const eliminar = async (id, nombre) => {
    let ok = window.confirm('Eliminar a: ' + nombre + ' ?')
    if (ok) {
      await eliminarDB(URL + '/hospital/eliminar', { id })
      listar()
    }
  };


  const toggle = () => {
    setModalInsertar(!modalInsertar)
  }

  const toggleEdit = () => {
    setModalEditar(false)
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
                        Lista de hospitales

                      </div>

                      <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className='btn-new' pb={3} onClick={() => { setModalInsertar(true); }} >
                          {window.innerWidth < 768 ? 'Nuevo' : 'Registro nuevo'}
                        </button >
                      </div>
                    </div>
                  </div>
                )}
              </BackgroundColorContext.Consumer>
            </CardHeader>

            <CardBody>
              <ComponenteInputBuscar_
                estado={inputBuscar}
                cambiarEstado={setInputBuscar}
                name="inputBuscar"
                ExpresionRegular={INPUT.INPUT_BUSCAR} //expresion regular
                placeholder="Escriba para filtrar ..."
                eventoBoton={buscar}
                etiqueta={"Buscar"}
              />
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th >NOMBRE</th>
                    <th ></th>
                    <th>CODIGO</th>
                    <th>MUNICIPIO</th>
                    <th >ESTADO</th>
                    <th className="text-center">CREACION</th>
                    <th className="text-center">EDITAR</th>
                    <th className="text-center">ELIMINAR</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map(e => (
                    <tr key={e.id}>
                      <td>
                        <div className="tbl-name tbl-bold">{e.nombre}</div>

                        <div className="tbl-des">{e.nivel}</div>
                      </td>
                      <td>  <div className="tbl-name tbl-bold">
                        {e.laboratorio ?
                          <div className="online" style={{ width: '80px', background:'#00aea4' }}>laboratorio</div>:null
                        }
                      </div></td>
                      <td>{e.codigo}</td>
                      <td>
                        <div className="tbl-bold tbl-name">{e.municipio}</div>
                        <div className="tbl-des">{e.red}</div>
                      </td>
                      <td>{e.estado ? <div className="online">online</div> : <div className="delete">delete</div>}</td>
                      <td className="text-center tbl-name tbl-bold">{e.creacion}</td>
                      <td className="text-center">
                        <div className="tbl-edit" onClick={() => {
                          setModalEditar(true);
                          setId({ campo: e.id, valido: 'true' })
                          setCodigo({ campo: e.codigo, valido: 'true' })
                          setHospital({ campo: e.nombre, valido: 'true' })
                          setMunicipio({ campo: e.idmunicipio, valido: 'true' })
                          setNivelH({ campo: e.idnivel, valido: 'true' })
                          setEstado({ campo: e.estado ? 1 : 2, valido: 'true' })
                          setLaboratorio(e.laboratorio)
                        }} >Editar</div>
                      </td>
                      <td className="text-center tbl-bold"><div className="tbl-delete" onClick={() => eliminar(e.id, e.nombre)}>Eliminar</div></td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </CardBody>
          </Card>

        </Row>

      </div>
      <Modal isOpen={modalInsertar} toggle={toggle}>
        <Card>
          <ModalHeader toggle={toggle}>
            Registrar Hospital
          </ModalHeader>
          <ModalBody>
            <Select1
              estado={nivelH}
              cambiarEstado={setNivelH}
              ExpresionRegular={INPUT.ID}
              lista={listaNivel}
              name={"Nivel"}
              etiqueta={"Nivel hospitalario"}
              msg="Seleccione una opcion"
            />
            <Select1
              estado={municipio}
              cambiarEstado={setMunicipio}
              ExpresionRegular={INPUT.ID}
              lista={listaMunicipio}
              name={'Municipio'}
              etiqueta={"Municipio"}
              msg="Seleccione una opcion"
            />
            <InputUsuarioStandar
              estado={hospital}
              cambiarEstado={setHospital}
              name="nombre"
              etiqueta={"Nombre"}
              placeholder="Hospital"
              ExpresionRegular={INPUT.ESTABLECIMIENTO} //expresion regular
              msg={"Este campo acepta letras, numero y algunos caracteres"}
            />
            <InputUsuarioStandar
              estado={codigo}
              cambiarEstado={setCodigo}
              name="codigo"
              etiqueta={"Código"}
              placeholder="Código hospital"
              ExpresionRegular={INPUT.TEXT} //expresion regular
              msg={"Este campo acepta solo numeros"}
            />
            <Col md={12}>
              <ComponenteCheckTratamiento
                label={'Tiene Laboratorio: '}
                label_A='SI'
                label_B='NO '
                estado={laboratorio}
                cambiarEstado={setLaboratorio}
                col={12}
              />
            </Col>
          </ModalBody>

          <div className="boton-modal">
            <Button color="success" onClick={() => insertar()}>
              Guardar
            </Button>
          </div>
        </Card>
      </Modal>
      <Modal isOpen={modalEditar} toggle={toggleEdit}>
        <Card>
          <ModalHeader toggle={toggleEdit}>
            Actualizar Hospital
          </ModalHeader>
          <ModalBody>
            <Select1
              estado={nivelH}
              cambiarEstado={setNivelH}
              ExpresionRegular={INPUT.ID}
              lista={listaNivel}
              name={"Nivel"}
              etiqueta={"Nivel Hospitalario"}

              msg="Seleccione una opcion"
            />
            <Select1
              estado={municipio}
              cambiarEstado={setMunicipio}
              ExpresionRegular={INPUT.ID}
              lista={listaMunicipio}
              name={'Municipio'}
              etiqueta={"Municipio"}


              msg="Seleccione una opcion"
            />

            <InputUsuarioStandar
              estado={hospital}
              cambiarEstado={setHospital}
              name="nombre"
              placeholder="Hospital"
              etiqueta={"Nombre"}

              ExpresionRegular={INPUT.ESTABLECIMIENTO} //expresion regular
              msg={"Este campo acepta letras, numero y algunos caracteres"}
            />
            <InputUsuarioStandar
              estado={codigo}
              cambiarEstado={setCodigo}
              name="codigo"
              etiqueta={"Código"}
              placeholder="Código hospital"
              ExpresionRegular={INPUT.TEXT} //expresion regular
              msg={"Este campo acepta solo numeros"}
            />
            <Col md={12}>
              <ComponenteCheckTratamiento
                label={'Tiene Laboratorio: '}
                label_A='SI'
                label_B='NO '
                estado={laboratorio}
                cambiarEstado={setLaboratorio}
                col={12}
              />
            </Col>
            <Select1
              estado={estado}
              cambiarEstado={setEstado}
              ExpresionRegular={INPUT.ID}
              name={'Estado'}
              etiqueta={"Estado"}

              lista={[{ id: 1, label: 'Online' }, { id: 2, label: 'Deleted' }]}
              msg="Seleccione una opcion"
            />
          </ModalBody>

          <div className="boton-modal">
            <Button color="info" onClick={() => editar()} >
              Actualizar
            </Button>
          </div>
        </Card>
      </Modal>

    </>

  );
}

export default UserProfile;
