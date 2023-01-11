import React, { useState } from "react";
import { Context } from "../../store/appContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-date-picker";
import { AiOutlineEye } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import "../../../styles/calendar.css";
import "../../../styles/home.css";

export const Vista_encargado = () => {
  const [resultJoin, setResultJoin] = useState([]);
  const [resultMecanico, setResultMecanido] = useState([]);

  const [turno, setTurno] = useState("");
  const [fecha, setFecha] = useState("");
  const [enviarFormulario, setFormulario] = useState(false);
  const [role, setRole] = useState("");
  const [botonHoraClasificadora, setBotonHoraClasificadora] = useState("");
  const [botonUsername, setBotonUsername] = useState("");
  const [botonFecha, setBotonFecha] = useState("");
  const [botonCajas, setBotonCajas] = useState("");
  const [botonArticulo, setBotonArticulo] = useState("");
  const [botonLote, setBotonLote] = useState("");
  const [botonJaulas, setBotonJaulas] = useState("");
  const [botonPedido, setBotonPedido] = useState("");
  const [botonPersonal, setBotonPersonal] = useState("");
  const [botonProblemaClasificadora, setBotonProblemaClasificadora] =
    useState("");
  const [botonAccionClasificadora, setBotonAccionClasificadora] = useState("");
  const [botonTiempo, setBotonTiempo] = useState("");
  const [botonVelocidad, setBotonVelocidad] = useState("");
  const [botonGramos, setBotonGramos] = useState("");

  // ----------------- FECHA ----------------
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  let day = fechaSeleccionada.getDate();
  let month = fechaSeleccionada.getMonth() + 1;
  let year = fechaSeleccionada.getFullYear();
  let fechaConvertida = `${month}/${day}/${year}`;

  const sendDataEncargado = () => {
    fetch(process.env.BACKEND_URL + "/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fecha: fecha,
        turno: turno,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setResultJoin(result.clasificadora);
        setResultMecanido(result.mecanico);
      })
      .catch((error) => console.log("error", error));
  };
  // ------FUNCIONES MOSTRAR Y OCULTAR ----------------------
  // USERNAME
  const ocultarUsername = () => {
    setBotonUsername("botonVisible");
  };
  const mostrarUsername = () => {
    setBotonUsername("botonEsconder");
  };
  // FECHA
  const ocultarFecha = () => {
    setBotonFecha("botonVisible");
  };
  const mostrarFecha = () => {
    setBotonFecha("botonEsconder");
  };
  // CAJAS
  const ocultarCajas = () => {
    setBotonCajas("botonVisible");
  };
  const mostrarCajas = () => {
    setBotonCajas("botonEsconder");
  };
  // ARTICULO
  const ocultarArticulo = () => {
    setBotonArticulo("botonVisible");
  };
  const mostrarArticulo = () => {
    setBotonArticulo("botonEsconder");
  };
  // LOTE
  const ocultarLote = () => {
    setBotonLote("botonVisible");
  };
  const mostrarLote = () => {
    setBotonLote("botonEsconder");
  };
  // HORA CLASIFICADORA
  const ocultarHoraClasificadora = () => {
    setBotonHoraClasificadora("botonVisible");
  };
  const mostrarHoraClasificadora = () => {
    setBotonHoraClasificadora("botonEsconder");
  };
  // JAULAS
  const ocultarJaulas = () => {
    setBotonJaulas("botonVisible");
  };
  const mostrarJaulas = () => {
    setBotonJaulas("botonEsconder");
  };
  // PEDIDO
  const ocultarPedido = () => {
    setBotonPedido("botonVisible");
  };
  const mostrarPedido = () => {
    setBotonPedido("botonEsconder");
  };
  // PERSONAL
  const ocultarPersonal = () => {
    setBotonPersonal("botonVisible");
  };
  const mostrarPersonal = () => {
    setBotonPersonal("botonEsconder");
  };
  // PROBLEMA CLASIFICADORA
  const ocultarProblemaClasificadora = () => {
    setBotonProblemaClasificadora("botonVisible");
  };
  const mostrarProblemaClasificadora = () => {
    setBotonProblemaClasificadora("botonEsconder");
  };
  // ACCION CLASIFICADORA
  const ocultarAccionClasificadora = () => {
    setBotonAccionClasificadora("botonVisible");
  };
  const mostrarAccionClasificadora = () => {
    setBotonAccionClasificadora("botonEsconder");
  };
  // Tiempo
  const ocultarTiempo = () => {
    setBotonTiempo("botonVisible");
  };
  const mostrarTiempo = () => {
    setBotonTiempo("botonEsconder");
  };
  // VELOCIDAD
  const ocultarVelocidad = () => {
    setBotonVelocidad("botonVisible");
  };
  const mostrarVelocidad = () => {
    setBotonVelocidad("botonEsconder");
  };
  // GRAMOS
  const ocultarGramos = () => {
    setBotonGramos("botonVisible");
  };
  const mostrarGramos = () => {
    setBotonGramos("botonEsconder");
  };

  return (
    <>
      <Formik
        initialValues={{
          turno: "",
          fecha: "",
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
          setFormulario(true);
          setTurno(valores.turno);
          setFecha(valores.fecha);
          setTimeout(() => setFormulario(false), 5000);
        }}
      >
        {() => (
          <Form className="formularioEncargado">
            <div className="text-center p-2">
              <h4>--- Turnos ---</h4>
              <button
                onClick={(e) => {
                  setTurno(e.target.value), setRole("seleccionNocheTardeGris");
                }}
                type="button"
                name="turno"
                id="turno"
                value="mañana"
                className={
                  role === "seleccionNocheTardeGris"
                    ? "seleccionTurnoNocheVerde"
                    : "seleccionTurnoNocheGris"
                }
              >
                Mañana
              </button>

              <button
                onClick={(e) => {
                  setTurno(e.target.value), setRole("seleccionTurnoTardeGris");
                }}
                type="button"
                name="turno"
                id="turno"
                value="tarde"
                className={
                  role === "seleccionTurnoTardeGris"
                    ? "seleccionTurnoTardeVerde"
                    : "seleccionTurnoTardeGris"
                }
              >
                tarde
              </button>

              <button
                onClick={(e) => {
                  setTurno(e.target.value), setRole("seleccionTurnoMañanaGris");
                }}
                type="button"
                name="turno"
                id="turno"
                value="noche"
                className={
                  role === "seleccionTurnoMañanaGris"
                    ? "seleccionTurnoMañanaVerde"
                    : "seleccionTurnoMañanaGris"
                }
              >
                noche
              </button>
            </div>
            {/*----------------------FECHA MUI-------------------*/}
            <div className="text-center">
              <h4>--- Fecha ---</h4>
              <DatePicker
                id="calendar"
                onChange={setFechaSeleccionada}
                value={fechaSeleccionada}
                calendarClassName="react-calendar"
                // tyle={{ backgroundColor: fff }}
              />
            </div>
            {/*----------------------FeNVIO DATOS-------------------*/}
            <div className="text-center botonSagrado">
              <button onClick={setFecha(fechaConvertida)}>Click</button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button type="submit" onClick={sendDataEncargado}>
                Enviar
              </button>
            </div>
            <div>
              {enviarFormulario && (
                <div
                  className="alert alert-success text-center"
                  width={200}
                  role="alert"
                >
                  Filtros aplicados con éxito!
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <div className="row m-4">
        {/*-------------------Filtro lote---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Hora Clasificadora</h6>
              <button
                onClick={mostrarHoraClasificadora}
                className="iconBotonAgregar"
              >
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button
                onClick={ocultarHoraClasificadora}
                className="iconBotonEliminar"
              >
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro username---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>UserName</h6>
              <button onClick={mostrarUsername} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarUsername} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro fecha---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Fecha</h6>
              <button onClick={mostrarFecha} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarFecha} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro cajas---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Cajas</h6>
              <button onClick={mostrarCajas} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarCajas} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro articulo---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Artículo</h6>
              <button onClick={mostrarArticulo} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarArticulo} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro lote---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Lote</h6>
              <button onClick={mostrarLote} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarLote} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro jaulas---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Jaulas</h6>
              <button onClick={mostrarJaulas} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarJaulas} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro pedido---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Pedido</h6>
              <button onClick={mostrarPedido} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarPedido} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro personal---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Personal</h6>
              <button onClick={mostrarPersonal} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarPersonal} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro problema clasificadora---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Problema clasificadora</h6>
              <button
                onClick={mostrarProblemaClasificadora}
                className="iconBotonAgregar"
              >
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button
                onClick={ocultarProblemaClasificadora}
                className="iconBotonEliminar"
              >
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro Acción clasificadora---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Acción clasificadora</h6>
              <button
                onClick={mostrarAccionClasificadora}
                className="iconBotonAgregar"
              >
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button
                onClick={ocultarAccionClasificadora}
                className="iconBotonEliminar"
              >
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro tiempo---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Tiempo</h6>
              <button onClick={mostrarTiempo} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarTiempo} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro Velocidad---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Velocidad</h6>
              <button onClick={mostrarVelocidad} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarVelocidad} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
        {/*-------------------Filtro gramos---------------*/}
        <div className="col-1 text-center">
          <div className="card">
            <div className="card-body">
              <h6>Gramos</h6>
              <button onClick={mostrarGramos} className="iconBotonAgregar">
                <AiOutlineEye className="iconFiltro" />
              </button>
              <button onClick={ocultarGramos} className="iconBotonEliminar">
                <TiDeleteOutline className="iconFiltro" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid text-center p-5">
        <h4 className="p-2"> --- Filtros avanzados ---</h4>
        <table className="table p-2">
          <thead className="tableColor">
            <tr>
              <th
                scope="col"
                className={
                  botonHoraClasificadora === "botonVisible"
                    ? "botonEsconder"
                    : ""
                }
              >
                hora clasificadora
              </th>
              <th
                scope="col"
                className={
                  botonUsername === "botonVisible" ? "botonEsconder" : ""
                }
              >
                UserName Clasificadora
              </th>
              <th
                scope="col"
                className={botonFecha === "botonVisible" ? "botonEsconder" : ""}
              >
                Fecha
              </th>
              <th
                scope="col"
                className={botonCajas === "botonVisible" ? "botonEsconder" : ""}
              >
                Cajas
              </th>
              <th
                scope="col"
                className={
                  botonArticulo === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Articulo
              </th>
              <th
                scope="col"
                className={botonLote === "botonVisible" ? "botonEsconder" : ""}
              >
                Lote
              </th>
              <th
                scope="col"
                className={
                  botonJaulas === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Jaulas
              </th>
              <th
                scope="col"
                className={
                  botonPedido === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Pedido
              </th>
              <th
                scope="col"
                className={
                  botonPersonal === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Personal
              </th>
              <th
                scope="col"
                className={
                  botonProblemaClasificadora === "botonVisible"
                    ? "botonEsconder"
                    : ""
                }
              >
                problema Clasificadora
              </th>
              <th
                scope="col"
                className={
                  botonAccionClasificadora === "botonVisible"
                    ? "botonEsconder"
                    : ""
                }
              >
                Accion Clasificadora
              </th>
              <th
                scope="col"
                className={
                  botonTiempo === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Tiempo
              </th>
              <th
                scope="col"
                className={
                  botonVelocidad === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Velocidad
              </th>
              <th
                scope="col"
                className={
                  botonGramos === "botonVisible" ? "botonEsconder" : ""
                }
              >
                Gramos
              </th>
            </tr>
          </thead>
          {resultJoin.map((item, index1) => (
            <>
              <tbody key={index1}>
                <tr>
                  <th
                    scope="row"
                    className={
                      botonHoraClasificadora === "botonVisible"
                        ? "botonEsconder"
                        : ""
                    }
                  >
                    {item.horaClasificadora}
                  </th>
                  <td
                    className={
                      botonUsername === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.usuarioClasificadora}
                  </td>
                  <td
                    className={
                      botonFecha === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.fecha}
                  </td>
                  <td
                    className={
                      botonCajas === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.cajas}
                  </td>
                  <td
                    className={
                      botonArticulo === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.articulo}
                  </td>
                  <td
                    className={
                      botonLote === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.lote}
                  </td>
                  <td
                    className={
                      botonJaulas === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.jaulas}
                  </td>
                  <td
                    className={
                      botonPedido === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.pedido}
                  </td>
                  <td
                    className={
                      botonPersonal === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.personal}
                  </td>
                  <td
                    className={
                      botonProblemaClasificadora === "botonVisible"
                        ? "botonEsconder"
                        : ""
                    }
                  >
                    {item.problemaClasificadora}
                  </td>
                  <td
                    className={
                      botonAccionClasificadora === "botonVisible"
                        ? "botonEsconder"
                        : ""
                    }
                  >
                    {item.accionClasificadora}
                  </td>
                  <td
                    className={
                      botonTiempo === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.tiempo}
                  </td>
                  <td
                    className={
                      botonVelocidad === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.velocidad}
                  </td>
                  <td
                    className={
                      botonGramos === "botonVisible" ? "botonEsconder" : ""
                    }
                  >
                    {item.gramos}
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
        <table className="table">
          <thead className="table tableColor">
            <tr>
              <th scope="col">Hora Mecanico</th>
              <th scope="col">Email Mecanico</th>
              <th scope="col">Problema Mecanico</th>
              <th scope="col">Accion Mecanico</th>
            </tr>
          </thead>
          {resultMecanico.map((item, index) => (
            <>
              <tbody key={index}>
                <tr>
                  <th scope="row">{item.horaDelMecanico}</th>
                  <td>{item.usuarioMecanico}</td>
                  <td>{item.problemaMecanico}</td>
                  <td>{item.accionMecanico}</td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>
    </>
  );
};
