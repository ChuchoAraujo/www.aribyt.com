import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import Mantenimiento from "../icons/mantenimeinto";
import Inyector from "../icons/inyector";
import Papel from "../icons/papel";
import Bidon from "../icons/bidon";
import { DatePicker } from 'antd';


export const Formulario_clasificadora = () => {
  const { store, actions } = useContext(Context);
  const [enviarFormulario, setFormulario] = useState(false);
  const navigate = useNavigate();
  const [problemaRecurrente, setProblemaRecurrente] = useState("");
  const [iconProblema, setIconProblema] = useState("")
  const [tituloProblema, setTituloProblema] = useState("");
  const[fecha,setFecha]=useState("");

 
  const valorFecha = (date, dateString) => {
    setFecha(dateString);
  };
  const formatoFecha = 'DD/MM/YYYY';

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
      .then((result) => {
      })
      .catch((error) => console.log("error", error));
  }, []);
  // ---------------------------- GET / SUMACAJAS----------------------------------//
  const suma = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fecha: fecha,
        turno: valores.turno,
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
        console.log("enviado correctamente",result)
        navigate(-1)
        suma(valores.cajas);
      })
      .catch((error) => console.log("error al enviar datos", error));
  };

  return (
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
          } else if (!/^\d*\.\d+$/.test(valores.velocidad)) {
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
          console.log("valor de turno es",valores.turno)
          resetForm();
          sendDataClasificadora(valores)
          setTimeout(() => setFormulario(false), 5000);
          
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
                      placeholder="Número de lote"
                    />
                  </div>
                  <div>
                    <button
                      onClick={printCondicitional}
                      className="botonSiguienteFormulario">
                      Siguiente
                    </button>
                  </div>
                  <div>
                <button onClick={()=>navigate(-1)} className="botonRegresarFormulario">Regresar</button>
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
                  <h6>--- Problemas recurrentes ---</h6>
                  <div className="">
                    <button
                      onClick={() => {
                        setFieldValue(
                          "problema",
                          "Se ha realizado mantenimiento"
                        );
                        setProblemaRecurrente(
                          "problemaClasificadoraGray text-center buttonIconsFormClasificadora"
                        );
                        setIconProblema("iconManteGray");
                        setTituloProblema("tituloManteGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaClasificadoraGray text-center buttonIconsFormClasificadora"
                          ? "problemaClasificadoraGreen text-center buttonIconsFormClasificadora"
                          : "problemaClasificadoraGray text-center buttonIconsFormClasificadora"
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
                        setFieldValue("problema", "Falta papel");
                        setProblemaRecurrente(
                          "problemaPapelGray text-center buttonIconsFormClasificadora"
                        );
                        setIconProblema("iconPapelGray");
                        setTituloProblema("tituloIconPapelGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaPapelGray text-center buttonIconsFormClasificadora"
                          ? "problemaPapelGreen text-center buttonIconsFormClasificadora"
                          : "problemaPapelGray text-center buttonIconsFormClasificadora"
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
                        setFieldValue("problema", "Problemas con el inyector");
                        setProblemaRecurrente(
                          "problemaInyectorGray text-center buttonIconsFormClasificadora"
                        );
                        setIconProblema("iconInyectGray");
                        setTituloProblema("tituloInyectGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaInyectorGray text-center buttonIconsFormClasificadora"
                          ? "problemaInyectorGreen text-center buttonIconsFormClasificadora"
                          : "problemaInyectorGray text-center buttonIconsFormClasificadora"
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
                          "problemaBidonGray text-center buttonIconsFormClasificadora"
                        );
                        setIconProblema("iconBidonGray");
                        setTituloProblema("tituloBidonGray");
                      }}
                      className={
                        problemaRecurrente ===
                        "problemaBidonGray text-center buttonIconsFormClasificadora"
                          ? "problemaBidonGreen text-center buttonIconsFormClasificadora"
                          : "problemaBidonGray text-center buttonIconsFormClasificadora"
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
                  </div>
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
                  <div>
                    <label htmlFor="tiempo">Tiempo</label>
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
                        <DatePicker onChange={valorFecha} format={formatoFecha}/>
                  </div>
                  <div>
                  <button
                  className="botonSiguienteFormulario"
                    type="submit"
                  >
                    Enviar
                  </button>
                  </div>
                  <div>
                  <button
                    className="botonSiguienteFormulario"
                    onClick={regresarPagina3}
                  >
                    Regresar
                  </button>
                  </div>
                  {enviarFormulario && (
                    <div class="alert alert-primary" role="alert">
                      ¡Registro realizado!
                    </div>
                  )}
                </div>
            
          </Form>
        )}
      </Formik>
    </>
  );
};
