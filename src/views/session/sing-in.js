
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,


} from "reactstrap";

import { toast } from 'react-hot-toast';
import axios from 'axios';
import md5 from 'md5';

import { INPUT, LOCAL_URL, URL } from "Auth/config";
import useAuth from "Auth/useAuth";
import { InputUsuarioLogin } from "components/input/elementos";

function Login() {

  const [usuario, setUsuario] = useState({ campo: null, valido: null })
  const [password, setPassword] = useState({ campo: null, valido: null })
  const auth = useAuth()

  const iniciarSesion = async () => {
    if (usuario.valido === 'true' && password.valido === 'true') {

      axios.get(URL, {
        params: {
          'intel': usuario.campo,
          'power': '8989389892njn89h8982njcnjnskdjcn909u09j3oi2n3i2093j2kn3k23',
          'viva': md5(password.campo),
          'tigo': 'juana',
          'start': 'garay',
          'pass': '7827huin3jnud3978EEy9uhn88839j8nld32d23d32dcdsvDFDEewrer',
        }
      }).then(json => {
        if (json.data.ok) {
          localStorage.setItem('tiempo', new Date().getMinutes())
          localStorage.setItem("token", json.data.token)
          localStorage.setItem('username', json.data.username)
          localStorage.setItem('nombre', json.data.nombre)
          localStorage.setItem('rol', json.data.rol_des)
          localStorage.setItem('numRol', json.data.rol)
          localStorage.setItem('est', json.data.hospital_des)
          localStorage.setItem('mun', json.data.municipio_des)
          localStorage.setItem('red', json.data.red_des)
          localStorage.setItem('id_', json.data.id_)
          localStorage.setItem('est_', json.data.est_)
          auth.login('ok')
          let url = null
          if (parseInt(json.data.rol) === 2) {
            url = LOCAL_URL + "/consulta-externa"
          }
          if (parseInt(json.data.rol) === 1) {
            url = LOCAL_URL + "/dashboard"
          }
          window.location.href = url
          toast.success(json.data.msg)
        }
        else
          toast.error(json.data.msg)
      }).catch(function (error) {
        toast.error(error.toJSON().message);
      });
    } else toast.error('Introduzca sus credenciales de acceso')
  }


  return (


    <div className="content card-aling"  >
      
        <Col xs={12} sm={8} md={6} lg={5} xl={4} className="mx-auto" style={{
          borderRadius: '10px',
          position: 'absolute',
          top: '50%',
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}>
          <Card className="card-user p-3">
            <CardBody>
              <CardText />
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar"
                    style={{
                      height: 'auto',
                      width: '100%',
                      maxWidth: '150px',
                      marginBottom: '2rem'
                    }}
                    src={require("assets/img/react-logo.png")}
                  />
                </a>
              </div>

              <Row className="justify-content-center">
                <Col xs={11} sm={10} md={9}>
                  <InputUsuarioLogin
                    type="text"
                    name='usuario'
                    ExpresionRegular={INPUT.INPUT_USUARIO}
                    estado={usuario}
                    cambiarEstado={setUsuario}
                    placeholder='Usuario'
                    etiqueta='Usuario'
                    eventoBoton={iniciarSesion}

                  />
                </Col>
                <Col xs={11} sm={10} md={9}>
                  <InputUsuarioLogin
                    tipo="password"
                    name='contraseña'
                    ExpresionRegular={INPUT.PASSWORD}
                    estado={password}
                    cambiarEstado={setPassword}
                    placeholder='Contraseña'
                    etiqueta='Contraseña'
                    eventoBoton={iniciarSesion}

                  />
                </Col>
              </Row>

              <CardFooter>
                <div className="boton-modal">
                  <Button color="info" onClick={() => iniciarSesion()}>  
                    iniciar sesion
                  </Button>
                </div>
              </CardFooter>
            
            </CardBody>
            <CardFooter>
              <div className="button-container">
                <Button className="btn-icon btn-round" color="error">
                  <a
                    href="https://www.facebook.com/SEDESCh"
                    target="_blank"
                    style={{ color: 'white' }}
                  >
                    <i className="fab fa-facebook" />
                  </a>
                </Button>

                <Button className="btn-icon btn-round" color="error">
                  <a
                    href="https://www.sedeschuquisaca.gob.bo/chagas"
                    target="_blank"
                    style={{ color: 'white' }}
                  >
                    <i className="fab fa-google-plus" />
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Col>
    </div>


  );
}

export default Login;
