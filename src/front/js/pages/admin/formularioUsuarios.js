import React, { useContext, useEffect, useState } from "react";

export const FormularioUsuarios = ({ users }) => {
  // ---------------------------- POST / CLASIFICADORA----------------------------------//
  const sendDataClasificadora = () => {
    fetch(process.env.BACKEND_URL + "/api/clasificadora", {
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
    <div classNameName="container-fluid">
      <h3 className="text-center">Registrar nuevo usuario</h3>
      <form className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              email
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Registrar
          </button>
        </div>
        <div className="col-4"></div>
      </form>
    </div>
  );
};
