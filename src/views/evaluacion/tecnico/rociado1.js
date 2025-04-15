
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
} from "components/input/elementos"; // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'
import { saveDB } from "service";
import toast from "react-hot-toast";
import { editDB } from "service";
import { eliminarDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ComponenteSubTitle } from "components/input/elementos";
import { ComponenteInputUserDisabled } from "components/input/elementos";
import { InputUsuarioStandarTable } from "components/input/elementos";

import { sedes } from 'assets/img/logo';
import { ComponenteCheck_ } from "components/input/elementos";
import { Select1Easy } from "components/input/elementos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
const ExcelJS = require('exceljs')

function Rociado1() {


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
    const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
    const [lista, setLista] = useState([]);
    const [listaCiclo, setListaCiclo] = useState([]);
    const [listaInsecticida, setListaInsecticida] = useState([]);
    const [listaComunidad, setListaComunidad] = useState([]);
    const [listaCasa, setListaCasa] = useState([]);
    const [listaOtros, setListaOtros] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaUsuariosRociador, setListaUsuariosRociador] = useState([]);

    const [listaGestion, setListaGestion] = useState([]);
    const [listaMes, setListaMes] = useState([]);



    const [casa, setCasa] = useState({ campo: null, valido: null });
    const [last, setLast] = useState(false);

    const [id, setId] = useState({ campo: null, valido: null });
    const [usuario, setUsuario] = useState({ campo: null, valido: null });
    const [idMunicipio, setIdMunicipio] = useState({
        campo: parseInt(localStorage.getItem('id-municipio')) ? parseInt(localStorage.getItem('id-municipio')) : null,
        valido: parseInt(localStorage.getItem('id-municipio')) ? 'true' : null
    });
    const [ciclo, setCiclo] = useState({ campo: null, valido: null });
    const [insecticida, setInsecticida] = useState({ campo: null, valido: null });
    const [dosis, setDosis] = useState({ campo: null, valido: null });
    const [lote, setLote] = useState({ campo: null, valido: null });

    const [rociadas, setRociadas] = useState({ campo: 0, valido: 'true' });
    const [noRociadas, setNoRociadas] = useState({ campo: 0, valido: 'true' });
    const [corrales, setCorrales] = useState({ campo: 0, valido: 'true' });
    const [gallineros, setGallineros] = useState({ campo: 0, valido: 'true' });
    const [conejeras, setConejeras] = useState({ campo: 0, valido: 'true' });
    const [zarzo, setZarzo] = useState({ campo: 0, valido: 'true' });
    const [otros, setOtros] = useState({ campo: 0, valido: 'true' });
    const [numeroCargas, setNumeroCargas] = useState({ campo: 0, valido: 'true' });
    const [observaciones, setObservaciones] = useState({ campo: 0, valido: 'true' });


    const [comunidad, setComunidad] = useState({
        campo: parseInt(localStorage.getItem('id-comunidad')) ? parseInt(localStorage.getItem('id-comunidad')) : null,
        valido: parseInt(localStorage.getItem('id-comunidad')) ? 'true' : null
    });


    const [usuario1, setUsuario1] = useState({ campo: null, valido: null });
    const [usuario2, setUsuario2] = useState({ campo: null, valido: null });
    const [usuario3, setUsuario3] = useState({ campo: null, valido: null });
    const [usuario4, setUsuario4] = useState({ campo: null, valido: null });










    const [view, setView] = useState(parseInt(localStorage.getItem('id-comunidad')) > 0 ? true : false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalValidacion, setModalValidacion] = useState(false);

    const [selectivo, setSelectivo] = useState(true);
    const [total, setTotal] = useState(false);
    const [denuncia, setDenuncia] = useState(false);
    const [covertura, setCovertura] = useState(0);





    const [cerrada, setCerrada] = useState(false);
    const [renuente, setRenuente] = useState(false);





    useEffect(() => {
        document.title = "RR1-CH-MA";
        listarGestion()
        listarComunidad()
        return () => { }
    }, [])

    const listarGestion = async () => {
        const listaGEstion = await start(URL + '/rociado-1/listar-anios')
        setListaGestion(listaGEstion)
        listarMeses(listaGEstion[0].value);
        setInputBuscar({
            campo: listaGEstion.length > 0 ? listaGEstion[0].value : null,
            valido: listaGEstion.length > 0 ? "true" : null,
        });
    }
    const listarMeses = async (gestion) => {
        if (gestion) {
            const listaMeses = await start(URL + '/rociado-1/listar-meses', { gestion })
            setListaMes(listaMeses)
        }
    }

    const listarComunidad = async (id) => {
        const data = await start(URL + '/rociado-1/listar-comunidad', { id })
        setListaComunidad(data)
    };


    const listarCasas = async () => {
        if (inputBuscar2.campo && comunidad.campo) {
            const data = await start(URL + '/rociado-1/listar-casas', { comunidad: comunidad.campo, mes: inputBuscar2.campo }, 'Espere, cargando informacion...!')

            if (data[1].length > 0) {

                // calculo de la cobertura de la actividad, debe ser mayor al 70%
                let c = data[0].length
                // console.log(data[0], ' datos de la evaluacion')

                for (let e of data[0]) {
                    if (e.estado) c--
                    if (c === 1) {
                        listarCiclos()
                        listarInsecticida()
                        setLast(true)
                    } else setLast(false)
                }

                setListaCasa(data[0])
                setListaOtros(data[1])

            } else toast.error('No existe estructura!')
        } else {
            toast.error('Seleccion el año, mes y la comunidad que corresponde  ')
        }
    };
















    const listarCiclos = async () => {
        const data = await start(URL + '/rociado-1/listar-ciclos',)
        setListaCiclo(data)
    };
    const listarInsecticida = async (id) => {
        const data = await start(URL + '/rociado-1/listar-insecticida')
        setListaInsecticida(data)
    };




    const vaciar = () => {
        setCasa({ campo: null, valido: null })
        setRociadas({ campo: 0, valido: 'true' })
        setNoRociadas({ campo: 0, valido: 'true' })
        setCorrales({ campo: 0, valido: 'true' })
        setGallineros({ campo: 0, valido: 'true' })
        setConejeras({ campo: 0, valido: 'true' }) // total negativo
        setZarzo({ campo: 0, valido: 'true' }) // total negativo
        setOtros({ campo: 0, valido: 'true' })
        setNumeroCargas({ campo: 0, valido: 'true' })
        setCerrada(false)
        setRenuente(false)
    }

    const insertar = async () => {
        await saveDB(URL + '/rociado-1/guardar', {
            casa: casa.campo,
            comunidad: comunidad.campo,
            nombre_comunidad: listaComunidad.find(e => comunidad.campo === e.value).label,
            municipio: 'LLenar desde el servidor',
            rociadas: rociadas.campo || 0,
            noRociadas: noRociadas.campo || 0,
            corrales: corrales.campo || 0,
            gallineros: gallineros.campo || 0,
            conejeras: conejeras.campo || 0,
            zarzo: zarzo.campo || 0,
            otros: otros.campo || 0,
            cerrada: cerrada,
            renuente: renuente,
            numeroCargas: numeroCargas.campo || 0,
            id_gestion: inputBuscar.campo,
            gestion: listaGestion.find(e => e.value === inputBuscar.campo).label,
            id_mes: inputBuscar2.campo,
            mes: listaMes.find(e => e.value === inputBuscar2.campo).label,


            last: last,
            insecticida: insecticida.campo,
            selectivo: selectivo,
            total: total,
            denuncia: denuncia,
            dosis: dosis.campo,
            ciclo: ciclo.campo,
            lote: lote.campo,
            observaciones: observaciones.campo

        }, setModalInsertar, null, false, vaciar)
        listarCasas()
    };

    const deleted = async (rociado) => {
        if (window.confirm('Desea quitar este registro...?')) {
            await eliminarDB(URL + '/rociado-1/deleted', { rociado })
            listarCasas()
        }
    }


    const toggle = () => {
        setModalInsertar(!modalInsertar)
        vaciar()
    }




    const listaExcel = async () => {

        if (listaCasa.length == 0) { toast.error('no hay datos para exportar'); return }
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'system sucre cel 71166513';
        workbook.lastModifiedBy = 'SYSTEM SUCRE';

        const principal = workbook.addWorksheet('RR1-CH-MA', {
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
        principal.mergeCells('F1:L1');
        principal.getCell('F1').alignment = { vertical: 'center', horizontal: 'center' };
        principal.getCell("F1").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
        principal.getCell('F1').value = 'MINISTERIO DE SALUD Y DEPORTES'
        principal.mergeCells('F2:L2');
        principal.getCell("F2").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
        principal.getCell('F2').alignment = { vertical: 'center', horizontal: 'center' };
        principal.getCell('F2').value = 'DIRECCION GENERAL DE EPIDEMIOLOGIA'
        principal.mergeCells('D3:L3');
        principal.getCell("F3").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
        principal.getCell('F3').alignment = { vertical: 'center', horizontal: 'center' };
        principal.getCell('F3').value = 'PROGRAMA NACIONAL DE ENFERMEDADES TRANSMITIDAS POR VECTORES'

        principal.mergeCells('E5:M5');
        principal.getCell("F5").font = { bold: 600, size: 13, color: { argb: "595959" }, italic: false, };
        principal.getCell('F5').alignment = { vertical: 'center', horizontal: 'center' };
        principal.getCell('F5').value = 'PLANILLA DIARIA DE ROCIADO RR1-CH-MA'

        // principal.mergeCells('D4:H4');

        principal.mergeCells('A6:C6');
        principal.getCell('A6').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("A6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
        principal.getCell('A6').value = 'SEDES: CHUQUISACA'

        listaOtros.forEach((e, i) => {
            principal.mergeCells('D6:G6');
            principal.getCell('D6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("D6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('D6').value = 'RED DE SALUD: ' + e.red

            principal.mergeCells('H6:J6');
            principal.getCell('H6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("H6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('H6').value = 'E. SALUD: ' + e.hospital

            principal.mergeCells('K6:L6');
            principal.getCell('K6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("K6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('K6').value = 'MUNICIPIO: ' + e.municipio

            principal.mergeCells('M6:Q6');
            principal.getCell('M6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("M6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('M6').value = 'COMUNIDAD: ' + e.comunidad
        })



        principal.mergeCells('A8:A10');
        principal.getCell('A8').value = 'N°C.V'
        principal.getCell('A8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('A8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('A8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('B8:C10');
        principal.getCell('B8').value = 'NOMBRE Y APELLIDO DE JEFE DE FAMILIA'
        principal.getCell('B8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('B8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('B8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('B8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('D8:D10');
        principal.getCell('D8').value = 'N° HABITANTES'
        principal.getCell('D8').alignment = { textRotation: 90 }
        principal.getCell('D8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('D8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('D8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getRow('8').height = 30
        principal.getRow('9').height = 30
        principal.getRow('9').height = 30
        principal.getColumn('D').width = 3
        principal.getColumn('E').width = 7
        principal.getColumn('F').width = 7


        principal.mergeCells('E8:N8');
        principal.getCell('E8').value = 'ROCIADO'
        principal.getCell('E8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('E8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('E8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('E8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        principal.mergeCells('E9:F9');
        principal.getCell('E9').value = 'CERRADA/RENUENTE'
        principal.getCell('E9').alignment = { horizontal: 'center' }
        principal.getCell('E9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('E9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('E9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        principal.getCell('E10').value = 'C'
        principal.getCell('E10').alignment = { horizontal: 'center' }
        principal.getCell('E10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('E10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('E10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        principal.getCell('F10').value = 'R'
        principal.getCell('F10').alignment = { horizontal: 'center' }
        principal.getCell('F10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('F10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('F10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getColumn('G').width = 8
        principal.getColumn('H').width = 10
        principal.getColumn('I').width = 7
        principal.getColumn('O').width = 3
        principal.getColumn('P').width = 3

        principal.mergeCells('G9:I9');
        principal.getCell('G9').value = 'INTRADOMICILIO N° HABITACIONES'
        principal.getCell('G9').alignment = { horizontal: 'center' }
        principal.getCell('G9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('G9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('G9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        principal.getCell('G10').value = 'ROCIADAS'
        principal.getCell('G10').alignment = { horizontal: 'center' }
        principal.getCell('G10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('G10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('G10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        principal.getCell('H10').value = 'NO ROCIADAS'
        principal.getCell('H10').alignment = { horizontal: 'center' }
        principal.getCell('H10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('H10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('H10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('I10').value = 'TOTAL'
        principal.getCell('I10').alignment = { horizontal: 'center' }
        principal.getCell('I10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('I10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('I10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getColumn('B').width = 9
        principal.getColumn('C').width = 9
        principal.getColumn('J').width = 9
        principal.getColumn('K').width = 9
        principal.getColumn('L').width = 9
        principal.getColumn('M').width = 11
        principal.getColumn('N').width = 9
        principal.getColumn('Q').width = 11
        principal.getColumn('R').width = 20
        principal.getColumn('S').width = 10

        principal.mergeCells('J9:N9');
        principal.getCell('J9').value = 'PERIDOMICILIO'
        principal.getCell('J9').alignment = { horizontal: 'center' }
        principal.getCell('J9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('J9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('J9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('J10').value = 'CORRALES'
        principal.getCell('J10').alignment = { horizontal: 'center' }
        principal.getCell('J10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('J10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('J10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('K10').value = 'GALLINEROS'
        principal.getCell('K10').alignment = { horizontal: 'center' }
        principal.getCell('K10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('K10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('K10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('L10').value = 'CONEJERAS'
        principal.getCell('L10').alignment = { horizontal: 'center' }
        principal.getCell('L10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('L10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('L10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('M10').value = 'ZARZO O TROJE'
        principal.getCell('M10').alignment = { horizontal: 'center' }
        principal.getCell('M10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('M10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('M10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('N10').value = 'OTROS'
        principal.getCell('N10').alignment = { horizontal: 'center' }
        principal.getCell('N10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('N10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('N10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('O8:O10');
        principal.getCell('O8').value = 'N° DE CARGAS'
        principal.getCell('O8').alignment = { horizontal: 'center', textRotation: 90 }
        principal.getCell('O8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('O8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('O8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('P8:P10');
        principal.getCell('P8').value = 'EN ML O GR.'
        principal.getCell('P8').alignment = { horizontal: 'center', textRotation: 90 }
        principal.getCell('P8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('P8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('P8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('Q8:Q10');
        principal.getCell('Q8').value = 'FIRMA'
        principal.getCell('Q8').alignment = { horizontal: 'center' }
        principal.getCell('Q8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('Q8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('Q8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('R8:R10');
        principal.getCell('R8').value = 'TECNICO'
        principal.getCell('R8').alignment = { horizontal: 'center' }
        principal.getCell('R8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('R8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('R8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('S8:S10');
        principal.getCell('S8').value = 'MES ROCIADO'
        principal.getCell('S8').alignment = { horizontal: 'center' }
        principal.getCell('S8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('S8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('S8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



        let i = 11
        for (let d of listaCasa) {

            principal.mergeCells(`B` + i + `:C` + i);

            principal.getCell(`A` + i).value = d.cv
            principal.getCell(`B` + i).value = d.jefefamilia
            principal.getCell(`D` + i).value = d.cerrada_n ? 'C' : d.renuente_n ? 'R' : d.habitantes
            principal.getCell(`E` + i).value = d.cerrada_n ? 'E' : d.renuente_n ? 'E' : d.cerrada
            principal.getCell(`F` + i).value = d.cerrada_n ? 'R' : d.renuente_n ? 'N' : d.renuente
            principal.getCell(`G` + i).value = d.cerrada_n ? 'R' : d.renuente_n ? 'U' : d.idr
            principal.getCell(`H` + i).value = d.cerrada_n ? 'A' : d.renuente_n ? 'E' : d.idnr
            principal.getCell(`I` + i).value = d.cerrada_n ? 'D' : d.renuente_n ? 'N' : (parseInt(d.idr) + parseInt(d.idnr))
            principal.getCell(`J` + i).value = d.cerrada_n ? 'A' : d.renuente_n ? 'T' : d.corrales
            principal.getCell(`K` + i).value = d.cerrada_n ? '' : d.renuente_n ? 'E' : d.gallineros
            principal.getCell(`L` + i).value = d.cerrada_n ? '' : d.renuente_n ? '' : d.conejeras
            principal.getCell(`M` + i).value = d.cerrada_n ? '' : d.renuente_n ? '' : d.zarzo

            principal.getCell(`N` + i).value = d.cerrada_n ? '' : d.renuente_n ? '' : d.otros
            principal.getCell(`O` + i).value = d.cerrada_n ? '' : d.renuente_n ? '' : d.numeroCargas
            principal.getCell(`P` + i).value = d.cerrada_n ? '' : d.renuente_n ? '' : d.unidad
            principal.getCell(`Q` + i).value = '-'
            principal.getCell(`R` + i).value = d.author
            principal.getCell(`S` + i).value = d.mes


            principal.getCell(`D` + i).alignment = { horizontal: 'center', }
            principal.getCell(`E` + i).alignment = { horizontal: 'center', }
            principal.getCell(`F` + i).alignment = { horizontal: 'center', }
            principal.getCell(`G` + i).alignment = { horizontal: 'center', }
            principal.getCell(`H` + i).alignment = { horizontal: 'center', }
            principal.getCell(`I` + i).alignment = { horizontal: 'center', }
            principal.getCell(`J` + i).alignment = { horizontal: 'center', }
            principal.getCell(`K` + i).alignment = { horizontal: 'center', }
            principal.getCell(`L` + i).alignment = { horizontal: 'center', }
            principal.getCell(`M` + i).alignment = { horizontal: 'center', }
            principal.getCell(`N` + i).alignment = { horizontal: 'center', }
            principal.getCell(`O` + i).alignment = { horizontal: 'center', }
            principal.getCell(`P` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Q` + i).alignment = { horizontal: 'center', }
            principal.getCell(`R` + i).alignment = { horizontal: 'center', }
            principal.getCell(`S` + i).alignment = { horizontal: 'center', }

            principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`B` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
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
            principal.getCell(`R` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`S` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }




            principal.getCell(`A` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`B` + i).border = {
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

            principal.getCell(`R` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`S` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            principal.getCell(`A` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`B` + i).font = { bold: 600, size: 7, italic: false, color: { argb: "2c3e50" }, };
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
            principal.getCell(`R` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`S` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };

            i++
        }


        principal.getCell(`D` + i).alignment = { horizontal: 'center', }
        principal.getCell(`E` + i).alignment = { horizontal: 'center', }
        principal.getCell(`F` + i).alignment = { horizontal: 'center', }
        principal.getCell(`G` + i).alignment = { horizontal: 'center', }
        principal.getCell(`H` + i).alignment = { horizontal: 'center', }
        principal.getCell(`I` + i).alignment = { horizontal: 'center', }
        principal.getCell(`J` + i).alignment = { horizontal: 'center', }
        principal.getCell(`K` + i).alignment = { horizontal: 'center', }
        principal.getCell(`L` + i).alignment = { horizontal: 'center', }
        principal.getCell(`M` + i).alignment = { horizontal: 'center', }
        principal.getCell(`N` + i).alignment = { horizontal: 'center', }
        principal.getCell(`O` + i).alignment = { horizontal: 'center', }
        principal.getCell(`P` + i).alignment = { horizontal: 'center', }
        principal.getCell(`Q` + i).alignment = { horizontal: 'center', }

        principal.mergeCells(`B` + i + `:C` + i);

        principal.getCell(`A` + i).value = '-'
        principal.getCell(`B` + i).value = listaCasa.length + ' viviendas'
        principal.getCell(`B` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`D` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.habitantes, 0)
        principal.getCell(`D` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`E` + i).value = '-'
        principal.getCell(`F` + i).value = '-'
        principal.getCell(`F` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`G` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.idr, 0)
        principal.getCell(`G` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`H` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.idnr, 0)
        principal.getCell(`I` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.idr, 0) + listaCasa.reduce((acumulador, actual) => acumulador + actual.idnr, 0)

        principal.getCell(`H` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, }; principal.getCell(`I` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, }; principal.getCell(`J` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, }; principal.getCell(`M` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`N` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`O` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };

        principal.getCell(`J` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.corrales, 0)
        principal.getCell(`K` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.gallineros, 0)
        principal.getCell(`L` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.conejeras, 0)
        principal.getCell(`K` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`L` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`M` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.zarzo, 0)
        principal.getCell(`N` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.otros, 0)

        principal.getCell(`O` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.numeroCargas, 0)


        principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
        principal.getCell(`B` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
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






        principal.mergeCells(`A` + (i + 3) + `:H` + (i + 3));
        principal.getCell(`A` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 3)).value = 'Nombre del rociador:    ' + localStorage.getItem('nombre')



        principal.mergeCells(`I` + (i + 3) + `:P` + (i + 3));
        principal.getCell(`I` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 3)).value = 'Nombre del jefe de brigada: '

        principal.mergeCells(`A` + (i + 4) + `:H` + (i + 4));
        principal.getCell(`A` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 4)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 4)).value = 'Insecticida Utilizado:    ' + listaCasa[0]?.nombreInsecticida + '.......dosis:    ' + listaCasa[0]?.dosis + ' ' + listaCasa[0]?.unidad

        principal.mergeCells(`I` + (i + 4) + `:P` + (i + 4));
        principal.getCell(`I` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 4)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 4)).value = 'Ciclo de rociado:      ' + listaCasa[0]?.nombreCiclo


        principal.mergeCells(`A` + (i + 5) + `:H` + (i + 5));
        principal.getCell(`A` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 5)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 5)).value = 'MES ROCIADO:   ' + listaCasa[0].mes

        principal.mergeCells(`I` + (i + 5) + `:P` + (i + 5));
        principal.getCell(`I` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 5)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 5)).value = 'lote de insecticida:    ' + listaCasa[0].lote


        principal.mergeCells(`A` + (i + 6) + `:H` + (i + 6));
        principal.getCell(`A` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 6)).value = 'Observaciones: ' + listaCasa[0].observaciones || '-'



        principal.mergeCells(`A` + (i + 7) + `:H` + (i + 7));
        principal.getCell(`A` + (i + 7)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 7)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 7)).value = 'FECHA REGISTRO:   ' + listaCasa[0].fecha

        principal.mergeCells(`I` + (i + 7) + `:P` + (i + 7));
        principal.getCell(`I` + (i + 7)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 7)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 7)).value = 'FIRMA ...................................'

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'EE-1-' + new Date().toLocaleDateString() + '.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        })

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
                                            ROCIADO RR1-CH-MA
                                        </div>
                                    </div>
                                )}
                            </BackgroundColorContext.Consumer>
                        </CardHeader>

                        <CardBody>

                            {listaOtros.map((e, i) => (

                                <Col key={i} md='12 text-center'> <ComponenteSubTitle etiqueta={' COMUNIDAD : ' + e.comunidad} contenido={null} tam={18} /> </Col>
                            ))}
                            <Row>
                                <Col md='2' onClick={() => {
                                    setListaCasa([]);
                                    setInputBuscar2({ campo: null, valido: null });
                                }}>
                                    <Select1Easy
                                        estado={inputBuscar}
                                        cambiarEstado={setInputBuscar}
                                        name="gestion"
                                        ExpresionRegular={INPUT.ID} //expresion regular
                                        lista={listaGestion}
                                        funcion={listarMeses}
                                        etiqueta={"Gestion"}
                                    /></Col>
                                <Col md='2' onClick={() => setListaCasa([])}>
                                    <Select1Easy
                                        estado={inputBuscar2}
                                        cambiarEstado={setInputBuscar2}
                                        name="mes"
                                        lista={listaMes}
                                        ExpresionRegular={INPUT.ID} //expresion regular
                                        // eventoBoton={buscar}
                                        // funcion ={}
                                        etiqueta={"Mes"}
                                    />
                                </Col>
                                <Col md='2' onClick={() => setListaCasa([])}>
                                    <Select1Easy
                                        estado={comunidad}
                                        cambiarEstado={setComunidad}
                                        name="comunidad"
                                        lista={listaComunidad}
                                        ExpresionRegular={INPUT.ID} //expresion regular
                                        // eventoBoton={buscar}
                                        etiqueta={"comunidad"}
                                    />
                                </Col>
                                <Col md='2' style={{ display: 'flex', justifyContent: 'end' }}>
                                    <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '22.5px' }} onClick={() => listarCasas()} >
                                        Filtrar
                                    </button>
                                </Col>
                                <Col md='2' style={{ display: 'flex', justifyContent: 'end' }}>
                                    <button className="btn-reportes" style={{ marginTop: window.innerWidth < 768 ? '5px' : '22.5px', background: ' #7da05a', color: 'white' }} onClick={() => listaExcel()} >
                                        {window.innerWidth < 768 ? 'Exportar a Excel' : "EXCEL"}
                                    </button>
                                </Col>

                            </Row>

                            <Table className="tablesorter" responsive>
                                <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                    <tr>
                                        <th className="tbl-header1">CV</th>
                                        <th>NOMBRE Y APELLIDO DE JEFE DE FAMILIA</th>
                                        <th className="tbl-header1">AÑO</th>
                                        <th className="tbl-header1">MES</th>
                                        <th className="tbl-header1">ESTADO</th>
                                        <th className="tbl-header1" colSpan={2}>ACCION</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {listaCasa.map(e => (
                                        <tr key={e.id} style={{ background: e.estado ? 'white' : ' #fadbd8 ' }} >
                                            <td className=" tbl-header3">{'CV:' + e.cv + ', (' + e.num_hab + ' habitaciones)'}</td>


                                            <td className=" tbl-header3" style={{ textAlign: 'left' }}>  <>
                                                {e.estado ? <FontAwesomeIcon style={{ color: 'rgb(125, 160, 90)' }} icon={faCheckCircle} /> :
                                                    <FontAwesomeIcon style={{ color: '#f5365c' }} icon={null} />}
                                                <span style={{ paddingLeft: '10px' }}> {e.jefefamilia}</span>
                                            </></td>

                                            <td className="tbl-header3">{listaGestion.find(e => e.value === inputBuscar.campo)?.label}</td>
                                            <td className="tbl-header3">{listaMes.find(e => e.value === inputBuscar2.campo)?.label}</td>

                                            <td className="tbl-header3" >{!e.estado ? 'NO REGISTRADO' : 'REGISTRADO'}</td>

                                            {e.estado ? <td className="text-center">
                                                {parseInt(localStorage.getItem('id_')) &&
                                                    <div className={"tbl-delete text-center"} onClick={() => {
                                                        deleted(e.rociado)

                                                    }} >{'Quitar evaluacion'}</div>}
                                            </td> : <td ></td>}

                                            <td className="text-center">
                                                {parseInt(localStorage.getItem('id_')) &&
                                                    <div className="tbl-edit" onClick={() => {

                                                        setModalInsertar(true);
                                                        setId({ campo: e.id, valido: 'true' })
                                                        setCasa({ campo: e.idcasa, valido: 'true' })
                                                        setCerrada(e.cerrada_n || false)
                                                        setRenuente(e.renuente_n || false)
                                                        setRociadas({ campo: e.idr ? e.idr : 0, valido: 'true' })
                                                        setNoRociadas({ campo: e.idnr ? e.idnr : 0, valido: 'true' })
                                                        setCorrales({ campo: e.corrales ? e.corrales : 0, valido: 'true' })
                                                        setGallineros({ campo: e.gallineros ? e.gallineros : 0, valido: 'true' })
                                                        setConejeras({ campo: e.conejeras ? e.conejeras : 0, valido: 'true' })
                                                        setZarzo({ campo: e.zarzo ? e.zarzo : 0, valido: 'true' })
                                                        setOtros({ campo: e.otros ? e.otros : 0, valido: 'true' })
                                                        setNumeroCargas({ campo: e.numeroCargas ? e.numeroCargas : 0, valido: 'true' })

                                                    }} >{e.estado ? 'Modificar Datos' : 'llenar datos'}</div>}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </Table>

                        </CardBody>
                    </Card>
                </Row>

            </div >
            <Modal isOpen={modalInsertar} toggle={toggle} className="modal-lg">
                <Card>
                    <ModalHeader toggle={toggle}>
                        PLANILLA DIARIA DE ROCIADO RR1-CH-MA
                    </ModalHeader>
                    <ModalBody >

                        <Row className="mt-3">
                            <Col md='6'>
                                <ComponenteCheck_
                                    name={'select'}
                                    label={'Vivienda cerrada ?'}
                                    estado={cerrada}
                                    cambiarEstado={setCerrada}
                                    f3={setRenuente}
                                />
                            </Col>

                            <Col md='6'>
                                <ComponenteCheck_
                                    name={'select'}
                                    label={'Vivienda renuente?'}
                                    estado={renuente}
                                    cambiarEstado={setRenuente}
                                    f3={setCerrada}
                                />
                            </Col>
                        </Row>
                        <Table className="tablesorter" responsive>
                            <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                <tr>
                                    <th colSpan="7" rowSpan={1} className="tbl-header1">ROCIADO</th>
                                    <td rowSpan={3} className="tbl-header3">N°  CARGAS</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} rowSpan={1} className="tbl-header2">INTRADOMICILIO  N° HABITACIONES</td>
                                    <td colSpan={5} rowSpan={1} className="tbl-header2">PERIDOMICILIO</td>
                                </tr>
                                <tr>
                                    <td className="tbl-header3">ROCIADAS</td>
                                    <td className="tbl-header3">NO ROCIADAS</td>
                                    <td className="tbl-header3">CORRALES</td>
                                    <td className="tbl-header3">GALLINEROS</td>
                                    <td className="tbl-header3">CONEJERAS</td>
                                    <td className="tbl-header3">ZARZO O TROJE</td>
                                    <td className="tbl-header3">OTROS</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={rociadas}
                                            cambiarEstado={setRociadas}
                                            disponible={!cerrada && !renuente}
                                            name={'rociadas'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={noRociadas}
                                            cambiarEstado={setNoRociadas}
                                            disponible={!cerrada && !renuente}
                                            name={'noRociadas'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={corrales}
                                            disponible={!cerrada && !renuente}
                                            cambiarEstado={setCorrales}
                                            name={'corrales'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={gallineros}
                                            disponible={!cerrada && !renuente}
                                            cambiarEstado={setGallineros}
                                            name={'gallineras'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={conejeras}
                                            disponible={!cerrada && !renuente}
                                            cambiarEstado={setConejeras}
                                            name={'conejeras'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={zarzo}
                                            disponible={!cerrada && !renuente}
                                            cambiarEstado={setZarzo}
                                            name={'zarzo_o_troje'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={otros}
                                            disponible={!cerrada && !renuente}
                                            cambiarEstado={setOtros}
                                            name={'otros'}
                                        />
                                    </td>
                                    <td className="tbl-header3">
                                        <InputUsuarioStandarTable
                                            estado={numeroCargas}
                                            disponible={!cerrada && !renuente}
                                            cambiarEstado={setNumeroCargas}
                                            name={'numero_cargas'}
                                        />
                                    </td>
                                </tr>
                            </tbody>

                        </Table>
                        {last ?
                            <Row className="mb-4">

                                <Col md='6'>
                                    <Select1Easy
                                        estado={insecticida}
                                        cambiarEstado={setInsecticida}
                                        lista={listaInsecticida}
                                        name="insecticida"
                                        etiqueta={"Insecticida"}
                                        ExpresionRegular={INPUT.ID} //expresion regular
                                    />
                                </Col>
                                <Col md='6'>
                                    <InputUsuarioStandar
                                        estado={dosis}
                                        cambiarEstado={setDosis}
                                        name="Dosis"
                                        etiqueta={"Dosis"}
                                        ExpresionRegular={INPUT.ID} //expresion regular
                                    />
                                </Col>
                                <Col md='6'>
                                    <Select1Easy
                                        estado={ciclo}
                                        cambiarEstado={setCiclo}
                                        ExpresionRegular={INPUT.ID}
                                        lista={listaCiclo}
                                        name={"ciclo"}
                                        etiqueta={"Ciclo rociado"}
                                        msg="Seleccione una opcion"
                                    />
                                </Col>
                                <Col md='6'>
                                    <InputUsuarioStandar
                                        estado={lote}
                                        cambiarEstado={setLote}
                                        name="lote"
                                        etiqueta={"Lote insecticida"}
                                        ExpresionRegular={INPUT.TEXT} //expresion regular
                                    />
                                </Col>

                                <Col md='12'>

                                    <fieldset className="border">
                                        <legend className="float-none w-auto p-2">Tipo de Rociado</legend>
                                        <div className="row">
                                            <Col md='4'>
                                                <ComponenteCheck_
                                                    name={'select'}
                                                    label={'Rociado selectivo'}
                                                    estado={selectivo}
                                                    cambiarEstado={setSelectivo}
                                                    f2={setTotal}
                                                    f3={setDenuncia}
                                                />
                                            </Col>
                                            <Col md='4'>
                                                <ComponenteCheck_
                                                    name={'select'}
                                                    label={'Rociado total'}
                                                    estado={total}
                                                    cambiarEstado={setTotal}
                                                    f2={setSelectivo}
                                                    f3={setDenuncia}
                                                />
                                            </Col>

                                            <Col md='4'>
                                                <ComponenteCheck_
                                                    name={'select'}
                                                    label={'Rociado por denuncia'}
                                                    estado={denuncia}
                                                    cambiarEstado={setDenuncia}
                                                    f2={setSelectivo}
                                                    f3={setTotal}
                                                />
                                            </Col>
                                        </div>
                                    </fieldset>
                                </Col>

                                <Col md='12'>
                                    <InputUsuarioStandar
                                        estado={observaciones}
                                        tipo={'textarea'}
                                        cambiarEstado={setObservaciones}
                                        name="observaciones"
                                        etiqueta={"Observaciones"}
                                        importante={false}
                                        ExpresionRegular={INPUT.TEXT} //expresion regular
                                    />
                                </Col>
                            </Row>
                            : null
                        }
                    </ModalBody>
                    <div className="boton-modal">
                        <Button color="success" onClick={() => insertar()}>
                            Guardar
                        </Button>
                    </div>
                </Card>
            </Modal >



        </>

    );
}

export default Rociado1;
