import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Context } from "../../store/appContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { RiUser3Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiFillSkin } from "react-icons/ai";
import { Col, Row } from "antd";


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
          //recargar pagina
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
      setpagina1("visibility");
      setPagina2("hidden");
    } else {
      console.log("nada");
    }
  };

  const agregarUsuario = () => {
    setBoton(true);
  };

// BORRAR EN PANTALLA USUARIO
    const mensajeConfirmacion = (index) => {
      store.user.filter((users) => users !== index);
    };
  // Funcion alerta
  function eliminar(item, index) {
    let statusConfirm = confirm("¿Realmente desea eliminar esto?");
    if (statusConfirm == true) {
      sendDataDelete(item);
      mensajeConfirmacion(index)
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
        console.log("este es el resultado",result)
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
                  <label htmlFor="username">Usuario</label>
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
                  <label htmlFor="password">Contraseña</label>
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
                <button type="submit" className="botonSiguienteFormulario">Enviar</button>
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
        className={pagina1 === "visibility" ? "hidden": "visibility"}>
            {store.user.map((item, index) => (
              <>
                <div
                  className="cardUser card p-2 text-center"
                  key={index}
                >
                  <div className="card-body">
                    <p className="">
                      Username: {item.username}
                    </p>
                    <hr />
                    <p>
                      <RiUser3Fill /> Id usuario: {item.id}
                    </p>
                    <p>
                      <MdEmail /> Email: {item.email}
                    </p>
                    <p>
                      <AiFillSkin /> Role: {item.role}
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      className="botonDelete"
                      onClick={() => {
                        eliminar(item.id, index);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                    <button
                      className="botonEdit"
                      onClick={() => {
                        agregarUsuario();
                        printCondicitional();
                        setObjeto(item);
                      }}
                    >
                      <AiFillEdit />
                    </button>
                  </div>
                </div>
              </>
            ))}


      </div>

    </>
  );
};
