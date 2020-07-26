<template>
  <section class="profile-cars">
    <h1>Your favorite cars</h1>
    <div class="car-preview" v-for="car in favCars" :car="car" :key="car._id">
      <router-link :to="'/car/details/'+car._id">
        <div class="under-img flex">
          <div class="price">${{car.price}}/day</div>
          <img class="front-img" :src="car.imgsUrl[0].url" />
          <div class="details flex">
            <div class="capi">{{car.vendor.company}} {{car.vendor.series}} {{car.model}}</div>
            <div>
              <div>Location:{{car.city}}</div>
              {{car.reviews[0].rating}}
              <span class="star">★</span>
              <span class="capi">(50) {{car.owner.fullName}}</span>
               <!-- <span v-if="car.reviews.rating">{{calcRating}}</span>
                <span v-else>no rating yet</span>
                <span class="star">★</span>
                <span class="capi">
                  <span class="count">({{car.reviews.length}})</span>
                  {{car.owner.fullName}}
                </span> -->
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
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
  computed:{
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