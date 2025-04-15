import createPdf from './base.js';
import { sedes } from 'assets/img/logo'


const consultaPDF = async (output, { lista, paciente, listaItemsLaboratorioData }) => {

  // for (let f of paciente) {
  //   var fechaDeNacimiento = new Date(f.fecha_nacimiento);
  //   var hoy = new Date();
  //   const milisegundosPorAnio = 1000 * 60 * 60 * 24 * 365;
  //   f.edad = parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio);
  // }

  for (let f of paciente) {
    var fechaDeNacimiento = new Date(f.fecha_nacimiento);
    var hoy = new Date();
    const milisegundosPorAnio = 1000 * 60 * 60 * 24 * 365;
    if (parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) >= 1) {
      f.edad = parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) + ' años';
    }
    if (parseInt((hoy - fechaDeNacimiento) / milisegundosPorAnio) < 1) {
      f.edad = Math.round(((hoy - fechaDeNacimiento) / milisegundosPorAnio) * 365) + ' dias';
    }
  }



  let dataLaboratorio = [
    [
      { text: "#", style: "nhcheader", alignment: "left", },
      { text: "ITEM", style: "nhcheader", alignment: "left", },
      // {
      //   text: "RESULTADO",
      //   style: "nhcheader",
      //   alignment: "left",
      // },

    ],
  ];
  for (let e of listaItemsLaboratorioData) {
    dataLaboratorio.push([
      { text: e.id_items_laboratorio, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      { text: e.items_laboratorio, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
      // { text: e.resultado, style: "text", alignment: "left", margin: [0, 10, 0, 0] },
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
            { text: 'CONSULTA MEDICA', style: 'hc', colSpan: 3, color: '#00AEA4', alignment: 'left', margin: [0, 0, 0, 0] },
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    },

    //TIPO Y NUMERO DOCUMENTO
    { text: '_______________________________________________________________________________________________________________________________', style: 'text', margin: [0, 0, 0, 0] },



    {
      margin: [0, 10, 0, 10],
      table: {
        widths: ['100%', '0', '0', '0'],
        body: [
          [

            { text: paciente[0].ci ? 'C.I. ' + paciente[0].ci : 'C.I. No registrado', style: 'nhcheader', alignment: 'center', },
            {},
            {},
            {}
          ],
        ],
      },
      layout: 'noBorders',
    },

    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["20.6%", "20.6%", "20.6%", "11.6%", "10.6%", "10.6%",],
        body: [
          [

            { text: 'Apellido Paterno', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Apellido materno ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Nombre ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Fecha Nacimiento ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'Edad ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'sexo', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },

          ],
          [

            { text: paciente[0].ap1, style: 'text', alignment: 'left', },
            { text: paciente[0].ap2, style: 'text', alignment: 'left', },
            { text: paciente[0].nombre, style: 'text', alignment: 'left' },
            { text: paciente[0].fecha_nacimiento, style: 'text', alignment: 'left', },
            { text: paciente[0].edad , style: 'text', alignment: 'left', },
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


    { text: 'DATOS DEL TRATAMIENTO', style: 'nhcheader', alignment: 'center', margin: [0, 10, 0, 0] },


    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["20%", "20%", "20%", "20%", "20%",],
        body: [
          [

            { text: 'TRATAMIENTO', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'fecha de inicio ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'fecha de conclusion ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'MEDICO', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'HOSPITAL', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },


          ],
          [

            { text: lista[0].diagnostico, style: 'text', alignment: 'left', },
            { text: lista[0].fecha_ini, style: 'text', alignment: 'left', },
            { text: lista[0].fecha_fin, style: 'text', alignment: 'left' },
            { text: lista[0].medico, style: 'text', alignment: 'left' },
            { text: lista[0].hospital, style: 'text', alignment: 'left' },

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

    {
      text: 'OBSERVACIONES:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].observacion ? lista[0].observacion : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },

    {
      text: 'SITUACION EPIDEMICA:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].epidemica ? lista[0].epidemica : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },

    {
      text: 'EXAMENES COMPLEMENTARIOS PREVIOS:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].complementarios ? lista[0].complementarios : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },

    {
      text: 'HOSPITAL REFERENCIA:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].hospital_ref ? lista[0].hospital_ref : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },




    {
      margin: [0, 20, 0, 10],
      table: {
        widths: ['100%', '0', '0', '0'],
        body: [
          [

            { text: 'FECHA DE CONSULTA: ' + lista[0].fecha_consulta, style: 'nhcheader', alignment: 'center', },
            {},
            {},
            {}
          ],
        ],
      },
      layout: 'noBorders',
    },



    {
      text: 'MEDICAMENTOS:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].medicamento,
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },
    {
      text: 'DOSIS:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].dosis,
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },

    {
      text: 'MUJERES EN TRATAMIENTO:',
      style: 'nhcheader',
      alignment: 'justify',
      margin: [0, 0, 0, 0],
    },
    {
      text: lista[0].mujeres_tratamiento ? lista[0].mujeres_tratamiento : '-',
      style: 'text',
      alignment: 'justify',
      margin: [0, 0, 0, 10],
    },


    {
      text: 'REACCIONES ADVERSAS',
      style: 'nhcheader',
      alignment: 'center',
      margin: [0, 0, 0, 0],
    },
    {
      margin: [0, 10, 0, 10],
      table: {
        widths: ["25%", "25%", "25%", "25%",],
        body: [
          [

            { text: 'REACCION DERMATOLOGICA ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'REACCION DIGESTIVA ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'REACCION NEUROLOGICA ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
            { text: 'REACCION HEMATOLOGICA ', style: 'nhcheader', alignment: 'left', margin: [0, 0, 0, 0], },
          ],
          [

            { text: lista[0].reaccion_dermatologica, style: 'text', alignment: 'left', },
            { text: lista[0].reaccion_digestiva, style: 'text', alignment: 'left', },
            { text: lista[0].reaccion_neurologica, style: 'text', alignment: 'left', },
            { text: lista[0].reaccion_hematologica, style: 'text', alignment: 'left', },
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
      text: 'EXAMENES COMPLEMENTARIOS',
      style: 'nhcheader',
      alignment: 'center',
      margin: [0, 0, 0, 0],
    },
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ["10%", "90%",],
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


    { text: '__________________________________________________________________________', style: 'piePagina', alignment: 'center', margin: [0, 35, 0, 0], },
    { text: 'PROFESIONAL MEDICO', style: 'text', alignment: 'center', },
    { text: lista[0].medico, style: 'piePagina', alignment: 'center', },

  ];

  const response = await createPdf({ content }, output);
  return response;
};

export { consultaPDF };
