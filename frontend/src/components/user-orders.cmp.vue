<template>
  <section class="profile-cars">
    <h1>Your orders:</h1>
    <div v-for="order in orders" :order="order" :key="order._id" class="order-list">
      <router-link :to="'/car/details/'+order.carId" class="col">
        <h2>owner: {{order.owner.fullName}}</h2>
        <h2>Pickup date: {{order.pickupDate}}</h2>
        <h2>Total price: ${{order.price}}</h2>
      </router-link>
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
      type: Object
    }
  },
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.orders = this.info.orders;
    // const userId = this.$route.params.id;
    // orderService.getOrdersByBuyerId(userId)
    //   .then(orders => (this.orders = orders));
  },
  computed: {
    //  car(){
    //      carService.getById(id)
    //  }
  },
  methods: {
    getImgUrl(imageName) {
      var images = require.context("../assets/cars/", false, /\.jpg$/);
      return images("./" + imageName + ".jpg");
    }
  }
};
</script>

<style>
</style>