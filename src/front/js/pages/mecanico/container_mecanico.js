import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Formulario_mecanico } from "../../component/formularios/formulario_mecanico";
import "../../../styles/home.css";
import { FooterMecanico } from "../../component/footers/footerMecanico";


export const Container_mecanico = () => {
  const { store, actions } = useContext(Context);


  return (
    <>
      <div>
        <div className="container  text-center">
          <div className="row align-items-start">
            <div className="col"></div>
            <div className="col-9 formMecanico">
              <Formulario_mecanico />
            </div>
            <div className="col"></div>
          </div>
          <div className="container-fluid">
            <FooterMecanico />
          </div>
        </div>
      </div>
    </>
  );
};
