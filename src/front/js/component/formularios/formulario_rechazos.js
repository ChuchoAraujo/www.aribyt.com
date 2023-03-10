import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { store } from "../../store/flux";
import { Context } from "../../store/appContext";
import { Col, DatePicker, Row } from 'antd';

export const Formulario_rechazos = () => {
  const { store } = useContext(Context);
  const[fecha,setFecha]=useState("");
  const navigate = useNavigate();
  //FECHA
  const valorFecha = (date, dateString) => {
    setFecha(dateString);
  };
  const formatoFecha = 'DD/MM/YYYY';
  
  //ALERT ENVIO FORMULARIO
  const [enviarFormulario, setFormulario] = useState(false);
  //OBTENER FECHA Y HORA

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
        // if (!result.done) {
        //   navigate("/");
        // }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const sendDataRechazos = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/rechazos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: store.userId,
        turno: valores.turno,
        fichas: valores.fichas,
        paneles: valores.paneles,
        fecha: fecha,
        jaula: valores.jaula
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        navigate("/vista_login/vista_clasificadora")
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
    <Row justify="center">
      <Col md={8} sm={24}>
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
          setTimeout(() => setFormulario(false), 5000);
          sendDataRechazos(valores)
        }}
      >
        {() => (
          <Form className="formulario">
            <div>
              <label htmlFor="fichas">Fichas</label>
              <Field
                type="number"
                id="fichas"
                name="fichas"
                placeholder="Cantidad de fichas en (KiloGramos)"
              />
            </div>
            <div>
              <label htmlFor="paneles">Paneles</label>
              <Field
                type="number"
                id="paneles"
                name="paneles"
                placeholder="Paneles en (KiloGramos)"
              />
            </div>
            <div>
              <label htmlFor="jaula">Jaula</label>
              <Field
                type="number"
                id="jaula"
                name="jaula"
                placeholder="Jaula en (KiloGramos)"
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
                    <option value="ma??ana">Ma??ana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                  </Field>
                  </div>
              <div>
                  <label htmlFor="fecha">Fecha</label>
                      <DatePicker onChange={valorFecha} format={formatoFecha}/>
              </div>
              <div>
              <button type="submit" className="botonSiguienteFormulario">
              Enviar
            </button>
              </div>
          <div>
          <button onClick={()=>navigate(-1)} className="botonRegresarFormulario">Regresar</button>
          </div>

            {enviarFormulario && (
              <p className="exito">??Formulario enviado con ??xito!</p>
            )}
          </Form>
        )}
      </Formik>
      </Col>
    </Row>
    </>
  );
};
