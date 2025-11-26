import { createRouter, createWebHistory } from "vue-router";
import ListsView from "@/views/ListsView.vue";
import ListDetails from "@/views/ListDetails.vue";
import HomePage from "@/views/HomePage.vue";
import AddNewList from "@/views/AddNewList.vue";
import AddProduct from "@/views/AddProduct.vue";
import products from "@/views/products.vue";
import product from "@/views/product.vue";
import updateproduct from "@/views/updateproduct.vue";
import deleteproduct from "@/views/deleteproduct.vue";
import login from "@/views/login.vue";
import register from "@/views/register.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/add-new",
      component: AddNewList,
    },
    {
      path: "/lists",
      name: "ListsView",
      component: ListsView,
    },
    {
      path: "/lists/:id",
      name: "ListDetails",
      component: ListDetails,
      props: true,
    },
    {
      path: "/addproduct",
      component: AddProduct,
    },

    {
      path: "/products",
      component: products,
    },
    {
      path: "/product",
      component: product,
    },
    {
      path: "/updateproduct",
      component: updateproduct,
    },
    {
      path: "/deleteproduct",
      component: deleteproduct,
    },
    {
      path: "/login",
      component: login,
    },
    {
      path: "/register",
      component: register,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/lists",
    },
  ],
});

export default router;
