<template>
  <div class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list_item" v-for="link in links" :key="link.content" v-on:click="getFilter(link.content)">
        {{ link.content }}
      </li>
    </ul>
    <hr>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
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
  methods: {
    ...mapMutations(["GET_FILTER"]),

    getFilter(str) {
      this.$store.state.filterValue = str.toLowerCase().replace(/\s/g, "");
      this.GET_FILTER();
    }
  }
};
</script>

<style lang="less" scoped>
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
