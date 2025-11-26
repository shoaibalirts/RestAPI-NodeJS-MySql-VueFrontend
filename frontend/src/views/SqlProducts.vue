<template>
  <h1>Show all products</h1>
  <!-- <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
  <v-card class="mx-auto" v-else>
    <v-card-title class="text-center bg-primary rounded-b-circle">Seneste 30 dage</v-card-title>

    <v-list class="pb-0">
      <div v-for="(list, index) in recent30DaysList" :key="`recent-${index}`">
        <list-item :listData="list" />
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-card-text v-else class="text-center text-medium-emphasis"
      >Ingen lister i de sidste 30 dage.</v-card-text
    >

    <v-card-title class="text-center bg-primary rounded-b-circle">Sidste måned</v-card-title>

    <v-list v-if="previousMonthList.length > 0" class="pb-0">
      <div v-for="(list, index) in previousMonthList" :key="`prev-month-${index}`">
        <list-item :listData="list" />
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-card> -->
</template>
<script>
import { getAllProducts } from "@/api.js";
import { formatDateDMY } from "@/utility/dateFormatter";

export default {
  data() {
    return {
      allProducts: [],
      loading: true,
      isDeletedPressed: false,
      isUpdatedPressed: false,
    };
  },
  async mounted() {
    try {
      const receivedProductsFromMySqlDatabase = await getAllProducts();
      // const receivedProductsFromMySqlDatabase = await getAllProducts();
      console.log("Array from Api call:");

      console.log(receivedProductsFromMySqlDatabase);

      this.allProducts = receivedProductsFromMySqlDatabase.map((item) => {
        return {
          prodId: item.prod_id,
          prodName: item.prod_name,
          prodCo2: item.prod_co2,
          // prodCreatedDate: item.curr_date ? formatDateDMY(item.curr_date) : "No date available",
        };
      });
      console.log("final producs array:");

      console.log(this.allProducts);

      // return;
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
