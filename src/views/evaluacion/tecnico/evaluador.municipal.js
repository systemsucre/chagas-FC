
import React, { useEffect, useState } from "react";
import swal from 'sweetalert2'
import { Button, Card, CardHeader, CardBody, Form, Row, Col, Modal, ModalBody, ModalHeader, Table, } from "reactstrap";
import { InputUsuarioStandar } from "components/input/elementos";


import { URL, INPUT } from "Auth/config";
import { start } from 'service'
import toast from "react-hot-toast";
import { editDB } from "service";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ComponenteSubTitle } from "components/input/elementos";

import { ComponenteInputUserDisabled } from "components/input/elementos";
import { InputUsuarioStandarTable } from "components/input/elementos";


import { sedes } from 'assets/img/logo';
import { ComponenteCheck_ } from "components/input/elementos";
import { Select1Easy } from "components/input/elementos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { defaultDB } from "service";
import { saveDB } from "service";
import { eliminarDB } from "service";
import { Select1 } from "components/input/elementos";

const ExcelJS = require('exceljs')


function EvaluacionMunicipal() {

  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
  const [comunidad, setComunidad] = useState({ campo: null, valido: null });

  const [listaGestion, setListaGestion] = useState([]);
  const [listaMes, setListaMes] = useState([]);
  const [listaComunidad, setListaComunidad] = useState([]);

  const [listaCasa, setListaCasa] = useState([]);
  const [listaOtros, setListaOtros] = useState([]);

  const [casa, setCasa] = useState({ campo: null, valido: null });
  const [cvCasa, setCvCasa] = useState({ campo: null, valido: null });
  const [mesAño, setMesAño] = useState({ campo: null, valido: null });
  const [inicio, setInicio] = useState({ campo: new Date().toLocaleTimeString(), valido: 'true' });
  const [final, setFinal] = useState({ campo: new Date(new Date().setMinutes(new Date().getMinutes() + 30)).toLocaleTimeString(), valido: 'true' });

  // EJEMPLARES CAPTURADOS
  const [ecin, setEcin] = useState({ campo: 0, valido: 'true' });
  const [ecia, setEcia] = useState({ campo: 0, valido: 'true' });
  const [ecpn, setEcpn] = useState({ campo: 0, valido: 'true' });
  const [ecpa, setEcpa] = useState({ campo: 0, valido: 'true' });
  const [lcipd, setLcipd] = useState({ campo: 0, valido: 'true' });
  const [lcicm, setLcicm] = useState({ campo: 0, valido: 'true' });
  const [lcith, setLcith] = useState({ campo: 0, valido: 'true' });
  const [lciot, setLciot] = useState({ campo: 0, valido: 'true' });

  const [lcppd, setLcppd] = useState({ campo: 0, valido: 'true' });
  const [lcpga, setLcpga] = useState({ campo: 0, valido: 'true' });
  const [lcpcl, setLcpcl] = useState({ campo: 0, valido: 'true' });
  const [lcpcj, setLcpcj] = useState({ campo: 0, valido: 'true' });
  const [lcpz, setLcpz] = useState({ campo: 0, valido: 'true' });
  const [lcpot, setLcpot] = useState({ campo: 0, valido: 'true' });

  const [tiempoTotal, setTiempoTotal] = useState(null);
  const [negativa, setNegativa] = useState(false);
  const [cerrada, setCerrada] = useState(false);
  const [renuente, setRenuente] = useState(false);
  const [covertura, setCovertura] = useState(0);
  const [prerociado, setPrerociado] = useState({ campo: 1, valido: 'true' });
  const [modalEditar, setModalEditar] = useState(false);


  useEffect(() => {
    document.title = "EVALUACION MUNICIPAL";
    listarGestion()
    listarComunidad()
    return () => { }
  }, [])

  const listarGestion = async () => {
    const listaGEstion = await start(URL + '/evaluador-ee1-municipal/listar-anios')
    setListaGestion(listaGEstion)
    listarMeses(listaGEstion[0].value);
    setInputBuscar({
      campo: listaGEstion.length > 0 ? listaGEstion[0].value : null,
      valido: listaGEstion.length > 0 ? "true" : null,
    });
  }

  const listarMeses = async (gestion) => {
    if (gestion) {
      const listaMeses = await start(URL + '/evaluador-ee1-municipal/listar-meses', { gestion })
      setListaMes(listaMeses)
    }
  }

  const listarComunidad = async () => {
    const dataComunidad = await start(URL + '/evaluador-ee1-municipal/listar-comunidad',{})
    setListaComunidad(dataComunidad)
  }

  const listarCasas = async () => {
    if (inputBuscar2.campo && comunidad.campo) {
      const data = await start(URL + '/evaluador-ee1-municipal/listar-casas', { comunidad: comunidad.campo, mes: inputBuscar2.campo }, 'Espere, cargando informacion...!')

      if (data[1].length > 0) {


        //console.log(data)
        let totalHoras2 = 0;
        let totalMinutos2 = 0;
        let totalSegundos2 = 0;

        // Recorremos el array de objetos
        for (const tiempo of data[0]) {
          if (tiempo.estado) {
            const [horas, minutos, segundos] = tiempo.total.split(':');
            totalHoras2 += parseInt(horas, 10);
            totalMinutos2 += parseInt(minutos, 10);
            totalSegundos2 += parseInt(segundos, 10);
          }
        }
        totalMinutos2 += Math.floor(totalSegundos2 / 60);
        totalSegundos2 %= 60;
        totalHoras2 += Math.floor(totalMinutos2 / 60);
        totalMinutos2 %= 60;
        setTiempoTotal(totalHoras2 + ':' + totalMinutos2 + ':' + totalSegundos2)
        // calculo de la cobertura de la actividad, debe ser mayor al 70%
        let c = 0
        // console.log(data[0], ' datos de la evaluacion')

        for (let e of data[0]) {
          if (e.estado != 0)
            if (!e.cerrada && !e.renuente)
              c++
        }
        // alert('hola ' + c)

        setCovertura(((c * 100) / data[0].length).toFixed(2) + '%')

        setListaCasa(data[0])
        setListaOtros(data[1])

        return
      } else toast.error('No existe estructura!')
    } else {
      toast.error('Seleccion el año, mes y la comunidad que corresponde  ')
    }
  };

  const vaciar = () => {

    setCasa({ campo: null, valido: null })
    setEcin({ campo: 0, valido: 'true' })
    setEcia({ campo: 0, valido: 'true' })
    setEcpn({ campo: 0, valido: 'true' })
    setEcpa({ campo: 0, valido: 'true' })
    setLcipd({ campo: 0, valido: 'true' })
    setLcicm({ campo: 0, valido: 'true' })
    setLcith({ campo: 0, valido: 'true' })
    setLciot({ campo: 0, valido: 'true' })
    setLcppd({ campo: 0, valido: 'true' })
    setLcpga({ campo: 0, valido: 'true' })
    setLcpcl({ campo: 0, valido: 'true' })
    setLcpcj({ campo: 0, valido: 'true' })
    setLcpz({ campo: 0, valido: 'true' })
    setLcpot({ campo: 0, valido: 'true' })
    setNegativa(false)
    setCerrada(false)
    setRenuente(false)

  }

  const insertar = async () => {



    await editDB(URL + '/evaluador-ee1-municipal/guardar', {
      comunidad: comunidad.campo,
      nombre_comunidad: listaComunidad.find(e => comunidad.campo === e.value).label,
      casa: casa.campo,
      inicio: inicio.campo,
      final: final.campo,
      ecin: ecin.campo,
      ecia: ecia.campo,
      ecpn: ecpn.campo,
      ecpa: ecpa.campo,
      lcipd: lcipd.campo,
      lcicm: lcicm.campo,
      lcith: lcith.campo,
      lciot: lciot.campo,
      lcppd: lcppd.campo,
      lcpga: lcpga.campo,
      lcpcl: lcpcl.campo,
      lcpcj: lcpcj.campo,
      lcpz: lcpz.campo,
      lcpot: lcpot.campo,
      negativa: negativa || 0,
      cerrada: cerrada || 0,
      renuente: renuente || 0,
      prerociado: prerociado.campo,
      id_gestion: inputBuscar.campo,
      gestion: listaGestion.find(e => e.value === inputBuscar.campo).label,
      id_mes: inputBuscar2.campo,
      mes: listaMes.find(e => e.value === inputBuscar2.campo).label,

    }, setModalEditar, null, false, vaciar)

    listarCasas()
    return;

  };

  const deleted = async (evaluacion) => {
    if (window.confirm('Desea quitar esta evaluacion...?')) {
      await eliminarDB(URL + '/evaluador-ee1-municipal/deleted', { evaluacion })
      listarCasas()
    }
  }


  const toggleEdit = () => {
    setModalEditar(false)
    vaciar()
  }

  const listaExcel = async () => {

    if (listaCasa.length == 0) { toast.error('no hay datos para exportar'); return }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'system sucre cel 71166513';
    workbook.lastModifiedBy = 'SYSTEM SUCRE';

    const principal = workbook.addWorksheet('EE-1 ' + listaOtros[0].comunidad, {

      properties: {
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
    principal.mergeCells('F1:Z1');
    principal.getCell('F1').alignment = { vertical: 'center', horizontal: 'center' };
    principal.getCell("F1").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
    principal.getCell('F1').value = 'MINISTERIO DE SALUD Y DEPORTES'
    principal.mergeCells('F2:Z2');
    principal.getCell("F2").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
    principal.getCell('F2').alignment = { vertical: 'center', horizontal: 'center' };
    principal.getCell('F2').value = 'DIRECCION GENERAL DE EPIDEMIOLOGIA'
    principal.mergeCells('E3:AA3');
    principal.getCell("F3").font = { bold: 600, size: 11, color: { argb: "595959" }, italic: false, };
    principal.getCell('F3').alignment = { vertical: 'center', horizontal: 'center' };
    principal.getCell('F3').value = 'PROGRAMA NACIONAL DE ENFERMEDADES TRANSMITIDAS POR VECTORES - COMPONENTE CHAGAS'

    principal.mergeCells('E5:Z5');
    principal.getCell("F5").font = { bold: 600, size: 13, color: { argb: "595959" }, italic: false, };
    principal.getCell('F5').alignment = { vertical: 'center', horizontal: 'center' };
    principal.getCell('F5').value = 'PLANILLA DIARIA DE EVALUACION ENTOMOLOGICA EE-1'

    // principal.mergeCells('D4:H4');

    principal.mergeCells('A6:E6');
    principal.getCell('A6').alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell("A6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell('A6').value = 'SEDES: CHUQUISACA'

    listaOtros.forEach((e, i) => {
      principal.mergeCells('F6:J6');
      principal.getCell('F6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("F6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('F6').value = 'RED DE SALUD: ' + e.red

      principal.mergeCells('K6:U6');
      principal.getCell('K6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("K6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('K6').value = 'E. SALUD: ' + e.hospital

      principal.mergeCells('V6:AF6');
      principal.getCell('V6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("V6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('V6').value = 'MUNICIPIO: ' + e.municipio

      principal.mergeCells('AG6:AJ6');
      principal.getCell('AG6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("AG6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('AG6').value = 'COMUNIDAD: ' + e.comunidad
    })

    principal.mergeCells('A7:G7');
    principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell("A7").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell('A7').value = listaCasa.find(e => e.fecha)?.fecha ? 'FECHA DE EJECUCION: ' + listaCasa.find(e => e.fecha)?.fecha : 'FECHA DE EJECUCION: '

    principal.mergeCells('H7:N7');
    principal.getCell('H7').alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell("H7").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell('H7').value = listaCasa.find(e => e.prerociado)?.prerociado ? listaCasa.find(e => e.prerociado)?.prerociado === 1 ? 'TIPO DE ACTIVIDAD: PRE-ROCIADO' : 'TIPO DE ACTIVIDAD: POST-ROCIADO' : null


    principal.mergeCells('O7:Z7');
    principal.getCell('O7').alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell("O7").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell('O7').value = listaCasa.find(e => e.mes)?.mes ? 'GESTION : ' + listaCasa.find(e => e.mes)?.mes
      : 'GESTION: -, MES: -'


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

    principal.mergeCells('D8:F9');
    principal.getCell('D8').value = 'HORA'
    principal.getCell('D8').alignment = { horizontal: 'center' }
    principal.getCell('D8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('D8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('D8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.mergeCells('D10:D10');
    principal.getCell('D10').value = 'INICIO'
    principal.getCell('D10').alignment = { horizontal: 'center' }
    principal.getCell('D10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('D10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('D10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.mergeCells('E10:E10');
    principal.getCell('E10').value = 'FINAL'
    principal.getCell('E10').alignment = { horizontal: 'center' }
    principal.getCell('E10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('E10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('E10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.mergeCells('F10:F10');
    principal.getCell('F10').value = 'TOTAL'
    principal.getCell('F10').alignment = { horizontal: 'center' }
    principal.getCell('F10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('F10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50 " }, };
    principal.getCell('F10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getColumn('G').width = 3
    principal.getRow('8').height = 30
    principal.getRow('9').height = 30

    principal.mergeCells('G8:G10');
    principal.getCell('G8').value = 'N° HABITANTES'
    principal.getCell('G8').alignment = { textRotation: 90 }
    principal.getCell('G8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('G8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('G8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getColumn('B').width = 10
    principal.getColumn('D').width = 7
    principal.getColumn('E').width = 7
    principal.getColumn('F').width = 7
    principal.getColumn('H').width = 4
    principal.getColumn('I').width = 5
    principal.getColumn('J').width = 4

    principal.getColumn('M').width = 3
    principal.getColumn('N').width = 3
    principal.getColumn('O').width = 3
    principal.getColumn('P').width = 3
    principal.getColumn('Q').width = 3
    principal.getColumn('R').width = 3
    principal.getColumn('S').width = 3
    principal.getColumn('T').width = 3
    principal.getColumn('U').width = 3
    principal.getColumn('V').width = 3
    principal.getColumn('X').width = 3
    principal.getColumn('W').width = 3
    principal.getColumn('Y').width = 3
    principal.getColumn('Z').width = 3
    principal.getColumn('AA').width = 3
    principal.getColumn('AB').width = 3
    principal.getColumn('AC').width = 4
    principal.getColumn('AD').width = 4
    principal.getColumn('AI').width = 15
    principal.getColumn('AJ').width = 9
    principal.getColumn('AK').width = 10


    principal.mergeCells('H8:H10');
    principal.getCell('H8').value = 'TOTAL HABITACIONES'
    principal.getCell('H8').alignment = { textRotation: 90, wrapText: true }
    principal.getCell('H8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('H8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('H8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('I8:J10');
    principal.getCell('I8').value = 'FECHA DE ULTIMO ROCIADO'
    principal.getCell('I8').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('I8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('I8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('I8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


    principal.mergeCells('K8:L9');
    principal.getCell('K8').value = 'VIVIENDA MEJORADA'
    principal.getCell('K8').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('K8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('K8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('K8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.getCell('K10').value = 'INTRA'
    principal.getCell('K10').alignment = { horizontal: 'center' }
    principal.getCell('K10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('K10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('K10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.getCell('L10').value = 'PERI'
    principal.getCell('L10').alignment = { horizontal: 'center' }
    principal.getCell('L10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('L10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('L10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('M8:R8');
    principal.getCell('M8').value = 'N° EJEMPLARES CAPTURADOS'
    principal.getCell('M8').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('M8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('M8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('M8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('M9:N9');
    principal.getCell('M9').value = 'INTRA'
    principal.getCell('M9').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('M9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('M9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('M9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.mergeCells('O9:P9');
    principal.getCell('O9').value = 'PERI'
    principal.getCell('O9').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('O9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('O9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('O9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.mergeCells('Q9:R9');
    principal.getCell('Q9').value = 'TOTAL'
    principal.getCell('Q9').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('Q9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('Q9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('Q9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('M10').value = 'N'
    principal.getCell('M10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('M10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('M10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('M10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('N10').value = 'A'
    principal.getCell('N10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('N10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('N10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('N10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('O10').value = 'N'
    principal.getCell('O10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('O10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('O10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('O10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('P10').value = 'A'
    principal.getCell('P10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('P10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('P10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('P10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('Q10').value = 'N'
    principal.getCell('Q10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('Q10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('Q10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('Q10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('R10').value = 'A'
    principal.getCell('R10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('R10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('R10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('R10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


    principal.mergeCells('S8:AB8');
    principal.getCell('S8').value = 'LUGAR DE CAPTURA'
    principal.getCell('S8').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('S8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('S8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('S8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


    principal.mergeCells('S9:V9');
    principal.getCell('S9').value = 'N° INTRA'
    principal.getCell('S9').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('S9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('S9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('S9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    principal.mergeCells('W9:AB9');
    principal.getCell('W9').value = 'N° PERI'
    principal.getCell('W9').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('W9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('W9').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('W9').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };




    principal.getCell('S10').value = 'PD'
    principal.getCell('S10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('S10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('S10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('S10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('T10').value = 'CM'
    principal.getCell('T10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('T10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('T10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('T10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('U10').value = 'TH'
    principal.getCell('U10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('U10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('U10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('U10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('V10').value = 'OT'
    principal.getCell('V10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('V10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('V10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('V10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('W10').value = 'PD'
    principal.getCell('W10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('W10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('W10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('W10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('X10').value = 'GA'
    principal.getCell('X10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('X10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('X10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('X10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('Y10').value = 'CL'
    principal.getCell('Y10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('Y10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('Y10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('Y10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('Z10').value = 'CJ'
    principal.getCell('Z10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('Z10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('Z10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('Z10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('AA10').value = 'Z ó T'
    principal.getCell('AA10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AA10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AA10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AA10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.getCell('AB10').value = 'OT'
    principal.getCell('AB10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AB10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AB10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AB10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };




    principal.mergeCells('AC8:AH9');
    principal.getCell('AC8').value = 'PUNTO GEOGRAFICO DE LA VIVIENDA'
    principal.getCell('AC8').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AC8').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AC8').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AC8').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('AC10:AD10');
    principal.getCell('AC10').value = 'ALTURA'
    principal.getCell('AC10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AC10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AC10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AC10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('AE10:AF10');
    principal.getCell('AE10').value = 'LATITUD'
    principal.getCell('AE10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AE10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AE10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AE10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('AG10:AH10');
    principal.getCell('AG10').value = 'LONGITUD'
    principal.getCell('AG10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AG10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AG10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AG10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


    principal.mergeCells('AI8:AI10');

    principal.getCell('AI10').value = 'TECNICO'
    principal.getCell('AI10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AI10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AI10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AI10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('AJ8:AJ10');
    principal.getCell('AJ10').value = 'TIPO ACTIVIDAD'
    principal.getCell('AJ10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AJ10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AJ10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AJ10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    principal.mergeCells('AK8:AK10');
    principal.getCell('AK10').value = 'MES EVALUACION'
    principal.getCell('AK10').alignment = { horizontal: 'center', wrapText: true }
    principal.getCell('AK10').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1bbec0' }, }
    principal.getCell('AK10').font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell('AK10').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };


 
    let i = 11
    for (let d of listaCasa) {

      principal.mergeCells(`B` + i + `:C` + i);
      principal.mergeCells(`I` + i + `:J` + i);
      principal.mergeCells(`AC` + i + `:AD` + i);
      principal.mergeCells(`AE` + i + `:AF` + i);
      principal.mergeCells(`AG` + i + `:AH` + i);

      principal.getCell(`A` + i).value = d.cv
      principal.getCell(`B` + i).value = d.jefefamilia
      principal.getCell(`D` + i).value = d.inicio
      principal.getCell(`E` + i).value = d.final
      principal.getCell(`F` + i).value = d.total
      principal.getCell(`G` + i).value = d.habitantes
      principal.getCell(`H` + i).value = d.num_hab
      principal.getCell(`I` + i).value = d.fecha_rociado
      principal.getCell(`K` + i).value = d.vm_intra == -1 ? '' : d.vm_intra ? 'SI' : 'NO'
      principal.getCell(`L` + i).value = d.vm_peri == -1 ? '' : d.vm_peri ? 'SI' : 'NO'
      principal.getCell(`M` + i).value = d.ecin
      principal.getCell(`N` + i).value = d.ecia

      principal.getCell(`O` + i).value = d.ecpn
      principal.getCell(`P` + i).value = d.ecpa
      principal.getCell(`Q` + i).value = d.cerrada ? 'C' : d.renuente ? 'R' : d.ecin + d.ecpn
      principal.getCell(`R` + i).value = d.cerrada ? 'E' : d.renuente ? 'E' : d.ecia + d.ecpa
      principal.getCell(`S` + i).value = d.cerrada ? 'R' : d.renuente ? 'N' : d.lcipd
      principal.getCell(`T` + i).value = d.cerrada ? 'R' : d.renuente ? 'U' : d.lcicm

      principal.getCell(`U` + i).value = d.cerrada ? 'A' : d.renuente ? 'E' : d.lcith
      principal.getCell(`V` + i).value = d.cerrada ? 'D' : d.renuente ? 'N' : d.lciot
      principal.getCell(`W` + i).value = d.cerrada ? 'A' : d.renuente ? 'E' : d.lcppd
      principal.getCell(`X` + i).value = d.lcpga
      principal.getCell(`Y` + i).value = d.lcpcl
      principal.getCell(`Z` + i).value = d.lcpcj
      principal.getCell(`AA` + i).value = d.lcpz
      principal.getCell(`AB` + i).value = d.lcpot
      principal.getCell(`AC` + i).value = d.altitud
      principal.getCell(`AE` + i).value = d.longitud
      principal.getCell(`AG` + i).value = d.latitud
      principal.getCell(`AI` + i).value = d.author
      principal.getCell(`AJ` + i).value = d.prerociado === 1 ? 'PREROCIADO' : d.prerociado === 2 ? 'POSTROCIADO' : null
      principal.getCell(`AK` + i).value = d.mes

      principal.getCell(`AC` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AE` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AG` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AI` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AJ` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AK` + i).alignment = { horizontal: 'center', wrapText: true }

      principal.getCell(`A` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`B` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`D` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`E` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`F` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`G` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`H` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`I` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
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
      principal.getCell(`AE` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`AG` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`AI` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`AJ` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }
      principal.getCell(`AK` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: !d.estado ? 'fadbd8' : 'ffffff' }, }



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

      principal.getCell(`AE` + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      principal.getCell(`AG` + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      principal.getCell(`AI` + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      principal.getCell(`AJ` + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      principal.getCell(`AK` + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      principal.getCell(`A` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`B` + i).font = { bold: 400, size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`D` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`E` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`F` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`G` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`H` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`I` + i).font = { bold: 600, size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`K` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`L` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`M` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`N` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`O` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`P` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`Q` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`R` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`S` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`T` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`U` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`V` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`W` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`X` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`Y` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`Z` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AA` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AB` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AC` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AE` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AG` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AI` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AJ` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`AK` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };

      i++
    }

    principal.mergeCells(`B` + i + `:C` + i);
    principal.mergeCells(`I` + i + `:J` + i);
    principal.mergeCells(`AC` + i + `:AD` + i);
    principal.mergeCells(`AE` + i + `:AF` + i);
    principal.mergeCells(`AG` + i + `:AH` + i);

    principal.getCell(`A` + i).value = '-'
    principal.getCell(`B` + i).value = listaCasa.filter(e => e.estado > 0).length + ' vivienda(s) evaluadas'
    principal.getCell(`B` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell(`D` + i).value = '-'
    principal.getCell(`E` + i).value = '-'
    principal.getCell(`F` + i).value = tiempoTotal + 'HRS.'
    principal.getCell(`F` + i).font = { size: 7, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell(`F` + i).alignment = { vertical: 'justify' };
    principal.getCell(`G` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.habitantes, 0)
    principal.getCell(`H` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.num_hab, 0)
    principal.getCell(`I` + i).value = '-'

    let intras = listaCasa.reduce((acumulador, actual) => { return actual.vm_intra !== -1 ? acumulador + parseInt(actual.vm_intra) : acumulador }, 0)
    let intran = listaCasa.reduce((acumulador, actual) => { return actual.vm_intra == 0 ? acumulador + 1 : acumulador }, 0)
    let peris = listaCasa.reduce((acumulador, actual) => { return actual.vm_peri !== -1 ? acumulador + actual.vm_peri : acumulador }, 0)
    let perin = listaCasa.reduce((acumulador, actual) => { return actual.vm_peri == 0 ? acumulador + 1 : acumulador }, 0)

    principal.getCell(`K` + i).value = ' SI=' + intras + ' NO=' + intran
    principal.getCell(`L` + i).value = 'SI=' + peris + ' NO=' + perin
    principal.getCell(`G` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell(`H` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell(`K` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell(`L` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
    principal.getCell(`M` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.ecin, 0)
    principal.getCell(`N` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.ecia, 0)

    principal.getCell(`O` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.ecpn, 0)
    principal.getCell(`P` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.ecpa, 0)
    principal.getCell(`Q` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.ecin, 0) + listaCasa.reduce((acumulador, actual) => acumulador + actual.ecpn, 0)
    principal.getCell(`R` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.ecia, 0) + listaCasa.reduce((acumulador, actual) => acumulador + actual.ecpa, 0)
    principal.getCell(`S` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcipd, 0)
    principal.getCell(`T` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcicm, 0)

    principal.getCell(`U` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcith, 0)
    principal.getCell(`V` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lciot, 0)
    principal.getCell(`W` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcppd, 0)
    principal.getCell(`X` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcpga, 0)
    principal.getCell(`Y` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcpcl, 0)
    principal.getCell(`Z` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcpcj, 0)
    principal.getCell(`AA` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcpz, 0)
    principal.getCell(`AB` + i).value = listaCasa.reduce((acumulador, actual) => acumulador + actual.lcpot, 0)
    principal.getCell(`AC` + i).value = '-'
    principal.getCell(`AE` + i).value = '-'
    principal.getCell(`AG` + i).value = '-'
    principal.getCell(`AC` + i).alignment = { horizontal: 'center', wrapText: true }
    principal.getCell(`AE` + i).alignment = { horizontal: 'center', wrapText: true }
    principal.getCell(`AG` + i).alignment = { horizontal: 'center', wrapText: true }

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
    principal.getCell(`W` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
    principal.getCell(`X` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
    principal.getCell(`Y` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
    principal.getCell(`Z` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9 ' }, }
    principal.getCell(`AA` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
    principal.getCell(`AB` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }

    principal.getCell(`AC` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
    principal.getCell(`AE` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }
    principal.getCell(`AG` + i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e5e7e9' }, }



    principal.mergeCells(`A` + (i + 3) + `:D` + (i + 3));
    principal.getCell(`A` + (i + 3)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`A` + (i + 3)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`A` + (i + 3)).value = 'LUGAR DE CAPTURA'


    principal.mergeCells(`A` + (i + 4) + `:C` + (i + 4));
    principal.getCell(`A` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`A` + (i + 4)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`A` + (i + 4)).value = 'INTRA DOMICILIO'

    principal.mergeCells(`D` + (i + 4) + `:Z` + (i + 4));
    principal.getCell(`D` + (i + 4)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`D` + (i + 4)).font = { size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`D` + (i + 4)).value = '(PD)=PARED (TH)=TECHO (OT)=OTROS (CM)=CAMA'

    principal.mergeCells(`A` + (i + 5) + `:C` + (i + 5));
    principal.getCell(`A` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`A` + (i + 5)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`A` + (i + 5)).value = 'PERI DOMICILIO'

    principal.mergeCells(`D` + (i + 5) + `:Z` + (i + 5));
    principal.getCell(`D` + (i + 5)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`D` + (i + 5)).font = { size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`D` + (i + 5)).value = "(PD)=PARED (CL)=CORRAL (GA)=GALLINERO (CJ)=CONEJERA (Z ö T)=ZARZO O TRO (OT)=OTROS"


    principal.mergeCells(`A` + (i + 6) + `:C` + (i + 6));
    principal.getCell(`A` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`A` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`A` + (i + 6)).value = 'VIVIENDA MEJORADA'

    principal.mergeCells(`D` + (i + 6) + `:N` + (i + 6));
    principal.getCell(`D` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`D` + (i + 6)).font = { size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`D` + (i + 6)).value = "ANOTAR SI/NO EN LAS CASILLAS DE INTRA Y PERI DOMICILIO"


    principal.mergeCells(`A` + (i + 8) + `:N` + (i + 8));
    principal.getCell(`A` + (i + 8)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`A` + (i + 8)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`A` + (i + 8)).value = listaCasa.find(e => e.author)?.author ? 'Evaluador: ' + listaCasa.find(e => e.author)?.author : 'Evauador: - '

    principal.mergeCells(`U` + (i + 8) + `:AH` + (i + 8));
    principal.getCell(`U` + (i + 8)).alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell(`U` + (i + 8)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell(`U` + (i + 8)).value = 'Firma:                                .................................'



    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'EE-1-' + listaOtros[0]?.comunidad + ' ' + listaCasa.find(e => e.fecha)?.fecha + '.xlsx';
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
                {({ color }) => (<div className="tbl-header" data={color}><div>Evaluacion entomológica</div></div>)}
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
                <Col md='3' onClick={() => setListaCasa([])}>
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
                <Col md='3' onClick={() => setListaCasa([])}>
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
                  <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px' }} onClick={() => listarCasas()
                  } >
                    Filtrar
                  </button>
                </Col>
                <Col md='2' style={{ display: 'flex', justifyContent: 'end' }}>
                  <button className="btn-reportes" style={{ marginTop: window.innerWidth < 768 ? '5px' : '23px', background: ' #7da05a', color: 'white' }} onClick={() => listaExcel()} >
                    {"EXCEL"}
                  </button>
                </Col>

              </Row>
              <div className="row">
                <div className="col-4 tbl-name tbl-bold">{'Total viviendas :  ' + listaCasa.length}</div>
                {listaCasa.length > 0 && <div className="col-4 tbl-name tbl-bold" style={{ color: '#17a2b8' }}>{'Viviendas evaluadas :  ' + listaCasa.filter(e => e.estado > 0).length}</div>}
                <div className="col-4 tbl-name tbl-bold" style={{ color: '#2dce89' }}>{'COVERTURA :  ' + covertura}</div>
              </div>
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
                    <tr key={e.id} >

                      <td className=" tbl-header3">{e.cv}</td>
                      <td  className=" tbl-header3">
                        <>
                          {e.estado ? <FontAwesomeIcon style={{ color: 'rgb(125, 160, 90)' }} icon={faCheckCircle} /> :
                            <FontAwesomeIcon style={{ color: '#f5365c' }} icon={null} />}
                          <span style={{ paddingLeft: '10px' }}> {e.jefefamilia}</span>
                        </></td>

                      <td className="tbl-header3">{listaGestion.find(e => e.value === inputBuscar.campo)?.label}</td>
                      <td className="tbl-header3">{listaMes.find(e => e.value === inputBuscar2.campo)?.label}</td>

                      <td className="tbl-header3" >{!e.estado ? 'NO REGISTRADO' : 'REGISTRADO'}</td>

                      {e.estado ? <td className="text-center">
                        <div className={"tbl-delete text-center"} onClick={() => {
                          deleted(e.evaluacion)

                        }} >{'Quitar evaluacion'}</div>
                      </td> : <td ></td>}
                      <td className="text-center">
                        <div className={e.estado ? "tbl-delete text-center" : "tbl-edit text-center"} onClick={() => {

                          setModalEditar(true);

                          setCasa({ campo: e.idcasa, valido: 'true' })
                          setCvCasa({ campo: 'num CV: ' + e.cv + ', ' + e.jefefamilia, valido: 'true' })
                          setInicio({ campo: e.inicio, valido: 'true' })
                          setFinal({ campo: e.final, valido: 'true' })

                          setEcin({ campo: e.ecin || 0, valido: 'true' })
                          setEcia({ campo: e.ecia || 0, valido: 'true' })
                          setEcpn({ campo: e.ecpn || 0, valido: 'true' })
                          setEcpa({ campo: e.ecpa || 0, valido: 'true' })

                          setLcipd({ campo: e.lcipd || 0, valido: 'true' })
                          setLcicm({ campo: e.lcicm || 0, valido: 'true' })
                          setLcith({ campo: e.lcith || 0, valido: 'true' })
                          setLciot({ campo: e.lciot || 0, valido: 'true' })
                          setLcppd({ campo: e.lcppd || 0, valido: 'true' })
                          setLcpga({ campo: e.lcpga || 0, valido: 'true' })
                          setLcpcl({ campo: e.lcpcl || 0, valido: 'true' })
                          setLcpcj({ campo: e.lcpcj || 0, valido: 'true' })
                          setLcpz({ campo: e.lcpz || 0, valido: 'true' })
                          setLcpot({ campo: e.lcpot || 0, valido: 'true' })

                          setPrerociado({ campo: e.prerociado ? e.prerociado : 1, valido: 'true' })

                          setNegativa(e.negativa)
                          setCerrada(e.cerrada)
                          setRenuente(e.renuente)
                          for (let a of listaGestion) {
                            for (let m of listaMes) {
                              if (a.value == m.gestion) {
                                setMesAño({ campo: m.label, valido: 'true' })
                              }
                            }
                          }

                        }} >{e.estado ? 'Modificar Datos' : 'llenar datos'}</div>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </Table>

            </CardBody>
          </Card>
        </Row>
      </div >

      <Modal isOpen={modalEditar} toggle={toggleEdit} className="modal-lg">
        <Card>
          <ModalHeader toggle={toggleEdit}>
            ACTUALIZAR PLANILLA DIARIA DE EVALUACION ENTOMOLOGICA EE-1
          </ModalHeader>
          <ModalBody >
            <Form>
              <Row className="mb-4">
                <Col md='2'>
                  {listaOtros.length > 0 &&
                    <ComponenteInputUserDisabled
                      estado={{ campo: listaOtros[0].comunidad, valido: 'true' }}
                      etiqueta={"Comunidad"}
                      ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    />
                  }
                </Col>
                <Col md='2'>
                  <ComponenteInputUserDisabled
                    estado={{ campo: cvCasa.campo, valido: 'true' }}
                    ExpresionRegular={INPUT.TEXT}
                    name={"cv"}
                    etiqueta={"Numero CV"}
                    msg="Seleccione una opcion"
                  />
                </Col>

                <Col md='2'>
                  <ComponenteInputUserDisabled
                    estado={mesAño}
                    name="mesaño"
                    etiqueta={"Periodo"}
                    ExpresionRegular={INPUT.TEXT} //expresion regular
                  />
                </Col>

                <Col md='2'>
                  <InputUsuarioStandar
                    estado={inicio}
                    cambiarEstado={setInicio}
                    tipo={'time'}
                    name="hora_inicio"
                    etiqueta={"hora inicio"}
                    ExpresionRegular={INPUT.HORA} //expresion regular
                  />
                </Col>
                <Col md='2'>
                  <InputUsuarioStandar
                    estado={final}
                    cambiarEstado={setFinal}
                    tipo={'time'}
                    name="hora_final"
                    etiqueta={"hora finalizacion"}
                    ExpresionRegular={INPUT.HORA} //expresion regular
                  />
                </Col>

                <Col md='2'>
                  <Select1
                    estado={prerociado}
                    cambiarEstado={setPrerociado}
                    lista={[{ id: 1, label: 'Prerociado' }, { id: 2, label: 'Postrociado' },]}
                    etiqueta={'Tipo actividad'}
                    name='prerociado'
                    select={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col md='4'>
                  <ComponenteCheck_
                    name={'select'}
                    label={'Vivienda negativa ?'}
                    estado={negativa}
                    cambiarEstado={setNegativa}
                    f2={setCerrada}
                    f3={setRenuente}
                  />
                </Col>
                <Col md='4'>
                  <ComponenteCheck_
                    name={'select'}
                    label={'Vivienda cerrada ?'}
                    estado={cerrada}
                    cambiarEstado={setCerrada}

                    f2={setNegativa}
                    f3={setRenuente}
                  />
                </Col>

                <Col md='4'>
                  <ComponenteCheck_
                    name={'select'}
                    label={'Vivienda renuente?'}
                    estado={renuente}
                    cambiarEstado={setRenuente}

                    f2={setNegativa}
                    f3={setCerrada}
                  />
                </Col>

              </Row>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>

                    <th colspan="4" rowSpan={1} className="tbl-header1">NUMERO EJEMPLARES CAPTURADOS</th>
                    <th colspan="10" rowSpan={1} className="tbl-header1">LUGAR DE CAPTURA</th>

                  </tr>
                  <tr>
                    <td colSpan={2} rowSpan={1} className="tbl-header2">INTRA</td>
                    <td colSpan={2} rowSpan={1} className="tbl-header2">PERI</td>

                    <td colSpan={4} rowSpan={1} className="tbl-header2">N° INTRA</td>
                    <td colSpan={6} rowSpan={1} className="tbl-header2">N° PERI</td>
                  </tr>
                  <tr>



                    <td className="tbl-header3">N</td>
                    <td className="tbl-header3">A</td>
                    <td className="tbl-header3">N</td>
                    <td className="tbl-header3">A</td>


                    <td className="tbl-header3">PD</td>
                    <td className="tbl-header3">CM</td>
                    <td className="tbl-header3">TH</td>
                    <td className="tbl-header3">OT</td>

                    <td className="tbl-header3">PD</td>
                    <td className="tbl-header3">GA</td>
                    <td className="tbl-header3">CL</td>
                    <td className="tbl-header3">CJ</td>
                    <td className="tbl-header3">ZT</td>
                    <td className="tbl-header3">OT</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={ecin}
                        cambiarEstado={setEcin}
                        disponible={!negativa && !cerrada && !renuente}
                        name={'ecin'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={ecia}
                        cambiarEstado={setEcia}
                        disponible={!negativa && !cerrada && !renuente}

                        name={'ecia'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={ecpn}
                        cambiarEstado={setEcpn}
                        disponible={!negativa && !cerrada && !renuente}

                        name={'ecpn'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={ecpa}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setEcpa}
                        name={'ecpa'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcipd}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcipd}
                        name={'lcipd'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcicm}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcicm}
                        name={'lcicm'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcith}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcith}
                        name={'lcith'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lciot}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLciot}
                        name={'lciot'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcppd}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcppd}
                        name={'lcppd'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcpga}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcpga}
                        name={'lcpga'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcpcl}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcpcl}
                        name={'lcpcl'}
                      />
                    </td>

                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcpcj}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcpcj}
                        name={'lcpcj'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcpz}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcpz}
                        name={'lcpz'}
                      />
                    </td>
                    <td className="tbl-header3">
                      <InputUsuarioStandarTable
                        estado={lcpot}
                        disponible={!negativa && !cerrada && !renuente}
                        cambiarEstado={setLcpot}
                        name={'lcpot'}
                      />
                    </td>
                  </tr>
                </tbody>


              </Table>
              <Table className="tablesorter" responsive>
                <Row>
                  <Col md='12'> <ComponenteSubTitle etiqueta='LUGAR DE CAPTURA ' contenido='' /> </Col>
                  <Col md='12'> <ComponenteSubTitle etiqueta='INTRA DOMICILIO ' contenido={'(PD)=PARED (TH)=TECHO (OT)=OTROS (CM)=CAMA'} /> </Col>
                  <Col md='12'> <ComponenteSubTitle etiqueta='PERI DOMICILIO ' contenido={"(PD)=PARED (CL)=CORRAL (GA)=GALLINERO (CJ)=CONEJERA (Z ö T)=ZARZO O TRO (OT)=OTROS"} /> </Col>
                  <Col md='12'> <ComponenteSubTitle etiqueta='VIVIENDA MEJORADA ' contenido={'ANOTAR SI/NO EN LAS CASILLAS DE INTRA Y PERI DOMICILIO'} /> </Col>
                </Row>
              </Table>
              <Row>
                <Col md='6'>

                  <ComponenteInputUserDisabled
                    estado={{ campo: localStorage.getItem('nombre') }}
                    etiqueta={"Nombre apellido Tecnico evaluador (1)"}
                    ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                  />
                </Col>
              </Row>

            </Form>
          </ModalBody>
          <div className="boton-modal">
            <Button color="info" onClick={() => insertar()}>
              Guardar
            </Button>
          </div>
        </Card>
      </Modal>

    </>

  );
}


export default EvaluacionMunicipal; 
