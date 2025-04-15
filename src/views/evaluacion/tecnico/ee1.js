
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
  Select1,
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
import { Select1XL } from "components/input/elementos";
import { ContenedorCheck } from "components/input/stylos";
import { ComponenteCheck_ } from "components/input/elementos";
import { Select1Easy } from "components/input/elementos";
const ExcelJS = require('exceljs')

function Ee1() {


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });
  const [inputBuscar2, setInputBuscar2] = useState({ campo: null, valido: null });
  const [lista, setLista] = useState([]);
  const [listaMunicipio, setListaMunicipio] = useState([]);
  const [listaComunidad, setListaComunidad] = useState([]);
  const [listaCasa, setListaCasa] = useState([]);
  const [listaOtros, setListaOtros] = useState([]);
  const [listaUsuariosRociador, setListaUsuariosRociador] = useState([]);
  const [listaUsuariosBrigada, setListaUsuariosBrigada] = useState([]);


  const [id, setId] = useState({ campo: null, valido: null });
  const [idMunicipio, setIdMunicipio] = useState({
    campo: parseInt(localStorage.getItem('id-municipio')) ? parseInt(localStorage.getItem('id-municipio')) : null,
    valido: parseInt(localStorage.getItem('id-municipio')) ? 'true' : null
  });


  const [casa, setCasa] = useState({ campo: null, valido: null });
  const [jefefamilia, setJefeFamilia] = useState({ campo: null, valido: null });
  const [inicio, setInicio] = useState({ campo: new Date().toLocaleTimeString(), valido: 'true' });
  const [final, setFinal] = useState({ campo: new Date(new Date().setMinutes(new Date().getMinutes() + 30)).toLocaleTimeString(), valido: 'true' });
  const [totalTiempo, setTotalTiempo] = useState({ campo: null, valido: null });
  const [numeroHabitantes, setNumeroHabitantes] = useState({ campo: null, valido: null });
  const [numeroHabitaciones, setNumeroHabitaciones] = useState({ campo: null, valido: null });
  const [ultimorociado, setUltimoRociado] = useState({ campo: null, valido: null });
  const [intra, setIntra] = useState({ campo: null, valido: null });
  const [Peri, setPeri] = useState({ campo: null, valido: null });
  const [ecnt, setEcnt] = useState({ campo: null, valido: null });
  const [ecat, setEcat] = useState({ campo: null, valido: null });
  const [altitud, setAltitud] = useState({ campo: null, valido: null });
  const [latitud, setLatitud] = useState({ campo: null, valido: null });
  const [longitud, setLongitud] = useState({ campo: null, valido: null });
  const [comunidad, setComunidad] = useState({
    campo: parseInt(localStorage.getItem('id-comunidad')) ? parseInt(localStorage.getItem('id-comunidad')) : null,
    valido: parseInt(localStorage.getItem('id-comunidad')) ? 'true' : null
  });


  // EJEMPLARES CAPTURADOS
  const [fecha, setFecha] = useState({ campo: new Date().toISOString().split('T')[0], valido: 'true' });
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
  const [usuario, setUsuario] = useState({ campo: null, valido: null });

  const [tiempoTotal, setTiempoTotal] = useState(null);

  const [prerociado, setPrerociado] = useState(true);
  const [negativa, setNegativa] = useState(false);
  const [cerrada, setCerrada] = useState(false);
  const [renuente, setRenuente] = useState(false);
  const [view, setView] = useState(parseInt(localStorage.getItem('id-comunidad')) > 0 ? true : false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(0);
  const [modalValidacion, setModalValidacion] = useState(false);
  const [consolidado, setConsolidado] = useState(true);



  const [usuario1, setUsuario1] = useState({ campo: null, valido: null });
  const [usuario2, setUsuario2] = useState({ campo: null, valido: null });
  const [usuario3, setUsuario3] = useState({ campo: null, valido: null });
  const [usuario4, setUsuario4] = useState({ campo: null, valido: null });
  const [observaciones, setObservaciones] = useState({ campo: 0, valido: 'true' });


  useEffect(() => {
    document.title = "EE-1";
    listarMunicipio()
    if (parseInt(localStorage.getItem('id-comunidad'))) listarCasas(parseInt(localStorage.getItem('id-comunidad')))
    return () => { }
  }, [])


  const listar = async () => {
    // console.log(comunidad, ' comunidad para listar datos')
    const data = await start(URL + '/ee-1/listar', { comunidad: comunidad.campo })
    setLista(data)

    console.log(data)
    let totalHoras2 = 0;
    let totalMinutos2 = 0;
    let totalSegundos2 = 0;

    // Recorremos el array de objetos
    for (const tiempo of data) {
      const [horas, minutos, segundos] = tiempo.total.split(':');
      totalHoras2 += parseInt(horas, 10);
      totalMinutos2 += parseInt(minutos, 10);
      totalSegundos2 += parseInt(segundos, 10);
    }
    totalMinutos2 += Math.floor(totalSegundos2 / 60);
    totalSegundos2 %= 60;
    totalHoras2 += Math.floor(totalMinutos2 / 60);
    totalMinutos2 %= 60;
    setTiempoTotal(totalHoras2 + ':' + totalMinutos2 + ':' + totalSegundos2)

  };

  const listarUsuarios = async () => {
    const data = await start(URL + '/ee-1/listar-usuarios')
    setListaUsuariosRociador(data)

    const dataUsuarios = await start(URL + '/rociado-1/listar-usuarios', { municipio: idMunicipio.campo })
    if (dataUsuarios[0].length < 1) {
      toast.error('No se encontró el usuario jefe de brigada'); setView(false);
      setModalValidacion(false);
      return
    }
    setListaUsuariosBrigada(dataUsuarios[0])
    setUsuario({ campo: dataUsuarios[0][0].value, valido: 'true' })
    setListaUsuariosRociador(dataUsuarios[1])
  };

  const listarMunicipio = async () => {
    const data = await start(URL + '/ee-1/listar-municipios')
    setListaMunicipio(data)
  };
  const listarComunidad = async (id) => {
    const data = await start(URL + '/ee-1/listar-comunidad', { id })
    setListaComunidad(data)
  };

  const listarCasas = async () => {
    console.log(comunidad)

    const data = await start(URL + '/ee-1/listar-casas', { comunidad: comunidad.campo })
    if (data[0].length > 0) {
      listar()
      localStorage.setItem('id-comunidad', comunidad.campo)
      localStorage.setItem('id-municipio', idMunicipio.campo)
      setListaCasa(data[0])
      setListaOtros(data[1])
      setView(true)
      return
    } else {
      toast.error('No se encontró viviendas para esta comunidad')
      setListaCasa([])
      setListaOtros([])
      setCasa({ campo: null, valido: null })
    }


  };

  const buscar = async () => {
    if (inputBuscar.valido === "true" && inputBuscar2.valido === "true") {
      const data = await buscarDB(URL + '/ee-1/buscar', { fecha1: inputBuscar.campo, fecha2: inputBuscar2.campo, comunidad: comunidad.campo })
      if (data.length > 0) {
        setLista(data)
        let totalHoras2 = 0;
        let totalMinutos2 = 0;
        let totalSegundos2 = 0;

        // Recorremos el array de objetos
        for (const tiempo of data) {
          const [horas, minutos, segundos] = tiempo.total.split(':');
          totalHoras2 += parseInt(horas, 10);
          totalMinutos2 += parseInt(minutos, 10);
          totalSegundos2 += parseInt(segundos, 10);
        }
        totalMinutos2 += Math.floor(totalSegundos2 / 60);
        totalSegundos2 %= 60;
        totalHoras2 += Math.floor(totalMinutos2 / 60);
        totalMinutos2 %= 60;
        setTiempoTotal(totalHoras2 + ':' + totalMinutos2 + ':' + totalSegundos2)
        setConsolidado(true)
        for (let e of data) {
          if (e.codigo != data[0].codigo) {
            setConsolidado(false)
          }
        }
      } else {
        toast.error('No se encontrao ninguna informacion..')
        setLista([])
      }
    }
  };

  const vaciar = () => {
    setCasa({ campo: null, valido: null })
    setEcin({ campo: 0, valido: 'true' })
    setEcia({ campo: 0, valido: 'true' })
    setEcpn({ campo: 0, valido: 'true' })
    setEcpa({ campo: 0, valido: 'true' })
    setEcnt({ campo: 0, valido: 'true' }) // total negativo
    setEcat({ campo: 0, valido: 'true' }) // total negativo
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
    if (!comunidad.campo || !idMunicipio.campo) {
      setView(false)
      toast.error('Vuelva a seleccionar el municipio y la comunidad')
    }
    if (
      fecha.valido === 'true' &&
      casa.valido === 'true' &&
      inicio.valido === 'true' &&
      final.valido === 'true' &&
      ecin.valido === 'true' &&
      ecia.valido === 'true' &&
      ecpn.valido === 'true' &&
      ecpa.valido === 'true' &&
      lcipd.valido === 'true' &&
      lcicm.valido === 'true' &&
      lcith.valido === 'true' &&
      lciot.valido === 'true' &&
      lcppd.valido === 'true' &&
      lcpga.valido === 'true' &&
      lcpcl.valido === 'true' &&
      lcpcj.valido === 'true' &&
      lcpz.valido === 'true' &&
      lcpot.valido === 'true' &&
      comunidad.valido === 'true' &&
      idMunicipio.valido === 'true' &&
      estadoEnvio === 0
    ) {
      if ((ecin.campo + ecia.campo) != (lcipd.campo + lcicm.campo + lcith.campo + lciot.campo)) {
        toast.error('Debe coincidir la sumatoia de Los ejemplares capturados en el interior del domicilio ')
        setEstadoEnvio(0)
        return
      }
      if ((ecpn.campo + ecpa.campo) != (lcppd.campo + lcpga.campo + lcpcl.campo + lcpcj.campo + lcpz.campo + lcpot.campo)) {
        toast.error('Debe coincidir la sumatoia de Los ejemplares capturados en el PERI/Exterior del domicilio ')
        setEstadoEnvio(0)
        return
      }
      setEstadoEnvio(1);
      await saveDB(URL + '/ee-1/guardar', {
        fecha: fecha.campo,
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
        comunidad: comunidad.campo,
        municipio: idMunicipio.campo,
        negativa: negativa,
        cerrada: cerrada,
        renuente: renuente,
        usuario1: usuario1.campo ? usuario.campo : 0,
      }, setModalInsertar, setEstadoEnvio, false, vaciar)
      listar()
    } else
      toast.error("Formulario incompleto!")

    return;
  };

  const editar = async () => {
    // alert(id.campo)
    if (!comunidad.campo || !idMunicipio.campo) {
      setView(false)
      toast.error('Vuelva a seleccionar el municipio y la comunidad')
    }
    if (
      id.valido === 'true' &&
      fecha.valido === 'true' &&
      casa.valido === 'true' &&
      inicio.valido === 'true' &&
      final.valido === 'true' &&
      ecin.valido === 'true' &&
      ecia.valido === 'true' &&
      ecpn.valido === 'true' &&
      ecpa.valido === 'true' &&
      lcipd.valido === 'true' &&
      lcicm.valido === 'true' &&
      lcith.valido === 'true' &&
      lciot.valido === 'true' &&
      lcppd.valido === 'true' &&
      lcpga.valido === 'true' &&
      lcpcl.valido === 'true' &&
      lcpcj.valido === 'true' &&
      lcpz.valido === 'true' &&
      comunidad.valido === 'true' &&
      lcpot.valido === 'true'
    ) {
      if ((ecin.campo + ecia.campo) != (lcipd.campo + lcicm.campo + lcith.campo + lciot.campo)) {
        toast.error('Debe coincidir la sumatoia de Los ejemplares capturados en el interior del domicilio ')
        return
      }
      if ((ecpn.campo + ecpa.campo) != (lcppd.campo + lcpga.campo + lcpcl.campo + lcpcj.campo + lcpz.campo + lcpot.campo)) {
        toast.error('Debe coincidir la sumatoia de Los ejemplares capturados en el PERI/Exterior del domicilio ')
        return
      }
      await editDB(URL + '/ee-1/actualizar', {
        id: id.campo,
        fecha: fecha.campo,
        casa: casa.campo,
        comunidad: comunidad.campo,
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
        comunidad: comunidad.campo,
        negativa: negativa,
        cerrada: cerrada,
        renuente: renuente,
        usuario1: usuario1.campo ? usuario.campo : 0,
      }, setModalEditar, false, vaciar)
      listar()
    } else toast.error("Formulario incompleto!");
  };

  const eliminar = async (id,) => {
    let ok = window.confirm('Eliminar a este registro ?')
    if (ok) {
      await eliminarDB(URL + '/ee-1/eliminar', { id, comunidad: comunidad.campo })
      listar()
    }
  };

  const validar = async () => {
    let ok = window.confirm('UNA VEZ QUE CONFIRME ESTE PASO, YA NO PODRA HACER CORRECCIONES, SERCIORECE BIEN DE LOS REGISTROS GUARDADOS ANTES DE ENVIAR ?')

    if (ok && usuario.valido === 'true') {
      await editDB(URL + '/ee-1/validar', {
        comunidad: comunidad.campo,
        prerociado: prerociado,
        jefeBrigada: usuario.campo,
        usuario1: usuario1.campo,
        usuario2: usuario2.campo,
        usuario3: usuario3.campo,
        usuario4: usuario4.campo,
        observaciones: observaciones.campo

      }, setModalValidacion, false, vaciar)
      listar()
    }
  };

  const toggle = () => {
    setModalInsertar(!modalInsertar)
    vaciar()
  }

  const toggleEdit = () => {
    setModalEditar(false)
    vaciar()
  }

  const toggleValidar = () => {
    setModalValidacion(false)
  }

  const listaExcel = async () => {

    if (lista.length == 0) { toast.error('no hay datos para exportar'); return }
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'system sucre cel 71166513';
    workbook.lastModifiedBy = 'SYSTEM SUCRE';

    const principal = workbook.addWorksheet('EE-1 ' + listaOtros[0].comunidad, {
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

      principal.mergeCells('K6:Q6');
      principal.getCell('K6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("K6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('K6').value = 'E. SALUD: ' + e.hospital

      principal.mergeCells('R6:AA6');
      principal.getCell('R6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("R6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('R6').value = 'MUNICIPIO: ' + e.municipio

      principal.mergeCells('AB6:AH6');
      principal.getCell('AB6').alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell("AB6").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell('AB6').value = 'COMUNIDAD: ' + e.comunidad
    })

    principal.mergeCells('A7:G7');
    principal.getCell('A7').alignment = { vertical: 'center', horizontal: 'left' };
    principal.getCell("A7").font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
    principal.getCell('A7').value = 'FECHA DE EJECUCION: ' + lista[lista.length - 1].fecha



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
    principal.getColumn('I').width = 4
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
    principal.getColumn('AC').width = 3
    principal.getColumn('AD').width = 3
    principal.getColumn('AH').width = 20






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

    principal.getCell('AH10').value = 'TECNICO'





    let i = 11
    for (let d of lista) {

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
      principal.getCell(`W` + i).value = d.cerrada ? 'A' : d.renuente ? 'E' : d.lcpga
      principal.getCell(`X` + i).value = d.lcpga
      principal.getCell(`Y` + i).value = d.lcpcl
      principal.getCell(`Z` + i).value = d.lcpcj
      principal.getCell(`AA` + i).value = d.lcpz
      principal.getCell(`AB` + i).value = d.lcpot
      principal.getCell(`AC` + i).value = d.altitud
      principal.getCell(`AE` + i).value = d.longitud
      principal.getCell(`AG` + i).value = d.latitud
      principal.getCell(`AH` + i).value = d.author
      principal.getCell(`AC` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AE` + i).alignment = { horizontal: 'center', wrapText: true }
      principal.getCell(`AG` + i).alignment = { horizontal: 'center', wrapText: true }

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
      principal.getCell(`A` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };

      i++
    }

    if (consolidado) {

      principal.mergeCells(`B` + i + `:C` + i);
      principal.mergeCells(`I` + i + `:J` + i);
      principal.mergeCells(`AC` + i + `:AD` + i);
      principal.mergeCells(`AE` + i + `:AF` + i);
      principal.mergeCells(`AG` + i + `:AH` + i);

      principal.getCell(`A` + i).value = '-'
      principal.getCell(`B` + i).value = lista.length + ' viviendas'
      principal.getCell(`B` + i).font = { bold: 600, size: 8, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`D` + i).value = '-'
      principal.getCell(`E` + i).value = '-'
      principal.getCell(`F` + i).value = tiempoTotal + 'HRS.'
      principal.getCell(`F` + i).font = { size: 7, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`F` + i).alignment = { vertical: 'justify' };
      principal.getCell(`G` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.habitantes, 0)
      principal.getCell(`H` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.num_hab, 0)
      principal.getCell(`I` + i).value = '-'

      let intras = lista.reduce((acumulador, actual) => { return actual.vm_intra !== -1 ? acumulador + parseInt(actual.vm_intra) : acumulador }, 0)
      let intran = lista.reduce((acumulador, actual) => { return actual.vm_intra == 0 ? acumulador + 1 : acumulador }, 0)
      let peris = lista.reduce((acumulador, actual) => { return actual.vm_peri !== -1 ? acumulador + actual.vm_peri : acumulador }, 0)
      let perin = lista.reduce((acumulador, actual) => { return actual.vm_peri == 0 ? acumulador + 1 : acumulador }, 0)

      principal.getCell(`K` + i).value = ' SI=' + intras + ' NO=' + intran
      principal.getCell(`L` + i).value = 'SI=' + peris + ' NO=' + perin
      principal.getCell(`K` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`L` + i).font = { bold: 600, size: 6, italic: false, color: { argb: "2c3e50" }, };
      principal.getCell(`M` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ecin, 0)
      principal.getCell(`N` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ecia, 0)

      principal.getCell(`O` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ecpn, 0)
      principal.getCell(`P` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ecpa, 0)
      principal.getCell(`Q` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ecin, 0) + lista.reduce((acumulador, actual) => acumulador + actual.ecpn, 0)
      principal.getCell(`R` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.ecia, 0) + lista.reduce((acumulador, actual) => acumulador + actual.ecpa, 0)
      principal.getCell(`S` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcipd, 0)
      principal.getCell(`T` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcicm, 0)

      principal.getCell(`U` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcith, 0)
      principal.getCell(`V` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lciot, 0)
      principal.getCell(`W` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcppd, 0)
      principal.getCell(`X` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcpga, 0)
      principal.getCell(`Y` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcpcl, 0)
      principal.getCell(`Z` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcpcj, 0)
      principal.getCell(`AA` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcpz, 0)
      principal.getCell(`AB` + i).value = lista.reduce((acumulador, actual) => acumulador + actual.lcpot, 0)
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

    } else {
      principal.mergeCells(`A` + i + `:AH` + i);
      principal.getCell(`A` + i).value = 'ESTA TABLA DE INFORMACION MUESTRA REGISTROS DE EVALUACION ENTOMOLOGICA DE MAS UNA ACTIVIDAD, SELECCIONE LAS FECHAS DE INICIO Y FINAL DONDE SE REALIZO UNA ACTIVIDAD ESPECIFICA'
      principal.getCell(`A` + i).font = { size: 7, italic: false, color: { argb: "2c3e50" }, };

    }

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
    if (consolidado) {
      principal.mergeCells(`U` + (i + 6) + `:AH` + (i + 6));
      principal.getCell(`U` + (i + 6)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`U` + (i + 6)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`U` + (i + 6)).value = 'Fecha de remision:    ' + lista[0].fecha_remision


      principal.mergeCells(`A` + (i + 8) + `:N` + (i + 8));
      principal.getCell(`A` + (i + 8)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`A` + (i + 8)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`A` + (i + 8)).value = 'Nombre y apellido Técnico evaluador (1):    ' + localStorage.getItem('nombre')

      principal.mergeCells(`U` + (i + 8) + `:AH` + (i + 8));
      principal.getCell(`U` + (i + 8)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`U` + (i + 8)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`U` + (i + 8)).value = 'Firma:                                .................................'

      principal.mergeCells(`A` + (i + 9) + `:H` + (i + 9));
      principal.getCell(`A` + (i + 9)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`A` + (i + 9)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`A` + (i + 9)).value = lista[0].usuario1 ? 'Tecnico Evaluador(2): ' + lista[0].usuario1 : ' Tecnico Evaluador(1): -'

      principal.mergeCells(`I` + (i + 9) + `:P` + (i + 9));
      principal.getCell(`I` + (i + 9)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`I` + (i + 9)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`I` + (i + 9)).value = lista[0].usuario2 ? 'Tecnico Evaluador(3): ' + lista[0].usuario2 : 'Tecnico Evaluador(2): -'

      principal.mergeCells(`A` + (i + 10) + `:H` + (i + 10));
      principal.getCell(`A` + (i + 10)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`A` + (i + 10)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`A` + (i + 10)).value = lista[0].usuario3 ? 'Tecnico Evaluador(4): ' + lista[0].usuario3 : ' Tecnico Evaluador(3): -'

      principal.mergeCells(`I` + (i + 10) + `:P` + (i + 10));
      principal.getCell(`I` + (i + 10)).alignment = { vertical: 'center', horizontal: 'left' };
      principal.getCell(`I` + (i + 10)).font = { bold: 600, size: 9, color: { argb: "595959" }, italic: false, };
      principal.getCell(`I` + (i + 10)).value = lista[0].usuario4 ? 'Tecnico Evaluador(5): ' + lista[0].usuario4 : ' Tecnico Evaluador(4): -'

    }





    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: "aplication/vnd.openxmlformats-officedocumets.spreadshhed.sheed",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'EE-1-' + listaOtros[0].comunidad + ' ' + lista[lista.length - 1].fecha + '.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    })

  };

  return (
    <>
      <div className="content" >
        {!view ?
          <div className="view ">


            <Row className="contenedor-parametros ">
              <Col md='12' >
                <p className="parametros-inicio">Evaluacion entomológica </p>
                <p className="parametros-inicio-subtitle">{'MUNICIPIO: ' + localStorage.getItem('mun')}</p>
              </Col>


              <Col md='6 mb-5' >

                <Select1XL
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
              <Col md='6 mb-5' >

                <Select1XL
                  estado={comunidad}
                  cambiarEstado={setComunidad}
                  ExpresionRegular={INPUT.ID}
                  lista={listaComunidad}
                  name={"Comunidad"}
                  etiqueta={"Comunidad"}
                  msg="Seleccione una opcion"
                />
              </Col>

              <Col md='12 mt-3'>
                <div className="boton-modal">
                  <Button color="info" onClick={() => {
                    if (comunidad.valido === 'true') {
                      listarCasas()

                    } else toast.error('Seleccione una comunidad')
                  }} >
                    Llenar datos
                  </Button>
                </div>
              </Col>
            </Row>

          </div> :
          <Row className="main-container">
            <Card>
              <CardHeader>
                <BackgroundColorContext.Consumer>
                  {({ color }) => (
                    <div className="tbl-header" data={color}>

                      <div className="row">
                        <div className="col-8">
                          Evaluacion entomológica
                        </div>
                        <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>
                          <button className='btn-new' pb={3} onClick={() => { setModalInsertar(true); }} >
                            {'Nuevo'}
                          </button >
                        </div>
                      </div>
                    </div>
                  )}
                </BackgroundColorContext.Consumer>
              </CardHeader>

              <CardBody>
                <Table className="tablesorter" responsive>
                  {listaOtros.map((e, i) => (
                    <Row key={i}>
                      <Col md='2'> <ComponenteSubTitle etiqueta='SEDES ' contenido='CHUQUISACA' /> </Col>
                      <Col md='2'> <ComponenteSubTitle etiqueta='RED DE SALUD ' contenido={e.red} /> </Col>
                      <Col md='3'> <ComponenteSubTitle etiqueta=' E. SALUD ' contenido={e.hospital} /> </Col>
                      <Col md='3'> <ComponenteSubTitle etiqueta=' MUNICIPIO ' contenido={e.municipio} tam={18} /> </Col>
                      <Col md='2'> <ComponenteSubTitle etiqueta=' COMUNIDAD ' contenido={e.comunidad} tam={18} /> </Col>
                      {/* <Col md='3'> <ComponenteSubTitle etiqueta=' FECHA DE EJECUCION ' contenido={new Date().toLocaleDateString()} /> </Col> */}
                    </Row>
                  ))}

                </Table>
                <Row>
                  <Col md='8'>
                    <Row>
                      <Col md='4'>
                        <InputUsuarioStandar
                          estado={inputBuscar}
                          cambiarEstado={setInputBuscar}
                          name="inputBuscar"
                          tipo={'date'}
                          ExpresionRegular={INPUT.FECHA} //expresion regular
                          // eventoBoton={buscar}
                          etiqueta={"Fecha 1"}
                        /></Col>
                      <Col md='4'>
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
                      <Col md='2' style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '25px' }} onClick={() => buscar()} >
                          Filtrar
                        </button>
                      </Col>
                      <Col md='2' style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className="btn-reportes" style={{ marginTop: window.innerWidth < 768 ? '5px' : '25px', background: ' #7da05a', color: 'white' }} onClick={() => listaExcel()} >
                          {window.innerWidth < 768 ? 'Exportar a Excel' : "EXCEL"}
                        </button>
                      </Col>

                    </Row>

                  </Col>

                  <Col md='4 mb-2' style={{ display: 'flex', justifyContent: 'end', marginTop: '2px' }}>
                    {lista.length > 0 ?
                      lista[0].estado == 0 ?
                        <button className="btn-reportes btn-success" onClick={() => {
                          setModalValidacion(true);
                          listarUsuarios()
                          setPrerociado(lista.length > 0 ? lista[0].prerociado ? lista[0].prerociado : true : true)
                          setUsuario1({ campo: lista[0].idUsuario1, valido: lista[0].idUsuario1 ? 'true' : null })
                          setUsuario2({ campo: lista[0].idUsuario2, valido: lista[0].idUsuario2 ? 'true' : null })
                          setUsuario3({ campo: lista[0].idUsuario3, valido: lista[0].idUsuario3 ? 'true' : null })
                          setUsuario4({ campo: lista[0].idUsuario4, valido: lista[0].idUsuario4 ? 'true' : null })
                          setObservaciones({ campo: lista[0].observaciones, valido: lista[0].observaciones ? 'true' : null })

                        }} >
                          validar
                        </button>
                        :
                        <button className="btn-reportes " disabled>
                          validar
                        </button>
                      :
                      <button className="btn-reportes" disabled >
                        validar
                      </button>}
                    <button className="btn-reportes btn-danger" onClick={() => { localStorage.removeItem('id-comunidad'); setComunidad({ campo: null, valido: 'true' }); setView(false) }} >
                      Cerrar
                    </button>
                  </Col>
                </Row>

                <Table className="tablesorter" responsive>
                  <thead className="text-primary" style={{ border: '3px solid #17a2b8' }}>
                    <tr>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">CV</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">NOMBRE Y APELLIDO DE JEFE DE FAMILIA</th>
                      <th colSpan="3" rowSpan={2} className="tbl-header1">HORA</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">NUM. HABITANTES</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1"> NUM. HABITACIONES</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">FECHA ULTIMO ROCIADO</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">EDITAR</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">ELIMINAR</th>
                      <th colSpan="2" rowSpan={2} className="tbl-header1">VIVIENDA MEJORADA</th>
                      <th colSpan="6" rowSpan={1} className="tbl-header1">NUMERO EJEMPLARES CAPTURADOS</th>
                      <th colSpan="10" rowSpan={1} className="tbl-header1">LUGAR DE CAPTURA</th>
                      <th colSpan="3" rowSpan={2} className="tbl-header1">PUNTO GEOGRAFICO DE LA VIVIENDA</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">FECHA  DE REGISTRO</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">PREROCIADO</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">NEGATIVA</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">CERRADA</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">RENUENTE</th>
                      <th colSpan="1" rowSpan={3} className="tbl-header1">ESTADO</th>


                    </tr>
                    <tr>
                      <td colSpan={2} rowSpan={1} className="tbl-header2">INTRA</td>
                      <td colSpan={2} rowSpan={1} className="tbl-header2">PERI</td>
                      <td colSpan={2} rowSpan={1} className="tbl-header2">TOTAL</td>

                      <td colSpan={4} rowSpan={1} className="tbl-header2">N° INTRA</td>
                      <td colSpan={6} rowSpan={1} className="tbl-header2">N° PERI</td>
                    </tr>
                    <tr>
                      <td className="tbl-header3">INICIO</td>
                      <td className="tbl-header3">FINAL</td>
                      <td className="tbl-header3">TOTAL</td>
                      <td className="tbl-header3">INTRA</td>
                      <td className="tbl-header3">PERI</td>

                      <td className="tbl-header3">N</td>
                      <td className="tbl-header3">A</td>
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

                      <td className="tbl-header3">LATITUD</td>
                      <td className="tbl-header3">LONGITUD</td>
                      <td className="tbl-header3">ALTITUD</td>


                    </tr>
                  </thead>
                  <tbody>
                    {lista.map(e => (
                      <tr key={e.id} style={{ background: e.estado ? 'white' : ' #fadbd8 ', color: !e.negativa && !e.cerrada && !e.renuente ? '1px solid red' : 'none' }} >
                        <td className=" tbl-header3">{e.cv}</td>
                        <td className="tbl-header3">{e.jefefamilia}</td>
                        <td className="tbl-header3">{e.inicio}</td>
                        <td className="tbl-header3">{e.final}</td>
                        <td className="tbl-header3">{e.total}</td>
                        <td className="tbl-header3">{e.habitantes}</td>
                        <td className="tbl-header3">{e.num_hab}</td>
                        <td className="tbl-header3">{e.fecha_rociado}</td>
                        {!e.estado ?
                          <td className="text-center">
                            {parseInt(localStorage.getItem('id_')) &&
                              <div className="tbl-edit" onClick={() => {
                                setModalEditar(true);
                                setId({ campo: e.id, valido: 'true' })

                                setFecha({ campo: e.fecha.replace(/\//g, '-'), valido: 'true' })
                                setCasa({ campo: e.idcasa, valido: 'true' })
                                setJefeFamilia({ campo: e.jefefamilia, valido: 'true' })
                                setInicio({ campo: e.inicio, valido: 'true' })
                                setFinal({ campo: e.final, valido: 'true' })
                                // setComunidad({ campo: e.idcomunidad, valido: 'true' })
                                setTotalTiempo({ campo: e.tiempototal, valido: 'true' })
                                setNumeroHabitantes({ campo: e.habitantes, valido: 'true' })
                                setNumeroHabitaciones({ campo: e.num_hab, valido: 'true' })
                                setUltimoRociado({ campo: e.ultimorociado, valido: 'true' })
                                setIntra({ campo: e.intra, valido: 'true' })
                                setPeri({ campo: e.peri, valido: 'true' })
                                setEcin({ campo: e.ecin || 0, valido: 'true' })
                                setEcia({ campo: e.ecia || 0, valido: 'true' })
                                setEcpn({ campo: e.ecpn || 0, valido: 'true' })
                                setEcpa({ campo: e.ecpa || 0, valido: 'true' })
                                setEcnt({ campo: e.ecnt || 0, valido: 'true' }) // total negativo
                                setEcat({ campo: e.ecat || 0, valido: 'true' }) // total negativo
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
                                setAltitud({ campo: e.altitud, valido: 'true' })
                                setLatitud({ campo: e.latitud, valido: 'true' })
                                setLongitud({ campo: e.longitud, valido: 'true' })
                                setUsuario({ campo: e.usuario, valido: 'true' })
                                setUsuario1({ campo: e.usuario1, valido: 'true' })
                                setPrerociado(e.prerociado)
                                setNegativa(e.negativa)
                                setCerrada(e.cerrada)
                                setRenuente(e.renuente)

                              }} >Editar</div>}
                          </td> : <td></td>}
                        {!e.estado ? <td className="text-center tbl-bold">{parseInt(localStorage.getItem('id_')) && <div className="tbl-delete" onClick={() => eliminar(e.id)}>Eliminar</div>}</td> : <td></td>}
                        <td className="tbl-header3">{e.vm_intra == -1 ? '' : e.vm_intra ? 'SI' : 'NO'}</td>
                        <td className="tbl-header3">{e.vm_peri == -1 ? '' : e.vm_peri ? 'SI' : 'NO'}</td>
                        <td className="tbl-header3">{e.ecin}</td>
                        <td className="tbl-header3">{e.ecia}</td>
                        <td className="tbl-header3">{e.ecpn}</td>
                        <td className="tbl-header3">{e.ecpa}</td>
                        <td className="tbl-header3">{e.cerrada ? 'C' : e.renuente ? 'R' : e.ecin + e.ecpn}</td>
                        <td className="tbl-header3">{e.cerrada ? 'E' : e.renuente ? 'E' : e.ecia + e.ecpa}</td>


                        <td className="tbl-header3">{e.cerrada ? 'R' : e.renuente ? 'N' : e.lcipd}</td>
                        <td className="tbl-header3">{e.cerrada ? 'R' : e.renuente ? 'U' : e.lcicm}</td>
                        <td className="tbl-header3">{e.cerrada ? 'A' : e.renuente ? 'E' : e.lcith}</td>
                        <td className="tbl-header3">{e.cerrada ? 'D' : e.renuente ? 'N' : e.lciot}</td>
                        <td className="tbl-header3">{e.cerrada ? 'A' : e.renuente ? 'T' : e.lcppd}</td>
                        <td className="tbl-header3">{e.cerrada ? '' : e.renuente ? 'E' : e.lcpga}</td>
                        <td className="tbl-header3">{e.cerrada ? '' : e.renuente ? '' : e.lcpcl}</td>
                        <td className="tbl-header3">{e.cerrada ? '' : e.renuente ? '' : e.lcpcj}</td>
                        <td className="tbl-header3">{e.cerrada ? '' : e.renuente ? '' : e.lcpz}</td>
                        <td className="tbl-header3">{e.cerrada ? '' : e.renuente ? '' : e.lcpot}</td>

                        <td className="tbl-header3">{e.latitud}</td>
                        <td className="tbl-header3">{e.longitud}</td>
                        <td className="tbl-header3">{e.altitud}</td>

                        <td className="tbl-header3">{e.fecha.split('T')[0]}</td>
                        <td className="tbl-header3">{e.estado ? e.prerociado ? 'SI' : 'NO' : '-'}</td>
                        <td className="tbl-header3">{e.negativa ? 'SI' : 'NO'}</td>
                        <td className="tbl-header3">{e.cerrada ? 'SI' : 'NO'}</td>
                        <td className="tbl-header3">{e.renuente ? 'SI' : 'NO'}</td>
                        <td className="tbl-header3">{e.estado == 0 ? 'REGISTRADO' : e.estado == 1 ? 'MUNICIPAL' : 'DEPARTAMENTAL'}</td>
                        {/* {!e.estado ?
                          <td className="text-center">
                            <div className="tbl-edit" onClick={() => {
                              setModalEditar(true);
                              setId({ campo: e.id, valido: 'true' })
                              setCasa({ campo: e.idcasa, valido: 'true' })
                              setJefeFamilia({ campo: e.jefefamilia, valido: 'true' })
                              setInicio({ campo: e.inicio, valido: 'true' })
                              setFinal({ campo: e.final, valido: 'true' })
                              // setComunidad({ campo: e.idcomunidad, valido: 'true' })
                              setTotalTiempo({ campo: e.tiempototal, valido: 'true' })
                              setNumeroHabitantes({ campo: e.habitantes, valido: 'true' })
                              setNumeroHabitaciones({ campo: e.num_hab, valido: 'true' })
                              setUltimoRociado({ campo: e.ultimorociado, valido: 'true' })
                              setIntra({ campo: e.intra, valido: 'true' })
                              setPeri({ campo: e.peri, valido: 'true' })
                              setEcin({ campo: e.ecin || 0, valido: 'true' })
                              setEcia({ campo: e.ecia || 0, valido: 'true' })
                              setEcpn({ campo: e.ecpn || 0, valido: 'true' })
                              setEcpa({ campo: e.ecpa || 0, valido: 'true' })
                              setEcnt({ campo: e.ecnt || 0, valido: 'true' }) // total negativo
                              setEcat({ campo: e.ecat || 0, valido: 'true' }) // total negativo
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
                              setAltitud({ campo: e.altitud, valido: 'true' })
                              setLatitud({ campo: e.latitud, valido: 'true' })
                              setLongitud({ campo: e.longitud, valido: 'true' })
                              setUsuario({ campo: e.usuario, valido: 'true' })
                              setUsuario1({ campo: e.usuario1, valido: 'true' })
                              setPrerociado(e.prerociado)
                              setNegativa(e.negativa)
                              setCerrada(e.cerrada)
                              setRenuente(e.renuente)

                            }} >Editar</div>
                          </td> : null}
                        {!e.estado ? <td className="text-center tbl-bold"><div className="tbl-delete" onClick={() => eliminar(e.id)}>Eliminar</div></td> : null} */}
                      </tr>
                    ))}
                    {lista.length > 0 && consolidado &&
                      <tr style={{ border: '3px solid #17a2b8' }} >
                        <td className=" tbl-header3" style={{ fontWeight: '600' }}>TOTAL</td>
                        <td className="tbl-header3">{lista.length + ' viviendas'}</td>
                        <td className="tbl-header3">{'-'}</td>
                        <td className="tbl-header3">{'-'}</td>
                        <td className="tbl-header3">{tiempoTotal}</td>

                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.habitantes, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.num_hab, 0)}</td>
                        <td className="tbl-header3">-</td>
                        <td className="tbl-header3">
                          <div style={{ borderBottom: '1px solid black' }}>
                            SI={lista.reduce((acumulador, actual) => { return actual.vm_intra !== -1 ? acumulador + parseInt(actual.vm_intra) : acumulador }, 0)}</div>
                          <div>
                            NO={lista.reduce((acumulador, actual) => { return actual.vm_intra == 0 ? acumulador + 1 : acumulador }, 0)
                              // - lista.reduce((acumulador, actual) => { return actual.vm_intra == -1 ? acumulador : acumulador + !actual.vm_intra?1:0 }, 0)
                            }</div>
                        </td>
                        <td className="tbl-header3">

                          <div style={{ borderBottom: '1px solid black' }}>
                            SI={lista.reduce((acumulador, actual) => { return actual.vm_peri !== -1 ? acumulador + actual.vm_peri : acumulador }, 0)}</div>
                          <div>
                            NO={lista.reduce((acumulador, actual) => { return actual.vm_peri == 0 ? acumulador + 1 : acumulador }, 0)}</div>
                        </td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ecin, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ecia, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ecpn, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ecpa, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ecin, 0) + lista.reduce((acumulador, actual) => acumulador + actual.ecpn, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.ecia, 0) + lista.reduce((acumulador, actual) => acumulador + actual.ecpa, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcipd, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcicm, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcith, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lciot, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcppd, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcpga, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcpcl, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcpcj, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcpz, 0)}</td>
                        <td className="tbl-header3">{lista.reduce((acumulador, actual) => acumulador + actual.lcpot, 0)}</td>
                        <td className="tbl-header3">{'-'}</td>
                        <td className="tbl-header3">{'-'}</td>
                        <td className="tbl-header3">{'-'}</td>
                      </tr>}
                  </tbody>

                </Table>
                <Row>
                  <Col md='col-auto'> <div style={{ height: '25px', width: '100px', border: '1px solid black', background: 'white' }} >Completado</div></Col>
                  <Col md='col-auto'> <div style={{ height: '25px', width: '110px', border: '1px solid black', background: '#fadbd8 ' }} >Sin completar</div> </Col>
                </Row>

              </CardBody>
            </Card>

          </Row>
        }

      </div >
      <Modal isOpen={modalInsertar} toggle={toggle} className="modal-lg">
        <Card>
          <ModalHeader toggle={toggle}>
            PLANILLA DIARIA DE EVALUACION ENTOMOLOGICA EE-1
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
                  <Select1Easy
                    estado={casa}
                    cambiarEstado={setCasa}
                    ExpresionRegular={INPUT.ID}
                    lista={listaCasa}
                    name={"cv"}
                    etiqueta={"Numero CV: Total viviendas " + listaCasa.length}
                    msg="Seleccione una opcion"
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
                  <InputUsuarioStandar
                    estado={fecha}
                    cambiarEstado={setFecha}
                    tipo={'date'}
                    name="fecha"
                    etiqueta={"fecha"}
                    ExpresionRegular={INPUT.FECHA} //expresion regular
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


                  <Col md='12'> <ComponenteSubTitle etiqueta='Nombre apellido Tecnico evaluador (1) ' contenido={localStorage.getItem('nombre')} /> </Col>
                </Col>
              </Row>
            </Form>
          </ModalBody>

          <div className="boton-modal">
            <Button color="success" onClick={() => insertar()}>
              Guardar
            </Button>
          </div>
        </Card>
      </Modal>
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
                  <Select1Easy
                    estado={casa}
                    cambiarEstado={setCasa}
                    ExpresionRegular={INPUT.ID}
                    lista={listaCasa}
                    name={"cv"}
                    etiqueta={"Numero CV: Total viviendas " + listaCasa.length}
                    msg="Seleccione una opcion"
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
                  <InputUsuarioStandar
                    estado={fecha}
                    cambiarEstado={setFecha}
                    tipo={'date'}
                    name="fecha"
                    etiqueta={"fecha"}
                    ExpresionRegular={INPUT.FECHA} //expresion regular
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
            <Button color="info" onClick={() => editar()} >
              Actualizar
            </Button>
          </div>
        </Card>
      </Modal>

      <Modal isOpen={modalValidacion} toggle={toggleValidar} >
        <Card>
          <ModalHeader toggle={toggleValidar}>
            VALIDAR PLANILLA DIARIA DE EVALUACION ENTOMOLOGICA EE-1
          </ModalHeader>
          <ModalBody >
            <Form>
              <Row className="mb-4">
                <Col md='12'>
                  {listaOtros.length > 0 &&
                    <ComponenteInputUserDisabled
                      estado={{ campo: listaOtros[0].comunidad, valido: 'true' }}
                      etiqueta={"Comunidad"}
                      ExpresionRegular={INPUT.NOMBRE_PERSONA} //expresion regular
                    />
                  }
                </Col>
                <Col md='12'>
                  <ContenedorCheck>
                    <label htmlFor={'prerociado'}>
                      <input name="prerociado" id="prerociado" type="checkbox" onChange={() => setPrerociado(!prerociado)} defaultChecked={prerociado} />
                      <span>{'Actividad Prerociado'}</span>
                    </label>
                  </ContenedorCheck>
                </Col>
                <Col md='12'>
                  <Select1Easy
                    estado={usuario}
                    cambiarEstado={setUsuario}
                    ExpresionRegular={INPUT.ID}
                    lista={listaUsuariosBrigada}
                    name={"usuarios"}
                    etiqueta={"jefe de brigada"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='12'>
                  <Col md='12'> <ComponenteSubTitle etiqueta='Tecnico evaluador (1) ' contenido={localStorage.getItem('nombre')} /> </Col>
                </Col>
                <Col md='6'>
                  <Select1Easy
                    estado={usuario1}
                    cambiarEstado={setUsuario1}
                    ExpresionRegular={INPUT.ID}
                    lista={listaUsuariosRociador}
                    name={"tecnico_1"}
                    etiqueta={"Tecnico evaluador(2)"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='6'>
                  <Select1Easy
                    estado={usuario2}
                    cambiarEstado={setUsuario2}
                    ExpresionRegular={INPUT.ID}
                    lista={listaUsuariosRociador}
                    name={"tecnico_2"}
                    etiqueta={"Tecnico evaluador(3)"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='6'>
                  <Select1Easy
                    estado={usuario3}
                    cambiarEstado={setUsuario3}
                    ExpresionRegular={INPUT.ID}
                    lista={listaUsuariosRociador}
                    name={"tecnico_3"}
                    etiqueta={"Tecnico evaluador(4)"}
                    msg="Seleccione una opcion"
                  />
                </Col>
                <Col md='6'>
                  <Select1Easy
                    estado={usuario4}
                    cambiarEstado={setUsuario4}
                    ExpresionRegular={INPUT.ID}
                    lista={listaUsuariosRociador}
                    name={"tecnico_4"}
                    etiqueta={"Tecnico evaluador(5)"}
                    msg="Seleccione una opcion"
                  />
                </Col>
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
              </Row>
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

export default Ee1;
