import React, { Component, useState, useContext, useEffect } from "react";
import { store, actions } from "../../store/flux";
import { Context } from "../../store/appContext";
import Icon_Mecanico from "../icons/icon_mecanico";

export const FooterMecanico = () => {
  const { store, actions } = useContext(Context);
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let fechaFinal = `${day}/${month}/${year}`;

 return (
   <div className="container-fluid text-center footer ">
      <footer className="mt-4">
        <div>
          <div className="align-items-center">
            <div className="col-2 ">
            <Icon_Mecanico width={80} />hola
            </div>
            <div className="col">
              <h4>Rol: {store.role}</h4>
            </div>
            <div className="col ">
              <h4>Fecha: {fechaFinal}</h4>
            </div>
            <div className="col">
              <h4>Hora: {store.horamec}</h4>
            </div>
            <div className="col-3 text-start">
              {" "}
              <h4>Suma de las cajas {store.contadorCajas}</h4>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
