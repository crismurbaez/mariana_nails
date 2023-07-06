<template>
  <div>
    <section class="seccion-clara acerca-section">
      <h2 class="texto-nav">Acerca de mí</h2>
      <hr class="bg-oscuro" />
      <p>
        Bienvenidos a mi salón de uñas, donde el cuidado de tus manos y pies es
        mi pasión y mi prioridad. Como propietaria y esteticista, soy amante de
        la estética y el buen gusto, y me enorgullece ofrecer servicios de uñas
        de alta calidad en un ambiente relajado y acogedor.
      </p>
      <br /><br />
      <p class="texto-nav">
        Ofrezco una amplia gama de servicios de uñas, desde manicuras y
        pedicuras básicas hasta diseños personalizados y aplicaciones de uñas de
        gel y acrílicas. Utilizo solo productos de la más alta calidad y
        técnicas innovadoras para asegurarme de que tus uñas luzcan hermosas y
        saludables en todo momento
      </p>
      <br /><br />
      <p>
        Para mí, la atención al cliente personalizada es fundamental. Me aseguro
        de que cada visita sea única y satisfactoria, y trabajo para superar tus
        expectativas en cada detalle. Me esfuerzo por conocer a mis clientes y
        sus preferencias para poder brindarles un servicio personalizado y
        adaptado a sus necesidades.
      </p>
      <br /><br />
      <p class="texto-nav">
        Cuidate como mereces. ¡Espero verte pronto y tener la oportunidad de
        ofrecerte una experiencia de cuidado de uñas excepcional!
      </p>
    </section>

    <!-- Testimonios -->
    <section class="seccion-clara testimonios-section">
      <h2 class="texto-nav">Testimonios</h2>
      <hr class="bg-oscuro testimonios-hr" />
      <div
        v-on:scroll.capture="onScroll"
        class="servicios columnas-testimonios"
        id="testimonios"
      >
        <div class="columna-servicios" id="testimonios1">
          <img
            id="t-1-i"
            class="servicios-img"
            src="imagenes/blank-profile.png"
            alt="manicura"
          />
          <h3 id="t-1-n" class="texto-nav">Rebeca</h3>
          <p id="t-1-t">
            "El personal es amable y profesional. Siempre me hacen sentir
            bienvenida. Sus servicios son excelentes y siempre salgo con uñas
            hermosas y bien cuidadas. ¡Definitivamente volveré!"
          </p>
        </div>
        <div class="columna-servicios" id="testimonios2">
          <img
            id="t-2-i"
            class="servicios-img"
            src="imagenes/blank-profile.png"
            alt="pedicura"
          />
          <h3 id="t-2-n">Laura</h3>
          <p id="t-2-t" class="texto-nav">
            "Las técnicas son expertas y hacen un trabajo impecable. El ambiente
            es relajante y acogedor. Siempre me siento mimada y consentida cada
            vez que voy. ¡El mejor salón de uñas en la ciudad!"
          </p>
        </div>
        <div class="columna-servicios" id="testimonios3">
          <img
            id="t-3-i"
            class="servicios-img"
            src="imagenes/blank-profile.png"
            alt="uñas"
          />
          <h3 id="t-3-n" class="texto-nav">Victoria</h3>
          <p id="t-3-t">
            "Un lugar escondido con profesionales talentosos y creativos.
            Diseños únicos y de moda. Productos de alta calidad y duraderos. Mi
            nuevo lugar favorito para consentir mis manos y pies."
          </p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "About",
  data: () => ({
    testimonios: [
      "Un lugar escondido con profesionales talentosos y creativos. Diseños únicos y de moda. Productos de alta calidad y duraderos. Mi nuevo lugar favorito para consentir mis manos y pies.",
      "Las técnicas son expertas y hacen un trabajo impecable. El ambiente es relajante y acogedor. Siempre me siento mimada y consentida cada vez que voy. ¡El mejor salón de uñas en la ciudad!",
      "El personal es amable y profesional. Siempre me hacen sentir bienvenida. Sus servicios son excelentes y siempre salgo con uñas hermosas y bien cuidadas. ¡Definitivamente volveré!",
      "El personal es encantador y profesional. Siempre obtengo hermosos diseños de uñas y un servicio impecable. ¡Es el lugar perfecto para relajarme y consentirme a mí misma!",
      "No puedo recomendar este salón de uñas lo suficiente. Las técnicas son expertas y amables. Siempre salgo con uñas fabulosas y bien cuidadas. ¡Una experiencia increíble en cada visita!",
      "¡El mejor salón de uñas de la ciudad! El personal es amigable y talentoso. Sus diseños de uñas son creativos y de moda. Siempre me siento mimada y lista para brillar.",
      "Este salón de uñas es mi lugar de escape. El ambiente es relajante y acogedor. Las técnicas son profesionales y siempre me dan resultados asombrosos. ¡No puedo esperar para volver!",
      "¡Increíble servicio de uñas! El personal es amable y atento. Siempre me siento bienvenida y cuidada. Sus productos de alta calidad y técnicas expertas hacen maravillas en mis uñas. ¡Totalmente recomendado!",
      "¡Este salón de uñas es una joya! Las técnicas son hábiles y perfeccionistas. Siempre se toman el tiempo para hacer un trabajo impecable. ¡Me encanta la variedad de opciones y diseños que ofrecen!",
      "Este salón de uñas es increíble. El ambiente es único. Las técnicas me dan resultados asombrosos. ¡Hasta la próxima!",
    ],
  }),
  created: function () {
    // Genera valores aleatorios para las variables
    let ran1 = Math.floor(Math.random() * 9);
    let ran2 = Math.floor(Math.random() * 9);
    let ran3 = Math.floor(Math.random() * 9);

    // Revisa que no esten duplicados
    while (ran2 === ran1) {
      ran2 = Math.floor(Math.random() * 9);
    }
    while (ran3 === ran1 || ran3 === ran2) {
      ran3 = Math.floor(Math.random() * 9);
    }

    //Llama api
    function staff(img, name, test, ran) {
      axios
        .get("https://randomuser.me/api")
        .then(function (response) {
          let { gender, email } = response.data.results[0];
          let { first } = response.data.results[0].name;
          let { large } = response.data.results[0].picture;

          // Verificar si el género es masculino y volver a llamar a la función si es así
          if (gender === "male") {
            staff(img, name, test, ran);
          } else {
            document.getElementById(img).src = large;
            document.getElementById(name).textContent = first;
            document.getElementById(test).textContent = testimonios[ran];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // Llamar a la función con los IDs de los elementos del DOM
    staff("t-1-i", "t-1-n", "t-1-t", ran1);
    staff("t-2-i", "t-2-n", "t-2-t", ran2);
    staff("t-3-i", "t-3-n", "t-3-t", ran3);
  },
  mounted: {
    onScroll() {
      let testimonios = this.document.getElementById("testimonios");
      let posiciontestimonios = testimonios.getBoundingClientRect().top;
      console.log(posiciontestimonios);
      let tamañoDePantalla = window.innerHeight;
      if (posiciontestimonios < tamañoDePantalla) {
        testimonios.style.animation = "animacion1 2s ease";
      }
    },
  },
};
//animación texto
</script>