import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { store, actions } from "../../store/flux";
import { Context } from "../../store/appContext";


export const LoginAdmin = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [enviarFormulario, setFormulario] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let urlRole = "admin" + store.role;

  const access = () => {
    fetch(process.env.BACKEND_URL + "/api/accesoAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "role": "administrador",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          navigate(urlRole);
          store.userId=result.user
        }
        console.log(result)

      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
       
   
      <Formik
        className="containerFormLogin"
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion cajas
          if (!valores.email) {
            errores.email = "Por favor ingresa un email*";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email =
              "El email solo puede contener letras, números, puntos, guiones y guión bajo*";
          }

          if (!valores.password) {
            errores.password = "Por favor ingresa la contraseña*";
            errores.password =
              "El email solo puede contener letras, números, puntos, guiones y guión bajo*";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
          console.log("Formulario enviado", valores.email, valores.password);
          setEmail(valores.email);
          setPassword(valores.password);
          setFormulario(true);
          setTimeout(() => setFormulario(false), 5000);
        }}
      >
        {({ errors }) => (

          // ----DUDA IMPORT LOGINADMIN?---- //

       // <div className="container-fluid">
       // <Row justify="center">
       // <Col md={8} sm={24}>
        //  <LoginAdmin />
        //</Col> //

          <Form className="formulario container row">
            <h1 className="mb-5">Login</h1>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
                onKeyUp={(e) => setPassword(e.target.value)}
              />
              <ErrorMessage
                name="password"
                component={() => <div className="error">{errors.password}</div>}
              />
            </div>

            <button type="submit" onClick={access}>
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