import React, { Component, useState, useContext } from "react";
import { store, actions } from "../store/flux";
import { Context } from "../store/appContext";


export const FooterCajas = () => {
    const { store, actions } = useContext(Context);
    
return (
  <div className="bg-secondary container-fluid text-center">
    <footer className="mt-4">
      <div>
        <h1>Suma de las cajas {store.contadorCajas}</h1>
      </div>
    </footer>
  </div>
);
}


