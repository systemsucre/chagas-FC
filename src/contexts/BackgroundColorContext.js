import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "green",
  sedes: "sedes",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.sedes,
  changeColor: (color) => {},
});
