<template>
  <!-- <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader> -->
  <v-card class="mx-auto">
    <v-card-title class="text-center bg-primary rounded-b-circle">Dine Produkter</v-card-title>

    <v-list class="pb-0">
      <div v-for="(product, index) in allProducts" :key="`recent-${index}`">
        <the-product :productData="product" />
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-card>
  <v-card class="mx-auto"> <the-plus></the-plus> </v-card>
</template>
<script>
import { getAllProducts } from "@/api.js";
import TheProduct from "@/components/TheProduct.vue";
import ThePlus from "@/components/UI/ThePlus.vue";
// import { formatDateDMY } from "@/utility/dateFormatter";

export default {
  data() {
    return {
      allProducts: [],
      loading: true,
      isDeletedPressed: false,
      isUpdatedPressed: false,
    };
  },
  components: {
    TheProduct,
    ThePlus,
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
