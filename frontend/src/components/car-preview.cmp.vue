

<template>
  <section class="flex">
    <div class="car-preview">
      <div class="card-img">
        <img
            v-if="!isLiked&&loggedInUser" @click="toggleLike" class="like" src="@/assets/hearts/opa.png"/>
        <img
          v-else-if="isLiked&&loggedInUser"
          @click="toggleLike"
          class="like"
          src="@/assets/hearts/redheart.png"
        />
        <div class="price">${{car.price}}/day</div>
        <router-link :to="'/car/details/'+car._id">
          <img class="front-img" :src="getImgUrl(car.primaryImgUrl)" />
        </router-link>
      </div>

      <div class="under-img flex">
        <div class="details flex">
          <div class="capi">{{car.vendor.company}} {{car.vendor.series}} {{car.model}}</div>
          <div>
            {{car.reviews[0].rating}}
            <span class="star">★</span>
            <span class="capi">(50) {{car.owner.fullName}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "car-preview",
  props: {
    car: {
      type: Object
    }
  },
  data() {
    return {
      isLike: null
    };
  },

  methods: {
    toggleLike() {
      console.log(this.isLike, this.isLiked);
      this.isLike = !this.isLike;
      this.$emit("updateUserFavs", this.car, this.isLike);
    },
    getImgUrl(imageName) {
      var images = require.context("../assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    }
  },
  created() {
    this.isLike = this.isLiked;
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isLiked() {
      if (this.loggedInUser) {
        return this.loggedInUser.favCars.some(
          favCar => favCar._id === this.car._id
        );
      } else {
        return false;
      }
    }
  }
};
</script> 

<style>
</style>