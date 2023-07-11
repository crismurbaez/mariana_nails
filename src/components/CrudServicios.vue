<template>
  <div class="centrado">
    <h1 class="titulo">{{ titulo }}</h1>
    <br /><br />
    <button id="listButton" class="boton" v-on:click="listButton(e)">
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
  computed: {
    ...mapState(["data1", "data2", "data3", "cart", "count", "servicios"]),
  },
  methods: {
    ...mapMutations(["listButton"]),
    submitFormServ(e) {
      // e.preventDefault();
      console.log(
        "llegamos al submit-------------------------------",
        e.target.elements.codigo.value
      );
      var form = e.target;
      var url = "https://codoweb.pythonanywhere.com/servicios";
      var data = JSON.stringify({
        codigo: form.elements.codigo.value,
        aplicacion: form.elements.aplicacion.value,
        servicio: form.elements.servicio.value,
        precio: parseFloat(form.elements.precio.value),
      });

      fetch(url, {
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
            timer: 1000,
          });
          alert(responseData.message);
          form.reset();
        })
        .catch(function (error) {
          alert(error.message);
        });
    },
    deleteForm(e) {
      var form = e.target;
      var url =
        "https://codoweb.pythonanywhere.com/servicios/" +
        form.elements.deleteCodigo.value;

      fetch(url, {
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
          alert(responseData.message);
          form.reset();
        })
        .catch(function (error) {
          alert(error.message);
        });
    },
    updateForm(e) {
      // e.preventDefault();
      var form = e.target;
      var url =
        "https://codoweb.pythonanywhere.com/servicios/" +
        form.elements.updateCodigo.value;
      var data = JSON.stringify({
        aplicacion: form.elements.updateAplicacion.value,
        servicio: form.elements.updateServicio.value,
        precio: parseFloat(form.elements.updatePrecio.value),
      });

      fetch(url, {
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
          alert(responseData.message);
          form.reset();
        })
        .catch(function (error) {
          alert(error.message);
        });
    },
  },
};
</script>
<style>
/* Formulario */
.titulo {
  text-align: center;
}

.boton {
  border-radius: 10px;
  padding: 5px;
  background-color: var(--oscuro);
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
  background-color: var(--claro);
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
}

.centrado {
  text-align: center;
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