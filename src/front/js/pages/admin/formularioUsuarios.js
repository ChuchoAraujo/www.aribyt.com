import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { store } from "../../store/flux";
import { Context } from "../../store/appContext";

export const FormularioUsuarios = () => {
    const { store } = useContext(Context);
       const [username, setUsername] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [role, setRole] = useState("");
       const [enviarFormulario, setFormulario] = useState(false);
// ---------------------------- POST / CLASIFICADORA----------------------------------//
  const sendDataRegister = () => {
    fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: role,
        
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
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
          setUsername(valores.username);
          setEmail(valores.email);
          setPassword(valores.password);
          setRole(valores.role);

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
                onKeyUp={(e) => setUsername(e.target.value)}
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
                onKeyUp={(e) => setEmail(e.target.value)}
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
                onKeyUp={(e) => setPassword(e.target.value)}
              />
              <ErrorMessage
                name="password"
                component={() => <div className="error">{errors.password}</div>}
              />
            </div>
            <div>
              <label htmlFor="role">Rol</label>
              <Field
                type="text"
                id="role"
                name="role"
                placeholder="role"
                onKeyUp={(e) => setRole(e.target.value)}
              />
              <ErrorMessage
                name="role"
                component={() => <div className="error">{errors.role}</div>}
              />
            </div>
            <button className="botonRegister" onClick={sendDataRegister}>
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
