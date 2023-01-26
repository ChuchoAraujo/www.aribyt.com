import React,{useContext} from 'react';
import { App, Space } from 'antd';
import { Context } from "../store/appContext";

// Sub page

const Modal = () => {
  const {store } = useContext(Context);
  const { modal } = App.useApp();
  const showModal = () => {
    modal.success({
      title: 'La sumatoria de cajas hasta ahora son :',
      content: `${store.contadorCajas}`,
    });
  };

  return (
    <Space >
      <button className='botonConsultarCajas' onClick={showModal}>
        Consultar Cajas
      </button>
    </Space>
  );
};
// Entry component
export default () => (
  <App>
    <Modal />
  </App>
);