<template>
  <div class="d-flex justify-space-around ga-4">
    <v-btn :icon="mdiPencil" @click.stop="handleUpdate(productData.prodId)"></v-btn>
    <v-btn :icon="mdiDelete" class="bg-primary" @click.stop="handleDelete"></v-btn>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import { deleteProduct } from "@/api.js";
export default {
  props: {
    productData: {
      type: Object,
    },
  },
  emits: ["product-deleted"],
  data() {
    return {
      mdiPencil,
      mdiDelete,
    };
  },
  methods: {
    handleUpdate() {
      console.log("update function is executing");
      console.log(this.productData);
    },
    async handleDelete() {
      console.log("delete function is executing");
      console.log(this.productData);
      try {
        const deletedProductInMySqlDatabase = await deleteProduct(this.productData.prodId);
        console.log(deletedProductInMySqlDatabase);
        this.$emit("product-deleted", this.productData.id);
      } catch (error) {
        console.error("Error delete the product:", error);
      }
    },
  },
};
</script>
