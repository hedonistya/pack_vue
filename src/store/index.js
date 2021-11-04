import { createStore } from "vuex";

export default createStore({
  state: {
    offer: [],
    filterCard: [],
    dishes: [],
    filterValue: null,
    search: null,
    subTotal: 0
  },
  mutations: {
    GET_FILTER(state) {
      state.filterCard = [];
      const vm = this;
      state.dishes.map(function(dish) {
        if (dish.category.toLowerCase().replace(/\s/g, "") === state.filterValue) {
          vm.state.filterCard.push(dish);
        }
      });
    }
  },
  actions: {},
  modules: {}
});
