import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { store, actions } from "../../store/flux";
import { Context } from "../../store/appContext";
import { number } from "prop-types";
import Mantenimiento from "../icons/mantenimeinto";
import Inyector from "../icons/inyector";
import Papel from "../icons/papel";
import Bidon from "../icons/bidon";
import { HiHome } from "react-icons/hi";

export const Formulario_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const [enviarFormulario, setFormulario] = useState(false);
  const navigate = useNavigate();
  const [cajas, setCajas] = useState("");
  const [articulo, setArticulo] = useState("");
  const [lote, setLote] = useState("");
  const [jaulas, setJaulas] = useState("");
  const [pedido, setPedido] = useState("");
  const [personal, setPersonal] = useState("");
  const [problema, setProblema] = useState("");
  const [accion, setAccion] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [velocidad, setVelocidad] = useState("");
  const [gramos, setGramos] = useState("");
  const [turno, setTurno] = useState("");
  const [problemaRecurrente, setProblemaRecurrente] = useState("");
  const [iconProblema, setIconProblema] = useState("")
  const [tituloProblema, setTituloProblema] = useState("");
  const [inputProblema, setInputProblema] = useState("");
  

  const valueProblema = store.problema

  //OBTENER FECHA Y HORA
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  var todayHora = new Date();
  var nowHora = parseFloat(todayHora.toLocaleTimeString("en-US"));
  const horaActual = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  }).format(new Date());
  const horaConvertida = parseFloat(horaActual);

  // ----------------------- PAGINACION FORMULARIO --------------------------------------//
  const [pagina1, setpagina1] = useState("");
  const [pagina2, setPagina2] = useState("");
  const [pagina3, setPagina3] = useState("");
  const [pagina4, setPagina4] = useState("");

  const printCondicitional = () => {
    if (pagina1 === pagina1) {
      setpagina1("visibility");
      setPagina2("hidden");
    } else {
      console.log("nada");
    }
  };
  const printCondicitional2 = () => {
    if (pagina2 === pagina2) {
      setPagina2("visibility");
      setPagina3("hidden");
    } else {
      console.log("nada");
    }
  };
  const printCondicitional3 = () => {
    if (pagina3 === pagina3) {
      setPagina3("visibility");
      setPagina4("hidden");
    } else {
      console.log("nada");
    }
  };

  const obtenerValue = () => {
    setProblema("prueba")
  }
  // ---------------------------- FUNCION OBTENER HORA-TURNOS----------------------------------//

  // function getPrueba() {
  //   if (horaConvertida >= 6 && horaConvertida <= 14) {
  //     console.log("Eres turno de mañana, tu hora es: " + horaConvertida);
  //   } else if (horaConvertida >= 14 && horaConvertida <= 22) {
  //     console.log("Eres turno de tarde, tu hora es: " + horaConvertida);
  //   } else if (horaConvertida >= 22 && horaConvertida <= 6) {
  //     console.log("Eres turno de noche, tu hora es: " + horaConvertida);
  //   } else {
  //     console.log("No tienes turno");
  //   }
  // }

  // getPrueba(horaConvertida);

  // ---------------------------- FUNCION REGRESAR DE PAGINA----------------------------------//

  const back = () => {
    navigate("/");
  };
  // ---------------------------- GET / AREA PRIVADA----------------------------------//
  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/private", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.log("error", error));
  }, []);
  // ---------------------------- GET / SUMACAJAS----------------------------------//
  const suma = () => {
    fetch(process.env.BACKEND_URL + "/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fecha: `${month}/${day}/${year}`,
        turno: turno,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        store.contadorCajas = result.sumaCajas;
      })
      .catch((error) => console.log("error", error));
  };
  // ---------------------------- POST / CLASIFICADORA----------------------------------//
  const sendDataClasificadora = () => {
    fetch(process.env.BACKEND_URL + "/api/clasificadora", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: store.userId,
        cajas: cajas,
        articulo: articulo,
        lote: lote,
        jaulas: jaulas,
        pedido: pedido,
        personal: personal,
        problema: problema,
        accion: accion,
        tiempo: tiempo,
        velocidad: velocidad,
        gramos: gramos,
        fecha: `${month}/${day}/${year}`,
        horas: store.hora,
        turno: turno,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        suma();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Formik
        className="containerFormClasificadora"
        initialValues={{
          cajas: "",
          articulo: "",
          lote: "",
          jaulas: "",
          pedido: "",
          personal: "",
          problema: "",
          accion: "",
          tiempo: "",
          velocidad: "",
          gramos: "",
          turno: "",
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion cajas
          if (!valores.cajas) {
            errores.cajas = "Por favor ingresa las cajas por hora";
          } else if (!/^[0-9]+$/.test(valores.cajas)) {
            errores.cajas = "Solo puede contener Numeros enteros";
          }
          // Validacion articulo
          if (!valores.articulo) {
            errores.articulo = "Por favor ingresa un articulo";
          }
          if (!valores.velocidad) {
            errores.velocidad = "Por favor ingresa la velocidad";
          } else if (!/^\d*\.\d+$/.test(valores.velocidad)) {
            errores.velocidad = "Solo puede contener Numeros";
          }
          //validacion gramos
          if (!valores.gramos) {
            errores.gramos = "Por favor ingresa los gramos de la cola";
          } else if (!/^\d*\.\d+$/.test(valores.gramos)) {
            errores.gramos = "Solo puede contener Numeros";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          setFormulario(true);
          setArticulo(valores.articulo);
          setLote(valores.lote);
          setJaulas(valores.jaulas);
          setPedido(valores.pedido);
          setPersonal(valores.personal);
          setProblema(valores.problema);
          setAccion(valores.accion);
          setTiempo(valores.tiempo);
          setVelocidad(valores.velocidad);
          setGramos(valores.gramos);
          setTurno(valores.turno);
          setCajas(valores.cajas);
          setTimeout(() => setFormulario(false), 5000);
          console.log(valores)
        }}
      >
        {({ errors, setFieldValue }) => (
          <Form className="formulario">
            {/*--------------------------Formulario pagina1*-------------------*/}
            <div className={pagina1 === "visibility" ? "hidden" : "visibility"}>
              <div>
                <label htmlFor="cajas">Cajas</label>
                <Field
                  className="inputsFormulario"
                  type="number"
                  id="cajas"
                  name="cajas"
                  placeholder="Número de cajas"
                  onKeyUp={(e) => setCajas(e.target.value)}
                />
                <ErrorMessage
                  name="cajas"
                  component={() => <div className="error">{errors.cajas}</div>}
                />
              </div>
              <div>
                <label htmlFor="articulo">Artículo</label>
                <Field
                  type="text"
                  id="articulo"
                  name="articulo"
                  placeholder="Codigo de Articulo"
                  onKeyUp={(e) => setArticulo(e.target.value)}
                />
                <ErrorMessage
                  name="articulo"
                  component={() => (
                    <div className="error">{errors.articulo}</div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="lote">Lote</label>
                <Field
                  type="text"
                  id="lote"
                  name="lote"
                  placeholder="Numero Lote"
                  onKeyUp={(e) => setLote(e.target.value)}
                />
              </div>
              <button
                onClick={printCondicitional}
                className="botonSiguienteFormulario"
              >
                Siguiente
              </button>
            </div>

            {/*--------------------------Formulario pagina2*-------------------*/}
            <div className={pagina2 === "hidden" ? "visibility" : "hidden"}>
              <div>
                <label htmlFor="jaulas">Jaulas</label>
                <Field
                  type="text"
                  id="jaulas"
                  name="jaulas"
                  placeholder="Numero de Jaulas"
                  onKeyUp={(e) => setJaulas(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pedido">pedido</label>
                <Field
                  type="text"
                  id="pedido"
                  name="pedido"
                  placeholder="Numero de pedido"
                  onKeyUp={(e) => setPedido(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="personal">personal</label>
                <Field
                  as="textarea"
                  id="personal"
                  name="personal"
                  placeholder="Personal en la maquina"
                  onKeyUp={(e) => setPersonal(e.target.value)}
                />
              </div>
              <button
                onClick={printCondicitional2}
                className="botonSiguienteFormulario"
              >
                Siguiente
              </button>
            </div>
            {/*--------------------------Formulario pagina3*-------------------*/}
            <div className={pagina3 === "hidden" ? "visibility" : "hidden"}>
              <h6>--- Problemas recurrentes ---</h6>
              <div className="row p-3 d-flex justify-content-center text-center contendedorBotonesProblemas">
                <button
                  onClick={() => {
                    setFieldValue("problema", "Se ha realizado mantenimiento");
                    setProblemaRecurrente(
                      "problemaClasificadoraGray col-3 text-center buttonIconsFormClasificadora"
                    );
                    setIconProblema("iconManteGray");
                    setTituloProblema("tituloManteGray");
                    console.log(value);
                  }}
                  className={
                    problemaRecurrente ===
                    "problemaClasificadoraGray col-3 text-center buttonIconsFormClasificadora"
                      ? "problemaClasificadoraGreen col-3 text-center buttonIconsFormClasificadora"
                      : "problemaClasificadoraGray col-3 text-center buttonIconsFormClasificadora"
                  }
                >
                  <Mantenimiento
                    className={
                      iconProblema === "iconManteGray"
                        ? "iconManteWhite "
                        : "iconManteGray "
                    }
                  />
                  <h6
                    className={
                      tituloProblema === "tituloManteGray"
                        ? "tituloManteWhite"
                        : "tituloManteGray"
                    }
                  >
                    Mantenimiento
                  </h6>
                </button>

                <div
                  onClick={() => {
                    setFieldValue("problema", "Falta papel")
                    setProblemaRecurrente(
                      "problemaPapelGray col-3 text-center buttonIconsFormClasificadora"
                    );
                    setIconProblema("iconPapelGray");
                    setTituloProblema("tituloIconPapelGray");
                  }}
                  className={
                    problemaRecurrente ===
                    "problemaPapelGray col-3 text-center buttonIconsFormClasificadora"
                      ? "problemaPapelGreen col-3 text-center buttonIconsFormClasificadora"
                      : "problemaPapelGray col-3 text-center buttonIconsFormClasificadora"
                  }
                >
                  <Papel
                    className={
                      iconProblema === "iconPapelGray"
                        ? "iconPapelWhite "
                        : "iconPapelGray "
                    }
                  />
                  <h6
                    className={
                      tituloProblema === "tituloIconPapelGray"
                        ? "tituloIconPapelWhite"
                        : "tituloIconPapelGray"
                    }
                  >
                    Papel
                  </h6>
                </div>

                <div
                  onClick={() => {
                    setFieldValue("problema", "Problemas con el inyector")
                    setProblemaRecurrente(
                      "problemaInyectorGray col-3 text-center buttonIconsFormClasificadora"
                    );
                    setIconProblema("iconInyectGray");
                    setTituloProblema("tituloInyectGray");
                  }}
                  className={
                    problemaRecurrente ===
                    "problemaInyectorGray col-3 text-center buttonIconsFormClasificadora"
                      ? "problemaInyectorGreen col-3 text-center buttonIconsFormClasificadora"
                      : "problemaInyectorGray col-3 text-center buttonIconsFormClasificadora"
                  }
                >
                  <Inyector
                    className={
                      iconProblema === "iconInyectGray"
                        ? "iconInyectWhite"
                        : "iconInyectGray"
                    }
                  />
                  <h6
                    className={
                      tituloProblema === "tituloInyectGray"
                        ? "tituloInyectWhite"
                        : "tituloInyectGray"
                    }
                  >
                    Inyector
                  </h6>
                </div>

                <div
                  onClick={() => {
                    setFieldValue("problema", "Se ha averiado el bidón");
                    setProblemaRecurrente(
                      "problemaBidonGray col-3 text-center buttonIconsFormClasificadora"
                    );
                    setIconProblema("iconBidonGray");
                    setTituloProblema("tituloBidonGray");
                  }}
                  className={
                    problemaRecurrente ===
                    "problemaBidonGray col-3 text-center buttonIconsFormClasificadora"
                      ? "problemaBidonGreen col-3 text-center buttonIconsFormClasificadora"
                      : "problemaBidonGray col-3 text-center buttonIconsFormClasificadora"
                  }
                >
                  <Bidon
                    className={
                      iconProblema === "iconBidonGray"
                        ? "iconBidonWhite "
                        : "iconBidonGray "
                    }
                  />
                  <h6
                    className={
                      tituloProblema === "tituloBidonGray"
                        ? "tituloBidonWhite"
                        : "tituloBidonGray"
                    }
                  >
                    Bidon
                  </h6>
                </div>
              </div>
              <div>
                <label htmlFor="problema">Problema</label>
                <Field
                  as="textarea"
                  id="problema"
                  name="problema"
                  placeholder="¿Qué ha pasado?"
                  onKeyUp={(e) => {
                    setProblema(e.target.value);
                  }}
                >
                </Field>
              </div>
              <div>
                <label htmlFor="accion">accion</label>
                <Field
                  as="textarea"
                  id="accion"
                  name="accion"
                  placeholder="Solucion al problema o problemas"
                  onKeyUp={(e) => setAccion(e.target.value)}
                />
                <button
                  onClick={printCondicitional3}
                  className="botonSiguienteFormulario"
                >
                  Siguiente
                </button>
              </div>
            </div>
            {/*--------------------------Formulario pagina4*-------------------*/}
            <div className={pagina4 === "hidden" ? "visibility" : "hidden"}>
              <div>
                <label htmlFor="tiempo">tiempo</label>
                <Field
                  type="number"
                  id="tiempo"
                  name="tiempo"
                  placeholder="Tiempo parada"
                  onKeyUp={(e) => setTiempo(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="velocidad">velocidad</label>
                <Field
                  type="number"
                  id="velocidad"
                  name="velocidad"
                  placeholder="Velocidad de la maquina"
                  onKeyUp={(e) => setVelocidad(e.target.value)}
                />
                <ErrorMessage
                  name="velocidad"
                  component={() => (
                    <div className="error">{errors.velocidad}</div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="gramos">gramos</label>
                <Field
                  type="number"
                  id="gramos"
                  name="gramos"
                  placeholder="Gramos de la cola"
                  onKeyUp={(e) => setGramos(e.target.value)}
                />
                <ErrorMessage
                  name="gramos"
                  component={() => <div className="error">{errors.gramos}</div>}
                />
              </div>
              <Field
              onClick={(e)=> setTurno(e.target.value)}
               as="select" name="turno" className="selectTurno">
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </Field>
              <button
                className="botonSiguienteFormulario"
                onClick={sendDataClasificadora}
              >
                Enviar
              </button>
              {/* <div>
                <label htmlFor="turno">turno</label>
                <Field
                  type="select"
                  id="turno"
                  name="turno"
                  placeholder="turno"
                  onKeyUp={(e) => setTurno(e.target.value)}
                />
              </div> */}

              {enviarFormulario && (
                <div class="alert alert-primary" role="alert">
                  Registro realizado!
                </div>
              )}
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4 d-flex justify-content-center">
                  <button
                    className="botonAtras d-flex align-items-center"
                    type="button"
                    onClick={back}
                  >
                    <HiHome className="iconHomeClasificadora " />
                  </button>
                </div>
                <div className="col-4"></div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
