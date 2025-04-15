
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../api";
import { Card, CardHeader, Modal, ModalBody, ModalHeader, Table, Row, CardBody, FormGroup, } from "reactstrap";
import { buscarDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { Link, } from "react-router-dom";
import { diagnosticoPDF } from "pdfMake/diagnostico";
import fileDownload from "js-file-download";
import { editDB } from "service";
import { InputUsuario, } from "../input/elementos";
import { INPUT } from "Auth/config";
import toast from "react-hot-toast";
import { start } from "service";
import { ComponenteInputBuscar_ } from "components/input/elementos";

export default function Laboratorio() {

    const [listaDiagnostico, setListaDiagnostico] = useState([])  // LISTA DE DIAGNOSTICOS SOLICITADOS|
    const [pacienteData, setPacienteData] = useState([])  // datos del paciente
    const [diagnosticoData, setDiagnosticoData] = useState([]) // datos de la presente solicitud
    const [listaItemsLaboratorioData, setListaItemsLaboratorioData] = useState([])  // lista para mostrar examenes seleccionados

    const [modalEdit, setModalEdit] = useState(false)
    const [modalDiagnostico, setModalDiagnostico] = useState(false)

    const [observaciones, setObservaciones] = useState({ campo: null, valido: null })
    const [conclusiones, setConclusiones] = useState({ campo: null, valido: null })

    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });

    useEffect(() => {
        listar()
    }, [])

    const initialFormState = {
        campo: null,
        valido: null
    };
    const vaciarDatos = () => {
        const fieldsToReset = {
            setConclusiones,
            setObservaciones,
        };
        Object.values(fieldsToReset).forEach(setterFn => {
            setterFn(initialFormState);
        });
        setDiagnosticoData([])
        setModalEdit(false);
    };

    const listar = async () => {
        const data = await buscarDB(API_ENDPOINTS.LABORATORIO.LISTAR);
        if (data.length > 0) {
            setListaDiagnostico(data)
        } else {
            toast.error("No hay solicitudes pendientes")
            setListaDiagnostico([])
        }

    }

    const buscarPaciente = async () => {
        const data = await buscarDB(API_ENDPOINTS.LABORATORIO.BUSCAR_PACIENTE, { datoPaciente: inputBuscar.campo });
        if (data.length > 0) {
            setListaDiagnostico(data)
        } else toast.error("No se encontraron resultados")

    }

    const listarParametros = async (edicion, codigo) => {
        const loadingToast = toast.loading('Cargando información...');
        const data = await start(API_ENDPOINTS.LABORATORIO.LISTAR_PARAMETROS, { codigo })
        if (data.length > 0) {

            setListaItemsLaboratorioData(data)
        }
        toast.dismiss(loadingToast);
        setTimeout(() => {
            if (edicion == 2) {
                setModalEdit(true)
            }
            if (edicion == 3) {
                setModalDiagnostico(true)
            }

        }, 500)

    }

    const exportPDf = async (output) => {
        const response = await diagnosticoPDF(output, {
            lista: [diagnosticoData],
            listaItemsLaboratorioData,
            paciente: [pacienteData],
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


    const editarResultados = async () => {

        await editDB(API_ENDPOINTS.LABORATORIO.MODIFICAR, {
            conclusiones: conclusiones.campo,
            observaciones: observaciones.campo,
            lista_resultados: listaItemsLaboratorioData,
        }, setModalEdit, false, vaciarDatos)
        listar()
    };




    return <>
        <div className="content" >
            <div className="main-container">


                <Card>
                    <CardHeader>
                        <BackgroundColorContext.Consumer>
                            {({ color }) => (
                                <div className="tbl-header" data={color}>
                                    <div className="row">
                                        LABORATORIO
                                    </div>
                                </div>
                            )}
                        </BackgroundColorContext.Consumer>
                    </CardHeader>

                    {/* <CardBody> */}
                    <div style={{ marginTop: '2rem' }}>
                        <ComponenteInputBuscar_
                            estado={inputBuscar}
                            cambiarEstado={setInputBuscar}
                            name="inputBuscar"
                            ExpresionRegular={INPUT.INPUT_BUSCAR} //expresion regular
                            placeholder="Escriba para filtrar ..."
                            eventoBoton={buscarPaciente}
                            etiqueta={"Buscar"}
                        />
                    </div>
                    <div style={{ minHeight: '20rem', marginTop: '1rem' }}>
                        <Table className="tablesorter" responsive  >
                            <thead className="text-primary">
                                <tr>
                                    <th >FECHA SOLICITUD</th>
                                    <th >PACIENTE</th>
                                    <th >HOSPITAL ORIGEN</th>
                                    <th >EDAD</th>
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
                                        borderLeft: a.id_medico_diagnostico > 0 ? '5px solid #00AEA4' : '5px solid #fd5d93'
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
                                            <div className="tbl-name tbl-bold text-center">{a.edad}</div>
                                        </td>
                                        <td>
                                            <div className="tbl-name tbl-bold">{a.grupo_etario}</div>
                                            <div className="tbl-des">{a.grupo}</div>
                                        </td>
                                        <td>{a.medico_solicitante}</td>
                                        <td>{a.id_medico_diagnostico > 0 ? <span className='text-success tbl-bold'>Realizado</span> : <span className='text-danger tbl-bold'>Pendiente</span>}</td>
                                        <td>
                                            {(a.estado == 0) && <Link
                                                className="btn-tbl-tratamiento  "
                                                to={'#'}
                                                onClick={() => {
                                                    setConclusiones({ campo: a.conclusiones, valido: true })
                                                    setObservaciones({ campo: a.observaciones, valido: true })
                                                    listarParametros(2, a.codigo)
                                                }}
                                            >
                                                RESULTADOS
                                            </Link>}
                                        </td>
                                        <td>
                                            <Link
                                                className="btn-tbl-diagnostico  "
                                                to={'#'}
                                                onClick={() => {
                                                    setPacienteData(a)
                                                    setDiagnosticoData(a); listarParametros(3, a.codigo);
                                                }}
                                            >
                                                DETALLES
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div style={{ padding: '1rem' }}>
                        {listaDiagnostico.length + " Registro(s)"}
                    </div>
                    {/* </CardBody> */}
                </Card>

            </div>
        </div>



        <Modal isOpen={modalDiagnostico} toggle={() => { setModalDiagnostico(false); vaciarDatos() }} className='modal-lg' >
            <ModalHeader toggle={() => { setModalDiagnostico(false); vaciarDatos() }} > </ModalHeader>
            <ModalBody className="p-3" >
                {listaDiagnostico.length > 0 && <>
                    <p className=" wow fadeInUp " style={{ marginBottom: '0' }}> {'C.I. : ' + listaDiagnostico[0].ci}  </p>
                    <p >Paciente: <span style={{ fontWeight: '500' }}>  {listaDiagnostico[0].nombre + ' ' + listaDiagnostico[0].ap1 + ' ' + listaDiagnostico[0].ap2}
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

                        }}><label style={{ color: '#00AEA4', fontWeight: 600 }}>FECHA SOLICITUD</label> : {diagnosticoData.fecha_solicitud}</p>

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
            isOpen={modalEdit}
            toggle={() => { setModalEdit(!modalEdit); vaciarDatos() }}
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
                    <fieldset className="" style={{
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
                            EXAMENES SOLICITADOS
                        </legend>
                        <div className="row g-3 p-1">
                            {
                                listaItemsLaboratorioData.map((e, index) => (
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{ marginBottom: '.7rem' }}>
                                        <FormGroup>
                                            <label>{e.items_diagnostico}</label>
                                            <select
                                                key={index}
                                                className="inputUsuario-tabla"
                                                name={`items_diagnostico_${e.id_items_diagnostico}`}
                                                onChange={(r) => {

                                                    if (r.target.value == 1) {
                                                        e.positivo = 1
                                                        e.negativo = 2
                                                        e.indeterminado = 2
                                                    }
                                                    if (r.target.value == 2) {
                                                        e.negativo = 1
                                                        e.positivo = 2
                                                        e.indeterminado = 2
                                                    }
                                                    if (r.target.value == 3) {
                                                        e.indeterminado = 1
                                                        e.positivo = 2
                                                        e.negativo = 2
                                                    }
                                                    if (r.target.value == 0) {
                                                        e.indeterminado = 0
                                                        e.positivo = 0
                                                        e.negativo = 0
                                                    }
                                                }}
                                            >
                                                <option value={0}>Seleccione</option>
                                                <option value={1}>POSITIVO  </option>
                                                <option value={2}>NEGATIVO  </option>
                                                <option value={3}>INDETERMINADO  </option>
                                            </select>
                                        </FormGroup>
                                    </div>
                                ))
                            }
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
                            DIAGNOSTICO
                        </legend>
                        <div className="row g-3 p-1">
                            <div className="col-12" style={{ marginBottom: '.7rem' }}>
                                <InputUsuario
                                    estado={conclusiones}
                                    name={'conclusiones'}
                                    tipo="textarea"
                                    cambiarEstado={setConclusiones}
                                    ExpresionRegular={INPUT.TEXTO}
                                    etiqueta={'Conclusiones'}
                                    msg={"el formato no es valido"}
                                    importante={false}
                                />
                            </div>
                            <div className="col-12" style={{ marginBottom: '.7rem' }}>
                                <InputUsuario
                                    estado={observaciones}
                                    name={'observaciones'}
                                    tipo="textarea"
                                    cambiarEstado={setObservaciones}
                                    ExpresionRegular={INPUT.TEXTO}
                                    etiqueta={'Observaciones'}
                                    msg={"el formato no es valido"}
                                    importante={false}
                                />
                            </div>
                        </div>
                    </fieldset>
                </div>


                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem'
                }}>
                    <button
                        onClick={() => editarResultados()}
                        className="btn btn-success"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        Grabar resultados
                    </button>
                </div>

            </ModalBody>
        </Modal>

    </>
}
