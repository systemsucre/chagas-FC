import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import printjs from 'print-js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createPdf = async (props, output = 'print') => {
  return new Promise((resolve, reject) => {
    try {
      const {
        pageSize = {
          width: 595.28,
          height: 790.995
        },

        pageMargins = [40.66, 30.66, 35.66, 30.66],
        border = { },
        info = {
          title: 'hictoria clinica',
          author: 'System sucre',
          subject: 'cONSULTORIA DE SOWFARE Z/EX-ESTACION PARQUE-BOLIVAR',
          keywords: 'DESARROLLO DE S.I.',
        },
        styles = {
          header: {
            fontSize: 8,
            bold: true,
            alignment: 'center',
          },
          tHeaderLabel: {
            fontSize: 7,
            alignment: 'right',
          },
          fechaTratamiento: {
            margin: [0, 1, 0, 10],
            fontSize: 7,
            bold: true,
          },
          nhcheader: {
            fontSize: 10,
            margin: [0, 0, 0, 0],
            bold: true,
            alignment: 'left',
          },
          tProductsHeader: {
            fontSize: 7.5,
            bold: true,
          },
          text: {
            margin: [0, 1, 0, 0],
            width: 100,
            fontSize: 9,
            alignment: 'center',
            bold: false
          },
          line: {
            margin: [0, 0, 0, 0],
            fontSize: 14,
            color: '#4E5AFE',
            bold: true,
            alignment: 'center',
          },
          titulo: {
            margin: [0, 0, 0, 0],
            fontSize: 8,
            bold: true,
            alignment: 'center',
          },
          subtitulo: {
            margin: [0, 0, 0, 0],
            fontSize: 8,
            bold: false,
            alignment: 'center',
          },
          subtitulobloque: {
            margin: [0, 0, 0, 0],
            fontSize: 7,
            bold: false,
            alignment: 'rigth',
            background: '#11cdef',
          },
          piePagina: {
            fontSize: 6,
            alignment: 'center',
          },
          tankYou: {
            fontSize: 10,
            alignment: 'center',
          },
          hc: {
            fontSize: 15,
            bold: true,
            alignment: 'center',
          },
          link: {
            fontSize: 7,
            bold: true,
            margin: [0, 0, 0, 4],
            alignment: 'center',
          },
        },
        content,


      } = props;

      const docDefinition = {
        pageSize, //TAMAÑO HOJA
        pageMargins, //MARGENES HOJA
        info, //METADATA PDF
        content, // CONTENIDO PDF
        styles, //ESTILOS PDF
      };

      if (output === 'b64') {
        //SI INDICAMOS QUE LA SALIDA SERA [b64] Base64
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          resolve({
            success: true,
            content: data,
            message: 'Archivo generado correctamente.',
          });
        });
        return;
      }

      //ENVIAR A IMPRESIÓN DIRECTA
      if (output === 'print') {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          printjs({
            printable: data,
            type: 'pdf',
            base64: true,
          });
          resolve({
            success: true,
            content: null,
            message: 'Documento enviado a impresión.',
          });
        });
        pdfMakeCreatePdf.open()
        return;
      }

      reject({
        success: false,
        content: null,
        message: 'Debes enviar tipo salida.',
      });
    } catch (error) {
      reject({
        success: false,
        content: null,
        message: error?.message ?? 'No se pudo generar proceso.',
      });
    }
  });
};

export default createPdf;
