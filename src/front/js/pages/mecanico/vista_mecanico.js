import React from "react";
import { Horas_mecanico } from "../../component/horas/horas_mecanico";
import { FooterMecanico } from "../../component/footers/footerMecanico";
import { Col, Row } from "antd";


export const Vista_mecanico = () => {

  

  return (
    <>
      
        <div className=" text-center pb-5 mb-5">
          <Row justify="center" className="pb-5 mb-5">
            <Col>
            <Horas_mecanico />
            </Col>
          </Row>
        </div>
        <FooterMecanico/>
    </>
  );
};
