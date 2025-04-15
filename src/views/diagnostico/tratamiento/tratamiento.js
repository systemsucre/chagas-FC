import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader, Row, Table, } from "reactstrap";
import fileDownload from 'js-file-download';

import { API_ENDPOINTS } from "../api";
import { start } from "service";
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';
import { INPUT } from 'Auth/config';
import { CabeceraFormulariosTratamiento, InputUsuario, Select1Aux, Select1, ComponenteCheck_, InputUsuarioXS, ComponenteCheckTratamiento, InputUsuarioStandarNumeros, ComponenteInputRadio, } from '../input/elementos';
import { saveDB } from 'service';
import toast from 'react-hot-toast';
import { editDB } from 'service';
import { eliminarDB } from 'service';
import { fichaPDF } from 'pdfMake/ficha';



export default function Tratamiento() {

  let { paciente, } = useParams();
  useEffect(() => {
    const ini = () => {
      document.title = "TRATAMIENTO";
      listar()
    }
    ini()
    return () => { }
  }, []);



  const [lista, setLista] = useState([])
  const [listaSemana, setListaSemana] = useState([])
  const [listaSuspension, setListaSuspension] = useState([])
  const [listaAbandono, setListaAbandono] = useState([])
  const [listaHospital, setListaHospital] = useState([])
  const [modalRegistrar, setModalRegistrar] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)


  const [pacienteData, setPacienteData] = useState([])


  const [id, setId] = useState({ campo: null, valido: null })
  const [hospital, setHospital] = useState({ campo: null, valido: null })
  const [idHospital, setIdHospital] = useState({ campo: null, valido: null })
  const [idSuspension, setIdSuspension] = useState({ campo: null, valido: null })
  const [comunidad, setComunidad] = useState({ campo: null, valido: null })
  const [idComunidad, setIdComunidad] = useState({ campo: null, valido: null })
  const [suspension, setSuspension] = useState({ campo: null, valido: null })
  const [idAbandono, setIdAbandono] = useState({ campo: null, valido: null })
  const [abandono, setAbandono] = useState({ campo: null, valido: null })
  const [observacion, setObservacion] = useState({ campo: null, valido: null })
  const [epidemica, setEpidemica] = useState({ campo: null, valido: null })
  const [complementarios, setComplementarios] = useState({ campo: null, valido: null })

  const [estadoEnvio, setEstadoEnvio] = useState(0);




  const [idSemana, setIdSemana] = useState({ campo: null, valido: null })
  const [semana, setSemana] = useState({ campo: null, valido: null })
  const [numero, setNumero] = useState({ campo: null, valido: null })
  const [notificacion, setNotificacion] = useState({ campo: null, valido: null })
  const [sexo, setSexo] = useState(false)

  const [mujerEmbarazada, setMujerEmbarazada] = useState(false)
  const [fum, setFum] = useState({ campo: null, valido: null })
  const [tutorMenorEdad, setTutorMenorEdad] = useState({ campo: null, valido: null })

  // antecedentes patologicos

  const [transfusionSangre, setTransfusionSangre] = useState(false)
  const [madreSerologica, setMadreSerologica] = useState(false)
  const [tuboTransplante, setTuboTransplante] = useState(false)
  const [carneMalCocida, setCarneMalCocida] = useState(false)
  const [otraInformacion, setOtraInformacion] = useState({ campo: null, valido: null })

  //RESIDENCIA DEL PACIENTE
  const [departamentoResidencia, setDepartamentoResidencia] = useState({ campo: null, valido: null })
  const [municipioResidencia, setMunicipioResidencia] = useState({ campo: null, valido: null })
  const [comunidadResidencia, setComunidadResidencia] = useState({ campo: null, valido: null })
  const [permanenciaResidencia, setPermanenciaResidencia] = useState(false)
  const [añosResidencia, setAñosResidencia] = useState({ campo: null, valido: null })
  const [mesesResidencia, setMesesResidencia] = useState({ campo: null, valido: null })
  const [diasResidencia, setDiasResidencia] = useState({ campo: null, valido: null })

  // antecedentes epidemiologicos
  const [viveZonaEndemica, setViveZonaEndemica] = useState(false)
  const [departamentoEndemica, setDepartamentoEndemica] = useState({ campo: null, valido: null })
  const [municipioEndemica, setMunicipioEndemica] = useState({ campo: null, valido: null })
  const [comunidadEndemica, setComunidadEndemica] = useState({ campo: null, valido: null })
  const [barrioEndemica, setBarrioEndemica] = useState({ campo: null, valido: null })

  // DATOS CLINICOS


  // FASE AGUDA

  const [fechaInicioSintomasAgudas, setFechaInicioSintomasAgudas] = useState({ campo: null, valido: null })

  const [asintomaticoAgudo, setAsintomaticoAgudo] = useState(false)
  const [fiebreMayor7dias, setFiebreMayor7dias] = useState(false)
  const [chagomaInoculacion, setChagomaInoculacion] = useState(false)
  const [signoRomaña, setSignoRomaña] = useState(false)
  const [adenopatia, setAdenopatia] = useState(false)
  const [irritabilidad, setIrritabilidad] = useState(false)
  const [diarreas, setDiarreas] = useState(false)
  const [hepatoesplenomegalia, setHepatoesplenomegalia] = useState(false)
  const [convulsiones, setConvulsiones] = useState(false)
  const [otrosSintomasAgudos, setOtrosSintomasAgudos] = useState({ campo: null, valido: null })

  // FASE CRONICA
  const [fechaInicioSintomasCronicas, setFechaInicioSintomasCronicas] = useState({ campo: null, valido: null })
  const [asintomaticoCronico, setAsintomaticoCronico] = useState(false)

  const [alteracionesCardiacas, setAlteracionesCardiacas] = useState(false)
  const [alteracionesDigestivas, setAlteracionesDigestivas] = useState(false)
  const [alteracionesNerviosas, setAlteracionesNerviodsas] = useState(false)
  const [alteracionesAnedopatia, setAlteracionesAnedopatia] = useState(false)
  const [otrosSintomasCronicas, setOtrosSintomasCronicas] = useState({ campo: null, valido: null })

  // FORMA DE TRANSMISION
  const [oral, setOral] = useState(false)
  const [vectorial, setVectorial] = useState(false)
  const [congenito, setCongenito] = useState(false)
  const [transfucional, setTransfucioal] = useState(false)
  const [transplante, setTransplante] = useState(false)
  const [otrasTransmisiones, setOtrasTransmisiones] = useState({ campo: null, valido: null })

  // clasificacion del caso


  const [agudo, setAgudo] = useState(true)
  const [cronico, setCronico] = useState(false)

  // LABORATORIO
  const [sangre_total, setSangreTotal] = useState(false)
  const [fechaTomaMuestra, setFechaTomaMuestra] = useState({ campo: null, valido: null })
  const [listaItemsLaboratorio, setListaItemsLaboratorio] = useState([]) // items laboratorio diagnostico 


  const [idPaciente, setIdPaciente] = useState({ campo: null, valido: null });
  const [nombrePaciente, setNombrePaciente] = useState({ campo: null, valido: null });
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

  // consultas

  const [listaLaboratorio, setListaLaboratorio] = useState([])
  const [listaMedicamentos, setListaMedicamentos] = useState([])
  const [listaMujeresTratamiento, setListaMujeresTratamiento] = useState([])
  const [listaReacionDermatologica, setListaReacionDermatologica] = useState([])
  const [listaReaccionDigestiva, setListaReaccionDigestiva] = useState([])
  const [listaReaccionNeurologica, setListaReaccionNeurologica] = useState([])
  const [listaReaccionHematologica, setListaReaccionHematologica] = useState([])

  const [idMedicamento, setIdMedicamento] = useState({ campo: null, valido: null })
  const [medicamento, setMedicamento] = useState({ campo: null, valido: null })
  const [idMujeresTratamiento, setIdMujeresTratamiento] = useState({ campo: null, valido: null })
  const [mujeresTratamiento, setMujeresTratamiento] = useState({ campo: null, valido: null })
  const [idReaccionDermatologica, setIdReaccionDermatologica] = useState({ campo: null, valido: null })
  const [reaccionDermatologica, setReaccionDermatologica] = useState({ campo: null, valido: null })
  const [idReaccionDigestiva, setIdReaccionDigestiva] = useState({ campo: null, valido: null })
  const [reaccionDigestiva, setReaccionDigestiva] = useState({ campo: null, valido: null })
  const [idReaccionNeurologica, setIdReaccionNeurologica] = useState({ campo: null, valido: null })
  const [reaccionNeurologica, setReaccionNeurologica] = useState({ campo: null, valido: null })
  const [idReaccionHematologica, setIdReaccionHematologica] = useState({ campo: null, valido: null })
  const [reaccionHematologica, setReaccionHematologica] = useState({ campo: null, valido: null })
  const [dosis, setDosis] = useState({ campo: null, valido: null })
  const [idLaboratorio, setIdLaboratorio] = useState({ campo: null, valido: null })
  const [laboratorio, setLaboratorio] = useState({ campo: null, valido: null })






  const listar = async () => {
    try {
      const data = await start(API_ENDPOINTS.TRATAMIENTO.LISTAR, { paciente })
      setLista(data[0]?.length > 0 ? data[0] : [])
      //  if (data[0]?.length < 1) toast.error("No hay tratamientos registrados")
      setSexo(data[0][0].sexo == 1 ? false : data[0][0].sexo == 2 ? true : null)
      // setId(data[1]?.length)
      setPacienteData(data[1]?.length > 0 ? data[1] : [])
      setIdComunidad({ campo: data[1][0].comunidad, valido: 'true' })
      setComunidad({ campo: data[1][0].comunidad_nombre || null, valido: 'true' })

      if (data[2]?.length > 0)
        setListaSuspension(data[2])

      if (data[3]?.length > 0)
        setListaAbandono(data[3])

      if (data[4]?.length > 0)
        setListaHospital(data[4])

    } catch (error) {

    }
  };


  const listarParametrosLaboratorio = async (tratamiento = false) => {
    try {
      const loadingToast = toast.loading('Cargando parámetros...');
      const data = await start(API_ENDPOINTS.TRATAMIENTO.LISTAR_PARAMETROS_LABORATORIO, { paciente, tratamiento: tratamiento > 0 ? tratamiento : null })
      toast.dismiss(loadingToast);
      for (let f of data[0]) {
        var fechaDeNacimiento = new Date(f.fecha_nacimiento);
        var hoy = new Date();
        const milisegundosPorAnio = 1000 * 60 * 60 * 24 * 365;
        if (parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) >= 1) {
          f.edad = parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' años';
          localStorage.setItem('edad', f.edad + ' años')
          setEdad({ campo: parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio), valido: 'true' })
          setEdadWidow({ campo: parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' Años', valido: 'true' })
          setIdGrupo({ campo: 2, valido: 'true' })
          setGrupo({ campo: 'CRONICO', valido: 'true' })
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
              localStorage.setItem('edad', f.edad + '   días')

              setEdad({ campo: edad, valido: 'true' })
              setEdadWidow({ campo: parseInt(edad) + ' Dias', valido: 'true' })
            }
            if (edad > 30 && parseInt(edad) / 30 >= ge.inf && parseInt(edad) / 30 <= ge.sup && ge.id_grupo === 1 && ge.categoria === 2) {
              // alert(edad+ ' edad actual mayor a un mes ' + ge.label);
              setIdGrupoEtario({ campo: ge.id, valido: 'true' })
              setGrupoEtario({ campo: ge.label, valido: 'true' })
              f.edad = parseInt(Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365) / 30) + ' meses';
              localStorage.setItem('edad', f.edad + '   meses')

              setEdad({ campo: parseInt(edad / 30), valido: 'true' })
              setEdadWidow({ campo: parseInt(edad / 30) + ' Meses', valido: 'true' })
            }
          }
        }

        setPacienteData(data[0])
        setIdPaciente({ campo: data[0][0].id, valido: 'true' })
        setNombrePaciente({ campo: data[0][0].nombre, valido: 'true' })
      }



      if (data[3]?.length > 0) {
        let data_1 = []
        let data_2 = []

        let contador = 0
        for (let e of data[3]) {
          contador++
          data_1.push(e)
          if (contador == 2) {
            data_2.push(data_1)
            data_1 = []
            contador = 0
          }
        }

        setListaItemsLaboratorio(data_2)
        setCodigo({ campo: data[3][0].codigo, valido: true })

      }
      if (data[4]?.length > 0) {
        setListaSemana(data[4])
      }

      if (data[5]?.length > 0) {
        setListaMedicamentos(data[5])
      }

      if (data[6]?.length > 0) {
        setListaMujeresTratamiento(data[6])
      } if (data[7]?.length > 0) {
        setListaReacionDermatologica(data[7])
      } if (data[8]?.length > 0) {
        setListaReaccionDigestiva(data[8])
      } if (data[9]?.length > 0) {
        setListaReaccionNeurologica(data[9])
      } if (data[10]?.length > 0) {
        setListaReaccionHematologica(data[10])
      }
      if (data[11]?.length > 0) {
        setListaLaboratorio(data[11])
      }
      !tratamiento ? setModalRegistrar(true) : setModalEdit(true)

    } catch (error) {
      toast.error("Error al obtener los tratamientos")
    }
  };


  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const initialFormState = {
    campo: null,
    valido: null
  };
  const vaciarDatos = () => {
    const fieldsToReset = {
      setIdSuspension,
      setSuspension,
      setIdAbandono,
      setAbandono,
      setObservacion,
      setEpidemica,
      setComplementarios,
      setHospital,
      setIdHospital
    };
    Object.values(fieldsToReset).forEach(setterFn => {
      setterFn(initialFormState);
    });

    setModalEdit(false);
    setModalRegistrar(false);
  };



  const insertar = async () => {
    // console.log(listaItemsLaboratorio)
    if (estadoEnvio === 0) {
      setEstadoEnvio(1);
      await saveDB(API_ENDPOINTS.TRATAMIENTO.REGISTRAR, {

        //total variable: 68

        // DATOS PACIENTE
        id_paciente: idPaciente.campo,
        nombre_paciente: nombrePaciente.campo,
        id_grupo: idGrupo.campo,
        grupo: grupo.campo,
        id_grupo_etario: idGrupoEtario.campo,
        grupo_etario: grupoEtario.campo,
        edad: edad.campo,
        id_comunidad: idComunidad.campo,
        comunidad: comunidad.campo,


        // grupo1 formaulario

        notificacion: notificacion.campo,
        idSemana: idSemana.campo,
        semana: semana.campo,
        numero: numero.campo,
        mujerEmbarazada,
        fum: fum.campo,
        tutorMenorEdad: tutorMenorEdad.campo,

        //Antecedentes Patologicos
        transfusionSangre,
        madreSerologica,
        tuboTransplante,
        carneMalCocida,
        otraInformacion: otraInformacion.campo,

        //RESIDENCIA ACTUAL DEL PACIENTE
        departamentoResidencia: departamentoResidencia.campo,
        municipioResidencia: municipioResidencia.campo,
        comunidadResidencia: comunidadResidencia.campo,
        diasResidencia: diasResidencia.campo,
        mesesResidencia: mesesResidencia.campo,
        añosResidencia: añosResidencia.campo,
        permanenciaResidencia,

        //ANTECEDENTES EPIDEMIOLÓGICOS
        viveZonaEndemica,
        departamentoEndemica: departamentoEndemica.campo,
        municipioEndemica: municipioEndemica.campo,
        comunidadEndemica: comunidadEndemica.campo,
        barrioEndemica: barrioEndemica.campo,

        //DATOS CLÍNICOS - CLASIFICACIÓN DE CASO
        //FASE AGUDA
        fechaInicioSintomasAgudas: fechaInicioSintomasAgudas.campo,
        asintomaticoAgudo,
        fiebreMayor7dias,
        chagomaInoculacion,
        signoRomaña,
        adenopatia,
        irritabilidad,
        diarreas,
        hepatoesplenomegalia,
        convulsiones,
        otrosSintomasAgudos: otrosSintomasAgudos.campo,

        // FASE CRÓNICA
        fechaInicioSintomasCronicas: fechaInicioSintomasCronicas.campo,
        asintomaticoCronico,
        alteracionesCardiacas,
        alteracionesDigestivas,
        alteracionesNerviosas,
        alteracionesAnedopatia,
        otrosSintomasCronicas: otrosSintomasCronicas.campo,

        //FORMA DE TRANSMISIÓN
        oral,
        vectorial,
        congenito,
        transfucional,
        transplante,
        otrasTransmisiones: otrasTransmisiones.campo,

        // CLASIFICACIÓN DEL CASO
        agudo,
        cronico,

        // EXÁMENES DE LABORATORIO
        sangre_total, // true:sangre total, false:suero o plasma
        idLaboratorio: idLaboratorio.campo,
        laboratorio: laboratorio.campo,
        fechaTomaMuestra: fechaTomaMuestra.campo,
        lista: listaItemsLaboratorio,

        //REACCIONES ADVERSAS
        idReaccionDermatologica: idReaccionDermatologica.campo,
        reaccionDermatologica: reaccionDermatologica.campo,
        idReaccionDigestiva: idReaccionDigestiva.campo,
        reaccionDigestiva: reaccionDigestiva.campo,
        idReaccionNeurologica: idReaccionNeurologica.campo,
        reaccionNeurologica: reaccionNeurologica.campo,
        idReaccionHematologica: idReaccionHematologica.campo,
        reaccionHematologica: reaccionHematologica.campo,

        // OTRA INFORMACION
        epidemica: epidemica.campo,
        complementarios: complementarios.campo,
        idMedicamento: idMedicamento.campo,
        medicamento: medicamento.campo,
        dosis: dosis.campo,
        idMujeresTratamiento: idMujeresTratamiento.campo,
        mujeresTratamiento: mujeresTratamiento.campo,
        idSuspension: idSuspension.campo,
        suspension: suspension.campo,
        idAbandono: idAbandono.campo,
        abandono: abandono.campo,
        idHospital: idHospital.campo, // hospital de referencia,
        hospital: hospital.campo,
        id_pre_quirurgico: idPreQuirurgico.campo,
        pre_quirurgico: preQuirurgico.campo,
        id_post_tratamiento: idPostTratamiento.campo,
        post_tratamiento: postTratamiento.campo,
        id_estado_mujeres: idEstadoMujeres.campo,
        estado_mujeres: estadoMujeres.campo,
        observacion: observacion.campo,
      }, setModalRegistrar, setEstadoEnvio, false, vaciarDatos)
      listar()
    } else toast.error("FORMULARIO YA ENVIADO");
  };

  const editar = async () => {
    await editDB(API_ENDPOINTS.TRATAMIENTO.MODIFICAR, {
      id: id.campo,
      //total variable: 68

      // DATOS PACIENTE
      id_paciente: idPaciente.campo,
      nombre_paciente: nombrePaciente.campo,
      id_grupo: idGrupo.campo,
      grupo: grupo.campo,
      id_grupo_etario: idGrupoEtario.campo,
      grupo_etario: grupoEtario.campo,
      edad: edad.campo,
      id_comunidad: idComunidad.campo,
      comunidad: comunidad.campo,


      // grupo1 formaulario

      notificacion: notificacion.campo,
      idSemana: idSemana.campo,
      semana: semana.campo,
      numero: numero.campo,
      mujerEmbarazada,
      fum: fum.campo,
      tutorMenorEdad: tutorMenorEdad.campo,

      //Antecedentes Patologicos
      transfusionSangre,
      madreSerologica,
      tuboTransplante,
      carneMalCocida,
      otraInformacion: otraInformacion.campo,

      //RESIDENCIA ACTUAL DEL PACIENTE
      departamentoResidencia: departamentoResidencia.campo,
      municipioResidencia: municipioResidencia.campo,
      comunidadResidencia: comunidadResidencia.campo,
      diasResidencia: diasResidencia.campo,
      mesesResidencia: mesesResidencia.campo,
      añosResidencia: añosResidencia.campo,
      permanenciaResidencia,

      //ANTECEDENTES EPIDEMIOLÓGICOS
      viveZonaEndemica,
      departamentoEndemica: departamentoEndemica.campo,
      municipioEndemica: municipioEndemica.campo,
      comunidadEndemica: comunidadEndemica.campo,
      barrioEndemica: barrioEndemica.campo,

      //DATOS CLÍNICOS - CLASIFICACIÓN DE CASO
      //FASE AGUDA
      fechaInicioSintomasAgudas: fechaInicioSintomasAgudas.campo,
      asintomaticoAgudo,
      fiebreMayor7dias,
      chagomaInoculacion,
      signoRomaña,
      adenopatia,
      irritabilidad,
      diarreas,
      hepatoesplenomegalia,
      convulsiones,
      otrosSintomasAgudos: otrosSintomasAgudos.campo,

      // FASE CRÓNICA
      fechaInicioSintomasCronicas: fechaInicioSintomasCronicas.campo,
      asintomaticoCronico,
      alteracionesCardiacas,
      alteracionesDigestivas,
      alteracionesNerviosas,
      alteracionesAnedopatia,
      otrosSintomasCronicas: otrosSintomasCronicas.campo,

      //FORMA DE TRANSMISIÓN
      oral,
      vectorial,
      congenito,
      transfucional,
      transplante,
      otrasTransmisiones: otrasTransmisiones.campo,

      // CLASIFICACIÓN DEL CASO
      agudo,
      cronico,

      // EXÁMENES DE LABORATORIO
      sangre_total, // true:sangre total, false:suero o plasma
      idLaboratorio: idLaboratorio.campo,
      laboratorio: laboratorio.campo,
      fechaTomaMuestra: fechaTomaMuestra.campo,
      lista: listaItemsLaboratorio,

      //REACCIONES ADVERSAS
      idReaccionDermatologica: idReaccionDermatologica.campo,
      reaccionDermatologica: reaccionDermatologica.campo,
      idReaccionDigestiva: idReaccionDigestiva.campo,
      reaccionDigestiva: reaccionDigestiva.campo,
      idReaccionNeurologica: idReaccionNeurologica.campo,
      reaccionNeurologica: reaccionNeurologica.campo,
      idReaccionHematologica: idReaccionHematologica.campo,
      reaccionHematologica: reaccionHematologica.campo,

      // OTRA INFORMACION
      epidemica: epidemica.campo,
      complementarios: complementarios.campo,
      idMedicamento: idMedicamento.campo,
      medicamento: medicamento.campo,
      dosis: dosis.campo,
      idMujeresTratamiento: idMujeresTratamiento.campo,
      mujeresTratamiento: mujeresTratamiento.campo,
      idSuspension: idSuspension.campo,
      suspension: suspension.campo,
      idAbandono: idAbandono.campo,
      abandono: abandono.campo,
      idHospital: idHospital.campo, // hospital de referencia,
      hospital: hospital.campo,
      id_pre_quirurgico: idPreQuirurgico.campo,
      pre_quirurgico: preQuirurgico.campo,
      id_post_tratamiento: idPostTratamiento.campo,
      post_tratamiento: postTratamiento.campo,
      id_estado_mujeres: idEstadoMujeres.campo,
      estado_mujeres: estadoMujeres.campo,
      observacion: observacion.campo,
      codigo: codigo.campo
    }, setModalEdit, false, vaciarDatos)
    listar()
  };


  const eliminar = async (tratamiento) => {
    if (window.confirm('Eliminar Tratamiento ?')) {
      await eliminarDB(API_ENDPOINTS.TRATAMIENTO.ELIMINAR, { tratamiento })
      listar()
    }
  }

  const exportPdf = async (output) => {
    const response = await fichaPDF(output, { lista, listaItemsLaboratorio })

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
      fileDownload(blob, "Ficha-Epidemiologica.pdf");
    }
  }

  return (
    < >

      <div className="content" >
        <div className="main-container">
          <Card>

            <CardHeader>
              <BackgroundColorContext.Consumer>
                {({ color }) => (
                  <div className="tbl-header" data={color}>

                    <div className="row">
                      <div className="col-8">
                        TRATAMIENTOS
                      </div>

                      <div className="col-4" style={{ display: 'flex', justifyContent: 'end' }}>

                        <button className='btn-new' pb={3} onClick={() => { listarParametrosLaboratorio(); }} >
                          {window.innerWidth < 768 ? 'Nuevo' : 'Nuevo tratamiento'}
                        </button >
                      </div>
                    </div>
                  </div>
                )}
              </BackgroundColorContext.Consumer>
            </CardHeader>
            <CardBody>
              <div style={{ marginLeft: '10px', marginTop: '20px' }}>
                <div className='typography-line mt-2' style={{ marginBottom: '20px' }}>
                  <p class="text-success"><span className='text-primary'>C.I. : </span>
                    {localStorage.getItem('ci')}
                  </p>
                </div>
                <div className='typography-line' style={{ marginBottom: '20px' }}>
                  <span className='text-primary'>Paciente :  </span>
                  <p class="text-success">
                    {localStorage.getItem('nombrePaciente')}
                  </p>
                </div>
              </div>

              <Table className="tablesorter" responsive >
                <BackgroundColorContext.Consumer>
                  {({ color }) => (
                    <thead className="text-primary" data={color}>
                      <tr>
                        <th >HOSPITAL</th>
                        <th >NUMERO</th>
                        <th >FECHA NOTIFICACION</th>
                        <th >SEMANA EPIDEMIOLOGICA</th>
                        <th >CLASIFICACIÓN DEL CASO</th>
                      </tr>
                    </thead>
                  )}
                </BackgroundColorContext.Consumer>
                <tbody >
                  {lista.map((a, index) => (
                    <tr key={a.id} style={{
                      height: '50px', background: index % 2 == 0 ? "#E1EEF4" : 'white',
                      color: index % 2 == 0 ? "#00496B" : 'white'
                    }} className='item'>

                      <td><div className="tbl-des">{a.hospital}</div></td>
                      <td><div className="tbl-des">{a.numero}</div></td>
                      <td><div className="tbl-des">{a.notificacion.split('T')[0]}</div></td>
                      <td><div className="tbl-des">{a.semana}</div></td>
                      <td><div className="tbl-des">{a.agudo ? 'AGUDO' : 'CRONICO'}</div></td>
                      <td>
                        {a.edit && a.id_usuario == parseInt(localStorage.getItem('id_')) && a.id_hospital == parseInt(localStorage.getItem('est_')) ?
                          <button
                            className="btn btn-info "
                            to={'#'}
                            onClick={() => {

                              setId({ campo: a.id, valido: true })
                              setIdPaciente({ campo: a.idPaciente, valido: true })
                              setNombrePaciente({ campo: a.nombre_paciente, valido: true })
                              setIdComunidad({ campo: a.idComunidad, valido: true })
                              setComunidad({ campo: a.comunidad || null, valido: true })
                              setIdSemana({ campo: a.idSemana, valido: true })
                              setSemana({ campo: a.semana, valido: true })
                              setNumero({ campo: a.numero, valido: true })
                              setNotificacion({ campo: a.notificacion.split('T')[0], valido: true })
                              setFum({ campo: a.fum, valido: true })
                              setTutorMenorEdad({ campo: a.tutorMenorEdad, valido: true })
                              setOtraInformacion({ campo: a.otraInformacion, valido: true })
                              setDepartamentoResidencia({ campo: a.departamentoResidencia, valido: true })
                              setMunicipioResidencia({ campo: a.municipioResidencia, valido: true })
                              setComunidadResidencia({ campo: a.comunidadResidencia, valido: true })
                              setDiasResidencia({ campo: a.diasResidencia, valido: true })
                              setMesesResidencia({ campo: a.mesesResidencia, valido: true })
                              setAñosResidencia({ campo: a.añosResidencia, valido: true })
                              setDepartamentoEndemica({ campo: a.departamentoEndemica, valido: true })
                              setMunicipioEndemica({ campo: a.municipioEndemica, valido: true })
                              setComunidadEndemica({ campo: a.comunidadEndemica, valido: true })
                              setBarrioEndemica({ campo: a.barrioEndemica, valido: true })
                              setFechaInicioSintomasAgudas({ campo: a.fechaInicioSintomasAgudas?.split('T')[0], valido: true })
                              setOtrosSintomasAgudos({ campo: a.otrosSintomasAgudos, valido: true })
                              setFechaInicioSintomasCronicas({ campo: a.setFechaInicioSintomasCronicas?.split('T')[0], valido: true })
                              setOtrosSintomasCronicas({ campo: a.otrosSintomasCronicas, valido: true })
                              setOtrasTransmisiones({ campo: a.otrasTransmisiones, valido: true })
                              setIdLaboratorio({ campo: a.idLaboratorio, valido: true })
                              setLaboratorio({ campo: a.laboratorio, valido: true })
                              setFechaTomaMuestra({ campo: a.fechaTomaMuestra.split('T')[0], valido: true })
                              setIdReaccionDermatologica({ campo: a.idReaccionDermatologica, valido: true })
                              setReaccionDermatologica({ campo: a.reaccionDermatologica, valido: true })
                              setIdReaccionDigestiva({ campo: a.idReaccionDigestiva, valido: true })
                              setReaccionDigestiva({ campo: a.reaccionDigestiva, valido: true })
                              setIdReaccionNeurologica({ campo: a.idReaccionNeurologica, valido: true })
                              setReaccionNeurologica({ campo: a.reaccionNeurologica, valido: true })
                              setIdReaccionHematologica({ campo: a.idReaccionHematologica, valido: true })
                              setEpidemica({ campo: a.epidemica, valido: true })
                              setComplementarios({ campo: a.complementarios, valido: true })
                              setIdMedicamento({ campo: a.idMedicamento, valido: true })
                              setMedicamento({ campo: a.medicamento, valido: true })
                              setDosis({ campo: a.dosis, valido: true })
                              setIdMujeresTratamiento({ campo: a.idMujeresTratamiento, valido: true })
                              setMujeresTratamiento({ campo: a.mujeresTratamiento, valido: true })
                              setIdSuspension({ campo: a.idSuspension, valido: true })
                              setSuspension({ campo: a.suspension, valido: true })
                              setIdAbandono({ campo: a.idAbandono, valido: true })
                              setAbandono({ campo: a.abandono, valido: true })
                              setIdHospital({ campo: a.id_hospital_ref, valido: true })
                              setHospital({ campo: a.hospital_ref, valido: true })
                              setIdPreQuirurgico({ campo: a.idPreQuirurgico, valido: true })
                              setPreQuirurgico({ campo: a.preQuirurgico, valido: true })
                              setIdPostTratamiento({ campo: a.idPostTratamiento, valido: true })
                              setPostTratamiento({ campo: a.postTratamiento, valido: true })
                              setIdEstadoMujeres({ campo: a.idEstadoMujeres, valido: true })
                              setEstadoMujeres({ campo: a.estadoMujeres, valido: true })
                              setObservacion({ campo: a.observacion, valido: true })

                              setMujerEmbarazada(a.mujerEmbarazada)
                              setTransfusionSangre(a.transfusionSangre)
                              setMadreSerologica(a.madreSerologica)
                              setTuboTransplante(a.tuboTransplante)
                              setCarneMalCocida(a.carneMalCocida)
                              setPermanenciaResidencia(a.permanenciaResidencia)
                              setViveZonaEndemica(a.viveZonaEndemica)
                              setAsintomaticoAgudo(a.asintomaticoAgudo)
                              setFiebreMayor7dias(a.fiebreMayor7dias)
                              setChagomaInoculacion(a.chagomaInoculacion)
                              setSignoRomaña(a.signoRomaña)
                              setAdenopatia(a.adenopatia)
                              setIrritabilidad(a.irritabilidad)
                              setDiarreas(a.diarreas)
                              setHepatoesplenomegalia(a.hepatoesplenomegalia)
                              setConvulsiones(a.convulsiones)
                              setAsintomaticoCronico(a.asintomaticoCronico)
                              setAlteracionesCardiacas(a.alteracionesCardiacas)
                              setAlteracionesDigestivas(a.alteracionesDigestivas)
                              setAlteracionesNerviodsas(a.alteracionesNerviosas)
                              setAlteracionesAnedopatia(a.alteracionesAnedopatia)
                              setOral(a.oral)
                              setVectorial(a.vectorial)
                              setCongenito(a.congenito)
                              setTransfucioal(a.transfucional)
                              setTransplante(a.transplante)
                              setAgudo(a.agudo)
                              setCronico(a.cronico)
                              setSangreTotal(a.sangreTotal)
                              listarParametrosLaboratorio(a.id)

                            }}
                          >
                            editar
                          </button> : null
                        }

                      </td>
                      <td>
                        {a.edit && a.id_usuario == parseInt(localStorage.getItem('id_')) && a.id_hospital == parseInt(localStorage.getItem('est_')) ?
                          < button
                            className="btn btn-danger  "
                            onClick={() => eliminar(a.id)}
                          >
                            eliminar
                          </button> : null}
                      </td>
                      <td>
                        < button
                          className="btn btn-success  "
                          onClick={() => exportPdf(window.innerWidth < 1100 ? 'b64' : "print")}
                        >
                          ver ficha
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {lista.length < 1 && (
                <div class="text-success text-center" style={{ fontSize: "18px" }}>Lista Vacia</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div >


      <Modal
        isOpen={modalRegistrar}
        toggle={() => setModalRegistrar(!modalRegistrar)}
        className="modal-lgmd"
      >
        <ModalHeader
          toggle={() => setModalRegistrar(!modalRegistrar)}
        ></ModalHeader>
        <ModalBody>

          <CabeceraFormulariosTratamiento />

          <div className=' row' style={{ marginBottom: '1rem' }}>
            <Col md={2}>
              <InputUsuario
                estado={notificacion}
                cambiarEstado={setNotificacion}
                name={'notificacion'}
                ExpresionRegular={INPUT.FECHA}
                tipo={'date'}
                etiqueta={'Fecha Notificacion'}
                msg={"El formato no es válido"}
              />
            </Col>

            <Col md={3}>
              <Select1Aux
                estado={idSemana}
                cambiarEstado={setIdSemana}
                lista={listaSemana}
                name={'semana'}
                ExpresionRegular={INPUT.ID}
                label={setSemana}
                etiqueta={'Semana Epidemiológica'}
                msg={"El formato no es válido"}
              />
            </Col>

            <Col md={2}>
              <InputUsuarioStandarNumeros
                estado={numero}
                cambiarEstado={setNumero}
                name={'numero'}
                ExpresionRegular={INPUT.NUMEROS_P}
                etiqueta={'Número'}
                label={semana}
                msg={"El formato no es válido"}
              />
            </Col>

          </div>
          {sexo &&
            <div className=' row' style={{ marginBottom: '1rem' }}>
              <ComponenteCheckTratamiento
                label='Si es mujer, ¿esta embarazada?'
                label_A='SI'
                label_B='NO'
                estado={mujerEmbarazada}
                cambiarEstado={setMujerEmbarazada}
              />

              <Col md={4}>
                <InputUsuario
                  estado={fum}
                  cambiarEstado={setFum}
                  name={'fum'}
                  ExpresionRegular={INPUT.FECHA}
                  tipo={'date'}
                  importante={false}
                  etiqueta={'Fecha ultima menstruación FUM'}
                  msg={"El formato no es válido"}
                />
              </Col>
            </div>
          }

          <InputUsuarioXS
            estado={tutorMenorEdad}
            cambiarEstado={setTutorMenorEdad}
            name={'tutor_menor_de_edad'}
            ExpresionRegular={INPUT.TEXT}
            etiqueta={'En caso de que el paciente sea menor de edad, datos del padre o tutor: '}
            msg={"El formato no es válido"}
            importante={false}
          />

          <div className='cabecera-form'>
            <p> Antecedentes Patologicos</p>
          </div>

          <div className='row' style={{ justifyItems: 'revert-layer' }}>
            <ComponenteCheckTratamiento
              label='Recibió transfusión de sangre? '
              label_A='SI'
              label_B='NO'
              estado={transfusionSangre}
              cambiarEstado={setTransfusionSangre}
              col={2}
            />

            <ComponenteCheckTratamiento
              label='Nacio de madre con serología (+) para Chagas '
              label_A='SI'
              label_B='NO'
              estado={madreSerologica}
              cambiarEstado={setMadreSerologica}
              col={3}

            />

            <ComponenteCheckTratamiento
              label='Tuvo trasplante de Órgano '
              label_A='SI'
              label_B='NO'
              estado={tuboTransplante}
              cambiarEstado={setTuboTransplante}
              col={2}
            />
            <ComponenteCheckTratamiento
              label='Consumio carne de animal mal cocida? (Amazonia) '
              label_A='SI'
              label_B='NO'
              estado={carneMalCocida}
              cambiarEstado={setCarneMalCocida}
              col={4}
            />

          </div>

          <InputUsuarioXS
            estado={otraInformacion}
            cambiarEstado={setOtraInformacion}
            name={'otro_patologico'}
            ExpresionRegular={INPUT.TEXT}
            etiqueta={'Otro: '}
            msg={"El formato no es válido"}
            importante={false}
          />

          <div className='cabecera-form'>
            <p>RESIDENCIA ACTUAL DEL PACIENTE</p>
          </div>
          <div className='row'>
            <Col lg={2} style={{ marginTop: '8px' }}>
              <InputUsuario
                estado={departamentoResidencia}
                cambiarEstado={setDepartamentoResidencia}
                name={'depto_residencia'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Pais / Departamento: '}
                msg={"El formato no es válido"}
                importante={true}
              />
            </Col>
            <Col lg={2} style={{ marginTop: '8px' }}>
              <InputUsuario
                estado={municipioResidencia}
                cambiarEstado={setMunicipioResidencia}
                name={'municipio_residencia'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Municipio: '}
                msg={"El formato no es válido"}
                importante={true}
              />
            </Col>
            <Col lg={3} style={{ marginTop: '8px' }}>
              <InputUsuario
                estado={comunidadResidencia}
                cambiarEstado={setComunidadResidencia}
                name={'comunidad_residencia'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Distrito/Localidad/comunidad: '}
                msg={"El formato no es válido"}
                importante={true}
              />
            </Col>
            <Col lg={5}>
              <div className='row'>
                <Col md={5} style={{ marginTop: '4px' }}>
                  <div className='row'>
                    <Col md={4}>
                      <InputUsuarioStandarNumeros
                        estado={diasResidencia}
                        cambiarEstado={setDiasResidencia}
                        name={'dia_residencia'}
                        ExpresionRegular={INPUT.NUMEROS_P}
                        etiqueta={'Días: '}
                        msg={"El formato no es válido"}
                      />
                    </Col>
                    <Col md={4}>
                      <InputUsuarioStandarNumeros
                        estado={mesesResidencia}
                        cambiarEstado={setMesesResidencia}
                        name={'mes_residencia'}
                        ExpresionRegular={INPUT.NUMEROS_P}
                        etiqueta={'Meses: '}
                        msg={"El formato no es válido"}
                      />
                    </Col>
                    <Col md={4}>
                      <InputUsuarioStandarNumeros
                        estado={añosResidencia}
                        cambiarEstado={setAñosResidencia}
                        name={'años_residencia'}
                        ExpresionRegular={INPUT.NUMEROS_P}
                        etiqueta={'Años: '}
                        msg={"El formato no es válido"}
                      />
                    </Col>
                  </div>
                </Col>
                <Col md={7}>
                  <ComponenteCheckTratamiento
                    label={'Permanencia'}
                    label_A='Temporal'
                    label_B='Indefinido'
                    estado={permanenciaResidencia}
                    cambiarEstado={setPermanenciaResidencia}
                    col={12}
                  />
                </Col>
              </div>
            </Col>

          </div>

          <div className='cabecera-form'>
            <p>ANTECEDENTES EPIDEMIOLÓGICOS</p>
          </div>

          <div className='row'>
            <Col md={3}>
              <ComponenteCheckTratamiento
                label={'Vive o visito zona endémica para Chagas?'}
                label_A='SI'
                label_B='NO'
                estado={viveZonaEndemica}
                cambiarEstado={setViveZonaEndemica}
                col={12}
              />
            </Col>
            <Col md={2} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={departamentoEndemica}
                cambiarEstado={setDepartamentoEndemica}
                name={'depto_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Departamento: '}
                msg={"El formato no es válido"}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
            <Col md={2} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={municipioEndemica}
                cambiarEstado={setMunicipioEndemica}
                name={'municipio_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Municipio: '}
                msg={"El formato no es válido"}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
            <Col md={3} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={comunidadEndemica}
                cambiarEstado={setComunidadEndemica}
                name={'comunidad_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Distrito/Localidad/comunidad: '}
                msg={"El formato no es válido"}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
            <Col md={2} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={barrioEndemica}
                cambiarEstado={setBarrioEndemica}
                name={'comunidad_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Barrio/Zona/ U.V.: '}
                msg={"El formato no es válido"}
                importante={false}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
          </div>

          <div className='cabecera-form mt-4'>
            <p>DATOS CLÍNICOS - CLASIFICACIÓN DE CASO</p>
          </div>
          <p style={{ marginBottom: '0' }}>(Marque con una X los signos y síntomas que presenta el/la paciente)</p>
          <div className='cabecera-form' style={{ marginTop: '0' }}>
            <p>FASE AGUDA</p>
          </div>
          <Col md={4}>
            <InputUsuario
              estado={fechaInicioSintomasAgudas}
              cambiarEstado={setFechaInicioSintomasAgudas}
              name={'fecha_inicio_sintomas'}
              ExpresionRegular={INPUT.FECHA}
              tipo={'date'}
              importante={false}
              etiqueta={'Fecha fecha inicio sintomas'}
              msg={"El formato no es válido"}
            />
          </Col>

          <div className='row'>

            <Col md={2} >
              <ComponenteCheck_
                name={'asintomatico_agudo'}
                label={'Asintomático'}
                estado={asintomaticoAgudo}
                cambiarEstado={setAsintomaticoAgudo}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'fiebre_Mayor_7dias_agudo'}
                label={'Fiebre > a 7 dias'}
                estado={fiebreMayor7dias}
                cambiarEstado={setFiebreMayor7dias}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'chagoma_inoculacion_agudo'}
                label={'Chagoma de Inoculacion'}
                estado={chagomaInoculacion}
                cambiarEstado={setChagomaInoculacion}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'signo_de_omaña_agudo'}
                label={'Chagoma de Inoculacion'}
                estado={signoRomaña}
                cambiarEstado={setSignoRomaña}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'adenopatia_agudo'}
                label={'Adenopatia'}
                estado={adenopatia}
                cambiarEstado={setAdenopatia}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'irritabilidad_agudo'}
                label={'Irritabilidad'}
                estado={irritabilidad}
                cambiarEstado={setIrritabilidad}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'diarreas_agudo'}
                label={'Diarreas'}
                estado={diarreas}
                cambiarEstado={setDiarreas}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'hepatoesplenomegalia_agudo'}
                label={'hepatoesplenomegalia'}
                estado={hepatoesplenomegalia}
                cambiarEstado={setHepatoesplenomegalia}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'convulsiones_agudo'}
                label={'convulsiones'}
                estado={convulsiones}
                cambiarEstado={setConvulsiones}
              />
            </Col>
            <Col md={6} >
              <InputUsuarioXS
                name={'otros_sintomas_agudo'}
                etiqueta={'Otros'}
                estado={otrosSintomasAgudos}
                cambiarEstado={setOtrosSintomasAgudos}
                importante={false}
              />
            </Col>
          </div>

          <div className='cabecera-form' style={{ marginTop: '0' }}>
            <p>FASE CRÓNICA</p>
          </div>
          <Col md={4}>
            <InputUsuario
              estado={fechaInicioSintomasCronicas}
              cambiarEstado={setFechaInicioSintomasCronicas}
              name={'fecha_inicio_sintomas_cronicas'}
              ExpresionRegular={INPUT.FECHA}
              tipo={'date'}
              importante={false}
              etiqueta={'Fecha fecha inicio sintomas'}
              msg={"El formato no es válido"}
            />
          </Col>
          <div className='row'>
            <Col md={1} >
              <ComponenteCheck_
                name={'asintomatico_cronica'}
                label={'Asintomático'}
                estado={asintomaticoCronico}
                cambiarEstado={setAsintomaticoCronico}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_cardiacasa'}
                label={'Alt. Cardiacas '}
                estado={alteracionesCardiacas}
                cambiarEstado={setAlteracionesCardiacas}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_digestivas_cronica'}
                label={'Alt. Digestivas'}
                estado={alteracionesDigestivas}
                cambiarEstado={setAlteracionesDigestivas}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_nerviosas_cronica'}
                label={'Alt. Sistema Nervioso'}
                estado={alteracionesNerviosas}
                cambiarEstado={setAlteracionesNerviodsas}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_adenopatia_cronica'}
                label={'Adenopatia'}
                estado={alteracionesAnedopatia}
                cambiarEstado={setAlteracionesAnedopatia}
              />
            </Col>

            <Col md={3} >
              <InputUsuarioXS
                name={'otros_sintomas_cronicas'}
                etiqueta={'Otros'}
                estado={otrosSintomasCronicas}
                cambiarEstado={setOtrosSintomasCronicas}
                importante={false}
              />
            </Col>
          </div>




          <div className='cabecera-form mt-3'>
            <p>FORMA DE TRANSMISIÓN</p>
          </div>

          <div className='row'>
            <Col md={1} >
              <ComponenteCheck_
                name={'oral'}
                label={'Oral'}
                estado={oral}
                cambiarEstado={setOral}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'vectorial'}
                label={'Vectorial'}
                estado={vectorial}
                cambiarEstado={setVectorial}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'congenito'}
                label={'congenito'}
                estado={congenito}
                cambiarEstado={setCongenito}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'transfucional'}
                label={'Transfucional'}
                estado={transfucional}
                cambiarEstado={setTransfucioal}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'transplante'}
                label={'transplante'}
                estado={transplante}
                cambiarEstado={setTransplante}
              />
            </Col>

            <Col md={3} >
              <InputUsuarioXS
                name={'otras_transmisiones'}
                etiqueta={'Otros'}
                estado={otrasTransmisiones}
                cambiarEstado={setOtrasTransmisiones}
                importante={false}
              />
            </Col>
          </div>



          <div className='cabecera-form mt-3'>
            <p>CLASIFICACIÓN DEL CASO</p>
          </div>

          <div className='row' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Col md={4} >
              <ComponenteCheck_
                name={'agudo'}
                label={'agudo'}
                estado={agudo}
                f2={setCronico}
                cambiarEstado={setAgudo}
              />
            </Col>
            <Col md={4} >
              <ComponenteCheck_
                name={'cronico'}
                label={'cronico'}
                estado={cronico}
                f2={setAgudo}
                cambiarEstado={setCronico}
              />
            </Col>
          </div>

          <div className='cabecera-form mt-3'>
            <p> EXÁMENES DE LABORATORIO</p>
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Col md={4}>
              <ComponenteCheckTratamiento
                label={'Tipo de muestra: '}
                label_A='Sangre Total'
                label_B='Suero o plasma '
                estado={sangre_total}
                cambiarEstado={setSangreTotal}
                col={12}
              />
            </Col>
            <Col md={4}>
              <Select1
                estado={idLaboratorio}
                cambiarEstado={setIdLaboratorio}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Laboratorio de análisis'}
                msg={"el formato no es valido"}
                lista={listaLaboratorio}
                label={setLaboratorio}
                name={'id_laboratorio'}
              />
            </Col>
            <Col md={4} style={{ marginTop: '4px' }}>
              <InputUsuario
                estado={fechaTomaMuestra}
                tipo='date'
                cambiarEstado={setFechaTomaMuestra}
                name={'fecha_toma_muestra'}
                ExpresionRegular={INPUT.FECHA}
                etiqueta={'Fecha de toma de muestra: '}
                msg={"El formato no es válido"}
              />
            </Col>
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'space-evenly' }}>

            {listaItemsLaboratorio.map((e, index) => (
              < div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 col-12  ' style={{ border: '1px solid reddd' }}>

                <div className='row'>
                  <div className=' col-4'></div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '10px', fontWeight: '600', border: '2px solid #676767' }}>
                    No realizado
                  </div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '12px', fontWeight: '600', border: '2px solid #676767', borderRight: 'none' }}>POS
                  </div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '12px', fontWeight: '600', border: '2px solid #676767', borderRight: 'none' }}>NEG
                  </div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '12px', fontWeight: '600', border: '2px solid #676767' }}>
                    IND
                  </div>
                  {e.map((e, index) => (
                    <>
                      <div className=' col-4' style={{ fontSize: '10px', fontWeight: '600', display: "flex", justifyContent: "end", paddingRight: '10px', paddingTop: '8px' }}>{e.label}
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderRight: 'none', borderTop: 'none' }}>
                        <input type="radio" name={e.value} style={{ width: '100%', }}
                          onChange={(event) => {
                            if (event.target.checked) {
                              e.norealizado = true
                              e.indeterminado = 0
                              e.negativo = 0
                              e.positivo = 0
                            }
                          }}


                        />
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderRight: 'none', borderTop: 'none' }}>
                        <input type="radio" name={e.value} style={{ width: '100%', }}
                          onChange={(event) => {
                            if (event.target.checked) {
                              e.positivo = 1
                              e.indeterminado = 2
                              e.norealizado = false
                              e.negativo = 2
                            }
                          }}
                        />
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderRight: 'none', borderTop: 'none' }}>
                        <input type="radio" name={e.value} style={{ width: '100%', }}
                          onChange={(event) => {
                            if (event.target.checked) {
                              e.negativo = 1

                              e.indeterminado = 2
                              e.positivo = 2
                              e.norealizado = false
                            }
                          }}
                        />

                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderTop: 'none' }} >
                        <input type="radio" name={e.value} style={{ width: '100%', }}
                          onChange={(event) => {
                            if (event.target.checked) {
                              e.indeterminado = 1
                              e.negativo = 2
                              e.positivo = 2
                              e.norealizado = false
                            }
                          }}
                        />
                      </div>
                    </>
                  ))}

                </div>
              </div>

            ))}
          </div>

          <div className='cabecera-form mt-3' >
            <p>REACCIONES ADVERSAS</p>
          </div>
          <Row className='mb-3'>
            <Col md={4}>
              <Select1
                estado={idReaccionDermatologica}
                cambiarEstado={setIdReaccionDermatologica}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Dermatológica'}
                msg={"el formato no es valido"}
                lista={listaReacionDermatologica}
                name={'id_reaccion_dermatologica'}
                label={setReaccionDermatologica}
                importante={false}

              />
            </Col>
            <Col md={3}>
              <Select1
                estado={idReaccionDigestiva}
                cambiarEstado={setIdReaccionDigestiva}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Digestiva'}
                lista={listaReaccionDigestiva}
                msg={"el formato no es valido"}
                name={'id_reaccion_digestiva'}
                label={setReaccionDigestiva}
                importante={false}

              />
            </Col>

            <Col md={3}>
              <Select1
                estado={idReaccionNeurologica}
                cambiarEstado={setIdReaccionNeurologica}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Neurológica'}
                msg={"el formato no es valido"}
                lista={listaReaccionNeurologica}
                name={'id_reaccion_neurologica'}
                label={setReaccionNeurologica}
                importante={false}

              />
            </Col>

            <Col md={2}>
              <Select1
                estado={idReaccionHematologica}
                cambiarEstado={setIdReaccionHematologica}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Hematológica'}
                msg={"el formato no es valido"}
                lista={listaReaccionHematologica}
                name={'id_reaccion_hematologica'}
                label={setReaccionHematologica}
                importante={false}

              />
            </Col>
          </Row>

          <div className='cabecera-form mt-3'  >
            <p>OTRA INFORMACION</p>
          </div>

          <Row>
            <Col md={3}>
              <InputUsuario
                estado={epidemica}
                cambiarEstado={setEpidemica}
                name={'epidemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Situacion epidemica'}
                msg={"El formato no es válido"}
              />
            </Col>
            <Col md={4}>
              <InputUsuario
                estado={complementarios}
                cambiarEstado={setComplementarios}
                name={'complementarios'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Examenes complementarios'}
                msg={"El formato no es válido"}
                importante={false}
              />
            </Col>
            <Col md={3}>
              <Select1Aux
                estado={idMedicamento}
                name={'id_medicamento'}
                cambiarEstado={setIdMedicamento}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Medicamento'}
                lista={listaMedicamentos}
                msg={"el formato no es valido"}
                label={setMedicamento}
              />
            </Col>
            <Col md={2}>
              <InputUsuario
                estado={dosis}
                cambiarEstado={setDosis}
                name={'dosis'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Dosis'}
                msg={"El formato no es válido"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Select1
                estado={idMujeresTratamiento}
                cambiarEstado={setIdMujeresTratamiento}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Mujeres Tratamiento'}
                msg={"el formato no es valido"}
                lista={listaMujeresTratamiento}
                name={'id_mujer'}
                label={setMujeresTratamiento}
                importante={false}
              />
            </Col>
            <Col md={2}>
              <Select1
                estado={idSuspension}
                cambiarEstado={setIdSuspension}
                ExpresionRegular={INPUT.ID} //expresion regular
                etiqueta={'Suspension'}
                lista={listaSuspension}
                name={'idSuspension'}
                label={setSuspension}
                importante={false}
              />
            </Col>
            <Col md={2}>
              <Select1
                estado={idAbandono}
                cambiarEstado={setIdAbandono}
                ExpresionRegular={INPUT.ID} //expresion regular
                etiqueta={'Abandono'}
                lista={listaAbandono}
                msg={"el formato no es valido"}
                name={'idAbandono'}
                label={setAbandono}
                importante={false}
              />
            </Col>

            <Col md={6}>
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
            </Col>
            <Col md={4}>
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
            </Col>

            <Col md={4}>
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
            </Col>
            <Col md={4}>
              <Select1
                estado={idHospital}
                cambiarEstado={setIdHospital}
                ExpresionRegular={INPUT.ID} //expresion regular
                etiqueta={'Hospital de referencia'}
                lista={listaHospital}
                name={'hospital_ref'}
                label={setHospital}
                importante={false}
              />
            </Col>
          </Row>


          <InputUsuarioXS
            estado={observacion}
            cambiarEstado={setObservacion}
            ExpresionRegular={INPUT.TEXT}
            etiqueta={'Observaciones:'}
            msg={"El formato no es válido"}
            name={'observaciones'}
            importante={false}
          />
          <p style={{ color: '#f5365c', fontSize: '11px' }}>
            Todo paciente con dos pruebas serológicas positivos se considera para hacer tratamiento
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
            <div className="hero-section m-1 mt-3 mb-3" >
              <button onClick={() => insertar()} className="btn btn-success" >Registrar</button>
            </div>
          </div>
        </ModalBody>
      </Modal >




      <Modal
        isOpen={modalEdit}
        toggle={() => setModalEdit(!modalEdit)}
        className="modal-lgmd"
      >
        <ModalHeader
          toggle={() => setModalEdit(!modalEdit)}
        >
          EDITAR TRATAMIENTO
        </ModalHeader>
        <ModalBody>

          <CabeceraFormulariosTratamiento />

          <div className=' row' style={{ marginBottom: '1rem' }}>
            <Col md={2}>
              <InputUsuario
                estado={notificacion}
                cambiarEstado={setNotificacion}
                name={'notificacion'}
                ExpresionRegular={INPUT.FECHA}
                tipo={'date'}
                etiqueta={'Fecha Notificacion'}
                msg={"El formato no es válido"}
              />
            </Col>

            <Col md={3}>
              <Select1Aux
                estado={idSemana}
                cambiarEstado={setIdSemana}
                lista={listaSemana}
                name={'semana'}
                ExpresionRegular={INPUT.ID}
                label={setSemana}
                etiqueta={'Semana Epidemiológica'}
                msg={"El formato no es válido"}
              />
            </Col>

            <Col md={2}>
              <InputUsuarioStandarNumeros
                estado={numero}
                cambiarEstado={setNumero}
                name={'numero'}
                ExpresionRegular={INPUT.NUMEROS_P}
                etiqueta={'Número'}
                label={semana}
                msg={"El formato no es válido"}
              />
            </Col>

          </div>
          {sexo &&
            <div className=' row' style={{ marginBottom: '1rem' }}>
              <ComponenteCheckTratamiento
                label='Si es mujer, ¿esta embarazada?'
                label_A='SI'
                label_B='NO'
                estado={mujerEmbarazada}
                cambiarEstado={setMujerEmbarazada}
              />

              <Col md={4}>
                <InputUsuario
                  estado={fum}
                  cambiarEstado={setFum}
                  name={'fum'}
                  ExpresionRegular={INPUT.FECHA}
                  tipo={'date'}
                  importante={false}
                  etiqueta={'Fecha ultima menstruación FUM'}
                  msg={"El formato no es válido"}
                />
              </Col>
            </div>
          }

          <InputUsuarioXS
            estado={tutorMenorEdad}
            cambiarEstado={setTutorMenorEdad}
            name={'tutor_menor_de_edad'}
            ExpresionRegular={INPUT.TEXT}
            etiqueta={'En caso de que el paciente sea menor de edad, datos del padre o tutor: '}
            msg={"El formato no es válido"}
            importante={false}
          />

          <div className='cabecera-form'>
            <p> Antecedentes Patologicos</p>
          </div>

          <div className='row' style={{ justifyItems: 'revert-layer' }}>
            <ComponenteCheckTratamiento
              label='Recibió transfusión de sangre? '
              label_A='SI'
              label_B='NO'
              estado={transfusionSangre}
              cambiarEstado={setTransfusionSangre}
              col={2}
            />

            <ComponenteCheckTratamiento
              label='Nacio de madre con serología (+) para Chagas '
              label_A='SI'
              label_B='NO'
              estado={madreSerologica}
              cambiarEstado={setMadreSerologica}
              col={3}

            />

            <ComponenteCheckTratamiento
              label='Tuvo trasplante de Órgano '
              label_A='SI'
              label_B='NO'
              estado={tuboTransplante}
              cambiarEstado={setTuboTransplante}
              col={2}
            />
            <ComponenteCheckTratamiento
              label='Consumio carne de animal mal cocida? (Amazonia) '
              label_A='SI'
              label_B='NO'
              estado={carneMalCocida}
              cambiarEstado={setCarneMalCocida}
              col={4}
            />

          </div>

          <InputUsuarioXS
            estado={otraInformacion}
            cambiarEstado={setOtraInformacion}
            name={'otro_patologico'}
            ExpresionRegular={INPUT.TEXT}
            etiqueta={'Otro: '}
            msg={"El formato no es válido"}
            importante={false}
          />

          <div className='cabecera-form'>
            <p>RESIDENCIA ACTUAL DEL PACIENTE</p>
          </div>
          <div className='row'>
            <Col lg={2} style={{ marginTop: '8px' }}>
              <InputUsuario
                estado={departamentoResidencia}
                cambiarEstado={setDepartamentoResidencia}
                name={'depto_residencia'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Pais / Departamento: '}
                msg={"El formato no es válido"}
                importante={true}
              />
            </Col>
            <Col lg={2} style={{ marginTop: '8px' }}>
              <InputUsuario
                estado={municipioResidencia}
                cambiarEstado={setMunicipioResidencia}
                name={'municipio_residencia'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Municipio: '}
                msg={"El formato no es válido"}
                importante={true}
              />
            </Col>
            <Col lg={3} style={{ marginTop: '8px' }}>
              <InputUsuario
                estado={comunidadResidencia}
                cambiarEstado={setComunidadResidencia}
                name={'comunidad_residencia'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Distrito/Localidad/comunidad: '}
                msg={"El formato no es válido"}
                importante={true}
              />
            </Col>
            <Col lg={5}>
              <div className='row'>
                <Col md={5} style={{ marginTop: '4px' }}>
                  <div className='row'>
                    <Col md={4}>
                      <InputUsuarioStandarNumeros
                        estado={diasResidencia}
                        cambiarEstado={setDiasResidencia}
                        name={'dia_residencia'}
                        ExpresionRegular={INPUT.NUMEROS_P}
                        etiqueta={'Días: '}
                        msg={"El formato no es válido"}
                      />
                    </Col>
                    <Col md={4}>
                      <InputUsuarioStandarNumeros
                        estado={mesesResidencia}
                        cambiarEstado={setMesesResidencia}
                        name={'mes_residencia'}
                        ExpresionRegular={INPUT.NUMEROS_P}
                        etiqueta={'Meses: '}
                        msg={"El formato no es válido"}
                      />
                    </Col>
                    <Col md={4}>
                      <InputUsuarioStandarNumeros
                        estado={añosResidencia}
                        cambiarEstado={setAñosResidencia}
                        name={'años_residencia'}
                        ExpresionRegular={INPUT.NUMEROS_P}
                        etiqueta={'Años: '}
                        msg={"El formato no es válido"}
                      />
                    </Col>
                  </div>
                </Col>
                <Col md={7}>
                  <ComponenteCheckTratamiento
                    label={'Permanencia'}
                    label_A='Temporal'
                    label_B='Indefinido'
                    estado={permanenciaResidencia}
                    cambiarEstado={setPermanenciaResidencia}
                    col={12}
                  />
                </Col>
              </div>
            </Col>

          </div>

          <div className='cabecera-form'>
            <p>ANTECEDENTES EPIDEMIOLÓGICOS</p>
          </div>

          <div className='row'>
            <Col md={3}>
              <ComponenteCheckTratamiento
                label={'Vive o visito zona endémica para Chagas?'}
                label_A='SI'
                label_B='NO'
                estado={viveZonaEndemica}
                cambiarEstado={setViveZonaEndemica}
                col={12}
              />
            </Col>
            <Col md={2} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={departamentoEndemica}
                cambiarEstado={setDepartamentoEndemica}
                name={'depto_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Departamento: '}
                msg={"El formato no es válido"}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
            <Col md={2} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={municipioEndemica}
                cambiarEstado={setMunicipioEndemica}
                name={'municipio_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Municipio: '}
                msg={"El formato no es válido"}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
            <Col md={3} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={comunidadEndemica}
                cambiarEstado={setComunidadEndemica}
                name={'comunidad_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Distrito/Localidad/comunidad: '}
                msg={"El formato no es válido"}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
            <Col md={2} style={{ marginTop: '5px' }}>
              <InputUsuario
                estado={barrioEndemica}
                cambiarEstado={setBarrioEndemica}
                name={'comunidad_endemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Barrio/Zona/ U.V.: '}
                msg={"El formato no es válido"}
                importante={false}
                disabled={viveZonaEndemica ? false : true}
              />
            </Col>
          </div>

          <div className='cabecera-form mt-4'>
            <p>DATOS CLÍNICOS - CLASIFICACIÓN DE CASO</p>
          </div>
          <p style={{ marginBottom: '0' }}>(Marque con una X los signos y síntomas que presenta el/la paciente)</p>
          <div className='cabecera-form' style={{ marginTop: '0' }}>
            <p>FASE AGUDA</p>
          </div>
          <Col md={4}>
            <InputUsuario
              estado={fechaInicioSintomasAgudas}
              cambiarEstado={setFechaInicioSintomasAgudas}
              name={'fecha_inicio_sintomas'}
              ExpresionRegular={INPUT.FECHA}
              tipo={'date'}
              importante={false}
              etiqueta={'Fecha fecha inicio sintomas'}
              msg={"El formato no es válido"}
            />
          </Col>

          <div className='row'>

            <Col md={2} >
              <ComponenteCheck_
                name={'asintomatico_agudo'}
                label={'Asintomático'}
                estado={asintomaticoAgudo}
                cambiarEstado={setAsintomaticoAgudo}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'fiebre_Mayor_7dias_agudo'}
                label={'Fiebre > a 7 dias'}
                estado={fiebreMayor7dias}
                cambiarEstado={setFiebreMayor7dias}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'chagoma_inoculacion_agudo'}
                label={'Chagoma de Inoculacion'}
                estado={chagomaInoculacion}
                cambiarEstado={setChagomaInoculacion}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'signo_de_omaña_agudo'}
                label={'Chagoma de Inoculacion'}
                estado={signoRomaña}
                cambiarEstado={setSignoRomaña}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'adenopatia_agudo'}
                label={'Adenopatia'}
                estado={adenopatia}
                cambiarEstado={setAdenopatia}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'irritabilidad_agudo'}
                label={'Irritabilidad'}
                estado={irritabilidad}
                cambiarEstado={setIrritabilidad}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'diarreas_agudo'}
                label={'Diarreas'}
                estado={diarreas}
                cambiarEstado={setDiarreas}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'hepatoesplenomegalia_agudo'}
                label={'hepatoesplenomegalia'}
                estado={hepatoesplenomegalia}
                cambiarEstado={setHepatoesplenomegalia}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'convulsiones_agudo'}
                label={'convulsiones'}
                estado={convulsiones}
                cambiarEstado={setConvulsiones}
              />
            </Col>
            <Col md={6} >
              <InputUsuarioXS
                name={'otros_sintomas_agudo'}
                etiqueta={'Otros'}
                estado={otrosSintomasAgudos}
                cambiarEstado={setOtrosSintomasAgudos}
                importante={false}
              />
            </Col>
          </div>

          <div className='cabecera-form' style={{ marginTop: '0' }}>
            <p>FASE CRÓNICA</p>
          </div>
          <Col md={4}>
            <InputUsuario
              estado={fechaInicioSintomasCronicas}
              cambiarEstado={setFechaInicioSintomasCronicas}
              name={'fecha_inicio_sintomas_cronicas'}
              ExpresionRegular={INPUT.FECHA}
              tipo={'date'}
              importante={false}
              etiqueta={'Fecha fecha inicio sintomas'}
              msg={"El formato no es válido"}
            />
          </Col>
          <div className='row'>
            <Col md={1} >
              <ComponenteCheck_
                name={'asintomatico_cronica'}
                label={'Asintomático'}
                estado={asintomaticoCronico}
                cambiarEstado={setAsintomaticoCronico}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_cardiacasa'}
                label={'Alt. Cardiacas '}
                estado={alteracionesCardiacas}
                cambiarEstado={setAlteracionesCardiacas}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_digestivas_cronica'}
                label={'Alt. Digestivas'}
                estado={alteracionesDigestivas}
                cambiarEstado={setAlteracionesDigestivas}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_nerviosas_cronica'}
                label={'Alt. Sistema Nervioso'}
                estado={alteracionesNerviosas}
                cambiarEstado={setAlteracionesNerviodsas}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'alteraciones_adenopatia_cronica'}
                label={'Adenopatia'}
                estado={alteracionesAnedopatia}
                cambiarEstado={setAlteracionesAnedopatia}
              />
            </Col>

            <Col md={3} >
              <InputUsuarioXS
                name={'otros_sintomas_cronicas'}
                etiqueta={'Otros'}
                estado={otrosSintomasCronicas}
                cambiarEstado={setOtrosSintomasCronicas}
                importante={false}
              />
            </Col>
          </div>




          <div className='cabecera-form mt-3'>
            <p>FORMA DE TRANSMISIÓN</p>
          </div>

          <div className='row'>
            <Col md={1} >
              <ComponenteCheck_
                name={'oral'}
                label={'Oral'}
                estado={oral}
                cambiarEstado={setOral}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'vectorial'}
                label={'Vectorial'}
                estado={vectorial}
                cambiarEstado={setVectorial}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'congenito'}
                label={'congenito'}
                estado={congenito}
                cambiarEstado={setCongenito}
              />
            </Col>

            <Col md={2} >
              <ComponenteCheck_
                name={'transfucional'}
                label={'Transfucional'}
                estado={transfucional}
                cambiarEstado={setTransfucioal}
              />
            </Col>
            <Col md={2} >
              <ComponenteCheck_
                name={'transplante'}
                label={'transplante'}
                estado={transplante}
                cambiarEstado={setTransplante}
              />
            </Col>

            <Col md={3} >
              <InputUsuarioXS
                name={'otras_transmisiones'}
                etiqueta={'Otros'}
                estado={otrasTransmisiones}
                cambiarEstado={setOtrasTransmisiones}
                importante={false}
              />
            </Col>
          </div>



          <div className='cabecera-form mt-3'>
            <p>CLASIFICACIÓN DEL CASO</p>
          </div>

          <div className='row' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Col md={4} >
              <ComponenteCheck_
                name={'agudo'}
                label={'agudo'}
                estado={agudo}
                f2={setCronico}
                cambiarEstado={setAgudo}
              />
            </Col>
            <Col md={4} >
              <ComponenteCheck_
                name={'cronico'}
                label={'cronico'}
                estado={cronico}
                f2={setAgudo}
                cambiarEstado={setCronico}
              />
            </Col>
          </div>

          <div className='cabecera-form mt-3'>
            <p> EXÁMENES DE LABORATORIO</p>
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Col md={4}>
              <ComponenteCheckTratamiento
                label={'Tipo de muestra: '}
                label_A='Sangre Total'
                label_B='Suero o plasma '
                estado={sangre_total}
                cambiarEstado={setSangreTotal}
                col={12}
              />
            </Col>
            <Col md={4}>
              <Select1
                estado={idLaboratorio}
                cambiarEstado={setIdLaboratorio}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Laboratorio de análisis'}
                msg={"el formato no es valido"}
                lista={listaLaboratorio}
                label={setLaboratorio}
                name={'id_laboratorio'}
              />
            </Col>
            <Col md={4} style={{ marginTop: '4px' }}>
              <InputUsuario
                estado={fechaTomaMuestra}
                tipo='date'
                cambiarEstado={setFechaTomaMuestra}
                name={'fecha_toma_muestra'}
                ExpresionRegular={INPUT.FECHA}
                etiqueta={'Fecha de toma de muestra: '}
                msg={"El formato no es válido"}
              />
            </Col>
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'space-evenly' }}>

            {listaItemsLaboratorio.map((e, index) => (
              < div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 col-12  ' style={{ border: '1px solid reddd' }} key={index}>

                <div className='row'>
                  <div className=' col-4'></div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '10px', fontWeight: '600', border: '2px solid #676767' }}>
                    No realizado
                  </div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '12px', fontWeight: '600', border: '2px solid #676767', borderRight: 'none' }}>POS
                  </div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '12px', fontWeight: '600', border: '2px solid #676767', borderRight: 'none' }}>NEG
                  </div>
                  <div className='col-2' style={{ textAlign: "center", background: '#e2e2e2', fontSize: '12px', fontWeight: '600', border: '2px solid #676767' }}>
                    IND
                  </div>
                  {e.map((e, index) => (
                    < >
                      <div className=' col-4' style={{ fontSize: '10px', fontWeight: '600', display: "flex", justifyContent: "end", paddingRight: '10px', paddingTop: '8px' }}>{e.label}
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderRight: 'none', borderTop: 'none' }}>

                        {/* <input type="radio" name={e.value+1} style={{ width: '100%', }}
                          // checked={e.norealizado}
                          onChange={(event) => {

                            if (e.norealizado == 1) {
                              event.target.value = true
                            }
                            if (event.target.checked) {
                              e.norealizado = true
                              e.indeterminado = 0
                              e.negativo = 0
                              e.positivo = 0
                            }
                          }}
                        /> */}
                        <ComponenteInputRadio
                          id={e.value}
                          e={e}
                          estado='norealizado'
                        />
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderRight: 'none', borderTop: 'none' }}>
                        {/* <input type="radio" name={e.value + 1} style={{ width: '100%', }}
                          //  checked={e.positivo == 1 ? true : false}

                          onChange={(event) => {

                            if (e.positivo == 1) {
                              event.target.value = true
                            }

                            if (event.target.checked) {
                              e.positivo = 1
                              e.indeterminado = 2
                              e.norealizado = false
                              e.negativo = 2
                            }
                          }}
                        /> */}

                        <ComponenteInputRadio
                          id={e.value}
                          e={e}
                          estado='positivo'
                        />
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderRight: 'none', borderTop: 'none' }}>
                        {/* <input type="radio" name={e.value + 1} style={{ width: '100%', }}
                          // checked={e.negativo == 1 ? true : false}

                          onChange={(event) => {

                            if (e.negativo == 1) {
                              event.target.value = true
                            }
                            if (event.target.checked) {
                              e.negativo = 1

                              e.indeterminado = 2
                              e.positivo = 2
                              e.norealizado = false
                            }
                          }}
                        /> */}

                        <ComponenteInputRadio
                          id={e.value}
                          e={e}

                          estado='negativo'
                        />
                      </div>
                      <div className='col-2' style={{ paddingTop: '8px', border: '2px solid #676767', borderTop: 'none' }} >
                        {/* <input type="radio" name={e.value + 1} style={{ width: '100%', }}
                          // checked={e.indeterminado == 1 ? true : false}
                          onChange={(event) => {

                            if (e.indeterminado == 1) {
                              event.target.value = true
                            }

                            if (event.target.checked) {
                              e.indeterminado = 1
                              e.negativo = 2
                              e.positivo = 2
                              e.norealizado = false
                            }
                          }}
                          checked
                        /> */}
                        <ComponenteInputRadio
                          id={e.value}
                          e={e}
                          estado='indeterminado'
                        />
                      </div>
                    </>
                  ))}

                </div>
              </div>

            ))}
          </div>

          <div className='cabecera-form mt-3' >
            <p>REACCIONES ADVERSAS</p>
          </div>
          <Row className='mb-3'>
            <Col md={4}>
              <Select1
                estado={idReaccionDermatologica}
                cambiarEstado={setIdReaccionDermatologica}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Dermatológica'}
                msg={"el formato no es valido"}
                lista={listaReacionDermatologica}
                name={'id_reaccion_dermatologica'}
                label={setReaccionDermatologica}
                importante={false}

              />
            </Col>
            <Col md={3}>
              <Select1
                estado={idReaccionDigestiva}
                cambiarEstado={setIdReaccionDigestiva}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Digestiva'}
                lista={listaReaccionDigestiva}
                msg={"el formato no es valido"}
                name={'id_reaccion_digestiva'}
                label={setReaccionDigestiva}
                importante={false}

              />
            </Col>

            <Col md={3}>
              <Select1
                estado={idReaccionNeurologica}
                cambiarEstado={setIdReaccionNeurologica}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Neurológica'}
                msg={"el formato no es valido"}
                lista={listaReaccionNeurologica}
                name={'id_reaccion_neurologica'}
                label={setReaccionNeurologica}
                importante={false}

              />
            </Col>

            <Col md={2}>
              <Select1
                estado={idReaccionHematologica}
                cambiarEstado={setIdReaccionHematologica}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Reacción Hematológica'}
                msg={"el formato no es valido"}
                lista={listaReaccionHematologica}
                name={'id_reaccion_hematologica'}
                label={setReaccionHematologica}
                importante={false}

              />
            </Col>
          </Row>

          <div className='cabecera-form mt-3'  >
            <p>OTRA INFORMACION</p>
          </div>

          <Row>
            <Col md={3}>
              <InputUsuario
                estado={epidemica}
                cambiarEstado={setEpidemica}
                name={'epidemica'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Situacion epidemica'}
                msg={"El formato no es válido"}
              />
            </Col>
            <Col md={4}>
              <InputUsuario
                estado={complementarios}
                cambiarEstado={setComplementarios}
                name={'complementarios'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Examenes complementarios'}
                msg={"El formato no es válido"}
                importante={false}
              />
            </Col>
            <Col md={3}>
              <Select1Aux
                estado={idMedicamento}
                name={'id_medicamento'}
                cambiarEstado={setIdMedicamento}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Medicamento'}
                lista={listaMedicamentos}
                msg={"el formato no es valido"}
                label={setMedicamento}
              />
            </Col>
            <Col md={2}>
              <InputUsuario
                estado={dosis}
                cambiarEstado={setDosis}
                name={'dosis'}
                ExpresionRegular={INPUT.TEXT}
                etiqueta={'Dosis'}
                msg={"El formato no es válido"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Select1
                estado={idMujeresTratamiento}
                cambiarEstado={setIdMujeresTratamiento}
                ExpresionRegular={INPUT.ID}
                etiqueta={'Mujeres Tratamiento'}
                msg={"el formato no es valido"}
                lista={listaMujeresTratamiento}
                name={'id_mujer'}
                label={setMujeresTratamiento}
                importante={false}
              />
            </Col>
            <Col md={2}>
              <Select1
                estado={idSuspension}
                cambiarEstado={setIdSuspension}
                ExpresionRegular={INPUT.ID} //expresion regular
                etiqueta={'Suspension'}
                lista={listaSuspension}
                name={'idSuspension'}
                label={setSuspension}
                importante={false}
              />
            </Col>
            <Col md={2}>
              <Select1
                estado={idAbandono}
                cambiarEstado={setIdAbandono}
                ExpresionRegular={INPUT.ID} //expresion regular
                etiqueta={'Abandono'}
                lista={listaAbandono}
                msg={"el formato no es valido"}
                name={'idAbandono'}
                label={setAbandono}
                importante={false}
              />
            </Col>

            <Col md={6}>
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
            </Col>
            <Col md={4}>
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
            </Col>

            <Col md={4}>
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
            </Col>
            <Col md={4}>
              <Select1
                estado={idHospital}
                cambiarEstado={setIdHospital}
                ExpresionRegular={INPUT.ID} //expresion regular
                etiqueta={'Hospital de referencia'}
                lista={listaHospital}
                name={'hospital_ref'}
                label={setHospital}
                importante={false}
              />
            </Col>
          </Row>


          <InputUsuarioXS
            estado={observacion}
            cambiarEstado={setObservacion}
            ExpresionRegular={INPUT.TEXT}
            etiqueta={'Observaciones:'}
            msg={"El formato no es válido"}
            name={'observaciones'}
            importante={false}
          />
          <p style={{ color: '#f5365c', fontSize: '11px' }}>
            Todo paciente con dos pruebas serológicas positivos se considera para hacer tratamiento
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '1px 0px' }} >
            <div className="hero-section m-1 mt-3 mb-3" >
              <button onClick={() => editar()} className="btn btn-success" >Editar</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ >
  );
}

