import React, { useContext, useEffect, useState } from "react";
import { Callusers } from "./callUsers";
import { FormularioUsuarios } from "./formularioUsuarios";
import { Context } from "../../store/appContext";
import { store, actions } from "../../store/flux";
import ReactDOM from "react-dom";


export const Admin = () => {
  const { store , actions} = useContext(Context);
    const [users, setUsers]= useState([])
    const[boton,setBoton]=useState(false);
  // ---------------------------- GET / USERS----------------------------------//
  const verTodos = () => {
    actions.fetchUser()
  };

  const agregarUsuario = () => {
       setBoton(true)
  }

  return (
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
      <div>{boton ? <FormularioUsuarios/> : null}</div>
      <Callusers />
    </div>
  );
};
