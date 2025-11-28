<template>
  <v-toolbar>
    <v-toolbar class="text-center bg-primary">
      <template v-slot:prepend>
        <v-btn :icon="mdiChevronLeft" @click="handleClickBackBtn"></v-btn>
      </template>

      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>

      <template v-slot:append>
        <v-btn :icon="mdiHome" @click="handleClickHomePage"></v-btn>
      </template>
    </v-toolbar>
  </v-toolbar>
</template>
<script>
import { mdiChevronLeft, mdiHome } from "@mdi/js";
export default {
  props: ["toolbarTitle"],
  data() {
    return {
      mdiChevronLeft,
      mdiHome,
    };
  },
  methods: {
    handleClickBackBtn() {
      // console.log("clicked");
      this.$router.back();
    },
    handleClickHomePage() {
      console.log("clicked");

      this.$router.push({ path: "/" });
    },
  },
};
</script>
