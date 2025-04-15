
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../api";
import { Card, CardHeader, Modal, ModalBody, ModalHeader, Table, Row, Alert, } from "reactstrap";
import { buscarDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { diagnosticoPDF } from "pdfMake/diagnostico";
import fileDownload from "js-file-download";
import { eliminarDB } from "service";
import { editDB } from "service";
import { InputUsuario, Select1, ComponenteCheck, InputUsuarioStandarTable } from "../input/elementos";
import { INPUT } from "Auth/config";
import toast from "react-hot-toast";
import { start } from "service";
import { saveDB } from "service";
import { ComponenteInputUserDisabled } from "components/input/elementos";

export default function Diagnostico() {
    const { id_paciente } = useParams();

    const [listaDiagnostico, setListaDiagnostico] = useState([])  // LISTA DE DIAGNOSTICOS OSLICITADOS|
    const [pacienteData, setPacienteData] = useState([])  // datos del paciente
    const [diagnosticoData, setDiagnosticoData] = useState([]) // datos de la presente solicitud
    const [listaItemsLaboratorioData, setListaItemsLaboratorioData] = useState([])  // lista para mostrar examenes seleccionados
    const [listaItemsLaboratorioAdmitidos, setListaItemsLaboratorioAdmitidos] = useState([]) // // lista para examenes seleccionados tickeados
    const [listaItemsLaboratorio, setListaItemsLaboratorio] = useState([]) // items laboratorio diagnostico 

    const [listaGrupo, setListaGrupo] = useState([])
    const [listaGrupoEtario, setListaGrupoEtario] = useState([])


    const [modalRegistrar, setModalRegistrar] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDiagnostico, setModalDiagnostico] = useState(false)


    const [id, setId] = useState({ campo: null, valido: null })


    const [idPaciente, setIdPaciente] = useState({ campo: null, valido: null });
    const [paciente, setPaciente] = useState({ campo: null, valido: null });
    const [fechaSolicitud, setFechaSolicitud] = useState({ campo: new Date().toISOString().split('T')[0], valido: 'true' });
    const [edad, setEdad] = useState({ campo: 0, valido: 'true' });
    const [edadWidow, setEdadWidow] = useState({ campo: 0, valido: 'true' });

    const [idGrupo, setIdGrupo] = useState({ campo: null, valido: null });
    const [grupo, setGrupo] = useState({ campo: null, valido: null });
    const [idGrupoEtario, setIdGrupoEtario] = useState({ campo: null, valido: null });
    const [grupoEtario, setGrupoEtario] = useState({ campo: null, valido: null });
    const [idPreQuirurgico, setIdPreQuirurgico] = useState({ campo: null, valido: null });
    const [preQuirurgico, setPreQuirurgico] = useState({ campo: null, valido: null });
    const [idPostTratamiento, setIdPostTratamiento] = useState({ campo: null, valido: null });
    const [postTratamiento, setPostTratamiento] = useState({ campo: null, valido: null });
    const [estadoMujeres, setEstadoMujeres] = useState({ campo: null, valido: null });
    const [idEstadoMujeres, setIdEstadoMujeres] = useState({ campo: null, valido: null });
    const [codigo, setCodigo] = useState({ campo: null, valido: null });

    const [comunidad, setComunidad] = useState({ campo: null, valido: null });
    const [idComunidad, setIdComunidad] = useState({ campo: null, valido: null });
    const [estadoEnvio, setEstadoEnvio] = useState(0); 




    useEffect(() => {
        listar()
    }, [])


    const initialFormState = {
        campo: null,
        valido: null
    };

    
    const vaciarDatos = () => {
        const fieldsToReset = {
            setId,
            setPreQuirurgico,

        };
        Object.values(fieldsToReset).forEach(setterFn => {
            setterFn(initialFormState);
        });
        setListaItemsLaboratorioAdmitidos([])

        setModalEdit(false);
        setModalRegistrar(false);
    };

    const listar = async () => {
        const data = await buscarDB(API_ENDPOINTS.DIAGNOSTICO.LISTAR, { id_paciente });
        if (data[0]?.length > 0) {


            setListaDiagnostico(data[0])
        } else toast.error("No hay diagnostico registrados")
        if (data[1]?.length > 0) {
            for (let f of data[1]) {
                var fechaDeNacimiento = new Date(f.fecha_nacimiento);
                var hoy = new Date();
                const milisegundosPorAnio = 1000 * 60 * 60 * 24 * 365;
                if (parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) >= 1) {
                    f.edad = parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' años';
                    localStorage.setItem('edad', f.edad+' años')
                    setEdad({ campo: parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio), valido: 'true' })
                    setEdadWidow({ campo: parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' Años', valido: 'true' })
                    setIdGrupo({ campo: 2, valido: 'true' })
                    setGrupo({ campo: 'CRONICO', valido: 'true' }) 
                    setListaGrupoEtario(data[2])
                    for (let ge of data[2]) {
                        if (parseInt(f.edad) >= ge.inf && parseInt(f.edad) <= ge.sup && ge.id_grupo === 2) {
                            setIdGrupoEtario({ campo: ge.id, valido: 'true' })
                            setGrupoEtario({ campo: ge.label, valido: 'true' })
                        }
                    }
                }
                if (parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) < 1) {
                    setIdGrupo({ campo: 1, valido: 'true' })
                    setGrupo({ campo: 'CONGENITO', valido: 'true' })

                    let edad = Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365);

                    for (let ge of data[2]) {
                        if (parseInt(edad) < 31 && parseInt(edad) >= ge.inf && parseInt(edad) <= ge.sup && ge.id_grupo === 1 && ge.categoria === 1) {
                            setIdGrupoEtario({ campo: ge.id, valido: 'true' })
                            setGrupoEtario({ campo: ge.label, valido: 'true' })
                            f.edad = Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365) + ' dias';
                            localStorage.setItem('edad', f.edad+'   días')

                            setEdad({ campo: edad, valido: 'true' })
                            setEdadWidow({ campo: parseInt(edad) + ' Dias', valido: 'true' })
                        }
                        if (edad > 30 && parseInt(edad) / 30 >= ge.inf && parseInt(edad) / 30 <= ge.sup && ge.id_grupo === 1 && ge.categoria === 2) {
                            // alert(edad+ ' edad actual mayor a un mes ' + ge.label);
                            setIdGrupoEtario({ campo: ge.id, valido: 'true' })
                            setGrupoEtario({ campo: ge.label, valido: 'true' })
                            f.edad = parseInt(Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365) / 30) + ' meses';
                            localStorage.setItem('edad', f.edad+'   meses')

                            setEdad({ campo: parseInt(edad / 30), valido: 'true' })
                            setEdadWidow({ campo: parseInt(edad / 30) + ' Meses', valido: 'true' })

                        }
                    } 

                }


                setPacienteData(data[1])
                setIdPaciente({ campo: data[1][0].id, valido: 'true' })
                setPaciente({ campo: data[1][0].nombre + ' ' + data[1][0].ap1 + ' ' + data[1][0].ap2, valido: 'true' })
            }
        }
    }


    const listarParametros = async (edicion, codigo) => {
        const loadingToast = toast.loading('Cargando información...');
        const data = await start(API_ENDPOINTS.DIAGNOSTICO.LISTAR_PARAMETROS, { codigo })
        toast.dismiss(loadingToast);

        if (data[0]?.length > 0) {
            setListaGrupo(data[0])
        }
        if (data[1]?.length > 0) {
            setListaItemsLaboratorio(data[1])
        }
        if (data[2]?.length > 0) {
            for (let element of data[2]) {
                listaItemsLaboratorioAdmitidos.push(element.id_items_diagnostico)
            };
            setListaItemsLaboratorioData(data[2])
        }
        if (edicion == 1) {
            setModalRegistrar(true)
        }
        if (edicion == 2) {
            setModalEdit(true)
            setTimeout(() => {
            }, 1000)
        }
        if (edicion == 3) {
            setModalDiagnostico(true)
        }

    }

    const exportPDf = async (output) => {
        const response = await diagnosticoPDF(output, {
            lista: [diagnosticoData],
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
            fileDownload(blob, "DIAGNOSTICO.pdf");
        }
    };


    const insertar = async () => {
        const loadingToast = toast.loading('Registrando información...');
        let listaFinalAdmitidos = []
        for (let i = 0; i < listaItemsLaboratorio.length; i++) {
            for (let j = 0; j < listaItemsLaboratorioAdmitidos.length; j++) {
                if (listaItemsLaboratorio[i].value == listaItemsLaboratorioAdmitidos[j]) {
                    listaFinalAdmitidos.push({ value: listaItemsLaboratorio[i].value, label: listaItemsLaboratorio[i].label })
                }
            }
        }

        if (estadoEnvio === 0) {
            setEstadoEnvio(1);
            await saveDB(API_ENDPOINTS.DIAGNOSTICO.REGISTRAR, {
                fecha_solicitud: fechaSolicitud.campo,
                id_grupo: idGrupo.campo,
                grupo: grupo.campo,
                id_grupo_etario: idGrupoEtario.campo,
                grupo_etario: grupoEtario.campo,
                edad: edad.campo,
                id_pre_quirurgico: idPreQuirurgico.campo,
                pre_quirurgico: preQuirurgico.campo,
                id_post_tratamiento: idPostTratamiento.campo,
                post_tratamiento: postTratamiento.campo,
                id_estado_mujeres: idEstadoMujeres.campo,
                estado_mujeres: estadoMujeres.campo,
                id_paciente: idPaciente.campo,
                paciente: paciente.campo,
                comunidad: comunidad.campo,
                id_comunidad: idComunidad.campo,
                listaFinalAdmitidos,
            }, setModalRegistrar, setEstadoEnvio, false, vaciarDatos)
            toast.dismiss(loadingToast);
            listar()

        } else toast.error("Por favor complete todos los campos requeridos antes de continuar");
    };

    const editar = async () => {
        const loadingToast = toast.loading('Actualizando información...');
        let listaFinalAdmitidos = []
        for (let i = 0; i < listaItemsLaboratorio.length; i++) {
            for (let j = 0; j < listaItemsLaboratorioAdmitidos.length; j++) {
                if (listaItemsLaboratorio[i].value == listaItemsLaboratorioAdmitidos[j]) {
                    listaFinalAdmitidos.push({ value: listaItemsLaboratorio[i].value, label: listaItemsLaboratorio[i].label })
                }
            }
        }
        await editDB(API_ENDPOINTS.DIAGNOSTICO.MODIFICAR, {
            id: id.campo,
            fecha_solicitud: fechaSolicitud.campo,
            id_grupo: idGrupo.campo,
            grupo: grupo.campo,
            id_grupo_etario: idGrupoEtario.campo,
            grupo_etario: grupoEtario.campo,
            edad: edad.campo,
            id_pre_quirurgico: idPreQuirurgico.campo,
            pre_quirurgico: preQuirurgico.campo,
            id_post_tratamiento: idPostTratamiento.campo,
            post_tratamiento: postTratamiento.campo,
            id_estado_mujeres: idEstadoMujeres.campo,
            estado_mujeres: estadoMujeres.campo,
            id_paciente: idPaciente.campo,
            paciente: paciente.campo,
            comunidad: comunidad.campo,
            id_comunidad: idComunidad.campo,
            codigo: codigo.campo,
            listaFinalAdmitidos,
        }, setModalEdit, false, vaciarDatos)
        toast.dismiss(loadingToast);
        listar()
    };


    const eliminar = async (codigo) => {
        if (window.confirm('Eliminar Consulta ?')) {
            await eliminarDB(API_ENDPOINTS.DIAGNOSTICO.ELIMINAR, { codigo })
            listar()
        }
    }


    return <>
        <div className="content" >
            <div className="main-container">


                <Card>
                    <CardHeader>
                        <BackgroundColorContext.Consumer>
                            {({ color }) => (
                                <div className="tbl-header" data={color}>

                                    <div className="row">
                                        <div className="col-8">
                                            DIAGNOSTICO

                                        </div>

                                        <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button className='btn-new' pb={3} onClick={() => { setModalRegistrar(true); listarParametros(1, null) }} >
                                                Registrar
                                            </button >
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
                                    {pacienteData[0].ci ? 'C.I.: ' + pacienteData[0].ci : 'C.I.: no tiene'}
                                </p>
                                {pacienteData[0].ap2 ? <>
                                    <p style={{ color: '#2C3E50', marginBottom: '0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease-out' }}>
                                        <i className="fas fa-user animate__animated animate__bounce animate__infinite" style={{ fontSize: '1.4rem', color: '#00AEA4', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}></i>
                                        Paciente:
                                        <span style={{ fontWeight: '600', fontSize: '1.3rem', color: '#00AEA4', textShadow: '0 1px 4px rgba(0,0,0,0.1)', letterSpacing: '0.4px' }}>
                                            {pacienteData[0].nombre + ' ' + pacienteData[0].ap1 + ' ' + pacienteData[0].ap2}
                                        </span>
                                    </p>
                                </>
                                    : <>
                                        <p style={{ color: '#2C3E50', marginBottom: '0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease-out' }}>
                                            <i className="fas fa-user animate__animated animate__bounce animate__infinite" style={{ fontSize: '1.4rem', color: '#00AEA4', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}></i>
                                            Paciente:
                                            <span style={{ fontWeight: '600', fontSize: '1.3rem', color: '#00AEA4', textShadow: '0 1px 4px rgba(0,0,0,0.1)', letterSpacing: '0.4px' }}>
                                                {pacienteData[0].nombre + ' ' + pacienteData[0].ap1}
                                            </span>
                                        </p>
                                    </>
                                }
                                <p className="animate__animated animate__fadeIn" style={{ marginBottom: '1rem', color: '#2C3E50', fontSize: '1.2rem', fontWeight: '600', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.3s ease' }}>

                                    {'Edad: ' + pacienteData[0].edad}
                                </p>
                            </div>
                        </div>
                    }


                    <div style={{ minHeight: '20rem', }}>

                        <Table className="tablesorter" responsive >
                            <thead className="text-primary">
                                <tr>
                                    <th >FECHA SOLICITUD</th>
                                    <th >PACIENTE</th>
                                    <th >HOSPITAL ORIGEN</th>
                                    <th >GRUPO ETARIO</th>
                                    <th >MEDICO SOLICITANTE</th>
                                    <th >ESTADO</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >
                                {listaDiagnostico.map((a, index) => (
                                    <tr key={a.id} style={{
                                        height: '50px', background: index % 2 == 0 ? "#E1EEF4" : 'white',
                                        color: index % 2 == 0 ? "#00496B" : 'white',
                                        borderLeft: a.id_medico_diagnostico > 0 ? '5px solid #00AEA4' : 'none'
                                    }} className='item'>
                                        <td>
                                            <div className="tbl-name tbl-bold">{a.fecha_solicitud}</div>
                                        </td>

                                        <td>
                                            <div className="tbl-name tbl-bold">{a.ap2 ? a.nombre + ' ' + a.ap1 + ' ' + a.ap2 : a.nombre + ' ' + a.ap1}</div>
                                            <div className="tbl-des">{'C.I.: ' + a.ci}</div>
                                        </td>

                                        <td>
                                            <div className="tbl-name tbl-bold">{a.hospital}</div>
                                            <div className="tbl-des">{'Comunidad: ' + a.comunidad}</div>
                                        </td>

                                        <td>
                                            <div className="tbl-name tbl-bold">{a.grupo_etario}</div>
                                            <div className="tbl-des">{a.grupo}</div>
                                        </td>
                                        <td>{a.medico_solicitante}</td>
                                        <td>{a.id_medico_diagnostico > 0 ? <span className='text-success tbl-bold'>Realizado</span> : <span className='text-danger tbl-bold'>Pendiente</span>}</td>
                                        <td>
                                            <div className="btn-tbl-container row">
                                                {pacienteData[0]?.editable == 1 && (!a.negativo || !a.positivo || !a.indeterminado) && <>
                                                    <div
                                                        onClick={() => {
                                                            setIdGrupoEtario({ campo: a.id_grupo_etario, valido: true })
                                                            setGrupoEtario({ campo: a.grupo_etario, valido: true })
                                                            setIdGrupo({ campo: a.id_grupo, valido: true })
                                                            setGrupo({ campo: a.grupo, valido: true })
                                                            setEdad({ campo: a.edad, valido: true })

                                                            setIdPreQuirurgico({ campo: a.id_pre_quirurgico, valido: true })
                                                            setPreQuirurgico({ campo: a.pre_quirurgico, valido: true })
                                                            setIdPostTratamiento({ campo: a.id_post_tratamiento, valido: true })
                                                            setPostTratamiento({ campo: a.post_tratamiento, valido: true })
                                                            setIdEstadoMujeres({ campo: a.id_estado_mujeres, valido: true })
                                                            setEstadoMujeres({ campo: a.estado_mujeres, valido: true })
                                                            setId({ campo: a.id, valido: true })
                                                            listarParametros(2, a.codigo)
                                                            setCodigo({ campo: a.codigo, valido: true })
                                                        }}
                                                        className="btn-tbl col-3 bg-info" ><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></div>
                                                    <div
                                                        onClick={() => { eliminar(a.codigo) }}
                                                        className="btn-tbl col-3  ml-1" style={{ background: '#FF3D85' }}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                                    </div>
                                                </>
                                                }
                                                <div
                                                    onClick={() => { setDiagnosticoData(a); listarParametros(3, a.codigo) }}
                                                    className="btn-tbl btn-success col-3  ml-1 " ><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></div>
                                            </div>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>


                        <div style={{ padding: '1rem' }}>
                            {listaDiagnostico.length + " Registro(s)"}
                        </div>
                    </div>
                </Card>

            </div>
        </div>



        <Modal isOpen={modalDiagnostico} toggle={() => { setModalDiagnostico(false); vaciarDatos() }} className='modal-lg' >
            <ModalHeader toggle={() => { setModalDiagnostico(false); vaciarDatos() }} >DIAGNOSTICOS SOLICITADOS</ModalHeader>
            <ModalBody className="p-3" >
                {pacienteData.length > 0 && <>
                    <p className=" wow fadeInUp " style={{ marginBottom: '0' }}> {pacienteData[0].ci ? 'C.I. : ' + pacienteData[0].ci : 'C.I. : no tiene'}  </p>
                    <p >Paciente: <span style={{ fontWeight: '500' }}>  {pacienteData[0].nombre + ' ' + pacienteData[0].ap1 + ' ' + pacienteData[0].ap2}
                    </span></p>
                </>}
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

                        }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>FECHA DIAGNOSTICO</label> : {diagnosticoData.fecha_solicitud}</p>

                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>Edad</label> : {diagnosticoData.edad}</p>
                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>Grupo Etario</label> : {diagnosticoData.grupo + ' (' + diagnosticoData.grupo_etario + ')'}</p>
                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>POST-TRATAMIENTO</label> : {diagnosticoData.post_tratamiento}</p>
                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>PRE-QUIRURGICO</label> : {diagnosticoData.pre_quirurgico}</p>
                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>ESTADO MUJERES</label> : {diagnosticoData.estado_mujeres}</p>
                    </div>

                    <div className='col-md-6' style={{
                        background: '#FFFFFF',
                        padding: '20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}>
                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>CONCLUSIONES</label> : {diagnosticoData.conclusiones}</p>
                        <p style={{ fontSize: '14px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>OBSERVACIONES</label> : {diagnosticoData.observaciones}</p>
                        <p style={{ fontSize: '12px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>HOSPITAL SOLICITANTE</label> : {diagnosticoData.hospital}</p>
                        <p style={{ fontSize: '12px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>MEDICO SOLICITANTE</label> : {diagnosticoData.medico_solicitante}</p>
                        <p style={{ fontSize: '12px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>LABORATORIO</label> : {diagnosticoData.laboratorio}</p>
                        <p style={{ fontSize: '12px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>MEDICO DIAGNOSTICO</label> : {diagnosticoData.medico_diagnostico}</p>
                        <p style={{ fontSize: '11px', color: '#2C3E50', marginBottom: '5px' }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>CODIGO</label> : {diagnosticoData.codigo}</p>
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
                    }}>Resultados Laboratorio</h6>
                    <p className="pl-3">{listaItemsLaboratorioData[0]?.fecha_diagnostico ? 'Fecha de actualización resultados: ' + listaItemsLaboratorioData[0]?.fecha_diagnostico : ''}</p>
                    <p className="pl-3">{listaItemsLaboratorioData[0]?.ultima_modificacion ? 'Última actualización resultados: ' + listaItemsLaboratorioData[0]?.ultima_modificacion : ''}</p>
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
                                }}>{e.items_diagnostico}</p>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#6c757d',
                                    margin: 0
                                }}>POSITIVO :  {e.positivo}
                                </p>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#6c757d',
                                    margin: 0
                                }}>NEGATIVO :  {e.negativo}
                                </p>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#6c757d',
                                    margin: 0
                                }}>INDETERMINADO :  {e.indeterminado}
                                </p>
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
            className="modal-md"
        >
            <ModalHeader
                toggle={() => { setModalRegistrar(!modalRegistrar); vaciarDatos() }}
            >
                REGISTRO DE DIAGNOSTICO
            </ModalHeader>
            <ModalBody style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>

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
                            DIAGNOSTICO
                        </legend>
                        <div className="row g-3 p-2">
                            <div className="col-md-6" style={{ marginBottom: '.7rem' }}>
                                <InputUsuario
                                    estado={fechaSolicitud}
                                    name={'fecha_solicitud'}
                                    tipo="date"
                                    cambiarEstado={setFechaSolicitud}
                                    ExpresionRegular={INPUT.DATE}
                                    etiqueta={'Fecha Solicitud'}
                                    msg={"el formato no es valido"}
                                />
                            </div>


                            <div className="col-md-6" style={{ marginBottom: '.7rem' }}>
                                <ComponenteInputUserDisabled
                                    estado={edadWidow}
                                    cambiarEstado={setEdadWidow}
                                    etiqueta={'Edad'}
                                    name={'edad'}
                                />
                            </div>


                            <div className="col-md-4" style={{ marginBottom: '.7rem' }}>
                                <Select1
                                    estado={idPostTratamiento}
                                    cambiarEstado={setIdPostTratamiento}
                                    ExpresionRegular={INPUT.ID}
                                    etiqueta={'PostTratamiento'}
                                    msg={"el formato no es valido"}
                                    lista={[{ value: 1, label: 'Si' }, { value: 2, label: 'No' }]}
                                    name={'id_post_tratamiento'}
                                    label={setPostTratamiento}
                                    importante={false}
                                />
                            </div>

                            <div className="col-md-4" style={{ marginBottom: '.7rem' }}>
                                <Select1
                                    estado={idPreQuirurgico}
                                    cambiarEstado={setIdPreQuirurgico}
                                    ExpresionRegular={INPUT.ID}
                                    etiqueta={'Prequirurgico'}
                                    msg={"el formato no es valido"}
                                    lista={[{ value: 1, label: 'Si' }, { value: 2, label: 'No' }]}
                                    name={'id_prequirurgico'}
                                    label={setPreQuirurgico}
                                    importante={false}
                                />
                            </div>

                            <div className="col-md-4" style={{ marginBottom: '.7rem' }}>
                                <Select1
                                    estado={idEstadoMujeres}
                                    cambiarEstado={setIdEstadoMujeres}
                                    ExpresionRegular={INPUT.ID}
                                    etiqueta={'Estado Mujeres'}
                                    msg={"el formato no es valido"}
                                    lista={[{ value: 1, label: 'GESTANTES SEROPOSITIVAS PARA CHAGAS DETECTADAS EN CONTROL PRE-NATAL' }]}
                                    name={'id_estado_mujeres'}
                                    label={setEstadoMujeres}
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
                            SOLICITUD DE EXAMENES COMPLEMENTARIOS
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
                <p style={{ color: 'red', textAlign: 'center' }}>Todo paciente con dos pruebas serológicas positivos se considera para hacer tratamiento</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem'
                }}>
                    <button
                        onClick={() => insertar()}
                        className="btn btn-primary"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
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
            className="modal-md"
        >
            <ModalHeader
                toggle={() => { setModalEdit(!modalEdit); vaciarDatos() }}
            >
                EDITAR DIAGNOSTICO
            </ModalHeader>
            <ModalBody style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>

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
                            DIAGNOSTICO
                        </legend>
                        <div className="row g-3 p-2">
                            <div className="col-md-6" style={{ marginBottom: '.7rem' }}>
                                <InputUsuario
                                    estado={fechaSolicitud}
                                    name={'fecha_solicitud'}
                                    tipo="date"
                                    cambiarEstado={setFechaSolicitud}
                                    ExpresionRegular={INPUT.DATE}
                                    etiqueta={'Fecha Solicitud'}
                                    msg={"el formato no es valido"}
                                />
                            </div>


                            <div className="col-md-6" style={{ marginBottom: '.7rem' }}>
                                <ComponenteInputUserDisabled
                                    estado={edadWidow}
                                    cambiarEstado={setEdadWidow}
                                    etiqueta={'Edad'}
                                    name={'edad'}
                                />
                            </div>

                            <div className="col-md-4" style={{ marginBottom: '.7rem' }}>
                                <Select1
                                    estado={idPostTratamiento}
                                    cambiarEstado={setIdPostTratamiento}
                                    ExpresionRegular={INPUT.ID}
                                    etiqueta={'PostTratamiento'}
                                    msg={"el formato no es valido"}
                                    lista={[{ value: 1, label: 'Si' }, { value: 2, label: 'No' }]}
                                    name={'id_post_tratamiento'}
                                    label={setPostTratamiento}
                                    importante={false}
                                />
                            </div>

                            <div className="col-md-4" style={{ marginBottom: '.7rem' }}>
                                <Select1
                                    estado={idPreQuirurgico}
                                    cambiarEstado={setIdPreQuirurgico}
                                    ExpresionRegular={INPUT.ID}
                                    etiqueta={'Prequirurgico'}
                                    msg={"el formato no es valido"}
                                    lista={[{ value: 1, label: 'Si' }, { value: 2, label: 'No' }]}
                                    name={'id_prequirurgico'}
                                    label={setPreQuirurgico}
                                    importante={false}
                                />
                            </div>

                            <div className="col-md-4" style={{ marginBottom: '.7rem' }}>
                                <Select1
                                    estado={idEstadoMujeres}
                                    cambiarEstado={setIdEstadoMujeres}
                                    ExpresionRegular={INPUT.ID}
                                    etiqueta={'Estado Mujeres'}
                                    msg={"el formato no es valido"}
                                    lista={[{ value: 1, label: 'GESTANTES SEROPOSITIVAS PARA CHAGAS DETECTADAS EN CONTROL PRE-NATAL' }]}
                                    name={'id_estado_mujeres'}
                                    label={setEstadoMujeres}
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
                            SOLICITUD DE EXAMENES COMPLEMENTARIOS
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
                <p style={{ color: 'red', textAlign: 'center' }}>Todo paciente con dos pruebas serológicas positivos se considera para hacer tratamiento</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem'
                }}>
                    <button
                        onClick={() => editar()}
                        className="btn btn-success"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        Editar
                    </button>
                </div>

            </ModalBody>
        </Modal>

    </>
}
