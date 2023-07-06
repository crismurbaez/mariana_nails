<template>
  <div>
    <!-- Carousel -->
    <section class="container-img"></section>

    <!-- Sobre nos -->
    <section class="seccion-clara">
      <article
        v-on:scroll.capture="onScrollSobreMi()"
        class="article"
        id="sobreMi"
      >
        <div class="article-text">
          <h2 class="texto-nav">Acerca de mí</h2>

          <hr class="divisor-seccion bg-oscuro" />
          <p>
            Bienvenidos a MarianaNails, donde la belleza de tus uñas y pestañas
            toma vida. Soy Mariana, tu estilista personal, dedicada a hacer que
            tus manos y ojos brillen con estilo. Con servicios de uñas de
            calidad, desde manicuras clásicas hasta diseños personalizados,
            extensiones y lifting de pestañas para resaltar tu mirada de manera
            natural y cautivadora, te garantizo resultados impecables. En un
            ambiente relajante, mi objetivo es superar tus expectativas y
            brindarte una experiencia personalizada. No esperes más para lucir
            unas uñas impecables y unas pestañas espectaculares. ¡Haz una cita
            en MarianaNails y permíteme compartir mi pasión y habilidades
            contigo!
          </p>
          <a class="a-index" href="/about"
            ><button id="btn-acerca" class="btn">Sepa más</button></a
          >
        </div>
        <div class="article-image">
          <img src="imagenes/unas.png" alt="mano" />
        </div>
      </article>
    </section>

    <!-- Servicios -->
    <section class="seccion-oscura servicios-index">
      <h2>Servicios</h2>
      <hr />
      <div class="servicios">
        <div class="columna-servicios">
          <a href="./servicios.html"
            ><img
              v-on:scroll.capture="onScrollSobreMi()"
              class="servicios-img"
              src="imagenes/manicura.png"
              alt="manicura"
              id="manicura"
          /></a>
          <h3>Manicura</h3>
          <p>
            Dale un toque de elegancia y estilo a tus manos con nuestra manicura
            de alta calidad con productos líderes en la industria.
          </p>
        </div>
        <div class="columna-servicios">
          <a href="./servicios.html"
            ><img
              v-on:scroll.capture="onScrollSobreMi()"
              class="servicios-img"
              src="imagenes/pedicura.png"
              alt="pedicura"
              id="pedicura"
          /></a>
          <h3>Pedicura</h3>
          <p>
            Relájate y renueva tus pies con nuestra pedicura profesional, que
            utiliza técnicas innovadoras y productos de alta calidad para lograr
            una apariencia saludable.
          </p>
        </div>
        <div class="columna-servicios">
          <a href="./servicios.html"
            ><img
              v-on:scroll.capture="onScrollSobreMi()"
              class="servicios-img"
              src="imagenes/pestanias.jpg"
              alt="uñas"
              id="uñas"
          /></a>
          <h3>Pestañas</h3>
          <p>
            Pestañas glamorosas y duraderas. Extensiones de alta calidad
            aplicadas con precisión, resaltando tu mirada con volumen y
            longitud. Resultados impecables y naturales que realzan tu belleza
            en minutos.
          </p>
        </div>
      </div>
    </section>

    <!-- Productos -->
    <section class="seccion-clara">
      <div class="productos">
        <div class="columna-productos">
          <img
            v-on:scroll.capture="onScrollSobreMi()"
            class="img-productos"
            src="imagenes/productos.png"
            alt="imagenes"
            id="productos"
          />
        </div>
        <div class="columna-productos">
          <h2 class="texto-nav">Productos</h2>
          <hr class="divisor-seccion bg-oscuro" />
          <p>
            Ofrecemos servicios de uñas de alta calidad utilizando solo
            productos de marcas líderes en la industria, como OPI, Essie y CND.
            Desde manicuras y pedicuras básicas hasta diseños personalizados y
            aplicaciones de uñas de gel y acrílicas, utilizamos técnicas
            innovadoras para asegurarnos de que tus uñas luzcan hermosas y
            saludables en todo momento.
          </p>
          <a class="a-index" href="./servicios.html"
            ><button id="btn-prod" class="btn">Sepa más</button></a
          >
        </div>
      </div>
    </section>
  </div>
</template>




<script>
export default {
  name: "Home",

  data: () => ({}),
  methods: {
    onScrollSobreMi: function () {
      console.log("estoy haciendo scroller");
      //texto sobre mi
      let sobreMi = this.document.getElementById("sobreMi");
      let posicionSobreMi =
        sobreMi != null ? sobreMi.getBoundingClientRect().top : 0;
      console.log(posicionSobreMi);
      let tamañoDePantalla = window.innerHeight;
      if (posicionSobreMi < tamañoDePantalla) {
        sobreMi.style.animation = "animacion2 2s ease";
      }

      //Servicios

      let manicura = this.document.getElementById("manicura");

      let posicionmanicura =
        manicura != null ? manicura.getBoundingClientRect().top : 0;
      // console.log(posicionmanicura);
      if (posicionmanicura < tamañoDePantalla) {
        manicura.style.animation = "animacion2 3s ease";
      }

      let pedicura = this.document.getElementById("pedicura");

      let posicionpedicura =
        pedicura != null ? pedicura.getBoundingClientRect().top : 0;
      // console.log(posicionpedicura);
      if (posicionpedicura < tamañoDePantalla) {
        pedicura.style.animation = "animacion2 4s ease";
      }

      let uñas = this.document.getElementById("uñas");

      let posicionuñas = uñas != null ? uñas.getBoundingClientRect().top : 0;
      // console.log(posicionuñas);
      if (posicionuñas < tamañoDePantalla) {
        uñas.style.animation = "animacion2 5s ease";
      }

      let productos = this.document.getElementById("productos");

      let anchoDePantalla = window.innerWidth;
      let posicionproductos =
        productos != null ? productos.getBoundingClientRect().top : 0;
      // console.log(posicionproductos);
      if (posicionproductos < tamañoDePantalla && anchoDePantalla < 481) {
        productos.style.animation = "animacion2 3s ease";
      }
    },
  },
};
</script>


