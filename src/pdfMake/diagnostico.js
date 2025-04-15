import createPdf from './base.js';
import { sedes } from 'assets/img/logo'


const diagnosticoPDF = async (output, { lista, paciente, listaItemsLaboratorioData }) => {




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
  for (let e of listaItemsLaboratorioData) {
    dataLaboratorio.push([
      { text: e.id_items_diagnostico, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.items_diagnostico, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.positivo, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.negativo, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.indeterminado, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
    ]);
  }


  const content = [
    {
      margin: [0, 0, 0, 0],

      table: {
        widths: ['37%', '63%', '0', '0'],
        body: [
          [
            {
              image: sedes,
              fit: [100.73, 30.692],
              alignment: 'left',
              margin: [0, 0, 0, 0]
            },
            {},
            {},
            {},
          ],

          [
            { text: 'PROGRAMA CHAGAS DEPTO CHUQUISACA', style: 'header', alignment: 'left', margin: [2, 5, 0, 0] },
            { text: 'DIAGNOSTICO', style: 'hc', colSpan: 3, color: '#00AEA4', alignment: 'left', margin: [0, 0, 0, 0] },
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    },

    //TIPO Y NUMERO DOCUMENTO
    { text: '_______________________________________________________________________________________________________________________________', style: 'text', margin: [0, 0, 0, 0] },



    { text: 'DATOS DEL PACIENTE', style: 'nhcheader', alignment: 'left', margin: [0, 10, 0, 0], },
    { text: 'C.I. ' + paciente[0].ci, style: 'nhcheader', alignment: 'left', },

    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["33.3%", "33.3%", "33.3%",],
        body: [
          [

            { text: 'Apellido Paterno:', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Apellido materno: ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Nombre: ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },

          ],
          [

            { text: paciente[0].ap1, style: 'text', alignment: 'left', },
            { text: paciente[0].ap2, style: 'text', alignment: 'left', },
            { text: paciente[0].nombre, style: 'text', alignment: 'left' },

          ],
        ],
      },
      // layout: 'noBorders',

      layout: {
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? '#E5E8E8' : '#E5E8E8';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? '#E5E8E8' : '#E5E8E8';
        },
      }

    },

    {
      margin: [0, 10, 0, 10],
      table: {
        widths: ["30%", "20%", "20%", "30%",],
        body: [
          [

            { text: 'Fecha de nacimiento: ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Edad ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Grupo etario: ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'sexo:', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
          ],
          [

            { text: paciente[0].fecha_nacimiento, style: 'text', alignment: 'left', },
            { text: paciente[0].edad , style: 'text', alignment: 'left', },
            { text: lista[0].grupo + ' (' + lista[0].grupo_etario + ')', style: 'text', alignment: 'left', },
            { text: paciente[0].sexo, style: 'text', alignment: 'left', },
          ],
        ],
      },
      // layout: 'noBorders',
      layout: {
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? '#E5E8E8' : '#E5E8E8';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? '#E5E8E8' : '#E5E8E8';
        },
      }
    },

    { text: 'DATOS DE LA SOLICITUD', style: 'nhcheader', alignment: 'center', margin: [0, 10, 0, 0] },

    {
      margin: [0, 10, 0, 10],
      table: {
        widths: ["16.6%", "16.6%", "16.6%", "16.6%", "16.6%", "16.6%",],
        body: [
          [

            { text: 'FECHA DE SOLICITUD ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'POST-TRATAMIENTO ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'PRE-QUIRURGICO ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'ESTADO MUJERES ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'MEDICO SOLICITANTE ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'HOSPITAL SOLICITANTE ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
          ],
          [

            { text: lista[0].fecha_solicitud, style: 'text', alignment: 'left', },
            { text: lista[0].post_tratamiento, style: 'text', alignment: 'left', },
            { text: lista[0].pre_quirurgico ? lista[0].pre_quirurgico : '-', style: 'text', alignment: 'left', },
            { text: lista[0].estado_mujeres, style: 'text', alignment: 'left', },
            { text: lista[0].medico_solicitante, style: 'text', alignment: 'left', },
            { text: lista[0].hospital, style: 'text', alignment: 'left', },
          ],
        ],
      },
      layout: {
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? '#FFF' : '#FFF';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? '#FFF' : '#FFF';
        },
      }
    },

    { text: '_______________________________________________________________________________________________________________________________', style: 'text', margin: [0, 0, 0, 0] },
    { text: 'DATOS DEL DIAGNOSTICO', style: 'nhcheader', alignment: 'center', margin: [0, 10, 0, 0] },


    {
      text: 'FECHA REGISTRO DE RESULTADOS:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text:  lista[0].fecha_diagnostico ? lista[0].fecha_diagnostico : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },
    {
      text: 'ULTIMA ACTUALIZACION DE RESULTADOS:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: listaItemsLaboratorioData[0].ultima_modificacion ? listaItemsLaboratorioData[0].ultima_modificacion : lista[0].fecha_diagnostico ? lista[0].fecha_diagnostico : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },

    {
      text: 'CONCLUSIONES:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].conclusiones ? lista[0].conclusiones : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },
    {
      text: 'OBSERVACIONES:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].observaciones ? lista[0].observaciones : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },

    {
      text: 'MEDICO DIAGNOSTICO:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].medico_diagnostico ? lista[0].medico_diagnostico : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },
    {
      text: 'HOSPITAL DIAGNOSTICO:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].laboratorio ? lista[0].laboratorio : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },


    {
      text: 'RESULTADOS DE LOS ITEMS DE DIAGNOSTICOS SOLICITADOS',
      style: 'nhcheader',
      alignment: 'center',
      margin: [0, 0, 0, 0],
    },
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["10%", "30%", "20%", "20%", "20%",],
        body: dataLaboratorio,
        // layout: 'noBorders',
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? '#E5E8E8' : '#E5E8E8';
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? '#E5E8E8' : '#E5E8E8';
          },
        }
      },
    },


    { text: '__________________________________________________________________________', style: 'piePagina', alignment: 'center', margin: [0, 50, 0, 0], },
    { text: 'PROFESIONAL MEDICO', style: 'text', alignment: 'center', },
    { text: lista[0].medico, style: 'piePagina', alignment: 'center', },

  ];

  const response = await createPdf({ content }, output);
  return response;
};

export { diagnosticoPDF };
