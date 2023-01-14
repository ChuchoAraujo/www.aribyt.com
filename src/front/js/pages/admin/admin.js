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
    const [users, setUsers]= useState([])
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
      <div className="container-fluid">
        <div className="text-center p-3">
          <h1>Administrador de usuarios</h1>
        </div>
        <div className="text-center p-2">
          <button className="m-2" onClick={verTodos}>
            Ver todo
          </button>
          <button className="m-2" onClick={agregarUsuario}>
            Agregar usuario
          </button>
        </div>
        <div>{boton ? <FormularioUsuarios /> : null}</div>

        <div>
          <Callusers />
        </div>
      </div>
    )
  );
};
