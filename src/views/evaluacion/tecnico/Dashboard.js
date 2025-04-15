
import { INPUT, URL } from "Auth/config";
import { Select1Easy } from "components/input/elementos";
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { start } from "service";


function DashboardTecnico(props) {


  const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null });

  const [habitantes, setHabitantes] = useState(0)

  const [listaGestion, setListaGestion] = useState([]);
  const [dataEvaluaciones, setDataEvaluaciones] = useState([]);
  const [listaHabitantes, setListaHabitantes] = useState([]);
  const [listaCvs, setListaCvs] = useState([]);


  useEffect(() => {
    document.title = 'INICIO'
    listarGestion()
  }, [])

  const listarGestion = async () => {
    const listaGEstion = await start(URL + '/evaluador-ee1-municipal/listar-anios')
    setListaGestion(listaGEstion)
    filtrarEvaluaciones(listaGEstion[0].value)
    setInputBuscar({
      campo: listaGEstion.length > 0 ? listaGEstion[0].value : null,
      valido: listaGEstion.length > 0 ? "true" : null,
    });
  }



  const filtrarEvaluaciones = async (gestion = null) => {

    const listaMeses = await start(URL + '/evaluador-ee1-municipal/filtrar-evaluaciones-viviendas', { gestion: gestion ? gestion : inputBuscar.campo }, 'Recuperando datos...')
    if (listaMeses[0].length > 0) {

      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let d of listaMeses[0]) {
        if (d.mes == 'ENE') data[0] = data[0] + 1
        if (d.mes == 'FEB') data[1] = data[1] + 1
        if (d.mes == 'MAR') data[2] = data[2] + 1
        if (d.mes == 'ABR') data[3] = data[3] + 1
        if (d.mes == 'MAY') data[4] = data[4] + 1
        if (d.mes == 'JUN') data[5] = data[5] + 1
        if (d.mes == 'JUL') data[6] = data[6] + 1
        if (d.mes == 'AGO') data[7] = data[7] + 1
        if (d.mes == 'SEP') data[8] = data[8] + 1
        if (d.mes == 'OCT') data[9] = data[9] + 1
        if (d.mes == 'NOV') data[10] = data[10] + 1
        if (d.mes == 'DIC') data[11] = data[11] + 1
      }
      setDataEvaluaciones(data)
    }
    else {
      setDataEvaluaciones([])
    }
    if (listaMeses[1].length > 0) {

      let hab = 0
      let dataCv = []
      let dataHabitantes = []
      for (let d of listaMeses[1]) {
        dataCv.push(d.nombre_comunidad)
        dataHabitantes.push(d.habitantes)
        hab = hab + parseInt(d.habitantes)
        console.log(d.habitantes)

      }
      console.log(dataCv)

      setListaHabitantes(dataHabitantes)
      setListaCvs(dataCv)
      setHabitantes(hab)
    }
    else {
      setListaHabitantes([])
      setListaCvs([])
    }

  }




  let chart1_2_options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
      xAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    },
  };

  let options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 120,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  }


  let chartExample1 = {
    data1: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: [
          "ENE",
          "FEB",
          "MAR",
          "ABR",
          "MAY",
          "JUN",
          "JUL",
          "AGO",
          "SEP",
          "OCT",
          "NOV",
          "DIC",
        ],
        datasets: [
          {
            label: "DATOS GESTION " + listaGestion.find(e => e.value == inputBuscar.campo)?.label,
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dataEvaluaciones // [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          },
        ],
      };
    },
  };


  let chartExample3 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels: listaCvs,
        datasets: [
          {
            label: "Habitantes",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: listaHabitantes,
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
        xAxes: {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      },
    },
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md='8'>
            <Row>
              <Col md='4'>
                <Select1Easy
                  estado={inputBuscar}
                  cambiarEstado={setInputBuscar}
                  name="gestion"
                  ExpresionRegular={INPUT.ID} //expresion regular
                  lista={listaGestion}
                  etiqueta={"Gestion"}
                /></Col>

              <Col md='2' style={{ display: 'flex', justifyContent: 'end' }}>
                <button className="btn-reportes btn-info" style={{ marginTop: window.innerWidth < 768 ? '5px' : '28.5px' }} onClick={() => { filtrarEvaluaciones() }} >
                  Filtrar
                </button>
              </Col>


            </Row>

          </Col>


        </Row>

        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    {/* <h5 className="card-category">{"gestion " + listaGestion.find(e => e.value == inputBuscar.campo)?.label}</h5> */}
                    <CardTitle tag="h2">EVALUACION ENTOMOLOGICA</CardTitle>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1["data1"]}
                    options={chart1_2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h3">
                  {listaCvs.length + ' comunidades, ' + habitantes + ' Habitantes'}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3["data"]}
                    options={options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>

      </div>
    </>
  );
}

export default DashboardTecnico;
