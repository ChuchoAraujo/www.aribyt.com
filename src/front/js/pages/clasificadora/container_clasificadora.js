import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Formulario_clasificadora } from "../../component/formularios/formulario_clasificadora";
import "../../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { FooterCajas } from "../../component/footers/footerCajas";
import { Col, Row } from "antd";

export const Container_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // ---------------------------- AUTENTIFICACION DEL TOKEN----------------------------------------------------

  return (
    <>
      <div className="container-fluid">
        <Row justify="center">
          <Col md={8} sm={24}>
            <Formulario_clasificadora />
          </Col>
        </Row>
      </div>
    </>
  );
};
