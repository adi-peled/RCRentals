<template>
  <section class="profile-cars">
    <h1>Requests:</h1>
    <div v-for="order in orders" :order="order" :key="order._id" class="order-list">
      <h3 class="capi">From: {{order.buyer.fullName}}</h3>
      <h3>Contact: {{order.buyer.email}}</h3>
      <h3>Pickup date: {{order.pickupDate}}</h3>
      <h3>Number of days: {{order.daysCount}}</h3>
      <h3>Total sum: ${{order.price}}</h3>
      <div class="order-btn" v-if="order.status==='pending'">
        <button class="accept" @click="updateOrderStatus(order,'accept')">accept</button>
        <button class="decline" @click="updateOrderStatus(order,'decline')">decline</button>
      </div>
      <div class="order-status" v-else>{{order.status}}</div>
    </div>
  </section>
</template>

<script>            
import orderService from "../services/order-service.js";
export default {
  name: "requested-orders",
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
    this.orders = this.info.requestedOrders;
    var pendingOrders = this.orders.filter(order => order.status === "pending");
    var answerOrders = this.orders.filter(order => order.status !== "pending");
    if (!pendingOrders) pendingOrders = [];
    if (!answerOrders) answerOrders = [];
    this.orders = pendingOrders.concat(answerOrders);
    // this.orders.sort()
  },
  methods: {
    updateOrderStatus(order, status) {
      order.status = status;
      this.$store.dispatch({ type: "saveOrder", order });
    }
  },
  computed: {}
};
</script>

<style>
</style>