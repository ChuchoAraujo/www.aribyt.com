import React from "react";
import { Horas } from "../../component/horas/horas";
import { Link} from "react-router-dom";
import { FooterClasificadora } from "../../component/footers/footerClasificadora";
import { Row, Col, Space} from "antd";
import Modal from "../../component/modal"

export const Vista_clasificadora= () => {

     
  return (
    
    localStorage.getItem("token") &&(
      
    <>
      <div className="pb-3">
        <Row justify="center" className="pb-5 mb-5 ">
          <Col>
            <Horas />
            <Link to={"/rechazos"}>
              <button className="botonRechazos">------ Rechazos ------</button>
            </Link>
            <Modal/>
          </Col>
        </Row>
      </div>
      <FooterClasificadora />
      
    </>
   
  ));
};
