<template>
  <v-app>
    <tool-bar toolbarTitle="Dine Produkter" />
    <v-sheet class="mx-auto ma-10" width="300">
      <v-form ref="form" @submit.prevent="submitUpdate">
        <v-text-field
          v-model="prodName"
          label="Produkt Navn"
          :rules="[rules.required, rules.prodNameLength]"
        ></v-text-field>
        <v-text-field
          v-model="prodCo2"
          label="Co2"
          :rules="[rules.required, rules.prodNameLength]"
          type="number"
          step="0.01"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Opdater Produktet</v-btn>
      </v-form>
    </v-sheet>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn color="white" bg-primary variant="text" @click="snackbar.show = false"> Luk </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import ToolBar from "@/components/layout/ToolBar.vue";
import { getProductById, updateProduct } from "@/api";
export default {
  components: {
    ToolBar,
  },
  data() {
    return {
      prodId: null,
      prodName: "",
      prodCo2: "",
      rules: {
        required: (value) => !!value || "Dette felt skal udfyldes.",
        prodNameLength: (value) => value.length >= 3 || "Produktnavnet skal være mindst 3 tegn.",
        isPositiveNumber: (value) =>
          (parseFloat(value) >= 0 && !isNaN(parseFloat(value))) ||
          "Værdien skal være et gyldigt, ikke-negativt tal.",
      },
      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
    };
  },
  methods: {
    async fetchProductData() {
      // 1. Get the ID from the URL query parameters
      const productId = this.$route.query.id;

      if (!productId) {
        console.error("No product ID found in URL.");
        return;
      }

      this.prodId = productId;

      try {
        // 2. Call your API to fetch the single product
        const product = await getProductById(productId);
        // console.log("product: ");
        // console.log(product);

        // 3. Populate the form fields with the fetched data

        this.prodName = product.prodName;
        this.prodCo2 = product.prodCo2; // or product.prod_co2 depending on your backend
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        // Show an error snackbar
      }
    },
    async submitUpdate() {
      const updatedData = {
        id: this.prodId,
        prod_name: this.prodName,
        prod_co2: parseFloat(this.prodCo2),
      };

      try {
        await updateProduct(updatedData);
        console.log("Product updated successfully.");

        this.snackbar.message = `Produktet '${this.prodName}' er blevet opdateret!`;
        this.snackbar.color = "success";
        this.snackbar.show = true;
        console.log("Response From Server: ");

        this.$router.push("/products");
      } catch (error) {
        console.error("Failed to update product:", error);
        // Show error snackbar
      }
    },
  },
  mounted() {
    this.fetchProductData();
  },
};
</script>
