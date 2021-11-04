<template>
  <div class="dishes">
    <div class="dishes__header">
      <h2 class="headerH2">Choose Dishes</h2>
    </div>
    <div class="dishes__content">
      <div class="content__item" v-for="dish in getFilteredDishes" v-bind:key="dish.title" @click="addOffer(dish)">
        <div class="item__img">
          <img :src="require(`../assets/dishes/${dish.category}/${dish.title.replace(/\s/g, '')}.png`)" alt="Dish" />
        </div>
        <div class="item__main">
          <p class="text normalMedium">{{ dish.title }}</p>
          <p class="text normalRegular item__main_price">${{ dish.price }}</p>
          <p class="text normalRegular item__main-light">{{ dish.available }} Bowls available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "Cards",
  data() {
    return {};
  },
  // import data from firebase
  created() {
    if (!this.$store.state.dishes.length) {
      Firebase.firestore().collection("dishes").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          this.$store.state.dishes.push({
            id: doc.id,
            title: doc.data().title,
            category: doc.data().category,
            price: doc.data().price,
            available: doc.data().available
          });
        });
      });
    }
  },
  computed: {
    // Show filtered card
    getFilteredDishes() {
      if (this.$store.state.filterCard.length) {
        return this.$store.state.filterCard;
      } else {
        return this.$store.state.dishes;
      }
    }
  },
  methods: {
    // Add card in offer
    addOffer(dish) {
      let count = 1;

      if (this.$store.state.offer.length) {
        let isDishExist = false;
        this.$store.state.offer.map((dishes) => {
          if (dishes.title === dish.title && dish.available !== 0) {
            this.getAvailable(dish);
            dishes.count += count;
            dishes.result += dish.price;
            this.$store.state.subTotal += dish.price;
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
      let result = +item.price;

      if (+item.available !== 0) {
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
    }
  }
};
</script>

<style lang="less" scoped>
.dishes {
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 2px;
  overflow-y: scroll;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  &__header {
    margin-top: 10px;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 33px;

    & .content__item {
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      width: 180px;
      height: 230px;
      background: #1F1D2B;
      border-radius: 16px;
      outline: none;
      cursor: pointer;
      flex-basis: 180px;
      margin-top: 80px;

      & .item__img {
        display: flex;
        position: absolute;
        top: -60px;
      }

      & .item__main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 100px;
        background: transparent;
        padding: 0 30px;

        &_price {
          margin-top: 10px;
          margin-bottom: 5px;
        }

        &-light {
          color: #ABBBC2;
        }
      }
    }
  }
}
</style>
