<template>
  <section class="home-page">
    <div class="bgc-img">
      <div class="text-img">
        <h1>Rent a life style</h1>
      </div>
    </div>
    <section class="flex home-section">
      <main class="home">
        <div class="category-head flex space-between">
          <h2>Browse by category</h2>
        </div>
        <div class="browse-category flex wrap space-around">
          <div v-for="category in categorys" :category="category" :key="category">
            <router-link class="column main-categories-container" :to="'/car/'+category">
              <img class="main-categories-img" :src="getImgUrl(category)" />
              <h3 class="capi">{{category}}</h3>
            </router-link>
          </div>
        </div>
        <div class="top-cars flex ">
          <h2>Top Rated</h2>
          <router-link :to="'/car/'">See all cars</router-link>
        </div>

        <div class="might-like-category ">
          <carPreview 
            @updateUserFavs="updateUserFavs"
            v-for="car in cars.slice(cars.length-12)"
            :car="car"
            :key="car._id"
          ></carPreview>
        </div>
        <div>
          <h2 class="center">Discover the world’s largest car sharing marketplace</h2>
          <div class="flex about-info space-around">
            <div>
              <h4>Endless options</h4>Choose from hundreds of models you won’t find anywhere else. Pick it up or get it delivered where you want it.
            </div>
            <div>
              <h4>24/7 customer support</h4>Rest easy knowing that everyone in the Rcrentals community is screened, and 24/7 customer support and roadside assistance are just a click away.
            </div>
            <div>
              <h4>Drive confidently</h4>Drive confidently with your choice of protection plans — all plans include varying levels of liability insurance from Liberty Mutual provided through RCrentals Insurance Agency and physical damage protection.
            </div>
          </div>
        </div>
      </main>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import { carService } from "../services/car-service.js";
import carPreview from "@/components/car-preview.cmp.vue";

export default {
  name: "Home",
  components: {
    carPreview,
  },
  data() {
    return {
      categorys: ["sport", "custom", "luxury", "convertible"],
    };
  },
  created() {
    this.$store.dispatch({ type: "loadCars" });
  },
  methods: {
    getImgUrl(imageName) {
      var images = require.context("../assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    },
    updateUserFavs(car, isLiked) {
      this.$store.dispatch({
        type: "updateFavs",
        car,
        isLiked,
        user: this.loggedInUser,
      });
    },
  },
  computed: {
    cars() {
      return this.$store.getters.cars;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
