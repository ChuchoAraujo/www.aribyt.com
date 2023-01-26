import React from "react";
import { Formulario_mecanico } from "../../component/formularios/formulario_mecanico";
import { Col, Row } from "antd";

export const Container_mecanico = () => {
  return (
    <>
     <div className="container-fluid">
        <Row justify="center">
          <Col md={8} sm={24}>
            <Formulario_mecanico />
          </Col>
        </Row>
      </div>
    </>
  );
};
