<template>
  <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
  <v-app>
    <tool-bar toolbarTitle="Dine Produkter" />

    <v-card class="mx-auto" width="95%" max-width="600" elevation="4">
      <v-list class="pb-0">
        <div v-for="(product, index) in allProducts" :key="`recent-${index}`">
          <the-product :productData="product" @product-deleted="fetchProducts" />
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>
    <v-card class="mx-auto"> <the-plus></the-plus> </v-card>
  </v-app>
</template>
<script>
import { getAllProducts } from "@/api.js";
import TheProduct from "@/components/TheProduct.vue";
import ThePlus from "@/components/UI/ThePlus.vue";
import ToolBar from "@/components/layout/ToolBar.vue";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
// console.log(socket);

socket.on("connection", () => {
  console.log("Conencted to Socket.IO server");
});
socket.on("messageFromServer", (message) => {
  console.log("Message from Server: ", message.msg);
  console.log("Socket id: ", message.id);
});
socket.emit("messageFromClient", { msg: "Hello from the client" });

// import { formatDateDMY } from "@/utility/dateFormatter";

export default {
  props: {
    toolbarTitle: String,
  },
  methods: {
    async fetchProducts() {
      try {
        const receivedProductsFromMySqlDatabase = await getAllProducts();
        // const receivedProductsFromMySqlDatabase = await getAllProducts();
        // console.log("Array from Api call:");
        // console.log(receivedProductsFromMySqlDatabase);

        this.allProducts = receivedProductsFromMySqlDatabase.map((item) => {
          return {
            prodId: item.prod_id,
            prodName: item.prod_name,
            prodCo2: item.prod_co2,
            prodCreatedDate: item.curr_date,
          };
        });
        // console.log("final producs array:");
        // console.log(this.allProducts);

        // return;
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        this.loading = false;
      }
    },
    handleClickBackBtn() {
      console.log("clicked");

      this.$router.push({ path: "/" });
    },
  },
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
    ToolBar,
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
