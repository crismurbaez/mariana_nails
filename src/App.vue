<template>
  <v-app class="z-10">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <!-- boton de menu hamburguesa -->
        <v-menu
          class="shrink mt-1 hidden-md-and-up"
          contain
          min-width="100"
          transition="scale-transition"
          bottom
          left
        >
          <template v-slot:activator="{ on }">
            <v-btn class="hidden-md-and-up" dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card width="200" color="primary" dark>
            <v-list color="primary" dark>
              <v-list-tile
                v-for="(item, i) in rutas"
                :key="i"
                @click="insertarRuta(item.ruta)"
              >
                <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>

                <v-spacer></v-spacer>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <router-link to="/">
          <v-img
            alt="Mariana_nails Logo"
            class="shrink mr-2 rounded-pill"
            contain
            src="/imagenes/logo-.png"
            transition="scale-transition"
            width="150"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <!-- opciones de menu de barra -->
      <v-btn
        class="hidden-sm-and-down"
        text
        v-for="(item, index) in rutas"
        :key="index"
        @click="insertarRuta(item.ruta)"
      >
        <span class="mr-2">{{ item.nombre }}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer color="primary" dark>
      <div class="footer-principal" id="footer">
        <div class="footer-col-uno">
          <router-link to="/"
            ><img
              class="nav-icon"
              src="/imagenes/logo-.png"
              alt="logo"
              width="150"
            />
          </router-link>
        </div>

        <div class="footer-col-dos">
          <h4 class="footer-h">Seguinos</h4>
          <a href="https://instagram.com/mariana_sole_olmedo/" target="_blank"
            ><img class="iconos" src="imagenes/igIcon.png" alt="icono"
          /></a>
          <a href="https://facebook.com/mariana.olmedo.589" target="_blank"
            ><img class="iconos" src="imagenes/fbBlack.png" alt="icono"
          /></a>
        </div>

        <div class="footer-col-tres hidden-sm-only">
          <h4 class="footer-h">Horario</h4>
          <p>Lunes a Sabado: 9h00 a 18h00</p>
          <p>Domingos y feriados: cerrado</p>
        </div>
      </div>
      <!-- Copyright -->
      <div id="footer-copyright" class="copyright">
        <p>Copyright 2023</p>
      </div>
    </v-footer>
  </v-app>
</template>
<style>
.v-card {
  margin: 5px;
  height: auto;
}
.v-list {
  margin-left: 20px;
  margin-top: 50px;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "App",

  data: () => ({
    rutas: [
      { nombre: "Home", ruta: "/" },
      { nombre: "About", ruta: "/about" },
      { nombre: "Servicios", ruta: "/servicios" },
      { nombre: "Carrito", ruta: "/carrito" },
      { nombre: "Contacto", ruta: "/contact" },
    ],
  }),
  methods: {
    insertarRuta(ruta) {
      this.$router.push(ruta);
    },
  },
};
</script>
