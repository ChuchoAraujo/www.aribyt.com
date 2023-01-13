import React from "react";
import "../../../styles/home.css";
import { LoginAdmin } from "../../component/login/LoginAdmin";


export const Vista_Login_Admin = () => {




	return (
    <div className="container-fluid text-center pageLogin">
      <div className="row containerRoles">
        <div className="col-3"></div>
        <div className="paginaLogo col-6">
          icono encargado
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-4"></div>
        <div className="paginaLogo col-4">
          <LoginAdmin />
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};
