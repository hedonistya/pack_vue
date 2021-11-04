<template>
  <div class="edit">
    <div class="edit__header">
      <h2 class="headerH2">Dishes</h2>
      <div class="navbar">
        <ul class="navbar__list">
          <li class="navbar__list_item" v-for="link in links" :key="link.content" v-on:click="getFilter(link.content)">
            {{ link.content }}
          </li>
        </ul>
        <hr>
      </div>
    </div>
    <div class="edit__content">
      <div class="content__card">
        <div class="card__item" v-for="dish in getFilteredDishes" v-bind:key="dish.title"
             v-on:click="getEditDish(dish.price, dish.available, dish.id,)">
          <img class="card__item_img"
               :src="require(`../assets/dishes/${dish.category}/${dish.title.replace(/\s/g, '')}.png`)" alt="Dish">
          <p class="text normalMedium">{{ dish.title }}</p>
          <p class="text normalRegular card__item_text">$<span>{{ dish.price }}</span> •
            <span>{{ dish.available }}</span> Bowls</p>
          <p class="card__item_button text normalSemibold">
            <img src="../assets/icons/Edit.svg" alt="Edit Dish">
            <span>Edit Dish</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "EditCards",
  data() {
    return {
      dishes: [],
      filterDishes: [],
      links: [
        { content: "All Dishes" },
        { content: "Hot Dishes" },
        { content: "Cold Dishes" },
        { content: "Soup" },
        { content: "Grill" },
        { content: "Appetizer" },
        { content: "Dessert" }
      ]
    };
  },
  created() {
    Firebase.firestore()
      .collection("dishes")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          this.dishes.push({
            id: doc.id,
            title: doc.data().title,
            category: doc.data().category,
            price: doc.data().price,
            available: doc.data().available
          });
        });
      });
  },
  computed: {
    getFilteredDishes() {
      if (this.filterDishes.length) {
        return this.filterDishes;
      } else {
        return this.dishes;
      }
    }
  },
  methods: {
    getFilter(category) {
      const filterCategory = category.toLowerCase().replace(/\s/g, "");
      this.filterDishes = [];
      let vm = this;
      this.dishes.map(function(dish) {
        if (dish.category.toLowerCase().replace(/\s/g, "") === filterCategory) {
          vm.filterDishes.push(dish);
        }
      });
    },
    getEditDish(price, available, id) {
      /* eslint-disable */
      while (true) {
        let editPrice, editAvailable;

        while (true) {
          editPrice =
            Math.round(+prompt("New price", price).trim() * 100) / 100;
          if (!isNaN(editPrice)) {
            break;
          }
        }

        while (true) {
          editAvailable = Math.round(
            +prompt("New available number", available).trim()
          );
          if (!isNaN(editAvailable)) {
            break;
          }
        }

        const confirmEdit = confirm(
          `Price: ${price} to ${editPrice}\nAvailable ${available} to ${editAvailable}`
        );
        if (confirmEdit === true) {
          if (price !== editPrice || available !== editAvailable) {
            Firebase.firestore().collection("dishes").doc(id).update({
              price: editPrice,
              available: editAvailable
            });
            this.dishes = [];
          }
          break;
        } else {
          continue;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  display: flex;
  flex-direction: column;
  width: 1450px;
  height: 845px;
  background: #1F1D2B;
  border-radius: 8px;
  margin-left: 30px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &__header {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 24px;
  }

  &__content {
    padding: 24px 24px 0 24px;

    & .content__card {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      height: 100%;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      & .card__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 250px;
        height: 300px;
        margin-right: 30px;
        margin-bottom: 30px;
        border: 1px dashed #393C49;
        border-radius: 8px;
        cursor: pointer;

        & p {
          padding: 0 40px;
        }

        &_img {
          margin-top: 25px;
          margin-bottom: 15px;
        }

        &_text {
          color: #ABBBC2;
          margin-top: 10px;
        }

        &_button {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          margin-top: 15px;
          cursor: pointer;
          background: #EA7C69;
          opacity: 0.24;
          border-radius: 0px 0px 8px 8px;
        }
      }
    }
  }
}

.navbar {
  width: 100%;
  margin-top: 24px;

  &__list {
    display: flex;
    list-style: none;

    &_item {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      margin-right: 35px;
      transition: 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        color: #EA7C69;
      }
    }
  }
}
</style>
