<template>
  <section  class="profile-cars">
    <h1>your orders:</h1>
    <div v-for="order in userReviews" :order="order" :key="order._id">
      <h2>{{order.txt}}</h2>
    </div>
  </section>
</template>

<script>
import userService from "../services/user-service.js";
import { carService } from "../services/car-service";
export default {
  name: "user-orders",
  data() {
    return {
      userId: null,
      //   cars: [],
      userReviews: []
    };
  },
  created() {
    this.userId = this.$route.params.id;
   
  },
  computed: {
    cars() {
      return this.$store.getters.cars;
    },
    orders() {
      return this.cars.map(car => {
        return car.orders;
      });
    },
    order() {
      var currReviews = this.orders.forEach(orders => {
        orders.filter(order => {
          if (order.byUser._id === this.userId) {
            this.userReviews.push(order);
          }
        });
      });
    }
  }
};
</script>
<style>
</style>