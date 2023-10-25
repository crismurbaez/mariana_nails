import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    indice: -1,
    count: 0,
    total: 0,
    servicios: [],
    data1: [],
    data2: [],
    data3: [],
  },
  getters: {
  },
  mutations: {
    ///ESTE ES EL MISMO QUE TENGO EN CARRITOBUY EN MOUNTED(), DEBO VER CÓMO LLEVAR 
    ///PARA QUE FUNCIONE BIEN
    //HAY QUE ARREGLAR VARIOS PROBLEMAS
    //NO SUBÍ AL GITHUB ESTE CÓDIGO!!!!!!!!!!!!
    //HAY QUE ARREGLAR:
    //CUANDO ELIMINO UN SERVICIO NO SE ELIMINA DE LOCAL
    //CUANDO RESTO UNA CONTIDAD NO SE MODIFICA EN LOCAL
    //EN OCASIONES FUNCIONA MAL EL CÁLCULO DE COUNT Y TOTAL DEL PRECIO
    //TAMBIÉN ME ESTÁ DANDO UN ERROR DE KEY, A TODOS LOS ELEMENTOS DE CART LE PONE ID=2, VER CÓMO SE HACE-->listo
    obtenerCarrito() {
      if (localStorage.getItem("cart")) {
        try {
          state.cart = JSON.parse(localStorage.getItem("cart"));
        } catch (e) {
          console.log(e);
        }
      }
      let carrito = state.cart;
      let cantidad = 0;
      let totalPrecio = 0;
      for (let i = 0; i < carrito.length; i++) {
        cantidad = cantidad + carrito[i].cantidad;
        totalPrecio = totalPrecio + carrito[i].data.precio * carrito[i].cantidad;
      }
      state.count = cantidad;
      state.total = totalPrecio;
    },
    addCart(state, data) {
      let id = 1;
      let coincidencia = false;
      let indice = -1;
      let cantidad = 0;
      let eliminado = 0;
      let totalPrecio = 0;
      if (state.cart.length === 0) {
        state.cart.push({ data, cantidad: 1, id: data._id.$oid });

        localStorage.setItem("cart", JSON.stringify(state.cart));

        state.count = 1;
        state.total = state.cart[0].data.precio;

        totalPrecio = state.total;
        swal({
          title: `${state.cart[0].data.servicio}`,
          text: `se agregó al carrito`,
          icon: "success",
          buttons: false,
          timer: 1000,
        });
      } else {
        coincidencia = false;
        indice = -1;
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].data.codigo === data.codigo) {
            coincidencia = true;
            indice = i;
            break;
          }
        }
        //si el servicio ya está en el carrito, se suma una unidad 
        if (coincidencia === true) {
          cantidad = state.cart[indice].cantidad + 1;
          state.cart[indice].cantidad = cantidad;
          state.count++;
          totalPrecio = state.total
          state.total = totalPrecio + state.cart[indice].data.precio;
          localStorage.setItem("cart", JSON.stringify(state.cart));
          swal({
            title: `Se agregó una unidad más  `,
            text: `del servicio ${data.servicio}`,
            icon: "success",
            buttons: false,
            timer: 1000,
          });
        } else {
          //si el servicio no está en el carrito, se agrega el nuevo servicio
          id = id + 1;
          state.cart.push({ data, cantidad: 1, id: data._id.$oid });
          state.count++;
          totalPrecio = state.total
          state.total = totalPrecio + data.precio;
          localStorage.setItem("cart", JSON.stringify(state.cart));
          swal({
            title: `${data.servicio}`,
            text: `se agregó al carrito`,
            icon: "success",
            buttons: false,
            timer: 1000,
          });
        }
      }
    },
    trashCart(state, data) {
      let coincidencia = false;
      state.indice = -1;
      let cantidad = 0;
      let eliminado = 0;
      let totalPrecio = 0;
      if (state.cart.length === 0) {
        swal({
          title: `Carrito Vacío`,
          text: `No hay nada en el carrito`,
          icon: "error",
          buttons: false,
          timer: 1000,
        });
      } else {
        coincidencia = false;
        state.indice = -1;
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].data._id.$oid === data._id.$oid) {
            coincidencia = true;
            state.indice = i;
            break;
          }
        }
        //si el servicio está en el carrito, se elimina toda la data del servicio
        if (coincidencia === true) {
          cantidad = state.cart[state.indice].cantidad;

          for (let index = 0; index < cantidad; index++) {
            state.count--;
            totalPrecio = state.total
            state.total = totalPrecio - state.cart[state.indice].data.precio;
          }
          eliminado = state.cart.splice([state.indice], 1);
          //actualizo los datos del localStorage que hay en el estado
          localStorage.setItem("cart", JSON.stringify(state.cart));
          coincidencia = false;
          state.indice = -1;

          swal({
            title: `Se eliminó del carrito`,
            text: `el servicio ${data.servicio}`,
            icon: "success",
            buttons: false,
            timer: 1000,
          });
        } else {
          swal({
            title: `Servicio inexistente`,
            text: `Ese servicio no está cargado en el carrito`,
            icon: "error",
            buttons: false,
            timer: 1000,
          });
        }
      }
    },
    minusCart(state, data) {
      let id = 1;
      let coincidencia = false;
      state.indice = -1;
      let cantidad = 0;
      let eliminado = 0;
      let totalPrecio = 0;
      if (state.cart.length === 0) {
        swal({
          title: `Carrito Vacío`,
          text: `No hay nada en el carrito`,
          icon: "error",
          buttons: false,
          timer: 1000,
        });
      } else {
        coincidencia = false;
        state.indice = -1;
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].data.codigo === data.codigo) {
            coincidencia = true;
            state.indice = i;
            break;
          }
        }
        //si el servicio está en el carrito, se resta una unidad
        if (coincidencia === true) {
          if (state.cart[state.indice].cantidad > 1) {
            //si el servicio tiene más de 1, se elimina una unidad de la cantidad, de los contrario no se hace nada
            cantidad = state.cart[state.indice].cantidad - 1;
            state.cart[state.indice].cantidad = cantidad;
            state.count--;
            totalPrecio = state.total
            state.total = totalPrecio - state.cart[state.indice].data.precio;
            saveCart()

            swal({
              title: `Se quitó una unidad`,
              text: `del servicio ${data.servicio}`,
              icon: "success",
              buttons: false,
              timer: 1000,
            })
          } else {
            swal({
              title: `Solo hay una unidad, elimínalo`,
              text: `${data.servicio}`,
              icon: "error",
              buttons: false,
              timer: 1000,
            });
          }
        } else {
          swal({
            title: `Servicio inexistente`,
            text: `Ese servicio no está cargado en el carrito`,
            icon: "error",
            buttons: false,
            timer: 1000,
          });
        }
      }
    },

    listButton() {
      var URL = process.env.VUE_APP_ROOT_API_INVENTARIO;

      fetch(URL + "/servicios")
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then(function (responseData) {
          var services = responseData.services;
          var message = "";
          services.forEach(function (service) {
            message += "Código: " + service.codigo + "\n";
            message += "Aplicación: " + service.aplicacion + "\n";
            message += "Servicio: " + service.servicio + "\n";
            message += "Precio: " + service.precio + "\n\n";
          });
          swal({
            title: `Lista de servicios`,
            text: `${message}`,
            icon: null,
            buttons: true,
          });
        })
        .catch(function (error) {
          alert(error.message);
        });
    },
    saveCart() {
      const parsed = JSON.stringify(state.cart);
      window.localStorage.setItem('cart', parsed);

    },

  },
  actions: {
    // obtenerServicios(state, data) {
    //   const url = "https://codoweb.pythonanywhere.com"

    //   fetch(url + "/servicios", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Response received:", data);
    //       state.servicios = [...data];
    //       // Handle the response data as needed
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       // Handle any errors that occur during the request
    //     });
    // },
  },
  modules: {
  }
}
);


