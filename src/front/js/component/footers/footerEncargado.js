import React, {useContext} from "react";
import { Layout, Space} from 'antd';
const { Footer} = Layout
import Icon_encargado from "../icons/icon_encargado"
import store from "../../store/flux"
import { Context } from "../../store/appContext";

export const FooterEncargado =()=>{
  const { store, actions } = useContext(Context);
    const footerStyle = {
        textAlign: 'center',
        color: 'white;',
        backgroundColor: '#4dada4',
        position: 'relative',
        left: 0,
        bottom: 0,
        width: '100%',
      };
      return( 
        <>
<Space direction="vertical" style={{ width: '100%' }} >
        <Layout>
        <Footer style={footerStyle}>
            <Icon_encargado width={80} />
            <div className="textoFooter2">Responsable :{store.role}</div>
        </Footer>
      </Layout>
 </Space>
      </>
      )
}