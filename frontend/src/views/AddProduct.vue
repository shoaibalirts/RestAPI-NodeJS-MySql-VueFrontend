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
};
</script>
