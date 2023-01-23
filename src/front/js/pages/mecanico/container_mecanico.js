import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Formulario_mecanico } from "../../component/formularios/formulario_mecanico";
import "../../../styles/home.css";
import { FooterMecanico } from "../../component/footers/footerMecanico";
import { FooterEncargado } from "../../component/footers/footerEncargado";
import { Col, Row } from "antd";

export const Container_mecanico = () => {
  const { store, actions } = useContext(Context);


  return (
    <>
     <div className="container-fluid">
        <Row justify="center">
          <Col md={8} sm={24}>
            <Formulario_mecanico />
          </Col>
        </Row>
      </div>
      
            <div className="col"></div>
         
          <div className="container-fluid">
            <FooterMecanico />
          </div>
        
    
    </>
  );
};
