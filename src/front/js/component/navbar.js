import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";

export const Navbar = () => {
  const navigate = useNavigate();
  const [inicio, setInicio]= useState("")
  const [cerrar, setCerrar] = useState("");

useEffect(() => {
  if (localStorage.getItem("token")) {
    setInicio("visible nav-item enlaceNav");
    setCerrar("esconder nav-item enlaceNav");
  } if (!localStorage.getItem("token")) {
    setInicio("esconder nav-item enlaceNav");
    setCerrar("visible nav-item enlaceNav");
  }
}, localStorage.getItem("token"));
   

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark EstiloNav">
        <div className="container-fluid">
          <Link to={"/"}>
            <ImHome className="navbar-brand boton_home" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toogle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className={
                  inicio === "visible nav-item enlaceNav"
                    ? "esconder nav-item enlaceNav"
                    : "visible nav-item enlaceNav"
                }
              >
                <Link to={"/vista_login"}>
                  <a className="nav-link active " aria-current="page">
                    Iniciar sesión
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/loginAdmin"}>
                  <a class="nav-link" href="#">
                    Admin.
                  </a>
                </Link>
              </li>
              <li
                className={
                  cerrar === "esconder nav-item enlaceNav"
                    ? "visible nav-item enlaceNav"
                    : "esconder nav-item enlaceNav"
                }
              >
                <a className="nav-link" href="#" onClick={logOut}>
                  Cerrar sesión
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
