import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Container_clasificadora } from "./pages/clasificadora/container_clasificadora";
import { Vista_clasificadora } from "./pages/clasificadora/vista_clasificadora";
import { Container_mecanico } from "./pages/mecanico/container_mecanico";
import { Vista_mecanico } from "./pages/mecanico/vista_mecanico";
import { Vista_encargado } from "./pages/encargado/vista_encargado";

import { Page_logo } from "./pages/page_logo/page_logo";
import { Vista_login } from "./pages/page_login/vista_login";
import { Vista_Login_Admin } from "./pages/page_login/vista_login_admin";


import { Formulario_rechazos } from "./component/formularios/formulario_rechazos";
import { Admin } from "./pages/admin/admin";
import { FooterHome } from "./component/footers/footerHome";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Vista_login />} path="/vista_login" />
            <Route element={<Vista_Login_Admin />} path="/loginAdmin" />
            <Route
              element={<Vista_clasificadora />}
              path="/vista_login/vista_clasificadora"
            />
            <Route
              element={<Container_clasificadora />}
              path="/vista_login/vista_clasificadora/:id"
            />
            <Route
              element={<Vista_mecanico />}
              path="/vista_login/vista_mecanico"
            />
            <Route
              element={<Container_mecanico />}
              path="/vista_login/vista_mecanico/:id"
            />
            <Route
              element={<Vista_encargado />}
              path="/vista_login/vista_encargado"
            />

            <Route element={<Formulario_rechazos />} path="/rechazos" />
            <Route element={<Admin />} path="loginAdmin/admin" />

            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
