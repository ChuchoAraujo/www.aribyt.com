import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import Icon_aribyt from "../icons/icon_aribyt";
import Icon_simbolo from "../icons/icon_simbolo";

export const Logo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <Icon_aribyt className="iconoAribyt img-fluid" />
    </div>
  );
};
