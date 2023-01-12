import React, { useContext, useEffect, useState } from "react";
import { Callusers } from "./callUsers";
import { FormularioUsuarios } from "./formularioUsuarios";


export const Admin = () => {
    const [users, setUsers]= useState([])
  // ---------------------------- GET / USERS----------------------------------//
  const verTodos = () => {
    console.log("test");
    fetch(process.env.BACKEND_URL + "/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Usuarios:", result);
        setUsers(result)
        // if (!result.done) {
        //   navigate("/");
        // }
      })
      .catch((error) => console.log("error", error));
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
      <Callusers users={users} />
    </div>
  );
};
