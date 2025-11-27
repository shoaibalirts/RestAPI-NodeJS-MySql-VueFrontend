<template>
  <v-app>
    <tool-bar toolbarTitle="Fjern Produktet" />
  </v-app>
</template>
<script>
import ToolBar from "@/components/layout/ToolBar.vue";

export default {
  props: {
    toolbarTitle: String,
  },
  components: {
    ToolBar,
  },
  data() {
    return {};
  },
};
</script>
