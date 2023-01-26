import React, { useContext} from "react";
import { store, actions } from "../../store/flux";
import { Context } from "../../store/appContext";
import Icon_Mecanico from "../icons/icon_mecanico";
import { Layout, Space } from 'antd';
const { Footer} = Layout;

export const FooterMecanico = () => {
  const { store, actions } = useContext(Context);

    const footerStyle = {
      textAlign: 'center',
      color: 'white;',
      backgroundColor: '#4dada4',
      position: 'fixed',
      padding: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      };
      return( 
        <>
<Space direction="vertical" style={footerStyle} >
        <Layout >
        <Footer style={footerStyle}>
        <div className="textoFooter1 alinear">
        <Icon_Mecanico className="iconoFormMec"/>
        {store.role}
        </div>
        </Footer>
      </Layout>
 </Space>
      </>
      )
};
