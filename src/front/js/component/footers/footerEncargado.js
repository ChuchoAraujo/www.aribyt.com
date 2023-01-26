import React, {useContext} from "react";
import { Layout, Space} from 'antd';
const { Footer} = Layout
import Icon_encargado from "../icons/icon_encargado"
import { Context } from "../../store/appContext";

export const FooterEncargado =()=>{
  const {store} = useContext(Context);
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