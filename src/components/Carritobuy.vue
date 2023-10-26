<template>
  <!-- Lista servicios -->
  <section class="seccion-clara serv-section" id="cart">
    <div>
      <h2 class="texto-nav servicios-h">{{ titulo }}</h2>
    </div>
    <hr class="bg-oscuro" />
    <div class="cart">
      <div>{{ count }}</div>
      <router-link to="/carrito">
        <img class="icon-cart" src="imagenes/cart.svg" />
      </router-link>
    </div>

    <div class="servicios servicios-section">
      <div class="servicios-col">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Aplicación</th>
                <th>Servicio</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in cart" :key="c.data._id.$oid">
                <td>{{ c.data.aplicacion }}</td>
                <td>{{ c.data.servicio }}</td>
                <td>
                  {{ c.data.precio * c.cantidad }}
                </td>
                <td>{{ c.cantidad }}</td>
                <td>
                  <img
                    v-on:click="addCart(c.data)"
                    class="iconcart"
                    src="imagenes/plus.svg"
                  />
                </td>
                <td>
                  <img
                    v-on:click="minusCart(c.data)"
                    class="iconcart"
                    src="imagenes/minus.svg"
                  />
                </td>
                <td>
                  <img
                    v-on:click="trashCart(c.data)"
                    class="iconcart"
                    src="imagenes/trash.svg"
                  />
                </td>
              </tr>
              <tr>
                <td>TOTALES</td>
                <td></td>
                <td>{{ total }}</td>
                <td>{{ count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Carrito",
  data: () => ({
    titulo: "Carrito",
    section1: "Manos",
    servicios: [],
    mostrarCarrito: false,
  }),
  mounted() {
    ///ESTE ES EL MISMO QUE TENGO EN CARRITOBUY EN MOUNTED(), DEBO VER CÓMO LLEVAR

    if (localStorage.getItem("cart")) {
      try {
        this.$store.state.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        console.log(e);
      }
    }
    let carrito = this.$store.state.cart;
    let cantidad = 0;
    let totalPrecio = 0;
    for (let i = 0; i < carrito.length; i++) {
      cantidad = cantidad + carrito[i].cantidad;
      totalPrecio =
        totalPrecio + parseFloat(carrito[i].data.precio) * carrito[i].cantidad;
    }
    this.$store.state.count = cantidad;
    this.$store.state.total = totalPrecio;
  },
  computed: {
    ...mapState(["data1", "data2", "data3", "cart", "count", "total"]),
  },
  methods: {
    ...mapMutations([
      "addCart",
      "obtenerServicios",
      "trashCart",
      "minusCart",
      "saveCart",
    ]),
  },
};
</script>
