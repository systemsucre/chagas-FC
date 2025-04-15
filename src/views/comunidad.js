
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
import { buscarDB, start } from 'service'
import { saveDB } from "service";
import { editDB } from "service";
import { eliminarDB } from "service";
import { ComponenteInputBuscar_ } from "components/input/elementos";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

function Comunidad() {


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [lista, setLista] = useState([]);
  const [listaHospital, setListaHospital] = useState([]);
  const [listaMunicipio, setListaMunicipio] = useState([]);
  const [municipio, setMunicipio] = useState({ campo: null, valido: null });
  const [comunidad, setComunidad] = useState({ campo: null, valido: null });
  const [codigo, setCodigo] = useState({ campo: null, valido: null });
  const [hospital, setHospital] = useState({ campo: null, valido: null });
  const [id, setId] = useState({ campo: null, valido: null });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [estado, setEstado] = useState(null);
  const [estadoEnvio, setEstadoEnvio] = useState(0);


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
    return () => { }
  }, [])

  const listar = async () => {
    const data = await start(URL + '/comunidad/listar')
    setLista(data)
  };

  const listarMunicipio = async () => {
    const data = await start(URL + '/comunidad/listar-municipios')
    setListaMunicipio(data)
  };
  const listarHospital = async (id) => {
    const data = await start(URL + '/comunidad/listar-est', { id })
    setListaHospital(data)
  };


  const buscar = async () => {

    if (inputBuscar.valido === "true") {
      const data = await buscarDB(URL + '/comunidad/buscar', { dato: inputBuscar.campo })
      setLista(data)
    }
  };



  const insertar = async () => {
    if (estadoEnvio === 0) {
      setEstadoEnvio(1);
      await saveDB(URL + '/comunidad/guardar', {
        hospital: hospital.campo,
        municipio: municipio.campo,
        comunidad: comunidad.campo,
        codigo: codigo.campo,
      }, setModalInsertar, setEstadoEnvio)
      listar()
    }
  };

  const editar = async () => {

    console.log(hospital)
    await editDB(URL + '/comunidad/actualizar', {
      id: id.campo,
      comunidad: comunidad.campo,
      codigo: codigo.campo,
      municipio: municipio.campo,
      hospital: hospital.campo,
      estado: estado.campo
    }, setModalEditar)
    listar()
  };

  const eliminar = async (id, nombre) => {
    let ok = window.confirm('Eliminar a: ' + nombre + ' ?')
    if (ok) {
      await eliminarDB(URL + '/comunidad/eliminar', { id })
      listar()
    }
  };


  const toggle = () => {
    setModalInsertar(!modalInsertar)
    setMunicipio({ campo: null, valido: null })
    setListaHospital([])
  }

  const toggleEdit = () => {
    setModalEditar(false)
    setMunicipio({ campo: null, valido: null })
    setListaHospital([])
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
                        Lista de comunidades

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
                    <th >CODIGO</th>
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
                        <div className="tbl-des">{e.hospital}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{e.codigo}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{e.municipio}</div>
                        <div className="tbl-des">{e.red}</div>
                      </td>
                      <td>{e.estado ? <div className="online">online</div> : <div className="delete">delete</div>}</td>
                      <td className="text-center tbl-name tbl-bold">{e.creacion}</td>
                      <td className="text-center">
                        <div className="tbl-edit" onClick={() => {
                          setModalEditar(true);
                          setId({ campo: e.id, valido: 'true' })
                          setHospital({ campo: e.idhospital, valido: 'true' })
                          setMunicipio({ campo: e.idmunicipio, valido: 'true' })
                          setComunidad({ campo: e.nombre, valido: 'true' })
                          setCodigo({ campo: e.codigo, valido: 'true' })
                          setEstado({ campo: e.estado ? 1 : 2, valido: 'true' })
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
            <Form>

              <Select1
                estado={municipio}
                cambiarEstado={setMunicipio}
                ExpresionRegular={INPUT.ID}
                lista={listaMunicipio}
                name={'Municipio'}
                etiqueta={"Municipio"}
                msg="Seleccione una opcion"
                funcion={listarHospital}
              />

              <Select1
                estado={hospital}
                cambiarEstado={setHospital}
                ExpresionRegular={INPUT.ID}
                lista={listaHospital}
                name={"hospital"}
                etiqueta={"Hospital/establecimiento"}
                msg="Seleccione una opcion"
              />
              <InputUsuarioStandar
                estado={comunidad}
                cambiarEstado={setComunidad}
                name="nombre"
                etiqueta={"Nombre"}
                placeholder="Comunidad"
                ExpresionRegular={INPUT.ESTABLECIMIENTO} //expresion regular
                msg={"Este campo acepta letras, numero y algunos caracteres"}
              />

              <InputUsuarioStandar
                estado={codigo}
                cambiarEstado={setCodigo}
                name="codigo"
                etiqueta={"Codigo"}
                placeholder="CODIGO"
                ExpresionRegular={INPUT.CODIGO_ENTIDAD} //expresion regular
                msg={"Este campo acepta letras, numeros de 5 dígitos"}
              />

            </Form>

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
              estado={municipio}
              cambiarEstado={setMunicipio}
              ExpresionRegular={INPUT.ID}
              lista={listaMunicipio}
              name={'Municipio'}
              etiqueta={"Municipio"}
              msg="Seleccione una opcion"
              funcion={listarHospital}
            />
            <Select1
              estado={hospital}
              cambiarEstado={setHospital}
              ExpresionRegular={INPUT.ID}
              lista={listaHospital}
              name={"hospital"}
              etiqueta={"Hospital/establecimiento"}
              msg="Seleccione una opcion"
            />

            <InputUsuarioStandar
              estado={comunidad}
              cambiarEstado={setComunidad}
              name="nombre"
              etiqueta={"Nombre"}
              placeholder="Comunidad"
              ExpresionRegular={INPUT.ESTABLECIMIENTO} //expresion regular
              msg={"Este campo acepta letras, numero y algunos caracteres"}
            />
            <InputUsuarioStandar
              estado={codigo}
              cambiarEstado={setCodigo}
              name="codigo"
              etiqueta={"Codigo"}
              placeholder="CODIGO"
              ExpresionRegular={INPUT.CODIGO_ENTIDAD} //expresion regular
              msg={"Este campo acepta letras, numeros de 5 dígitos"}
            />
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

export default Comunidad;
