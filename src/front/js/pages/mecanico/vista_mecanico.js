import React, { useContext} from "react";
import { Context } from "../../store/appContext";

import { Horas_mecanico } from "../../component/horas/horas_mecanico";
import { FooterMecanico } from "../../component/footers/footerMecanico";


export const Vista_mecanico = () => {
  const { store, actions } = useContext(Context);
  

  return (
    <>
      
        <div className="container-fluid  text-center">
          <div className="align-items-start m-5">
            <Horas_mecanico />
          </div>
          <div className="container">
         <FooterMecanico/>
          </div>
        </div>
      
    </>
  );
};
