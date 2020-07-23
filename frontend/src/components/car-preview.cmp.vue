

<template>
  <section class="flex">
    <div class="car-preview">
      <div class="card-img">
        <img
          v-if="!isLiked&&loggedInUser"
          @click="toggleLike"
          class="like"
          src="@/assets/hearts/opa.png"
        />
        <img
          v-else-if="isLiked&&loggedInUser"
          @click="toggleLike"
          class="like"
          src="@/assets/hearts/redheart.png"
        />
        <div class="price bold">${{car.price}}/day</div>
        <router-link :to="'/car/details/'+car._id">
          <img class="front-img" :src="car.imgsUrl[0].url" />
        </router-link>
      </div>

      <div class="under-img flex">
        <div class="details flex">
          <div class="mini-details flex">
            <span
              class="flex align-center bold capi"
            >{{car.vendor.company}} {{car.vendor.searies}} {{car.model}}</span>
            <span class="city capi">{{car.location.city}}</span>
          </div>
          <div>
            <div class="capi under-img-details">
              {{car.owner.fullName}}
              <div>
                <span class="star">★{{calcRating}}</span>
                <span class="capi total-rating">(50)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "car-preview",
  props: ["car"],
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
    console.log(this.car);
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
    },
    calcRating() {
      if (!this.car.reviews.length) {
        return 0;
      }
      const sum = this.car.reviews.reduce((acc, review) => {
        acc += Number(review.rating);
        return acc;
      }, 0);
      return (sum / this.car.reviews.length).toFixed(1);
    }
  }
};
</script> 

<style>
</style>