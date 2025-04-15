import { URL } from "Auth/config";

export const API_ENDPOINTS = {
  USUARIOS: {
    LISTAR: `${URL}/usuarios/listar`,
    BUSCAR: `${URL}/usuarios/buscar`,
    LISTAR_ROL_MUNICIPIO: `${URL}/usuarios/listar-rol-municipio`,
    LISTAR_HOSPITAL: `${URL}/usuarios/listar-hospital`,
    LISTAR_COMUNIDAD: `${URL}/usuarios/listar-comunidad`,
    REGISTRAR: `${URL}/usuarios/registrar`,
    ACTUALIZAR: `${URL}/usuarios/actualizar`,
    RECETAR: `${URL}/usuarios/recet`,
    ELIMINAR: `${URL}/usuarios/eliminar`,
  },
  GESTION:{
    LISTAR:`${URL}/gestion/listar`,
    ACTIVAR:`${URL}/gestion/activar`,
    DESACTIVAR:`${URL}/gestion/desactivar`,
  },

  MES:{
    LISTARINICIO:`${URL}/mes/listarinicio`,
    LISTARGESTION:`${URL}/mes/listargestion`,
    LISTAR:`${URL}/mes/listar`,
    ACTUALIZAR:`${URL}/mes/actualizar`,
  }

};