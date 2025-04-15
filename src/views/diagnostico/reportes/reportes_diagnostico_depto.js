
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,

} from "reactstrap";
import {
  InputUsuarioStandar,
} from "components/input/elementos"; // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { INPUT } from "Auth/config";
import { buscarDB, start } from 'service'

import { BackgroundColorContext } from "contexts/BackgroundColorContext";


import { sedes } from 'assets/img/logo';
import { API_ENDPOINTS } from "../api";
import { Select1EasyColors } from "../input/elementos";
import toast from "react-hot-toast";
import { Select1 } from "components/input/elementos";

const ExcelJS = require('exceljs')

function ReportesDiagnosticoDepto() {


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
  const [listaMunicipios, setListaMunicipios] = useState([]);
  const [listaGrupos, setListaGrupos] = useState([]);
  const [listaItems, setListaItems] = useState([]);
  const [listaGrupoEtario, setListaGrupoEtario] = useState([]);

  const [listaOtros, setListaOtros] = useState([]);
  const [consolidado, setConsolidado] = useState(true);
  const [idMunicipio, setIdMunicipio] = useState({ campo: null, valido: null });
  const [idGrupo, setIdGrupo] = useState({ campo: null, valido: null });
  const [idGrupoEtario, setIdGrupoEtario] = useState({ campo: null, valido: null });
  const [idItem, setIdItem] = useState({ campo: null, valido: null });
  const [nivel, setNivel] = useState({ campo: null, valido: null });
  const [estadoMujeres, setEstadoMujeres] = useState({ campo: null, valido: null });

  const [parametros, setParametros] = useState([])

  const [medicamentos, setMedicamentos] = useState([])
  const [infecciones, setInfecciones] = useState([])
  const [mujeresTratamiento, setMujeresTratamiento] = useState([])
  const [reaccionDermatologica, setReaccionDermatologica] = useState([])
  const [reaccionDigestiva, setReaccionDigestiva] = useState([])
  const [reaccionNeurologica, setReaccionNeurologica] = useState([])
  const [reaccionHematologica, setReaccionHematologica] = useState([])
  const [cronicoCongenito, setCronicoCongenito] = useState([])
  const [grupoEtario, setGrupoEtario] = useState([])
  const [itemDiagnostico, setItemDiagnostico] = useState([])



  useEffect(() => {
    document.title = "REPORTES DIAGNOSTICO DEPARTAMENTAL";
    listarEstructura()
    // listarParametroTipoConsulta()
    return () => { }
  }, [])

  const listarEstructura = async () => {
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.LISTAR_PARAMETROS)
    setListaMunicipios(data[0])
    setListaGrupos(data[1])
    setListaItems(data[2])

  };

  const listarGrupoEtarios = async (id) => {
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.LISTAR_GRUPOS_ETARIOS, { grupo: id })
    setListaGrupoEtario(data)
  }

  const listarParametroTipoConsulta = async () => {
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.LISTAR_PARAMETROS_TIPO_CONSULTA)
    setMedicamentos(data[0])
    setInfecciones(data[1])
    setMujeresTratamiento(data[2])
    setReaccionDermatologica(data[3])
    setReaccionDigestiva(data[4])
    setReaccionNeurologica(data[5])
    setReaccionHematologica(data[6])
    setCronicoCongenito(data[7])
    setGrupoEtario(data[8])
    setItemDiagnostico(data[9])
  };


  const buscar = async () => {

    if (nivel.campo === 1000000) {
      buscarConsolidado()
      return
    }
    if (nivel.campo === 1) {
      buscarPorRed()
      return
    }
    if (nivel.campo === 2) {
      buscarPorMunicipio()
      return
    }
    if (nivel.campo === 3) {
      buscarPorHospital()
      return
    } else toast.error("Seleccione un tipo de parametro")
  }

  const buscarConsolidado = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.BUSCAR_CONSOLIDADO, { fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, grupo: idGrupo.campo, grupoEtario: idGrupoEtario.campo, itemDiagnostico: idItem.campo, estadoMujeres: estadoMujeres.campo })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }
  const buscarPorRed = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.BUSCAR_POR_RED, { fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, red: idMunicipio.campo, grupo: idGrupo.campo, grupoEtario: idGrupoEtario.campo, itemDiagnostico: idItem.campo, estadoMujeres: estadoMujeres.campo })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }

  const buscarPorMunicipio = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.BUSCAR_POR_MUNICIPIO, { fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, municipio: idMunicipio.campo, grupo: idGrupo.campo, grupoEtario: idGrupoEtario.campo, itemDiagnostico: idItem.campo, estadoMujeres: estadoMujeres.campo     })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }

  const buscarPorHospital = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_DIAGNOSTICO_DEPARTAMENTAL.BUSCAR_POR_HOSPITAL, { fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, hospital: idMunicipio.campo, grupo: idGrupo.campo, grupoEtario: idGrupoEtario.campo, itemDiagnostico: idItem.campo, estadoMujeres: estadoMujeres.campo     })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }



  const listarExcel = async (lista) => {

    if (lista.length > 0) {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'gustavo aguilar torres CEL 71166513';
      workbook.lastModifiedBy = 'gustavo aguilar torres';

      const principal = workbook.addWorksheet('BASE DE DATOS', {
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
      principal.mergeCells("A1:C4");

      const imageId = workbook.addImage({
        base64: sedes,
        extension: 'png',
      })


      // CONFIGURACION DE LOS TIRULOS, NOMBRE HOSPITAL, MESES Y GESTION
      principal.addImage(imageId, { tl: { col: 0.6, row: 0.1 }, ext: { width: 100, height: 95 } })
      principal.mergeCells('E1:N1');
      principal.getCell('E1').alignment = { vertical: 'center', horizontal: 'center' };
      principal.getCell("E1").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
      principal.getCell('E1').value = 'MINISTERIO DE SALUD Y DEPORTES'
      principal.mergeCells('E2:N2');
      principal.getCell("E2").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
      principal.getCell('E2').alignment = { vertical: 'center', horizontal: 'center' };
      principal.getCell('E2').value = 'DIAGNOSTICO Y TRATAMIENTO DE PACIENTES CON CHAGAS'
      principal.mergeCells('E3:N3');
      principal.getCell("E3").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
      principal.getCell('E3').alignment = { vertical: 'center', horizontal: 'center' };
      principal.getCell('E3').value = 'FORMULARIO DE DIAGNOSTICO Y TRATAMIENTO DE PACIENTES CON CHAGAS'

      principal.mergeCells('A5:F5');
      principal.getCell('A5').value = ' DATOS DEL PACIENTE'
      principal.getCell('A5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('A5').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('A5').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('A5').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('A6:A7');
      principal.getCell('A6').value = 'N°'
      principal.getCell('A6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('A6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('A6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('A6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('B6:B7');
      principal.getCell('B6').value = 'PACIENTE'
      principal.getCell('B6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('B6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('B6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('B6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('C6:C7');
      principal.getCell('C6').value = 'EDAD'
      principal.getCell('C6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('C6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('C6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('C6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('D6:D7');
      principal.getCell('D6').value = 'GRUPO ETARIO'
      principal.getCell('D6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('D6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('D6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('D6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('E6:E7');
      principal.getCell('E6').value = 'CONGENITO/CRONICO'
      principal.getCell('E6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('E6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('E6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('E6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('F6:F7');
      principal.getCell('F6').value = 'COMUNIDAD'
      principal.getCell('F6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('F6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('F6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('F6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };




      principal.mergeCells('G5:M5');
      principal.getCell('G5').value = 'DATOS DE TRATAMIENTO'
      principal.getCell('G5').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('G5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('G5').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('G5').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('G6:G7');
      principal.getCell('G6').value = 'MEDICO'
      principal.getCell('G6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('G6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('G6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('G6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('H6:H7');
      principal.getCell('H6').value = 'HOSPITAL'
      principal.getCell('H6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('H6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('H6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('H6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };




      principal.mergeCells('I6:I7');
      principal.getCell('I6').value = 'MUNICIPIO'
      principal.getCell('I6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('I6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('I6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('I6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('J6:J7');
      principal.getCell('J6').value = 'RED'
      principal.getCell('J6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('J6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('J6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('J6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('K6:K7');
      principal.getCell('K6').value = 'FECHA INICIO'
      principal.getCell('K6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('K6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('K6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('K6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('L6:L7');
      principal.getCell('L6').value = 'FECHA CONCLUSION'
      principal.getCell('L6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('L6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('L6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('L6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('M6:M7');
      principal.getCell('M6').value = 'OBSERVACIONES'
      principal.getCell('M6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('M6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('M6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('M6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };






      principal.mergeCells('N5:AA5');
      principal.getCell('N5').value = 'DATOS DIAGNOSTICO'
      principal.getCell('N5').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('N5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('N5').font = { size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('N5').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.mergeCells('N6:N7');
      principal.getCell('N6').value = 'CODIGO'
      principal.getCell('N6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('N6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('N6').font = { size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('N6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };





      principal.mergeCells('O6:O7');
      principal.getCell('O6').value = 'ITEMS DIAGNOSTICO'
      principal.getCell('O6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('O6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('O6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('O6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.mergeCells('P6:P7');
      principal.getCell('P6').value = 'FECHA SOLICITUD'
      principal.getCell('P6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('P6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('P6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('P6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('Q6:Q7');
      principal.getCell('Q6').value = 'FECHA DIAGNOSTICO'
      principal.getCell('Q6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('Q6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('Q6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('Q6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('R6:R7');
      principal.getCell('R6').value = 'CONCLUSIONES'
      principal.getCell('R6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('R6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('R6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('R6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('S6:S7');
      principal.getCell('S6').value = 'OBSERVACIONES'
      principal.getCell('S6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('S6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('S6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('S6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('T6:T7');
      principal.getCell('T6').value = 'LABORATORISTA'
      principal.getCell('T6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('T6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('T6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('T6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.mergeCells('U6:U7');
      principal.getCell('U6').value = 'LABORATORIO'
      principal.getCell('U6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('U6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('U6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('U6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('V6:V7');
      principal.getCell('V6').value = 'PREQUIRURGICO'
      principal.getCell('V6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('V6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('V6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('V6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('W6:W7');
      principal.getCell('W6').value = 'POSTRATAMIENTO'
      principal.getCell('W6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('W6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('W6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('W6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('X6:X7');
      principal.getCell('X6').value = 'ESTADO MUJERES'
      principal.getCell('X6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('X6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('X6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('X6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('Y6:Y7');
      principal.getCell('Y6').value = 'POSITIVO'
      principal.getCell('Y6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('Y6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('Y6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('Y6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      
      principal.mergeCells('Z6:Z7');
      principal.getCell('Z6').value = 'NEGATIVO'
      principal.getCell('Z6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('Z6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('Z6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('Z6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('AA6:AA7');
      principal.getCell('AA6').value = 'INDETERMINADO'
      principal.getCell('AA6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('AA6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('AA6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('AA6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.getRow('6').height = 40
      principal.getColumn('A').width = 4
      principal.getColumn('B').width = 15
      principal.getColumn('C').width = 5
      principal.getColumn('D').width = 10
      principal.getColumn('E').width = 10
      principal.getColumn('F').width = 13
      principal.getColumn('G').width = 13
      principal.getColumn('H').width = 13
      principal.getColumn('I').width = 10
      principal.getColumn('J').width = 10
      principal.getColumn('K').width = 10
      principal.getColumn('L').width = 10
      principal.getColumn('M').width = 13
      principal.getColumn('N').width = 10
      principal.getColumn('O').width = 15
      principal.getColumn('P').width = 10
      principal.getColumn('Q').width = 10
      principal.getColumn('R').width = 14
      principal.getColumn('S').width = 14
      principal.getColumn('T').width = 14
      principal.getColumn('U').width = 14
      principal.getColumn('V').width = 10
      principal.getColumn('W').width = 10
      principal.getColumn('X').width = 10
      principal.getColumn('Y').width = 7
      principal.getColumn('Z').width = 7
      principal.getColumn('T').width = 7
      principal.getColumn('AA').width = 7








      let i = 8
      let j = 1
      for (let d of lista) {


        principal.getCell(`A` + i).value = j
        principal.getCell(`B` + i).value = d.paciente_diagnostico
        principal.getCell(`C` + i).value = d.edad_diagnostico
        principal.getCell(`D` + i).value = d.grupo_etario_diagnostico
        principal.getCell(`E` + i).value = d.grupo_diagnostico
        principal.getCell(`F` + i).value = d.comunidad_diagnostico
        principal.getCell(`G` + i).value = d.medico_tratamiento
        principal.getCell(`H` + i).value = d.hospital_tratamiento
        principal.getCell(`I` + i).value = d.municipio_tratamiento
        principal.getCell(`J` + i).value = d.red_tratamiento
        principal.getCell(`K` + i).value = d.fecha_ini_tratamiento
        principal.getCell(`L` + i).value = d.fecha_fin_tratamiento
        principal.getCell(`M` + i).value = d.observacion_tratamiento

        principal.getCell(`N` + i).value = d.codigo_diagnostico
        principal.getCell(`O` + i).value = d.diagnostico
        principal.getCell(`P` + i).value = d.fecha_solicitud_diagnostico
        principal.getCell(`Q` + i).value = d.fecha_diagnostico
        principal.getCell(`R` + i).value = d.conclusiones_diagnostico
        principal.getCell(`S` + i).value = d.observaciones_diagnostico
        principal.getCell(`T` + i).value = d.medico_diagnostico
        principal.getCell(`U` + i).value = d.laboratorio_diagnostico
        principal.getCell(`V` + i).value = d.pre_quirurgico_diagnostico
        principal.getCell(`W` + i).value = d.post_tratamiento_diagnostico
        principal.getCell(`X` + i).value = d.mujeres_tratamiento_diagnostico
        principal.getCell(`Y` + i).value = d.positivo
        principal.getCell(`Z` + i).value = d.negativo
        principal.getCell(`AA` + i).value = d.indeterminado



        principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`B` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`C` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`D` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`E` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`F` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`G` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`H` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`I` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`J` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`K` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`L` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`M` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`N` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`O` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`P` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`Q` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`R` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`S` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`T` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`U` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`V` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`W` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`X` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`Y` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`Z` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`AA` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }





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
        principal.getCell(`AA` + i).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };




        principal.getCell(`A` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`B` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`C` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`D` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`E` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`F` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`G` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`H` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`I` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`J` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`K` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`L` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`M` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`N` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`O` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`P` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`Q` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`R` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`S` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`T` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`U` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`V` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`W` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`X` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`Y` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`Z` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`AA` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };

        i++
        j++
      }


      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {
          type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'BASE DE DATOS DE DIAGNOSTICOS DEPARTAMENTAL DE CHAGAS' + ' ' + new Date().toLocaleDateString() + '.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      })
    } else toast.error("no se encontraron datos")
  };


  return (
    <div className="content" >

      <Row className="main-container">
        <Card>
          <CardHeader>
            <BackgroundColorContext.Consumer>
              {({ color }) => (
                <div className="tbl-header" data={color}>

                  <div >
                    Reporte de Diagnostico Departamental
                  </div>
                </div>
              )}
            </BackgroundColorContext.Consumer>
          </CardHeader>

          <CardBody>

            <Col md='6'>
              <Col md='12'>
                <Select1EasyColors
                  estado={idMunicipio}
                  cambiarEstado={setIdMunicipio}
                  ExpresionRegular={INPUT.ID}
                  lista={listaMunicipios}
                  name={"cv"}
                  etiqueta={"Municipio"}
                  msg="Seleccione una opcion"
                  nivel={setNivel}
                />
              </Col>

              <Row>
                <Col md='6'>
                  <InputUsuarioStandar
                    estado={inputBuscar}
                    cambiarEstado={setInputBuscar}
                    name="inputBuscar"
                    tipo={'date'}
                    ExpresionRegular={INPUT.FECHA} //expresion regular
                    // eventoBoton={buscar}
                    etiqueta={"Fecha 1"}
                  /></Col>
                <Col md='6'>
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


              </Row>
              <div style={{ borderBottom: '1px solid #E8F5F5', marginTop: '10px', marginBottom: '10px' }}>Parametros opcionales</div>
              <Row>

                <Col md='6'>
                  <Select1
                    estado={idGrupo}
                    cambiarEstado={setIdGrupo}
                    ExpresionRegular={INPUT.ID}
                    lista={listaGrupos}
                    name={"cv"}
                    etiqueta={"congenito/cronico"}
                    msg="Seleccione una opcion"
                    funcion={listarGrupoEtarios}
                  />
                </Col>
                <Col md='6'>
                  <Select1
                    estado={idGrupoEtario}
                    cambiarEstado={setIdGrupoEtario}
                    ExpresionRegular={INPUT.ID}
                    lista={listaGrupoEtario}
                    name={"cv"}
                    etiqueta={"Grupo Etario"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='12'>
                  <Select1
                    estado={idItem}
                    cambiarEstado={setIdItem}
                    ExpresionRegular={INPUT.ID}
                    lista={listaItems}
                    name={"cv"}
                    etiqueta={"Item Diagnostico"}
                    msg="Seleccione una opcion"
                  />
                </Col>

                <Col md='12'>
                  <Select1
                    estado={estadoMujeres}
                    cambiarEstado={setEstadoMujeres}
                    ExpresionRegular={INPUT.ID}
                    lista={[{ id: 1, label: 'GESTANTES SEROPOSITIVAS PARA CHAGAS DETECTADAS EN CONTROL PRE-NATAL' }]}
                    name={"cv"}
                    etiqueta={"Estado Mujeres"}
                    msg="Seleccione una opcion"
                  />
                </Col>

              </Row>
              <Col md='12 ' style={{ display: 'flex', justifyContent: 'end' }}>
                <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '24px' }} onClick={() => buscar()} >
                  Filtrar
                </button>
              </Col>
            </Col>

          </CardBody>

        </Card>
      </Row>
    </div >
  );
}

export default ReportesDiagnosticoDepto;
