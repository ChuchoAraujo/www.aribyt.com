import React, { useContext} from "react";
import { Layout, Space } from "antd";
const { Footer } = Layout;
import Icon_Clasificadora from "../icons/icon_clasificadora";
import { Context } from "../../store/appContext";

export const FooterClasificadora = () => {
  const { store } = useContext(Context);
  const footerStyle = {
    textAlign: "center",
    color: "white;",
    backgroundColor: "#4dada4",
    position: "fixed",
    padding: 0,
    left: 0,
    bottom: 0,
    width: "100%",
  };
  return (
    <>
      <Space direction="vertical" style={footerStyle}>
        <Layout>
          <Footer style={footerStyle}>
            <div className="textoFooter1 alinear">
              <Icon_Clasificadora className="iconoFormMec" />
              {store.role}
            </div>
          </Footer>
        </Layout>
      </Space>
    </>
  );
};
