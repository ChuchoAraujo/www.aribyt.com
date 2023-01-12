import React, { useContext, useEffect, useState } from "react";
import { Callusers } from "./callUsers";
import { FormularioUsuarios } from "./formularioUsuarios";
import { Context } from "../../store/appContext";
import { store, actions } from "../../store/flux";


export const Admin = () => {
  const { store , actions} = useContext(Context);
    const [users, setUsers]= useState([])
  // ---------------------------- GET / USERS----------------------------------//
  const verTodos = () => {
    actions.fetchUser()
  };

  return (
    <div className="container-fluid">
      <div className="text-center p-3">
        <h1>Administrador de usuarios</h1>
      </div>
      <div className="text-center p-2">
        <button className="m-2" onClick={verTodos}>
          Ver todo
        </button>

      </div>
      <FormularioUsuarios />
      <Callusers />
    </div>
  );
};
