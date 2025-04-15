
import React, { useEffect, useState } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table,

} from "reactstrap";

import { URL, INPUT } from "Auth/config";
import { buscarDB, start } from 'service'

import { BackgroundColorContext } from "contexts/BackgroundColorContext";


import { sedes } from 'assets/img/logo';
import toast from "react-hot-toast";
import { Select1EasyColors } from "components/input/elementos";
import { Select1Easy } from "components/input/elementos";
const ExcelJS = require('exceljs')

function RociadoRR2() {


    const [lista, setLista] = useState([]);
    const [idMunicipio, setIdMunicipio] = useState({ campo: null, valido: null });

    const [mes1, setMes1] = useState({ campo: null, valido: null });
    const [mes2, setMes2] = useState({ campo: null, valido: null });
    const [gestion, setGestion] = useState({ campo: null, valido: null });
    const [listaMunicipios, setListaMunicipios] = useState([]);
    const [listaGestion, setListaGestion] = useState([]);
    const [listaMeses, setListaMeses] = useState([]);



    useEffect(() => {
        document.title = "  RR2-CH-MA";
        listarEntidades()
        return () => { }
    }, [])
    const listarEntidades = async () => {
        const data = await start(URL + '/rr-2/listar-municipios')
        setListaMunicipios(data[0])
        setListaGestion(data[1])

    };

    const listarMeses = async (gestion) => {
        const data = await start(URL + '/rr-2/listar-meses', { gestion }, 'Cargando los meses. Espere por favor !')
        setListaMeses(data)

    };

    const buscar = async () => {
        if (!idMunicipio.campo || !gestion.campo || !mes1.campo || !mes2.campo)
            return toast.error('Seleccione los parametros que corresponde')

        const data = await buscarDB(URL + '/rr-2/buscar',
            { entidad: idMunicipio.campo, fecha1: mes1.campo, fecha2: mes2.campo, gestion: gestion.campo })
        setLista(data)
    };


    const listaExcel = async () => {

        if (lista.length > 0) {
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'system sucre cel 71166513';
            workbook.lastModifiedBy = 'SYSTEM SUCRE';

            const principal = workbook.addWorksheet('RR2-CHA-MA', {
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
            principal.mergeCells('F1:T1');
            principal.getCell('F1').alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell("F1").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
            principal.getCell('F1').value = 'MINISTERIO DE SALUD Y DEPORTES'
            principal.mergeCells('F2:T2');
            principal.getCell("F2").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
            principal.getCell('F2').alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell('F2').value = 'DIRECCION GENERAL DE EPIDEMIOLOGIA'
            principal.mergeCells('E3:U3');
            principal.getCell("F3").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
            principal.getCell('F3').alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell('F3').value = 'PROGRAMA NACIONAL DE ENFERMEDADES TRANSMITIDAS POR VECTORES'

            principal.mergeCells('F5:T5');
            principal.getCell("F5").font = { bold: 600, size: 13, color: { argb: "595959" }, italic: false, };
            principal.getCell('F5').alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell('F5').value = 'CONSOLIDADO MENSUAL DE ROCIADO RR2-CHA-MA'

            // principal.mergeCells('D4:H4');

            principal.mergeCells('A6:G6');
            principal.getCell('A6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("A6").font = { bold: 600, size: 8, color: { argb: "595959" }, italic: false, };
            principal.getCell('A6').value = 'SERVICIO DEPARTAMENTAL DE SALUD: CHUQUISACA'

            principal.mergeCells('H6:L6');
            principal.getCell('H6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("H6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('H6').value = 'RED DE SALUD: ' + lista.find(e => e.nombre_red)?.nombre_red

            principal.mergeCells('M6:R6');
            principal.getCell('M6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("M6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('M6').value = 'E. SALUD: ' + lista.find(e => e.nombre_hospital)?.nombre_hospital

            principal.mergeCells('S6:W6');
            principal.getCell('S6').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("S6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
            principal.getCell('S6').value = 'MUNICIPIO: ' + lista.find(e => e.nombre_municipio)?.nombre_municipio


            principal.mergeCells('A7:L7');
            principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell("A7").font = { bold: 600, size: 8, color: { argb: "595959" }, italic: false, };
            principal.getCell('A7').value = 'MES:  ' + new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(lista[0].inicio))

            principal.mergeCells('A8:A10');
            principal.getCell('A8').value = 'N°'
            principal.getCell('A8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('A8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('A8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('A8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('B8:C10');
            principal.getCell('B8').value = 'COMUNIDAD O BARRIO'
            principal.getCell('B8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('B8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('B8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('B8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


            principal.mergeCells('D8:E9');
            principal.getCell('D8').value = 'FECHA DE ROCIADO'
            principal.getCell('D8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('D8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('D8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('D8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.mergeCells('D10:D10');
            principal.getCell('D10').value = 'INICIO'
            principal.getCell('D10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('D10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('D10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('D10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.mergeCells('E10:E10');
            principal.getCell('E10').value = 'FINAL'
            principal.getCell('E10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('E10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('E10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('E10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


            principal.mergeCells('F8:F10');
            principal.getCell('F8').value = 'POBLACION PROTEGIDA'
            principal.getCell('F8').alignment = { horizontal: 'center', wrapText: true }

            principal.getCell('F8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('F8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('F8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



            principal.mergeCells('G8:J8');
            principal.getCell('G8').value = 'VIVIENDAS'
            principal.getCell('G8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('G8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('G8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('G8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('G9:G10');
            principal.getCell('G9').value = 'EXIST'
            principal.getCell('G9').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('G9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('G9').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('G9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('H9:H10');
            principal.getCell('H9').value = 'ROC.'
            principal.getCell('H9').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('H9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('H9').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('H9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('I9:J9');
            principal.getCell('I9').value = 'NO ROCIADAS'
            principal.getCell('I9').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('I9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('I9').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('I9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.getCell('I10').value = 'C'
            principal.getCell('I10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('I10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('I10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('I10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('J10').value = 'R'
            principal.getCell('J10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('J10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('J10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('J10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



            principal.mergeCells('K8:L9');
            principal.getCell('K8').value = 'HABITACIONES'
            principal.getCell('K8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('K8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('K8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('K8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('K10').value = 'ROC.'
            principal.getCell('K10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('K10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('K10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('K10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('L10').value = 'NO ROC.'
            principal.getCell('L10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('L10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('L10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('L10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



            principal.mergeCells('M8:N9');
            principal.getCell('M8').value = 'TIPO DE ROCIADO'
            principal.getCell('M8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('M8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('M8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('M8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('M10').value = 'TOTAL'
            principal.getCell('M10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('M10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('M10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('M10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('N10').value = 'PARCIAL'
            principal.getCell('N10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('N10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('N10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('N10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('O8:S9');
            principal.getCell('O8').value = 'PERIDOMILIO'
            principal.getCell('O8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('O8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('O8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('O8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('O10').value = 'CORRALES'
            principal.getCell('O10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('O10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('O10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('O10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('P10').value = 'GALLINEROS'
            principal.getCell('P10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('P10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('P10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('P10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('Q10').value = 'CONEJERAS'
            principal.getCell('Q10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('Q10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('Q10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('Q10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('R10').value = 'ZARZO O TROJE'
            principal.getCell('R10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('R10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('R10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('R10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            principal.getCell('S10').value = 'OTRO'
            principal.getCell('S10').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('S10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('S10').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('S10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('T8:T10');
            principal.getCell('T8').value = 'DOSIS'
            principal.getCell('T8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('T8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('T8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('T8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('U8:U10');
            principal.getCell('U8').value = 'TOTAL CARGAS'
            principal.getCell('U8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('U8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('U8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('U8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('V8:V10');
            principal.getCell('V8').value = 'TOTAL LITROS/KG'
            principal.getCell('V8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('V8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('V8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('V8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('W8:W10');
            principal.getCell('W8').value = 'CICLO DE ROCIADO POR COMUNIDAD'
            principal.getCell('W8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('W8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('W8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('W8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.mergeCells('X8:X10');
            principal.getCell('X8').value = 'MES ROCIADO'
            principal.getCell('X8').alignment = { horizontal: 'center', wrapText: true }
            principal.getCell('X8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
            principal.getCell('X8').font = { size: 4, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell('X8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            principal.getColumn('T').width = 8
            principal.getColumn('U').width = 8
            principal.getColumn('V').width = 8
            principal.getColumn('W').width = 8
            principal.getColumn('X').width = 10



            let i = 11
            let j = 1
            for (let d of lista) {

                principal.mergeCells(`B` + i + `:C` + i);

                principal.getCell(`A` + i).value = j
                principal.getCell(`B` + i).value = d.comunidad
                principal.getCell(`D` + i).value = d.inicio
                principal.getCell(`E` + i).value = d.final
                principal.getCell(`F` + i).value = d.habitantes
                principal.getCell(`G` + i).value = d.viv_existentes
                principal.getCell(`H` + i).value = d.viv_rociadas
                principal.getCell(`I` + i).value = d.cerrada
                principal.getCell(`J` + i).value = d.renuente
                principal.getCell(`K` + i).value = d.idr
                principal.getCell(`L` + i).value = d.idnr
                principal.getCell(`M` + i).value = d.total
                principal.getCell(`N` + i).value = d.parcial
                principal.getCell(`O` + i).value = d.corrales
                principal.getCell(`P` + i).value = d.gallineros
                principal.getCell(`Q` + i).value = d.conejeras
                principal.getCell(`R` + i).value = d.zarzo
                principal.getCell(`S` + i).value = d.otros
                principal.getCell(`T` + i).value = d.dosis
                principal.getCell(`U` + i).value = d.totalCargas
                principal.getCell(`V` + i).value = d.totalUnidad
                principal.getCell(`W` + i).value = d.ciclo
                principal.getCell(`X` + i).value = d.mes

                principal.getCell(`G` + i).alignment = { horizontal: 'left' };


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
                principal.getCell(`T` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }

                principal.getCell(`U` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
                principal.getCell(`V` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
                principal.getCell(`W` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
                principal.getCell(`X` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }





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
                principal.getCell(`F` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`G` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`H` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`I` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`J` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`K` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`L` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`M` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`N` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`O` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`P` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`Q` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`R` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`S` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`T` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`U` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`V` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`W` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
                principal.getCell(`X` + (i)).alignment = { vertical: 'center', horizontal: 'center' };


                principal.getCell(`A` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`B` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`D` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`E` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`F` + i).font = { size: 4.5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`G` + i).font = { size: 4.5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`H` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`I` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`J` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`K` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`L` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`M` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`N` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`O` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`P` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`Q` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`R` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`S` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`T` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`U` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`V` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`W` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                principal.getCell(`X` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
                i++
                j++
            }

            principal.mergeCells(`B` + i + `:C` + i);


            principal.getCell(`A` + i).value = '-'
            principal.getCell(`B` + i).value = lista.length + ' comunidad(s)'
            principal.getCell(`B` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`D` + i).value = lista[0].inicio
            principal.getCell(`E` + i).value = lista[lista.length - 1].final
            principal.getCell(`D` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`E` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`F` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.habitantes), 0)
            principal.getCell(`F` + (i + 4)).font = { size: 5, color: { argb: "595959" }, italic: false, };
            principal.getCell(`G` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.viv_existentes), 0)
            principal.getCell(`H` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.viv_rociadas), 0)
            principal.getCell(`I` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.cerrada), 0)
            principal.getCell(`H` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`I` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`J` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.renuente), 0)
            principal.getCell(`K` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.idr), 0)
            principal.getCell(`J` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`K` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`L` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.idnr), 0)
            principal.getCell(`M` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.total), 0)
            principal.getCell(`M` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`L` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };


            principal.getCell(`N` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.parcial), 0)
            principal.getCell(`N` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`F` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`G` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`O` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.corrales), 0)
            principal.getCell(`O` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`P` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.gallineros), 0)
            principal.getCell(`P` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`Q` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.conejeras), 0)
            principal.getCell(`Q` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`R` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.zarzo), 0)
            principal.getCell(`R` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };
            principal.getCell(`S` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.otros), 0)
            principal.getCell(`S` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };


            principal.getCell(`T` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.dosis), 0)
            principal.getCell(`T` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`U` + i).value = lista.reduce((acumulador, actual) => acumulador + parseInt(actual.totalCargas), 0)
            principal.getCell(`U` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };

            principal.getCell(`V` + i).value = lista.reduce((acumulador, actual) => acumulador + parseFloat(actual.totalUnidad), 0)
            principal.getCell(`V` + i).font = { size: 5, italic: false, color: { argb: "2c3e50" }, };





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
            principal.getCell(`R` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
            principal.getCell(`S` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`T` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }

            principal.getCell(`U` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
            principal.getCell(`V` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }

            principal.getCell(`F` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`G` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`H` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`I` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`J` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`K` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`L` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`M` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`N` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`O` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`P` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`Q` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`R` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`S` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`T` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`U` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`V` + (i)).alignment = { vertical: 'center', horizontal: 'center' };
            principal.getCell(`W` + (i)).alignment = { vertical: 'center', horizontal: 'center' };





            principal.mergeCells(`K` + (i + 3) + `:W` + (i + 3));
            principal.getCell(`K` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`K` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`K` + (i + 3)).value = 'Insecticida utilizado: ' + lista[0].insecticida







            principal.mergeCells(`D` + (i + 5) + `:J` + (i + 5));
            principal.getCell(`D` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
            principal.getCell(`D` + (i + 5)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
            principal.getCell(`D` + (i + 5)).value = 'Usuario Generador: :............................'



            workbook.xlsx.writeBuffer().then(data => {
                const blob = new Blob([data], {
                    type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = 'RR2-CHA-MA' + lista[0].inicio + '.xlsx';
                anchor.click();
                window.URL.revokeObjectURL(url);
            })
        } else toast.error('No hay datos para exportar')
    };


    const listarPorComunidad = async (comunidad, gestion, mes) => {
        const lista = await start(URL + '/rr-2/listar-por-comunidad', { comunidad, gestion, mes })
        // console.log(lista)
        if (lista.length < 1) {
            toast.error('No se encontró ninguna información para esta comunidad')
            return
        }
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

        principal.mergeCells('D6:G6');
        principal.getCell('D6').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("D6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
        principal.getCell('D6').value = 'RED DE SALUD: ' + lista[0].nombre_red

        principal.mergeCells('H6:J6');
        principal.getCell('H6').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("H6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
        principal.getCell('H6').value = 'E. SALUD: ' + lista[0].nombre_hospital

        principal.mergeCells('K6:L6');
        principal.getCell('K6').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("K6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
        principal.getCell('K6').value = 'MUNICIPIO: ' + lista[0].nombre_municipio

        principal.mergeCells('M6:Q6');
        principal.getCell('M6').alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell("M6").font = { bold: 600, size: 7, color: { argb: "595959" }, italic: false, };
        principal.getCell('M6').value = 'COMUNIDAD: ' + lista[0].nombre_comunidad



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
        principal.getColumn('R').width = 15
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
        principal.getCell('R8').value = 'AUTOR'
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
        for (let d of lista) {

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
        principal.getCell(`S` + i).alignment = { horizontal: 'center', }

        principal.mergeCells(`B` + i + `:C` + i);

        principal.getCell(`A` + i).value = '-'
        principal.getCell(`B` + i).value = lista.length + ' viviendas'
        principal.getCell(`B` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`D` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.habitantes, 0)
        principal.getCell(`D` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`E` + i).value = '-'
        principal.getCell(`F` + i).value = '-'
        principal.getCell(`F` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`G` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.idr, 0)
        principal.getCell(`G` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`H` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.idnr, 0)
        principal.getCell(`I` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.idr, 0) + lista.reduce((acumulador, actual) => acumulador + actual.idnr, 0)

        principal.getCell(`H` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, }; principal.getCell(`I` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, }; principal.getCell(`J` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, }; principal.getCell(`M` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`N` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`O` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };

        principal.getCell(`J` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.corrales, 0)
        principal.getCell(`K` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.gallineros, 0)
        principal.getCell(`L` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.conejeras, 0)
        principal.getCell(`K` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`L` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`M` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.zarzo, 0)
        principal.getCell(`N` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.otros, 0)

        principal.getCell(`O` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.numeroCargas, 0)


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
        principal.getCell(`A` + (i + 3)).value = 'Nombre del rociador: .................................. ' 



        principal.mergeCells(`I` + (i + 3) + `:P` + (i + 3));
        principal.getCell(`I` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 3)).value = 'Nombre del jefe de brigada: ...........................' 

        principal.mergeCells(`A` + (i + 4) + `:H` + (i + 4));
        principal.getCell(`A` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 4)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 4)).value = 'Insecticida Utilizado:    ' + lista[0].nombreInsecticida + '............Dosis:  ' + lista[0].dosis + ' ' + lista[0].unidad

        principal.mergeCells(`I` + (i + 4) + `:P` + (i + 4));
        principal.getCell(`I` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 4)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 4)).value = 'Ciclo de rociado:      ' + lista[0].nombreCiclo


        principal.mergeCells(`A` + (i + 5) + `:H` + (i + 5));
        principal.getCell(`A` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 5)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 5)).value = 'MES ROCIADO:   ' + lista[0].mes

        principal.mergeCells(`I` + (i + 5) + `:P` + (i + 5));
        principal.getCell(`I` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`I` + (i + 5)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`I` + (i + 5)).value = 'lote de insecticida:    ' + lista[0].lote


        principal.mergeCells(`A` + (i + 6) + `:H` + (i + 6));
        principal.getCell(`A` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 6)).value = 'Observaciones: ' + lista[0].observaciones || '-'

 

        principal.mergeCells(`A` + (i + 7) + `:H` + (i + 7));
        principal.getCell(`A` + (i + 7)).alignment = { vertical: 'center', horizontal: 'left' };
        principal.getCell(`A` + (i + 7)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
        principal.getCell(`A` + (i + 7)).value = 'FECHA REGISTRO:   ' + lista[0].fecha

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
            anchor.download = 'RR1-CH-MA' + new Date().toLocaleDateString() + '.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    }


    return (
        <div className="content" >

            <Row className="main-container">
                <Card>
                    <CardHeader>
                        <BackgroundColorContext.Consumer>
                            {({ color }) => (
                                <div className="tbl-header" data={color}>

                                    <div >
                                        ROCIADO RR-2
                                    </div>
                                </div>
                            )}
                        </BackgroundColorContext.Consumer>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col md='2'>
                                <Select1EasyColors
                                    estado={idMunicipio}
                                    cambiarEstado={setIdMunicipio}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaMunicipios}
                                    name={"cv"}
                                    etiqueta={"Municipio"}
                                    msg="Seleccione una opcion"
                                />
                            </Col>
                            <Col md='2'>
                                <Select1Easy
                                    estado={gestion}
                                    cambiarEstado={setGestion}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaGestion}
                                    name={"gestion"}
                                    etiqueta={"GESTION"}
                                    msg="Seleccione una opcion"
                                    funcion={listarMeses}

                                />
                            </Col>
                            <Col md='2'>
                                <Select1Easy
                                    estado={mes1}
                                    cambiarEstado={setMes1}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaMeses}
                                    name={"mes1"}
                                    etiqueta={"Mes 1"}
                                    msg="Seleccione una opcion"
                                />
                            </Col>
                            <Col md='2'>
                                <Select1Easy
                                    estado={mes2}
                                    cambiarEstado={setMes2}
                                    ExpresionRegular={INPUT.ID}
                                    lista={listaMeses}
                                    name={"mes2"}
                                    etiqueta={"Mes 2"}
                                    msg="Seleccione una opcion"
                                />
                            </Col>


                            <Col md='2 mb-2' style={{ display: 'flex', justifyContent: 'end' }}>
                                <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px' }} onClick={() => buscar()} >
                                    Filtrar
                                </button>
                            </Col>
                            <Col md='2 mb-2' style={{ display: 'flex', justifyContent: 'end' }}>

                                <button className="btn-reportes" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px', background: ' #7da05a', color: 'white' }} onClick={() => listaExcel()} >
                                    {window.innerWidth < 768 ? 'Exportar a Excel RR2' : "EXCEL RR2"}
                                </button>

                            </Col>

                        </Row>


                        <Table className="tablesorter" responsive>
                            <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                                <tr>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">BARRIO O COMUNIDAD</th>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">VER DETALLES RR1 EXCEL</th>
                                    <th colSpan="1" rowSpan={5} className="tbl-header1">MES ROCIADO</th>

                                    <th colSpan="2" rowSpan={1} className="tbl-header1">FECHA ROCIADO</th>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">POBLACION PROTEGIDOS</th>
                                    <th colSpan="4" rowSpan={1} className="tbl-header1">VIVIENDAS</th>
                                    <th colSpan="2" rowSpan={1} className="tbl-header1">HABITACIONES</th>
                                    <th colSpan="2" rowSpan={1} className="tbl-header1">TIPO DE ROCIADO</th>
                                    <th colSpan="5" rowSpan={1} className="tbl-header1">PERIDOMICILIO</th>

                                    <th colSpan="1" rowSpan={3} className="tbl-header1">INSECTICIDA</th>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">DOSIS</th>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">TOTAL CARGAS</th>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">TOTAL LITROS/KG</th>
                                    <th colSpan="1" rowSpan={3} className="tbl-header1">CICLO DE ROCIADO POR COMUNIDAD</th>

                                </tr>
                                <tr>

                                    <td className="tbl-header3" rowSpan={2}>INICIO</td>
                                    <td className="tbl-header3" rowSpan={2}>FINAL</td>
                                    <td className="tbl-header3" rowSpan={2}>EXIST.</td>
                                    <td className="tbl-header3" rowSpan={2}>ROC.</td>
                                    <td className="tbl-header3" rowSpan={1} colSpan={2}>NO ROCIADAS</td>
                                    <td className="tbl-header3" rowSpan={2}>ROC.</td>
                                    <td className="tbl-header3" rowSpan={2}>NO ROC.</td>
                                    <td className="tbl-header3" rowSpan={2}>TOTAL</td>
                                    <td className="tbl-header3" rowSpan={2}>PARCIAL</td>

                                    <td className="tbl-header3" rowSpan={2}>CORRALES</td>
                                    <td className="tbl-header3" rowSpan={2}>GALLINEROS</td>
                                    <td className="tbl-header3" rowSpan={2}>CONEJERAS</td>
                                    <td className="tbl-header3" rowSpan={2}>ZARZO O TROJE</td>
                                    <td className="tbl-header3" rowSpan={2}>OTROS</td>
                                </tr>
                                <tr>

                                    <td className="tbl-header3">C</td>
                                    <td className="tbl-header3">R</td>


                                </tr>
                            </thead>
                            <tbody>
                                {lista.map(e => (
                                    <tr key={e.id} style={{ background: e.estado < 2 ? ' #fadbd8 ' : 'white' }} >
                                        <td className=" tbl-header3">{e.comunidad}</td>
                                        <td className="text-center">
                                            <div className="tbl-edit" onClick={() => listarPorComunidad(e.id_comunidad, e.id_gestion, e.id_mes)} > RR1 EN EXCEL</div>
                                        </td>

                                        <td className="tbl-header3">{e.mes}</td>
                                        <td className="tbl-header3">{e.inicio}</td>
                                        <td className="tbl-header3">{e.final}</td>
                                        <td className="tbl-header3">{e.habitantes}</td>
                                        <td className="tbl-header3">{e.viv_existentes}</td>
                                        <td className="tbl-header3">{e.viv_rociadas}</td>
                                        <td className="tbl-header3">{e.cerrada}</td>
                                        <td className="tbl-header3">{e.renuente}</td>
                                        <td className="tbl-header3">{e.idr}</td>
                                        <td className="tbl-header3">{e.idnr}</td>
                                        <td className="tbl-header3">{e.total}</td>
                                        <td className="tbl-header3">{e.parcial}</td>
                                        <td className="tbl-header3">{e.corrales}</td>
                                        <td className="tbl-header3">{e.gallineros}</td>
                                        <td className="tbl-header3">{e.conejeras}</td>
                                        <td className="tbl-header3">{e.zarzo}</td>
                                        <td className="tbl-header3">{e.otros}</td>
                                        <td className="tbl-header3">{e.insecticida}</td>
                                        <td className="tbl-header3">{e.dosis}</td>
                                        <td className="tbl-header3">{e.totalCargas}</td>
                                        <td className="tbl-header3">{e.totalUnidad}</td>
                                        <td className="tbl-header3">{e.ciclo}</td>


                                    </tr>
                                ))}

                                {lista.length > 0 &&

                                    <tr   >
                                        <td className=" tbl-header3">{lista.length + 'Comunidades'}</td>
                                        <td className=" tbl-header3">{'-'}</td>
                                        <td className=" tbl-header3">{'-'}</td>
                                        <td className="tbl-header3">{'-'}</td>
                                        <td className="tbl-header3">{lista[lista.length - 1].final}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.habitantes), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.viv_existentes), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.viv_rociadas), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.cerrada), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.renuente), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.idr), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.idnr), 0)}</td>

                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.total), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.parcial), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.corrales), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.gallineros), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.conejeras), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.zarzo), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.otros), 0)}</td>
                                        <td className="tbl-header3">{''}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.dosis), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseInt(actual.totalCargas), 0)}</td>
                                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + parseFloat(actual.totalUnidad), 0)}</td>
                                    </tr>
                                }

                            </tbody>

                        </Table>
                    </CardBody>
                </Card>

            </Row>
        </div >
    );
}

export default RociadoRR2;
