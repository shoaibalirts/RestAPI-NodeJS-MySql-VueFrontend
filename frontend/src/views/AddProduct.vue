<template>
  <v-app>
    <tool-bar toolbarTitle="Tilføj dine Produkter" />
    <v-sheet class="mx-auto ma-14" width="300">
      <v-form ref="form" @submit.prevent="submitProduct">
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
        <v-btn class="mt-2" type="submit" block>Tilføj produktet</v-btn>
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
import { addProduct } from "@/api";
import ToolBar from "@/components/layout/ToolBar.vue";

export default {
  props: {
    toolbarTitle: String,
  },
  components: {
    ToolBar,
  },
  data() {
    return {
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
    async submitProduct() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const formData = {
          prod_name: this.prodName,
          prod_co2: this.prodCo2,
        };
        try {
          const addingFormDataToSqlProductTable = await addProduct(formData);
          this.snackbar.message = `Produktet '${this.prodName}' er blevet tilføjet!`;
          this.snackbar.color = "success";
          this.snackbar.show = true;
          console.log("Response From Server: ");
          console.log(addingFormDataToSqlProductTable);
          this.$refs.form.reset();
          this.prodName = "";
          this.prodCo2 = "";
        } catch (error) {
          console.log("Form Submission failed: ", error);
          this.snackbar.message = "Fejl: Kunne ikke tilføje produktet.";
          this.snackbar.color = "error";
          this.snackbar.show = true;
        } finally {
          console.log("New Product has been inserted into MySql Product table successfully");
        }
      } else {
        console.log("Form validation failed. Errors displayed next to inputs.");
      }
    },
  },
};
</script>
