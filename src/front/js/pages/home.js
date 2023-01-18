import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Page_logo } from "./page_logo/page_logo";
import "../../styles/home.css";
import { Vista_login } from "./page_login/vista_login";
import { FooterHome } from "../component/footers/footerHome";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container-fluid">
        <Page_logo />
      </div>
      <div>
        <FooterHome className="container-fluid" />
      </div>
    </>
  );
};
