<template>
  <div class="dashboard">
    <div class="dashboard__content">
      <div class="content__header">
        <h1 class="headerH1">Dashboard</h1>
        <p class="text largeRegular content__header__date">{{ getDate() }}</p>
      </div>
      <div class="content__order">
        <div class="order__card">
          <div class="card__up">
            <img class="card__up_svg" src="../../assets/icons/Coin.svg" alt="Icon">
            <p class="card__up_text green">+32.04%</p>
            <!--            <p class="card__up_text red">+32.04%</p>-->
            <img class="card__up_arrow green" src="../../assets/icons/ArrowUp.svg" alt="Icon">
            <!--            <img class="card__up_arrow red" src="../../assets/icons/ArrowDown.svg" alt="Icon">-->
          </div>
          <div class="card__down">
            <h2 class="headerH2">$10,243.00</h2>
            <p class="text normalRegular">Total Revenue</p>
          </div>
        </div>
        <div class="order__card">
          <div class="card__up">
            <img class="card__up_svg" src="../../assets/icons/Order.svg" alt="Icon">
            <p class="card__up_text green">+12.40$</p>
            <!--            <p class="card__up_text red">-12.40$</p>-->
            <img class="card__up_arrow green" src="../../assets/icons/ArrowUp.svg" alt="Icon">
            <!--            <img class="card__up_arrow red" src="../../assets/icons/ArrowDown.svg" alt="Icon">-->
          </div>
          <div class="card__down">
            <h2 class="headerH2">23,456</h2>
            <p class="text normalRegular">Total Dish Ordered</p>
          </div>
        </div>
        <div class="order__card">
          <div class="card__up">
            <img class="card__up_svg" src="../../assets/icons/Customer.svg" alt="Icon">
            <p class="card__up_text green">+2.40%</p>
            <!--            <p class="card__up_text red">+2.40%</p>-->
            <img class="card__up_arrow green" src="../../assets/icons/ArrowUp.svg" alt="Icon">
            <!--            <img class="card__up_arrow red" src="../../assets/icons/ArrowDown.svg" alt="Icon">-->
          </div>
          <div class="card__down">
            <h2 class="headerH2">1,234</h2>
            <p class="text normalRegular">Total Customer</p>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard__report">
      <div class="report__header">
        <h2 class="headerH2">Order Report</h2>
        <div class="header__down">
          <p class="text largeSemibold header__down_customer">Customer</p>
          <p class="text largeSemibold header__down_menu">Menu</p>
          <p class="text largeSemibold header__down_payment">Total Payment</p>
          <p class="text largeSemibold header__down_status">Status</p>
        </div>
        <hr />
      </div>
      <div class="report__list">
        <div class="list__item" v-for="offer in offers" :key="offer.id">
          <p class="list__item_customer">{{ offer.username }}</p>
          <p class="list__item_dish">{{ offer.dishes }}</p>
          <p class="list__item_payment">${{ offer.price }}</p>
          <p class="text normalRegular list__item_status green" @click="editStatus(offer.id, offer.status)"
             v-if="offer.status === 'Completed'">{{ offer.status }}</p>
          <p class="text normalRegular list__item_status purple" @click="editStatus(offer.id, offer.status)"
             v-else-if="offer.status === 'Preparing'">{{ offer.status }}</p>
          <p class="text normalRegular list__item_status orange" @click="editStatus(offer.id, offer.status)"
             v-else-if="offer.status === 'Pending'">{{ offer.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Firebase } from "@/firebase/firebase.config";

export default {
  name: "StatisticAdmin",
  data() {
    return {
      option: {
        weekday: "long",
        day: "numeric",
        year: "numeric",
        month: "short"
      },
      offers: []
    };
  },
  created() {
    Firebase.firestore().collection("offers").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        this.offers.push({
          id: doc.id,
          dishes: doc.data().dishes,
          email: doc.data().email,
          price: doc.data().price,
          status: doc.data().status,
          username: doc.data().username
        });
      });
    });
  },
  methods: {
    getDate() {
      let date = new Date();
      return date.toLocaleDateString("en-US", this.option);
    },
    editStatus(id, status) {
      /* eslint-disable */
      while (true) {
        let editstatus;

        while (true) {
          editstatus = prompt("New status\n Available status: 'Completed', 'Pending', 'Preparing'", status);
          if (editstatus === "Completed" || editstatus === "Pending" || editstatus === "Preparing") {
            break;
          }
        }

        const confirmEdit = confirm(
          `Status: ${status} to ${editstatus}`
        );
        if (confirmEdit === true) {
          if (status !== editstatus) {
            Firebase.firestore().collection("offers").doc(id).update({
              status: editstatus
            });
            this.offers = [];
          }
          break;
        } else {
          continue;
        }
      }
    }
  }
}
;
</script>

<style lang="less" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: row;
    position: relative;

    & .content__header {
      display: flex;
      flex-direction: column;

      &_date {
        display: flex;
        margin-top: 5px;
      }
    }

    & .content__order {
      display: flex;
      flex-direction: row;
      margin-left: 24px;

      & .order__card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 199px;
        height: 143px;
        background: #1f1d2b;
        border-radius: 8px;
        padding: 16px;
        margin-right: 24px;

        & .card__up {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 8px;

          & p {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 1.4;
            color: #ffff;
            margin-right: 6px;

            &.green {
              color: #50d1aa;
            }

            &.red {
              color: #FF7CA3;
            }
          }

          &_svg {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #252836;
            border-radius: 8px;
            width: 38px;
            height: 38px;
            padding: 7px;
            margin-right: 12px;
          }

          &_arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px;
            width: 18px;
            height: 18px;
            border-radius: 20px;

            &.green {
              background: rgba(136, 224, 145, 0.24);
            }

            &.red {
              background: rgba(255, 100, 113, 0.24);
            }
          }
        }

        & .card__down {
          margin-top: 10px;

          & .text {
            margin-top: 5px;
          }
        }
      }
    }
  }

  &__report {
    display: flex;
    flex-direction: column;
    width: 846px;
    height: 746px;
    background: #1f1d2b;
    border-radius: 8px;
    margin-top: 24px;
    padding: 24px 24px 5px 24px;

    & .header__down {
      display: flex;
      flex-direction: row;
      margin-top: 24px;

      &_customer {
        margin-right: 80px;
      }

      &_menu {
        margin-right: 250px;
      }

      &_payment {
        margin-right: 120px;
      }
    }

    & .report__list {
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
        align-items: center;
        margin-bottom: 15px;

        &_customer {
          width: 120px;
          margin-right: 35px;
        }

        &_dish {
          width: 250px;
          margin-right: 43px;
        }

        &_payment {
          width: 70px;
        }

        &_status {
          display: flex;
          padding: 4px 12px;
          border-radius: 30px;
          margin-left: 157px;
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

.order_report_header_up {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px 16px 24px;
}

.order_report_header_up h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
}

.order_report_header_up p {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 45px;
  background: inherit;
  border: 1px solid #393c49;
  border-radius: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
}

.order_report_header_up p svg {
  margin-right: 10px;
}

.order_report_header_down {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 74px 16px 24px;
}

.order_report_header_down p {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
}

.order_report_header_down_first {
  margin-right: 128px;
}

.order_report_header_down_second {
  margin-right: 136px;
}

.order_report_header_down_third {
  margin-right: 61px;
}

.rows {
  display: flex;
  flex-direction: column;
  width: 598px;
  height: 369px;
  margin: 12px 24px 0 24px;
  overflow-y: scroll;
}

.rows::-webkit-scrollbar {
  width: 0;
}

.rows_up {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 66px;
}

.rows_up_content {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.rows_up_content_customer {
  display: flex;
  flex-direction: row;
  width: 154px;
  margin-right: 35px;
}

.rows_up_content_customer img {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 16px;
}

.avatar_pink {
  background: #ff7ca3;
}

.avatar_blue {
  background: #65b0f6;
}

.avatar_orange {
  background: #ffb572;
}

.avatar_green {
  background: #50d1aa;
}

.avatar_purple {
  background: #9290fe;
}

.rows_up_content_customer p {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.4;
  color: #e0e6e9;
  margin-top: 6px;
}

.rows_up_content_menu {
  display: flex;
  width: 137px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.4;
  color: #e0e6e9;
  margin-right: 32px;
  margin-top: 6px;
}

.rows_up_content_payment {
  display: flex;
  font-style: normal;
  font-weight: normal;
  width: 149px;
  font-size: 14px;
  line-height: 140%;
  color: #e0e6e9;
  margin-top: 6px;
}

.rows_up_content_status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 91px;
  height: 26px;
  border-radius: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  margin-top: 6px;
}

.status_green {
  color: #50d1aa;
  background: rgba(107, 226, 190, 0.24);
}

.status_purple {
  background: rgba(146, 144, 254, 0.2);
  color: #9290fe;
}

.status_orange {
  background: rgba(255, 181, 114, 0.2);
  color: #ffb572;
}

.dashboard_column_two {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 372px;
  height: 786px;
  margin: 24px 24px 24px 0;
}

.most_ordered {
  display: flex;
  flex-direction: column;
  width: 372px;
  height: 429px;
  padding: 24px;
  background: #1f1d2b;
  border-radius: 8px;
}

.most_ordered_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.most_ordered_header h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
}

.most_ordered_header p {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 45px;
  border: 1px solid #393c49;
  border-radius: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
}

.most_ordered_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 324px;
  height: 296px;
  margin-top: 20px;
  overflow: hidden;
}

.view_all {
  height: 296px;
  overflow-y: scroll;
}

.view_all::-webkit-scrollbar {
  width: 0;
}

.most_ordered_content_item {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.most_ordered_content_item img {
  display: flex;
  width: 56px;
  height: 56px;
  margin-right: 16px;
}

.most_ordered_content_item_text {
  display: flex;
  flex-direction: column;
}

.most_ordered_content_item_text_name {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: #e0e6e9;
  margin-bottom: 4px;
}

.most_ordered_content_item_text_count {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 1.4;
  color: #abbbc2;
}

.most_ordered_content button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 324px;
  height: 48px;
  outline: none;
  background: inherit;
  border: 1px solid #ea7c69;
  border-radius: 8px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  color: #ea7c69;
  margin-top: 12px;
}

.most_type_ordered {
  display: flex;
  flex-direction: column;
  padding: 24px 0 40px 0;
  width: 372px;
  height: 333px;
  background: #1f1d2b;
  border-radius: 8px;
  margin-top: 24px;
}

.most_type_ordered_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 24px 16px 24px;
}

.most_type_ordered_header h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
}

.most_type_ordered_header p {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 45px;
  border: 1px solid #393c49;
  border-radius: 8px;
}

.chart {
  display: flex;
  flex-direction: row;
  margin: 32px 32px 40px 32px;
}

.chart_right {
  display: flex;
  flex-direction: column;
  margin: 17px 0 16px 16px;
}

.chart_right h4 {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 2px;
  margin-left: 26px;
}

.chart_right p {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 1.4;
  color: #abbbc2;
  margin-bottom: 16px;
  margin-left: 26px;
}

.chart_right svg {
  position: absolute;
}
</style>
