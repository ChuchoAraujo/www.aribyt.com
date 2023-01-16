import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { store } from "../../store/flux";
import { Context } from "../../store/appContext";

export const Formulario_rechazos = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  //REGISTRO INPUTS
  const [turno, setTurno] = useState("");
  const [fichas, setFichas] = useState("");
  const [paneles, setPaneles] = useState("");
  const [jaula, setJaula] = useState("");
  
  //ALERT ENVIO FORMULARIO
  const [enviarFormulario, setFormulario] = useState(false);
  //OBTENER FECHA Y HORA
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  var todayHora = new Date();
  var nowHora = todayHora.toLocaleTimeString("en-US");

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
        console.log("Muy bien !! ... Token encontrado", result);
        // if (!result.done) {
        //   navigate("/");
        // }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const sendDataRechazos = () => {
    fetch(process.env.BACKEND_URL + "/api/rechazos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: store.userId,
        turno: turno,
        fichas: fichas,
        paneles: paneles,
        fecha: `${month}/${day}/${year}`,
        jaula: jaula
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Formik
        initialValues={{
          turno: "",
          fichas: "",
          paneles: "",
          jaula: "",
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          setFormulario(true);
          setTurno(valores.turno);
          setFichas(valores.fichas);
          setPaneles(valores.paneles);
          setJaula(valores.jaula);
          setTimeout(() => setFormulario(false), 5000);
        }}
      >
        {() => (
          <Form className="formulario">
            <div>
              <label htmlFor="turno">Turno</label>
              <Field
                type="text"
                id="turno"
                name="turno"
                placeholder="Turno"
                onKeyUp={(e) => setTurno(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fichas">Fichas</label>
              <Field
                type="text"
                id="fichas"
                name="fichas"
                placeholder="Cantidad de fichas"
                onKeyUp={(e) => setFichas(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="paneles">Paneles</label>
              <Field
                type="text"
                id="paneles"
                name="paneles"
                placeholder="paneles"
                onKeyUp={(e) => setPaneles(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="jaula">Jaula</label>
              <Field
                type="text"
                id="jaula"
                name="jaula"
                placeholder="jaula"
                onKeyUp={(e) => setJaula(e.target.value)}
              />
            </div>
            <button type="submit" onClick={sendDataRechazos}>
              Enviar
            </button>
            {enviarFormulario && (
              <p className="exito">Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
