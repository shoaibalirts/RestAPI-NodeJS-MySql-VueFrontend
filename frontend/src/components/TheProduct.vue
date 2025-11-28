<template>
  <v-list-item class="rounded elevation-1 my-3">
    <v-list-item-title class="font-weight-bold">
      {{ productData.prodName }}
    </v-list-item-title>

    <v-list-item-subtitle class="mt-1"> CO2: {{ productData.prodCo2 }} </v-list-item-subtitle>
    <v-list-item-subtitle class="mt-1">
      Created d. {{ SqlDateFormatter(productData.prodCreatedDate) }}</v-list-item-subtitle
    >

    <template v-slot:append>
      <UpdateDelete
        :productData="productData"
        @product-deleted="$emit('product-deleted', $event)"
      />
    </template>
  </v-list-item>
</template>

<script>
// import getCo2LevelColor from "@/utility/getCo2LevelColor";
// import getCo2LevelText from "@/utility/getCo2LevelText";
import UpdateDelete from "./UI/UpdateDelete.vue";
import { mdiCircleMedium } from "@mdi/js";
export default {
  props: {
    productData: {
      type: Object,
    },
  },
  emits: ["product-deleted"],
  data() {
    return {
      mdiCircleMedium,
    };
  },
  methods: {
    SqlDateFormatter(sqlDate) {
      if (!sqlDate) return "";

      const date = new Date(sqlDate);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
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
