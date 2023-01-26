import React from "react";
import { FooterHome } from "../component/footers/footerHome";
import Icon_simbolo from "../component/icons/icon_simbolo";
import Icon_letras from "../component/icons/icon_letras";
import { Col, Row } from "antd";

export const Home = () => {
  return (
    <>
      <div className="pb-5">
        <Row justify="center" className="align-items-center mt-3 mb-5">
          <Col
            xs={{ order: 1 }}
            sm={{ order: 2 }}
            md={{ order: 3 }}
            lg={{ order: 4 }}
          >
            <div className="iconSimbol">
              <Icon_simbolo />
            </div>
          </Col>
          <Col
            xs={{ order: 1 }}
            sm={{ order: 2 }}
            md={{ order: 3 }}
            lg={{ order: 4 }}
          >
            <div className="iconSimbol">
              <Icon_letras />
            </div>
          </Col>
        </Row>
      </div>
      <FooterHome />
    </>
  );
};
