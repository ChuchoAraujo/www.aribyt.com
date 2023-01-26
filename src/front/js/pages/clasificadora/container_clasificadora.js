import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Formulario_clasificadora } from "../../component/formularios/formulario_clasificadora";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

export const Container_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // ---------------------------- AUTENTIFICACION DEL TOKEN----------------------------------------------------

  return (
    <>
        <Row justify="center">
          <Col md={8} sm={24}>
            <Formulario_clasificadora />
          </Col>
        </Row>
    </>
  );
};
