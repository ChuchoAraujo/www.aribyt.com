import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Formulario_clasificadora } from "../../component/formularios/formulario_clasificadora";
import "../../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { FooterCajas } from "../../component/footers/footerCajas";

export const Container_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // ---------------------------- AUTENTIFICACION DEL TOKEN----------------------------------------------------

  return (
    <>
      <div className="container-fluid text-center align-items-start row">
        <div className="col"></div>
        <div className="col-9 marginFormClasificadora">
          <Formulario_clasificadora />
        </div>
        <div className="col"></div>
        <FooterCajas />
      </div>
    </>
  );
};
