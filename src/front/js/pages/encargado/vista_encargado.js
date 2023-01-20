import React, { useEffect, useState, useRef } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-date-picker";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table} from "antd";
import Highlighter from "react-highlight-words";



import "../../../styles/calendar.css";
import "../../../styles/home.css";
export const Vista_encargado = () => {
  const [resultJoin, setResultJoin] = useState([]);
  const [resultMecanico, setResultMecanido] = useState([]);
  const [resultRechazos, setResultRechazos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [turno, setTurno] = useState("");
  const [fecha, setFecha] = useState("");
  const [enviarFormulario, setFormulario] = useState(false);
  const [role, setRole] = useState("");


  // ----------------- FECHA ----------------
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  let day = fechaSeleccionada.getDate();
  let month = fechaSeleccionada.getMonth() + 1;
  let year = fechaSeleccionada.getFullYear();
  let fechaConvertida = `${month}/${day}/${year}`;

  /*-----------------------------PAGINACION---------------------------------*/
  const [pagina1, setpagina1] = useState("");
  const [pagina2, setPagina2] = useState("");


  const printCondicitional = () => {
    if (pagina1 === pagina1) {
      setpagina1("visibility");
      setPagina2("hidden");
    } else {
      console.log("nada");
    }
  };

  //------------ ENVIO DE REPORTE AL MAIL----------------- //

  const sendDataEncargado = () => {
    fetch(process.env.BACKEND_URL + "/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fecha: fecha,
        turno: turno,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setResultJoin(result.clasificadora);
        setResultMecanido(result.mecanico);
        setResultRechazos(result.rechazos);
      })
      .catch((error) => {
        if (result==[]){
          alert("error al filtrar los datos, verifique la informacion")
        }
      });
  };
  const sendMail =()=>{
    fetch(process.env.BACKEND_URL + "/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fecha: fecha,
        turno: turno,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Email enviado Correctamente")
      })
      .catch((error) => {
        alert("No se ha enviado el Email")
      });
  };
  // ------FUNCIONES MOSTRAR Y OCULTAR ----------------------

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columnsClasificadora = [
    {
      title: "Clasificadora",
      dataIndex: "usuarioClasificadora",
      key: "usuarioClasificadora",
      width: "30%",
      ...getColumnSearchProps("usuarioClasificadora"),
    },
    {
      title: "Problema",
      dataIndex: "problemaClasificadora",
      key: "problemaClasificadora",
      width: "30%",
      ...getColumnSearchProps("problemaClasificadora"),
    },
    {
      title: "Hora",
      dataIndex: "horaClasificadora",
      key: "horaClasificadora",
      width: "30%",
      ...getColumnSearchProps("horaClasificadora"),
    },
    {
      title: "Cajas",
      dataIndex: "cajas",
      key: "cajas",
      width: "30%",
      ...getColumnSearchProps("cajas"),
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      width: "30%",
      ...getColumnSearchProps("fecha"),
    },
    {
      title: "Articulo",
      dataIndex: "articulo",
      key: "articulo",
      width: "30%",
      ...getColumnSearchProps("articulo"),
    },
    {
      title: "Lote",
      dataIndex: "lote",
      key: "lote",
      width: "30%",
      ...getColumnSearchProps("lote"),
    },
    {
      title: "Jaulas",
      dataIndex: "jaulas",
      key: "jaulas",
      width: "30%",
      ...getColumnSearchProps("jaulas"),
    },
    {
      title: "Pedido",
      dataIndex: "pedido",
      key: "pedido",
      width: "30%",
      ...getColumnSearchProps("pedido"),
    },
    {
      title: "Personal",
      dataIndex: "personal",
      key: "personal",
      width: "30%",
      ...getColumnSearchProps("personal"),
    },
    {
      title: "Accion",
      dataIndex: "accionClasificadora",
      key: "accionClasificadora",
      width: "30%",
      ...getColumnSearchProps("accionClasificadora"),
    },
    {
      title: "Tiempo",
      dataIndex: "tiempo",
      key: "tiempo",
      width: "30%",
      ...getColumnSearchProps("tiempo"),
    },
    {
      title: "Velocidad",
      dataIndex: "velocidad",
      key: "velocidad",
      width: "30%",
      ...getColumnSearchProps("velocidad"),
    },
    {
      title: "Gramos",
      dataIndex: "gramos",
      key: "gramos",
      width: "30%",
      ...getColumnSearchProps("gramos"),
    },
  ];
  const columnsRechazos = [
    {
      title: "Fichas",
      dataIndex: "fichas",
      key: "fichas",
      width: "30%",
      ...getColumnSearchProps("fichas"),
    },
    {
      title: "Paneles",
      dataIndex: "paneles",
      key: "paneles",
      width: "30%",
      ...getColumnSearchProps("paneles"),
    },
    {
      title: "Jaula",
      dataIndex: "jaula",
      key: "jaula",
      width: "30%",
      ...getColumnSearchProps("jaula"),
    },
  ];
  const columnsMecanico = [
    {
      title: "Mecanico",
      dataIndex: "userMecanico",
      key: "userMecanico",
      width: "30%",
      ...getColumnSearchProps("userMecanico"),
    },
    {
      title: "Problema",
      dataIndex: "problemaMecanico",
      key: "problemaMecanico",
      width: "30%",
      ...getColumnSearchProps("problemaMecanico"),
    },
    {
      title: "Accion",
      dataIndex: "accionMecanico",
      key: "accionMecanico",
      width: "30%",
      ...getColumnSearchProps("accionMecanico"),
    },
    {
      title: "Hora",
      dataIndex: "horaDelMecanico",
      key: "horaDelMecanico",
      width: "30%",
      ...getColumnSearchProps("horaDelMecanico"),
    },
  ];
  return (
    <>
    <div className="container-fluid text-center">
      <div className="row">
      <Formik
        initialValues={{
          turno: "",
          fecha: "",
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          setFormulario(true);
          setTimeout(() => setFormulario(false), 5000);
        }}
      >
        {() => (
          <div className="containerPagina1">
            <div className={pagina1 === "visibility" ? "hidden" : "visibility"}>
              <Form className="formularioEncargado">
                <div className="text-center p-2">
                  <h2 className="tituloTurno">--- Turnos ---</h2>
                  <button
                    onClick={(e) => {
                      setTurno(e.target.value),
                        setRole("seleccionNocheTardeGris");
                    }}
                    type="button"
                    name="turno"
                    id="turno"
                    value="mañana"
                    className={
                      role === "seleccionNocheTardeGris"
                        ? "seleccionTurnoNocheVerde"
                        : "seleccionTurnoNocheGris"
                    }
                  >
                    Mañana
                  </button>

                  <button
                    onClick={(e) => {
                      setTurno(e.target.value),
                        setRole("seleccionTurnoTardeGris");
                    }}
                    type="button"
                    name="turno"
                    id="turno"
                    value="tarde"
                    className={
                      role === "seleccionTurnoTardeGris"
                        ? "seleccionTurnoTardeVerde"
                        : "seleccionTurnoTardeGris"
                    }
                  >
                    tarde
                  </button>

                  <button
                    onClick={(e) => {
                      setTurno(e.target.value),
                        setRole("seleccionTurnoMañanaGris");
                    }}
                    type="button"
                    name="turno"
                    id="turno"
                    value="noche"
                    className={
                      role === "seleccionTurnoMañanaGris"
                        ? "seleccionTurnoMañanaVerde"
                        : "seleccionTurnoMañanaGris"
                    }
                  >
                    noche
                  </button>
                </div>
                {/*----------------------FECHA MUI-------------------*/}
                <div className="text-center m-3">
                  <h4 className="tituloFecha">--- Fecha ---</h4>
                  <DatePicker
                    id="calendar"
                    onChange={setFechaSeleccionada}
                    value={fechaSeleccionada}
                    calendarClassName="react-calendar"
                    // tyle={{ backgroundColor: fff }}
                  />
                </div>
                {/*----------------------FeNVIO DATOS-------------------*/}
                <div className="text-center botonSagrado">
                  <button onClick={setFecha(fechaConvertida)}>Click</button>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button
                    type="submit"
                    onClick={() => {
                      sendDataEncargado(), printCondicitional();
                    }}
                  >
                    Aplicar filtros
                  </button>
                </div>
                <div>
                  {enviarFormulario && (
                    <div
                      className="alert alert-success text-center"
                      width={200}
                      role="alert"
                    >
                      Filtros aplicados con éxito!
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <div className={pagina2 === "hidden" ? "visibility" : "hidden"}>
      <div className="mt-5">
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <Table id="dtHorizontalExample" className="table table-bordered table-striped table-sm mb-0" columns={columnsClasificadora} dataSource={resultJoin} />
            </div>
            </div>
        <div className="mt-5">
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <Table id="dtHorizontalExample" className="table table-bordered table-striped table-sm mb-0" columns={columnsRechazos} dataSource={resultRechazos} />
            </div>
        </div>
        <div className="mt-5">
            <div className="table-wrapper-scroll-y my-custom-scrollbar col-12">
              <Table id="dtHorizontalExample" className="table table-bordered table-striped table-sm mb-0" columns={columnsMecanico} dataSource={resultMecanico} />
            </div>
        </div>
            <div className="col-12 mt-5">
              <button
                type="button"
                className="buttonNuevaConsulta"
                onClick={() => {
                  window.location.reload(true);
                }}
              >
                Nueva Consulta
              </button>
            </div>
            <div className="col-12 mt-5">
              <button
                type="button"
                className="buttonNuevaConsulta"
                onClick={() => {
                  sendMail()
                }}
              >
                Enviar Email
              </button>
            </div>
      </div>
      </div>
      </div>
    </>
  );
};
