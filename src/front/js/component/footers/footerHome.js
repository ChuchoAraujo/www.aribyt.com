import React, { Component } from "react";
import { ImMail4 } from "react-icons/im";
import { AiFillGithub } from "react-icons/ai";
import { MdContactSupport } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export const FooterHome = () => (
  <footer className="container-fluid text-center footer">
    <div className="row">
      <div className="col-6">
        <BsLinkedin className="iconos_footer" />
        <AiFillGithub className="iconos_footer" />
        <ImMail4 className="iconos_footer" />
        <MdContactSupport className="iconos_footer" />
      </div>
      <div className="col-6">
        <p className="textoFooter1">
          <AiOutlineCopyrightCircle className="me-2" />
         2023 Aribyt
        </p>
      </div>
    </div>
  </footer>
);
