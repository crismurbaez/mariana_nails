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
                <th>Servicio</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- por ahora no hay nada en el carrito, porque se borra al cambiar de página, tengo que solucionarlo
                            guardando en localstorage
                            y de esta manera sólo pido todo una sola vez a la base de datos
                            pero cuando agrego y borro, hacerlo en tiempo real, seguramente es más lento
                            si quiero hacer pruebas del carrito hasta que tenga data, traerla de data1, 
                            para ello cambiar en v-for cart por data1
                            -->
              <tr v-for="c in cart" :key="c.id">
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
                <td>TOTAL</td>
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
import swal from "sweetalert";
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
    ///PARA QUE FUNCIONE BIEN
    //HAY QUE ARREGLAR VARIOS PROBLEMAS
    //NO SUBÍ AL GITHUB ESTE CÓDIGO!!!!!!!!!!!!
    //HAY QUE ARREGLAR:
    //CUANDO ELIMINO UN SERVICIO NO SE ELIMINA DE LOCAL
    //CUANDO RESTO UNA CONTIDAD NO SE MODIFICA EN LOCAL
    //EN OCASIONES FUNCIONA MAL EL CÁLCULO DE COUNT Y TOTAL DEL PRECIO
    //TAMBIÉN ME ESTÁ DANDO UN ERROR DE KEY, A TODOS LOS ELEMENTOS DE CART LE PONE ID=2, VER CÓMO SE HACE
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
      totalPrecio = totalPrecio + carrito[i].data.precio * carrito[i].cantidad;
    }
    this.$store.state.count = cantidad;
    this.$store.state.total = totalPrecio;
    console.log("cart-----------------------", this.$store.state.cart);
    console.log("count-----------------------", this.$store.state.count);
    console.log("total-----------------------", this.$store.state.total);
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
