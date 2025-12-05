import { createRouter, createWebHistory } from "vue-router";
import ListsView from "@/views/ListsView.vue";
import ListDetails from "@/views/ListDetails.vue";
import HomePage from "@/views/HomePage.vue";
import AddNewList from "@/views/AddNewList.vue";
import AddProduct from "@/views/AddProduct.vue";
import SqlProducts from "@/views/SqlProducts.vue";
import SqlProduct from "@/views/SqlProduct.vue";
import updateproduct from "@/views/updateproduct.vue";
// import DeleteProduct from "@/views/DeleteProduct.vue";
import SqlLogin from "@/views/SqlLogin.vue";
import SqlRegister from "@/views/SqlRegister.vue";
import TheChat from "@/views/TheChat.vue";
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
      component: SqlProducts,
    },
    {
      path: "/product",
      component: SqlProduct,
    },
    {
      path: "/updateproduct",
      component: updateproduct,
    },
    {
      path: "/chat",
      component: TheChat,
    },
    // {
    //   path: "/deleteproduct",
    //   component: DeleteProduct,
    // },
    {
      path: "/login",
      component: SqlLogin,
      meta: {
        Desc: "Personale",
        adminHeaderTitle: "Login",
      },
    },
    {
      path: "/register",
      component: SqlRegister,
      meta: {
        Desc: "Indtast dig og",
        adminHeaderTitle: "Register",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
