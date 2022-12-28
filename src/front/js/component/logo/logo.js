import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import Icon_aribyt  from "../icons/icon_aribyt"
import Icon_simbolo from "../icons/icon_simbolo";

export const Logo = () => {
  const { store, actions } = useContext(Context);
  const [change, setChange] =useState("efectoIcon")



  return (
    <div className="text-center">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <Icon_aribyt className="icono" />
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};





