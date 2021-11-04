<template>
  <div class="user">
    <div class="user__header">
      <h1 class="headerH1">Hello, {{ getUserName() }}</h1>
      <p class="text largeRegular user__header_date">{{ getDate() }}</p>
    </div>
    <div class="user__data">
      <div class="user__data_orders">
        <p class="normalSemibold">Total Dish Orders:</p>
        <p class="text largeRegular">{{currentOffers.length}}</p>
      </div>
    </div>
    <div class="user__order">
      <h2 class="headerH2">Orders</h2>
      <div class="order__title">
        <p class="text largeSemibold order__title_menu">Menu</p>
        <p class="text largeSemibold order__title_payment">Total Payment</p>
        <p class="text largeSemibold order__title_status">Status</p>
      </div>
      <div class="order__list">
        <div class="list__item" v-for="offer in getCurrentOffers" :key="offer.id">
          <p class="text normalRegular list__item_title">{{ offer.dishes }}</p>
          <p class="text normalRegular list__item_price">{{ offer.price }}$</p>
          <p class="text normalRegular list__item_status green" v-if="offer.status === 'Completed'">{{ offer.status
            }}</p>
          <p class="text normalRegular list__item_status purple" v-else-if="offer.status === 'Preparing'">
            {{ offer.status
            }}</p>
          <p class="text normalRegular list__item_status orange" v-else-if="offer.status === 'Pending'">{{ offer.status
            }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "StatisticsUser",
  data() {
    return {
      option: {
        weekday: "long",
        day: "numeric",
        year: "numeric",
        month: "short"
      },
      offers: [],
      currentOffers: []
    };
  },
  created() {
    Firebase.firestore().collection("offers").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.offers.push(doc.data());
      });
    });
  },
  computed: {
    getCurrentOffers() {
      const vm = this;
      this.offers.forEach((item) => {
        if (localStorage.getItem("email") === item.email) {
          vm.currentOffers.push(item);
        }
      });
      return this.currentOffers;
    }
  },
  methods: {
    // insert username form firebase
    getUserName() {
      return Firebase.auth().currentUser?.displayName;
    },
    // insert current date
    getDate() {
      let date = new Date();
      return date.toLocaleDateString("en-US", this.option);
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  flex-direction: column;
  margin: 24px;

  &__header_date {
    display: flex;
    margin-top: 5px;
  }

  &__data {
    display: flex;
    margin-top: 25px;
    flex-direction: column;

    &_discount {
      display: flex;
      flex-direction: row;
      align-items: center;

      & .text {
        margin-left: 99px;
      }
    }

    &_orders {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;

      & .text {
        margin-left: 46px;
      }
    }
  }

  &__order {
    display: flex;
    flex-direction: column;
    margin-top: 33px;

    & .order__title {
      display: flex;
      flex-direction: row;
      margin-top: 20px;

      &_payment {
        margin-left: 118px;
        margin-right: 66px;
      }
    }
  }

  & .order__list {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    height: 650px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    & .list__item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 15px;

      &_title {
        width: 140px;
      }

      &_price {
        width: 55px;
        margin-left: 22px;
      }

      &_status {
        display: flex;
        padding: 4px 12px;
        border-radius: 30px;
        margin-left: 115px;

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

</style>
