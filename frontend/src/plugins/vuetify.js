import "vuetify/styles"; // Import Vuetify styles
import "@mdi/font/css/materialdesignicons.css"; // Import Material Design Icons font
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";
import { mdi } from "vuetify/iconsets/mdi-svg";
const vuetify = createVuetify({
  components,
  directives,
  // Add your configuration here, e.g., themes, icons, etc.
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.red.darken1, // #E53935
          secondary: colors.red.lighten4, // #FFCDD2
        },
      },
    },
  },
});

export default vuetify;
