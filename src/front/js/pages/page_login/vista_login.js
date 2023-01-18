import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Page_logo } from "../page_logo/page_logo";
import "../../../styles/home.css";
import { Roles } from "../../component/roles/roles";
import { Login } from "../../component/login/login";
import { FooterHome } from "../../component/footers/footerHome";

export const Vista_login = () => {
  const { store, actions } = useContext(Context);
  // ----------------------- PAGINACION FORMULARIO --------------------------------------//
  const [pagina1, setpagina1] = useState("");
  const [pagina2, setPagina2] = useState("");

  const printCondicitional = () => {
    if (pagina1 === pagina1) {
      setpagina1("visibility");
      setPagina2("hidden");
    } else {
      console.log("nada");
    }
  };

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-3"></div>

        <div className="col-6 d-flex justify-content-center">
          <Roles />
        </div>

        <div className="col-3"></div>
      </div>
      <div className="row">
        <div className="col-3"></div>

        <div className="col-6 d-flex justify-content-center">
          <Login />
        </div>

        <div className="col-3"></div>
      </div>
     <FooterHome className="container-fluid"/>
    </div>
  );
};
