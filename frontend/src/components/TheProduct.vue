<template>
  <v-list-item class="rounded elevation-1 my-3">
    <v-list-item-title class="font-weight-bold">
      {{ productData.prodName }}
    </v-list-item-title>

    <v-list-item-subtitle class="mt-1"> CO2: {{ productData.prodCo2 }} </v-list-item-subtitle>
    <v-list-item-subtitle class="mt-1"> Created d. 25/11/2025</v-list-item-subtitle>

    <template v-slot:append>
      <UpdateDelete />
    </template>
  </v-list-item>
</template>

<script>
// import getCo2LevelColor from "@/utility/getCo2LevelColor";
// import getCo2LevelText from "@/utility/getCo2LevelText";
import UpdateDelete from "./UI/UpdateDelete.vue";
import { mdiCircleMedium } from "@mdi/js";
export default {
  props: ["productData"],
  data() {
    return {
      mdiCircleMedium,
    };
  },
  setup() {
    return {
      // getCo2LevelColor,
      // getCo2LevelText,
    };
  },
  components: {
    UpdateDelete,
  },
};
</script>
