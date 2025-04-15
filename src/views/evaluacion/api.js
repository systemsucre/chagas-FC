import { URL } from "Auth/config";

export const API_ENDPOINTS = {
  ESTADISTICA_EE2: {
    BUSCAR_CONSOLIDADO: `${URL}estadistica-departamental/listar-consolidado`,
    BUSCAR_MUNICIPIO: `${URL}estadistica-departamental/listar-por-municipio`,
    BUSCAR_COMUNIDAD_EE2: `${URL}estadistica-departamental/listar-por-comunidad-ee2`,
    LISTAR_MUNICIPIOS: `${URL}/estadistica-departamental/listar-municipios`,
    LISTAR_POR_COMUNIDAD: `${URL}estadistica-departamental/listar-por-comunidad`,
  },

  ESTADISTICA_RR2: {
    BUSCAR_CONSOLIDADO: `${URL}estadistica-departamental-RR2/listar-consolidado`,
    BUSCAR_MUNICIPIO: `${URL}estadistica-departamental-RR2/listar-por-municipio`,
    BUSCAR_COMUNIDAD_RR2: `${URL}estadistica-departamental-RR2/listar-por-comunidad-rr2`,
    LISTAR_MUNICIPIOS: `${URL}/estadistica-departamental-RR2/listar-municipios`,
    LISTAR_POR_COMUNIDAD: `${URL}estadistica-departamental-RR2/listar-por-comunidad`,
  },

};