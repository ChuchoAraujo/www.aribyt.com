import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Horas } from "../../component/horas/horas";
import "../../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { FooterCajas } from "../../component/footerCajas";

export const Vista_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();



  return (
    <>
      <div className="container-fluid m-3 text-center align-items-start">
        <Horas />
        <Link to={"/rechazos"}>
          <button className="botonRechazos">------ Rechazos ------</button>
        </Link>
        <FooterCajas/>
      </div>
    </>
  );
};
