<template>
  <form class="auth" @submit.prevent="registrationUser" method="post">
    <h1 class="headerH1">Sign Up</h1>
    <div class="auth__main">
      <div class="auth__main_name">
        <input class="small" type="text" placeholder="Name" v-model="name" required maxlength="50" />
        <input class="small" type="text" placeholder="Surname" v-model="surname" required maxlength="100" />
      </div>
      <input class="input big" type="email" placeholder="Email" v-model="email" required />
      <input class="big" type="password" placeholder="Password" v-model="password" required maxlength="32" />
      <div class="auth__main_buttons">
        <button class="button small" type="submit">Sign Up</button>
      </div>
    </div>
  </form>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "SignUp",
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      password: null
    };
  },
  methods: {
    // Registration in firebase
    registrationUser() {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          result.user.updateProfile({ displayName: `${this.name} ${this.surname}` }).then(() => {
            this.addUser();
            localStorage.setItem("username", `${this.name} ${this.surname}`);
            localStorage.setItem("admin", "false");
          }).then(() => {
            this.$router.push({ name: "Home" });
          })
            .catch((error) => {
              alert(error.message);
            });
        });
    },
    // Add user in Firebase
    addUser() {
      Firebase.firestore().collection("users").add({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        discount: 5
      });
    }
  }
};
</script>

<style lang="less" scoped>
.auth__main {
  margin-top: 70px;

  &_name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 26px;
  }

  & .input {
    margin-bottom: 26px;
  }

  &_buttons {
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }
}
</style>
