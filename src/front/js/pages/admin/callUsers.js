import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Context } from "../../store/appContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

export const Callusers = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [boton, setBoton] = useState(false);
  const [objeto, setObjeto] = useState({});

  // FETCH EDIT PUT
  const sendDataEdit = (valores) => {
    fetch(process.env.BACKEND_URL + "/api/modificar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: objeto.id,
        username: valores.username,
        email: valores.email,
        password: valores.password,
        role: valores.role,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("ingresa bien los datos");
      });
  };

  // EDITAR USUARIOS
  const [pagina1, setpagina1] = useState("");
  const [pagina2, setPagina2] = useState("");

  const printCondicitional = () => {
    if (pagina1 === pagina1) {
      setpagina1("visibility container-fluid");
      setPagina2("hidden");
    } else {
      console.log("nada");
    }
  };

  const agregarUsuario = () => {
    setBoton(true);
  };

  // Funcion alerta
  function eliminar(item, index) {
    var statusConfirm = confirm("¿Realmente desea eliminar esto?");
    if (statusConfirm == true) {
      sendDataDelete(item);
      mensajeConfirmacion(index);
      alert("se ha elminado el registro seleccionado");
    } else {
      alert("No se ha eliminado");
    }
  }

  // FECTCH DELETE
  const sendDataDelete = (user_id) => {
    fetch(process.env.BACKEND_URL + "/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        actions.fetchUser();
      })
      .catch((error) => console.log("error", error));
  };

  const formularioEditar = () => {
    return (
      <>
        <div>
          <Formik
            initialValues={{
              id: objeto.id,
              username: objeto.username,
              email: objeto.email,
              password: objeto.password,
              role: objeto.role,
            }}
            validate={(valores) => {
              let errores = {};

              // Validacion articulo
              if (!valores.username) {
                errores.username = "Por favor ingresa username";
              }
              if (!valores.email) {
                errores.email = "Por favor ingresa un email";
              }
              if (!valores.password) {
                errores.password = "Por favor ingresa un password";
              }
              if (!valores.role) {
                errores.role = "Por favor ingresa un role";
              }
              return errores;
            }}
            onSubmit={(valores, { resetForm }) => {
              sendDataEdit(valores);
              resetForm();
              setFormulario(true);
              setTimeout(() => setFormulario(false), 5000);
            }}
          >
            {({ errors }) => (
              <Form className="formulario">
                
                <div>
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    
                  />
                  <ErrorMessage
                    name="username"
                    component={() => (
                      <div className="error">{errors.username}</div>
                    )}
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
                    component={() => (
                      <div className="error">{errors.email}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <div className="error">{errors.password}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="role">Role</label>
                  <Field
                    type="text"
                    id="role"
                    name="role"
                    placeholder="role"
                    
                  />
                  <ErrorMessage
                    name="role"
                    component={() => <div className="error">{errors.role}</div>}
                  />
                </div>
                <button type="submit">Enviar</button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };
  return (
    <>
      <div>{boton ? formularioEditar() : null}</div>
      <div
        className={
          pagina1 === "visibility container-fluid"
            ? "hidden"
            : "visibility container-fluid"
        }
      >
        <div className="row">
          {store.user.map((item, index) => (
            <>
              <div className="col card text-center p-2" key={index}>
                <p className="mt-3 fw-bold">Username: {item.username}</p>
                <hr />
                <p>Id usuario: {item.id}</p>
                <p>Email: {item.email}</p>
                <p>Role: {item.role}</p>
                <div className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      eliminar(item.id, index);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      agregarUsuario();
                      printCondicitional();
                      setObjeto(item);;
                    }}
                  >
                    <AiFillEdit />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
