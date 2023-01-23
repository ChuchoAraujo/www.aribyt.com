import React, { Component } from "react";
import { ImMail4 } from "react-icons/im";
import { AiFillGithub } from "react-icons/ai";
import { MdContactSupport } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { Layout, Space} from 'antd';
const { Footer} = Layout

export const FooterHome = () => {

  const footerStyle = {
    textAlign: 'center',
    color: 'white;',
    backgroundColor: '#4dada4',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  }
  return(
        <>
<Space direction="vertical" style={{ width: '100%' }} >
        <Layout>
        <Footer style={footerStyle}>
          <div>
        <BsLinkedin className="iconos_footer" />
        <AiFillGithub className="iconos_footer" />
        <ImMail4 className="iconos_footer" />
        <MdContactSupport className="iconos_footer" />
        </div>
      <div className="textoFooter1 mt-2">
        <AiOutlineCopyrightCircle className="me-2" />
        2023 Aribyt
        </div>
        </Footer>
      </Layout>
 </Space>
      </>
  )


};
