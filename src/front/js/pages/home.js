import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Page_logo } from "./page_logo/page_logo";
import "../../styles/home.css";
import { Vista_login } from "./page_login/vista_login";
import { Mailer } from "../component/mailer/mailer";



export const Home = () => {
  const { store, actions } = useContext(Context);
  const [logo, setLogo] = useState("");
  const [login, setlogin] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const loadLogo = useEffect(() => {
    setLogo("opacity")
  }, [])

   const loadLogin = useEffect(() => {
     setlogin("opacityDone");
   }, []);

console.log("dios soy yo de nuevo")

//---------------- PRUEBA APARECER Y DESAPARECER ------------------------------------------
     const [logoAribyt, setLogoAribyt] = useState("");
     const [pageLogin, setPageLogin] = useState("");

  const myTimeout = () => {
    setTimeout(alert("hola"), 5000);
  } 

   const comenzar = () => {
  
      if (logoAribyt === logoAribyt) {
        setLogoAribyt("visibility");
        setPageLogin("hidden");
      } else {
        console.log("nada");
      }
   }

console.log(fechaSeleccionada)
console.log("funciona!!")

  return (
    <div className="container-fluid logo" onLoad={myTimeout}>
      <div className={logoAribyt === "visibility" ? "hidden" : "visibility"}>
        <Page_logo />
        {/* <button onClick={comenzar}>Comenzar!</button> */}
      </div>
      <div>
      </div>
      <div className={pageLogin === "hidden" ? "visibility" : "hidden"}>
        <Vista_login />
      </div>
      <div><Mailer/></div>
    </div>
  );
};
