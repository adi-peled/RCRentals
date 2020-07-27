<template>
  <section class="profile-cars">
    <h1>Your orders</h1>
    <div class="order-container grid">
      <div v-for="order in orders" :order="order" :key="order._id" class="order-list">
        <router-link :to="'/car/details/'+order.car._id" class="flex">
          <img class="cancel" :src="order.car.imgUrl.url" />

          <div class="details flex column">
            <div class="flex column ">
            <span class="capi">owner: {{order.owner.fullName}}</span>
            <span>Pickup date: {{changeDateForm(order.pickupDate)}}</span>
            <span>Return date:{{changeDateForm(order.returnDate)}}</span>
            <span>Total price: ${{order.price}}</span>
            <span :class="{accept:isAccept(order),decline:isDecline(order)}">status: {{order.status}}</span>
            </div>
            <button class="cancel-btn" @click.prevent="removeOrder" v-if="order.status==='pending'">cancel order</button>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import orderService from "../services/order-service.js";
import carService from "../services/car-service.js";
export default {
  name: "user-orders",
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
    changeDateForm(date) {
      console.log(date);
      var idx = date.indexOf("T");
      var miniDate = date.substring(0, idx);
      return miniDate;
    },
    isAccept(order) {
      return order.status === "accept";
    },
    isDecline(order) {
      return order.status === "decline";
    },

    removeOrder() {},
  },
};
</script>

<style>
</style>