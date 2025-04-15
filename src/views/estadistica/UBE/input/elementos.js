import toast from "react-hot-toast";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import {
  Input,
  LeyendaError,
  SelectStyle,
  SelectSm,
  ContenedorCheck,
  ContenedorCheckXL,
  IconoValidacion,
  IconoValidacionSelect
} from "./stylos"
import { useEffect, useState } from "react";
import { Button, Col, FormGroup, Row } from "reactstrap"

import './style.css'

const InputUsuarioStandar = ({
  estado,
  cambiarEstado,
  name,
  tipo = "text",
  ExpresionRegular,
  msg,
  placeholder,
  etiqueta,
}) => {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value });

  };

  const validacion = () => {
    if (ExpresionRegular) {
      document.getElementById(name).style.display = 'none'
      if (ExpresionRegular.test(estado.campo) && estado.campo != null) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
      }
    }
  };

  let año = new Date().getUTCFullYear();
  let mes = new Date().getUTCMonth();
  let dia = new Date().getUTCDate();
  let hora = new Date().getUTCHours();
  let minuto = new Date().getUTCMinutes();
  let segundo = new Date().getUTCSeconds();

  let birthday = new Date(año, mes, dia, hora - 4, minuto, segundo);
  const fecha = birthday.toLocaleDateString();
  let a = fecha.split("/")[2];
  let m = fecha.split("/")[1];
  let d = fecha.split("/")[0];

  if (m.length === 1) m = "0" + m;
  if (d.length === 1) d = "0" + d;

  const fechaFinal = a + "-" + m + "-" + d;



  return (

    <FormGroup>
      <label htmlFor={name}>
        {etiqueta}
      </label>
      <Input
        type={tipo}
        // className="inputUsuarioStarndar"
        id={name + 1}
        name={name + 1}
        placeholder={placeholder}
        value={estado.campo || ""}
        onChange={onChange}
        onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
        onBlur={validacion} //si presionamos fuera del input
        valido={estado.valido}

      />
      {tipo == 'text' || tipo == 'number' && <IconoValidacion valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} style={{ right: tipo === 'text' ? '10px' : "30px" }} />}
      <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>
    </FormGroup>


  );
};


const InputUsuarioStandarTable = ({
  estado,
  cambiarEstado,
  disponible = true,
  name,
}) => {
  // console.log(estado)
  const onchange = (e) => {
    if (!e.target.value) {
      cambiarEstado({ campo: 0, valido: 'true' })
    }
    if (parseInt(e.target.value) >= 0) {

      cambiarEstado({ campo: Math.abs(parseInt(e.target.value)), valido: 'true' })
    }
    else document.getElementById(e.target.id).value = 0;
  };
  return (

    disponible ?
      <FormGroup>
        <input
          id={name}
          className="inputUsuario-tabla"
          value={estado.campo}
          valido={estado.valido}
          onChange={onchange}
        />
      </FormGroup> :
      <FormGroup>
        <input
          id={name}
          disabled
          className="inputUsuario-tabla"
          // value={0}
          valido={estado.valido}
          onChange={onchange}
        />
      </FormGroup>


  );
};





const InputTextArea = ({
  estado,
  cambiarEstado,
  name,
  tipo = "text",
  ExpresionRegular,
  etiqueta,
  placeholder,
  msg,
  important = true,
}) => {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value });
  };

  const validacion = () => {
    if (ExpresionRegular) {
      document.getElementById(name).style.display = 'none'

      if (ExpresionRegular.test(estado.campo) && estado.campo != null) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
      }
    }
  };


  return (
    <FormGroup>
      <label htmlFor={name}>
        {etiqueta}
      </label>
      <Input
        cols="80"
        type="textarea"
        className="form-control"
        placeholder={placeholder}
        value={estado.campo || ""}
        onChange={onChange}
        onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
        onBlur={validacion} //si presionamos fuera del input
        valido={estado.valido}
      />
      <IconoValidacion valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} style={{ right: tipo === 'text' ? '10px' : "30px" }} />
      <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>
    </FormGroup>
  )
};
const ComponenteCheck = ({
  id,
  item,
  admitidos,
}) => {

  const onChange = (e) => {
    if (e.target.checked) {
      admitidos.push(parseInt(e.target.value));
    }

    if (e.target.checked === false) {
      let indiceEliminar = null;
      admitidos.forEach((x) => {
        if (x == parseInt(e.target.value)) {
          indiceEliminar = admitidos.indexOf(parseInt(e.target.value));
          admitidos.splice(indiceEliminar, 1);
        }
      });
    }
  };

  let check = false;
  admitidos.forEach((e) => {
    if (id === e) check = true;
  });

  return (
    <ContenedorCheck>
      <label htmlFor={id + item}>
        {" "}
        {/*el id es un elemento escencial al momento de marcar el check  */}
        <input
          type="checkbox"
          name={id}
          value={id}
          id={id + item}
          onChange={onChange}
          defaultChecked={check}
        />
        <span>{item}</span>
      </label>
    </ContenedorCheck>
  );
};

const ComponenteCheck_ = ({ name, label, estado, cambiarEstado, f2 = null, f3 = null, f4 = null, habilitado = false }) => {
  const onChange = (e) => {
    cambiarEstado(!estado)
    if (e.target.checked) {
      if (f2) f2(false)
      if (f3) f3(false)
      if (f4) f4(false)
    }
  }
  return (
    habilitado ? <label  ><input type="checkbox" onChange={onChange} name={name} value={estado} checked={estado} disabled /> {label}</label> :
      <label  ><input type="checkbox" onChange={onChange} name={name} value={estado} checked={estado} /> {label}</label>
  );
};


const Select1 = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  name,
  funcion = null,
  msg, etiqueta = null,
  opcion = "seleccionar",
}) => {
  const [mensaje, setMensaje] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ campo: parseInt(e.target.value), valido: "true" });
  };
  const validacion = (e) => {
    document.getElementById(name).style.display = 'none'
    if (ExpresionRegular) {
      if (ExpresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);
        if (funcion) funcion(parseInt(e.target.value))
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
      }
    }
  };
  // console.log(lista)
  return (

    <FormGroup>
      <label htmlFor={name}>
        {etiqueta}
      </label>
      <Input
        name={Name}
        type="select"
        onChange={onChange}
        valido={estado.valido}
        value={estado.campo || ""}
        onClick={validacion}
      >
        <option>{opcion + ' ' + name}</option>
        {lista.map((r) => (
          <option
            key={r.id}
            value={r.id}
          >
            {r.label}
          </option>
        ))}
      </Input>
      {/* </SelectStyle> */}
      <IconoValidacionSelect valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} />
      <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '12px', fontWeight: 'bold' }}>Campo Incorrecto</label>

    </FormGroup >
  );
};

const Select1Easy = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  name,
  funcion = null,
  msg, etiqueta = null,
}) => {


  const onChange = (e) => {
    if (ExpresionRegular) {

      if (ExpresionRegular.test(e.value)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) funcion(parseInt(e.value))
        cambiarEstado({ campo: parseInt(e.value), valido: "true" });
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }

  };
  const validacion = (e) => {
    console.log(e.value, estado)

    if (ExpresionRegular) {

      if (ExpresionRegular.test(estado.campo)) {

        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) funcion(parseInt(e.value))
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }
  };

  let valor = ''
  for (let e of lista) {
    if (e.value == estado.campo) {
      valor = e.label
    }
  }

  return (
    <FormGroup>
      <label htmlFor={name}>
        {etiqueta}
      </label>
      <Select
        name={Name}
        onClick={validacion}
        defaultValue={estado.campo}
        // value={ estado.campo}
        defaultInputValue={valor}
        placeholder={'Seleccione'}
        onChange={onChange}
        options={lista}
      />
    </FormGroup >
  );
};

const Select1XL = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  name,
  funcion = null,
  msg, etiqueta = null,
}) => {


  const onChange = (e) => {
    if (ExpresionRegular) {

      if (ExpresionRegular.test(e.value)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) funcion(parseInt(e.value))
        cambiarEstado({ campo: parseInt(e.value), valido: "true" });
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }

  };
  const validacion = (e) => {
    if (ExpresionRegular) {
      if (ExpresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) funcion(parseInt(e.value))
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }
  };
  // console.log(lista)

  return (
    <FormGroup>
      <p style={{ fontSize: '16px' }} htmlFor={name}>
        {etiqueta}
      </p>
      <Select
        name={Name}
        onClick={validacion}
        className='select1XL'
        // value={estado.campo}
        theme={(theme) => ({
          ...theme,

          borderRadius: 3,
          border: 0,
          colors: {
            ...theme.colors,
            primary25: 'primary50',
            primary: '#17a2b8',
          },
        })}
        placeholder={'Seleccione'}
        onChange={onChange}
        options={lista}
      />
    </FormGroup >
  );
};

const Select1Aux = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  name,
  funcion = null,
  msg, etiqueta = '-',
  opcion = "seleccionar",
}) => {
  const [mensaje, setMensaje] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ campo: parseInt(e.target.value), valido: "true" });
  };
  const validacion = (e) => {
    document.getElementById(name).style.display = 'none'
    if (ExpresionRegular) {
      if (ExpresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);
        if (funcion) funcion(parseInt(e.target.value))
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
      }
    }
  };
  // console.log(lista)
  return (

    <FormGroup>
      <label htmlFor={name}>
        {etiqueta}
      </label>
      <Input
        name={Name}
        type="select"
        onChange={onChange}
        className="selectUsuarioStarndar"
        valido={estado.valido}
        value={estado.campo || ""}
        onClick={validacion}
      >
        <option>{opcion + ' ' + name}</option>
        {lista.map((r) => (
          <option
            key={r.id}
            value={r.id}
          >
            {r.label}
          </option>
        ))}
      </Input>
      <IconoValidacionSelect valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} />
      <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '12px', fontWeight: 'bold' }}>Campo Incorrecto</label>

    </FormGroup >
  );
};


const ComponenteInputBuscar_ = ({
  estado,
  cambiarEstado,
  name,
  ExpresionRegular,
  placeholder,
  eventoBoton,
}) => {
  const onchange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }); // cambiarEstado({...estado, campo: e.target})
  };
  const validacion = () => {
    if (ExpresionRegular) {
      if (ExpresionRegular.test(estado.campo) && estado.campo != null) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
      } else {
        if (estado.campo == '') cambiarEstado({ ...estado, valido: null });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && estado.valido === "true") {
      eventoBoton();
    }
  };

  return (
    <Row>
      <Col md='5' style={{ padding: "0", paddingLeft: '5px', marginTop: '5px' }}>
        <Input
          type="text"
          value={estado.campo || ""}
          id={"idBuscador"}
          name={name}
          placeholder={window.innerWidth < 668 ? "enter para buscar" : placeholder}
          onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
          onBlur={validacion} //si presionamos fuera del input
          onChange={onchange}
          valido={estado.valido}
          onKeyDown={handleKeyPress}
        />
      </Col>
      {window.innerWidth > 768 && <Col md='3' style={{ padding: "0", paddingLeft: '15px' }} >
        <Button onClick={() => eventoBoton()}>Buscar</Button>
      </Col>}
    </Row>
  );
};















const ComponenteInputUserDisabled = ({ estado, etiqueta, placeholder, tabla = false }) => {

  return (
    <FormGroup>
      {!tabla && <label>{etiqueta}</label>}
      <Input
        type="text"
        value={estado.campo.label || ""}
        valido={estado.valido}
        placeholder={placeholder}
        toUpperCase
        disabled
      />
    </FormGroup>
  );
};



const SelectString = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  funcion,
  etiqueta,
  msg,
  important = true,
}) => {
  const [mensaje, setMensaje] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ campo: e.target.value, valido: "true" });
  };
  const validacion = () => {
    if (ExpresionRegular) {
      if (
        ExpresionRegular.test(estado.campo) &&
        estado.campo != "Seleccionar"
      ) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) {
          funcion();
        }
        setMensaje(null);
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
      }
    }
  };

  return (
    <p>
      {important ? (
        <>
          <span className="label-input">{etiqueta}</span>
          <span style={{ color: "rgb(217,48,37)" }}> *</span>
        </>
      ) : (
        etiqueta + ""
      )}
      <SelectStyle
        name={Name}
        className="inputUsuario"
        onChange={onChange}
        // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
        // onBlur={validacion}  //si presionamos fuera del input
        valido={estado.valido}
        value={estado.campo || ""}
        onClick={validacion}
      >
        <option>Seleccionar</option>

        {lista.map((r) => (
          <option
            key={r.id}
            value={r.id}
            style={{ color: "#595959", padding: "1rem" }}
          >
            {r.nombre}
          </option>
        ))}
      </SelectStyle>
    </p>

  );
};

const SelectSM = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  funcion,
  estado_ = null,
  etiqueta,
  msg,
  very = 0,
}) => {
  const [mensaje, setMensaje] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ campo: parseInt(e.target.value), valido: "true" });
  };
  const validacion = () => {
    if (ExpresionRegular) {
      if (
        ExpresionRegular.test(estado.campo) &&
        estado.campo != "Seleccionar"
      ) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) {
          funcion();
          if (estado_) estado_({ campo: null, valido: null });
        }

        setMensaje(null);
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
      }
    }
  };

  return (
    <div>
      <p className="nombreentradassm reportes-select">
        {etiqueta}
        <SelectSm
          name={Name}
          className="form-control form-control-sm"
          onChange={onChange}
          // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
          // onBlur={validacion}  //si presionamos fuera del input
          valido={estado.valido}
          value={estado.campo || ""}
          onClick={validacion}
        >
          {very == 0 && <option> Seleccionar</option>}

          {lista.map((r, index) => (
            <option
              key={index}
              value={r.id}
              style={{ color: "#595959", fontSize: "12px" }}
            >
              {r.nombre}
            </option>
          ))}
        </SelectSm>
        <LeyendaError>{mensaje}</LeyendaError>
      </p>
    </div>
  );
};



const ComponenteCheckXL = ({
  id,
  item,
  setAdmitidos,
  admitidos,
  lista,
  prefijo,
}) => {
  const onChange = (e) => {
    if (e.target.checked) {
      lista.forEach((e1) => {
        admitidos.push(e1.id);
        document.getElementById(e1.id + prefijo).checked = true;
        let result = admitidos.filter((item, index) => {
          return admitidos.indexOf(item) === index;
        });
        setAdmitidos(result);
      });
      // console.log(admitidos)
    }

    if (e.target.checked === false) {
      setAdmitidos([]);
      lista.forEach((e1) => {
        document.getElementById(e1.id + prefijo).checked = false;
      });
      // console.log(admitidos)
    }
  };

  return (
    <ContenedorCheckXL>
      <label htmlFor={id}>
        {" "}
        {/*el id es un elemento escencial al momento de marcar el check  */}
        <input
          type="checkbox"
          name={id}
          value={id}
          id={id}
          onChange={onChange}
        // defaultChecked={check}
        />
        <small style={{ color: "#595959", paddingTop: "0", fontSize: "12px" }}>
          {item}
        </small>
      </label>
    </ContenedorCheckXL>
  );
};
const ComponenteCheckMTM = ({ id, item, admitidos, marcarTodos = false }) => {
  const onChange = (e) => {
    if (e.target.checked) {
      admitidos.push(parseInt(e.target.value));
    }

    if (e.target.checked === false) {
      let indiceEliminar = null;
      admitidos.forEach((x) => {
        if (x == parseInt(e.target.value)) {
          indiceEliminar = admitidos.indexOf(parseInt(e.target.value));
          admitidos.splice(indiceEliminar, 1);
        }
      });
    }
  };

  let check = false;
  admitidos.forEach((e) => {
    console.log(e, id, "comparacion");
    if (parseInt(id) === e) {
      check = true;
    }
  });

  if (marcarTodos) {
    console.log("sekeccion de subsectro en componente ", admitidos);
    admitidos.forEach((e) => {
      // console.log(e, id, 'comparacion')
      if (parseInt(id) === e) {
        check = true;
      }
    });
  }

  // console.log('seleccionados ', admitidos)

  return (
    <ContenedorCheck>
      <label htmlFor={id + "ser"}>
        {" "}
        {/*el id es un elemento escencial al momento de marcar el check  */}
        <input
          type="checkbox"
          name={id}
          value={id}
          id={id + "ser"}
          onChange={onChange}
          defaultChecked={check}
        />
        <small>{item}</small>
      </label>
    </ContenedorCheck>
  );
};

const ComponenteCheckSimple = ({
  id,
  item,
  estado,
  cambiarEstado
}) => {
  const onChange = (e) => {
    if (e.target.checked) {
      cambiarEstado(true)
    }

    if (e.target.checked === false) {
      cambiarEstado(false)
    }
  };

  let check = false
  if (parseInt(estado) === 1) {
    check = true;
  }

  // if (estado && ) {
  //   check = true;
  // }

  // console.log(estado.toString(), check, 'estado')

  return (
    <ContenedorCheck>
      <label style={{ fontSize: '16px', color: '#52BE80' }} htmlFor={id}>
        {" "}
        {/*el id es un elemento escencial al momento de marcar el check  */}
        <input
          type="checkbox"
          id={id}
          onChange={onChange}
          // defaultChecked={estado}
          checked={check}
        />
        <small>{item}</small>
      </label>
    </ContenedorCheck>
  );
};
const ComponenteInputFile = ({ cambiarEstado, name, etiqueta, ExpresionRegular, msg }) => {

  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setMensaje(null)
    }, 10000)
  }, [mensaje])


  const onchange = e => {
    if (ExpresionRegular) {
      if (ExpresionRegular.test(e.target.files[0].name)) {
        cambiarEstado(e.target.files[0])  //el valor del campo valido, debe ser una cadena 
        setMensaje(null)
      }
      else {
        toast.error('archivo invalido')
        e.target.value = null
        cambiarEstado(null)
        setMensaje(msg)
      }
    }
  }

  // console.log(estado.campo.name)
  return (
    <div className=" field">
      <label >{etiqueta}
        < input
          type='file'
          className="form-control form-control-sm"
          id={name}
          name={name}
          onChange={onchange}
        />
        <LeyendaError  >{mensaje}</LeyendaError>
      </label>
    </div>
  )
}

const ComponenteSubTitle = ({ etiqueta, contenido, tam = null }) => {


  // console.log(estado.campo.name)
  return (
    <div > <span style={{ fontWeight: '800', fontSize: tam ? `${tam}px` : '10px' }}>{etiqueta ? etiqueta : null}</span>
      <span style={{ whiteSpace: 'nowrap', fontSize: tam ? `${tam}px` : '10px' }}>{contenido}</span>
    </div>
  )
}

const ComponenteSubTitleDecoration = ({ etiqueta, contenido }) => {


  // console.log(estado.campo.name)
  return (
    <div > <span style={{ fontWeight: '800', fontSize: '14px' }}>{etiqueta ? etiqueta : null}</span>
      <span style={{ whiteSpace: 'nowrap', fontSize: '14px' }}>{contenido}</span>
    </div>
  )
}
export {
  ComponenteCheck,
  InputUsuarioStandar, InputUsuarioStandarTable, InputTextArea, ComponenteCheck_, ComponenteInputFile,
  Select1Aux,
  ComponenteInputBuscar_,
  Select1, Select1XL, Select1Easy,
  SelectSM,
  SelectString,
  ComponenteCheckSimple,
  ComponenteCheckXL,
  ComponenteCheckMTM,
  ComponenteInputUserDisabled, ComponenteSubTitle, ComponenteSubTitleDecoration
};
