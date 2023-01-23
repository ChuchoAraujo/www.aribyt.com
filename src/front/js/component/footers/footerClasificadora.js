import React,{useContext} from "react";
import { Layout, Space } from 'antd';
const { Footer} = Layout;
import Icon_Clasificadora from "../icons/icon_clasificadora"
import { store, actions } from "../../store/flux";
import { Context } from "../../store/appContext";

export const FooterClasificadora =()=>{
  const { store, actions } = useContext(Context);
    const footerStyle = {
      textAlign: 'center',
      color: 'white;',
      backgroundColor: '#4dada4',
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      };
      return( 
        <>
<Space direction="vertical" style={{ width: '100%' }} >
        <Layout >
        <Footer style={footerStyle}>
        <div className="textoFooter1 alinear">
        <Icon_Clasificadora className="iconoFormMec"/>
        {store.role}{" "}
          Cajas Reales{": "}
        {store.contadorCajas}
        </div>
        </Footer>
      </Layout>
 </Space>
      </>
      )
}