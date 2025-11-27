<template>
  <main>
    <admin-header />
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="register">
        <v-text-field v-model="Username" :rules="rules" label="Username"></v-text-field>
        <v-text-field
          v-model="UserPassword"
          :rules="rules"
          type="password"
          label="UserPassword"
        ></v-text-field>
        <v-btn class="mt-2" color="grey" type="submit" block>Register</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>
<script>
import { signup } from "@/api";
import AdminHeader from "../components/AdminHeader.vue";

export default {
  components: { AdminHeader },
  name: "RegisterForm",
  data() {
    return {
      Username: "",
      UserPassword: "",
      rules: [(v) => !!v || "Field is required"],
    };
  },
  methods: {
    register() {
      const data = {
        userName: this.Username,
        userPassword: this.UserPassword,
      };

      const signupUser = signup(data);
      if (signupUser === 201) {
        alert(`Bruger ${this.Username} er oprettet, venligst login`);
        this.$router.push(`/login`);
      }
    },
  },
};
</script>
<style scoped>
label {
  font-size: 12px;
  color: gray;
}
</style>
