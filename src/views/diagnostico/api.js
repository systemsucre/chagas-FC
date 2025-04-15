import { URL } from "Auth/config";

export const API_ENDPOINTS = {
    PACIENTES: {
      LISTAR: `${URL}/pacientes/listar`,
      REGISTRAR: `${URL}/pacientes/registrar`,
      MODIFICAR: `${URL}/pacientes/modificar`,
      ELIMINAR: `${URL}/pacientes/eliminar`,
      BUSCAR: `${URL}/pacientes/buscar`
    },
    TRATAMIENTO: {
      LISTAR: `${URL}/tratamiento/listar`,
      REGISTRAR: `${URL}/tratamiento/registrar`,
      MODIFICAR: `${URL}/tratamiento/modificar`,
      ELIMINAR: `${URL}/tratamiento/eliminar`,   
      LISTAR_PARAMETROS_LABORATORIO: `${URL}/tratamiento/listar-parametros-laboratorio`,   
    },

    CONSULTAS: {
      LISTAR: `${URL}/consultas/listar`,
      LISTAR_PARAMETROS: `${URL}/consultas/listar-parametros`,
      REGISTRAR: `${URL}/consultas/registrar`,
      MODIFICAR: `${URL}/consultas/modificar`,
      ELIMINAR: `${URL}/consultas/eliminar`,
    },

    DIAGNOSTICO: {
      LISTAR: `${URL}/diagnostico/listar`,
      LISTAR_PARAMETROS: `${URL}/diagnostico/listar-parametros`,
      LISTAR_GRUPO_ETARIO: `${URL}/diagnostico/listar-grupo-etario`,
      REGISTRAR: `${URL}/diagnostico/registrar`,
      MODIFICAR: `${URL}/diagnostico/modificar`,
      ELIMINAR: `${URL}/diagnostico/eliminar`,
    },

    LABORATORIO: {
      LISTAR: `${URL}/laboratorio-diagnostico/listar`,
      BUSCAR_PACIENTE: `${URL}/laboratorio-diagnostico/buscar-paciente`,
      LISTAR_PARAMETROS: `${URL}/laboratorio-diagnostico/listar-parametros`,
      MODIFICAR: `${URL}/laboratorio-diagnostico/modificar`,
    },

    REPORTES_TRATAMIENTO_DEPARTAMENTAL: {
      LISTAR_PARAMETROS: `${URL}/reportes-tratamiento-depto/listar-parametros`,
      LISTAR_PARAMETROS_TIPO_CONSULTA: `${URL}/reportes-tratamiento-depto/listar-parametros-tipo-consulta`,
      BUSCAR_CONSOLIDADO: `${URL}/reportes-tratamiento-depto/buscar-consolidado`,
      BUSCAR_POR_RED: `${URL}/reportes-tratamiento-depto/buscar-por-red`,
      BUSCAR_POR_MUNICIPIO: `${URL}/reportes-tratamiento-depto/buscar-por-municipio`,
      BUSCAR_POR_HOSPITAL: `${URL}/reportes-tratamiento-depto/buscar-por-hospital`,
      LISTAR_GRUPOS_ETARIOS: `${URL}/reportes-tratamiento-depto/listar-grupos-etarios`,
    }, 

    REPORTES_DIAGNOSTICO_DEPARTAMENTAL: {
      LISTAR_PARAMETROS: `${URL}/reportes-diagnostico-depto/listar-parametros`,
      LISTAR_PARAMETROS_TIPO_CONSULTA: `${URL}/reportes-diagnostico-depto/listar-parametros-tipo-consulta`,
      BUSCAR_CONSOLIDADO: `${URL}/reportes-diagnostico-depto/buscar-consolidado`,
      BUSCAR_POR_RED: `${URL}/reportes-diagnostico-depto/buscar-por-red`,
      BUSCAR_POR_MUNICIPIO: `${URL}/reportes-diagnostico-depto/buscar-por-municipio`,
      BUSCAR_POR_HOSPITAL: `${URL}/reportes-diagnostico-depto/buscar-por-hospital`,
      LISTAR_GRUPOS_ETARIOS: `${URL}/reportes-diagnostico-depto/listar-grupos-etarios`,
    }
  };