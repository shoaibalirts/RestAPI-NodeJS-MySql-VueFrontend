<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4 bg-primary" color="indigo-lighten-1">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>
  </v-footer>
</template>
<script>
import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram } from "@mdi/js";
export default {
  data() {
    return {
      icons: [mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram],
    };
  },
  methods: {},
};
</script>
