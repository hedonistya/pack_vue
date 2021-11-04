<template>
  <div class="users">
    <div class="users__header">
      <h2 class="headerH2">Users</h2>
    </div>
    <div class="users__content">
      <div class="content__title">
        <p class="text normalMedium">Name</p>
        <p class="text normalMedium">Surname</p>
        <p class="text normalMedium">Total Payment</p>
        <p class="text normalMedium">Discount</p>
      </div>
      <hr>
      <div class="content__list">
        <div class="list__item" v-for="user in users" :key="user.id">
          <p class="text normalRegular list__item_name">{{ user.name }}</p>
          <p class="text normalRegular list__item_surname">{{ user.surname }}</p>
          <p class="text normalRegular list__item_payment">${{ 5 }}</p>
          <!--          <p class="text normalRegular list__item_payment">{{ getUserPayment(user.email) }}</p>-->
          <p class="text normalRegular list__item_discount orange" v-if="user.discount === 5">5%</p>
          <p class="text normalRegular list__item_discount purple" v-else-if="user.discount === 10">10%</p>
          <p class="text normalRegular list__item_discount green" v-else-if="user.discount === 15">15%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      offers: []
    };
  },
  created() {
    Firebase.firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          this.users.push({
            id: doc.id,
            discount: doc.data().discount,
            email: doc.data().email,
            name: doc.data().name,
            surname: doc.data().surname
          });
        });
      });

    Firebase.firestore().collection("offers").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        this.offers.push({
          email: doc.data().email,
          price: doc.data().price
        });
      });
    });
  },
  methods: {
    // getUserPayment(email) {
    //   let resultPrice = 0;
    //
    //   this.offers.forEach(function(item) {
    //     if (item.email === email) {
    //       return resultPrice += item.price;
    //     }
    //   });
    //   console.log(resultPrice);
    //
    //   this.users.map(function(item) {
    //     if (item.email === email) {
    //       this.push({
    //         payment: resultPrice
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.users {
  display: flex;
  flex-direction: column;
  width: 1450px;
  height: 845px;
  background: #1F1D2B;
  border-radius: 8px;
  margin-left: 30px;
  padding: 24px;

  &__header {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    & .content__title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    & .content__list {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      & .list__item {
        display: flex;
        flex-direction: row;
        margin-top: 10px;

        &_name {
          width: 170px;
          margin-right: 255px;
        }

        &_surname {
          width: 170px;
          margin-right: 277px;
        }

        &_payment {
          width: 170px;
          margin-right: 190px;
        }

        &_discount {
          display: flex;
          padding: 4px 12px;
          border-radius: 30px;
          margin-left: 115px;
          cursor: pointer;

          &.green {
            background: rgba(107, 226, 190, 0.24);
          }

          &.purple {
            background: rgba(146, 144, 254, 0.2);
          }

          &.orange {
            background: rgba(255, 181, 114, 0.2);
          }
        }
      }
    }
  }
}
</style>
