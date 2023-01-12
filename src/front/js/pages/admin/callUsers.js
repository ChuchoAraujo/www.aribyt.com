import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Context } from "../../store/appContext";
import { store, actions } from "../../store/flux";

export const Callusers = () => {
  const { store, actions } = useContext(Context);
  const [borrar, setBorrar] = useState("");
  const [enviarAlerta, setEnviarAlerta] = useState("");

  // BORRAR EN PANTALLA USUARIO
  const deleteUser = (index) => {
    console.log("soy los users:", store.user);
    store.user.filter((users) => users !== index);
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
        setBorrar(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  // FETCH EDIT PUT
  const sendDataEdit = (user_id) => {
    fetch(process.env.BACKEND_URL + "/api/delete", {
      method: "PUT",
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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container-fluid">
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
                    eliminar(item.id, index)
                  }}
                >
                  <AiFillDelete />
                </button>
                <button className="btn btn-warning">
                  <AiFillEdit />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
