<template>
  <div>
    <!-- Lista servicios -->
    <section class="seccion-clara serv-section" id="cart">
      <div>
        <div class="cart">
          <div>{{ count }}</div>
          <router-link to="/carrito">
            <img class="icon-cart" src="imagenes/cart.svg" />
          </router-link>
        </div>
        <h2 class="texto-nav servicios-h">Servicios</h2>
        <span>{{ servicios }}</span>
      </div>
      <hr class="bg-oscuro" style="margin-bottom: 4rem" />
      <!-- Manicura -->
      <h3 style="margin-bottom: 2rem">{{ section1 }}</h3>
      <div class="servicios servicios-section">
        <div class="servicios-col">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>.</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in data1" :key="index">
                  <td>{{ data.servicio }}</td>
                  <td>{{ data.precio }}</td>
                  <td>
                    <img
                      v-on:click="addCart(data)"
                      class="iconcart"
                      src="imagenes/cart-plus.svg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="servicios-col">
          <img
            v-on:scroll.capture="onScroll()"
            class="manicura-img"
            src="imagenes/manoverde.png"
            alt="mano"
            id="manos"
          />
        </div>
      </div>
      <!-- Pedicura -->
      <h3 style="margin-bottom: 2rem; margin-top: 5rem">{{ section2 }}</h3>
      <div class="servicios">
        <div class="servicios-col">
          <img
            v-on:scroll.capture="onScroll()"
            class="manicura-img"
            src="imagenes/pedicura.png"
            alt="pies"
            id="pies"
          />
        </div>
        <div class="servicios-col">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>.</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in data2" :key="index">
                  <td>{{ data.servicio }}</td>
                  <td>{{ data.precio }}</td>
                  <td>
                    <img
                      v-on:click="addCart(data)"
                      class="iconcart"
                      src="imagenes/cart-plus.svg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Pestañas -->
      <h3 style="margin-bottom: 2rem; margin-top: 5rem">{{ section3 }}</h3>
      <div class="servicios">
        <div class="servicios-col">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>.</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in data3" :key="index">
                  <td>{{ data.servicio }}</td>
                  <td>{{ data.precio }}</td>
                  <td>
                    <img
                      v-on:click="addCart(data)"
                      class="iconcart"
                      src="imagenes/cart-plus.svg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="servicios-col">
          <img
            v-on:scroll.capture="onScroll()"
            class="manicura-img"
            src="imagenes/pestanias.jpg"
            alt="pestañas"
            id="pestanias"
          />
        </div>
      </div>
    </section>

    <!--Galeria-->
    <section class="seccion-clara">
      <h2 class="texto-nav">Galeria</h2>
      <hr class="bg-oscuro" />
      <div class="gallery">
        <div class="gallery-row col-gal"></div>
        <div class="gallery-row col-gal"></div>
        <div class="gallery-row col-gal"></div>
      </div>
      <button class="btn">Más</button>

      <div class="modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <img class="modal-image" src="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Servicios",
  data: () => ({
    titulo: "Carrito",
    section1: "Manos",

    section2: "Pies",

    section3: "Pestañas",
    mostrarCarrito: false,
  }),
  computed: {
    ...mapState(["data1", "data2", "data3", "cart", "count", "servicios"]),
  },
  methods: {
    ...mapActions(["obtenerServicios"]),
    ...mapMutations(["addCart", "trashCart", "minusCart"]),
    created() {
      function gallery() {
        const gallery = document.querySelector(".gallery");
        const loadMoreBtn = document.querySelector(".btn");
        const modal = document.querySelector(".modal");
        const modalImage = document.querySelector(".modal-image");
        const modalClose = document.querySelector(".close-modal");
        let images = [
          "./imagenes/manicura.png",
          "./imagenes/pedicura.png",
          "./imagenes/manos.png",
          "./imagenes/pink.png",
          "./imagenes/pink2.png",
          "./imagenes/manofrascos.png",
          "./imagenes/pestanias.jpg",
          "./imagenes/unas.png",
          "./imagenes/design.png",
        ];
        let index = 0;

        function createImage(imageUrl) {
          const figure = document.createElement("figure");
          const image = document.createElement("img");
          image.setAttribute("src", imageUrl);
          image.setAttribute("alt", "gallery image");
          figure.appendChild(image);
          gallery.appendChild(figure);
          image.addEventListener("click", function () {
            modalImage.setAttribute("src", imageUrl);
            modal.classList.add("modal-show");
          });
        }

        function loadMore() {
          const max = index + 3;
          for (let i = index; i < max && i < images.length; i++) {
            createImage(images[i]);
          }
          index = max;
          if (index >= images.length) {
            loadMoreBtn.style.display = "none";
          }
        }

        loadMore();

        loadMoreBtn.addEventListener("click", function () {
          loadMore();
        });

        modalClose.addEventListener("click", function () {
          modal.classList.remove("modal-show");
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            modal.classList.remove("modal-show");
          }
        });

        modal.addEventListener("click", function () {
          modal.classList.remove("modal-show");
        });
      }
    },

    onScroll() {
      //Animaciones

      window.addEventListener("scroll", function () {
        let tamañoDePantalla = window.innerHeight;

        //Servicios

        let manos = this.document.getElementById("manos");
        let posicionmanos = manos.getBoundingClientRect().top;
        // console.log(posicionmanos);
        if (posicionmanos < tamañoDePantalla) {
          manos.style.animation = "animacion1 1s ease";
        }

        let pies = this.document.getElementById("pies");
        let posicionpies = pies.getBoundingClientRect().top;
        // console.log(posicionpies);
        if (posicionpies < tamañoDePantalla) {
          pies.style.animation = "animacion1 2s ease";
        }

        let pestanias = this.document.getElementById("pestanias");
        let posicionpestanias = pestanias.getBoundingClientRect().top;
        // console.log(posicionpestanias);
        if (posicionpestanias < tamañoDePantalla) {
          pestanias.style.animation = "animacion1 2s ease";
        }
      });
    },
  },
  beforeCreate() {
    // obtenerServicios(data);
    this.$store.state.data1 = [];
    this.$store.state.data2 = [];
    this.$store.state.data3 = [];
    const url = "https://codoweb.pythonanywhere.com";
    fetch(url + "/servicios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response received:", data);
        this.$store.state.servicios = [...data];
        // this.$store.state.data1 = [...data];
        for (let i = 0; i < data.length; i++) {
          if (data[i].aplicacion === "Manos") {
            this.$store.state.data1.push(data[i]);
          }
          if (data[i].aplicacion === "Pies") {
            this.$store.state.data2.push(data[i]);
          }
          if (data[i].aplicacion === "Pestañas") {
            this.$store.state.data3.push(data[i]);
          }
        }
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the request
      });
    //redistribuyo el contenido de servicios para que se muestre en los tres sectores
    //diferentes: Manos, Pies y Pestañas.
  },
};
</script>