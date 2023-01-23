import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { store } from "../../store/flux";
import { Context } from "../../store/appContext";
import { DatePicker } from 'antd';

export const Formulario_mecanico = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const[fecha,setFecha]=useState("");
  //REGISTRO INPUTS
  //ALERT ENVIO FORMULARIO
  const [enviarFormulario, setFormulario] = useState(false);
  //OBTENER FECHA Y HORA
  const valorFecha = (date, dateString) => {
    setFecha(dateString);
  };
  const formatoFecha = 'DD/MM/YYYY';

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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const sendDataMecanico = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/mecanico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        "user_id": store.userId,
        "problema": valores.problema,
        "accion": valores.accion,
        "fecha": fecha,
        "horas": store.horamec,
        "turno":valores.turno
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        navigate("vista_login/vista_mecanico")
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Formik 
        initialValues={{
          problema: "",
          accion: "",
          turno: "",
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          setFormulario(true);
          setTimeout(() => setFormulario(false), 5000);
          sendDataMecanico(valores)
        }}
      >
        {() => (
          <Form className="formulario">
            <div>
              <label htmlFor="Problema">Problema</label>
              <Field
                as="textarea"
                id="problema"
                name="problema"
                placeholder="Problemas ocurridos"

              />
            </div>
            <div>
              <label htmlFor="Acción">Acción</label>
              <Field
                as="textarea"
                id="accion"
                name="accion"
                placeholder="Solución al problema o problemas"

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
            className="botonSiguienteFormulario" type="submit">
              Enviar
            </button>
            </div>
            <div>
            <button onClick={()=>navigate(-1)} className="botonRegresarFormulario">Regresar</button>
            </div>
            {enviarFormulario && (
              <p className="exito">¡Formulario enviado con éxito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
