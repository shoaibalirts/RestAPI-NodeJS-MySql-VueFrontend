<template>
  <v-list-item class="rounded elevation-1">
    <v-list-item class="font-weight-bold">{{ productData.prodName }}</v-list-item>
    <v-list-item class="font-weight-bold">{{ productData.prodCo2 }}</v-list-item>

    <!-- <v-list-item>{{ productData.currDate }}</v-list-item> -->
  </v-list-item>

  <update-delete />
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
