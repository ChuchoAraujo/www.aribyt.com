import React from "react";
import { Roles } from "../../component/roles/roles";
import { Login } from "../../component/login/login";
import { FooterHome } from "../../component/footers/footerHome";
import { Col, Row } from "antd";

export const Vista_login = () => {
  // ----------------------- PAGINACION FORMULARIO --------------------------------------//
  return (
    <>
      <Row justify="center" className="py-5">
        <Col>
          <Roles />
          <Login />
        </Col>
      </Row>
      <FooterHome />
    </>
  );
};
