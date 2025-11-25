<template>
  <v-app>
    <the-header></the-header>
    <v-main class="mt-0">
      <ShoppingList />
      <PlusButton />
    </v-main>

    <the-footer></the-footer>
  </v-app>
</template>
<script>
import ShoppingList from "../views/ShoppingList.vue";
import PlusButton from "../components/PlusButton.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
//import GreenDropDown from "./components/layout/GreenDropDown.vue";
import AddNewList from "../views/AddNewList.vue";
export default {
  components: {
    ShoppingList,
    PlusButton,
    TheHeader,
    TheFooter,
    //GreenDropDown,
    AddNewList,
  },
};
</script>
