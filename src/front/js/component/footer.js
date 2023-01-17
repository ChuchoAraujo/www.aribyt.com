import React, { Component } from "react";
import { ImMail4 } from "react-icons/im";
import { AiFillGithub } from "react-icons/ai";
import { MdContactSupport } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export const Footer = () => (
  <footer className="footer container-fluid text-center">
    <div>
      <BsLinkedin className="iconos_footer" />
      <AiFillGithub className="iconos_footer" />
      <ImMail4 className="iconos_footer" />
      <MdContactSupport className="iconos_footer" />
    </div>
    <div>
      <p className="textoFooter1">
        <AiOutlineCopyrightCircle className="me-2" />
        Copyright Aribyt 2023
      </p>
    </div>
  </footer>
);
