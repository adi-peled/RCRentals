<template>
  <section>
    <h1 class="title capi">{{category}} cars rental</h1>
    <div class="app-container"></div>
    <div class="sub-container">
      <button @click="showModal" class="filter-btn">filter</button>
      <car-filter @filter="setFilter" v-show="isFilterShow" @close="closeModal"></car-filter>
      <car-list @updateUserFavs="updateUserFavs" @removeCar="removeCar" :cars="cars"></car-list>
    </div>
  </section>
</template>

<script>
export default {
  name: "browse-cars",
  data() {
    return { category: "", isFilterShow: false };
  },
  created() {
    this.$store.dispatch({ type: "loadCars" });
  },
  methods: {
    removeCar(id) {
      this.$store.dispatch({ type: "removeCar", id });
    },
    setFilter(filterBy) {
      this.category = filterBy.tag;
      if (!this.category) this.category = "all";
      this.$store.dispatch({ type: "loadCars", filterBy });
    },
    updateUserFavs(car, isLiked) {
      this.$store.dispatch({
        type: "updateFavs",
        car,
        isLiked,
        user: this.loggedInUser
      });
    },
    showModal() {
      this.isFilterShow = true;
    },
    closeModal() {
      this.isFilterShow = false;
    }
  },
  computed: {
    cars() {
      return this.$store.getters.cars;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    carList,
    carFilter
  }
};

import carFilter from "../components/car-filter.cmp.vue";
import carList from "../components/car-list.cmp.vue";
</script>


