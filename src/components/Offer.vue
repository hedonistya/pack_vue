<template>
  <div class="offer">
    <div class="offer__left">
      <div class="left__content">
        <div class="content__header">
          <h2 class="headerH2">Order #{{ getDate }}</h2>
          <div class="header__category">
            <p class="text largeSemibold">Item</p>
            <div class="category__right">
              <p class="text largeSemibold">Qty</p>
              <p class="text largeSemibold category__right_price">Price</p>
            </div>
          </div>
          <hr />
        </div>
        <div class="content__form">
          <div class="form__item" v-for="(dish, index) in getOfferItem" v-bind:key="dish.title">
            <div class="item__up">
              <div class="up__left">
                <img class="up__left_img"
                     :src="require(`../assets/dishes/${dish.category}/${dish.title.replace(/\s/g, '')}.png`)"
                     alt="Dish">
                <div class="left__content">
                  <p class="text normalMedium left__content_title">{{ dish.title }}</p>
                  <p class="text smallMedium">${{ dish.price }}</p>
                </div>
              </div>
              <div class="up__right">
                <p class="text largeMedium up__right_count">{{ dish.count }}</p>
                <p class="text largeMedium up__right_price">${{ Math.round(dish.result * 100) / 100 }}</p>
              </div>
            </div>
            <div class="item__down">
              <input class="big" type="text" placeholder="Comment">
              <p class="delete" v-on:click="getDelete(dish, index)">
                <img src="../assets/icons/Trash.svg" alt="Trash" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="offer__right">
      <div class="right__header">
        <h2 class="headerH2 right__header_title">Payment</h2>
        <p class="text largeMedium right__header_text">1 payment method available</p>
        <hr>
      </div>
      <form class="offer__form" @submit="getOffer">
        <div class="form__long">
          <p class="text normalMedium">Cardholder Name</p>
          <input class="big" type="text" v-model="cardholderName" placeholder="Levi Ackerman" required>
          <p class="text normalMedium">Card Number</p>
          <input class="big" type="text" v-model="cardNumber" placeholder="2564 1421 0897 1244" maxLength="16"
                 required>
        </div>
        <div class="form__short">
          <div class="form__short_date">
            <p class="text normalMedium">Expiration Date</p>
            <input class="small" type="date" v-model="cardDate" required>
          </div>
          <div class="form__short_cvv">
            <p class="text normalMedium">CVV</p>
            <input class="small" type="text" v-model="cardCVV" placeholder="345" maxLength="3" required>
          </div>
        </div>
        <hr />
        <div class="form__table">
          <p class="text normalMedium">Table number</p>
          <input class="small" type="text" v-model="tableNumber" placeholder="345" maxLength="3" required>
        </div>
        <div class="form__footer">
          <div class="footer__up">
            <p class="text normalRegular">Discount</p>
            <p class="text normalMedium">{{ getPercent }}%</p>
          </div>
          <div class="footer__down">
            <p class="text normalRegular">Sub total</p>
            <p class="text normalMedium">${{ getSubTotal }}</p>
          </div>
          <button class="button small" type="submit">Confirm Payment</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "Offer",
  data() {
    return {
      cardNumber: "",
      cardholderName: localStorage.getItem("username"),
      cardDate: "",
      cardCVV: "",
      tableNumber: "",
      offer: [],
      users: [],
      currentUser: [],
      discount: 0,
      price: 0,
      dishesName: ""
    };
  },
  created() {
    Firebase.firestore().collection("users").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.users.push(doc.data());
      });
    });
  },
  computed: {
    getOfferItem() {
      return this.$store.state.offer;
    },
    getPercent() {
      this.findUser();
      const vm = this;
      this.currentUser.forEach((item) => {
        vm.discount = item.discount;
      });
      return this.discount;
    },
    getSubTotal() {
      return Math.round(this.$store.state.subTotal * 100) / 100;
    }
  },
  methods: {
    getDelete(dish, index) {
      if (dish.count > 0) {
        dish.count -= 1;
        dish.result -= +dish.price;
        this.$store.state.subTotal -= +dish.price;

        if (dish.count === 0) {
          this.$store.state.offer.splice(index, 1);
        }
      }
      this.$store.state.dishes.map((elem) => {
        if (dish.title === elem.title) {
          elem.available += 1;
        }
      });
    },
    getOffer() {
      if (!this.isLetter(this.cardholderName) || !this.cardholderName.length) {
        alert("Имя должно состоять из БУКВ");
      } else if (!this.isNumber(this.cardNumber) || this.cardNumber.length !== 16) {
        alert("Номер карты должен состоять из 16 ЦИФР ");
      } else if (!this.isNumber(this.cardCVV) || this.cardCVV.length !== 3) {
        alert("Код безопасности должен состоять из 3 ЦИФР");
      } else if (!this.isNumber(this.tableNumber) || !this.tableNumber.length) {
        alert("Номер стола состоит из ЦИФР");
      } else if (this.getDateResult(this.cardDate)) {
        alert("У карты закончился срок действия. Укажите другую карту");
      } else if (!this.$store.state.offer.length) {
        alert("Choose dishes");
      } else {
        let order = confirm(`${Math.round(this.calcDiscount() * 100) / 100}`);

        if (order) {
          this.getDishesName();
          Firebase.firestore().collection("offers").add({
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            dishes: this.dishesName,
            status: "Pending",
            price: this.getSubTotal
          });
        }
      }
    },
    isLetter(string) {
      return string.toLowerCase() !== string.toUpperCase();
    },
    isNumber(number) {
      return +number;
    },
    getDateResult(string) {
      const DATE = new Date();
      const CURRENT_DATE = Date.parse(DATE);
      const inputDate = Date.parse(string);

      return inputDate < CURRENT_DATE;
    },
    findUser() {
      const vm = this;
      this.users.map(function(item) {
        if (item.email.toLowerCase().replace(/\s/g, "") === localStorage.getItem("email")) {
          vm.currentUser.push(item);
        }
      });
    },
    calcDiscount() {
      let percent;
      if (this.discount === 15) {
        percent = (this.$store.state.subTotal / 100) * 15;
        return this.price = this.$store.state.subTotal - percent;
      } else if (this.discount === 10) {
        percent = (this.$store.state.subTotal / 100) * 10;
        return this.price = this.$store.state.subTotal - percent;
      } else if (this.discount === 5) {
        percent = (this.$store.state.subTotal / 100) * 5;
        return this.price = this.$store.state.subTotal - percent;
      }
    },
    getDishesName() {
      let vm = this;
      this.$store.state.offer.map(function(item) {
        if (item.title) {
          vm.dishesName += `${item.title}\n`;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.offer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 930px;
  height: 100vh;
  background: #1F1D2B;
  padding: 24px;
  border-radius: 8px;

  &__left {
    display: flex;
    flex-direction: column;
    width: 435px;

    & .left__content {
      display: flex;
      height: 100%;
      flex-direction: column;

      & .header__category {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;

        & .category__right {
          display: flex;
          flex-direction: row;

          &_price {
            margin-left: 60px;
          }
        }
      }

      & .content__form {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
        margin-top: 30px;

        &::-webkit-scrollbar {
          display: none;
        }

        & .form__item {
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;

          & .item__up {
            display: flex;
            flex-direction: row;
            width: 100%;
            margin-bottom: 10px;

            & .up__left {
              display: flex;
              flex-direction: row;

              &_img {
                display: flex;
                width: 40px;
                height: 40px;
                margin-right: 10px;
              }

              & .left__content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                width: 200px;

                &_title {
                  margin-bottom: 5px;
                  text-align: start;
                }
              }
            }

            & .up__right {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin-left: 60px;
              width: 100%;

              &_count {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 46px;
                height: 46px;
                background: #2D303E;
                border: 1px solid #393C49;
                border-radius: 8px;
              }

              &_price {
                text-align: right;
              }
            }
          }

          & .item__down {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            & .delete {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              border: 1px solid #EA7C69;
              border-radius: 8px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    width: 435px;

    & .right__header {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;

      &_title {
        margin-bottom: 10px;
      }

      &_text {
        margin-bottom: 20px;
      }
    }

    & .offer__form {
      display: flex;
      flex-direction: column;
      height: 100vh;
      margin-top: 24px;

      & .form__short {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      & .form__long,
      & .short__date,
      & .short__cvv {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        & p {
          margin-bottom: 10px;
        }

        & input {
          margin-bottom: 24px;
          width: 100%;
        }
      }

      & .form__table {
        margin-top: 24px;
      }

      & .form__footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;

        & button {
          margin-top: 40px;
        }

        & .footer__up,
        & .footer__down {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          margin-bottom: 24px;
        }
      }
    }
  }
}
</style>
