import React, { useContext, useEffect, useState } from "react";
import { Callusers } from "./callUsers";
import { FormularioUsuarios } from "./formularioUsuarios";
import { Context } from "../../store/appContext";
import { store, actions } from "../../store/flux";
import ReactDOM from "react-dom";
import {useNavigate } from "react-router-dom";
import { Col, Row } from "antd";


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
    const { actions} = useContext(Context);
    const[boton,setBoton]=useState(false);
    const[boton1,setBoton1]=useState(false);



  // ---------------------------- GET / USERS----------------------------------//
  const verTodos = () => {
    setBoton1(true)
    setBoton(false)
    actions.fetchUser()
  };

  const agregarUsuario = () => {
       setBoton(true)
       setBoton1(false)
  }

  return (
    localStorage.getItem("token") && (
           <>
           <Row justify="center">
            <Col md={8} sm={24}>
              <div>
              <button className="botonUsers" onClick={verTodos}>
                Ver todo
              </button>
              <button className="botonUsers" onClick={agregarUsuario}>
                Agregar usuario
              </button>
              </div>
              <div>{boton ? <FormularioUsuarios /> : null}</div>
              <div>{boton1 ? <Callusers /> : null } </div>
            </Col>
           </Row>

            </>
    )
  );
};
