<template>
  <div class="centrado">
    <br /><br />
    <h2 class="texto-nav servicios-h">{{ titulo }}</h2>
    <br /><br />
    <button id="listButton" class="boton" v-on:click="listButton()">
      List Services
    </button>
    <br /><br />
    <div class="contenedor">
      <form id="serviceForm" v-on:submit.prevent="submitFormServ">
        <label for="codigo">Código:</label>
        <input
          type="number"
          id="codigo"
          name="codigo"
          v-model="codigo"
          required
        /><br /><br />

        <label for="aplicacion">Aplicación:</label>
        <input
          type="text"
          id="aplicacion"
          name="aplicacion"
          v-model="aplicacion"
          required
        /><br /><br />

        <label for="servicio">Servicio:</label>
        <input
          type="text"
          id="servicio"
          name="servicio"
          v-model="servicio"
          required
        /><br /><br />

        <label for="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          step="0.01"
          v-model="precio"
          required
        /><br /><br />

        <input type="submit" value="Add Service" class="submit" />
      </form>
      <br /><br />

      <form id="updateForm" v-on:submit.prevent="updateForm">
        <label for="updateCodigo">Código:</label>
        <input
          type="number"
          id="updateCodigo"
          name="updateCodigo"
          required
        /><br /><br />

        <label for="updateAplicacion">Aplicación:</label>
        <input
          type="text"
          id="updateAplicacion"
          name="updateAplicacion"
          required
        /><br /><br />

        <label for="updateServicio">Servicio:</label>
        <input
          type="text"
          id="updateServicio"
          name="updateServicio"
          required
        /><br /><br />

        <label for="updatePrecio">Precio:</label>
        <input
          type="number"
          id="updatePrecio"
          name="updatePrecio"
          step="0.01"
          required
        /><br /><br />

        <input type="submit" value="Update Service" class="submit" />
      </form>

      <form id="deleteForm" v-on:submit.prevent="deleteForm">
        <label for="deleteCodigo">Código:</label>
        <input
          type="number"
          id="deleteCodigo"
          name="deleteCodigo"
          required
        /><br /><br />

        <input type="submit" value="Delete Service" class="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Servicios",
  data: () => ({
    titulo: "Administración de servicios",
    codigo: "",
    aplicacion: "",
    servicio: "",
    precio: "",
  }),
  mounted() {
    var URL = process.env.VUE_APP_ROOT_API_INVENTARIO;
  },
  computed: {
    ...mapState(["data1", "data2", "data3", "cart", "count", "servicios"]),
  },
  methods: {
    ...mapMutations(["listButton"]),
    submitFormServ(e) {
      var form = e.target;
      var URL = process.env.VUE_APP_ROOT_API_INVENTARIO;
      var data = JSON.stringify({
        codigo: form.elements.codigo.value,
        aplicacion: form.elements.aplicacion.value,
        servicio: form.elements.servicio.value,
        precio: form.elements.precio.value,
      });
      // precio: parseFloat(form.elements.precio.value),
      fetch(URL + "/servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then(function (responseData) {
          swal({
            title: `${responseData.message}`,
            text: ``,
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          form.reset();
        })
        .catch(function (error) {
          swal({
            title: `Error`,
            text: `${error.message}`,
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        });
    },
    deleteForm(e) {
      var form = e.target;
      var URL = process.env.VUE_APP_ROOT_API_INVENTARIO;
      var codigoDelete = form.elements.deleteCodigo.value;
      fetch(URL + "/servicio/" + codigoDelete, {
        method: "DELETE",
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then(function (responseData) {
          swal({
            title: `Deleted`,
            text: `${responseData.message}`,
            icon: "success",
            buttons: false,
            timer: 2000,
          });
          form.reset();
        })
        .catch(function (error) {
          swal({
            title: `Error`,
            text: `${error.message}`,
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        });
    },
    updateForm(e) {
      var form = e.target;
      var URL = process.env.VUE_APP_ROOT_API_INVENTARIO;
      var codigoUpdate = form.elements.updateCodigo.value;
      var data = JSON.stringify({
        aplicacion: form.elements.updateAplicacion.value,
        servicio: form.elements.updateServicio.value,
        precio: form.elements.updatePrecio.value,
      });
      // precio: parseFloat(form.elements.updatePrecio.value), por ahora recibo sólo Strings
      // creo que lo voy a dejar así, porque sino siempre hay que cambiar los formatos,
      // mejor cambiarlos cuando los recibo en el front de acuerdo a lo que quiero hacer
      fetch(URL + "/servicio/" + codigoUpdate, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then(function (responseData) {
          swal({
            title: `Actualizado`,
            text: `${responseData.message}`,
            icon: "success",
            buttons: false,
            timer: 2000,
          });

          form.reset();
        })
        .catch(function (error) {
          swal({
            title: `Error`,
            text: `${error.message}`,
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        });
    },
  },
};
</script>
<style>
/* Formulario */
.centrado {
  text-align: center;
  background-color: var(--claro);
}
.titulo {
  text-align: center;
}

.boton {
  border-radius: 10px;
  padding: 5px;
  background-color: white;
  width: 150px;
  justify-content: center;
}
.contenedor {
  margin: 1rem 0px;
  display: flex;
  justify-content: space-evenly;
}
form {
  text-align: left;
  width: auto;
  padding: 2rem;
  border: 1px solid var(--border);
  background-color: var(--claro2);
  margin: 10px;
  border-radius: 10px;
}

form input {
  width: 100%;
  height: 25px;
  border-radius: 10px;
  background-color: white;
}

form select {
  width: 100%;
  height: 25px;
  border-radius: 10px;
}

form textarea {
  width: 100%;
  border-radius: 10px;
}
.submit {
  background-color: var(--oscuro);
  height: 35px;
}

.b1 {
  color: var(--texto);
  border-radius: 3px;
  border: 1px solid var(--border);
  padding: 5px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.b1:hover {
  opacity: 1;
  box-shadow: none;
}
</style>