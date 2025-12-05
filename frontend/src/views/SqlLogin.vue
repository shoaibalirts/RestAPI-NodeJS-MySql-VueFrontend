<template>
  <main>
    <admin-header />
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="login">
        <v-text-field v-model="Username" :rules="rules" label="Username"></v-text-field>
        <v-text-field
          v-model="UserPassword"
          :rules="rules"
          type="password"
          label="UserPassword"
        ></v-text-field>
        <v-btn color="grey" :to="{ path: '/register' }">Register</v-btn>
        <login-btn-form class="mt-2" color="#096123" type="submit" block></login-btn-form>
      </v-form>
    </v-sheet>
  </main>
</template>
<script>
import LoginBtnForm from "@/components/UI/LoginBtnForm.vue";
import { login } from "@/api";
import AdminHeader from "../components/AdminHeader.vue";
import Cookies from "js-cookie";
export default {
  name: "LoginForm",
  components: {
    LoginBtnForm,
    AdminHeader,
  },

  data() {
    return {
      Username: "",
      UserPassword: "",
      rules: [(v) => !!v || "Field is required"],
      RegisterText: "Register",
    };
  },
  methods: {
    async login() {
      const data = {
        user_name: this.Username,
        user_password: this.UserPassword,
      };
      const loginUser = await login(data);
      if (loginUser === 201) {
        // this.$router.push({ path: "/" });
        this.$router.push("/");
        // window.location.reload();
      }
    },
  },
};
</script>
