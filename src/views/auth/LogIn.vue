<template>
  <form class="auth" @submit.prevent="authorizationUser" method="post">
    <h1 class="headerH1">Log In</h1>
    <div class="auth__main">
      <input class="input big" type="email" placeholder="Email" v-model="email" required />
      <input class="big" type="password" placeholder="Password" v-model="password" required maxlength="32" />
      <div class="auth__main_buttons">
        <button class="button small" type="submit">Log In</button>
        <router-link class="button small" :to="{name: 'SignUp'}">Sing Up</router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "LogIn",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    // authorization in firebase
    authorizationUser() {
      this.checkUser();

      Firebase.auth().signInWithEmailAndPassword(this.email.trim(), this.password).then(() => {
        localStorage.getItem("admin") === "true" ?
          this.$router.push({ name: "StatisticsAdmin" }) :
          this.$router.push({ name: "Home" });
      }).catch((error) => {
        alert(error.message);
      });
    },
    // check admin
    checkUser() {
      if ((this.email.trim() === "niki@gmail.com") && (this.password === "123456")) {
        localStorage.setItem("admin", "true");
      } else {
        localStorage.setItem("admin", "false");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.auth__main {
  margin-top: 100px;

  & .input {
    margin-bottom: 40px;
  }

  &_buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 90px;
  }
}
</style>
