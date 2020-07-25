<template>
  <section class="profile-cars">
    <h1>Owned cars:</h1>
    <div v-for="car in cars" :car="car" :key="car._id">
      <router-link :to="'/car/details/'+ car._id" class="owned-cars flex">
        <img :src="require(`@/assets/cars/${car.primaryImgUrl}.jpg`)" height="200" />
        <div>
          <h3>{{car.vendor.company}} {{car.vendor.series}}</h3>
          <h3>{{car.city}}</h3>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { carService } from "../services/car-service.js";
export default {
  name: "owned-cars",
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      cars: []
    };
  },

  methods: {
    getImgUrl(imageName) {
      var images = require.context("@/assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    }
  },
  created() {
    this.cars = this.info.ownedCars;
  },
  computed: {
    // loggedInUser() {
    //   return this.$store.getters.loggedInUser;
    // }
  }
};
</script>

<style>
</style>