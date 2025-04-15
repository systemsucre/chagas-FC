import { URL } from "Auth/config";

export const API_ENDPOINTS = {
  IEC_IMAGENES: {
    LISTAR: `${URL}/iec/listar-imagenes`,
    GUARDAR: `${URL}/iec/guardar-imagen`,
    GUARDAR_IMG: `${URL}/iec/guardar-imagen`,
    ELIMINAR: `${URL}/iec/eliminar-imagen`,
    BUSCAR: `${URL}/iec/buscar-imagenes`
  },

  IEC_FOLLETOS: {
    LISTAR: `${URL}/iec/listar-folletos`,
    GUARDAR: `${URL}/iec/guardar-pdf-bd`,
    GUARDAR_PDF: `${URL}/iec/guardar-pdf`,
    ELIMINAR: `${URL}/iec/eliminar-folletos`,
    BUSCAR: `${URL}/iec/buscar-folletos`
  },

  IEC_VIDEOS: {
    LISTAR: `${URL}/iec/listar-videos`,
    GUARDAR: `${URL}/iec/guardar-video`,
    ELIMINAR: `${URL}/iec/eliminar-videos`,
    BUSCAR: `${URL}/iec/buscar-videos`
    }

};