<template>
  <section class="profile-cars">
    <h1>Requests:</h1>
    <div v-for="request in requests" :request="request" :key="request._id" class="order-list">
      <h3>From: {{request.buyer.fullName}}</h3>
      <h3>Contact: {{request.buyer.email}}</h3>
      <h3>Pickup date: {{request.pickupDate}}</h3>
      <h3>Number of days: {{request.daysCount}}</h3>
      <h3>Total sum: ${{request.price}}</h3>
      <div v-if="request.status==='pending'">
        <button @click="updateOrderStatus(request,'accept')">accept</button>
        <button @click="updateOrderStatus(request,'decline')">decline</button>
      </div>
      <div class="request-status" v-else>{{request.status}}</div>
    </div>
  </section>
</template>

<script>
import orderService from "../services/order-service.js";
export default {
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      requests: []
    };
  },
  created() {
    this.requests = this.info.requestedOrders;
  },
  methods: {
    updateOrderStatus(request, status) {
      request.status = status;
      console.log(request);
      this.$store.dispatch({ type: "saveOrder", order: request });
    }
  },
  computed: {}
};
</script>

<style>
</style>