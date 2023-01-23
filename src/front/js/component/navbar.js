import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";

export const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("Token eliminado!! me piro vampiro!!");
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark EstiloNav">
    
        <div className="container-fluid">
          <ImHome className="navbar-brand boton_home" />

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
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item enlaceNav">
                <Link to={"/vista_login"}>
                  <a class="nav-link active " aria-current="page">
                    Iniciar sesión
                  </a>
                </Link>
              </li>

              <li class="nav-item">
                <Link to={"/loginAdmin"}>
                  <a class="nav-link" href="#">
                    Admin.
                  </a>
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={logOut}>
                  Cerrar sesión
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
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
