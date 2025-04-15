
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
import toast from "react-hot-toast";
import { editDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ComponenteSubTitle } from "./input/elementos";
import { ComponenteInputUserDisabled } from "./input/elementos";
import { InputUsuarioStandarTable } from "./input/elementos";

import { sedes } from 'assets/img/logo';

import { Select1Easy } from "./input/elementos";
const ExcelJS = require('exceljs')

export default function LaboratorioUbe() {


    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
    const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
    const [lista, setLista] = useState([]);
    const [listaMunicipio, setListaMunicipio] = useState([]);
    const [listaComunidad, setListaComunidad] = useState([]);
    const [listaOtros, setListaOtros] = useState([]);



    const [id, setId] = useState({ campo: null, valido: null });
    const [idMunicipio, setIdMunicipio] = useState({
        campo: parseInt(localStorage.getItem('id-municipio')) ? parseInt(localStorage.getItem('id-municipio')) : null,
        valido: parseInt(localStorage.getItem('id-municipio')) ? 'true' : null
    });


    const [ahneg, setaHneg] = useState({ campo: 0, valido: 'true' });
    const [ahpos, setaHpos] = useState({ campo: 0, valido: 'true' });
    const [amneg, setAmneg] = useState({ campo: 0, valido: 'true' });
    const [ampos, setAmpos] = useState({ campo: 0, valido: 'true' });
    const [n1neg, setN1neg] = useState({ campo: 0, valido: 'true' });
    const [n1pos, setN1pos] = useState({ campo: 0, valido: 'true' });
    const [n2neg, setN2neg] = useState({ campo: 0, valido: 'true' });
    const [n2pos, setN2pos] = useState({ campo: 0, valido: 'true' });
    const [n3neg, setN3neg] = useState({ campo: 0, valido: 'true' });
    const [n3pos, setN3pos] = useState({ campo: 0, valido: 'true' });
    const [n4neg, setN4neg] = useState({ campo: 0, valido: 'true' });
    const [n4pos, setN4pos] = useState({ campo: 0, valido: 'true' });
    const [n5neg, setN5neg] = useState({ campo: 0, valido: 'true' });
    const [n5pos, setN5pos] = useState({ campo: 0, valido: 'true' });
    const [codigo, setCodigo] = useState(null);



    const [comunidad, setComunidad] = useState({
        campo: parseInt(localStorage.getItem('id-comunidad')) ? parseInt(localStorage.getItem('id-comunidad')) : null,
        valido: parseInt(localStorage.getItem('id-comunidad')) ? 'true' : null
    });

    const [modalInsertar, setModalInsertar] = useState(false);
    const [consolidado, setConsolidado] = useState(true);



    useEffect(() => {
        document.title = "LABORATORIO UBE";
        listarMunicipio()
        return () => { }
    }, [])

    useEffect(() => {
        if ((ahneg.campo + amneg.campo + ahpos.campo + ampos.campo) >
            lista.reduce((acumulador, actual) => { return actual.id === id.campo ? acumulador + actual.num_adultos : acumulador }, 0))
            toast.error('Los numero introducidos deben ser igual o menor a la cantidad de ejempleres adultos capturados' + lista.reduce((acumulador, actual) => { return actual.id === id.campo ? acumulador + actual.num_adultos : acumulador }, 0) + ' ' + id.campo)


        if ((n1neg.campo + n2neg.campo + n3neg.campo + n4neg.campo + n5neg.campo + n1pos.campo + n2pos.campo + n3pos.campo + n4pos.campo + n5pos.campo) >
            lista.reduce((acumulador, actual) => { return actual.id === id.campo ? acumulador + actual.num_ninfas : acumulador }, 0))
            toast.error('Los numero introducidos deben ser igual o menor a la cantidad de ejempleres ninfas capturados')

    }, [ahneg, ahpos, amneg, ampos, n1neg, n1pos, n2neg, n2pos, n3neg, n3pos, n4neg, n4pos, n4neg, n4pos])


    const listar = async () => {
        const data = await start(URL + '/laboratorio/listar', { comunidad: comunidad.campo, codigo })
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
        const data = await start(URL + '/laboratorio/listar-municipios')
        setListaMunicipio(data)
    };
    const listarComunidad = async (id) => {
        const data = await start(URL + '/laboratorio/listar-comunidad', { id })
        setListaComunidad(data)
    };


    const buscar = async () => {

        if (comunidad.valido === 'true') {
            const data = await buscarDB(URL + '/laboratorio/buscar', { comunidad: comunidad.campo, fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo })
            if (data.length > 0) {
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
                    }
                }
            }
        } else toast.error('Seleccione una comunidad...')
    };

    const vaciar = () => {

        setaHneg({ campo: 0, valido: 'true' });
        setaHpos({ campo: 0, valido: 'true' });
        setAmneg({ campo: 0, valido: 'true' });
        setAmpos({ campo: 0, valido: 'true' });
        setN1neg({ campo: 0, valido: 'true' });
        setN1pos({ campo: 0, valido: 'true' });
        setN2neg({ campo: 0, valido: 'true' });
        setN2pos({ campo: 0, valido: 'true' });
        setN3neg({ campo: 0, valido: 'true' });
        setN3pos({ campo: 0, valido: 'true' });
        setN4neg({ campo: 0, valido: 'true' });
        setN4pos({ campo: 0, valido: 'true' });
        setN5neg({ campo: 0, valido: 'true' });
        setN5pos({ campo: 0, valido: 'true' });

    }

    const editar = async () => {
        if ((ahneg.campo + amneg.campo + ahpos.campo + ampos.campo) >
            lista.reduce((acumulador, actual) => { return actual.id === id.campo ? acumulador + actual.num_adultos : acumulador }, 0)) {
            toast.error('la sumatoria ninfas introducidos deben ser igual o menor a la cantidad de ejempleres adultos capturados')
            return
        }


        if ((n1neg.campo + n2neg.campo + n3neg.campo + n4neg.campo + n5neg.campo + n1pos.campo + n2pos.campo + n3pos.campo + n4pos.campo + n5pos.campo) >
            lista.reduce((acumulador, actual) => { return actual.id === id.campo ? acumulador + actual.num_ninfas : acumulador }, 0)) {
            toast.error('la sumatoria de ninfas introducidos deben ser igual o menor a la cantidad de ejempleres ninfas capturados')
            return
        }

        if (
            ahneg.valido === 'true' &&
            ahpos.valido === 'true' &&
            amneg.valido === 'true' &&
            ampos.valido === 'true' &&
            n1neg.valido === 'true' &&
            n1pos.valido === 'true' &&
            n2neg.valido === 'true' &&
            n2pos.valido === 'true' &&
            n3neg.valido === 'true' &&
            n3pos.valido === 'true' &&
            n4neg.valido === 'true' &&
            n4pos.valido === 'true' &&
            n5neg.valido === 'true' &&
            n5pos.valido === 'true'
        ) {

            await editDB(URL + '/laboratorio/actualizar', {
                ahneg: ahneg.campo,
                ahpos: ahpos.campo,
                amneg: amneg.campo,
                ampos: ampos.campo,
                n1neg: n1neg.campo,
                n1pos: n1pos.campo,
                n2neg: n2neg.campo,
                n2pos: n2pos.campo,
                n3neg: n3neg.campo,
                n3pos: n3pos.campo,
                n4neg: n4neg.campo,
                n4pos: n4pos.campo,
                n5neg: n5neg.campo,
                n5pos: n5pos.campo,
                id: id.campo,

            }, setModalInsertar, false, vaciar)
            listar()
        } else toast.error("Formulario incompleto!");
    };



    const toggle = () => {
        setModalInsertar(!modalInsertar)
        vaciar()
    }


    const listaExcel = async () => {

        if (lista.length == 0) { toast.error('no hay datos para exportas'); return }
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'system sucre cel 71166513';
        workbook.lastModifiedBy = 'SYSTEM SUCRE';

        const principal = workbook.addWorksheet('RESULTADOS LAB', {
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
        principal.mergeCells("A1:B4");

        const imageId = workbook.addImage({
            base64: sedes,
            extension: 'png',
        })


        // CONFIGURACION DE LOS TIRULOS, NOMBRE HOSPITAL, MESES Y GESTION
        principal.addImage(imageId, { tl: { col: 0.6, row: 0.1 }, ext: { width: 80, height: 80 } })
        principal.mergeCells('E1:X3');
        principal.getCell('E1').alignment = { vertical: 'center', horizontal: 'center' };
        principal.getCell("E1").font = { bold: 600, size: 14, color: { argb: "595959" }, italic: false, };
        principal.getCell('E1').value = 'EXAMEN LABORATORIAL DE TRIATOMINOS'

        principal.mergeCells('A5:C5');
        principal.getCell('A5').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("A5").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
        principal.getCell('A5').value = 'DEPTO. : CHUQUISACA'

        listaOtros.forEach((e, i) => {
            principal.mergeCells('D5:H5');
            principal.getCell('D5').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("D5").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('D5').value = 'RED DE SALUD: ' + e.red

            principal.mergeCells('I5:O5');
            principal.getCell('I5').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("I5").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('I5').value = 'E. SALUD: ' + e.hospital

            principal.mergeCells('P5:W5');
            principal.getCell('P5').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("P5").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('P5').value = 'MUNICIPIO: ' + e.municipio

            principal.mergeCells('X5:AD5');
            principal.getCell('X5').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("X5").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('X5').value = 'COMUNIDAD: ' + e.comunidad
            if (consolidado) {
                principal.mergeCells('D6:M6');
                principal.getCell('D6').alignment = { vertical: 'center', horizontal: 'left' };
                principal.getCell("D6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
                principal.getCell('D6').value = 'FECHA RECEPCION: ' + lista[0].fecha

                principal.mergeCells('N6:AA6');
                principal.getCell('N6').alignment = { vertical: 'center', horizontal: 'left' };
                principal.getCell("N6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
                principal.getCell('N6').value = 'FECHA EXAMEN: ' + lista[0].fecha_examen
            }
        })

        if (consolidado) {

            principal.mergeCells('A7:I7');
            principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("A7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('A7').value = lista[0].corresponde === 1 ? 'CORRESPONDE A: EVAL. ENTOMOLOGICA ACTIVA? "SI' : 'CORRESPONDE A: EVAL. ENTOMOLOGICA ACTIVA? "NO"'

            principal.mergeCells('J7:N7');
            principal.getCell('J7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("J7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('J7').value = lista[0].corresponde === 2 ? 'DENUNCIA FAMILIA? "SI"' : 'DENUNCIA FAMILIA? "NO"'

            principal.mergeCells('O7:W7');
            principal.getCell('O7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("O7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('O7').value = lista[0].corresponde === 3 ? 'MOVILIZACION SOCIAL ESTUDIANTIL? "SI"' : 'MOVILIZACION SOCIAL ESTUDIANTIL? "NO"'

            principal.mergeCells('X7:AD7');
            principal.getCell('X7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("X7").font = { bold: 600, size: 6, color: { argb: "595959" }, italic: false, };
            principal.getCell('X7').value = lista[0].corresponde === 4 ? 'OTROS? "SI"' : 'OTROS? "NO"'
        } else {
            principal.mergeCells('A7:P7');
            principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("A7").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('A7').value = 'ESTA INFORMACION CORRESPONDE A DIFERENTES GRUPOS DE REGISTRO.'
        }

        principal.getColumn('A').width = 8
        principal.getColumn('B').width = 8
        principal.getColumn('C').width = 5
        principal.getColumn('D').width = 4
        principal.getColumn('E').width = 4
        principal.getColumn('G').width = 4
        principal.getColumn('F').width = 4
        principal.getColumn('H').width = 3
        principal.getColumn('I').width = 3
        principal.getColumn('J').width = 4
        principal.getColumn('K').width = 5
        principal.getColumn('L').width = 5
        principal.getColumn('M').width = 4
        principal.getColumn('N').width = 4
        principal.getColumn('O').width = 4
        principal.getColumn('P').width = 4
        principal.getColumn('Q').width = 4
        principal.getColumn('R').width = 4
        principal.getColumn('S').width = 4
        principal.getColumn('T').width = 4
        principal.getColumn('U').width = 4
        principal.getColumn('V').width = 4
        principal.getColumn('W').width = 4
        principal.getColumn('X').width = 4
        principal.getColumn('Y').width = 4
        principal.getColumn('Z').width = 4
        principal.getColumn('T').width = 4
        principal.getColumn('U').width = 4
        principal.getColumn('V').width = 4

        principal.getColumn('W').width = 4
        principal.getColumn('X').width = 4
        principal.getColumn('Y').width = 4
        principal.getColumn('Z').width = 4


        principal.getColumn('AA').width = 4
        principal.getColumn('AB').width = 4
        principal.getColumn('AC').width = 4
        principal.getColumn('AD').width = 6


        principal.mergeCells('A8:B11');
        principal.getCell('A8').value = 'NOMBRE Y APELLIDO DE JEFE DE FAMILIA'
        principal.getCell('A8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('A8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('A8').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('A8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('C8:C11');
        principal.getCell('C8').value = 'N°C.V'
        principal.getCell('C8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('C8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('C8').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('C8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('D8:E8');
        principal.getCell('D8').value = 'LUGAR DE CAPTURA'
        principal.getCell('D8').alignment = { horizontal: 'center', vertical: 'justify', wrapText: true }
        principal.getCell('D8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('D8').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('D8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('D9:D11');
        principal.getCell('D9').value = 'INTRA'
        principal.getCell('D9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('D9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('D9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('D9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('E9:E11');
        principal.getCell('E9').value = 'PERI'
        principal.getCell('E9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('E9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('E9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('E9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('F8:J8');
        principal.getCell('F8').value = 'ESPECIE'
        principal.getCell('F8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('F8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('F8').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('F8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('F9:F11');
        principal.getCell('F9').value = 'T.i'
        principal.getCell('F9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('F9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('F9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('F9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('G9:G11');
        principal.getCell('G9').value = 'T.s.'
        principal.getCell('G9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('G9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('G9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('G9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('H9:H11');
        principal.getCell('H9').value = 'T.g'
        principal.getCell('H9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('H9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('H9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('H9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('I9:I11');
        principal.getCell('I9').value = 'P.m.'
        principal.getCell('I9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('I9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('I9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('I9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('J9:J11');
        principal.getCell('J9').value = 'Otros'
        principal.getCell('J9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('J9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('J9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('J9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('K8:M8');
        principal.getCell('K8').value = 'RECEPCIONADOS'
        principal.getCell('K8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('K8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('K8').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('K8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('K9:K11');
        principal.getCell('K9').value = 'VIVOS'
        principal.getCell('K9').alignment = { textRotation: 90, horizontal: 'center', wrapText: true }
        principal.getCell('K9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('K9').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('K9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('L9:L11');
        principal.getCell('L10').value = 'MUERTOS'
        principal.getCell('L10').alignment = { textRotation: 90, horizontal: 'center', wrapText: true }
        principal.getCell('L10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('L10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('L10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('M9:M11');
        principal.getCell('M9').value = 'TOTAL'
        principal.getCell('M9').alignment = { textRotation: 90, horizontal: 'center' }
        principal.getCell('M9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('M9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('M9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('N8:AD8');
        principal.getCell('N8').value = 'EXAMINADOS'
        principal.getCell('N8').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('N8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('N8').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('N8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('N9:Q9');
        principal.getCell('N9').value = 'ADULTOS'
        principal.getCell('N9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('N9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('N9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('N9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('R9:AA9');
        principal.getCell('R9').value = 'NINFAS'
        principal.getCell('R9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('R9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('R9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('R9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.mergeCells('AB9:AD10');
        principal.getCell('AB9').value = 'TOTAL'
        principal.getCell('AB9').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('AB9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('AB9').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('AB9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('N10:O10');
        principal.getCell('N10').value = 'HEMBRAS'
        principal.getCell('N10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('N10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('N10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('N10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('P10:Q10');
        principal.getCell('P10').value = 'MACHOS'
        principal.getCell('P10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('P10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('P10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('P10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('R10:S10');
        principal.getCell('R10').value = '1°'
        principal.getCell('R10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('R10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('R10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('R10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('T10:U10');
        principal.getCell('T10').value = '2°'
        principal.getCell('T10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('T10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('T10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('T10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('V10:W10');
        principal.getCell('V10').value = '3°'
        principal.getCell('V10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('V10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('V10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('V10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('X10:Y10');
        principal.getCell('X10').value = '4°'
        principal.getCell('X10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('X10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('X10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('X10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.mergeCells('Z10:AA10');
        principal.getCell('Z10').value = '5°'
        principal.getCell('Z10').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('Z10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('Z10').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('Z10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('N11').value = 'Neg'
        principal.getCell('N11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('N11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('N11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('N11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('O11').value = 'Pos'
        principal.getCell('O11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('O11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('O11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('O11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('P11').value = 'Neg'
        principal.getCell('P11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('P11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('P11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('P11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('Q11').value = 'Pos'
        principal.getCell('Q11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('Q11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('Q11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('Q11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('R11').value = 'Neg'
        principal.getCell('R11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('R11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('R11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('R11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('S11').value = 'Pos'
        principal.getCell('S11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('S11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('S11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('S11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('T11').value = 'Neg'
        principal.getCell('T11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('T11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('T11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('T11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('U11').value = 'Pos'
        principal.getCell('U11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('U11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('U11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('U11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('V11').value = 'Neg'
        principal.getCell('V11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('V11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('V11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('V11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('W11').value = 'Pos'
        principal.getCell('W11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('W11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('W11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('W11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('X11').value = 'Neg'
        principal.getCell('X11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('X11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('X11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('X11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('Y11').value = 'Pos'
        principal.getCell('Y11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('Y11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('Y11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('Y11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('Z11').value = 'Neg'
        principal.getCell('Z11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('Z11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('Z11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('Z11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('AA11').value = 'Pos'
        principal.getCell('AA11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('AA11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('AA11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('AA11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('AB11').value = 'Neg'
        principal.getCell('AB11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('AB11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('AB11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('AB11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        principal.getCell('AC11').value = 'Pos'
        principal.getCell('AC11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('AC11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('AC11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('AC11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


        principal.getCell('AD11').value = 'Total'
        principal.getCell('AD11').alignment = { horizontal: 'center', wrapText: true }
        principal.getCell('AD11').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
        principal.getCell('AD11').font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell('AD11').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };





        let i = 12
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
            principal.getCell(`K` + i).value = d.vivos
            principal.getCell(`L` + i).value = d.muertos
            principal.getCell(`M` + i).value = d.total

            principal.getCell(`N` + i).value = d.ahneg
            principal.getCell(`O` + i).value = d.ahpos
            principal.getCell(`P` + i).value = d.amneg
            principal.getCell(`Q` + i).value = d.ampos

            principal.getCell(`R` + i).value = d.n1neg
            principal.getCell(`S` + i).value = d.n1pos

            principal.getCell(`T` + i).value = d.n2neg
            principal.getCell(`U` + i).value = d.n2pos
            principal.getCell(`V` + i).value = d.n3neg
            principal.getCell(`W` + i).value = d.n3pos
            principal.getCell(`X` + i).value = d.n4neg
            principal.getCell(`Y` + i).value = d.n4pos
            principal.getCell(`Z` + i).value = d.n5neg
            principal.getCell(`AA` + i).value = d.n5pos
            principal.getCell(`AB` + i).value = d.total_negativo
            principal.getCell(`AC` + i).value = d.total_positivo
            principal.getCell(`AD` + i).value = d.total_negativo_positivo





            principal.getCell(`C` + i).alignment = { horizontal: 'center', }
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

            principal.getCell(`T` + i).alignment = { horizontal: 'center', }

            principal.getCell(`U` + i).alignment = { horizontal: 'center', }
            principal.getCell(`V` + i).alignment = { horizontal: 'center', }
            principal.getCell(`W` + i).alignment = { horizontal: 'center', }
            principal.getCell(`X` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Y` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Z` + i).alignment = { horizontal: 'center', }
            principal.getCell(`T` + i).alignment = { horizontal: 'center', }
            principal.getCell(`U` + i).alignment = { horizontal: 'center', }
            principal.getCell(`V` + i).alignment = { horizontal: 'center', }
            principal.getCell(`W` + i).alignment = { horizontal: 'center', }
            principal.getCell(`X` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Y` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Z` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AA` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AB` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AC` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AD` + i).alignment = { horizontal: 'center', }


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



            principal.getCell(`R` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`S` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`T` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`U` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`V` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`W` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`X` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`Y` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`Z` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`AA` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`AB` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`AC` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
            principal.getCell(`AD` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }




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
            principal.getCell(`T` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`U` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`V` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`W` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`X` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`Y` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`Z` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`Z` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };


            principal.getCell(`AA` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`AB` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`AC` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            principal.getCell(`AD` + i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };



            principal.getCell(`A` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`C` + i).font = {size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`D` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`E` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`F` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`G` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`H` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`I` + i).font = {size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`J` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`K` + i).font = {size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`L` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`M` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`N` + i).font = {size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`O` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`P` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`Q` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };


            principal.getCell(`R` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`S` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`T` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`U` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`V` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`W` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`X` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`Y` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`Z` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AA` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AB` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AC` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AD` + i).font = { size: 5,  italic: false, color: { argb: "2c3e50" }, };

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
            principal.getCell(`R` + i).alignment = { horizontal: 'center', }
            principal.getCell(`S` + i).alignment = { horizontal: 'center', }
            principal.getCell(`T` + i).alignment = { horizontal: 'center', }
            principal.getCell(`U` + i).alignment = { horizontal: 'center', }
            principal.getCell(`V` + i).alignment = { horizontal: 'center', }
            principal.getCell(`W` + i).alignment = { horizontal: 'center', }
            principal.getCell(`X` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Y` + i).alignment = { horizontal: 'center', }
            principal.getCell(`Z` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AA` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AB` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AC` + i).alignment = { horizontal: 'center', }
            principal.getCell(`AD` + i).alignment = { horizontal: 'center', }

            principal.mergeCells(`A` + i + `:B` + i);

            principal.getCell(`A` + i).value = lista.length + ' viviendas'
            principal.getCell(`C` + i).value = '-'
            principal.getCell(`A` + i).font = { size: 5,italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`D` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lci, 0)
            principal.getCell(`D` + i).font = { size: 5,italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`E` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcp, 0)
            principal.getCell(`F` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ti, 0)
            principal.getCell(`F` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`G` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ts, 0)
            principal.getCell(`G` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`H` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.tg, 0)
            principal.getCell(`I` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.pm, 0)
            principal.getCell(`J` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.otros, 0)
            principal.getCell(`H` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`I` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
       
            principal.getCell(`J` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`M` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`N` + i).font = {  size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`O` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };



            principal.getCell(`K` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.vivos, 0)
            principal.getCell(`L` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.muertos, 0)

            principal.getCell(`M` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.total, 0)


            principal.getCell(`N` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ahneg, 0)
            principal.getCell(`O` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ahpos, 0)
            principal.getCell(`P` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.amneg, 0)
            principal.getCell(`Q` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ampos, 0)

            principal.getCell(`R` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n1neg, 0)
            principal.getCell(`S` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n1pos, 0)


            principal.getCell(`T` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n2neg, 0)
            principal.getCell(`U` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n2pos, 0)
            principal.getCell(`V` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n3neg, 0)
            principal.getCell(`W` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n3pos, 0)
            principal.getCell(`X` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n4neg, 0)
            principal.getCell(`Y` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n4pos, 0)
            principal.getCell(`Z` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n5neg, 0)
            principal.getCell(`AA` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.n5pos, 0)
            principal.getCell(`AB` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.total_negativo, 0)
            principal.getCell(`AC` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.total_positivo, 0)
            principal.getCell(`AD` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.total_negativo_positivo, 0)
           
            



       

            principal.getCell(`K` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };

            
            principal.getCell(`L` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`M` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`N` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`O` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`P` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`Q` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };

            
            principal.getCell(`R` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`S` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`T` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };

            
            principal.getCell(`U` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`V` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`E` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            
            principal.getCell(`W` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };

            
            principal.getCell(`X` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`Y` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`Z` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AA` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AB` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AC` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`AD` + i).font = {size: 5, italic: false, color: { argb: "2c3e50" }, };

   




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

            principal.getCell(`R` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`S` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`T` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`U` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`V` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`W` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`X` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`Y` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`Z` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`AA` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }

            principal.getCell(`AB` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`AC` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`AD` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }




            principal.mergeCells(`A` + (i + 3) + `:D` + (i + 3));
            principal.getCell(`A` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`A` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`A` + (i + 3)).value = '* T.i. = Triatoma infestans    '



            principal.mergeCells(`E` + (i + 3) + `:K` + (i + 3));
            principal.getCell(`E` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`E` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`E` + (i + 3)).value = 'T.s. = Triatoma sordida'


            principal.mergeCells(`L` + (i + 3) + `:Q` + (i + 3));
            principal.getCell(`L` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`L` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`L` + (i + 3)).value = 'T.g. = Triatoma guayasana  '



            principal.mergeCells(`R` + (i + 3) + `:AD` + (i + 3));
            principal.getCell(`R` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`R` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`R` + (i + 3)).value = 'T.m. = Panstrongylus megistus'


            principal.mergeCells(`A` + (i + 4) + `:AD` + (i + 4));
            principal.getCell(`R` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`R` + (i + 4)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`R` + (i + 4)).value = lista[0].observaciones? 'Observaciones : '+lista[0].observaciones:'--'



            principal.mergeCells(`A` + (i + 6) + `:M` + (i + 6));
            principal.getCell(`A` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`A` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`A` + (i + 6)).value = 'Nombre y apellido del Laboratorista:  ' + lista[0].laboratorista

            principal.mergeCells(`N` + (i + 6) + `:AD` + (i + 6));
            principal.getCell(`N` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`N` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`N` + (i + 6)).value = 'Nombre y apellido Jefe inmediato: .............'

        }
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'RESULTADOS LAB' + new Date().toLocaleDateString() + '.xlsx';
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
                                        <div>
                                            RESULTADO LABORATORIO
                                        </div>
                                    </div>
                                )}
                            </BackgroundColorContext.Consumer>
                        </CardHeader>
                        <CardBody >

                            <Row>
                                <Col md='2' onClick={() => { setLista([]); }} >
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
                                        <th colSpan={1} rowSpan={4} className="tbl-header1" >NOMBRE Y APELLIDO DE JEFE DE FAMILIA</th>
                                        <th colSpan={1} rowSpan={4} className="tbl-header1" ></th>
                                        <th colSpan={1} rowSpan={4} className="tbl-header1">CV</th>
                                        <th colSpan={2} rowSpan={1} className="tbl-header1">LUGAR DE CAPTURA</th>
                                        <th colSpan={5} rowSpan={1} className="tbl-header1">ESPECIES</th>
                                        <th colSpan={3} rowSpan={1} className="tbl-header1">RECEPCIONADOS</th>
                                        <th colSpan={17} rowSpan={1} className="tbl-header1">EXAMINADOS</th>


                                        <td colSpan={1} rowSpan={4} className="tbl-header2">CORRESPONDE</td>
                                        <td colSpan={1} rowSpan={4} className="tbl-header2">FECHA RECEPCION</td>
                                        <td colSpan={1} rowSpan={4} className="tbl-header2">ESTADO</td>


                                    </tr>
                                    <tr >
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">INTRA</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">PERI</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.i.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.s.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">T.g.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">P.m.</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">otros</td>

                                        <td colSpan={1} rowSpan={3} className="tbl-header2">vivos</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">muertos</td>
                                        <td colSpan={1} rowSpan={3} className="tbl-header2">TOTAL</td>

                                        <td colSpan={4} rowSpan={1} className="tbl-header2">ADULTOS</td>
                                        <td colSpan={10} rowSpan={1} className="tbl-header2">NINFAS</td>
                                        <td colSpan={3} rowSpan={2} className="tbl-header2">TOTAL</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">HEMBRAS</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">MACHOS</td>

                                        <td colSpan={2} rowSpan={1} className="tbl-header2">1°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">2°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">3°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">4°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">5°</td>

                                    </tr>

                                    <tr>
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

                                    </tr>
                                </thead>
                                <tbody >
                                    {lista.map(e => (
                                        <tr key={e.id}  >
                                            <td style={{ textAlign: 'left', }}>{e.jefefamilia}  </td>
                                            {e.estado === 1 ? <td style={{ textAlign: 'left', }}><div className="tbl-edit" onClick={() => {
                                                setModalInsertar(true);
                                                setCodigo(e.codigo)
                                                setId({ campo: e.id, valido: 'true' });
                                                setaHneg({ campo: e.ahneg, valido: 'true' });
                                                setaHpos({ campo: e.ahpos, valido: 'true' });
                                                setAmneg({ campo: e.amneg, valido: 'true' });
                                                setAmpos({ campo: e.ampos, valido: 'true' });
                                                setN1neg({ campo: e.n1neg, valido: 'true' });
                                                setN1pos({ campo: e.n1pos, valido: 'true' });
                                                setN2neg({ campo: e.n2neg, valido: 'true' });
                                                setN2pos({ campo: e.n2pos, valido: 'true' });
                                                setN3neg({ campo: e.n3neg, valido: 'true' });
                                                setN3pos({ campo: e.n3pos, valido: 'true' });
                                                setN4neg({ campo: e.n4neg, valido: 'true' });
                                                setN4pos({ campo: e.n4pos, valido: 'true' });
                                                setN5neg({ campo: e.n5neg, valido: 'true' });
                                                setN5pos({ campo: e.n5pos, valido: 'true' });

                                            }}>Llenar resultados</div>  </td> : e.estado === 0 ? <td style={{ textAlign: 'left', }}>
                                                <div className="tbl-delete" >REGISTRO NO TERMINADO</div></td> : <td style={{ textAlign: 'left', }}><div className="tbl-delete" >RESULTADO ACTUALIZADO</div></td>   }
                                            <td className=" tbl-header3">{e.cv}</td>
                                            <td className=" tbl-header3">{e.lci}</td>
                                            <td className=" tbl-header3">{e.lcp}</td>
                                            <td className=" tbl-header3">{e.ti}</td>
                                            <td className=" tbl-header3">{e.ts}</td>
                                            <td className=" tbl-header3">{e.tg}</td>
                                            <td className=" tbl-header3">{e.pm}</td>
                                            <td className=" tbl-header3">{e.otros}</td>
                                            <td className=" tbl-header3">{e.vivos}</td>
                                            <td className=" tbl-header3">{e.muertos}</td>
                                            <td className=" tbl-header3" style={{ background: '#ff8d72 ' }}>{e.total}</td>

                                            <td className=" tbl-header3" style={{ fontWeight: '800' }}>{e.ahneg}</td>
                                            <td className=" tbl-header3">{e.ahpos}</td>
                                            <td className=" tbl-header3">{e.amneg}</td>
                                            <td className=" tbl-header3">{e.ampos}</td>
                                            <td className=" tbl-header3">{e.n1neg}</td>
                                            <td className=" tbl-header3">{e.n1pos}</td>
                                            <td className=" tbl-header3">{e.n2neg}</td>
                                            <td className=" tbl-header3">{e.n2pos}</td>
                                            <td className=" tbl-header3">{e.n3neg}</td>
                                            <td className=" tbl-header3">{e.n3pos}</td>
                                            <td className=" tbl-header3">{e.n4neg}</td>
                                            <td className=" tbl-header3">{e.n4pos}</td>
                                            <td className=" tbl-header3">{e.n5neg}</td>
                                            <td className=" tbl-header3">{e.n5pos}</td>

                                            <td className=" tbl-header3">{e.total_negativo}</td>
                                            <td className=" tbl-header3">{e.total_positivo}</td>
                                            <td className=" tbl-header3">{e.total_negativo_positivo}</td>
                                            <td className=" tbl-header3">{e.corresponde === 1 ? 'ACTIVA' : e.corresponde === 2 ? 'DENUNCIA' : e.corresponde === 3 ? 'MOV. EST.' : e.corresponde === 4 ? 'OTROS' : '-'}</td>
                                            <td className=" tbl-header3">{e.fecha}</td>
                                            <td className=" tbl-header3">{e.estado == 0 ? 'recepcionado' : e.estado == 1 ? 'Enviado' : e.estado == 2 ? 'con resultados' : null}</td>

                                        </tr>
                                    ))}
                                    {lista.length > 0 && consolidado &&
                                        <tr style={{ border: '3px solid #17a2b8', background: '#fad7a0  ' }} >
                                            <td className=" tbl-header3" style={{ fontWeight: '600' }}>TOTAL{': ' + lista.length + '   Registro(s)'}</td>
                                            <td className="tbl-header3">{'-'}</td>
                                            <td className="tbl-header3">{'-'}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lci, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcp, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ti, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ts, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.tg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.pm, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.otros, 0)}</td>

                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.vivos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.muertos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.total, 0)}</td>



                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ahneg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ahpos, 0)}</td>


                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.amneg, 0)}</td>

                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ampos, 0)}</td>

                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n1neg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n1pos, 0)}</td>


                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n2neg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n2pos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n3neg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n3pos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n4neg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n4pos, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n5neg, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.n5pos, 0)}</td>


                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.total_negativo, 0)}</td>
                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.total_positivo, 0)}</td>

                                            <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.total_negativo_positivo, 0)}</td>


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
                        FORMULARIO DE  EXAMEN DE LABORATORIO
                    </ModalHeader>
                    <ModalBody >
                        <Form>
                            <Table className="tablesorter" responsive style={{ borderBottom: '3px solid #525f7f' }}>
                                {listaOtros.map((e, i) => (
                                    <Row key={i}>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='SEDES ' contenido='CHUQUISACA' /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='RED DE SALUD ' contenido={e.red} /> </Col>
                                        <Col md='3'> <ComponenteSubTitle etiqueta=' E. SALUD ' contenido={e.hospital} /> </Col>
                                        <Col md='3'> <ComponenteSubTitle etiqueta=' MUNICIPIO ' contenido={e.municipio} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta=' COMUNIDAD ' contenido={e.comunidad} /> </Col>
                                        {/* <Col md='3'> <ComponenteSubTitle etiqueta=' FECHA DE EJECUCION ' contenido={new Date().toLocaleDateString()} /> </Col> */}
                                    </Row>
                                ))}
                            </Table>

                            <Table className="tablesorter" responsive>
                                {lista.map((e, i) => (
                                    e.id === id.campo &&
                                    <Row key={i}>
                                        <Col md='1'> <ComponenteSubTitle etiqueta=' CV : ' contenido={e.cv} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta=' JEFE DE FAMILIA : ' contenido={e.jefefamilia} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='CANTIDAD EJEMPLARES ADULTOS : ' contenido={e.num_adultos} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='CANTIDAD EJEMPLARES NINFAS : ' contenido={e.num_ninfas} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='FECHA RECEPCION : ' contenido={e.fecha} /> </Col>
                                        <Col md='2'> <ComponenteSubTitle etiqueta='CODIGO : ' contenido={e.codigo} /> </Col>
                                    </Row>
                                ))}
                            </Table>



                            <Table className="tablesorter" responsive>
                                <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                    <tr>
                                        <th colSpan={17} rowSpan={1} className="tbl-header1">EXAMINADOS</th>


                                    </tr>
                                    <tr>
                                        <td colSpan={4} rowSpan={1} className="tbl-header2">ADULTOS</td>
                                        <td colSpan={10} rowSpan={1} className="tbl-header2">NINFAS</td>
                                        <td colSpan={3} rowSpan={2} className="tbl-header2">TOTAL</td>

                                    </tr>

                                    <tr>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">HEMBRAS</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">MACHOS</td>

                                        <td colSpan={2} rowSpan={1} className="tbl-header2">1°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">2°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">3°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">4°</td>
                                        <td colSpan={2} rowSpan={1} className="tbl-header2">5°</td>

                                    </tr>
                                    <tr>
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

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ahneg}
                                                cambiarEstado={setaHneg}
                                                name={'ahneg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ahpos}
                                                cambiarEstado={setaHpos}
                                                name={'ahpos'}
                                            />
                                        </td>


                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={amneg}
                                                cambiarEstado={setAmneg}
                                                name={'amneg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={ampos}
                                                cambiarEstado={setAmpos}
                                                name={'ampos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n1neg}
                                                cambiarEstado={setN1neg}
                                                name={'n1neg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n1pos}
                                                cambiarEstado={setN1pos}
                                                name={'n1pos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n2neg}
                                                cambiarEstado={setN2neg}
                                                name={'n2neg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n2pos}
                                                cambiarEstado={setN2pos}
                                                name={'n2pos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n3neg}
                                                cambiarEstado={setN3neg}
                                                name={'n3neg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n3pos}
                                                cambiarEstado={setN3pos}
                                                name={'n3pos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n4neg}
                                                cambiarEstado={setN4neg}
                                                name={'n4neg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n4pos}
                                                cambiarEstado={setN4pos}
                                                name={'n4pos'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n5neg}
                                                cambiarEstado={setN5neg}
                                                name={'n5neg'}
                                            />
                                        </td>
                                        <td className="tbl-header3">
                                            <InputUsuarioStandarTable
                                                estado={n5pos}
                                                cambiarEstado={setN5pos}
                                                name={'n5pos'}
                                            />
                                        </td>

                                        <td className="tbl-header3">
                                            <ComponenteInputUserDisabled
                                                estado={{
                                                    campo: {
                                                        label: (ahneg.campo + amneg.campo + n1neg.campo + n2neg.campo + n3neg.campo + n4neg.campo + n5neg.campo
                                                        )
                                                    }
                                                }}
                                                ExpresionRegular={INPUT.ID}
                                                tabla={true}
                                            />
                                        </td>

                                        <td className="tbl-header3" >
                                            <ComponenteInputUserDisabled
                                                estado={{
                                                    campo: {
                                                        label: (ahpos.campo + ampos.campo + n1pos.campo + n2pos.campo + n3pos.campo + n4pos.campo + n5pos.campo
                                                        )
                                                    }
                                                }}
                                                ExpresionRegular={INPUT.ID}
                                                tabla={true}
                                            />
                                        </td>

                                        <td className="tbl-header3">
                                            <ComponenteInputUserDisabled
                                                estado={{
                                                    campo: {
                                                        label: (ahpos.campo + ampos.campo + n1pos.campo + n2pos.campo + n3pos.campo + n4pos.campo + n5pos.campo
                                                        ) + (ahneg.campo + amneg.campo + n1neg.campo + n2neg.campo + n3neg.campo + n4neg.campo + n5neg.campo
                                                            )
                                                    }
                                                }}
                                                ExpresionRegular={INPUT.ID}
                                                tabla={true}
                                            />
                                        </td>
                                    </tr>
                                </tbody>

                            </Table>

                        </Form>
                    </ModalBody>
                    <div className="boton-modal">
                        <Button color="success" onClick={() => editar()}>
                            Guardar
                        </Button>
                    </div>
                </Card>
            </Modal >
        </>
    );
}

