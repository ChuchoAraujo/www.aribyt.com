import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Horas } from "../../component/horas/horas";
import "../../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import{ FooterClasificadora } from "../../component/footers/footerClasificadora";
import { Row,Col } from "antd";

export const Vista_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid text-center align-items-start p-2 m-5">
        <Horas />
        <Link to={"/rechazos"}>
          <button className="botonRechazos">------ Rechazos ------</button>
        </Link>
      </div>
      <div className="container-fluid">
<Row justify="center">
  <Col  md={8} sm={24}>
  <FooterClasificadora />
  </Col>
</Row>
</div>


    </>
  );
};
