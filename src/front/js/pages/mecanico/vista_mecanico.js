import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { Horas_mecanico } from "../../component/horas/horas_mecanico";
import "../../../styles/home.css";
import { Footer } from "antd/es/layout/layout";
import { FooterCajas } from "../../component/footers/footerCajas";


export const Vista_mecanico = () => {
  const { store, actions } = useContext(Context);
  

  return (
    <>
      
        <div className="container-fluid  text-center">
          <div className="align-items-start m-5">
            <Horas_mecanico />
          </div>
          <div className="container">
            <FooterCajas/>
          </div>
        </div>
      
    </>
  );
};
