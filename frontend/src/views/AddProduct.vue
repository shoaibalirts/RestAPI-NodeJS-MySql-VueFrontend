<template>
  <v-card>
    <v-card-title class="text-center bg-primary">Tilføj dine Produkter</v-card-title>
  </v-card>
  <v-sheet class="mx-auto ma-10" width="300">
    <v-form @submit.prevent="submitProduct">
      <v-text-field v-model="prodName" label="Produkt Navn"></v-text-field>
      <v-text-field v-model="prodCo2" label="Co2"></v-text-field>
      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { addProduct } from "@/api";
export default {
  data() {
    return {
      prodName: "",
      prodCo2: "",
    };
  },
  methods: {
    async submitProduct() {
      const formData = {
        prod_name: this.prodName,
        prod_co2: this.prodCo2,
      };
      try {
        const addingFormDataToSqlProductTable = await addProduct(formData);
        console.log("Response From Server: ");
        console.log(addingFormDataToSqlProductTable);
        this.prodName = "";
        this.prodCo2 = "";
      } catch (error) {
        console.log("Form Submission failed: ", error);
      } finally {
        console.log("New Product has been inserted into MySql Product table successfully");
      }
    },
  },
};
</script>
