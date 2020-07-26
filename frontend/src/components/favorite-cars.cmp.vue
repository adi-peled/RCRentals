<template>
  <section class="profile-cars">
    <h1>Your favorite cars</h1>
    <car-list :cars="favCars"></car-list>
  </section>
</template>

<script>
import carList from "./car-list.cmp.vue";
import userService from "../services/user-service";
export default {
  name: "favorite-cars",
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      favCars: [],
    };
  },
  created() {
    this.favCars = this.info.favCars;
    // const userId = this.$route.params.id;
    // userService.getById(userId).then(user => (this.favCars = user.favCars));
  },
  components: {
    carList,
  },
};
</script>

<style>
</style>