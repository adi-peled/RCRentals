<template>
  <section class="profile-cars">
    <h1>Your orders</h1>
    <div class="order-container grid">
      <div v-for="order in orders" :order="order" :key="order._id" class="order-list">
        <router-link :to="'/car/details/'+order.carId" class="column">
          <h2 class="capi">owner: {{order.owner.fullName}}</h2>
          <h2>Pickup date: {{pickupDate(order.pickupDate)}}</h2>
          <h2>Total price: ${{order.price}}</h2>
          <h2>status: {{order.status}}</h2>
        </router-link>
        
      </div>
    </div>
  </section>
</template>

<script>
import orderService from "../services/order-service.js";
import carService from "../services/car-service.js";
export default {
  name: "user-order",
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.orders = this.info.orders;
    console.log(this.orders);
  },
  computed: {},
  methods: {
    getImgUrl(imageName) {
      var images = require.context("../assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    },
    pickupDate(date) {
      console.log(date);
      var idx = date.indexOf("T");
      var miniDate = date.substring(0, idx);
      console.log(miniDate);
      return miniDate;
    },
  },
};
</script>

<style>
</style>