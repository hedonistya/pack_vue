<template>
  <div class="settings">
    <h1 class="headerH1 settings__header">Settings</h1>
    <div class="settings__main">
      <div class="settings__sidebar">
        <div class="sidebar__item" v-for="nav in sidebar" :key="nav.icon" @click="getEditCards(nav.title)">
          <img class="sidebar__item_img" :src="nav.icon" alt="Icon">
          <div class="item__content">
            <p class="text normalMedium">{{ nav.title }}</p>
            <p class="text smallRegular">{{ nav.content }}</p>
          </div>
        </div>
      </div>
      <edit-cards v-if="view === true" />
      <users v-else-if="view === false" />
    </div>
  </div>
</template>

<script>
import EditCards from "@/components/EditCards";
import Users from "@/components/Users";

export default {
  name: "Settings",
  data() {
    return {
      view: null,
      sidebar: [
        {
          icon: require("../../assets/icons/Restaurant.svg"),
          title: "Dishes",
          content: "Edit dishes content"
        },
        {
          icon: require("../../assets/icons/Discount-white.svg"),
          title: "Users",
          content: "Edit users discount"
        }
      ]
    };
  },
  components: { Users, EditCards },
  methods: {
    getEditCards(str) {
      if (str === "Dishes") {
        return this.view = true;
      } else if (str === "Users") {
        return this.view = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.settings {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__header {
    margin-top: 24px;
    margin-left: 30px;
  }

  &__main {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-left: 30px;
  }
}

.settings__sidebar {
  display: flex;
  flex-direction: column;
  width: 275px;
  height: 845px;
  background: #1F1D2B;
  border-radius: 8px;

  & .sidebar__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 87px;
    padding: 24px 0 0 24px;
    cursor: pointer;

    &:hover {
      color: #EA7C69;
    }

    &_img {
      display: flex;
      margin-right: 10px;
    }

    & .item__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
