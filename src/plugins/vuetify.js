import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        // estos venían por defecto
        primary: '#f284f6',
        secondary: '#F7E6E6',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',

        // estos son nuestros colores
        claro: '#F7E6E6',
        oscuro: '#f3a6f6',
        oscuro2: '#f284f6',
        textoNav: '#949194',
        texto: '#516b6c',
        border: '#aeafaf',

      },
    },
  },
});
