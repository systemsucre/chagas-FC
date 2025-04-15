
import React, { useEffect, useState } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Row,
    Col,
    Modal, ModalBody, ModalHeader,
    Table,

} from "reactstrap";

import {
    InputUsuarioStandar,
} from "./input/elementos"; // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'
import { saveDB } from "service";
import toast from "react-hot-toast";
import { editDB } from "service";
import { eliminarDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ComponenteSubTitle } from "./input/elementos";
import { ComponenteInputUserDisabled } from "./input/elementos";
import { InputUsuarioStandarTable } from "./input/elementos";

import { sedes } from 'assets/img/logo';

import { ComponenteCheck_ } from "./input/elementos";
import { Select1Easy } from "./input/elementos";
const ExcelJS = require('exceljs')

export default function RecepcionUbe() {


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
    const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
    const [lista, setLista] = useState([]);
    const [listaMunicipio, setListaMunicipio] = useState([]);
    const [listaCasa, setListaCasa] = useState([]);
    const [listaUsuarios, setListaUsuario] = useState([]);

    const [listaComunidad, setListaComunidad] = useState([]);
    const [listaOtros, setListaOtros] = useState([]);



    const [casa, setCasa] = useState({ campo: null, valido: null });

    const [id, setId] = useState({ campo: null, valido: null });
    const [idMunicipio, setIdMunicipio] = useState({
        campo: parseInt(localStorage.getItem('id-municipio')) ? parseInt(localStorage.getItem('id-municipio')) : null,
        valido: parseInt(localStorage.getItem('id-municipio')) ? 'true' : null
    });

    const [lci, setLci] = useState({ campo: 0, valido: 'true' });
    const [lcp, setLcp] = useState({ campo: 0, valido: 'true' });
    const [ti, setTi] = useState({ campo: 0, valido: 'true' });
    const [ts, setTs] = useState({ campo: 0, valido: 'true' });
    const [tg, setTg] = useState({ campo: 0, valido: 'true' });
    const [pm, setPm] = useState({ campo: 0, valido: 'true' });
    const [other, setOther] = useState({ campo: 0, valido: 'true' });
    const [numEnvase, setNumEnvase] = useState({ campo: 0, valido: 'true' });
    const [vivos, setVivos] = useState({ campo: 0, valido: 'true' });
    const [muertos, setMuertos] = useState({ campo: 0, valido: 'true' });
    const [numAdultos, setNumAdultos] = useState({ campo: 0, valido: 'true' });
    const [numNinfas, setNumNinfas] = useState({ campo: 0, valido: 'true' });

    const [comunidad, setComunidad] = useState({
        campo: parseInt(localStorage.getItem('id-comunidad')) ? parseInt(localStorage.getItem('id-comunidad')) : null,
        valido: parseInt(localStorage.getItem('id-comunidad')) ? 'true' : null
    });

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalValidacion, setModalValidacion] = useState(false);
    const [estadoEnvio, setEstadoEnvio] = useState(0);

    const [activa, setActiva] = useState(false);
    const [denuncia, setDenuncia] = useState(false);
    const [movEst, setMovEst] = useState(false);
    const [otros, setOtros] = useState(false);






    const [usuario, setUsuario] = useState({ campo: null, valido: null });
    const [observaciones, setObservaciones] = useState({ campo: null, valido: null });



    const [consolidado, setConsolidado] = useState(true);



    useEffect(() => {
        document.title = "Recepcion de triatominos";
        listarMunicipio()
        return () => { }
    }, [])

    useEffect(() => {
        if (!activa && !denuncia && !movEst && !otros) {
            setActiva(true)
        }
    }, [activa, denuncia, movEst, otros])



    const listarCasas = async (comunidad) => {
        const data = await start(URL + '/ube/listar-casas', { comunidad })
        setListaCasa(data)
        if (data.length == 0) {
            toast.error('No se encontraron viviendas para esta comunidad')
            setCasa({ campo: null, valido: null })
            setListaCasa([])
        }
    };

    const listarDatosEE1 = async (casa) => {
        const data = await start(URL + '/ube/listar-datos-ee1', { casa })
        if (data.length > 0) {
            for (let e of data) {
                setLci({ campo: (e.ecin + e.ecia), valido: 'true' })
                document.getElementById('lci').value = (e.ecin + e.ecia)
                setLcp({ campo: (e.ecpn + e.ecpa), valido: 'true' })
                document.getElementById('lcp').value = (e.ecpn + e.ecpa)

                setNumAdultos({ campo: e.ecia + e.ecpa, valido: 'true' })
                document.getElementById('numero_adultos').value = (e.ecia + e.ecpa)
                setNumNinfas({ campo: e.ecin + e.ecpn, valido: 'true' })
                document.getElementById('numero_ninfas').value = (e.ecin + e.ecpn)

            }
            setActiva(true)
            setDenuncia(false)
            setMovEst(false)
            setOtros(false)
        } else {
            setActiva(false)
            setDenuncia(true)
            setMovEst(false)
            setOtros(false)
        }
    };

    const listar = async () => {
        const data = await start(URL + '/ube/listar', { comunidad: comunidad.campo, })
        setLista(data[0])
        setListaOtros(data[1])
        setConsolidado(true)
        for (let e of data[0]) {
            if (e.codigo !== data[0][0].codigo) {
                setConsolidado(false)
            }
        }

    };


    const listarMunicipio = async () => {
        const data = await start(URL + '/ube/listar-municipios')
        setListaMunicipio(data)
    };
    const listarComunidad = async (id) => {
        const data = await start(URL + '/ube/listar-comunidad', { id })
        setListaComunidad(data)
    };

    const listarUsuarios = async () => {
        const data = await start(URL + '/ube/listar-usuarios')
        setListaUsuario(data)
        setModalValidacion(true)
    };


    const buscar = async () => {

        if (comunidad.valido === 'true') {
            const data = await buscarDB(URL + '/ube/buscar', { comunidad: comunidad.campo, fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo })
            if (data[0].length < 1) {
                toast.error('No se encontraron datos')
                return
            }
            setLista(data[0])
            setListaOtros(data[1])
            setConsolidado(true)
            for (let e of data[0]) {
                if (e.codigo !== data[0][0].codigo) {
                    setConsolidado(false)
                    console.log(e.codigo, data[0][0].codigo)

                }
            }
        } else toast.error('Seleccione una comunidad...')
    };

    const vaciar = () => {

        setLci({ campo: 0, valido: 'true' })
        setLcp({ campo: 0, valido: 'true' })
        setTi({ campo: 0, valido: 'true' })
        setTs({ campo: 0, valido: 'true' })
        setTg({ campo: 0, valido: 'true' })
        setPm({ campo: 0, valido: 'true' })
        setOther({ campo: 0, valido: 'true' })
        setVivos({ campo: 0, valido: 'true' })
        setMuertos({ campo: 0, valido: 'true' })
        setNumEnvase({ campo: 0, valido: 'true' })
        setNumAdultos({ campo: 0, valido: 'true' })
        setNumNinfas({ campo: 0, valido: 'true' })


    }

    const insertar = async () => {
        if (
            casa.valido === 'true' &&
            lci.valido === 'true' &&
            lcp.valido === 'true' &&
            ti.valido === 'true' &&
            ts.valido === 'true' &&
            tg.valido === 'true' &&
            pm.valido === 'true' &&
            other.valido === 'true' &&
            numEnvase.valido === 'true' &&
            vivos.valido === 'true' &&
            muertos.valido === 'true' &&
            numAdultos.valido === 'true' &&
            numNinfas.valido === 'true' &&
            estadoEnvio === 0
        ) {

            setEstadoEnvio(1);
            await saveDB(URL + '/ube/guardar', {
                casa: casa.campo,
                lci: lci.campo,
                lcp: lcp.campo,
                ti: ti.campo,
                ts: ts.campo,
                tg: tg.campo,
                pm: pm.campo,
                other: other.campo,
                num_envase: numEnvase.campo,
                vivos: vivos.campo,
                muertos: muertos.campo,
                num_adultos: numAdultos.campo,
                num_ninfas: numNinfas.campo,
            }, setModalInsertar, setEstadoEnvio, false, vaciar)
            listar()
        } else toast.error("Formulario incompleto!")
        return;
    };

    const editar = async () => {
        if (!idMunicipio.campo || !comunidad.campo) {
            toast.error('Vuelva a seleccionar los parametros de inicio')
            localStorage.removeItem('id-comunidad')
            setModalEditar(false)
            return
        }
        if (
            id.valido === 'true' &&
            casa.valido === 'true' &&
            lci.valido === 'true' &&
            lcp.valido === 'true' &&
            ti.valido === 'true' &&
            ts.valido === 'true' &&
            tg.valido === 'true' &&
            pm.valido === 'true' &&
            other.valido === 'true' &&
            numEnvase.valido === 'true' &&
            vivos.valido === 'true' &&
            muertos.valido === 'true' &&
            numAdultos.valido === 'true' &&
            numNinfas.valido === 'true'
        ) {

            await editDB(URL + '/ube/actualizar', {
                id: id.campo,
                lci: lci.campo,
                lcp: lcp.campo,
                ti: ti.campo,
                ts: ts.campo,
                tg: tg.campo,
                pm: pm.campo,
                other: other.campo,
                num_envase: numEnvase.campo,
                vivos: vivos.campo,
                muertos: muertos.campo,
                num_adultos: numAdultos.campo,
                num_ninfas: numNinfas.campo,

            }, setModalEditar, false, vaciar)
            listar()
        } else toast.error("Formulario incompleto!");
    };

    const eliminar = async (id,) => {
        let ok = window.confirm('Eliminar a este registro ?')
        if (ok) {
            await eliminarDB(URL + '/ube/eliminar', { id })
            listar()
        }
    };

    const validar = async () => {
        let userOk = false
        if (denuncia || movEst || otros) {
            userOk = true
        }

        if (activa) {
            if (usuario.valido === 'true') userOk = true
        }

        if (comunidad.valido === 'true' && userOk) {
            let ok = window.confirm('UNA VEZ QUE CONFIRME ESTE PASO, YA NO PODRA HACER CORRECCIONES, SERCIORECE BIEN DE LOS REGISTROS GUARDADOS ANTES DE ENVIAR ?')
            if (ok) {
                await editDB(URL + '/ube/validar', {
                    comunidad: comunidad.campo,
                    activa,
                    denuncia, movEst, otros,
                    usuario: activa ? usuario.campo : 0,
                    observaciones: observaciones.campo
                },
                    setModalValidacion, false, null)
                listar()
            }
        } else toast.error('Complete todos los campos del formulario')
    };

    const toggle = () => {
        setModalInsertar(!modalInsertar)
        vaciar()
    }

    const toggleEdit = () => {
        setModalEditar(false)
        vaciar()
    }



    const listaExcel = async () => {

        if (lista.length == 0) { toast.error('no hay datos para exportas'); return }
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'system sucre cel 71166513';
        workbook.lastModifiedBy = 'SYSTEM SUCRE';

        const principal = workbook.addWorksheet('RECEPCION', {
            properties:
            {
                tabColor: { argb: '1bbec0 ' }, showGridLines: false
            },
            pageSetup: {
                paperSize: 9, orientation: 'landscape'
            },

        })

        for (let index = 1; index < 1000; index++) {
            principal.getColumn(index).width = 5
        }

        principal.columns.forEach((column) => {
            column.alignment = { vertical: 'middle', wrapText: true }
            column.font = { name: 'Arial', color: { argb: '595959' }, family: 2, size: 9, italic: false }
        })
        principal.mergeCells("A1:C5");

        const imageId = workbook.addImage({
            base64: sedes,
            extension: 'png',
        })


        // CONFIGURACION DE LOS TIRULOS, NOMBRE HOSPITAL, MESES Y GESTION
        principal.addImage(imageId, { tl: { col: 0.6, row: 0.1 }, ext: { width: 100, height: 95 } })
        principal.mergeCells('E1:L4');
        principal.getCell('E1').alignment = { vertical: 'center', horizontal: 'center' };
        principal.getCell("E1").font = { bold: 600, size: 14, color: { argb: "595959" }, italic: false, };
        principal.getCell('E1').value = 'FORMULARIO DE RECEPCION DE TRIATOMINOS'



        principal.mergeCells('A6:C6');
        principal.getCell('A6').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("A6").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
        principal.getCell('A6').value = 'DEPTO. : CHUQUISACA'

        listaOtros.forEach((e, i) => {
            principal.mergeCells('D6:F6');
            principal.getCell('D6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("D6").font = { size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('D6').value = 'RED DE SALUD: ' + e.red

            principal.mergeCells('G6:I6');
            principal.getCell('G6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("G6").font = { size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('G6').value = 'E. SALUD: ' + e.hospital

            principal.mergeCells('J6:L6');
            principal.getCell('J6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("J6").font = { size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('J6').value = 'MUNICIPIO: ' + e.municipio

            principal.mergeCells('M6:O6');
            principal.getCell('M6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("M6").font = { size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('M6').value = 'COMUNIDAD: ' + e.comunidad
            if (consolidado) {
                principal.mergeCells('P6:Q6');
                principal.getCell('P6').alignment = { vertical: 'center', horizontal: 'left' };
                principal.getCell("P6").font = { size: 6, color: { argb: "595959" }, italic: false, };
                principal.getCell('P6').value = 'FECHA RECEPCION: ' + lista[0].fecha
            }
        })

        if (consolidado && lista[0].estado === 2) {

            principal.mergeCells('A7:F7');
            principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("A7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('A7').value = lista[0].corresponde === 1 ? 'CORRESPONDE A: EVAL. ENTOMOLOGICA ACTIVA? "SI' : 'CORRESPONDE A: EVAL. ENTOMOLOGICA ACTIVA? "NO"'

            principal.mergeCells('G7:I7');
            principal.getCell('G7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("G7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('G7').value = lista[0].corresponde === 2 ? 'DENUNCIA FAMILIA? "SI"' : 'DENUNCIA FAMILIA? "NO"'

            principal.mergeCells('K7:O7');
            principal.getCell('K7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("K7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('K7').value = lista[0].corresponde === 3 ? 'MOVILIZACION SOCIAL ESTUDIANTIL? "SI"' : 'MOVILIZACION SOCIAL ESTUDIANTIL? "NO"'

            principal.mergeCells('P7:Q7');
            principal.getCell('P7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("P7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('P7').value = lista[0].corresponde === 4 ? 'OTROS? "SI"' : 'OTROS? "NO"'
        } else {
            principal.mergeCells('A7:P7');
            principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("A7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('A7').value = 'ESTA INFORMACION CORRESPONDE A DIFERENTES GRUPOS DE REGISTRO, O TODAVIA NO SE HA VALIDADO'
        }

        principal.getColumn('D').width = 7
        principal.getColumn('E').width = 7
        principal.getColumn('F').width = 7
        principal.getColumn('G').width = 7
        principal.getColumn('H').width = 7
        principal.getColumn('I').width = 7
        principal.getColumn('O').width = 7
        principal.getColumn('P').width = 10

        principal.getColumn('B').width = 7
        principal.getColumn('C').width = 7
        principal.getColumn('J').width = 7
        principal.getColumn('K').width = 7
        principal.getColumn('L').width = 7
        principal.getColumn('M').width = 7
        principal.getColumn('N').width = 7
        principal.getColumn('N').width = 7
        principal.getColumn('N').width = 7
        principal.getColumn('Q').width = 10

        principal.mergeCells('A8:B10');
        principal.getCell('A8').value = 'NOMBRE Y APELLIDO DE JEFE DE FAMILIA'
        principal.getCell('A8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('A8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('A8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('A8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('C8:C10');
        principal.getCell('C8').value = 'N°C.V'
        principal.getCell('C8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('C8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('C8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('C8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('D8:E9');
        principal.getCell('D8').value = 'LUGAR DE CAPTURA'
        principal.getCell('D8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('D8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('D8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('D8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('D10').value = 'INTRA'
        principal.getCell('D10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('D10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('D10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('D10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('E10').value = 'PERI'
        principal.getCell('E10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('E10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('E10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('E10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('F8:J9');
        principal.getCell('F8').value = 'ESPECIE'
        principal.getCell('F8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('F8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('F8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('F8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('F10').value = 'T.i'
        principal.getCell('F10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('F10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('F10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('F10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('G10').value = 'T.s.'
        principal.getCell('G10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('G10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('G10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('G10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('H10').value = 'T.g'
        principal.getCell('H10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('H10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('H10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('H10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('I10').value = 'P.m.'
        principal.getCell('I10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('I10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('I10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('I10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('J10').value = 'Otros'
        principal.getCell('J10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('J10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('J10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('J10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('K8:L10');
        principal.getCell('K8').value = 'N° ENVASE'
        principal.getCell('K8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('K8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('K8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('K8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



        principal.mergeCells('M8:N9');
        principal.getCell('M8').value = 'RECEPCIONADOS'
        principal.getCell('M8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('M8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('M8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('M8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('M10').value = 'VIVOS'
        principal.getCell('M10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('M10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('M10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('M10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('N10').value = 'MUERTOS'
        principal.getCell('N10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('N10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('N10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('N10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };




        principal.mergeCells('O8:O10');
        principal.getCell('O8').value = 'TOTAL'
        principal.getCell('O8').alignment = { horizontal: 'center' }
        principal.getCell('O8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('O8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('O8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('P8:P10');
        principal.getCell('P8').value = 'N° ADULTOS'
        principal.getCell('P8').alignment = { horizontal: 'center' }
        principal.getCell('P8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('P8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('P8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('Q8:Q10');
        principal.getCell('Q8').value = 'N° ADULTOS'
        principal.getCell('Q8').alignment = { horizontal: 'center' }
        principal.getCell('Q8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('Q8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('Q8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };





        let i = 11
        for (let d of lista) {

            principal.mergeCells(`A` + i + `:B` + i);

            principal.getCell(`A` + i).value = d.jefefamilia
            principal.getCell(`C` + i).value = d.cv
            principal.getCell(`D` + i).value = d.lci
            principal.getCell(`E` + i).value = d.lcp
            principal.getCell(`F` + i).value = d.ti
            principal.getCell(`G` + i).value = d.ts
            principal.getCell(`H` + i).value = d.tg
            principal.getCell(`I` + i).value = d.pm
            principal.getCell(`J` + i).value = d.otros
            principal.mergeCells(`K` + i + `:L` + i);
            principal.getCell(`K` + i).value = d.num_envase
            principal.getCell(`M` + i).value = d.vivos

            principal.getCell(`N` + i).value = d.muertos
            principal.getCell(`O` + i).value = d.total
            principal.getCell(`P` + i).value = d.num_adultos
            principal.getCell(`Q` + i).value = d.num_ninfas


            principal.getCell(`D` + i).alignment = { horizontal: 'center', }
            principal.getCell(`E` + i).alignment = { horizontal: 'center', }
            principal.getCell(`F` + i).alignment = { horizontal: 'center', }
            principal.getCell(`G` + i).alignment = { horizontal: 'center', }
            principal.getCell(`H` + i).alignment = { horizontal: 'center', }
            principal.getCell(`I` + i).alignment = { horizontal: 'center', }
            principal.getCell(`J` + i).alignment = { horizontal: 'center', }
            principal.getCell(`K` + i).alignment = { horizontal: 'center', }
            principal.getCell(`M` + i).alignment = { horizontal: 'center', }
            principal.getCell(`N` + i).alignment = { horizontal: 'center', }
            principal.getCell(`O` + i).alignment = { horizontal: 'center', }
            principal.getCell(`P` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Q` + i).alignment = { horizontal: 'center', }

            principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`C` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`D` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`E` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`F` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`G` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`H` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`I` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`J` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`K` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`L` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`M` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`N` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`O` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`P` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`Q` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }




            principal.getCell(`A` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`C` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`D` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`E` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`F` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`G` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`H` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            principal.getCell(`I` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            principal.getCell(`J` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`K` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`L` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`M` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`N` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`O` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            principal.getCell(`P` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`Q` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            principal.getCell(`A` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`C` + i).font = { bold: 600, size: 7, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`D` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`E` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`F` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`G` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`H` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`I` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`J` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`K` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`L` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`M` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`N` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`O` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`P` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`Q` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };

            i++
        }

        if (consolidado) {

            principal.getCell(`D` + i).alignment = { horizontal: 'center', }
            principal.getCell(`E` + i).alignment = { horizontal: 'center', }
            principal.getCell(`F` + i).alignment = { horizontal: 'center', }
            principal.getCell(`G` + i).alignment = { horizontal: 'center', }
            principal.getCell(`H` + i).alignment = { horizontal: 'center', }
            principal.getCell(`I` + i).alignment = { horizontal: 'center', }
            principal.getCell(`J` + i).alignment = { horizontal: 'center', }
            principal.getCell(`K` + i).alignment = { horizontal: 'center', }
            principal.getCell(`M` + i).alignment = { horizontal: 'center', }
            principal.getCell(`N` + i).alignment = { horizontal: 'center', }
            principal.getCell(`O` + i).alignment = { horizontal: 'center', }
            principal.getCell(`P` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Q` + i).alignment = { horizontal: 'center', }

            principal.mergeCells(`A` + i + `:B` + i);

            principal.getCell(`A` + i).value = lista.length + ' viviendas'
            principal.getCell(`C` + i).value = '-'
            principal.getCell(`A` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`D` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lci, 0)
            principal.getCell(`D` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`E` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcp, 0)
            principal.getCell(`F` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ti, 0)
            principal.getCell(`F` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`G` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ts, 0)
            principal.getCell(`G` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`H` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.tg, 0)
            principal.getCell(`I` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.pm, 0)
            principal.getCell(`J` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.otros, 0)
            principal.getCell(`H` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`I` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.mergeCells(`K` + i + `:L` + i);
            principal.getCell(`K` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.num_envase, 0)
            principal.getCell(`J` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`M` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`N` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`O` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };


            principal.getCell(`K` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`M` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.vivos, 0)
            principal.getCell(`N` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.muertos, 0)

            principal.getCell(`O` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.total, 0)

            principal.getCell(`P` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.num_adultos, 0)

            principal.getCell(`Q` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.num_ninfas, 0)




            principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`C` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`D` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`E` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }

            principal.getCell(`F` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`G` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`H` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`I` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`J` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`K` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`L` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`M` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`N` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`O` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`P` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`Q` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }






            principal.mergeCells(`A` + (i + 3) + `:D` + (i + 3));
            principal.getCell(`A` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`A` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`A` + (i + 3)).value = '* T.i. = Triatoma infestans    '



            principal.mergeCells(`E` + (i + 3) + `:H` + (i + 3));
            principal.getCell(`E` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`E` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`E` + (i + 3)).value = 'T.s. = Triatoma sordida'


            principal.mergeCells(`I` + (i + 3) + `:L` + (i + 3));
            principal.getCell(`I` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`I` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`I` + (i + 3)).value = 'T.g. = Triatoma guayasana  '



            principal.mergeCells(`M` + (i + 3) + `:Q` + (i + 3));
            principal.getCell(`M` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`M` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`M` + (i + 3)).value = 'T.m. = Panstrongylus megistus'



            principal.mergeCells(`A` + (i + 6) + `:H` + (i + 6));
            principal.getCell(`A` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`A` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`A` + (i + 6)).value = lista[0].tecnico ? 'Nombre y apellido Tecnico y/o Jefe de familia:    ' + lista[0].tecnico : 'Nombre y apellido Tecnico y/o Jefe de familia:   ' + lista[0].jefefamilia

            principal.mergeCells(`I` + (i + 6) + `:P` + (i + 6));
            principal.getCell(`I` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`I` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`I` + (i + 6)).value = 'Nombre y apellido del Laboratorista:  ' + lista[0].laboratorista

        }
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'RECEPCION LAB' + new Date().toLocaleDateString() + '.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        })

    };

    return (
        <>
            <div className="content" >
                <div className="main-container">
                    <Card>
                        <CardHeader>
                            <BackgroundColorContext.Consumer>
                                {({ color }) => (
                                    <div className="tbl-header" data={color}>
                                        <div className="row">
                                            <div className="col-8">
                                                RECEPCION DE TRIATOMINOS
                                            </div>
                                            <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                                                <button className='btn-new' pb={3} onClick={() => setModalInsertar(true)} >
                                                    {'Registrar'}
                                                </button >
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </BackgroundColorContext.Consumer>
                        </CardHeader>
                        <CardBody >

                            <Row>
                                <Col md='2' onClick={() => { setLista([]);}} >
                                    <Select1Easy
                                        estado={idMunicipio}
                                        cambiarEstado={setIdMunicipio}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaMunicipio}
                                        name={"municipio"}
                                        etiqueta={"Municipio"}
                                        funcion={listarComunidad}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                                <Col md='2' onClick={() => { setLista([]) }} >
                                    <Select1Easy
                                        estado={comunidad}
                                        cambiarEstado={setComunidad}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaComunidad}
                                        name={"Comunidad"}
                                        etiqueta={"Comunidad"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                                <Col md='2'>
                                    <InputUsuarioStandar
                                        estado={inputBuscar}
                                        cambiarEstado={setInputBuscar}
                                        name="inputBuscar"
                                        tipo={'date'}
                                        ExpresionRegular={INPUT.FECHA} //expresion regular
                                        // eventoBoton={buscar}
                                        etiqueta={"Fecha 1"}
                                    /></Col>
                                <Col md='2'>
                                    <InputUsuarioStandar
                                        estado={inputBuscar2}
                                        cambiarEstado={setInputBuscar2}
                                        name="inputBuscar"
                                        tipo={'date'}
                                        ExpresionRegular={INPUT.FECHA} //expresion regular
                                        // eventoBoton={buscar}
                                        etiqueta={"Fecha 2"}
                                    />
                                </Col>
                                <Col md='4'>
                                    <Row>
                                        <Col md='4' style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px' }} onClick={() => buscar()} >
                                                Buscar
                                            </button>
                                        </Col>
                                        <Col md='4' style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button className="btn-reportes" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px', background: ' #7da05a', color: 'white' }} onClick={() => listaExcel()} >
                                                {window.innerWidth < 768 ? 'Exportar a Excel' : "EXCEL"}
                                            </button>
                                        </Col>
                                        {lista.length > 0 && consolidado && lista[0].estado === 0 &&
                                            < Col md='4' style={{ display: 'flex', justifyContent: 'end' }}>
                                                <button className="btn-reportes btn-danger" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px' }} onClick={() => listarUsuarios()} >
                                                    terminar
                                                </button>
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                            </Row>

                            <Table className="tablesorter" responsive>
                                {listaOtros.map((e, i) => (
                                    <Row key={i}>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='SEDES ' contenido='CHUQUISACA' /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='RED DE SALUD ' contenido={e.red} /> </Col>
                                        <Col md='3'> <ComponenteSubTitle etiqueta=' E. SALUD ' contenido={e.hospital} /> </Col>
                                        <Col md='3'> <ComponenteSubTitle etiqueta=' MUNICIPIO ' contenido={e.municipio} tam={16} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta=' COMUNIDAD ' contenido={e.comunidad} tam={16} /> </Col>
                                        {/* <Col md='3'> <ComponenteSubTitle etiqueta=' FECHA DE EJECUCION ' contenido={new Date().toLocaleDateString()} /> </Col> */}
                                    </Row>
                                ))}
                            </Table>

                            <Table className="tablesorter" responsive>
                                <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                    <tr>
                                        <th colSpan="1" rowSpan={2} className="tbl-header1">NOMBRE Y APELLIDO DE JEFE DE FAMILIA</th>
                                        <th colSpan="1" rowSpan={2} className="tbl-header1">CV</th>
                                        <th colSpan="2" rowSpan={1} className="tbl-header1">LUGAR DE CAPTURA</th>
                                        <th colSpan="5" rowSpan={1} className="tbl-header1">ESPECIES</th>
                                        <th colSpan="1" rowSpan={2} className="tbl-header1">N° ENVASE</th>

                                        <th colSpan="2" rowSpan={1} className="tbl-header1">RECEPCIONADOS</th>
                                        <td colSpan={1} rowSpan={2} className="tbl-header2">TOTAL</td>
                                        <td colSpan={1} rowSpan={2} className="tbl-header2">N° ADULTOS</td>
                                        <td colSpan={1} rowSpan={2} className="tbl-header2">N° NINFAS</td>
                                        <td colSpan={1} rowSpan={2} className="tbl-header2">CORRESPONDE</td>
                                        <td colSpan={1} rowSpan={2} className="tbl-header2">FECHA</td>
                                        <td colSpan={1} rowSpan={2} className="tbl-header2">ESTADO</td>

                                        {/* <th colSpan="17" rowSpan={1} className="tbl-header1">EXAMINADOS</th> */}
                                    </tr>
                                    <tr >
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">INTRA</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">PERI</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">T.i.</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">T.s.</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">T.g.</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">P.m.</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">otros</td>

                                        <td colSpan={1} rowSpan={1} className="tbl-header2">vivos</td>
                                        <td colSpan={1} rowSpan={1} className="tbl-header2">muertos</td>


                                        {/* <td colSpan={4} rowSpan={1} className="tbl-header2">ADULTOS</td>
                                            <td colSpan={10} rowSpan={1} className="tbl-header2">NINFAS</td> */}

                                    </tr>
                                    {/* <tr>
                                            <td colSpan={2} rowSpan={1} className="tbl-header2">HEMBRAS</td>
                                            <td colSpan={2} rowSpan={1} className="tbl-header2">MACHOS</td>

                                            <td colSpan={2} rowSpan={1} className="tbl-header2">1°</td>
                                            <td colSpan={2} rowSpan={1} className="tbl-header2">2°</td>
                                            <td colSpan={2} rowSpan={1} className="tbl-header2">3°</td>
                                            <td colSpan={2} rowSpan={1} className="tbl-header2">4°</td>
                                            <td colSpan={2} rowSpan={1} className="tbl-header2">5°</td>

                                        </tr> */}

                                    {/* <tr>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>

                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Neg</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Pos</td>
                                            <td colSpan={1} rowSpan={1} className="tbl-header2">Total</td>

                                        </tr> */}
                                </thead>
                                <tbody >
                                    {lista.map(e => (
                                        <tr key={e.id}  >
                                            <td style={{ textAlign: 'left' }}>{e.jefefamilia}</td>
                                            <td className=" tbl-header3">{e.cv}</td>
                                            <td className=" tbl-header3">{e.lci}</td>
                                            <td className=" tbl-header3">{e.lcp}</td>
                                            <td className=" tbl-header3">{e.ti}</td>
                                            <td className=" tbl-header3">{e.ts}</td>
                                            <td className=" tbl-header3">{e.tg}</td>
                                            <td className=" tbl-header3">{e.pm}</td>
                                            <td className=" tbl-header3">{e.otros}</td>
                                            <td className=" tbl-header3">{e.num_envase}</td>
                                            <td className=" tbl-header3">{e.vivos}</td>
                                            <td className=" tbl-header3">{e.muertos}</td>
                                            <td className=" tbl-header3">{e.total}</td>
                                            <td className=" tbl-header3">{e.num_adultos}</td>
                                            <td className=" tbl-header3">{e.num_ninfas}</td>
                                            <td className=" tbl-header3">{e.corresponde === 1 ? 'ACTIVA' : e.corresponde === 2 ? 'DENUNCIA' : e.corresponde === 3 ? 'MOV. EST.' : e.corresponde === 4 ? 'OTROS' : '-'}</td>
                                            <td className=" tbl-header3">{e.fecha}</td>
                                            <td className=" tbl-header3">{e.estado == 0 ? 'recepcionado' : e.estado == 1 ? 'Enviado' : null}</td>

                                            {!e.estado ?
                                                <td className="text-center">
                                                    <div className="tbl-edit" onClick={() => {
                                                        setModalEditar(true);
                                                        setId({ campo: e.id, valido: 'true' })
                                                        setCasa({ campo: e.detalleCasa, valido: 'true' })

                                                        setActiva(e.corresponde === 1 ? true : false)
                                                        setDenuncia(e.corresponde === 2 ? true : false)
                                                        setMovEst(e.corresponde === 3 ? true : false)
                                                        setOtros(e.corresponde === 4 ? true : false)
                                                        setTimeout(() => {
                                                            document.getElementById('lci').value = e.lci
                                                            document.getElementById('lcp').value = e.lcp

                                                            document.getElementById('numero_adultos').value = e.num_adultos
                                                            document.getElementById('numero_ninfas').value = e.num_ninfas
                                                        }, 500)

                                                        setLci({ campo: e.lci, valido: 'true' })
                                                        setLcp({ campo: e.lcp, valido: 'true' })
                                                        setTi({ campo: e.ti, valido: 'true' })
                                                        setTs({ campo: e.ts, valido: 'true' })
                                                        setTg({ campo: e.tg, valido: 'true' })
                                                        setPm({ campo: e.pm, valido: 'true' })
                                                        setOther({ campo: e.otros, valido: 'true' })
                                                        setNumEnvase({ campo: e.num_envase, valido: 'true' })
                                                        setVivos({ campo: e.vivos, valido: 'true' })
                                                        setMuertos({ campo: e.muertos, valido: 'true' })
                                                        setNumAdultos({ campo: e.num_adultos, valido: 'true' })
                                                        setNumNinfas({ campo: e.num_ninfas, valido: 'true' })

                                                    }} >Editar</div>
                                                </td> : null}
                                            {!e.estado ? <td className="text-center tbl-bold"><div className="tbl-delete" onClick={() => eliminar(e.id)}>Eliminar</div></td> : null}
                                        </tr>
                                    ))}
                                    {lista.length > 0 && consolidado &&
                                        <tr style={{ border: '3px solid #17a2b8' }} >
                                            <td className=" tbl-header3" style={{ fontWeight: '600' }}>TOTAL{': ' + lista.length + '   Registro(s)'}</td>
                                            <td className="tbl-header3">{'-'}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lci, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcp, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ti, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ts, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.tg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.pm, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.otros, 0)}</td>
                                            <td className="tbl-header3"> -</td>

                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.vivos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.muertos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.total, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.num_adultos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.num_ninfas, 0)}</td>
                                            <td className="tbl-header3">{'-'}</td>
                                            <td className="tbl-header3">{'-'}</td>
                                        </tr>}
                                </tbody>

                            </Table>
                        </CardBody>
                    </Card>
                </div >
            </div >
            <Modal isOpen={modalInsertar} toggle={toggle} className="modal-lg">
                <Card>
                    <ModalHeader toggle={toggle}>
                        FORMULARIO DE RECEPCION DE TRIATOMINOS
                    </ModalHeader>
                    <ModalBody >
                        <Form>
                            <Row className="mb-6">
                                <Col md='4' onClick={() => { setLista([]); setComunidad({ campo: null, valido: null }) }} >
                                    <Select1Easy
                                        estado={idMunicipio}
                                        cambiarEstado={setIdMunicipio}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaMunicipio}
                                        name={"municipio"}
                                        etiqueta={"Municipio"}
                                        funcion={listarComunidad}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                                <Col md='5' onClick={() => { setLista([]) }} >
                                    <Select1Easy
                                        estado={comunidad}
                                        cambiarEstado={setComunidad}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaComunidad}
                                        funcion={listarCasas}
                                        name={"Comunidad"}
                                        etiqueta={"Comunidad"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>

                                <Col md='3' onClick={() => vaciar()}>
                                    <Select1Easy
                                        estado={casa}
                                        cambiarEstado={setCasa}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaCasa}
                                        name={"cv"}
                                        funcion={listarDatosEE1}
                                        etiqueta={"Numero CV"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                            </Row>

                            <p className="text-danger">{activa ? 'Cantidad de ejemplares capturados en la actividad eval. Entom. previa: ' + (lci.campo + lcp.campo) : null}</p>

                            <Table className="tablesorter" responsive>
                                <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                    <tr>
                                        <th colSpan="2" rowSpan={1} className="tbl-header1">LUGAR DE CAPTURA</th>
                                        <th colSpan="5" rowSpan={1} className="tbl-header1">ESPECIES</th>
                                        <th colSpan="1" rowSpan={4} className="tbl-header1">N° ENVASES</th>

                                        <th colSpan="2" rowSpan={1} className="tbl-header1">RECEPCIONADOS</th>
                                        <td colSpan={1} rowSpan={4} className="tbl-header2">N° ADULTOS</td>
                                        <td colSpan={1} rowSpan={4} className="tbl-header2">N° NINFAS</td>

                                        {/* <th colSpan="17" rowSpan={1} className="tbl-header1">EXAMINADOS</th> */}

                                    </tr>
                                    <tr>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">INTRA</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">PERI</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.i.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.s.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.g.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">P.m.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">otros</td>

                                        <td colSpan={1} rowSpan={3} className="tbl-header2">vivos</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">muertos</td>



                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={lci}
                                                cambiarEstado={setLci}
                                                disponible={!activa}
                                                name={'lci'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={lcp}
                                                cambiarEstado={setLcp}
                                                disponible={!activa}
                                                name={'lcp'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ti}
                                                cambiarEstado={setTi}
                                                disponible={true}
                                                name={'ti'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ts}
                                                cambiarEstado={setTs}
                                                disponible={true}
                                                name={'ts'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={tg}
                                                cambiarEstado={setTg}
                                                disponible={true}
                                                name={'tg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={pm}
                                                cambiarEstado={setPm}
                                                disponible={true}
                                                name={'pm'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={other}
                                                cambiarEstado={setOther}
                                                disponible={true}
                                                name={'otros'}
                                            />
                                        </td>

                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={numEnvase}
                                                cambiarEstado={setNumEnvase}
                                                disponible={true}
                                                name={'numero_envase'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={vivos}
                                                cambiarEstado={setVivos}
                                                disponible={true}
                                                name={'vivos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={muertos}
                                                cambiarEstado={setMuertos}
                                                disponible={true}
                                                name={'muertos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={numAdultos}
                                                cambiarEstado={setNumAdultos}
                                                disponible={!activa}
                                                name={'numero_adultos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={numNinfas}
                                                cambiarEstado={setNumNinfas}
                                                disponible={!activa}
                                                name={'numero_ninfas'}
                                            />
                                        </td>

                                    </tr>
                                </tbody>

                            </Table>

                        </Form>
                    </ModalBody>
                    <div className="boton-modal">
                        <Button color="success" onClick={() => insertar()}>
                            Guardar
                        </Button>
                    </div>
                </Card>
            </Modal >
            <Modal isOpen={modalEditar} toggle={toggleEdit} className="modal-lg">
                <Card>
                    <ModalHeader toggle={toggleEdit}>
                        ACTUALIZAR REGISTRO RECEPCION TRIATOMINOS
                    </ModalHeader>
                    <ModalBody >
                        <Form>
                            <Row className="mb-6">
                                <Col md='4'  >
                                    <ComponenteInputUserDisabled
                                        estado={{ campo: listaMunicipio.find((e) => e.value === idMunicipio.campo) }}
                                        ExpresionRegular={INPUT.ID}
                                        etiqueta={"Municipio"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                                <Col md='5'>
                                    <ComponenteInputUserDisabled
                                        ExpresionRegular={INPUT.ID}
                                        estado={{ campo: listaComunidad.find((e) => e.value === comunidad.campo) }}
                                        etiqueta={"Comunidad"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>

                                <Col md='3' >
                                    <ComponenteInputUserDisabled

                                        ExpresionRegular={INPUT.ID}
                                        estado={{ campo: { label: casa.campo } }}
                                        etiqueta={"Numero CV"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                            </Row>


                            <Table className="tablesorter" responsive>
                                <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                    <tr>
                                        <th colSpan="2" rowSpan={1} className="tbl-header1">LUGAR DE CAPTURA</th>
                                        <th colSpan="5" rowSpan={1} className="tbl-header1">ESPECIES</th>
                                        <th colSpan="1" rowSpan={4} className="tbl-header1">N° ENVASES</th>

                                        <th colSpan="2" rowSpan={1} className="tbl-header1">RECEPCIONADOS</th>
                                        <td colSpan={1} rowSpan={4} className="tbl-header2">N° ADULTOS</td>
                                        <td colSpan={1} rowSpan={4} className="tbl-header2">N° NINFAS</td>

                                        {/* <th colSpan="17" rowSpan={1} className="tbl-header1">EXAMINADOS</th> */}

                                    </tr>
                                    <tr>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">INTRA</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">PERI</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.i.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.s.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.g.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">P.m.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">otros</td>

                                        <td colSpan={1} rowSpan={3} className="tbl-header2">vivos</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">muertos</td>



                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={lci}
                                                cambiarEstado={setLci}
                                                disponible={!activa}
                                                name={'lci'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={lcp}
                                                cambiarEstado={setLcp}
                                                disponible={!activa}
                                                name={'lcp'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ti}
                                                cambiarEstado={setTi}
                                                disponible={true}
                                                name={'ti'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ts}
                                                cambiarEstado={setTs}
                                                disponible={true}
                                                name={'ts'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={tg}
                                                cambiarEstado={setTg}
                                                disponible={true}
                                                name={'tg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={pm}
                                                cambiarEstado={setPm}
                                                disponible={true}
                                                name={'pm'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={other}
                                                cambiarEstado={setOther}
                                                disponible={true}
                                                name={'otros'}
                                            />
                                        </td>

                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={numEnvase}
                                                cambiarEstado={setNumEnvase}
                                                disponible={true}
                                                name={'numero_envase'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={vivos}
                                                cambiarEstado={setVivos}
                                                disponible={true}
                                                name={'vivos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={muertos}
                                                cambiarEstado={setMuertos}
                                                disponible={true}
                                                name={'muertos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={numAdultos}
                                                cambiarEstado={setNumAdultos}
                                                disponible={!activa}
                                                name={'numero_adultos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={numNinfas}
                                                cambiarEstado={setNumNinfas}
                                                disponible={!activa}
                                                name={'numero_ninfas'}
                                            />
                                        </td>

                                    </tr>
                                </tbody>

                            </Table>

                        </Form>
                    </ModalBody>
                    <div className="boton-modal">
                        <Button color="info" onClick={() => editar()} >
                            Actualizar
                        </Button>
                    </div>
                </Card>
            </Modal>

            <Modal isOpen={modalValidacion} toggle={() => setModalValidacion(!modalValidacion)} >
                <Card>
                    <ModalHeader toggle={() => setModalValidacion(!modalValidacion)}>
                        VALIDAR PLANILLA DIARIA DE EVALUACION ENTOMOLOGICA EE-1
                    </ModalHeader>
                    <ModalBody >
                        <Form>

                            <Row>
                                <Col md='3'>

                                    <ComponenteCheck_
                                        name={'select'}
                                        label={'activa'}
                                        estado={activa}
                                        cambiarEstado={setActiva}
                                        f2={setDenuncia}
                                        f3={setMovEst}
                                        f4={setOtros}
                                    />
                                </Col>
                                <Col md='3'>
                                    <ComponenteCheck_
                                        name={'select'}
                                        label={'Denuncia'}
                                        estado={denuncia}
                                        cambiarEstado={setDenuncia}
                                        f2={setActiva}
                                        f3={setMovEst}
                                        f4={setOtros}
                                    />
                                </Col>
                                <Col md='3'>
                                    <ComponenteCheck_
                                        name={'select'}
                                        label={'Mov. Estudiantil'}
                                        estado={movEst}
                                        cambiarEstado={setMovEst}
                                        f2={setActiva}
                                        f3={setDenuncia}
                                        f4={setOtros}
                                    />
                                </Col>

                                <Col md='3'>
                                    <ComponenteCheck_
                                        name={'select'}
                                        label={'Otros'}
                                        estado={otros}
                                        cambiarEstado={setOtros}
                                        f2={setActiva}
                                        f3={setDenuncia}
                                        f4={setMovEst}
                                    />
                                </Col>

                            </Row>

                            {activa &&
                                <Col md='12'>
                                    <Select1Easy
                                        estado={usuario}
                                        cambiarEstado={setUsuario}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaUsuarios}
                                        name={"tecnico"}
                                        etiqueta={"Tecnico "}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                            }
                            <Col md='12'>
                                <InputUsuarioStandar
                                    estado={observaciones}
                                    tipo={'textarea'}
                                    cambiarEstado={setObservaciones}
                                    name="observaciones"
                                    etiqueta={"Observaciones(Opcional)"}
                                    ExpresionRegular={INPUT.TEXT} //expresion regular
                                />
                            </Col>

                        </Form>
                    </ModalBody>
                    <div className="boton-modal">
                        <Button color="success" onClick={() => validar()}>
                            validar
                        </Button>
                    </div>
                </Card>
            </Modal >

        </>

    );
}

