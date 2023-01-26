import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import Icon_mecanico from "../icons/icon_mecanico";
import Icon_clasificadora from "../icons/icon_clasificadora";
import Icon_encargado from "../icons/icon_encargado";

import { store, actions } from "../../store/flux";
import { Col, Row } from "antd";

export const Roles = () => {
  const { store, actions } = useContext(Context);
  const [role, setRole] = useState("");
  const [icon, setIcon] = useState("");
  const [titulo, setTitulo] = useState("");

  return (
    <>
      <Row justify="center" className="text-center">
      <Col xs={{order: 1, }}
        sm={{order: 2,}}
        md={{order: 3,}}
        lg={{order: 4,}}>
          <div className="mt-1 me-1">
            <div
              className={
                role === "roleClasificadoraGray"
                  ? "roleClasificadoraGreen"
                  : "roleClasificadoraGray"
              }
              onClick={() => {
                setRole("roleClasificadoraGray");
                actions.selectionRoles("clasificadora");
                setIcon("iconClasificadoraGray");
                setTitulo("tituloClasificadoraGray");
              }}
            >
              <Icon_clasificadora
                className={
                  icon === "iconClasificadoraGray"
                    ? "iconClasificadoraGreen"
                    : "iconClasificadoraGray"
                }
              />
              <h1
                className={
                  titulo === "tituloClasificadoraGray"
                    ? "tituloClasificadoraGreen"
                    : "tituloClasificadoraGray"
                }
              >
                Clasificadora
              </h1>
            </div>
          </div>
        </Col>
        <Col xs={{order: 1, }}
        sm={{order: 2,}}
        md={{order: 3,}}
        lg={{order: 4,}}>
          <div className="mt-1 me-1">
            <div
              className={
                role === "roleMecanicoGray"
                  ? "roleMecanicoGreen"
                  : "roleMecanicoGray"
              }
              onClick={() => {
                setRole("roleMecanicoGray");
                actions.selectionRoles("mecanico");
                setIcon("iconMecanicoGray");
                setTitulo("tituloMecanicoGray");
              }}
            >
              <Icon_mecanico
                className={
                  icon === "iconMecanicoGray"
                    ? "iconMecanicoGreen"
                    : "iconMecanicoGray"
                }
              />
              <h1
                className={
                  titulo === "tituloMecanicoGray"
                    ? "tituloMecanicoGreen"
                    : "tituloMecanicoGray"
                }
              >
                Mecánico
              </h1>
            </div>
          </div>
        </Col>
        <Col xs={{order: 1, }}
        sm={{order: 2,}}
        md={{order: 3,}}
        lg={{order: 4,}}>
          <div className="mt-1">
            <div
              className={
                role === "roleEncargadoGray"
                  ? "roleEncargadoGreen"
                  : "roleEncargadoGray"
              }
              onClick={() => {
                setRole("roleEncargadoGray");
                actions.selectionRoles("encargado");
                setIcon("iconEncargadoGray");
                setTitulo("tituloEncargadoGray");
              }}
            >
              <Icon_encargado
                className={
                  icon === "iconEncargadoGray"
                    ? "iconEncargadoGreen"
                    : "iconEncargadoGray"
                }
              />
              <h1
                className={
                  titulo === "tituloEncargadoGray"
                    ? "tituloEncargadoGreen"
                    : "tituloEncargadoGray"
                }
              >
                Encargado
              </h1>
            </div>
          </div>
        </Col>
      </Row>
       
    </>
  );
};
