import toast from "react-hot-toast";
import { faCheckCircle, faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import {
  Input,
  LeyendaError,
  SelectStyle,
  SelectSm,
  ContenedorCheck,
  ContenedorCheckXL,
  IconoValidacion,
  InputXS,
} from "./stylos"
import { useEffect, useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap"
import logo from 'assets/img/react-logo.png'
import logo_tratamiento from 'assets/img/logo-tratamiento.png'

import './style.css'
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

const InputUsuario = ({
  estado,
  cambiarEstado,
  name,
  tipo = "text",
  ExpresionRegular,
  msg,
  placeholder,
  etiqueta,
  fecha_max = true,
  importante = true,
  disabled = false
}) => {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() });
  };

  const validacion = () => {
    if (ExpresionRegular) {
      document.getElementById(name).style.display = 'none'
      if (ExpresionRegular.test(estado.campo) && estado.campo != null) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);
      } else {
        // cambiarEstado({ campo: null, valido: "false" });
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
      <label htmlFor={name + 1} style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}>
        {etiqueta}  {importante ? <span style={{ color: 'red' }}>*</span> : null}
      </label>
      {fecha_max ?
        <Input
          type={tipo}
          max={fechaFinal}
          id={name + 1}
          name={name + 1}
          placeholder={placeholder}
          value={estado.campo || ""}
          onChange={onChange}
          onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
          onBlur={validacion} //si presionamos fuera del input
          valido={estado.valido}
          style={{ fontSize: tipo == 'textarea' ? '10.5px' : '11px', Height: tipo == 'textarea' ? '30px' : 'inherit' }}
          disabled={disabled}
        /> :
        <Input
          type={tipo}
          min={fechaFinal}
          id={name + 1}
          name={name + 1}
          placeholder={placeholder}
          value={estado.campo || ""}
          onChange={onChange}
          onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
          onBlur={validacion} //si presionamos fuera del input
          valido={estado.valido}
          style={{ fontSize: tipo == 'textarea' ? '10.5px' : 'inherit', Height: tipo == 'textarea' ? '30px' : 'inherit' }}
          disabled={disabled}
        />}
      {tipo !== 'time' && tipo !== 'date' &&
        <IconoValidacion valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} style={{ right: tipo === 'text' ? '10px' : "30px" }} />}
      <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>

    </FormGroup>


  );
};


const InputUsuarioXS = ({
  estado,
  cambiarEstado,
  name,
  tipo = "text",
  ExpresionRegular,
  msg,
  placeholder,
  etiqueta,
  fecha_max = true,
  importante = true
}) => {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() });
  };

  const validacion = () => {
    if (ExpresionRegular) {
      document.getElementById(name).style.display = 'none'
      if (ExpresionRegular.test(estado.campo) && estado.campo != null) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);
      } else {
        // cambiarEstado({ campo: null, valido: "false" });
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

    <div className="row" >
      <Col className="col-auto" style={{ marginBottom: '0', paddingBottom: '0' }} >
        <label htmlFor={name} style={{ fontSize: '11px', fontWeight: '600', marginTop: '5', paddingTop: '0' }}>
          {etiqueta}  {importante ? <span style={{ color: 'red' }}>*</span> : null}
        </label>
      </Col>
      <Col style={{ width: '100%' }}>
        {fecha_max ?
          <InputXS
            type={tipo}
            max={fechaFinal}
            id={name + 1}
            name={name + 1}
            placeholder={placeholder}
            value={estado.campo || ""}
            onChange={onChange}
            onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
            onBlur={validacion} //si presionamos fuera del input
            valido={estado.valido}
          /> :
          <InputXS
            type={tipo}
            min={fechaFinal}
            id={name + 1}
            name={name + 1}
            placeholder={placeholder}
            value={estado.campo || ""}
            onChange={onChange}
            onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
            onBlur={validacion} //si presionamos fuera del input
            valido={estado.valido}
          />}
        <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>
      </Col>
    </div>
  );
};




const Select1EasyColors = ({
  estado,
  cambiarEstado,
  Name,
  ExpresionRegular,
  lista,
  name,
  funcion = null,
  msg, etiqueta = null,
  nivel = null,
  importante = true
}) => {


  const onChange = (e) => {
    if (ExpresionRegular) {

      if (ExpresionRegular.test(e.value)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        if (funcion) funcion(parseInt(e.value))
        if (nivel) nivel({ campo: parseInt(e.nivel), valido: "true" })
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
        if (nivel) nivel({ campo: parseInt(e.nivel), valido: "true" })

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
  // console.log(lista)

  return (
    <FormGroup>
      <label htmlFor={name} style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}>
        {etiqueta} {importante ? <span style={{ color: 'red' }}>*</span> : null}
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
const InputUsuarioStandarTable = ({
  estado,
  cambiarEstado,
  disponible = true,
  name,
  etiqueta = null
}) => {
  // console.log(estado)
  const onchange = (e) => {
    document.getElementById(name).style.display = 'none'
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
        <label>{etiqueta}</label>
        <input
          id={name}
          className="inputUsuario-tabla"
          value={estado.campo}
          valido={estado.valido}
          onChange={onchange}
        />
        <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>
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
        <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>
      </FormGroup>


  );
};

const InputUsuarioStandarNumeros = ({
  estado,
  cambiarEstado,
  importante = true,
  name,
  etiqueta = null
}) => {
  // console.log(estado)
  const onchange = (e) => {
    document.getElementById(name).style.display = 'none'
    if (!e.target.value) {
      cambiarEstado({ campo: 0, valido: 'true' })
    }
    if (parseInt(e.target.value) >= 0) {
      cambiarEstado({ campo: Math.abs(parseInt(e.target.value)), valido: 'true' })
    }
    else document.getElementById(e.target.id).value = 0;
  };
  return (
    <FormGroup>
      <label htmlFor={name} style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}>
        {etiqueta}  {importante ? <span style={{ color: 'red' }}>*</span> : null}
      </label>
      <Input
        id={name + 1}
        name={name + 1}
        value={estado.campo}
        valido={estado.valido}
        onChange={onchange}
      />
      <label id={name} style={{ display: 'none', color: '#FF3D85', fontSize: '9px', fontWeight: 'bold' }}>Campo Incorrecto</label>
    </FormGroup >
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

    if (!e.target.checked) {
      let indiceEliminar = null;
      admitidos.forEach((x) => {
        if (x == parseInt(e.target.value)) {
          indiceEliminar = admitidos.indexOf(parseInt(e.target.value));
          admitidos.splice(indiceEliminar, 1);
        }
      });
    }
  };

  // console.log(admitidos)

  let check = false;
  admitidos.forEach((e) => {

    if (id === e) check = true;
  });


  return (
    <ContenedorCheck >
      <label style={{ fontSize: '11px', fontWeight: 'bold' }} htmlFor={id + item}>
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
const ComponenteCheckTratamiento = ({ label, label_A, label_B, estado, cambiarEstado, col = 4 }) => {
  return (
    <Col md={col} style={{
      marginBottom: '0', fontSize: '11px', fontWeight: '400', marginRight: '15px', marginTop: '5px',
      border: '1px solid #919191', borderRadius: '4px'
    }}>
      {label}
      <div className='row mt-1' >
        <div className='col-auto'>
          <label style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold', }}>
            {label_A}
            <input
              type='checkbox'
              onChange={(e) => {
                cambiarEstado(e.target.checked)
              }}
              name='mujer_embarazada_si'
              checked={estado}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>
        <div className='col-auto ml-5'>
          <label style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold', marginRight: '15px' }}>{label_B}

            <input
              type='checkbox'
              onChange={(e) => {
                cambiarEstado(!e.target.checked)
              }}
              name='mujer_embarazada_no'
              checked={!estado}
              style={{ marginLeft: '5px' }}

            />
          </label>
        </div>
      </div>
    </Col>
  )
}

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
    habilitado ? <label style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}><input type="checkbox" onChange={onChange} name={name} value={estado} checked={estado} disabled /> {label}</label> :
      <label style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}><input type="checkbox" onChange={onChange} name={name} value={estado} checked={estado} /> {label}</label>
  );
};

const ComponenteInputRadio = ({
  e,
  estado
}) => {

  let check = false;

  const onChange = (event) => {

    if (estado == 'norealizado') {
      e.norealizado = true
      e.indeterminado = 0
      e.negativo = 0
      e.positivo = 0
    }


    if (estado == 'positivo') {
      e.positivo = 1
      e.indeterminado = 2
      e.norealizado = false
      e.negativo = 2
    }
    if (estado == 'negativo') {
      e.negativo = 1
      e.indeterminado = 2
      e.positivo = 2
      e.norealizado = false
    }
    if (estado == 'indeterminado') {
      e.indeterminado = 1
      e.negativo = 2
      e.positivo = 2
      e.norealizado = false
    }

    // }
  };

  if (e.norealizado == 1 && estado == 'norealizado') check = true;
  if (e.positivo == 1 && estado == 'positivo') check = true;
  if (e.negativo == 1 && estado == 'negativo') check = true;
  if (e.indeterminado == 1 && estado == 'indeterminado') check = true;




  return (
    <>
      {/* {e.norealizado + ' ' + e.positivo + ' ' + e.negativo + ' ' + e.indeterminado} */}
      <input type="radio" name={e.value + 1} style={{ width: '100%', }}
        // checked={e.norealizado}
        onChange={onChange}
        defaultChecked={check}
      />
    </>
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
  label = null,
  importante = true
}) => {
  const [mensaje, setMensaje] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setMensaje(null);
    }, 10000);
  }, [mensaje]);

  const onChange = (e = e ? e : e.value = 0) => {
    try {
      cambiarEstado({ campo: parseInt(e.value), valido: "true" });
      if (label) {
        lista.forEach((e) => {
          // console.log(e.value, e.label)
          if (parseInt(e.value) == estado.campo) label({ campo: e.label, valido: 'true' })
        })
      }
    } catch (error) {
      cambiarEstado({ campo: null, valido: null });
    }
  };
  const validacion = (e) => {
    document.getElementById(name).style.display = 'none'
    if (ExpresionRegular) {
      if (ExpresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" }); //el valor del campo valido, debe ser una cadena
        setMensaje(null);

        if (label) {
          lista.forEach((e) => {
            // console.log(e.value, e.label)
            if (parseInt(e.value) == estado.campo) label({ campo: e.label, valido: 'true' })
          })
        }
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);

        if (label) {
          label({ campo: null, valido: null })
        }
      }
    }
  };
  // console.log(lista)
  return (

    <FormGroup>
      <label htmlFor={name} style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}>
        {etiqueta} {importante ? <span style={{ color: 'red' }}>*</span> : null}
      </label>
      <Select
        name={Name}
        options={lista}
        onChange={onChange}
        onBlur={validacion}
        value={lista.find(opt => opt.value === estado.campo) || null}
        placeholder={opcion}
        isSearchable={true}
        isClearable={true}
        className={estado.valido === 'true' ? 'select-valid' : estado.valido === 'false' ? 'select-invalid' : ''}
        styles={{
          control: (base, state) => ({
            ...base,
            height: '33.5px !important',
            paddingTop: '0px',
            fontSize: '11px',
            borderColor: estado.valido === 'true' ? '#1ed12d' : estado.valido === 'false' ? '#dc3545' : base.borderColor,
            '&:hover': {
              borderColor: estado.valido === 'true' ? '#1ed12d' : estado.valido === 'false' ? '#dc3545' : base.borderColor
            }
          })
        }}
      />
      {/* <IconoValidacionSelect valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} /> */}
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
      <label htmlFor={name} style={{ marginBottom: '0' }}>
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

        value={lista.find(opt => opt.value === estado.campo) || null}
        isSearchable={true}
        isClearable={true}
        className={estado.valido === 'true' ? 'select-valid' : estado.valido === 'false' ? 'select-invalid' : ''}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: estado.valido === 'true' ? '#1ed12d' : estado.valido === 'false' ? '#dc3545' : base.borderColor,
            '&:hover': {
              borderColor: estado.valido === 'true' ? '#1ed12d' : estado.valido === 'false' ? '#dc3545' : base.borderColor
            }
          })
        }}
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
  importante = true,
  label = null
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
        if (label) {
          lista.forEach((e) => {
            // console.log(e.value, e.label)
            if (parseInt(e.value) == estado.campo) label({ campo: e.label||null, valido: 'true' })
          })
        }
        if (funcion) funcion(parseInt(e.target.value))
      } else {
        cambiarEstado({ ...estado, valido: "false" });
        setMensaje(msg);
        if (label) {
          label({ campo: null, valido: null })
        }
      }
    }
  };
  // console.log(lista)
  return (

    <FormGroup>
      <label htmlFor={name} style={{ marginBottom: '0', fontSize: '11px', fontWeight: 'bold' }}>
        {etiqueta} {importante ? <span style={{ color: 'red' }}>*</span> : null}
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
        <option>{opcion}</option>
        {lista.map((r) => (
          <option
            key={r.value}
            value={r.value}
          >
            {r.label}
          </option>
        ))}
      </Input>
      {/* <IconoValidacionSelect valido={estado.valido} icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} /> */}
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
    <Col md={4}>
      <FormGroup >

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
          style={{ marginLeft: '5px' }}
        />

        <IconoValidacion icon={faSearch} valido={"true"} onClick={() => eventoBoton()} className="icon-input" />
      </FormGroup>
    </Col>
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

const CabeceraFormularios = ({ nombre }) => {

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <Col md={2}>
              <img src={logo} style={{ height: '100px', width: '200px', padding: '.8rem' }} />
            </Col>
            <Col md={8} style={{ padding: '.8rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', }} >
              <p className="text-center" style={{ color: '#f5365c', fontWeight: '800', fontSize: '25px' }}> {nombre}</p>
            </Col>
            <Col md={2}>
            </Col>
          </div>
          <div className="text-primary" data={color}></div>
          <p style={{ fontWeight: '600', fontSize: '10px', }} className="text-institucional" data={color}>SERVICIO DEPARTAMENTAL DE SALUD DE CHUQUISACA</p>
        </>
      )}
    </BackgroundColorContext.Consumer>
  )
}

const CabeceraFormulariosTratamiento = () => {

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <Col md={3}>
              <img src={logo_tratamiento} style={{ height: '100px', width: '270px', padding: '.8rem' }} />
            </Col>
            <Col md={6} style={{ padding: '.8rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', }} >
              <p className="text-center" style={{ fontWeight: '500', fontSize: '20px', marginBottom: '0' }}>
                {"VIGILANCIA EPIDEMIOLOGICA DE ENFERMEDADES TRANSMITIDAS POR VECTORES"}
                <p className="text-center" style={{ fontWeight: '700', fontSize: '20px', marginBottom: '0' }}>
                  {" FICHA EPIDEMIOLÓGICA DE CHAGAS"}
                </p>
              </p>


            </Col>
            <Col md={3}>

            </Col>
          </div>
          <div className="text-primary" data={color}></div>
          <p style={{ fontWeight: '600', fontSize: '10px', }} className="text-institucional" data={color}>SERVICIO DEPARTAMENTAL DE SALUD DE CHUQUISACA</p>
        </>
      )}
    </BackgroundColorContext.Consumer>
  )
}
export {
  ComponenteCheck, ComponenteInputRadio,
  InputUsuario, InputUsuarioXS, InputUsuarioStandarTable, InputTextArea, ComponenteCheck_, ComponenteCheckTratamiento, ComponenteInputFile, CabeceraFormulariosTratamiento,
  Select1Aux, InputUsuarioStandarNumeros,
  ComponenteInputBuscar_,
  Select1, Select1XL, Select1Easy,
  SelectSM,
  SelectString,
  ComponenteCheckSimple,
  ComponenteCheckXL,
  ComponenteCheckMTM,
  ComponenteInputUserDisabled, ComponenteSubTitle, ComponenteSubTitleDecoration, Select1EasyColors,
  CabeceraFormularios
};
