import React from 'react';

import { Table, Button, Modal, ModalHeader, ModalBody, Row, Form, CardHeader, CardBody, Card, Col } from 'reactstrap';


import useAuth from "Auth/useAuth"
import { ComponenteInputBuscar_, ComponenteInputFile, InputUsuarioStandar, Select1 } from "components/input/elementos";  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de tipos
import { useState, useEffect } from "react";
import { URL, INPUT } from 'Auth/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'


import { BackgroundColorContext } from 'contexts/BackgroundColorContext';
import { API_ENDPOINTS } from './api';
import { start } from 'service';
import { eliminarDB } from 'service';


export default function IEC_FOLLETOS() {

  const auth = useAuth()

  const [listaIEC, setListaIEC] = useState([])  // idTipo de gasto desde la bd
  const [listaCategoria, setListaCategoria] = useState([])  // idTipo de gasto desde la bd

  const [titulo, setTitulo] = useState({ campo: null, valido: null })
  const [descripcion, setDescripcion] = useState({ campo: null, valido: null })


  const [estadoEnvio, setEstadoEnvio] = useState(0);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })  // BUSCADOR DE LA INFORMACION ASIGNACION Y GASTOS


  const [file, setFile] = useState({ campo: null, valido: null })



  useEffect(() => {
    if (inputBuscar.valido === null) listar()
    if (inputBuscar.valido === 'false') listar()

    document.title = 'FOLLETOS IEC'
  }, [])

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







  const listar = async () => {
    const data = await start(API_ENDPOINTS.IEC_FOLLETOS.LISTAR)
    setListaIEC(data[0])
    setListaCategoria(data[1])
    if (data.length === 0) toast.error('No hay registros')
  }



  const insert = async () => {
    try {
      // Validar archivo y campos requeridos
      if (!file) {
        toast.error('Seleccione un PDF');
        return;
      }

      if (titulo.valido !== 'true' || descripcion.valido !== 'true' || inputBuscar.valido !== 'true') {
        toast.error('Complete los campos');
        return;
      }

      if (estadoEnvio !== 0) {
        return;
      }

      setEstadoEnvio(1);

      // Guardar datos en BD
      const datos = {
        titulo: titulo.campo,
        descripcion: descripcion.campo,
        subcategoria: inputBuscar.campo,
      };

      const response = await axios.post(API_ENDPOINTS.IEC_FOLLETOS.GUARDAR, datos);

      if (response.data.ok) {
        setEstadoEnvio(0);
        // Subir archivo PDF
        const formData = new FormData();
        formData.append('resultado', file, file.name);
        formData.append('id', response.data.data);

        const pdfResponse = await axios.post(API_ENDPOINTS.IEC_FOLLETOS.GUARDAR_PDF, formData, {
          params: {
            nombre: response.data.data
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (pdfResponse.data.ok) {
          setModalInsertar(false);
          setEstadoEnvio(0);
          listar();
          toast.success('Registro guardado exitosamente');
        } else {
          setEstadoEnvio(0);
          toast.error(pdfResponse.data.msg);
        }

      } else {
        setEstadoEnvio(0);
        toast.error(response.data.msg);
      }

    } catch (error) {
      setEstadoEnvio(0);
      toast.error('Error al guardar registro');
      console.error(error);
    }
  }




  const eliminarFolleto = async (id) => {
    let ok = window.confirm('Desea eliminar este folleto ?')
    if (ok) {
      await eliminarDB(API_ENDPOINTS.IEC_FOLLETOS.ELIMINAR, { id })
      listar()
    }
  }

  const buscar = async (id) => {
    const data = await start(API_ENDPOINTS.IEC_FOLLETOS.BUSCAR, { id })
    setListaIEC(data)
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
                        FOLLETOS

                      </div>

                      <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className='btn-new' pb={3} onClick={() => setModalInsertar(true)} >
                          {window.innerWidth < 768 ? 'Nuevo' : 'Registro nuevo'}
                        </button >
                      </div>
                    </div>
                  </div>
                )}
              </BackgroundColorContext.Consumer>
            </CardHeader>

            <CardBody style={{ minHeight: '76vh' }}>
              <Col md={5}>
                <Select1
                  estado={inputBuscar}
                  cambiarEstado={setInputBuscar}
                  name="sub_categoria"
                  lista={listaCategoria}
                  ExpresionRegular={INPUT.ID} //expresion regular
                  funcion={buscar}
                />
              </Col>

              <div className="pdf-gallery">
                {listaIEC.map((e, index) => (
                  <div className="pdf-container" style={{
                    opacity: 0,
                    animation: `fadeInUp 0.6s ease forwards ${index * 0.2}s`
                  }}
                  >
                    <div className="pdf-preview">
                      <iframe
                        src={`${URL}pdf/${e.id}.pdf`}
                        title={e.titulo}
                        className="pdf-frame"
                        style={{
                          width: '100%',
                          height: window.innerWidth <= 768 ? '200px' : '250px',
                          border: 'none'
                        }}
                      />
                      <div className="pdf-overlay">
                        <a href={`${URL}pdf/${e.id}.pdf`} target="_blank" rel="noopener noreferrer" className="view-pdf-btn">
                          <i className="tim-icons icon-zoom-split mr-1"></i>
                          Ver PDF
                        </a>
                      </div>
                    </div>
                    <div className="pdf-info">
                      <h3 style={{ marginBottom: '0.5rem' }}>{e.titulo}</h3>
                      <p style={{ marginBottom: '0.5rem' }}>{e.descripcion}</p>
                      <p style={{ marginBottom: '0.5rem' }}>{e.subcategoria}</p>
                      <div className="pdf-metadata">
                        <span className="fecha">
                          <i className="tim-icons icon-calendar-60 mr-1"></i>
                          {new Date(e.fecha).toLocaleDateString('es-ES')}
                        </span>
                        <span className="visualizaciones">
                          <i className="tim-icons icon-eye-2 mr-1"></i>
                          {e.views} visualizaciones
                        </span>

                        <span className="visualizaciones">
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => eliminarFolleto(e.id)}
                            style={{padding: '0.3rem 0.6rem'}}
                          >
                            <i className="tim-icons icon-trash-simple"></i>
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <style>{`
                  .pdf-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                  }

                  .pdf-container {
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: all 0.3s ease;
                  }

                  .pdf-container:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
                  }

                  .pdf-preview {
                    position: relative;
                    background: #f5f5f5;
                    overflow: hidden;
                  }

                  .pdf-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                  }

                  .pdf-container:hover .pdf-overlay {
                    opacity: 1;
                  }

                  .view-pdf-btn {
                    background: #4FC3F7;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    text-decoration: none;
                    font-weight: bold;
                    transform: scale(0.9);
                    transition: all 0.3s ease;
                  }

                  .view-pdf-btn:hover {
                    transform: scale(1);
                    background: #2196F3;
                  }

                  .pdf-info {
                    padding: 1.5rem;
                  }

                  .pdf-info h3 {
                    color: #2c3e50;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                  }

                  .pdf-info p {
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.4;
                    margin-bottom: 1rem;
                  }

                  .pdf-metadata {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: #888;
                  }

                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(20px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }

                  @media (max-width: 768px) {
                    .pdf-gallery {
                      grid-template-columns: 1fr;
                      gap: 1rem;
                      padding: 0.5rem;
                    }

                    .pdf-info {
                      padding: 1rem;
                    }

                    .pdf-info h3 {
                      font-size: 1rem;
                    }

                    .pdf-metadata {
                      flex-direction: column;
                      gap: 0.5rem;
                    }
                  }
                `}</style>
              </div>

            </CardBody>

            <Modal isOpen={modalInsertar}>

              <ModalHeader toggle={() => setModalInsertar(!modalInsertar)}>
                guardar pdf
              </ModalHeader>
              <ModalBody>
                <Form>


                  <InputUsuarioStandar
                    estado={titulo}
                    cambiarEstado={setTitulo}
                    name="titulo"
                    placeholder="TITULO"
                    ExpresionRegular={INPUT.TEXT}  //expresion regular
                    etiqueta='Titulo'
                    msg='Este acepta letras y caracteres'
                  />

                  <InputUsuarioStandar
                    estado={descripcion}
                    cambiarEstado={setDescripcion}
                    name="descripcion"
                    placeholder=" DESCRIPCION"
                    ExpresionRegular={INPUT.TEXT}  //expresion regular
                    etiqueta='Descripcion'
                    msg='Este acepta letra numero letras y caracteres'
                  />
                  <Select1
                    estado={inputBuscar}
                    cambiarEstado={setInputBuscar}
                    name="sub_categoria"
                    lista={listaCategoria}
                    etiqueta='Categoria'
                    ExpresionRegular={INPUT.ID} //expresion regular
                  />

                  <p className='titleGroup'>archivo PDF</p>
                  <div className='col-12'>
                    <ComponenteInputFile 
                      estado={file}
                      cambiarEstado={setFile}
                      name='imagenFile'
                      // etiqueta={'seleccionar imagen'}
                      ExpresionRegular={INPUT.PDF}
                    />
                  </div>
                </Form>
              </ModalBody>
              <div className="boton-modal">
                <Button color="success" onClick={() => insert()}>
                  Guardar
                </Button>
              </div>
            </Modal>



          </Card>
        </Row>
      </div>
    </>
  );


}