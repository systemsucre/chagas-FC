import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { Card, CardHeader, Modal, ModalBody, ModalHeader, Row, Table, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt, } from "@fortawesome/free-solid-svg-icons";
import fileDownload from 'js-file-download';

import { consultaPDF } from 'pdfMake/consultas';
import { API_ENDPOINTS } from "../api";
import { start } from "service";
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';
import { INPUT } from 'Auth/config';
import { InputUsuario, Select1, ComponenteCheck } from '../input/elementos';
import { saveDB } from 'service';
import toast from 'react-hot-toast';
import { editDB } from 'service';
import { eliminarDB } from 'service';



export default function Consultas() {

  let { paciente, id_tratamiento } = useParams();

  useEffect(() => {
    const ini = () => {
      document.title = "CONSULTAS";
      listar()
    }
    ini()
    return () => { }
  }, []);


  const [modalConsulta, setModalConsulta] = useState(false)
  const [modalRegistrar, setModalRegistrar] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [pacienteData, setPacienteData] = useState([])
  const [registroData, setRegistroData] = useState([])
  const [id, setId] = useState({ campo: null, valido: null })
  const [estadoEnvio, setEstadoEnvio] = useState(0);
  const [lista, setLista] = useState([])
  const [listaInfecciones, setListaInfecciones] = useState([])
  const [listaMedicamentos, setListaMedicamentos] = useState([])
  const [listaMujeresTratamiento, setListaMujeresTratamiento] = useState([])
  const [listaReacionDermatologica, setListaReacionDermatologica] = useState([])
  const [listaReaccionDigestiva, setListaReaccionDigestiva] = useState([])
  const [listaReaccionNeurologica, setListaReaccionNeurologica] = useState([])
  const [listaReaccionHematologica, setListaReaccionHematologica] = useState([])
  const [listaItemsLaboratorio, setListaItemsLaboratorio] = useState([])
  const [listaItemsLaboratorioData, setListaItemsLaboratorioData] = useState([])
  const [listaItemsLaboratorioAdmitidos, setListaItemsLaboratorioAdmitidos] = useState([])
  const [idInfeccion, setIdInfeccion] = useState({ campo: null, valido: null })
  const [fechaConsulta, setFechaConsulta] = useState({ campo: new Date().toISOString().split('T')[0], valido: 'true' })
  const [infeccion, setInfeccion] = useState({ campo: null, valido: null })
  const [idMedicamento, setIdMedicamento] = useState({ campo: null, valido: null })
  const [medicamento, setMedicamento] = useState({ campo: null, valido: null })
  const [idMujeresTratamiento, setIdMujeresTratamiento] = useState({ campo: null, valido: null })
  const [mujeresTratamiento, setMujeresTratamiento] = useState({ campo: null, valido: null })
  const [idReaccionDermatologica, setIdReaccionDermatologica] = useState({ campo: null, valido: null })
  const [reaccionDermatologica, setReaccionDermatologica] = useState({ campo: null, valido: null })
  const [idReaccionDigestiva, setIdReaccionDigestiva] = useState({ campo: null, valido: null })
  const [reaccionDigestiva, setReaccionDigestiva] = useState({ campo: null, valido: null })
  const [idReaccionNeurologica, setIdReaccionNeurologica] = useState({ campo: null, valido: null })
  const [reaccionNeurologica, setReaccionNeurologica] = useState({ campo: null, valido: null })
  const [idReaccionHematologica, setIdReaccionHematologica] = useState({ campo: null, valido: null })
  const [reaccionHematologica, setReaccionHematologica] = useState({ campo: null, valido: null })
  const [dosis, setDosis] = useState({ campo: null, valido: null })
  const [idItemsLaboratorio, setIdItemsLaboratorio] = useState({ campo: null, valido: null })
  const [itemsLaboratorio, setItemsLaboratorio] = useState({ campo: null, valido: null })




  const listar = async () => {
    try {
      const data = await start(API_ENDPOINTS.CONSULTAS.LISTAR, { id_tratamiento })
      setLista(data[0])
      if (data[0]?.length < 1) toast.error("No hay consultas registrados")
      if (data[1]?.length > 0) {
        setPacienteData(data[1])
      }


    } catch (error) {
      toast.error("Error al obtener las consultas")
    }
  };

  const listarParametros = async (edicion, id_consulta) => {
    const loadingToast = toast.loading('CARGANDO PARAMETROS...');
    const data = await start(API_ENDPOINTS.CONSULTAS.LISTAR_PARAMETROS, { id_consulta })
    toast.dismiss(loadingToast);


    if (data[0].length > 0) {
      setListaMedicamentos(data[0])
    }

    if (data[1].length > 0) {
      setListaMujeresTratamiento(data[1])
    }

    if (data[2].length > 0) {
      setListaReacionDermatologica(data[2])
    }

    if (data[3].length > 0) {
      setListaReaccionDigestiva(data[3])
    }

    if (data[4].length > 0) {
      setListaReaccionNeurologica(data[4])
    }

    if (data[5].length > 0) {
      setListaReaccionHematologica(data[5])
    }
    if (data[6].length > 0) {
      setListaItemsLaboratorio(data[6])
    }
    if (data[7].length > 0) {
      console.log(data[7])
      data[7].forEach(element => {
        listaItemsLaboratorioAdmitidos.push(element.id_items_laboratorio)
      });
      setListaItemsLaboratorioData(data[7])

    }
    if (edicion == 1) {
      setModalRegistrar(true)
    }
    if (edicion == 2) {
      setModalEdit(true)
    }
    if (edicion == 3) {
      setModalConsulta(true)
    }

  }

  const exportPDf = async (output) => {
    const response = await consultaPDF(output, {
      lista: [registroData],
      paciente: pacienteData,
      listaItemsLaboratorioData,
    });

    if (!response?.success) {
      alert(response?.message);
      return;
    }

    if (output === "b64") {
      const b64toBlob = (
        b64Data,
        contentType = "",
        sliceSize = 512
      ) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(
            offset,
            offset + sliceSize
          );

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
      };
      const blob = b64toBlob(response.content, "application/pdf");
      fileDownload(blob, "COSULTA.pdf");
    }
  };


  const initialFormState = {
    campo: null,
    valido: null
  };
  const vaciarDatos = () => {
    const fieldsToReset = {
      setIdMedicamento,
      setMedicamento,
      setIdMujeresTratamiento,
      setMujeresTratamiento,
      setIdReaccionDermatologica,
      setReaccionDermatologica,
      setIdReaccionDigestiva,
      setReaccionDigestiva,
      setIdReaccionNeurologica,
      setReaccionNeurologica,
      setIdReaccionHematologica,
      setReaccionHematologica,

    };
    Object.values(fieldsToReset).forEach(setterFn => {
      setterFn(initialFormState);
    });
    setListaItemsLaboratorioAdmitidos([])
    setListaItemsLaboratorioData([])

    setModalEdit(false);
    setModalRegistrar(false);
  };

  const insertar = async () => {
    if (estadoEnvio === 0) {
      setEstadoEnvio(1);
      await saveDB(API_ENDPOINTS.CONSULTAS.REGISTRAR, {
        id_tratamiento,
        fecha_consulta: fechaConsulta.campo,
        id_medicamento: idMedicamento.campo,
        medicamento: medicamento.campo,
        dosis: dosis.campo,
        id_mujeres_tratamiento: idMujeresTratamiento.campo,
        mujeres_tratamiento: mujeresTratamiento.campo,
        id_reaccion_dermatologica: idReaccionDermatologica.campo,
        reaccion_dermatologica: reaccionDermatologica.campo,
        id_reaccion_digestiva: idReaccionDigestiva.campo,
        reaccion_digestiva: reaccionDigestiva.campo,
        id_reaccion_neurologica: idReaccionNeurologica.campo,
        reaccion_neurologica: reaccionNeurologica.campo,
        id_reaccion_hematologica: idReaccionHematologica.campo,
        reaccion_hematologica: reaccionHematologica.campo,
        id_paciente: paciente,
        listaItemsLaboratorioAdmitidos,

      }, setModalRegistrar, setEstadoEnvio, false, vaciarDatos)
      listar()

    } else toast.error("Formulario incompleto!");
  };

  const editar = async () => {
    await editDB(API_ENDPOINTS.CONSULTAS.MODIFICAR, {
      id: id.campo,
      id_tratamiento,
      fecha_consulta: fechaConsulta.campo,
      id_medicamento: idMedicamento.campo,
      medicamento: medicamento.campo,
      dosis: dosis.campo,
      id_mujeres_tratamiento: idMujeresTratamiento.campo,
      mujeres_tratamiento: mujeresTratamiento.campo,
      id_reaccion_dermatologica: idReaccionDermatologica.campo,
      reaccion_dermatologica: reaccionDermatologica.campo,
      id_reaccion_digestiva: idReaccionDigestiva.campo,
      reaccion_digestiva: reaccionDigestiva.campo,
      id_reaccion_neurologica: idReaccionNeurologica.campo,
      reaccion_neurologica: reaccionNeurologica.campo,
      id_reaccion_hematologica: idReaccionHematologica.campo,
      reaccion_hematologica: reaccionHematologica.campo,
      id_items_laboratorio: idItemsLaboratorio.campo,
      items_laboratorio: itemsLaboratorio.campo,
      id_paciente: paciente,
      listaItemsLaboratorioAdmitidos,
    }, setModalEdit, false, vaciarDatos)
    listar()
  };


  const eliminar = async (consulta) => {
    if (window.confirm('Eliminar Consulta ?')) {
      await eliminarDB(API_ENDPOINTS.CONSULTAS.ELIMINAR, { consulta })
      listar()
    }
  }


  return (
    < >

      <div className="content" >
        <div className="main-container">


          <Card>

            <CardHeader>
              <BackgroundColorContext.Consumer>
                {({ color }) => (
                  <div className="tbl-header" data={color}>

                    <div className="row">
                      <div className="col-8">
                        CONSULTAS
                      </div>
                      <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                        {pacienteData[0]?.editable == 1 && <>
                          <button className='btn-new' pb={3} onClick={() => { listarParametros(1, null); }} >
                            {lista.length > 0 ? 'NUEVA RECONSULTA' : 'NUEVA CONSULTA'}
                          </button >
                        </>}
                      </div>
                    </div>
                  </div>
                )}
              </BackgroundColorContext.Consumer>  
            </CardHeader>

            {pacienteData.length > 0 &&
              <div style={{ borderRadius: '0', boxShadow: '0 8px 32px rgba(0, 174, 164, 0.1)', transform: 'translateY(0)', transition: 'all 0.4s ease', animation: 'fadeIn 0.8s ease-out', ':hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 36px rgba(0, 174, 164, 0.2)' } }}>
                <div style={{ padding: '2rem', borderRadius: '0', borderLeft: '4px solid #00AEA4', animation: 'slideInLeft 0.5s ease-out' }}>
                  <p className="animate__animated animate__fadeIn" style={{ marginBottom: '1rem', color: '#2C3E50', fontSize: '1.2rem', fontWeight: '600', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease' }}>
                    <i className="fas fa-id-card animate__animated animate__pulse animate__infinite" style={{ fontSize: '1.3rem', color: '#00AEA4', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}></i>
                    {pacienteData[0].ci ? 'C.I.: ' + pacienteData[0].ci : 'C.I.: No registrado ' }
                  </p>
                  {pacienteData[0].ap2 ? <>
                    <p style={{ color: '#2C3E50', marginBottom: '0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease-out' }}>
                      <i className="fas fa-user animate__animated animate__bounce animate__infinite" style={{ fontSize: '1.4rem', color: '#00AEA4', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}></i>
                      Paciente:
                      <span style={{ fontWeight: '600', fontSize: '1.3rem', color: '#00AEA4', textShadow: '0 1px 4px rgba(0,0,0,0.1)', letterSpacing: '0.4px' }}>
                        {pacienteData[0].nombre + ' ' + pacienteData[0].ap1 + ' ' + pacienteData[0].ap2}
                      </span>

                    </p>



                    <div>
                      {"DIAGNOSTICO : " + pacienteData[0].diagnostico}
                    </div> </>
                    : <>
                      <p style={{ color: '#2C3E50', marginBottom: '0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease-out' }}>
                        <i className="fas fa-user animate__animated animate__bounce animate__infinite" style={{ fontSize: '1.4rem', color: '#00AEA4', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}></i>
                        Paciente:
                        <span style={{ fontWeight: '600', fontSize: '1.3rem', color: '#00AEA4', textShadow: '0 1px 4px rgba(0,0,0,0.1)', letterSpacing: '0.4px' }}>
                          {pacienteData[0].nombre + ' ' + pacienteData[0].ap1}
                        </span>
                      </p>
                      {'edad: ' + localStorage.getItem('edad')}
                      <div >
                        {"Diagnostico: " + pacienteData[0].diagnostico}
                      </div>
                    </>
                  }
                </div>
              </div>
            }


            <div style={{ minHeight: '20rem', }}>

              <Table className="tablesorter" responsive >
                <thead className="text-primary">
                  <tr>
                    <th >TRATAMIENTO</th>
                    <th >MEDICAMENTO</th>
                    <th >FECHA CONSULTA</th>
                    <th >HOSPITAL</th>
                    <th >INICIO TRATAMIENTO</th>
                    <th >FIN TRATAMIENTO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody >
                  {lista.map((a, index) => (
                    <tr key={a.id} style={{
                      height: '50px', background: index % 2 == 0 ? "#E1EEF4" : 'white',
                      color: index % 2 == 0 ? "#00496B" : 'white'
                    }} className='item'>

                      <td>
                        <div className="tbl-name tbl-bold">{a.diagnostico}</div>

                      </td>

                      <td>
                        <div className="tbl-name tbl-bold">{a.medicamento}</div>
                        <div className="tbl-des">{'Dosis: ' + a.dosis}</div>
                      </td>
                      <td>
                        <div className="tbl-des">{a.fecha_consulta}</div>
                      </td>
                      <td>
                        <div className="tbl-name tbl-bold">{a.hospital}</div>
                        <div className="tbl-des">{'Medico: ' + a.medico}</div>
                      </td>

                      <td>
                        <div className="tbl-des">{a.fecha_ini}</div>
                      </td>
                      <td>
                        <div className="tbl-des">{a.fecha_fin}</div>
                      </td>
                      <td>
                        <div className="btn-tbl-container row">
                          {pacienteData[0]?.editable == 1 && <>
                            <div
                              onClick={() => {
                                listarParametros(2, a.id)
                                setId({ campo: a.id, valido: true })
                                setDosis({ campo: a.dosis, valido: true })
                                setFechaConsulta({ campo: a.fecha_consulta.replace(/\//g, '-'), valido: true })
                                setIdMedicamento({ campo: a.id_medicamento, valido: true })
                                setMedicamento({ campo: a.medicamento, valido: true })
                              
                                setIdMujeresTratamiento({ campo: a.id_mujeres_tratamiento, valido: true })
                                setMujeresTratamiento({ campo: a.mujeres_tratamiento, valido: true })
                                setIdReaccionDermatologica({ campo: a.id_reaccion_dermatologica, valido: true })
                                setReaccionDermatologica({ campo: a.reaccion_dermatologica, valido: true })
                                setIdReaccionDigestiva({ campo: a.id_reaccion_digestiva, valido: true })
                                setReaccionDigestiva({ campo: a.reaccion_digestiva, valido: true })
                                setIdReaccionNeurologica({ campo: a.id_reaccion_neurologica, valido: true })
                                setReaccionNeurologica({ campo: a.reaccion_neurologica, valido: true })
                                setIdReaccionHematologica({ campo: a.id_reaccion_hematologica, valido: true })
                                setReaccionHematologica({ campo: a.reaccion_hematologica, valido: true })

                              }}
                              className="btn-tbl col-3 bg-info" ><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></div>
                            <div
                              onClick={() => eliminar(a.id)}
                              className="btn-tbl col-3  ml-1" style={{ background: '#FF3D85' }}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                            </div>
                          </>
                          }
                          <div
                            onClick={() => { setRegistroData(a); setModalConsulta(true); listarParametros(3, a.id) }}
                            className="btn-tbl btn-success col-3  ml-1 " ><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></div>
                        </div>

                      </td>

                    </tr>
                  ))}
                </tbody>
              </Table>


              <div style={{ padding: '1rem' }}>
                {lista.length + " Registro(s)"}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={modalConsulta} toggle={() => { setModalConsulta(false); vaciarDatos() }} className='modal-lg' >
        <ModalHeader toggle={() => { setModalConsulta(false); vaciarDatos() }} > </ModalHeader>
        <ModalBody className="p-3" >
          {pacienteData.length > 0 && <><p className=" wow fadeInUp " style={{ marginBottom: '0' }}> {pacienteData[0].ci ? 'C.I. : ' + pacienteData[0].ci : 'C.I.: No registrado'}  </p>
            <p >Paciente: <span style={{ fontWeight: '500' }}>  {pacienteData[0].nombre + ' ' + pacienteData[0].ap1 + ' ' + pacienteData[0].ap2}
            </span></p></>}
          <div className='row g-4'>
            <div className='col-md-6' style={{
              background: '#FFFFFF',
              padding: '20px',
              // borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              // margin: '10px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#2C3E50',
                marginBottom: '12px',
                borderBottom: '1px solid #E8F5F5',

              }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>FECHA CONSULTA</label> : {registroData.fecha_consulta}</p>

              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>MEDICAMENTO</label> : {registroData.medicamento}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>DOSIS</label> : {registroData.dosis}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>TRATAMIENTO</label> : {registroData.diagnostico}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>FECHA INICIO</label> : {registroData.fecha_ini}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>FECHA CONCLUSION</label> : {registroData.fecha_fin}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>HOSPITAL</label> : {registroData.hospital}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>MEDICO</label> : {registroData.medico}</p>
            </div>

            <div className='col-md-6' style={{
              background: '#FFFFFF',
              padding: '20px',
              // borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              // margin: '10px'
            }}>
            
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>MUJERES TRATAMIENTO</label> : {registroData.mujeres_tratamiento}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>REACCION DERMATOLOGICA</label> : {registroData.reaccion_dermatologica}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>REACCION DIGESTIVA</label> : {registroData.reaccion_digestiva}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>REACCION NEUROLOGICA</label> : {registroData.reaccion_neurologica}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>REACCION HEMATOLOGICA</label> : {registroData.reaccion_hematologica}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>SITUACION EPIDEMICA</label> : {registroData.epidemica}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>EXAMENES COMPLEMENTARIOS PREVIOS</label> : {registroData.complementarios}</p>
              <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>HOSPITAL REFERENCIA</label> : {registroData.hospital_ref}</p>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            paddingLeft: '0',
            paddingRight: '0',
          }}>
            <h6 style={{
              fontSize: '0.875rem',
              color: '#2C3E50',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              paddingLeft: '1rem',
              marginBottom: '1rem',
              borderBottom: '2px solid #00AEA4',
              paddingBottom: '0.5rem'
            }}>Estudios Laboratorio</h6>

            <div className='row g-4' style={{
              background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
              boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
            }}>
              {listaItemsLaboratorioData.map((e, index) => (
                <div className='col-md-4' key={index} style={{
                  padding: '1rem',

                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px'
                }}>
                  <p style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#00AEA4',
                    // marginBottom: '0.5rem'
                  }}>{e.items_laboratorio}</p>
                  {/* <p style={{
                    fontSize: '0.85rem',
                    color: '#6c757d',
                    margin: 0
                  }}>{e.resultado ? 'Resultado: ' + e.resultado : 'Resultado: No realizado'}</p> */}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            padding: '.5rem 0.5rem 0'
          }}>
            <div>
              <button
                onClick={() => exportPDf(window.innerWidth < 1100 ? 'b64' : "print")}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#17a2b8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(23, 162, 184, 0.2)',
                  ':hover': {
                    backgroundColor: '#138496',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 6px rgba(23, 162, 184, 0.3)'
                  }
                }}>
                Pdf
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>


      <Modal
        isOpen={modalRegistrar}
        toggle={() => { setModalRegistrar(!modalRegistrar); vaciarDatos() }}
        className='modal-lg'
      >
        <ModalHeader
          toggle={() => { setModalRegistrar(!modalRegistrar); vaciarDatos() }}
        >
          IDENTIFICACION DE LA CONSULTA
        </ModalHeader>
        <ModalBody style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <Row className="g-4">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <fieldset className="border p-" style={{
                borderRadius: '6px',
                borderColor: '#dee2e6',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <legend
                  className="float-none w-auto px-3 py-2"
                  style={{
                    fontSize: "15px",
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '0'
                  }}
                >
                  CONSULTA
                </legend>
                <div className="row g-3 p-2">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idMedicamento}
                      name={'id_medicamento'}
                      cambiarEstado={setIdMedicamento}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Medicamento'}
                      lista={listaMedicamentos}
                      msg={"el formato no es valido"}
                      label={setMedicamento}
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <InputUsuario
                      estado={fechaConsulta}
                      name={'fecha_consulta'}
                      cambiarEstado={setFechaConsulta}
                      ExpresionRegular={INPUT.DATE}
                      tipo='date'
                      etiqueta={'Fecha Consulta'}
                      msg={"el formato no es valido"}
                    />
                  </div>
                  <div className="col-12" style={{ marginBottom: '.7rem' }}>
                    <InputUsuario
                      estado={dosis}
                      cambiarEstado={setDosis}
                      ExpresionRegular={INPUT.TEXT}
                      etiqueta={'Dosis'}
                      msg={"el formato no es valido"}
                      name={'dosis'}
                    />
                  </div>
            
                  <div className="col-12" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idMujeresTratamiento}
                      cambiarEstado={setIdMujeresTratamiento}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Mujeres Tratamiento'}
                      msg={"el formato no es valido"}
                      lista={listaMujeresTratamiento}
                      name={'id_mujer'}
                      label={setMujeresTratamiento}
                      importante={false}
                    />
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <fieldset className="border p-2" style={{
                borderRadius: '6px',
                borderColor: '#dee2e6',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <legend
                  className="float-none w-auto px-3 py-2"
                  style={{
                    fontSize: "15px",
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '0'
                  }}
                >
                  Reacciones Adversas
                </legend>
                <div className="row g-3">
                  <div className="col-12 " style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionDermatologica}
                      cambiarEstado={setIdReaccionDermatologica}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Dermatológica'}
                      msg={"el formato no es valido"}
                      lista={listaReacionDermatologica}
                      name={'id_reaccion_dermatologica'}
                      label={setReaccionDermatologica}
                      importante={false}

                    />
                  </div>

                  <div className="col-12" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionDigestiva}
                      cambiarEstado={setIdReaccionDigestiva}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Digestiva'}
                      lista={listaReaccionDigestiva}
                      msg={"el formato no es valido"}
                      name={'id_reaccion_digestiva'}
                      label={setReaccionDigestiva}
                      importante={false}

                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionNeurologica}
                      cambiarEstado={setIdReaccionNeurologica}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Neurológica'}
                      msg={"el formato no es valido"}
                      lista={listaReaccionNeurologica}
                      name={'id_reaccion_neurologica'}
                      label={setReaccionNeurologica}
                      importante={false}

                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionHematologica}
                      cambiarEstado={setIdReaccionHematologica}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Hematológica'}
                      msg={"el formato no es valido"}
                      lista={listaReaccionHematologica}
                      name={'id_reaccion_hematologica'}
                      label={setReaccionHematologica}
                      importante={false}

                    />
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="col-12">
              <fieldset className="border p-" style={{
                borderRadius: '6px',
                borderColor: '#dee2e6',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <legend
                  className="float-none w-auto px-3 py-2"
                  style={{
                    fontSize: "15px",
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '0'
                  }}
                >
                  EXAMENES DE LABORATORIO
                </legend>
                <div className="row g-3 p-2">
                  {
                    listaItemsLaboratorio.map((e, index) => (<>
                      <ComponenteCheck
                        key={index}
                        id={e.value}
                        item={e.label}
                        admitidos={listaItemsLaboratorioAdmitidos}
                      />
                      <span style={{ marginRight: '1rem' }}></span>
                    </>
                    ))
                  }
                </div>
              </fieldset>
            </div>
          </Row>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <button
              onClick={() => insertar()}
              className="btn btn-primary"
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Registrar
            </button>
          </div>

        </ModalBody>
      </Modal>


      <Modal
        isOpen={modalEdit}
        toggle={() => { setModalEdit(!modalEdit); vaciarDatos() }}
        className='modal-lg'
      >
        <ModalHeader
          toggle={() => { setModalEdit(!modalEdit); vaciarDatos() }}
        >
          EDITAR CONSULTA
        </ModalHeader>
        <ModalBody style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <Row className="g-4">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <fieldset className="border p-" style={{
                borderRadius: '6px',
                borderColor: '#dee2e6',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <legend
                  className="float-none w-auto px-3 py-2"
                  style={{
                    fontSize: "15px",
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '0'
                  }}
                >
                  CONSULTA
                </legend>
                <div className="row g-3 p-2">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idMedicamento}
                      name={'id_medicamento'}
                      cambiarEstado={setIdMedicamento}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Medicamento'}
                      lista={listaMedicamentos}
                      msg={"el formato no es valido"}
                      label={setMedicamento}
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <InputUsuario
                      estado={fechaConsulta}
                      name={'fecha_consulta'}
                      cambiarEstado={setFechaConsulta}
                      ExpresionRegular={INPUT.DATE}
                      tipo='date'
                      etiqueta={'Fecha Consulta'}
                      msg={"el formato no es valido"}
                    />
                  </div>
                  <div className="col-12" style={{ marginBottom: '.7rem' }}>
                    <InputUsuario
                      estado={dosis}
                      cambiarEstado={setDosis}
                      ExpresionRegular={INPUT.TEXT}
                      etiqueta={'Dosis'}
                      msg={"el formato no es valido"}
                      name={'dosis'}
                    />
                  </div>
           
                  <div className="col-12" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idMujeresTratamiento}
                      cambiarEstado={setIdMujeresTratamiento}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Mujeres Tratamiento'}
                      msg={"el formato no es valido"}
                      lista={listaMujeresTratamiento}
                      name={'id_mujer'}
                      label={setMujeresTratamiento}
                      importante={false}

                    />
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <fieldset className="border p-2" style={{
                borderRadius: '6px',
                borderColor: '#dee2e6',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <legend
                  className="float-none w-auto px-3 py-2"
                  style={{
                    fontSize: "15px",
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '0'
                  }}
                >
                  Reacciones Adversas
                </legend>
                <div className="row g-3">
                  <div className="col-12 " style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionDermatologica}
                      cambiarEstado={setIdReaccionDermatologica}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Dermatológica'}
                      msg={"el formato no es valido"}
                      lista={listaReacionDermatologica}
                      name={'id_reaccion_dermatologica'}
                      label={setReaccionDermatologica}
                      importante={false}

                    />
                  </div>

                  <div className="col-12" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionDigestiva}
                      cambiarEstado={setIdReaccionDigestiva}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Digestiva'}
                      lista={listaReaccionDigestiva}
                      msg={"el formato no es valido"}
                      name={'id_reaccion_digestiva'}
                      label={setReaccionDigestiva}
                      importante={false}

                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionNeurologica}
                      cambiarEstado={setIdReaccionNeurologica}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Neurológica'}
                      msg={"el formato no es valido"}
                      lista={listaReaccionNeurologica}
                      name={'id_reaccion_neurologica'}
                      label={setReaccionNeurologica}
                      importante={false}

                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                    <Select1
                      estado={idReaccionHematologica}
                      cambiarEstado={setIdReaccionHematologica}
                      ExpresionRegular={INPUT.ID}
                      etiqueta={'Reacción Hematológica'}
                      msg={"el formato no es valido"}
                      lista={listaReaccionHematologica}
                      name={'id_reaccion_hematologica'}
                      label={setReaccionHematologica}
                      importante={false}

                    />
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="col-12">
              <fieldset className="border p-" style={{
                borderRadius: '6px',
                borderColor: '#dee2e6',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <legend
                  className="float-none w-auto px-3 py-2"
                  style={{
                    fontSize: "15px",
                    fontWeight: '600',
                    color: '#495057',
                    marginBottom: '0'
                  }}
                >
                  EXAMENES DE LABORATORIO
                </legend>
                <div className="row g-3 p-2">
                  {
                    listaItemsLaboratorio.map((e, index) => (<>
                      <ComponenteCheck
                        key={index}
                        id={e.value}
                        item={e.label}
                        admitidos={listaItemsLaboratorioAdmitidos}
                      />
                      <span style={{ marginRight: '1rem' }}></span>
                    </>
                    ))
                  }
                </div>
              </fieldset>
            </div>
          </Row>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <button
              onClick={() => editar()}
              className="btn btn-success"
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Editar
            </button>
          </div>

        </ModalBody>
      </Modal>

    </ >
  );
}

