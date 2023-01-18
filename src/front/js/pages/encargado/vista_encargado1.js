import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

export const Vista_encargado_1 = () => {
  const [resultJoin, setResultJoin] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fecha: "1/15/2023",
        turno: "tarde",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setResultJoin(result.clasificadora);
      })
      .catch((error) => console.log("error", error));
  }, []);

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

  const columns = [
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

  console.log("columnas", resultJoin);

  return <Table columns={columns} dataSource={resultJoin} />;
};
