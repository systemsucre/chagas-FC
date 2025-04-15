
import React, { useEffect, useState, } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,

} from "reactstrap";

import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'

import { ComponenteInputBuscar_ } from "components/input/elementos";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { LOCAL_URL } from "Auth/config";
import { Link } from "react-router-dom";
import Links from "./links";
import axios from "axios";
import YouTube from "react-youtube";

function Videos() {

  const [lista, setLista] = useState([])

  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });


  useEffect(() => {
    document.title = "VIDEOS-IEC";
    start(URL + '/public/listar-videos').then(json => {
      setLista(json)
    })
  }, []); //fin useEffect

  useEffect(() => {

    return () => { }
  }, [])

  const opts = {
    height: window.innerWidth <= 768 ? '200' : '250',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const buscar = async () => {
    if (inputBuscar.valido === 'true') {
      const data = await buscarDB(URL + '/public/buscar-videos', { dato: inputBuscar.campo })
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
                        VIDEOS
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
              {lista.length > 0 ? (
                <div className="pdf-gallery">
                  {lista.map((e, index) => (
                    <div className="pdf-container" style={{
                      opacity: 0,
                      animation: `fadeInUp 0.6s ease forwards ${index * 0.2}s`
                    }}
                    >

                      <div className="video-container">

                        <YouTube onPlay={() => {
                          axios.post(URL + '/public/contar-visita', { id: e.id })
                          for (let item of lista) {
                            if (item.id === e.id) {
                              item.views++
                            }
                          }
                        }}
                          videoId={e.direccion}
                          opts={opts}
                          onReady={_onReady} />
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
              ) : (
                <div className="text-center">
                  <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>No hay registros</h3>
                </div>
              )}


            </CardBody>

          </Card>
          <Links />

        </Row>
      </div >

    </>

  );
}

export default Videos;
