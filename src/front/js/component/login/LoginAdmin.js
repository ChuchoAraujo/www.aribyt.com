import React, {  useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/modal"


export const LoginAdmin = () => {
  const navigate = useNavigate();
  const [enviarFormulario, setFormulario] = useState(false);
  let urlRole = "admin";

  const access = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/accesoAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": valores.email,
        "password": valores.password,
        "role": "administrador",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          navigate(urlRole);
        }
        else{
          alert("Usuario no registrado")
        }
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
          setFormulario(true);
          setTimeout(() => setFormulario(false), 5000);
          access(valores)
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h1 className="text-center">Login</h1>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
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
              />
              <ErrorMessage
                name="password"
                component={() => <div className="error">{errors.password}</div>}
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