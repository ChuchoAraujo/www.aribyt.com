import React, { useContext, useEffect, useState } from "react";
import { Callusers } from "./callUsers";
import { FormularioUsuarios } from "./formularioUsuarios";
import { Context } from "../../store/appContext";
import { store, actions } from "../../store/flux";
import ReactDOM from "react-dom";
import {useNavigate } from "react-router-dom";


export const  Admin = () => {
  const navigate = useNavigate();
        // ---------------------------- GET / AREA PRIVADA----------------------------------//
         useEffect(() => {
         fetch(process.env.BACKEND_URL + "/api/administrador", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("resultado", result);
              if (!result.current_user) {
                navigate("/");
                alert("vete de aqui intruso!!!")
              }
            })
            .catch((error) => console.log("error", error));
        }, []);
    const { store , actions} = useContext(Context);
    const[boton,setBoton]=useState(false);
     const [pagina1, setpagina1] = useState("");
     const [pagina2, setPagina2] = useState("");

      const printCondicitional = () => {
        if (pagina1 === pagina1) {
          setpagina1("visibility");
          setPagina2("hidden");
        } else {
          console.log("nada");
        }
      };
  // ---------------------------- GET / USERS----------------------------------//
  const verTodos = () => {
    actions.fetchUser()
  };

  const agregarUsuario = () => {
       setBoton(true)
  }

  return (
    localStorage.getItem("token") && (
      <div className="container-fluid containerAdmin">
        <div className="row">
          <div className="col-2"></div>

          <div className="col-8">
            <div className="text-center p-3">
              <h1 className="tituloAdmin">--- Administrador de usuarios ---</h1>
            </div>
            <div className="text-center p-2">
              <button className="botonUsers" onClick={verTodos}>
                Ver todo
              </button>
              <button className="botonUsers2" onClick={agregarUsuario}>
                Agregar usuario
              </button>
            </div>
          </div>

          <div className="col-2"></div>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">{boton ? <FormularioUsuarios /> : null}</div>
          <div className="col-3"></div>
        </div>

        <div className="container row">
          <div className="col-12">
            <Callusers />
          </div>
        </div>
      </div>
    )
  );
};
