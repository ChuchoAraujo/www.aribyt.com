import React, { Component, useState, useContext, useEffect } from "react";
import { store, actions } from "../../store/flux";
import { Context } from "../../store/appContext";
import Icon_Clasificadora from "../icons/icon_clasificadora"

export const FooterCajas = () => {
  const { store, actions } = useContext(Context);
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let fechaFinal = `${day}/${month}/${year}`;
  


  return (
    <div className="container-fluid footerCajas">
      <footer className="mt-4">
        <div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-1 d-flex justify-content-center d-flex align-items-center">
              <Icon_Clasificadora width={80} />
            </div>
            <div className="col text-start d-flex align-items-center">
              <h4>Turno: {store.role}</h4>
            </div>
            <div className="col text-start d-flex align-items-center">
              <h4>Fecha: {fechaFinal}</h4>
            </div>
            <div className="col"></div>
            <div className="col-3 d-flex align-items-center">
              {" "}
              <h4>Suma de las cajas {store.contadorCajas}</h4>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
