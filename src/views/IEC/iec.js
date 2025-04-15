import React from 'react';

import { Table, Button, Modal, ModalHeader, ModalBody, Row, Form, CardHeader, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEye, faImage, faList, faTrashAlt, } from '@fortawesome/free-solid-svg-icons';

import useAuth from "Auth/useAuth"
import { ComponenteInputBuscar_, ComponenteInputFile, InputUsuarioStandar, } from "components/input/elementos";  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de tipos
import { useState, useEffect } from "react";
import { URL, INPUT } from 'Auth/config';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'


import Compressor from 'compressorjs';
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';
import { saveDB } from 'service';
import { API_ENDPOINTS } from './api';
import { start } from 'service';
import { saveDB_IMG, eliminarDB } from 'service';
import { buscarDB } from 'service';


export default function IEC_IMAGE() {

  const auth = useAuth()

  const [listaIEC, setListaIEC] = useState([])  // idTipo de gasto desde la bd

  const [id, setId] = useState({ campo: null, valido: null })
  const [titulo, setTitulo] = useState({ campo: null, valido: null })
  const [descripcion, setDescripcion] = useState({ campo: null, valido: null })
  const [imagen, setImagen] = useState(null);
  const [modalImagen, setModalImagen] = useState(false);


  const [estadoEnvio, setEstadoEnvio] = useState(0);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })  // BUSCADOR DE LA INFORMACION ASIGNACION Y GASTOS


  const [file, setFile] = useState({ campo: null, valido: null })



  useEffect(() => {
    if (inputBuscar.valido === null) listar()
    if (inputBuscar.valido === 'false') listar()

    document.title = 'IMAGENES IEC'
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
    const data = await start(API_ENDPOINTS.IEC_IMAGENES.LISTAR)
    setListaIEC(data)
    if (data.length === 0) toast.error('No hay registros')
  }




  const insert = async () => {

    console.log(file.size, 'imagen cargado')
    let calidad = null
    if (file.size < 500000)
      calidad = 0.1
    if (file.size < 1000000)
      calidad = 0.9
    if (file.size > 1000000)
      calidad = 0.6
    if (file.size > 3000000)
      calidad = 0.3
    if (file.size > 5000000)
      calidad = 0.2
    // console.log(calidad, "calidad de la imagen")

    // console.log(estadoCheck, 'tipo de la factura')
    if (!file) {
      toast.error('Seleccione una imagen'); return
    }
    if (titulo.valido === 'true' && descripcion.valido === 'true' && estadoEnvio === 0) {
      setEstadoEnvio(1)
      await saveDB_IMG(API_ENDPOINTS.IEC_IMAGENES.GUARDAR, {
        titulo: titulo.campo,
        descripcion: descripcion.campo

      }, setModalInsertar, setEstadoEnvio).then(json => {
        if (json) {
          new Compressor(file, {
            quality: calidad,
            success(result) {
              const formData = new FormData();
              formData.append('resultado', result, result.name);


              axios.post(URL + '/iec/guardar-imagen-file', formData, {
                params: {
                  nombre: json
                }
              }).then(j => {
                if (j.data.ok) {
                  listar()
                  toast.success(j.data.msg)
                } else { toast.error(j.data.msg); setEstadoEnvio(0) }
              })

            },
            error(err) { toast.error('Error al procesar imagen') },
          });
        }
      })
    } else {
      toast.error('Complete los campos')
    }
  }


  const eliminarImagen = async () => {
    let ok = window.confirm('Desea eliminar esta imagen ?')
    if (ok) {
      await eliminarDB(API_ENDPOINTS.IEC_IMAGENES.ELIMINAR, { id: imagen.id })
      listar()
      setImagen(null)
      setModalImagen(false)
    }
  }

  const buscar = async () => {
    if (inputBuscar.valido === 'true') {
      const data = await buscarDB(API_ENDPOINTS.IEC_IMAGENES.BUSCAR, { dato: inputBuscar.campo })
      setListaIEC(data)
    }
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
                        IMAGENES

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

              <div className="image-gallery">

                {listaIEC.map((item, index) => (
                  <div className="gallery-item" key={index}>
                    <div className="image-container">
                      <img
                        src={URL + 'imagenes/' + item.id + '.png'}
                        alt="Imagen 1"
                        className="gallery-image"
                        onClick={() => {
                          setImagen(item)
                          setModalImagen(true)
                        }}
                        onMouseMove={(e) => {
                          const img = e.target;
                          const rect = img.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          img.style.transformOrigin = `${x}% ${y}%`;
                          img.style.transform = 'scale(3.5)';
                        }}
                        onMouseLeave={(e) => {
                          const img = e.target;
                          img.style.transform = 'scale(1)';
                        }}
                      
                        style={{
                          cursor: 'crosshair',
                        }}
                      />
                      <div className="video-info">
                        <h3 style={{ fontSize: '0.9rem' }}>{item.titulo}</h3>
                        <p style={{ fontSize: '0.8rem' }}>{item.descripcion}</p>
                        <div className="video-metadata">
                          <span className="fecha" style={{ fontSize: '0.75rem' }}>
                            <i className="tim-icons icon-calendar-60 mr-1"></i>
                            {new Date(item.fecha).toLocaleDateString('es-ES')}
                          </span>
                          <span className="visualizaciones" style={{ fontSize: '0.75rem' }}>
                            <i className="tim-icons icon-eye-2 mr-1"></i>
                            {item.views} visualizaciones
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              <style>
                {`
                  .image-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 6px;
                  }

                  .gallery-item {
                    position: relative;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                  }

                  .gallery-item:hover {
                    transform: translateY(-5px);
                  }

                  .image-container {
                    position: relative;
                    aspect-ratio: 16/9;
                    width: 100%;
                  }

                  .gallery-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                  }

                 .video-info {
                    padding: 1.5rem;
                  }

                  .video-info h3 {
                    color: #2c3e50;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                  }

                  .video-info p {
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.4;
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
                    .video-gallery {
                      grid-template-columns: 1fr;
                      gap: 1rem;
                      padding: 0.5rem;
                    }

                    .video-info {
                      padding: 1rem;
                    }

                    .video-info h3 {
                      font-size: 1rem;
                    }

                    .video-info p {
                      font-size: 0.8rem;
                    }

                    .video-metadata {
                      flex-direction: column;
                      gap: 0.5rem;
                    }
                  }
                `}
              </style>
            </CardBody>

            <Modal isOpen={modalInsertar}>

              <ModalHeader toggle={() => setModalInsertar(!modalInsertar)}>
                guardar imagen
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


                  <p className='titleGroup'>Foto del archivo</p>
                  <div className='col-12'>
                    <ComponenteInputFile
                      estado={file}
                      cambiarEstado={setFile}
                      name='imagenFile'
                      // etiqueta={'seleccionar imagen'}
                      ExpresionRegular={INPUT.IMG}
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



            <Modal
              isOpen={modalImagen}
              toggle={() => {
                setImagen(null)
                setModalImagen(false)
              }}
              className="modal-lg"
              style={{
                backgroundColor: 'rgba(0,0,0,0.9)',

              }}
            >
              <style>{`
                      .white-content .modal-content {
                        background-color: transparent !important;
                      }
                          .modal-content .modal-header .modal-title{
                          color: #fff !important;
                        }
                          .modal .modal-header .close {
                            color: white !important;
                            text-shadow: none;
                          }
                  `}</style>
              <ModalHeader
                toggle={() => {
                  setImagen(null)
                  setModalImagen(false)
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: '#fff !important',
                  border: 'none',
                }}
              >

                {imagen?.titulo}
              </ModalHeader>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                backgroundColor: 'transparent'
              }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={URL + 'imagenes/' + imagen?.id + '.png'}
                    alt={`Descripción ${imagen?.titulo}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                      cursor: 'crosshair'
                    }}
                    onMouseMove={(e) => {
                      const img = e.target;
                      const rect = img.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      img.style.transformOrigin = `${x}% ${y}%`;
                      img.style.transform = 'scale(2.5)';
                    }}
                    onMouseLeave={(e) => {
                      const img = e.target;
                      img.style.transform = 'scale(1)';
                    }}
                  />
                  <Button
                    color="danger"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '40%',
                      opacity: 0.8
                    }}
                    onClick={() => {
                      eliminarImagen()
                    }}
                  >
                    <i className="tim-icons icon-trash-simple"></i> Eliminar
                  </Button>
                </div>
              </div>

            </Modal>

          </Card>
        </Row>
      </div>
    </>
  );


}