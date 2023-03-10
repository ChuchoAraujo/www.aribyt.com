const getState = ({ getStore, getActions, setStore }) => {
	return {
    store: {
      horas: ["1", "2", "3", "4", "5", "6", "7", "8"],
      hora: "",
      horamec: "",
      userId: "",
      message: null,
      role: "",
      problema: "",
      user: [],
      clasificadora: [],
      mecanico: [],
      contadorCajas: 0,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      selectionRoles: (role) => {
        // const store = getStore()
        setStore({ role: role });
        console.log("Se ha seleccionado el:" + role);
      },

      selectionHora: (hora) => {
        // const store = getStore()
        setStore({ hora: hora });
      },
      selectionProblema: (problema) => {
        // const store = getStore()
        setStore({ problema: problema });
        console.log("Se ha seleccionado el problema:" + problema);
      },
      selectionHoraMec: (hora) => {
        // const store = getStore()
        setStore({ horamec: hora });
      },

      fetchUser: () => {
        fetch(process.env.BACKEND_URL + "/api/encargado", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((response) => response.json())
          .then((result) => {
            setStore({ user: result.user });
            setStore({ clasificadora: result.clasificadora });
            setStore({ mecanico: result.mecanico });
          })
          .catch((error) => console.log("error", error));
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
