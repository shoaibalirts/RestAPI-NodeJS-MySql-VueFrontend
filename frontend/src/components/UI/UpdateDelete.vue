<template>
  <div class="d-flex justify-space-around ga-4">
    <v-btn :icon="mdiPencil" @click="handleUpdate"></v-btn>
    <v-btn :icon="mdiDelete" class="bg-primary" @click="handleDelete"></v-btn>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
export default {
  data() {
    return {
      mdiPencil,
      mdiDelete,
    };
  },
  methods: {
    handleUpdate() {
      console.log("update function is executing");
    },
    handleDelete() {
      console.log("delete function is executing");
    },
  },
};
</script>
