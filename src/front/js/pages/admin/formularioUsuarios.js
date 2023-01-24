import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { store } from "../../store/flux";
import { Context } from "../../store/appContext";
import { useWindowSize } from "usehooks-ts";

export const FormularioUsuarios = () => {
    const { store } = useContext(Context);
       const [enviarFormulario, setFormulario] = useState(false);
// ---------------------------- POST / CLASIFICADORA----------------------------------//
  const sendDataRegister = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: valores.username,
        email: valores.email,
        password: valores.password,
        role: valores.role,
        
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        //recargar la pagina
        window.location.reload(true);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Formik
      
        initialValues={{
          username: "",
          email: "",
          password: "",
          role: "",
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion articulo
          if (!valores.username) {
            errores.username = "Por favor ingresa usuario*";
          }
          if (!valores.email) {
            errores.email = "Por favor ingresa un email*";
          }
          if (!valores.password) {
            errores.password = "Por favor ingresa una contraseña*";
          }
          if (!valores.role) {
            errores.role = "Por favor ingresa un rol";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          setFormulario(true);
          sendDataRegister(valores)
          setTimeout(() => setFormulario(false), 5000);
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <div>
              <label htmlFor="username">Usuario</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="username"
              />
              <ErrorMessage
                name="username"
                component={() => <div className="error">{errors.username}</div>}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="email"
              />
              <ErrorMessage
                name="email"
                component={() => <div className="error">{errors.email}</div>}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />
              <ErrorMessage
                name="password"
                component={() => <div className="error">{errors.password}</div>}
              />
            </div>
            <div>
              <label htmlFor="role">Rol</label>
              <Field
                as="select"
                name="role"
                className="selectTurno"
              >
                <option value="" label="Selecciona" />
                <option value="clasificadora" label="Clasificadora" />
                <option value="mecanico" label="Mecanico" />
                <option value="encargado" label="Encargado" />
              </Field>
              <ErrorMessage
                name="role"
                component={() => <div className="error">{errors.role}</div>}
              />
            </div>
            <button type="submit" className="botonSiguienteFormulario">
              Enviar
            </button>
            {enviarFormulario && (
              <p className="exito">¡Formulario enviado con éxito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
