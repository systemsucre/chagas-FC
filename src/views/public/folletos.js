
import React, { useEffect, useState, } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col

} from "reactstrap";
import YouTube from 'react-youtube';
import {
  InputUsuarioStandar,
  Select1,
} from "components/input/elementos"; // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { URL, INPUT } from "Auth/config";
import useAuth from "Auth/useAuth";
import { buscarDB, start } from 'service'

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { LOCAL_URL } from "Auth/config";
import { Link } from "react-router-dom";
import logo from "assets/img/react-logo.png";
import Links from "./links";
import axios from "axios";

function Folletos() {

  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [lista, setLista] = useState([])
  const [listaCategoria, setListaCategoria] = useState([])  // idTipo de gasto desde la bd


  const opts = {
    height: '250px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  useEffect(() => {
    document.title = "FOLLETOS-IEC";
    start(URL + '/public/listar-folletos').then(json => {
      setLista(json[0])
      setListaCategoria(json[1])
    })
  }, []);

  useEffect(() => {

    return () => { }
  }, [])


  const buscar = async (id) => {
      const data = await buscarDB(URL + '/public/buscar-folletos', {  id })
      setLista(data)
  };



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

              {lista.length > 0 ? (
                <div className="pdf-gallery">
                  {lista.map((e, index) => (
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
                          <a href={`${URL}pdf/${e.id}.pdf`} target="_blank" rel="noopener noreferrer" className="view-pdf-btn" onClick={() => {
                            axios.post(URL + '/public/contar-visita', { id: e.id })
                            for (let item of lista) {
                              if (item.id === e.id) {
                                item.views++
                              }
                            }
                          }}>
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
                <div className="text-center" style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <h3>No hay folletos disponibles</h3>
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

export default Folletos;
