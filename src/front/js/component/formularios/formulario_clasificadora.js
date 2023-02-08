import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import Mantenimiento from "../icons/mantenimeinto";
import Inyector from "../icons/inyector";
import Papel from "../icons/papel";
import Bidon from "../icons/bidon";
import { Col, DatePicker, Row } from "antd";
import { FooterClasificadora } from "../footers/footerClasificadora";
import AlertModal from "../alertModal";
import { Button, Modal } from "antd";

export const Formulario_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const [enviarFormulario, setFormulario] = useState(false);
  const navigate = useNavigate();
  const [problemaRecurrente, setProblemaRecurrente] = useState("");
  const [iconProblema, setIconProblema] = useState("");
  const [tituloProblema, setTituloProblema] = useState("");
  const [fecha, setFecha] = useState("");
  const [botonMin, setBotonMin] = useState("");



   const [isModalOpen, setIsModalOpen] = useState(false);
   const showModal = () => {
     setIsModalOpen(true);
   };
   const handleOk = () => {
     setIsModalOpen(false);
   };
   const handleCancel = () => {
     setIsModalOpen(false);
   };




  const valorFecha = (date, dateString) => {
    setFecha(dateString);
  };
  const formatoFecha = "DD/MM/YYYY";

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
  const regresarPagina1 = () => {
    if (pagina2 === pagina2) {
      setpagina1("hidden");
      setPagina2("visibility");
    } else {
      console.log("nada");
    }
  };
  const regresarPagina2 = () => {
    if (pagina3 === pagina3) {
      setPagina2("hidden");
      setPagina3("visibility");
    } else {
      console.log("nada");
    }
  };
  const regresarPagina3 = () => {
    if (pagina4 === pagina4) {
      setPagina3("hidden");
      setPagina4("visibility");
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
  const suma = (turno) => {
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
        store.contadorCajas = result.sumaCajas;
      })
      .catch((error) => console.log("error", error));
  };
  // ---------------------------- POST / CLASIFICADORA----------------------------------//
  const sendDataClasificadora = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/clasificadora", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: store.userId,
        cajas: valores.cajas,
        articulo: valores.articulo,
        lote: valores.lote,
        jaulas: valores.jaulas,
        pedido: valores.pedido,
        personal: valores.personal,
        problema: valores.problema,
        accion: valores.accion,
        tiempo: valores.tiempo,
        velocidad: valores.velocidad,
        gramos: valores.gramos,
        fecha: fecha,
        horas: store.hora,
        turno: valores.turno,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => {
          suma(valores.turno);
          navigate(-1);
        }, "3000");
      })
      .catch((error) => console.log("error al enviar datos", error));
  };

  return (
    localStorage.getItem("token") && (
      <>
        <Formik
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
              errores.cajas = "Por favor ingresa las cajas por hora*";
            } else if (!/^[0-9]+$/.test(valores.cajas)) {
              errores.cajas = "Solo puede contener números enteros*";
            }
            // Validacion articulo
            if (!valores.articulo) {
              errores.articulo = "Por favor ingresa un artículo*";
            }
            if (!valores.velocidad) {
              errores.velocidad = "Por favor ingresa la velocidad*";
            } else if (!/^\d*\.\d+$/ && !/^[0-9]+$/.test(valores.velocidad)) {
              errores.velocidad = "Solo puede contener números*";
            }
            //validacion gramos
            if (!valores.gramos) {
              errores.gramos = "Por favor ingresa los gramos de la cola*";
            } else if (!/^\d*\.\d+$/.test(valores.gramos)) {
              errores.gramos = "Solo puede contener números*";
            }
            return errores;
          }}
          onSubmit={(valores, { resetForm }) => {
            console.log("valor de turno es", valores.turno);
            resetForm();
            sendDataClasificadora(valores);
            setFormulario(true);
          }}
        >
          {({ errors, setFieldValue }) => (
            <Form className="formulario">
              {/*--------------------------Formulario pagina1*-------------------*/}
              <div
                className={pagina1 === "visibility" ? "hidden" : "visibility"}
              >
                <div>
                  <label htmlFor="cajas">Cajas</label>
                  <Field
                    className="inputsFormulario"
                    type="number"
                    id="cajas"
                    name="cajas"
                    placeholder="Número de cajas"
                  />
                  <ErrorMessage
                    name="cajas"
                    component={() => (
                      <div className="error">{errors.cajas}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="articulo">Artículo</label>
                  <Field
                    type="text"
                    id="articulo"
                    name="articulo"
                    placeholder="Código de artículo"
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
                    placeholder="Número de lote"
                  />
                </div>
                <div>
                  <button
                    onClick={printCondicitional}
                    className="botonSiguienteFormulario"
                  >
                    Siguiente
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => navigate(-1)}
                    className="botonRegresarFormulario"
                  >
                    Pagina Anterior
                  </button>
                </div>
              </div>

              {/*--------------------------Formulario pagina2*-------------------*/}
              <div className={pagina2 === "hidden" ? "visibility" : "hidden"}>
                <div>
                  <label htmlFor="jaulas">Jaulas</label>
                  <Field
                    type="text"
                    id="jaulas"
                    name="jaulas"
                    placeholder="Número de jaulas"
                  />
                </div>
                <div>
                  <label htmlFor="pedido">Pedido</label>
                  <Field
                    type="text"
                    id="pedido"
                    name="pedido"
                    placeholder="Número de pedido"
                  />
                </div>
                <div>
                  <label htmlFor="personal">Personal</label>
                  <Field
                    as="textarea"
                    id="personal"
                    name="personal"
                    placeholder="Personal en la máquina"
                  />
                </div>
                <div>
                  <button
                    onClick={printCondicitional2}
                    className="botonSiguienteFormulario"
                  >
                    Siguiente
                  </button>
                </div>
                <div>
                  <button
                    onClick={regresarPagina1}
                    className="botonSiguienteFormulario"
                  >
                    Regresar
                  </button>
                </div>
              </div>
              {/*--------------------------Formulario pagina3*-------------------*/}
              <div className={pagina3 === "hidden" ? "visibility" : "hidden"}>
                <h6 className="ms-5 tituloproblemas">
                  --- Problemas recurrentes ---
                </h6>

                <Row justify="center">
                  <Col>
                    <button
                      onClick={() => {
                        setFieldValue(
                          "problema",
                          "Se ha realizado mantenimiento"
                        );
                        setProblemaRecurrente(
                          "problemaClasificadoraGray text-center buttonIconsFormClasificadora mb-2"
                        );
                        setIconProblema("iconManteGray");
                        setTituloProblema("tituloManteGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaClasificadoraGray text-center buttonIconsFormClasificadora mb-2"
                          ? "problemaClasificadoraGreen text-center buttonIconsFormClasificadora mb-2"
                          : "problemaClasificadoraGray text-center buttonIconsFormClasificadora mb-2"
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
                  </Col>
                  <Col>
                    <div
                      onClick={() => {
                        setFieldValue("problema", "Papel agotado");
                        setProblemaRecurrente(
                          "problemaPapelGray text-center buttonIconsFormClasificadora mb-2"
                        );
                        setIconProblema("iconPapelGray");
                        setTituloProblema("tituloIconPapelGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaPapelGray text-center buttonIconsFormClasificadora mb-2"
                          ? "problemaPapelGreen text-center buttonIconsFormClasificadora mb-2"
                          : "problemaPapelGray text-center buttonIconsFormClasificadora mb-2"
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
                  </Col>
                  <Col>
                    <div
                      onClick={() => {
                        setFieldValue("problema", "Problemas con inyectores");
                        setProblemaRecurrente(
                          "problemaInyectorGray text-center buttonIconsFormClasificadora mb-2"
                        );
                        setIconProblema("iconInyectGray");
                        setTituloProblema("tituloInyectGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaInyectorGray text-center buttonIconsFormClasificadora mb-2"
                          ? "problemaInyectorGreen text-center buttonIconsFormClasificadora mb-2"
                          : "problemaInyectorGray text-center buttonIconsFormClasificadora mb-2"
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
                  </Col>
                  <Col>
                    <div
                      onClick={() => {
                        setFieldValue("problema", "Se ha agotado el bidón");
                        setProblemaRecurrente(
                          "problemaBidonGray text-center buttonIconsFormClasificadora mb-2"
                        );
                        setIconProblema("iconBidonGray");
                        setTituloProblema("tituloBidonGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaBidonGray text-center buttonIconsFormClasificadora mb-2"
                          ? "problemaBidonGreen text-center buttonIconsFormClasificadora mb-2"
                          : "problemaBidonGray text-center buttonIconsFormClasificadora mb-2"
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
                        Bidón
                      </h6>
                    </div>
                  </Col>
                </Row>
                <div>
                  <label htmlFor="problema">Problema</label>
                  <Field
                    as="textarea"
                    id="problema"
                    name="problema"
                    placeholder="¿Qué ha pasado?"
                  ></Field>
                </div>
                <div>
                  <label htmlFor="accion">Acción</label>
                  <Field
                    as="textarea"
                    id="accion"
                    name="accion"
                    placeholder="Solución al problema o problemas"
                  />
                  <div>
                    <button
                      onClick={printCondicitional3}
                      className="botonSiguienteFormulario"
                    >
                      Siguiente
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={regresarPagina2}
                      className="botonSiguienteFormulario"
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              </div>
              {/*--------------------------Formulario pagina4*-------------------*/}
              <div className={pagina4 === "hidden" ? "visibility" : "hidden"}>
                <label htmlFor="tiempo">Tiempo</label>
                <div className="containerButon">
                  <button
                    className={
                      botonMin === "boton5MinGreen"
                        ? "boton5MinGray"
                        : "boton5MinGreen"
                    }
                    type="button"
                    onClick={() => {
                      setFieldValue("tiempo", "5"),
                        setBotonMin("boton5MinGreen");
                    }}
                  >
                    5 min
                  </button>
                  <button
                    className={
                      botonMin === "boton10MinGreen"
                        ? "boton10MinGray"
                        : "boton10MinGreen"
                    }
                    type="button"
                    onClick={() => {
                      setFieldValue("tiempo", "10"),
                        setBotonMin("boton10MinGreen");
                    }}
                  >
                    10 min
                  </button>
                  <button
                    className={
                      botonMin === "boton15MinGreen"
                        ? "boton15MinGray"
                        : "boton15MinGreen"
                    }
                    type="button"
                    onClick={() => {
                      setFieldValue("tiempo", "15"),
                        setBotonMin("boton15MinGreen");
                    }}
                  >
                    15 min
                  </button>
                  <button
                    className={
                      botonMin === "boton20MinGreen"
                        ? "boton20MinGray"
                        : "boton20MinGreen"
                    }
                    type="button"
                    onClick={() => {
                      setFieldValue("tiempo", "20"),
                        setBotonMin("boton20MinGreen");
                    }}
                  >
                    20 min
                  </button>
                </div>
                <div>
                  <Field
                    type="number"
                    id="tiempo"
                    name="tiempo"
                    placeholder="Tiempo de parada"
                  />
                </div>
                <div>
                  <label htmlFor="velocidad">Velocidad</label>
                  <Field
                    type="number"
                    id="velocidad"
                    name="velocidad"
                    placeholder="Velocidad de la máquina"
                  />
                  <ErrorMessage
                    name="velocidad"
                    component={() => (
                      <div className="error">{errors.velocidad}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="gramos">Gramos</label>
                  <Field
                    type="number"
                    id="gramos"
                    name="gramos"
                    placeholder="Gramos de la cola"
                  />
                  <ErrorMessage
                    name="gramos"
                    component={() => (
                      <div className="error">{errors.gramos}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="turno">Turno</label>
                  <Field
                    as="select"
                    id="turno"
                    name="turno"
                    className="selectTurno"
                  >
                    <option>Seleccione</option>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor="fecha">Fecha</label>
                  <DatePicker onChange={valorFecha} format={formatoFecha} />
                </div>
                <div>
                  <button
                    className="botonSiguienteFormulario"
                    type="submit"
                    onClick={showModal}
                  >
                    Enviar
                  </button>
                  <Modal
                    title="¡Registro realizado con éxito!"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    // style = {{display: "none"}}
                  ></Modal>
                  
                </div>
                <div>
                  <button
                    className="botonSiguienteFormulario"
                    onClick={regresarPagina3}
                  >
                    Regresar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    )
  );
};
