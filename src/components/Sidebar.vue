<template>
  <nav class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/icons/Logo.svg" alt="Logo" />
    </div>
    <ul class="sidebar__list">
      <li v-for="link in links" :key="link.logo">
        <router-link class="sidebar__list_btn" :to="link.link" v-if="link.admin === checkUser()">
          <img :src="link.logo" alt="Link" />
        </router-link>
      </li>
      <li>
        <button class="sidebar__list_btn nav_exit" @click="logout">
          <img src="../assets/icons/LogOut.svg" alt="Link">
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import home from "../assets/icons/Home.svg";
import dashboard from "../assets/icons/Dashboard.svg";
import settings from "../assets/icons/Setting.svg";
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "Sidebar",
  data() {
    return {
      links: [
        { link: { name: "Home" }, logo: home, admin: "false" },
        { link: { name: "StatisticsUser" }, logo: dashboard, admin: "false" },
        { link: { name: "StatisticsAdmin" }, logo: home, admin: "true" },
        { link: { name: "Settings" }, logo: settings, admin: "true" }
      ]
    };
  },
  methods: {
    checkUser() {
      return localStorage.getItem("admin");
    },
    // Log out from firebase
    async logout() {
      await Firebase.auth().signOut();
      localStorage.clear();
      await this.$router.push({ name: "LogIn" });
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #1f1d2b;
  border-radius: 0 8px 8px 0;
  padding: 24px;
}

.sidebar__logo {
  display: flex;
  margin-bottom: 50px;
}

.sidebar__list {
  list-style-type: none;
}

.sidebar__list_btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border: none;
  outline: none;
  cursor: default;
  width: 60px;
  height: 60px;
  transition: 0.5s ease;
  padding: 16px;
  border-radius: 8px;
  margin: 0px 0px 30px 0px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 8px 24px rgba(234, 124, 105, 0.32);
  }
}

.nav_exit {
  margin: 30px 0 24px 0;
}
</style>
