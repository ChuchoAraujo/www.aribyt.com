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
      <nav className="navbar bg-body-tertiary EstiloNav">
        <div className="container-fluid row">
          <div className="col-1 text-center">
            <Link to="/">
              <ImHome className="boton_home" />
            </Link>
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col-2 text-center">
            <div className="dropdown">
              <button
                className="dropdown-toggle botonUsuarios"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuarios
              </button>

              <ul className="dropdown-menu">
                <li className="dropdownTexto">
                  <Link to={"/vista_login"} className="dropdownTexto">
                    <p className="dropdown-item dropdownTexto">
                      <FaUserCircle className="me-2" />
                      Iniciar sesión
                    </p>
                  </Link>
                </li>
                <li>
                  <p className="dropdown-item dropdownTexto" onClick={logOut}>
                    <BsFillDoorClosedFill className="me-2" />
                    Cerrar sesión
                  </p>
                </li>
                <li>
                  <a className="dropdown-item dropdownTexto">
                    <IoIosHelpCircle className="me-2" />
                    Ayuda
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
