<template>
  <div onload="setMinDate()">
    <!-- Principal -->
    <section class="seccion-clara">
      <h2 class="texto-nav">Dejanos tu consulta!</h2>
      <hr class="bg-oscuro" />
      <!-- Formulario -->
      <div class="formulario">
        <form name="fvalida">
          <label
            >Nombre Completo:
            <input type="text" name="nombre" />
          </label>
          <br /><br />
          <!-- <label>Edad:
          <input type="text" name="edad" size="3" maxlength="2">
        </label> -->
          <!-- <br><br> -->
          <label
            >Email:
            <input type="email" name="email" />
          </label>
          <br /><br />
          <label
            >Interés:
            <select name="interes">
              <option value="Elegir">Elegir</option>
              <option value="1">Manicura</option>
              <option value="2">Pedicura</option>
              <option value="3">Pestañas</option>
              <option value="4">Otro</option>
            </select>
          </label>
          <br /><br />
          <label>
            Seleccionar fecha:
            <input
              type="date"
              name="fecha"
              id="fecha"
              min=""
              max="2023-12-31"
            />
          </label>
          <br /><br />
          <label
            >Turno: <input type="radio" name="turno" value="Manana" /> 9h00 -
            12h00 <input type="radio" name="turno" value="Tarde" /> 12h00 -
            16h00 <input type="radio" name="turno" value="Noche" /> 16h00 -
            18h00
          </label>
          <br /><br />
          <label>
            <textarea
              name="razon"
              cols="40"
              rows="5"
              placeholder="Texto (opcional)"
            ></textarea>
          </label>
          <br /><br />
          <div class="centrado">
            <!-- Al presionar el botón, se llama a la función de validacion -->
            <input
              type="button"
              class="b1"
              value="Enviar"
              v-on:click="validarEnviar()"
            />
          </div>
        </form>
      </div>
      <!--Ubicacion -->
      <div class="ubicacion">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.296316333681!2d-58.60491702486924!3d-34.62195145846035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb88ac2ac2b2d%3A0x6c1152be23965087!2sMartina%20C%C3%A9spedes%20%26%20Presidente%20Santiago%20Derqui%2C%20El%20Palomar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1685055389589!5m2!1ses!2sar"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({}),
  methods: {
    setMinDate() {
      let currentDate = new Date().toISOString().split("T")[0];
      console.log(currentDate);
      document.getElementById("fecha").min = currentDate;
    },
    validarEnviar() {
      //valido el nombre
      if (doc.nombre.value.length == 0) {
        alert("Tiene que escribir su nombre");
        doc.nombre.focus();
        return 0;
      }
      //valido el email
      let emails = doc.email;
      if (emails.value.length == 0) {
        alert("Tiene que escribir su email");
        emails.focus();
        return 0;
      }

      //valido la edad. tiene que ser entero mayor que 18
      edad = doc.edad.value;
      edad = validarEntero(edad);
      doc.edad.value = edad;
      if (edad == "") {
        alert("Tiene que introducir un número entero en su edad.");
        doc.edad.focus();
        return 0;
      } else {
        if (edad < 18) {
          alert("Debe ser mayor de 18 años.");
          doc.edad.focus();
          return 0;
        }
      }

      //valido el interés
      if (doc.interes.selectedIndex == 0) {
        alert("Debe seleccionar un motivo de su contacto.");
        doc.interes.focus();
        return 0;
      }
      // --------------------------------------------------------
      // Valido turno
      // --------------------------------------------------------

      if (
        doc.turno[0].checked == true ||
        doc.turno[1].checked == true ||
        doc.turno[2].checked == true
      ) {
      } else {
        //Si al menos uno de los Radio no está marcado....
        alert("Selecciona un turno");
        e.preventDefault();
      }

      //Valido fecha
      if (doc.fecha.value.length == 0) {
        alert("Debe ingresar una fecha");
        doc.fecha.focus();
        return 0;
      }

      //Finalmente, si llegó hasta aqui, se envia el form.
      alert("Muchas gracias por enviar el formulario");
      doc.submit();
    },
    validarEntero(valor) {
      //intento convertir a entero.
      //si era un entero no le afecta, si no lo era lo intenta convertir
      valor = parseInt(valor);

      //Compruebo si es un valor numérico
      if (isNaN(valor)) {
        //entonces (no es numero) devuelvo el valor cadena vacia
        return "";
      } else {
        //En caso contrario (Si era un número) devuelvo el valor
        return valor;
      }
    },
  },
};
</script>