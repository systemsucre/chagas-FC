import createPdf from './base.js';
import { logo_ficha } from 'assets/img/logo-ficha.js'


const fichaPDF = async (output, { lista, listaItemsLaboratorio }) => {




  let dataLaboratorio = [
    [
      { text: "#", style: "nhcheader", alignment: "left", },
      { text: "ITEM", style: "nhcheader", alignment: "left", },
      {
        text: "POSITIVO",
        style: "nhcheader",
        alignment: "left",
      },
      {
        text: "NEGATIVO",
        style: "nhcheader",
        alignment: "left",
      },
      {
        text: "INDETERMINADO",
        style: "nhcheader",
        alignment: "left",
      },

    ],
  ];
  for (let e of listaItemsLaboratorio) {
    dataLaboratorio.push([
      { text: e.id_items_diagnostico, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.items_diagnostico, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.positivo, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.negativo, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.indeterminado, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
    ]);
  }
  let titulo = 'VIGILANCIA EPIDEMIOLOGICA DE ENFERMEDADES TRANSMITIDAS POR VECTORES '
  let subtitulo = 'FICHA EPIDEMIOLÓGICA DE CHAGAS '

  const content = [
    {
      margin: [0, 0, 0, 0],

      table: {
        widths: ['30%', '50%', '20%'],
        body: [
          [
            {
              image: logo_ficha,
              fit: [160.73, 100.692],
              alignment: 'left',
              margin: [0, 0, 0]
            },
            { text: titulo, style: 'subtitulo', alignment: 'center', margin: [2, 5, 0, 0] },
            { text: 'CODIGO                ', style: 'header', alignment: 'left', margin: [2, 5, 0, 0],  },
          ],
          [

            {},
            { text: subtitulo, style: 'titulo', alignment: 'center', },
            { text: 'N°' + lista[0].numero, style: 'text', alignment: 'rigth', margin: [3, 0, 0, 10], color:'red', fontSize:12},

          ],


        ],
      },
      layout: 'noBorders',
    },

    //TIPO Y NUMERO DOCUMENTO
    { text: '_______________________________________________________________________________________________________________________________', style: 'text', margin: [0, 0, 0, 0] },




    { text: '__________________________________________________________________________', style: 'piePagina', alignment: 'center', margin: [0, 50, 0, 0], },
    { text: 'PROFESIONAL MEDICO', style: 'text', alignment: 'center', },
    { text: lista[0].medico, style: 'piePagina', alignment: 'center', },

  ];

  const response = await createPdf({ content }, output);
  return response;
};

export { fichaPDF };
