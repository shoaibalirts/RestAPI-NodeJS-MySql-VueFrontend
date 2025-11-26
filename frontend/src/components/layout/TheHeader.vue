<template>
  <the-search v-if="isSearch" @search-updated="handleSearch" />

  <v-app-bar v-else :elevation="4">
    <template v-slot:prepend>
      <v-menu location="bottom start">
        <template v-slot:activator="{ props }">
          <v-btn :icon="mdiMenu" v-bind="props"> </v-btn>
        </template>

        <the-menu />
      </v-menu>
    </template>

    <v-app-bar-title @click="reloadApp">Dine Indkøbslister</v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="callSearchComponent">
        <v-icon :icon="mdiMagnify"></v-icon>
      </v-btn>
      <v-btn>
        <v-icon :icon="mdiDotsVertical"></v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import TheSearch from "../TheSearch.vue";
import TheMenu from "../UI/TheMenu.vue";
import { mdiMagnify, mdiDotsVertical, mdiMenu } from "@mdi/js";
export default {
  data() {
    return {
      mdiMagnify,
      mdiDotsVertical,
      mdiMenu,
      isSearch: false,
      isMenu: false,
    };
  },
  components: {
    TheSearch,
    TheMenu,
  },
  methods: {
    reloadApp() {
      window.location.reload();
    },
    callSearchComponent() {
      console.log("clicked");
      this.isSearch = true;
    },
  },
};
</script>
