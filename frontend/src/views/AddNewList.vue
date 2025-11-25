<template>
  <v-form id="list-form" @submit.prevent="handleSaveList">
    <v-btn size="large" @click="handleClickBackBtn">
      <v-icon :icon="mdiChevronLeft"></v-icon>Tilbage</v-btn
    >

    <v-text-field
      id="name-input"
      placeholder="Skriv navn"
      v-model="listName"
      :rules="validationRules"
    />

    <v-list id="selected-products-list">
      <v-list-item v-for="product in shoppingListProducts" v-bind:key="product">
        <v-list-item-title>{{
          productsList.find((prod) => prod.value === product).title
        }}</v-list-item-title>
        <v-list-item-subtitle
          >{{ productsList.find((prod) => prod.value === product).co2_per_kg }} kg
          CO₂</v-list-item-subtitle
        >
      </v-list-item>
    </v-list>

    <v-combobox
      :items="productsList"
      item-value="value"
      label="Vælg produkt"
      v-model="selectedItem"
      @update:model-value="setShoppingListData"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" title="">
          <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.raw.co2_per_kg }} kg CO₂</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-combobox>

    <v-btn type="submit">Gem</v-btn>
  </v-form>
</template>

<script>
import productService from "../services/productService";
import { mdiChevronLeft } from "@mdi/js";
export default {
  data() {
    return {
      productsList: [],
      shoppingListProducts: [],
      selectedItem: null,
      listName: "",
      validationRules: [(value) => !!value || "Liste navn er pakrævet."],
      mdiChevronLeft,
    };
  },
  methods: {
    handleClickBackBtn() {
      if (this.shoppingListProducts.length === 0) this.$router.push({ path: "/" });
      else this.handleSaveList();
    },
    setShoppingListData(data) {
      this.shoppingListProducts.push(data.value);
    },
    async handleSaveList() {
      if (!this.listName || this.shoppingListProducts.length === 0) return;

      const list = {
        CategoryName: this.listName,
        CreatedDate: new Date(),
        Products: this.shoppingListProducts,
      };

      productService.saveListData(list);

      this.$router.push({ path: "/" });
    },
  },
  async mounted() {
    try {
      const receivedProductsListFromDatabase = await productService.getProductsList();
      this.productsList = receivedProductsListFromDatabase.map((list) => {
        return {
          value: list.id,
          title: list.prodName,
          co2_per_kg: list.co2_per_kg,
          prodAlternatives: list.prodAlternatives || [],
        };
      });
    } catch (err) {
      console.error("Error fetching products list", err);
    }
  },
};
</script>

<style>
#list-form {
  background-color: white;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 3vh 5vw;
}

#name-input {
  margin-bottom: 1vh;
}

#selected-products-list {
  max-height: 50vh;
  overflow: auto;
  margin-bottom: 3vh;
}
</style>
