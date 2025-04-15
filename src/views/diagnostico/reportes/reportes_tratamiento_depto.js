
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
import { Select1 } from 'components/input/elementos';

const ExcelJS = require('exceljs')

function ReportesTratamientoDepto() {


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
  const [listaMunicipios, setListaMunicipios] = useState([]);
  const [idMunicipio, setIdMunicipio] = useState({ campo: null, valido: null });
  const [nivel, setNivel] = useState({ campo: null, valido: null });



  const [medicamentos, setMedicamentos] = useState([])
  const [mujeresTratamiento, setMujeresTratamiento] = useState([])
  const [reaccionDermatologica, setReaccionDermatologica] = useState([])
  const [reaccionDigestiva, setReaccionDigestiva] = useState([])
  const [reaccionNeurologica, setReaccionNeurologica] = useState([])
  const [reaccionHematologica, setReaccionHematologica] = useState([])
  const [cronicoCongenito, setCronicoCongenito] = useState([])
  const [grupoEtario, setGrupoEtario] = useState([])

  const [idMedicamento, setIdMedicamento] = useState({ campo: null, valido: null })
  const [idMujeresTratamiento, setIdMujeresTratamiento] = useState({ campo: null, valido: null })
  const [idReaccionDermatologica, setIdReaccionDermatologica] = useState({ campo: null, valido: null })
  const [idReaccionDigestiva, setIdReaccionDigestiva] = useState({ campo: null, valido: null })
  const [idReaccionNeurologica, setIdReaccionNeurologica] = useState({ campo: null, valido: null })
  const [idReaccionHematologica, setIdReaccionHematologica] = useState({ campo: null, valido: null })
  const [idGrupo, setIdGrupo] = useState({ campo: null, valido: null });
  const [idGrupoEtario, setIdGrupoEtario] = useState({ campo: null, valido: null });


  useEffect(() => {
    document.title = "REPORTES TRATAMIENTO DEPARTAMENTAL";
    listarEstructura()
    listarParametroTipoConsulta()
    return () => { }
  }, [])

  const listarEstructura = async () => {
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.LISTAR_PARAMETROS)
    setListaMunicipios(data)

  };
  const listarGrupoEtarios = async (id) => {
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.LISTAR_GRUPOS_ETARIOS, { grupo: id })
    setGrupoEtario(data)
  }
  const listarParametroTipoConsulta = async () => {
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.LISTAR_PARAMETROS_TIPO_CONSULTA)
    setMedicamentos(data[0])
    setMujeresTratamiento(data[1])
    setReaccionDermatologica(data[2])
    setReaccionDigestiva(data[3])
    setReaccionNeurologica(data[4])
    setReaccionHematologica(data[5])
    setCronicoCongenito(data[6])
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
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.BUSCAR_CONSOLIDADO, {
      fecha1: inputBuscar.campo,
      fecha2: inputBuscar2.campo,
      grupo: idGrupo.campo,
      grupoEtario: idGrupoEtario.campo,
      idMedicamento: idMedicamento.campo,
      idMujeresTratamiento: idMujeresTratamiento.campo,
      idReaccionDermatologica: idReaccionDermatologica.campo,
      idReaccionDigestiva: idReaccionDigestiva.campo,
      idReaccionNeurologica: idReaccionNeurologica.campo,
      idReaccionHematologica: idReaccionHematologica.campo,
    })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }
  const buscarPorRed = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.BUSCAR_POR_RED, {
      fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, red: idMunicipio.campo,
      grupo: idGrupo.campo,
      grupoEtario: idGrupoEtario.campo,
      idMedicamento: idMedicamento.campo,
      idMujeresTratamiento: idMujeresTratamiento.campo,
      idReaccionDermatologica: idReaccionDermatologica.campo,
      idReaccionDigestiva: idReaccionDigestiva.campo,
      idReaccionNeurologica: idReaccionNeurologica.campo,
      idReaccionHematologica: idReaccionHematologica.campo,
    })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }

  const buscarPorMunicipio = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.BUSCAR_POR_MUNICIPIO, {
      fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, municipio: idMunicipio.campo,
      grupo: idGrupo.campo,
      grupoEtario: idGrupoEtario.campo,
      idMedicamento: idMedicamento.campo,
      idMujeresTratamiento: idMujeresTratamiento.campo,
      idReaccionDermatologica: idReaccionDermatologica.campo,
      idReaccionDigestiva: idReaccionDigestiva.campo,
      idReaccionNeurologica: idReaccionNeurologica.campo,
      idReaccionHematologica: idReaccionHematologica.campo,
    })
    toast.dismiss(loadingToast);
    listarExcel(data)
  }

  const buscarPorHospital = async () => {
    const loadingToast = toast.loading('Buscando información...');
    const data = await start(API_ENDPOINTS.REPORTES_TRATAMIENTO_DEPARTAMENTAL.BUSCAR_POR_HOSPITAL, {
      fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, hospital: idMunicipio.campo,
      grupo: idGrupo.campo,
      grupoEtario: idGrupoEtario.campo,
      idMedicamento: idMedicamento.campo,
      idMujeresTratamiento: idMujeresTratamiento.campo,
      idReaccionDermatologica: idReaccionDermatologica.campo,
      idReaccionDigestiva: idReaccionDigestiva.campo,
      idReaccionNeurologica: idReaccionNeurologica.campo,
      idReaccionHematologica: idReaccionHematologica.campo,

    })
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
      principal.mergeCells("A1:C5");

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


      principal.mergeCells('A6:A7');
      principal.getCell('A6').value = 'N°'
      principal.getCell('A6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('A6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('A6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('A6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('B6:B7');
      principal.getCell('B6').value = 'RED'
      principal.getCell('B6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('B6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('B6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('B6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('C6:C7');
      principal.getCell('C6').value = 'MUNICIPIO'
      principal.getCell('C6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('C6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('C6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('C6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('D6:D7');
      principal.getCell('D6').value = 'EST. DE SALUD'
      principal.getCell('D6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('D6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('D6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('D6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('E6:F7');
      principal.getCell('E6').value = 'MEDICO TRATANTE'
      principal.getCell('E6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('E6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('E6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('E6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };




      principal.mergeCells('G6:G7');
      principal.getCell('G6').value = 'PACIENTE'
      principal.getCell('G6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('G6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('G6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('G6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('H6:H7');
      principal.getCell('H6').value = 'CI'
      principal.getCell('H6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('H6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('H6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('H6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('I6:I7');
      principal.getCell('I6').value = 'FECHA NAC.'
      principal.getCell('I6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('I6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('I6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('I6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('J6:J7');
      principal.getCell('J6').value = 'EDAD'
      principal.getCell('J6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('J6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('J6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('J6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('K6:K7');
      principal.getCell('K6').value = 'GRUPO ETARIO'
      principal.getCell('K6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('K6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('K6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('K6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('L6:L7');
      principal.getCell('L6').value = 'SEXO'
      principal.getCell('L6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('L6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('L6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('L6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('M6:M7');
      principal.getCell('M6').value = 'CELULAR'
      principal.getCell('M6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('M6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('M6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('M6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



      principal.mergeCells('N6:N7');
      principal.getCell('N6').value = 'DIAGNOSTICO'
      principal.getCell('N6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('N6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('N6').font = { size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('N6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('O6:O7');
      principal.getCell('O6').value = 'FECHA DIAGNOSTICO'
      principal.getCell('O6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('O6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('O6').font = { size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('O6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };



      principal.mergeCells('P6:P7');
      principal.getCell('P6').value = 'MUJERES EN TRATAMIENTO'
      principal.getCell('P6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('P6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('P6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('P6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.mergeCells('Q6:Q7');
      principal.getCell('Q6').value = 'ESTUDIOS COMPLEMENTARIOS'
      principal.getCell('Q6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('Q6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('Q6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('Q6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('R6:R7');
      principal.getCell('R6').value = 'Fecha Inicio Tratamiento'
      principal.getCell('R6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('R6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('R6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('R6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('S6:S7');
      principal.getCell('S6').value = 'Conclusión de tratamiento'
      principal.getCell('S6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('S6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('S6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('S6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('T6:T7');
      principal.getCell('T6').value = 'Suspensión de tratamiento'
      principal.getCell('T6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('T6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('T6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('T6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('U6:U7');
      principal.getCell('U6').value = 'Abandono tratamiento'
      principal.getCell('U6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('U6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('U6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('U6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.mergeCells('V6:V7');
      principal.getCell('V6').value = 'Reacción Dermatológica'
      principal.getCell('V6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('V6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('V6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('V6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('W6:W7');
      principal.getCell('W6').value = 'Reacción Digestiva'
      principal.getCell('W6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('W6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('W6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('W6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('X6:X7');
      principal.getCell('X6').value = 'Reacción Neurológica'
      principal.getCell('X6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('X6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('X6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('X6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('Y6:Y7');
      principal.getCell('Y6').value = 'Reacción Hematologica'
      principal.getCell('Y6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('Y6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('Y6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('Y6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('Z6:Z7');
      principal.getCell('Z6').value = 'SITUACION EPIDEMICA'
      principal.getCell('Z6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('Z6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('Z6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('Z6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('AA6:AA7');
      principal.getCell('AA6').value = 'OBSERVACIONES'
      principal.getCell('AA6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('AA6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('AA6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('AA6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('AB6:AB7');
      principal.getCell('AB6').value = 'MEDICAMENTO'
      principal.getCell('AB6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('AB6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('AB6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('AB6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      principal.mergeCells('AC6:AC7');
      principal.getCell('AC6').value = 'DOSIS'
      principal.getCell('AC6').alignment = { horizontal: 'center', wrapText: true }
      principal.getCell('AC6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
      principal.getCell('AC6').font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell('AC6').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


      principal.getRow('6').height = 40
      principal.getColumn('A').width = 4
      principal.getColumn('B').width = 13
      principal.getColumn('C').width = 13
      principal.getColumn('D').width = 13
      principal.getColumn('E').width = 7
      principal.getColumn('F').width = 7
      principal.getColumn('G').width = 15
      principal.getColumn('H').width = 7
      principal.getColumn('I').width = 8
      principal.getColumn('J').width = 4
      principal.getColumn('K').width = 10
      principal.getColumn('L').width = 10
      principal.getColumn('M').width = 8
      principal.getColumn('N').width = 15
      principal.getColumn('O').width = 10
      principal.getColumn('P').width = 10
      principal.getColumn('Q').width = 20
      principal.getColumn('R').width = 10
      principal.getColumn('S').width = 10
      principal.getColumn('T').width = 10
      principal.getColumn('U').width = 10
      principal.getColumn('V').width = 10
      principal.getColumn('W').width = 10
      principal.getColumn('X').width = 10
      principal.getColumn('Y').width = 10
      principal.getColumn('Z').width = 10
      principal.getColumn('T').width = 10
      principal.getColumn('U').width = 10
      principal.getColumn('V').width = 10

      principal.getColumn('W').width = 10
      principal.getColumn('X').width = 10
      principal.getColumn('Z').width = 15
      principal.getColumn('AA').width = 20
      principal.getColumn('AB').width = 13
      principal.getColumn('AC').width = 6







      let i = 8
      let j = 1
      for (let d of lista) {

        principal.getRow(i).height = 35

        principal.getCell(`A` + i).value = j
        principal.getCell(`B` + i).value = d.red
        principal.getCell(`C` + i).value = d.municipio
        principal.getCell(`D` + i).value = d.hospital
        principal.mergeCells('E' + i + ':F' + i)

        principal.getCell(`E` + i).value = d.medico

        principal.getCell(`G` + i).value = d.nombre + ' ' + d.ap1 + ' ' + d.ap2
        principal.getCell(`H` + i).value = d.ci
        principal.getCell(`I` + i).value = d.fecha_nacimiento
        principal.getCell(`J` + i).value = d.edad
        principal.getCell(`K` + i).value = d.grupo_etario
        principal.getCell(`L` + i).value = d.sexo
        principal.getCell(`M` + i).value = d.celular
        principal.getCell(`N` + i).value = d.diagnostico
        principal.getCell(`O` + i).value = d.fecha_diagnostico
        principal.getCell(`P` + i).value = d.mujeres_tratamiento
        principal.getCell(`Q` + i).value = d.complementarios
        principal.getCell(`R` + i).value = d.fecha_ini
        principal.getCell(`S` + i).value = d.fecha_fin
        principal.getCell(`T` + i).value = d.suspension
        principal.getCell(`U` + i).value = d.abandono
        principal.getCell(`V` + i).value = d.reaccion_dermatologica
        principal.getCell(`W` + i).value = d.reaccion_digestiva
        principal.getCell(`X` + i).value = d.reaccion_neurologica
        principal.getCell(`Y` + i).value = d.reaccion_hematologica
        principal.getCell(`Z` + i).value = d.epidemica
        principal.getCell(`AA` + i).value = d.observacion
        principal.getCell(`AB` + i).value = d.medicamento
        principal.getCell(`AC` + i).value = d.dosis



        principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`B` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`C` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`D` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`E` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
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
        principal.getCell(`AB` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }
        principal.getCell(`AC` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffff' }, }




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
        // principal.getCell(`N` + i).alignment = { horizontal: 'center', wrapText: true };
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




        principal.getCell(`A` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`B` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`C` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`D` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`E` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
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
        principal.getCell(`AB` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
        principal.getCell(`AC` + i).font = { size: 8, italic: false, color: { argb: "2c3e50" }, };
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
        anchor.download = 'BASE DE DATOS DX Y TX CHAGAS ACTUALIZADA' + ' ' + new Date().toLocaleDateString() + '.xlsx';
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
                    Reporte de Tratamiento Departamental
                  </div>
                </div>
              )}
            </BackgroundColorContext.Consumer>
          </CardHeader>

          <CardBody>
            <Row>
              <Col md='6'>
                <Row>
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

              </Col>
              <Col>

                <div style={{ borderBottom: '1px solid #E8F5F5', marginTop: '10px', marginBottom: '10px' }}>Parametros opcionales</div>
                <Row>
                  <Col md='6'>
                    <Select1
                      estado={idGrupo}
                      cambiarEstado={setIdGrupo}
                      ExpresionRegular={INPUT.ID}
                      lista={cronicoCongenito}
                      name={"cv"}
                      etiqueta={"congenito/cronico"}
                      msg="Seleccione una opcion"
                      funcion={listarGrupoEtarios}
                      importante={false}

                    />
                  </Col>
                  <Col md='6'>
                    <Select1
                      estado={idGrupoEtario}
                      cambiarEstado={setIdGrupoEtario}
                      ExpresionRegular={INPUT.ID}
                      lista={grupoEtario}
                      name={"cv"}
                      etiqueta={"Grupo Etario"}
                      msg="Seleccione una opcion"
                      importante={false}

                    />
                  </Col>

                  <Col md='6'>
                    <Select1
                      estado={idMedicamento}
                      cambiarEstado={setIdMedicamento}
                      ExpresionRegular={INPUT.ID}
                      lista={medicamentos}
                      name={"medicamento"}
                      etiqueta={"Medicamentos"}
                      msg="Seleccione una opcion"
                      importante={false}

                    />
                  </Col>
                  <Col md='6'>
                    <Select1
                      estado={idMujeresTratamiento}
                      cambiarEstado={setIdMujeresTratamiento}
                      ExpresionRegular={INPUT.ID}
                      lista={mujeresTratamiento}
                      name={"mujeres_tratamiento"}
                      etiqueta={"Mujeres Tratamiento"}
                      msg="Seleccione una opcion"
                      importante={false}

                    />
                  </Col>
                  <Col md='6'>
                    <Select1
                      estado={idReaccionDermatologica}
                      cambiarEstado={setIdReaccionDermatologica}
                      ExpresionRegular={INPUT.ID}
                      lista={reaccionDermatologica}
                      name={"reaccion_dermatologica"}
                      etiqueta={"Reaccion Dermatologica"}
                      msg="Seleccione una opcion"
                      importante={false}

                    />
                  </Col>

                  <Col md='6'>
                    <Select1
                      estado={idReaccionDigestiva}
                      cambiarEstado={setIdReaccionDigestiva}
                      ExpresionRegular={INPUT.ID}
                      lista={reaccionDigestiva}
                      name={"reaccion_digestiva"}
                      etiqueta={"Reaccion Digestiva"}
                      msg="Seleccione una opcion"
                      importante={false}

                    />
                  </Col>

                  <Col md='6'>
                    <Select1
                      estado={idReaccionHematologica}
                      cambiarEstado={setIdReaccionHematologica}
                      ExpresionRegular={INPUT.ID}
                      lista={reaccionHematologica}
                      name={"reaccion_hematologica"}
                      etiqueta={"Reaccion Hematologica"}
                      msg="Seleccione una opcion"
                      importante={false}
                    />
                  </Col>

                  <Col md='6'>
                    <Select1
                      estado={idReaccionNeurologica}
                      cambiarEstado={setIdReaccionNeurologica}
                      ExpresionRegular={INPUT.ID}
                      lista={reaccionNeurologica}
                      name={"reaccion_neurologica"}
                      etiqueta={"Reaccion Neurologica"}
                      msg="Seleccione una opcion"
                      importante={false}
                    />
                  </Col>



                </Row>
              </Col>
              <Col md='12 ' style={{ display: 'flex', justifyContent: 'center', }}>
                <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '24px', width: '100px' }} onClick={() => buscar()} >
                  Filtrar
                </button>
              </Col>
            </Row>

          </CardBody>

        </Card>
      </Row>
    </div >
  );
}

export default ReportesTratamientoDepto;
