import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

export const Callusers = ({users}) => {
  
  
  return (
    <div className="container-fluid">
      <div className="row">
        {users.map((item, index) => (
          <>
            <div className="col card text-center p-2" key={index}>
              <p className="mt-3 fw-bold">Username: {item.username}</p>
              <hr />
              <p>Id usuario: {item.id}</p>
              <p>Email: {item.email}</p>
              <p>Role: {item.role}</p>
              <div className="text-center">
                <button className="btn btn-danger">
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
