
import React, { useEffect, useState, } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Modal,
  ModalHeader,
  Button,


} from "reactstrap";

import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { LOCAL_URL } from "Auth/config";
import { Link } from "react-router-dom";
import Links from "./links";
import axios from "axios";
import { ComponenteInputBuscar_ } from "components/input/elementos";

function Fotografias() {

  const [modalInsertar, setModalInsertar] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [count, setCount] = useState(0);
  const [lista, setLista] = useState([])
  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })  // BUSCADOR DE LA INFORMACION ASIGNACION Y GASTOS


  useEffect(() => {
    document.title = "FOTOGRAFIAS-IEC";

    start(URL + '/public/listar-imagenes').then(json => {
      setLista(json)
    })
    return () => { }
  }, []);

  const buscar = async () => {
    if (inputBuscar.valido === 'true') {
      const data = await buscarDB(URL + '/public/buscar-imagenes', { dato: inputBuscar.campo })
      setLista(data)
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
                        FOTOGRAFIAS
                      </div>

                      <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                        <Link className='btn-new' pb={3} to={LOCAL_URL + '/login'} >
                          {window.innerWidth < 768 ? 'ir a ETV' : 'Ir al sistema ETV'}
                        </Link >
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
              <div className="photo-gallery">
                {/* Galería de imágenes */}
                {
                  lista.map((_, index) => (
                    <div key={index} className="photo-item" onClick={() => {
                      setModalInsertar(true); setImagen(_);
                      axios.post(URL + '/public/contar-visita', { id: _.id })
                      for (let item of lista) {
                        if (item.id === _.id) {
                          item.views++
                        }
                      }
                    }}>
                      <div className="image-container">
                        <img 
                          src={`${URL}/imagenes/${_.id}.png`} 
                          alt={`Descripción ${index + 1}`}
                          onMouseMove={(e) => {
                            const img = e.target;
                            const rect = img.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            img.style.transformOrigin = `${x}% ${y}%`;
                            img.style.transform = 'scale(4)';
                          }}
                          onMouseLeave={(e) => {
                            const img = e.target;
                            img.style.transform = 'scale(1)';
                          }}
                          style={{
                            transition: 'transform 0.3s ease-out',
                            cursor: 'crosshair'
                          }}
                          // style={{
                          //   width: '100%',
                          //   height: 'auto',
                          //   maxHeight: '80vh',
                          //   objectFit: 'contain',
                          //   border: 'none',
                          //   padding: 0,
                          //   margin: 0,
                          //   boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                          //   cursor: 'crosshair'
                          // }}
                        />
                      </div>
                      <div className="video-info">
                        <h3 style={{ fontSize: '0.9rem' }}>{_.titulo}</h3>
                        <p style={{ fontSize: '0.8rem' }}>{_.descripcion}</p>
                        <div className="video-metadata">
                          <span className="fecha" style={{ fontSize: '0.75rem' }}>
                            <i className="tim-icons icon-calendar-60 mr-1"></i>
                            {new Date(_.fecha).toLocaleDateString('es-ES')}
                          </span>
                          <span className="visualizaciones" style={{ fontSize: '0.75rem' }}>
                            <i className="tim-icons icon-eye-2 mr-1"></i>
                            {_.views} visualizaciones
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                <style>{`
                  .photo-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1rem;
                    padding: 0.3rem;
                  }

                  .photo-item {
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                  }

                  .photo-item:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
                  }

                  .image-container {
                    overflow: hidden;
                    position: relative;
                  }

                  .photo-item img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    display: block;
                    transition: all 0.5s ease;
                  }

                  .photo-item:hover img {
                    transform: scale(1.2);
                  }

                  .zoom-lens {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: rgba(255,255,255,0.4);
                    border: 2px solid #fff;
                    border-radius: 50%;
                    pointer-events: none;
                    display: none;
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);
                  }

                  .image-container:hover .zoom-lens {
                    display: block;
                  }

                  .image-container:hover {
                    cursor: zoom-in;
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
                `}</style>
              </div>


            </CardBody>

          </Card>
          <Links />

        </Row>
      </div >

      <Modal
        isOpen={modalInsertar}
        toggle={() => setModalInsertar(false)}
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
          toggle={() => setModalInsertar(false)}
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
          backgroundColor: 'transparent'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}>
            <img
              src={URL + '/imagenes/' + imagen?.id + '.png'} 
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
          </div>
        </div>
        <div className="boton-modal" style={{ backgroundColor: 'transparent', border: 'none' }}>
          <Button
            color="light"
            onClick={() => setModalInsertar(false)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid white'
            }}
          >
            CERRAR
          </Button>
        </div>
      </Modal>

    </>

  );
}

export default Fotografias;
