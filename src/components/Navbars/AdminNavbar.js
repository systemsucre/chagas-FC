

import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  CardFooter,
  CardText,
  Table,
} from "reactstrap";
import useAuth from "Auth/useAuth";

import { URL } from "Auth/config";
import { start } from "service";
import { editDB } from "service";
import md5 from "md5";
import toast from "react-hot-toast";
// import { Input, } from "components/input/elementos";
import { INPUT } from "Auth/config";
import { ComponenteInputUserDisabled } from "components/input/elementos";
import { InputUsuarioStandar } from "components/input/elementos";

function AdminNavbar(props) {


  const [usuario, setUsuario] = useState([])


  const [modalPerfil, setModalPerfil] = useState(false);
  const [modalRecet, setModalRecet] = useState(false);

  const [pass, setPass] = useState({ campo: null, valido: null });
  const [pass1, setPass1] = useState({ campo: null, valido: null });
  const [pass2, setPass2] = useState({ campo: null, valido: null });


  const [nombre, setNombre] = useState({ campo: null, valido: null });
  const [ap1, setAp1] = useState({ campo: null, valido: null });
  const [ap2, setAp2] = useState({ campo: null, valido: null });
  const [direccion, setDireccion] = useState({ campo: null, valido: null });
  const [correo, setCorreo] = useState({ campo: null, valido: null });
  const [celular, setCelular] = useState({ campo: null, valido: null });


  const [red, setRed] = useState({ campo: null, valido: null });
  const [municipio, setMunicipio] = useState({ campo: null, valido: null });
  const [comunidad, setComunidad] = useState({ campo: null, valido: null });
  const [hospital, setHospital] = useState({ campo: null, valido: null });




  const auth = useAuth()
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };






  const listar = async (msg = 'Cargando datos, Espere por favor...') => {
    let loadingToast = null
    if (msg) loadingToast = toast.loading(msg);
    const data = await start(URL + '/miperfil/mis-datos')
    if (msg) toast.dismiss(loadingToast);

    if (data.length > 0) {
      setUsuario(data)
      setNombre({ campo: data[0].nombre, valido: 'true' })
      setAp1({ campo: data[0].ap1, valido: 'true' })
      setAp2({ campo: data[0].ap2, valido: 'true' })
      setCorreo({ campo: data[0].correo, valido: 'true' })
      setDireccion({ campo: data[0].direccion, valido: 'true' })
      setCelular({ campo: data[0].celular, valido: 'true' })

      setComunidad({ campo: data[0].comunidad, valido: 'true' })
      setHospital({ campo: data[0].hospital, valido: 'true' })
      setMunicipio({ campo: data[0].municipio, valido: 'true' })
      setRed({ campo: data[0].red, valido: 'true' })

      setModalPerfil(true)

    }
  };

  const recet_ = async () => {
    if (pass.valido === 'true' && pass1.valido === 'true' && pass2.valido === 'true') {
      if (pass1.campo === pass2.campo) {
        let accion = window.confirm('cambiar contraseña ?')
        if (accion) {
          await editDB(URL + '/miperfil/recet', {
            contraseña_actual: md5(pass.campo),
            nueva_contraseña: md5(pass1.campo),
          }, setModalRecet)
        }
      } else toast.error('las contraseñas no coinciden!, verifique e intente nuevamente')
    } else toast.error('complete todos los campos')
  }


  const actualizar = async () => {
    await editDB(URL + '/miperfil/actualizarMiPerfil', {
      nombre: nombre.campo,
      ap1: ap1.campo,
      ap2: ap2.campo,
      direccion: direccion.campo,
      correo: correo.campo,
      celular: celular.campo,
      direccion: direccion.campo
    },)
    listar()
  }
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Profile</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={() => listar()}>Mi perfil</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li" onClick={() => auth.logout()}>
                    <DropdownItem className="nav-item">cerrar sesion</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Modal isOpen={modalPerfil} toggle={() => setModalPerfil(false)} className="modal-lg">
        <Card  >
          <ModalHeader toggle={() => setModalPerfil(false)}> Mi perfil</ModalHeader>
          <ModalBody className='p-0'>
            {usuario.length > 0 ?
              <Row>
                <Col md="4" style={{ paddingRight: "0px", paddingLeft: "0px", }}>
                  <Card className="card-user" style={{ borderRadius: '0' }}  >
                    <CardBody style={{ paddingBottom: '0' }}>
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
                            style={{ height: '130px', width: '130px' }}
                            src={require("assets/img/emilyz.jpg")}
                          />
                          <h5 className="title">{usuario[0].ap2 ? usuario[0].nombre + ' ' + usuario[0].ap1 + ' ' + usuario[0].ap2 : usuario[0].nombre + ' ' + usuario[0].ap1}</h5>
                        </a>
                        {localStorage.getItem('numRol') >= 5 && localStorage.getItem('numRol') <= 7 ?
                          <div>{localStorage.getItem('rol')} / {localStorage.getItem('est')}</div> :
                          <div>{localStorage.getItem('rol')} / {municipio.campo}</div>
                        }
                      </div>
                      <Row className="mt-4">
                        <Col md="5">
                          <h5 className="title"> Nombre </h5>
                        </Col>
                        <Col md="7"> {usuario[0].ap2 ? usuario[0].nombre + ' ' + usuario[0].ap1 + ' ' + usuario[0].ap2 : usuario[0].nombre + ' ' + usuario[0].ap1}</Col>
                      </Row>
                      <Row>
                        <Col md="5">
                          <h5 className="title"> celular </h5>
                        </Col>
                        <Col md="7">  {usuario[0].celular}</Col>
                      </Row>
                      <Row>
                        <Col md="5">
                          <h5 className="title"> Email </h5>
                        </Col>
                        <Col md="7">  {usuario[0].correo}</Col>
                      </Row>
                      <Row>
                        <Col md="5">
                          <h5 className="title"> Direccion  </h5>
                        </Col>
                        <Col md="7">  {usuario[0].direccion}</Col>
                      </Row>
                      <CardFooter style={{ paddingTop: '0rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0rem', paddingTop: '0' }}>
                          <Button className="btn-fill" color="error" type="submit"
                            onClick={() => setModalRecet(true)}
                          >
                            cambiar contraseña
                          </Button>
                        </div>
                      </CardFooter>
                    </CardBody>

                  </Card>
                </Col>
                <Col md="8" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                  <Card className="card-user" style={{ borderRadius: '0' }}  >
                    <CardHeader>
                      <h5 className="title">Edit Profile</h5>
                    </CardHeader>
                    <CardBody style={{ paddingBottom: '0' }}>
                      <Form>
                        <Row>
                          <Col className="pr-md-1" md="4">
                            <ComponenteInputUserDisabled
                              estado={red}
                              etiqueta='Red de Salud'
                            />
                          </Col>
                          <Col className="pr-md-1" md="4">
                            <ComponenteInputUserDisabled
                              estado={municipio}
                              etiqueta='Municipio'
                            />
                          </Col>
                          <Col className="pr-md-1" md="4">
                            <ComponenteInputUserDisabled
                              estado={hospital}
                              etiqueta='Hospital'
                            />
                          </Col>

                          <Col className="px-md-1" md="4">
                            <ComponenteInputUserDisabled
                              estado={comunidad}
                              etiqueta='comunidad'
                            />
                          </Col>
                          <Col className="pr-md-1" md="4">
                            <ComponenteInputUserDisabled
                              estado={{ campo: localStorage.getItem('rol'), valido: 'true' }}
                              etiqueta='Rol'
                            />
                          </Col>
                          <Col className="pl-md-1" md="4">
                            <InputUsuarioStandar
                              estado={correo}
                              cambiarEstado={setCorreo}
                              placeholder="email"
                              ExpresionRegular={INPUT.CORREO}  //expresion regular  
                              name={'Email'}
                              mayusculas={false}
                              etiqueta={'Email'}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-md-1" md="5">
                            <InputUsuarioStandar
                              estado={nombre}
                              cambiarEstado={setNombre}
                              placeholder="nombre"
                              ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                              name={'nombre'}
                              etiqueta={"Nombre"}
                            />
                          </Col>
                          <Col className="pl-md-1" md="4">
                            <InputUsuarioStandar
                              estado={ap1}
                              cambiarEstado={setAp1}
                              placeholder="Primer apellido"
                              etiqueta='Apellido paterno'
                              ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                              name={'apellido_paterno'}
                            />
                          </Col>
                          <Col className="pl-md-1" md="3">
                            <InputUsuarioStandar
                              estado={ap2}
                              cambiarEstado={setAp2}
                              placeholder="Segundo  apellido"
                              etiqueta='Apellido Materno'
                              ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular  
                              name={'apellido_materno'}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pl-md-1" md="4">
                            <InputUsuarioStandar
                              estado={celular}
                              cambiarEstado={setCelular}
                              ExpresionRegular={INPUT.TELEFONO}  //expresion regular  
                              name={'celular'}
                              placeholder='celular'
                              etiqueta='Celular'
                            />
                          </Col>
                          <Col md="8">
                            <InputUsuarioStandar
                              estado={direccion}
                              cambiarEstado={setDireccion}
                              ExpresionRegular={INPUT.DIRECCION}  //expresion regular  
                              name={'direccion'}
                              placeholder='direccion'
                              etiqueta="Direccion"
                            />
                          </Col>
                        </Row>
                        <Row>

                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>

                          <Button className="btn-fill" color="info" type="submit"
                            onClick={() => actualizar()}
                          >
                            Actualizar
                          </Button>
                        </div>

                      </Form>
                    </CardBody>

                  </Card>
                </Col>
              </Row> : "Sin informacion"}
          </ModalBody>

        </Card>
      </Modal>

      <Modal isOpen={modalRecet} toggle={() => setModalRecet(false)}>
        <Card  >
          <ModalHeader toggle={() => setModalRecet(false)}> Cambiar mi contraseña</ModalHeader>
          <ModalBody className='p-2'>
            <Form>
              <Row>
                <Col className="pl-md-1" md="12">
                  <InputUsuarioStandar
                    estado={pass}
                    cambiarEstado={setPass}
                    ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                    placeholder='contraseña Actual'
                    name={'contraseña_actual'}
                    msg={'Este campo acepta todos los caracteres'}
                    etiqueta='Contraseña actual'
                    mayusculas = {false}
                  />
                </Col>
                <Col className="pl-md-1" md="12">
                  <InputUsuarioStandar
                    estado={pass1}
                    cambiarEstado={setPass1}
                    ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                    placeholder='nueva contraseña'
                    name={'nueva_contraseña'}
                    msg={'Este campo acepta todos los caracteres'}
                    etiqueta='nueva contraseña'
                    mayusculas = {false}
                  />
                </Col>
                <Col className="pl-md-1" md="12">

                  <InputUsuarioStandar
                    estado={pass2}
                    cambiarEstado={setPass2}
                    ExpresionRegular={INPUT.PASSWORD}  //expresion regular  
                    placeholder='repetir contraseña'
                    etiqueta='repetir contraseña'
                    name={'repetir_nueva_contraseña'}
                    msg={'Este campo acepta todos los caracteres'}
                    mayusculas = {false}
                  />
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Button variant="outlined" color="error" size="small" pb={3} onClick={() => recet_()} >
              {'cambiar contraseña'}
            </Button >
          </div>
        </Card>
      </Modal >

    </>
  );
}

export default AdminNavbar;
