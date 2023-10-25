import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
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
    //TAMBIÉN ME ESTÁ DANDO UN ERROR DE KEY, A TODOS LOS ELEMENTOS DE CART LE PONE ID=2, VER CÓMO SE HACE
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
      console.log("cart-----------------------", state.cart);
      console.log("count-----------------------", state.count);
      console.log("total-----------------------", state.total);
    },
    addCart(state, data) {
      let id = 1;
      let coincidencia = false;
      let indice = -1;
      let cantidad = 0;
      let eliminado = 0;
      let totalPrecio = 0;
      if (state.cart.length === 0) {
        state.cart.push({ data, cantidad: 1, id: id });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        //este push a variable local, se cambiará por el post que me guarda en base de datos

        // fetch(URL + 'carrito', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         codigo: producto.codigo,
        //         cantidad: 1, // Agregamos una unidad al carrito
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         alert(data.message)
        //     })
        //     .catch(error => {
        //         console.error('Error al agregar el producto al carrito:', error)
        //         alert('Error al agregar el producto al carrito.')
        //     })

        state.count = 1;
        console.log('---------------------------------------------------', state.cart[0].data.precio)
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
          // swal({
          //   title: `Se agregó una unidad más  `,
          //   text: `del servicio ${data.servicio}`,
          //   icon: "success",
          //   buttons: false,
          //   timer: 1000,
          // });
        } else {
          //si el servicio no está en el carrito, se agrega el nuevo servicio
          id = id + 1;
          state.cart.push({ data, cantidad: 1, id: id });
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
      let id = 1;
      let coincidencia = false;
      let indice = -1;
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
        indice = -1;
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].data.codigo === data.codigo) {
            coincidencia = true;
            indice = i;
            break;
          }
        }
        //si el servicio está en el carrito, se elimina toda la data del servicio
        if (coincidencia === true) {
          cantidad = state.cart[indice].cantidad;
          eliminado = state.cart.splice([indice], 1);
          for (let index = 0; index < cantidad; index++) {
            state.count--;
            totalPrecio = state.total
            state.total = totalPrecio - state.cart[indice].data.precio;
          }

          //cuando funcione la base de datos agregar este código y adaptarlo

          // fetch(URL + 'carrito', {
          //     method: 'DELETE',
          //     headers: {
          //         'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //         codigo: producto.codigo,
          //         cantidad: 1, // Restamos una unidad del carrito
          //     }),
          // })
          //     .then(response => response.json())
          //     .then(data => {
          //         alert(data.message)
          //     })
          //     .catch(error => {
          //         console.error('Error al restar el producto del carrito:', error)
          //         alert('Error al restar el producto del carrito.')
          //     })

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
      let indice = -1;
      let cantidad = 0;
      let eliminado = 0;
      let totalPrecio = 0;
      if (state.cart.length === 0) {
        // fetch(URL + 'carrito', {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         codigo: producto.codigo,
        //         cantidad: 1, // Restamos una unidad del carrito
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         alert(data.message)
        //     })
        //     .catch(error => {
        //         console.error('Error al restar el producto del carrito:', error)
        //         alert('Error al restar el producto del carrito.')
        //     })

        swal({
          title: `Carrito Vacío`,
          text: `No hay nada en el carrito`,
          icon: "error",
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
        //si el servicio está en el carrito, se resta una unidad
        if (coincidencia === true) {
          if (state.cart[indice].cantidad > 1) {
            //si el servicio tiene más de 1, se elimina una unidad de la cantidad, de los contrario no se hace nada
            cantidad = state.cart[indice].cantidad - 1;
            state.cart[indice].cantidad = cantidad;
            state.count--;
            totalPrecio = state.total
            state.total = totalPrecio - state.cart[indice].data.precio;

            //lo quito porque es redundante

            // swal({
            //     title: `Se quitó una unidad`,
            //     text: `del servicio ${data.servicio}`,
            //     icon: "success",
            //     buttons: false,
            //     timer: 1000,
            // })
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
    // obtenerCarrito() {
    //   fetch(URL + "carrito")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       state.cart = data;
    //       this.mostrarCarrito = true;
    //     })
    //     .catch((error) => {
    //       console.error("Error al obtener el carrito:", error);
    //       alert("Error al obtener el carrito.");
    //     });
    // },
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


