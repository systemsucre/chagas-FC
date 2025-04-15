import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { LOCAL_URL, URL } from "./config";
import React from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  useEffect(() => {
    async function check() {
      try {
        localStorage.setItem("user", JSON.stringify(user)); 
      } catch (error) {
        const token = localStorage.getItem("token");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tiempo");
        axios.post(URL + "/logout", { token: token });
        // return <Redirect to = '/' />
        window.location.href = LOCAL_URL;
      }
    }
    check();
    return;
  }, [user]);

  ///////////////////////////////////////////////////////////////

  let altura = window.innerHeight;
  let cantidad = 6;
  const asientos = [];
  if (altura > 700) cantidad = 8;
  if (altura > 850) cantidad = 10;
  if (altura > 1100) cantidad = 16;
  if (altura > 1250) cantidad = 23;
  const contextValue = {
    user,
    logout() {
      console.log("se aplico logout");
      const token = localStorage.getItem("token");
      setUser(null);
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");
      localStorage.removeItem("tiempo");
      localStorage.removeItem("numRol");
      localStorage.removeItem("id-municipio");
      localStorage.removeItem("id-comunidad");
      axios.post(URL + "/logout", { token: token });
      window.location.href = LOCAL_URL+"/";
    },

    login(ok) {
      setUser(ok);
    },

    isLogged() {
      return !!user;
    },
    cantidad,
    asientos,
  };
  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};
export default AuthProvider;
