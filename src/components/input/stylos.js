import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Input as InputR,  } from "reactstrap";

const colores = {
  color: "#555555",
  error: "#FF3D85",
  exito: "#17a2b8",

  bordeXL:"#2980b9", 
  // "#28a745",
  colorFocus: "#0d6efd",
  encabezado: "#006572",
  borde: "rgb(218,220,224)",

};

const InputXL = styled(InputR)`
  border:2px solid ${colores.bordeXL} !important;
  color:${colores.color};
  transition: all .3s;
  &:focus {
    border: 2px solid ${colores.colorFocus} !important;
    transition: 0.3s ease-in-out all;
  }
  ${(props) =>
    props.valido === "true" &&
    css`
    border:2px solid ${colores.bordeXL};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 2px solid ${colores.error} !important;
    `}
`;

const Input = styled(InputR)`
  border:1px solid ${colores.bordeXL} !important;
  color:${colores.color};
  transition: all .3s;
  &:focus {
    border: 1px solid ${colores.colorFocus} !important;
    transition: 0.3s ease-in-out all;
  }
  ${(props) =>
    props.valido === "true" &&
    css`
    border:1px solid ${colores.borde};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 1px solid ${colores.error} !important;
    `}
`;



const SelectStyle = styled.select`
  padding:0px 25px 0px 2px;
  border:1px solid ${colores.borde};

  ${(props) =>
    props.valido === "true" &&
    css`
    border:1px solid ${colores.borde};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 1px solid ${colores.error} !important;
    `}
`;


const IconoValidacion = styled(FontAwesomeIcon)`

    position:absolute;
    right:10px;
    bottom:10px;
    z-index:100;
    font-size:16px;
    opacity:0;
    ${(props) =>
    props.valido === "true" &&
    css`
        color : ${colores.exito};
        opacity:1;
      `}
      ${(props) =>
    props.valido === "false" &&
    css`
          color : ${colores.error};
          opacity:1;
        `}

`

const IconoValidacionSelect = styled(FontAwesomeIcon)`

    position:absolute;
    right:20px;
    bottom:10px;
    z-index:100;
    font-size:16px;
    opacity:0;
    ${(props) =>
    props.valido === "true" &&
    css`
        color : ${colores.exito};
        opacity:1;
      `}
      ${(props) =>
    props.valido === "false" &&
    css`
          color : ${colores.error};
          opacity:1;
        `}

`




const InputBuscador = styled.input` 
  width: 100%;
  padding: 0.45rem 1rem;
  background: transparent;
  border: 2px solid ${colores.borde};
  border-radius: 8px;
  color: ${colores.color};
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colores.colorFocus}80;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:focus {
    outline: none;
    border-color: ${colores.colorFocus};
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${colores.color}80;
    font-style: italic;
  }
  ${(props) =>
    props.valido === "true" &&
    css`
      border:1px solid ${colores.borde};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
       border: 1px solid ${colores.error} !important;
    `}
  }
`;

const InputTextArea_ = styled.textarea`


  ${(props) =>
    props.valido === "true" &&
    css`
    border:1px solid ${colores.bordes};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 1px solid ${colores.error} !important;
    `}
`;



const ContenedorCheck = styled.div`
  grid-column: span 2; // abarca dos columnas
  input {
    margin-right: 5px; //para separar el parrafo de la casilla check
  }

  @media (max-width: 800px) {
    //en dispositivos pequeños se dapatara a una columna
    grid-column: span 1;
  }
`;



































const LeyendaError = styled.span`
  font-family: Roboto, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 0.3px;
  margin:0;
  text-align: left; 
  position: absolute;
  font-size: 11px;
  color: ${colores.error};

  ${(props) =>
    props.valido === "true" &&
    css`
      display: none;
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      display: block;
    `}
`;





const SelectSm = styled.select`
width: 100%;
border:1px solid ${colores.bordes};
transition: all .3s;
padding:0px 25px 0px 2px;
border-radius:3px;
  &:focus {
    border: 2px solid ${colores.colorFocus};
    transition: 0.3s ease-in-out all;
  }
  ${(props) =>
    props.valido === "true" &&
    css`
    border:1px solid ${colores.bordes};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 2px solid ${colores.error} !important;
    `}
    @media(max-width:400px) {
    font-size: 11px;
  }
  @media (max-width: 300px) {
    font-size: 11px;
  }
`;

const ContenedorCheckXL = styled.div`
  margin: 0px;
  padding: 0px;
  height: auto;
  width: 100%;
  font-weight: bold;
  grid-column: span 2; // abarca dos columnas
  input {
    margin-right: 5px; //para separar el parrafo de la casilla check
  }

  @media (max-width: 800px) {
    //en dispositivos pequeños se dapatara a una columna
    grid-column: span 1;
  }
`;

const ContenedorPlanta = styled.div`
    margin:auto;
    width: ${(props) => props.ancho}%; 
    
    // transform: rotate(90deg);
`;

const ContenedorAsiento = styled.div`
  // border: 1px solid ${colores.bordes};
  border-radius:4px;
  margin: auto;
  text-align: center;
  font-size: 10px;
  transition: all .3s;
  // margin-top:.1rem;
  margin-top:${(props) => props.margin ? props.margin : 0.1}rem; 
  // background:red;
  padding-left:0;
  padding-right: 0;
  width: ${(props) => props.columnas}%; 
  height: ${(props) => props.alto}px;
`;


const ContenedorAsiento1 = styled.div`
  border: 1px solid ${colores.bordes};
  border-radius:4px;
  margin: auto;
  text-align: center;
  font-size: 10px;
  margin-top:.1rem;
  padding-left:0;
  padding-right: 0;
  width: ${(props) => props.columnas}%; 
  height: ${(props) => props.alto}px;
`;
const Inputfecha = styled.input` 
transition: all .3s;
height:35px;
border-radius:3px;
border:1px solid ${colores.bordes};
width: 100%;
  &:focus {
    border: 2px solid ${colores.colorFocus};
    transition: 0.3s ease-in-out all;
  }
  ${(props) =>
    props.valido === "true" &&
    css`
    border:1px solid ${colores.bordes};
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 2px solid ${colores.error} !important;
    `}
`;
const GrupoInput = styled.div`
    position:relative;
    z-index:90
`;


export {
  Input, InputTextArea_,
  LeyendaError,
  InputBuscador,
  SelectStyle,
  ContenedorCheck,
  SelectSm,
  ContenedorCheckXL,
  ContenedorPlanta,
  ContenedorAsiento,
  ContenedorAsiento1, Inputfecha,
  GrupoInput,
  IconoValidacion, IconoValidacionSelect, InputXL
};
