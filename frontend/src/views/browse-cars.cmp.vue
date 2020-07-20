<template>
  <section>
    <h1 class="title capi">{{category}} Cars</h1>
    <div class="app-container"></div>
    <div class="sub-container">
      <car-filter @filter="setFilter"></car-filter>
      <car-list @updateUserFavs="updateUserFavs" @removeCar="removeCar" :cars="cars"></car-list>
    </div>
  </section>
</template>

<script>
export default {
  name: "browse-cars",
  created() {
    this.category = this.$route.params.category;
    this.$store.dispatch({ type: "loadCars" });
    console.log("car");
  },
  data() {
    return {category:""};
  },
  methods: {
    removeCar(id) {
      this.$store.dispatch({ type: "removeCar", id });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: "loadCars", filterBy });
      // this.$store.dispatch({ type: 'loadCars' })
    },
    updateUserFavs(car, isLiked) {
      console.log(isLiked);
      this.$store.dispatch({
        type: "updateFavs",
        car,
        isLiked,
        user: this.loggedInUser
      });
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


