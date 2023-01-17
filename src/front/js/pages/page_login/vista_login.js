import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Page_logo } from "../page_logo/page_logo";
import "../../../styles/home.css";
import { Roles } from "../../component/roles/roles";
import { Login } from "../../component/login/login";

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
        <div className="col-1"></div>

        <div className="col-10">
          <div className={pagina1 === "visibility" ? "hidden" : "visibility"}>
            <Roles />
            <button
              className="botonRolesSiguiente"
              onClick={printCondicitional}
            >
              Siguiente
            </button>
          </div>
          <div className={pagina2 === "hidden" ? "visibility" : "hidden"}>
            <Login />
            <button
              className="botonRolesVolver"
              onClick={printCondicitional}
            >
              Volver
            </button>
          </div>
        </div>

        <div className="col-1"></div>
      </div>
    </div>
  );
};
