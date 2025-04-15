
// reactstrap components
import {
    Card,
    CardBody,


} from "reactstrap";

import { LOCAL_URL } from "Auth/config";
import { Link } from "react-router-dom";
import norsud from "../../assets/img/norsud.png";
import dahw from "../../assets/img/dahw.png";
import cooperacion from "../../assets/img/alemania.png";



function Links() {


    return (
        <>
            <Card>

                <CardBody>


                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#1e1e2f', // Color oscuro que combina con el tema Black Dashboard
                        textAlign: 'center',
                        margin: '2rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        textShadow: '2px 2px 4px rgba(255,255,255,0.1)', // Sombra sutil para contraste
                        animation: 'fadeIn 1s ease-out'
                    }}>VIDEOS FOTOGRAFIAS Y FOLLETOS</p>

                    <div className="row mb-4">
                        <div className="col-md-4" style={{ animation: 'fadeInLeft 0.8s ease-out' }}>
                            <Link to={LOCAL_URL + '/videos'} style={{ textDecoration: 'none' }}>

                                <div className="card h-100 p-2" style={{
                                    background: 'linear-gradient(to bottom right, #ffffff, #f0f9ff)',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    border: '1px solid #e3f2fd'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                    }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: '#0277bd', fontWeight: 'bold', marginBottom: '1rem', animation: 'slideDown 0.5s ease-out' }}>mostrar este mensaje</h5>
                                        <p className="card-text" style={{ color: '#546e7a', lineHeight: '1.6', animation: 'fadeIn 1s ease-out' }}>Material audiovisual sobre prevención y control de la enfermedad de Chagas</p>
                                        <div className="text-center" style={{ animation: 'pulse 2s infinite' }}>
                                            <i className="tim-icons icon-video-66" style={{ fontSize: "3rem", color: '#039be5' }}></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                            <Link to={LOCAL_URL + '/folletos'} style={{ textDecoration: 'none' }}>

                                <div className="card h-100 p-2" style={{
                                    background: 'linear-gradient(to bottom right, #ffffff, #f3e5f5)',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    border: '1px solid #e1bee7'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                    }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: '#7b1fa2', fontWeight: 'bold', marginBottom: '1rem', animation: 'slideDown 0.5s ease-out' }}>mostrar este mensaje</h5>
                                        <p className="card-text" style={{ color: '#546e7a', lineHeight: '1.6', animation: 'fadeIn 1s ease-out' }}>Documentos y guías sobre medidas preventivas y cuidados de la salud</p>
                                        <div className="text-center" style={{ animation: 'pulse 2s infinite' }}>
                                            <i className="tim-icons icon-book-bookmark" style={{ fontSize: "3rem", color: '#8e24aa' }}></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                        <div className="col-md-4" style={{ animation: 'fadeInRight 0.8s ease-out' }}>
                            <Link to={LOCAL_URL + '/fotografias'} style={{ textDecoration: 'none' }}>

                                <div className="card h-100 p-2" style={{
                                    background: 'linear-gradient(to bottom right, #ffffff, #e8f5e9)',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    border: '1px solid #c8e6c9'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                    }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: '#2e7d32', fontWeight: 'bold', marginBottom: '1rem', animation: 'slideDown 0.5s ease-out' }}>mostrar este mensaje</h5>
                                        <p className="card-text" style={{ color: '#546e7a', lineHeight: '1.6', animation: 'fadeIn 1s ease-out' }}>Fotografías e ilustraciones educativas sobre la enfermedad</p>
                                        <div className="text-center" style={{ animation: 'pulse 2s infinite' }}>
                                            <i className="tim-icons icon-image-02" style={{ fontSize: "3rem", color: '#43a047' }}></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="sponsor-section">
                <p className="sponsor-title">
                    Con el apoyo de
                </p>
                <p className="sponsor-content">
                    <span className="sponsor-item sponsor-aleman">Cooperación Alemana</span>
                    <span>,</span>
                    <span className="sponsor-item sponsor-bmz">DAHW</span>
                    <span>y</span>
                    <span className="sponsor-item sponsor-norsud">Fundación Intercultural Nor Sud</span>
                </p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                margin: 'auto',
                // flexWrap: 'wrap'
            }}>
                <img
                    src={cooperacion}
                    alt="Cooperación Alemana"
                    style={{
                        height: '80px',
                        objectFit: 'contain',
                        filter: 'grayscale(0.2)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(0.2)'}
                />
                <img
                    src={dahw}
                    alt="DAHW"
                    style={{
                        height: '80px',
                        objectFit: 'contain',
                        filter: 'grayscale(0.2)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(0.2)'}
                />

                <img
                    src={norsud}
                    alt="Fundación Intercultural Nor Sud"
                    style={{
                        height: '80px',
                        objectFit: 'contain',
                        filter: 'grayscale(0.2)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(0.2)'}
                />

            </div>

            <style>
                {`
                .sponsor-section {
                    margin: 3rem auto;
                    // padding: 2rem;
                    border-radius: 12px;
                    text-align: center;
                    width: 100%;
                    max-width: 1200px;
                    // background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    // box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    animation: fadeIn 1.2s ease-out;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.18);
                }

                .sponsor-title {
                    font-size: 1rem;
                    color: #1a237e;
                    font-weight: 600;
                    letter-spacing: 0.8px;
                    line-height: 1.8;
                    margin: 0 auto 1.5rem;
                    width: 100%;
                    max-width: 800px;
                    font-family: "Poppins", "Segoe UI", Roboto, Arial;
                    border-bottom: 2px solid rgba(26,35,126,0.2);
                    padding-bottom: 1.5rem;
                    text-transform: uppercase;
                    text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
                }

                .sponsor-content {
                    font-size: 1rem;
                    color: #37474f;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    line-height: 2;
                    margin: 0 auto;
                    width: 100%;
                    max-width: 800px;
                    font-family: "Poppins", "Segoe UI", Roboto, Arial;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                }

                .sponsor-item {
                    font-weight: 700;
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }

                .sponsor-norsud {
                    color: #f57c00;
                    background: rgba(245,124,0,0.1);
                    animation: pulse 2.5s infinite;
                }

                .sponsor-bmz {
                    color: #d32f2f;
                    background: rgba(211,47,47,0.1);
                    animation: pulse 2.5s infinite 0.8s;
                }

                .sponsor-aleman {
                    color: #212121;
                    background: rgba(33,33,33,0.1);
                    animation: pulse 2.5s infinite 1.6s;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}
            </style>



        </>

    );
}

export default Links;
