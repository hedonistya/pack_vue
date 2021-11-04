<template>
  <div class="main">
    <div class="main__content">
      <div class="header">
        <div class="header__name">
          <h1 class="headerH1">Hello, {{ userName() }}</h1>
          <p class="text largeRegular header__name_date">{{ getDate() }}</p>
        </div>
      </div>
      <navbar />
      <cards />
    </div>
    <offer />
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";
import Cards from "@/components/Cards";
import Offer from "@/components/Offer";
import Navbar from "@/components/Navbar";

export default {
  /* eslint-disable */
  name: "Home",
  components: { Navbar, Offer, Cards },
  data() {
    return {
      option: {
        weekday: "long",
        day: "numeric",
        year: "numeric",
        month: "short"
      }
    };
  },
  created() {
    const username = Firebase.auth().currentUser?.displayName;
    const email = Firebase.auth().currentUser?.email;

    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
    }
  },
  methods: {
    // Show current date
    getDate() {
      let date = new Date();
      return date.toLocaleDateString("en-US", this.option);
    },
    // Show current username
    userName() {
      return localStorage.getItem("username");
    },
    addOffer(dish) {
      let count = 1;

      if (this.offer.length) {
        let isDishExist = false;
        this.offer.map((dishes) => {
          if (dishes.title === dish.title && dish.available !== 0) {
            this.getAvailable(dish);
            dishes.count += count;
            dishes.result += +dish.price;
            this.subTotal += +dish.price;
            isDishExist = true;
          }
        });
        if (!isDishExist) {
          this.addItem(dish);
        }
      } else {
        this.addItem(dish);
      }
    },
    getAvailable(item) {
      if (item.available > 0) {
        item.available -= 1;
      }
    },
    addItem(item) {
      let count = 1;
      let result = item.price;

      if (item.available !== 0) {
        this.$store.state.offer.push({
          title: item.title,
          price: item.price,
          count: count,
          result: result,
          category: item.category,
          isDishExist: false
        });
        this.$store.state.subTotal += item.price;
        this.getAvailable(item);
      }
    },

  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: space-between;
  width: 100%;

  &__content {
    display: flex;
    width: 820px;
    flex-direction: column;
    margin-top: 24px;
    margin-left: 30px;

    & .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      &__name_date {
        display: flex;
        margin-top: 5px;
      }

      & .header__search {
        display: flex;
        flex-direction: row;
        align-items: center;

        & .small {
          padding: 0 14px 0 42px;
        }

        &_button {
          position: absolute;
          align-items: center;
          margin: 3px 0 0 14px;
          background: transparent;
          outline: none;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
