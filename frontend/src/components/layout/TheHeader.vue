<template>
  <v-app-bar :elevation="4">
    <template v-slot:prepend>
      <v-menu location="bottom start">
        <template v-slot:activator="{ props }">
          <v-btn :icon="mdiMenu" v-bind="props"> </v-btn>
        </template>

        <the-menu />
      </v-menu>
    </template>

    <v-app-bar-title>Dine Indkøbslister</v-app-bar-title>

    <template v-slot:append>
      <v-btn>
        <v-icon :icon="mdiMagnify"></v-icon>
      </v-btn>
      <v-btn>
        <v-icon :icon="mdiDotsVertical"></v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import TheMenu from "../UI/TheMenu.vue";
import { mdiMagnify, mdiDotsVertical, mdiMenu } from "@mdi/js";
export default {
  data() {
    return {
      mdiMagnify,
      mdiDotsVertical,
      mdiMenu,
      isMenu: false,
    };
  },
  components: {
    TheMenu,
  },
};
</script>
