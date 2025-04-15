
import React, { useEffect, useState, } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,


} from "reactstrap";
import { useLocation } from "react-router-dom";

import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'

import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { LOCAL_URL } from "Auth/config";
import { Link } from "react-router-dom";
import logo from "assets/img/react-logo.png";
import sedes from "assets/img/sedes.png";
import Links from "./links";



import imagen1 from "../../assets/home/1.jpg";
import imagen2 from "../../assets/home/2.jpg";
import imagen3 from "../../assets/home/3.jpg";
import imagen4 from "../../assets/home/4.jpg";
import imagen5 from "../../assets/home/5.jpg";
import imagen6 from "../../assets/home/6.jpg";

function IEC() {

  const location = useLocation();
  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [render, setRender] = useState(0)
  const [renderMensajes, setRenderMensajes] = useState(0)

  const opts = {
    height: '430px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  useEffect(() => {
    document.title = "IEC";

  }, [render]);




  return (
    <>
      <div className="content" >
        <Row className="main-container" style={{ marginTop: '0' }}>
          <Card >


            <CardBody>


              <div className="row justify-content-center align-items-stretch mb-5" >
                <div className="col-md-8 text-center mb-5">
                  <h3 style={{
                    color: '#2c3e50',
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '2rem'
                  }}>Institucional</h3>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: window.innerWidth < 768 ? '50%' : '20px',
                    transform: window.innerWidth < 768 ? 'translateX(50%)' : 'none',
                    height: '50px'
                  }}>

                  </div>
                  <Link
                    to={LOCAL_URL + '/login'}
                    className="btn btn-lg"
                    style={{
                      border: '2px solid #7f8c8d',
                      color: '#7f8c8d',
                      background: 'none',
                      padding: '0.8rem 2rem',
                      borderRadius: '5px',
                      boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'block',
                      margin: '40px auto',
                      width: 'fit-content'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                    }}
                  >
                    Iniciar Sesión
                  </Link>
                  <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: window.innerWidth < 768 ? '2rem' : '4rem',
                    marginBottom: '1rem',
                  }}>

                    <img
                      src={logo}
                      alt="Cooperación Alemana"
                      style={{
                        height: window.innerWidth < 768 ? '80px' : '100px',
                        objectFit: 'contain',
                        filter: 'grayscale(0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
                      onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(0.2)'}
                    />
                    <img
                      src={sedes}
                      alt="sedes"
                      style={{
                        height: window.innerWidth < 768 ? '80px' : '100px',
                        objectFit: 'contain',
                        filter: 'grayscale(0.2)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
                      onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(0.2)'}
                    />
                  </div>
                </div>

                <div className="col-md-5 mb-4 d-flex">
                  <div style={{
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    borderRadius: '15px',
                    padding: '2rem',
                    boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                  }}>
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>Misión</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      flex: 1
                    }}>
                      Prevenir, controlar y reducir la transmisión de enfermedades vectores dependientes en la población, mediante la implementación de estrategias de salud pública basadas en la educación, la vigilancia epidemiológica, el manejo ambiental, y el acceso oportuno a servicios de salud, con el fin de mejorar la calidad de vida y proteger la salud de las comunidades afectadas
                    </p>
                  </div>
                </div>

                <div className="col-md-5 mb-4 d-flex">
                  <div style={{
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    borderRadius: '15px',
                    padding: '2rem',
                    boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                  }}>
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>Visión</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      flex: 1
                    }}>
                      Ser un referente regional en la prevención y control de enfermedades transmitidas por vectores, logrando comunidades saludables, informadas y protegidas ante estas enfermedades, con un enfoque integral que promueva la sostenibilidad, la participación comunitaria y la cooperación interinstitucional."
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>

          </Card>

          <div className="game-container" style={{
            width: '100%',
            height: '300px',
            position: 'relative',
            background: 'linear-gradient(to bottom, #87CEEB, #E0F7FA)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '2px solid #4FC3F7',
            margin: '70px auto',
            '@media (min-width: 768px)': {
              height: '80vh'
            }
          }}>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 100,
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.9)',
                border: '2px solid #4FC3F7',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              onClick={() => { setRender(render + 1) }}
            >
              Cambiar Mensajes
            </button>

            {[...Array(5)].map((_, i) => {
              const mensajes = [
                "¡Mantén tu casa limpia! 🏠",
                "Revisa las paredes 🔍",
                "¡Protege a tu familia! ❤️",
                "Evita la vinchuca ⚠️",
                "¡Usa mosquiteros! 🛏️",
                "Mantén el orden en casa 📦",
                "Revisa detrás de cuadros 🖼️",
                "Limpia regularmente 🧹",
                "¡Alerta a tus vecinos! 👥",
                "Sella grietas en paredes 🏗️",
                "Mantén el patio limpio 🌿",
                "Revisa antes de dormir 🌙",
                "¡Educación es prevención! 📚",
                "Consulta al médico 👨‍⚕️",
                "Fumiga periódicamente 🌫️",
                "Mantén animales fuera 🐾",
                "Revisa rincones oscuros 🔦",
                "¡Unidos contra Chagas! 💪",
                "Salud es bienestar 💚",
                "¡Prevenir es vivir! ✨"
              ];

              let randomX = Math.random() * 90 + 5;
              let randomMessage = mensajes[i % mensajes.length];
              let randomDelay = Math.random() * 16;

              return (
                <div key={i} className="floating-message" style={{
                  position: 'absolute',
                  left: `${randomX}%`,
                  bottom: '-50px',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: `floatUpward 16s linear infinite, wobble 3s ease-in-out infinite`,
                  animationDelay: `${randomDelay}s`
                }}
                  onClick={() => {
                    randomMessage = mensajes[i % mensajes.length]
                  }}
                >
                  {/* <div className="icon-container" style={{
                        width: '80px',
                        height: '80px',
                        backgroundImage: `url(${logo})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        marginBottom: '12px',
                        animation: 'spin 6s linear infinite'
                      }}>

                      </div> */}
                  <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '12px 24px',
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                    animation: 'pulse 2.5s ease-in-out infinite',
                    '@media (min-width: 768px)': {
                      fontSize: '18px',
                      padding: '15px 30px'
                    }
                  }}>
                    {randomMessage}
                  </div>
                </div>
              );
            })}

            <style>{`
                  @keyframes floatUpward {
                    0% {
                      transform: translateX(-50%) translateY(0);
                      bottom: -50px;
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      transform: translateX(-50%) translateY(0);
                      bottom: 110%;
                      opacity: 0;
                    }
                  }

                  @keyframes wobble {
                    0%, 100% { transform: translateX(-50%) rotate(-5deg); }
                    50% { transform: translateX(-50%) rotate(5deg); }
                  }

                  @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }

                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                    100% { transform: scale(1); }
                  }

                  .game-container:hover .floating-message {
                    animation-play-state: paused;
                  }

                  @media (min-width: 768px) {
                    .floating-message {
                      font-size: 16px;
                    }
                  }
                `}</style>
          </div>

          <Links />
{/* 
          <div className="col-md-10 m-auto row justify-content-center mt-5">
            <div className="col-12 mb-4 mt-5">
              <div className="image-card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: '15px',
                padding: '1.5rem',
                paddingLeft: '0',
                paddingRight: '0',
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                transition: 'transform 0.3s ease'
              }}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img
                      src={imagen1}
                      alt="Capacitación comunitaria"
                      className="img-fluid rounded"
                      style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    />
                  </div>
                  <div className="col-md-4 m-auto mt-3 mt-md-0">
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>Capacitación Comunitaria</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>Fortaleciendo lazos y conocimientos en nuestra comunidad a través de talleres interactivos.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="image-card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: '15px',
                padding: '1.5rem',
                paddingLeft: '0',
                paddingRight: '0',
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                transition: 'transform 0.3s ease'
              }}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img
                      src={imagen2}
                      alt="Actividades educativas"
                      className="img-fluid rounded"
                      style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    />
                  </div>
                  <div className="col-md-4 m-auto mt-3 mt-md-0">
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>Actividades Educativas</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>Espacios de aprendizaje dinámico donde la teoría se encuentra con la práctica.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="image-card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: '15px',
                padding: '1.5rem',
                paddingLeft: '0',
                paddingRight: '0',
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                transition: 'transform 0.3s ease'
              }}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img
                      src={imagen3}
                      alt="Desarrollo sostenible"
                      className="img-fluid rounded"
                      style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    />
                  </div>
                  <div className="col-md-4 m-auto mt-3 mt-md-0">
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>Desarrollo Sostenible</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>Implementando prácticas eco-amigables para un futuro más verde y sostenible.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="image-card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: '15px',
                padding: '1.5rem',
                paddingLeft: '0',
                paddingRight: '0',
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                transition: 'transform 0.3s ease'
              }}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img
                      src={imagen4}
                      alt="Innovación social"
                      className="img-fluid rounded"
                      style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    />
                  </div>
                  <div className="col-md-4 m-auto mt-3 mt-md-0">
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>Innovación Social</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>Creando soluciones creativas para los desafíos de nuestra sociedad.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="image-card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: '15px',
                padding: '1.5rem',
                paddingLeft: '0',
                paddingRight: '0',
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                transition: 'transform 0.3s ease'
              }}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img
                      src={imagen5}
                      alt="Inclusión y diversidad"
                      className="img-fluid rounded"
                      style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    />
                  </div>
                  <div className="col-md-4 m-auto mt-3 mt-md-0">
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>Inclusión y Diversidad</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>Celebrando nuestras diferencias y construyendo puentes de entendimiento.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="image-card" style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: '15px',
                padding: '1.5rem',
                paddingLeft: '0',
                paddingRight: '0',
                boxShadow: '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
                transition: 'transform 0.3s ease'
              }}>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img
                      src={imagen6}
                      alt="Colaboración internacional"
                      className="img-fluid rounded"
                      style={{ width: '100%', objectFit: 'cover', height: '300px' }}
                    />
                  </div>
                  <div className="col-md-4 m-auto mt-3 mt-md-0">
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>Colaboración Internacional</h4>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      lineHeight: '1.6'
                    }}>Uniendo esfuerzos globales para crear impacto local significativo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <style>{`
                .image-card:hover {
                    transform: translateY(-5px);
                }
                
                .image-card img {
                    transition: transform 0.3s ease;
                }
                
                .image-card:hover img {
                    transform: scale(1.05);
                }
            `}</style>
        </Row>
      </div >
    </>

  );
}

export default IEC;
