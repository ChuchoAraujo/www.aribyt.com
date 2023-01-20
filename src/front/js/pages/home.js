import React from "react";
import { FooterHome } from "../component/footers/footerHome";
import Icon_simbolo from "../component/icons/icon_simbolo";
import Icon_letras from "../component/icons/icon_letras";

export const Home = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="row containerLogos">
          <div className="iconSimbol col-md-6 d-flex justify-content-center">
            <Icon_simbolo />
          </div>
          <div className="iconSimbol col-md-6 d-flex justify-content-center">
            <Icon_letras />
          </div>
        </div>
      </div>
      <FooterHome />
    </>
  );
};
