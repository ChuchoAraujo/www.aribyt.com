import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import Icon_mecanico from "../icons/icon_mecanico";
import Icon_clasificadora from "../icons/icon_clasificadora";
import Icon_encargado from "../icons/icon_encargado";
import "../../../styles/home.css";
import { store, actions } from "../../store/flux"

export const Roles = () => {
  const { store, actions } = useContext(Context);
  const [role, setRole] =useState("")
  const [icon, setIcon] = useState("");
  const [nombreIcon, setNombreIcon] = useState("");

  return (
    <div className="container-fluid text-center containerRoles">
      <h3 className="tituloRoles">Selecciona tu área</h3>

      <div className="row containerRoles onLogo">
        <div className="botonRoles col-4">
          <div
            className={
              role === "roleClasificadoraGray"
                ? "roleClasificadoraGreen"
                : "roleClasificadoraGray"
            }
            onClick={() => {
              setRole("roleClasificadoraGray");
              actions.selectionRoles("clasificadora");
              setIcon("iconRoles");
              setNombreIcon("tituloIconGray");
            }}
          >
            {" "}
            <Icon_clasificadora
              className={icon === "iconRoles" ? "iconRoles2" : "iconRoles"}
            />
            <h1 className="tituloRoles">Clasificadora</h1>
          </div>
        </div>

        <div
          className="botonRoles col-4"
          onClick={() => {
            ;
          }}
        >
          <div
            className={
              role === "roleMecanicoGray"
                ? "roleMecanicoGreen"
                : "roleMecanicoGray"
            }
            onClick={() => {
              setRole("roleMecanicoGray")
              actions.selectionRoles("mecanico");}}
          >
            {" "}
            <Icon_mecanico className="iconRoles" />
            <h1 className="tituloRoles">Mecanico</h1>
          </div>
        </div>

        <div
          className="botonRoles col-4"
          onClick={() => {
            actions.selectionRoles("encargado");
          }}
        >
          <div
            className={
              role === "roleEncargadoGray"
                ? "roleEncargadoGreen"
                : "roleEncargadoGray"
            }
            onClick={() => setRole("roleEncargadoGray")}
          >
            {" "}
            <Icon_encargado className="iconRoles" />
            <h1 className="tituloRoles">Encargado</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

