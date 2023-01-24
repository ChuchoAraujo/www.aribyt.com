import { Col, Row } from "antd";
import React from "react";
import { LoginAdmin } from "../../component/login/LoginAdmin";


export const Vista_Login_Admin = () => {
	return (
    <>
    <Row justify="center">
      <Col md={8} sm={24}>
        <LoginAdmin />
      </Col>
    </Row>
    </>
  );
};
